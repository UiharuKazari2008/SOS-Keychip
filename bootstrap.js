const fs = require('fs');
const { SerialPort, ReadlineParser } = require('serialport');
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers');
const { exec, spawn } = require('child_process');
const { PowerShell } = require("node-powershell");
const { resolve, join } = require("path");
const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

let options = {};
let secureOptions = {};
const cliArgs = yargs(hideBin(process.argv))
    .option('port', {
        type: 'string',
        description: 'Keychip Serial Port'
    })
    .option('verbose', {
        alias: 'v',
        type: 'bool',
        description: 'Verbose Mode',
        hidden: true
    })

    .option('ivString', {
        type: 'string',
        description: 'Challenge String'
    })
    .option('applicationID', {
        alias: 'i',
        type: 'string',
        description: 'Game ID'
    })

    .option('applicationVHD', {
        type: 'string',
        description: 'Application Disk Image'
    })
    .option('appDataVHD', {
        type: 'string',
        description: 'App Data Disk Image'
    })
    .option('optionVHD', {
        type: 'string',
        description: 'Options Disk Image'
    })

    .option('env', {
        type: 'string',
        description: 'Environment Configuration File'
    })
    .option('secureEnv', {
        type: 'string',
        description: 'Secure Environment Configuration File'
    })

    .option('launchApp', {
        type: 'bool',
        description: 'Run X:\game.ps1 after checkin and handle check-out on close'
    })
    .option('applicationExec', {
        type: 'string',
        description: 'File to execute instead of game.ps1'
    })
    .option('prepareScript', {
        type: 'string',
        description: 'PS1 Script to execute to prepare host'
    })
    .option('cleanupScript', {
        type: 'string',
        description: 'PS1 Script to execute when shutting down'
    })

    .option('updateMode', {
        type: 'bool',
        description: 'Enable Update Mode for Volumes'
    })
    .option('shutdown', {
        type: 'bool',
        description: 'Shutdown Volumes (Check-Out)'
    })
    .option('encryptSetup', {
        type: 'bool',
        description: 'Setup Encryption of Volumes'
    })
    .option('dontCleanup', {
        type: 'bool',
        description: 'Do not unmount all disk images mounted'
    })
    .option('watchdog', {
        type: 'bool',
        description: 'Run as Watchdog to detect removal or failure'
    })
    .argv

if (cliArgs.env && fs.existsSync(resolve(cliArgs.env))) {
    secureOptions = JSON.parse(fs.readFileSync(resolve(cliArgs.env)).toString());
}
if (cliArgs.secureEnv && fs.existsSync(resolve(cliArgs.secureEnv))) {
    options = JSON.parse(fs.readFileSync(resolve(cliArgs.secureEnv)).toString());
}
options = {
    ...options,
    port: cliArgs.port || options.port || "COM5",
    verbose: cliArgs.verbose || options.verbose,
    ivString: cliArgs.ivString || secureOptions.iv || options.iv,
    applicationID: cliArgs.applicationID || secureOptions.id || options.id,
    applicationVHD: cliArgs.applicationVHD || options.app || "./app.vhd",
    appDataVHD: cliArgs.appDataVHD || options.appdata || "./appdata.vhd",
    optionVHD: cliArgs.optionVHD || options.option || "./option.vhd",
    launchApp: cliArgs.launchApp || options.launch,
    applicationExec: cliArgs.applicationExec || options.app_script,
    prepareScript: cliArgs.prepareScript || options.prepare_script,
    cleanupScript: cliArgs.cleanupScript || options.cleanup_script,
    dontCleanup: cliArgs.dontCleanup || options.no_dismount_vhds,
};
if (cliArgs.versionFile) {
    const vf = JSON.parse(fs.readFileSync(resolve(cliArgs.versionFile)).toString());
    const versionFile = {
        ivString: vf.iv,
        applicationID: vf.id,
        applicationVHD: vf.app,
        appDataVHD: vf.appdata,
        optionVHD: vf.option,
        launchApp: vf.launch,
        applicationExec: vf.app_script
    }
    options = {
        ...options,
        ...versionFile
    };
}

const application_version = 1.5;
const expected_crypto_version = 2;
const min_firmware_version = 1.1;

if (options.verbose)
    console.log(`Savior of Song Keychip Bootstrap v${application_version} by Yukimi Kazari`);

if (options.verbose) {
    console.log(options);
}

const port = new SerialPort({path: options.port, baudRate: 4800});
const parser = port.pipe(new ReadlineParser({delimiter: '\n'}));

let returned_key = null;
let keychip_id = null;
let keychip_version = [0,0];
let ready = false;
let applicationArmed = false;

async function startCheckIn() {
    ready = true;
    if (keychip_version[0] < min_firmware_version) {
        if (options.verbose) {
            console.error(`Firmware "${keychip_version[0]}" is outdated, please flash the latest version!`);
        } else {
            process.stdout.write(".[FAIL]\n");
        }
        port.write('@$0$!');
        process.exit(102);
    }
    if (keychip_version[1] !== expected_crypto_version) {
        if (options.verbose) {
            console.error(`Disk Decryption Scheme (${keychip_version[1]} != ${expected_crypto_version}) Mismatch!`);
            console.error(`## IMPORTANT NOTICE ###############################################################`);
            console.error(`You must use the bootstrap version that matches your hardware crypto scheme`);
            console.error(`and mount disks as update mode, then disable encryption from BitLocker.`);
            console.error(`Once decrypted, you can update the bootstrap and firmware and run --encryptSetup`);
            console.error(`###################################################################################`);
        } else {
            process.stdout.write(".[FAIL]\n");
        }
        port.write('@$0$!');
        process.exit(102);
    }
    if (options.applicationVHD || options.optionVHD || options.appDataVHD) {
        if (options.applicationVHD && options.ivString) {
            if (fs.existsSync(options.applicationVHD)) {
                const prepareCmd = await prepareDisk({ disk: options.applicationVHD, mountPoint: 'X:\\', writeAccess: !!(cliArgs.updateMode || cliArgs.encryptSetup) });
                if (prepareCmd) {
                    if (cliArgs.encryptSetup) {
                        const encryptCmd = await encryptDisk({ diskNumber: 0, mountPoint: 'X:\\', });
                        if (!encryptCmd) {
                            if (!options.verbose) {
                                process.stdout.write(".[FAIL]\n");
                            }
                            process.exit(99);
                        }
                    } else {
                        const unlockCmd = await unlockDisk({diskNumber: 0, mountPoint: 'X:\\',});
                        if (!unlockCmd) {
                            if (!options.verbose) {
                                process.stdout.write(".[FAIL]\n");
                            }
                            process.exit(103);
                        }
                    }
                } else {
                    if (!options.verbose) {
                        process.stdout.write(".[FAIL]\n");
                    }
                    process.exit(102);
                }
            } else {
                if (!options.verbose) {
                    process.stdout.write(".[FAIL]\n");
                }
                process.exit(101);
            }
        }
        if (options.optionVHD && options.ivString) {
            if (fs.existsSync(options.optionVHD)) {
                const prepareCmd = await prepareDisk({ disk: options.optionVHD, mountPoint: 'Z:\\', writeAccess: !!(cliArgs.updateMode || cliArgs.encryptSetup) });
                if (prepareCmd) {
                    if (cliArgs.encryptSetup) {
                        const encryptCmd = await encryptDisk({ diskNumber: 1, mountPoint: 'Z:\\', });
                        if (!encryptCmd) {
                            if (!options.verbose) {
                                process.stdout.write(".[FAIL]\n");
                            }
                            process.exit(99);
                        }
                    } else {
                        const unlockCmd = await unlockDisk({diskNumber: 1, mountPoint: 'Z:\\',});
                        if (!unlockCmd) {
                            if (!options.verbose) {
                                process.stdout.write(".[FAIL]\n");
                            }
                            process.exit(103);
                        }
                    }
                } else {
                    if (!options.verbose) {
                        process.stdout.write(".[FAIL]\n");
                    }
                    process.exit(102);
                }
            } else {
                if (!options.verbose) {
                    process.stdout.write(".[FAIL]\n");
                }
                process.exit(101);
            }
        }
        if (options.appDataVHD) {
            if (fs.existsSync(options.appDataVHD)) {
                const prepareCmd = await prepareDisk({ disk: options.appDataVHD, mountPoint: 'Y:\\', writeAccess: true });
                if (!prepareCmd) {
                    if (!options.verbose) {
                        process.stdout.write(".[FAIL]\n");
                    }
                    process.exit(102);
                }
            } else {
                if (!options.verbose) {
                    process.stdout.write(".[FAIL]\n");
                }
                process.exit(101);
            }
        }
        port.write('@$11$!');
        if (options.verbose) {
            console.log(`Done`);
        } else {
            process.stdout.write(".[OK]\n");
        }
        if (options.launchApp) {
            if (options.verbose) {
                console.log(`Launch App`);
            } else {
                process.stdout.write("アプリケーションソフトを起動する ... [OK]\n");
            }
            await runAppScript(`X:/${(options.applicationExec) ? options.applicationExec : 'game.ps1'}`);
            process.stdout.write("\nアプリケーションをシャットダウンする .");
            await runCheckOut(!!(options.cleanupScript));
            if (options.cleanupScript) {
                await new Promise((ok) => {
                    const prepare = spawn('powershell.exe', ['-File', resolve(options.cleanupScript), '-ExecutionPolicy', 'Unrestricted ', '-NoProfile:$true'], {
                        stdio: 'inherit' // Inherit the standard IO of the Node.js process
                    });
                    prepare.on('exit', function() {
                        ok()
                    })
                    prepare.on('close', function() {
                        ok()
                    })
                    prepare.on('end', function() {
                        ok()
                    })
                })
            }
            if (!options.dontCleanup) {
                await runCommand('Get-Disk -FriendlyName "Msft Virtual Disk" -ErrorAction SilentlyContinue | ForEach-Object { Dismount-DiskImage -DevicePath $_.Path -Confirm:$false } | Out-Null', false);
            }
        } else {
            process.exit(0);
        }
    } else {
        // Nothing to do, Check-Out Crypto
        setTimeout(() => {
            port.write('@$0$!');
            process.exit(1);
        }, 1000);
    }
}
async function runCheckOut(no_exit) {
    ready = true;
    if (options.applicationVHD) {
        await dismountCmd({
            disk: ((options.applicationVHD && fs.existsSync(options.applicationVHD)) ? options.applicationVHD : undefined),
            mountPoint: 'X:\\',
            lockDisk: true
        });
    }
    if (options.appDataVHD) {
        await dismountCmd({
            disk: ((options.appDataVHD && fs.existsSync(options.appDataVHD)) ? options.appDataVHD : undefined),
            mountPoint: 'Y:\\'
        });
    }
    if (options.optionVHD) {
        await dismountCmd({
            disk: ((options.optionVHD && fs.existsSync(options.optionVHD)) ? options.optionVHD : undefined),
            mountPoint: 'Z:\\',
            lockDisk: true
        });
    }
    if (options.verbose) {
        console.log(`Wait for Check-Out`);
    } else {
        process.stdout.write(".[OK]\n");
    }
    setTimeout(() => {
        port.write('@$0$!');
        if (!no_exit)
            process.exit(0);
    }, 1000);
}

async function runCommand(input, suppressOutput = false) {
    return new Promise(async ok => {
        const ps = new PowerShell({
            executableOptions: {
                '-ExecutionPolicy': 'Bypass',
                '-NoProfile': true,
            },
        });
        try {
            const printCommand = PowerShell.command([input]);
            const result = await ps.invoke(printCommand);
            if (options.verbose && (!suppressOutput || result.hadErrors)) { console.log(result.raw); }
            ok(result);
        } catch (error) {
            if (options.verbose) { console.error(error); }
            ok(false);
        } finally {
            await ps.dispose();
        }
    });
}
async function runAppScript(input) {
    return new Promise((ok) => {
        applicationArmed = spawn('powershell.exe', ['-File', input, '-ExecutionPolicy', 'Unrestricted ', '-NoProfile:$true'], {
            stdio: 'inherit' // Inherit the standard IO of the Node.js process
        });
        applicationArmed.on('exit', function() {
            ok()
        })
        applicationArmed.on('close', function() {
            ok()
        })
        applicationArmed.on('end', function() {
            ok()
        })
    })
}

async function prepareDisk(o) {
    if (options.verbose) {
        console.log(`Prepare Volume ${o.mountPoint}`);
    } else {
        process.stdout.write(".");
    }
    // Remove any existing disk mounts
    await runCommand(`Dismount-DiskImage -ImagePath "${resolve(o.disk)}" -Confirm:$false -ErrorAction SilentlyContinue`, true);
    // Attach the disk to the drive letter or folder
    const mountCmd = await runCommand(`Mount-DiskImage -ImagePath "${resolve(o.disk)}" -StorageType VHD -NoDriveLetter -Passthru -Access ${(o.writeAccess) ? 'ReadWrite' : 'ReadOnly'} -Confirm:$false -ErrorAction Stop | Get-Disk | Get-Partition | where { ($_ | Get-Volume) -ne $Null } | Add-PartitionAccessPath -AccessPath ${o.mountPoint} -ErrorAction Stop | Out-Null`, true);
    return (!mountCmd.hadErrors);
}
async function dismountCmd(o) {
    if (options.verbose && o.lockDisk) {
        console.log(`Lock Volume ${o.mountPoint}`);
    } else if (o.lockDisk) {
        process.stdout.write(".");
    }
    if (o.lockDisk)
        await runCommand(`Lock-BitLocker -MountPoint "${o.mountPoint}" -ForceDismount -Confirm:$false -ErrorAction SilentlyContinue`);
    if (options.verbose) {
        console.log(`Dismount Volume ${o.mountPoint}`);
    } else {
        process.stdout.write(".");
    }
    // Remove any existing disk mounts
    await runCommand(`Dismount-DiskImage -ImagePath "${resolve(o.disk)}" -Confirm:$false -ErrorAction SilentlyContinue`, true);
    return true;
}
async function unlockDisk(o) {
    if (options.verbose) {
        console.log(`Request Unlock ${o.diskNumber}`);
    } else {
        process.stdout.write(".");
    }
    returned_key = null;
    // Request the keychip to give decryption key for applicationID with a ivString and diskNumber
    const challangeCmd = `@$10$${options.applicationID}$${options.ivString}$${o.diskNumber}$!`;
    port.write(challangeCmd);
    // Wait inline for response
    while (!returned_key) { await sleep(5); }
    // Unlock bitlocker disk or folder
    if (options.verbose) {
        console.log(`Key Unlock ${o.diskNumber}`);
    } else {
        process.stdout.write(".");
    }
    const unlockCmd = await runCommand(`Unlock-BitLocker -MountPoint "${o.mountPoint}" -Password $(ConvertTo-SecureString -String "${returned_key}" -AsPlainText -Force) -Confirm:$false -ErrorAction Stop`);
    returned_key = null;
    return (!unlockCmd.hadErrors);
}
async function encryptDisk(o) {
    if (options.verbose) {
        console.log(`Request Encrypt ${o.diskNumber}`);
    } else {
        process.stdout.write(".");
    }
    returned_key = null;
    // Request the keychip to give decryption key for applicationID with a ivString and diskNumber
    port.write(`@$10$${options.applicationID}$${options.ivString}$${o.diskNumber}$!`);
    // Wait inline for response
    while (!returned_key) { await sleep(5); }
    // Unlock bitlocker disk or folder
    if (options.verbose) {
        console.log(`Key Encrypt ${o.diskNumber}`);
    } else {
        process.stdout.write(".");
    }
    const unlockCmd = await runCommand(`Enable-BitLocker -MountPoint "${o.mountPoint}" -EncryptionMethod XtsAes256 -UsedSpaceOnly -SkipHardwareTest -PasswordProtector -Password $(ConvertTo-SecureString -String "${returned_key}" -AsPlainText -Force) -Confirm:$false -ErrorAction Stop`);
    returned_key = null;
    return (!unlockCmd.hadErrors);
}

let dropOutTimer = null;
let lastCheckIn = null;

parser.on('data', (data) => {
    let receivedData = data.toString().trim();
    if (receivedData.startsWith('KEYCHIP_FAILURE_')) {
        if (cliArgs.watchdog) {
            console.error(`Hardware Failure ${receivedData.replace("KEYCHIP_FAILURE_", "")}`);
            process.exit(100);
        } else {
            if (options.verbose) {
                console.error(`Keychip is locked out, Press reset button or reconnect`);
            } else {
                console.error(`Hardware Failure ${receivedData.replace("KEYCHIP_FAILURE_", "")}`);
            }
        }
    } else if (receivedData === 'SG_HELLO' && (cliArgs.watchdog || (applicationArmed !== false && options.launchApp))) {
        lastCheckIn = new Date().valueOf();
        clearTimeout(dropOutTimer);
        dropOutTimer = setTimeout(() => {
            if (options.verbose) {
                console.error(`Keychip Checkin Failed`);
            }
            if (applicationArmed !== false) {
                applicationArmed.kill("SIGINT");
            } else {
                process.exit(1);
            }
        }, 5000)
    } else if (receivedData === 'SG_HELLO' && ready === false) {
        if (options.verbose) {
            console.log(`Ready`);
        } else {
            process.stdout.write(".");
        }
        if (cliArgs.shutdown) {
            runCheckOut();
        } else {
            port.write('@$1$!');
        }
    } else if (receivedData.startsWith("SG_UNLOCK")) {
        if (!cliArgs.shutdown) {
            if (options.verbose) {
                console.log(`Lifesycle started`);
            } else {
                process.stdout.write(".");
            }
            startCheckIn();
        }
    } else if (receivedData.startsWith("CRYPTO_KEY_")) {
        returned_key = receivedData.substring(11).trim().split("x0")[0];
    } else if (receivedData.startsWith("KEYCHIP_ID_")) {
        keychip_id = receivedData.substring(11).trim();
    } else if (receivedData.startsWith("FIRMWARE_VER_")) {
        keychip_version = receivedData.split(' ').map(e => parseFloat(e.split('_VER_')[1]));
    }
});
port.on('error', (err) => {
    if (options.verbose) {
        console.error(`Keychip Communication Error`, err);
    } else if (cliArgs.watchdog) {
        console.error(`Keychip Communication Error`);
    } else if (applicationArmed) {
        applicationArmed.kill("SIGINT");
    } else {
        process.stdout.write(".[FAIL]\n");
    }
    if (!applicationArmed)
        process.exit(10);
});
port.on('close', (err) => {
    if (options.verbose) {
        console.error(`Keychip Communication Closed`, err);
    } else if (cliArgs.watchdog) {
        console.error(`Keychip Removal`);
    } else if (applicationArmed) {
        applicationArmed.kill("SIGINT");
    } else {
        process.stdout.write(".[FAIL]\n");
    }
    if (!applicationArmed)
        process.exit(10);
});

// Handle the opening of the serial port
port.on('open', async () => {
    port.write('@$5$!');
    if (cliArgs.watchdog) {
        console.log(`Keychip Presence Armed`);
    } else {
        if (options.launchApp) {
            await runCommand('Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Unrestricted -Confirm:$false -ErrorAction SilentlyContinue', true);
        }
        if (options.prepareScript) {
            if (options.verbose) {
                console.log(`Prepare Host`);
            }
            await new Promise((ok) => {
                const prepare = spawn('powershell.exe', ['-File', resolve(options.prepareScript), '-ExecutionPolicy', 'Unrestricted ', '-NoProfile:$true'], {
                    stdio: 'inherit' // Inherit the standard IO of the Node.js process
                });
                prepare.on('exit', function() {
                    ok()
                })
                prepare.on('close', function() {
                    ok()
                })
                prepare.on('end', function() {
                    ok()
                })
            })
        }
        if (options.verbose) {
            console.log(`Keychip Connected`);
        } else {
            process.stdout.write("アプリケーションデータのマウント .");
        }
        if (!options.dontCleanup) {
            await runCommand('Get-Disk -FriendlyName "Msft Virtual Disk" -ErrorAction SilentlyContinue | ForEach-Object { Dismount-DiskImage -DevicePath $_.Path -Confirm:$false } | Out-Null', false);
        }
        await sleep(600);
        setInterval(() => {
            port.write('@$?$!');
        }, ((cliArgs.watchdog || options.launchApp) ? 1000 : 2000))
    }
});
