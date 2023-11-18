const fs = require('fs');
const { SerialPort, ReadlineParser } = require('serialport');
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers');
const { exec, spawn } = require('child_process');
const {PowerShell} = require("node-powershell");
const {resolve} = require("path");
const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));
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

const application_version = 1.5;
const expected_crypto_version = 2;
const min_firmware_version = 1.1;

if (cliArgs.verbose)
    console.log(`Savior of Song Keychip Bootstrap v${application_version} by Yukimi Kazari`);

const port = new SerialPort({path: cliArgs.port || "COM5", baudRate: 4800});
const parser = port.pipe(new ReadlineParser({delimiter: '\n'}));

let returned_key = null;
let keychip_id = null;
let keychip_version = [0,0];
let ready = false;
let applicationArmed = false;

async function startCheckIn() {
    ready = true;
    if (keychip_version[0] < min_firmware_version) {
        if (cliArgs.verbose) {
            console.error(`Firmware "${keychip_version[0]}" is outdated, please flash the latest version!`);
        } else {
            process.stdout.write(".[FAIL]\n");
        }
        port.write('@$0$!');
        process.exit(102);
    }
    if (keychip_version[1] !== expected_crypto_version) {
        if (cliArgs.verbose) {
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
    if (cliArgs.applicationVHD || cliArgs.optionVHD || cliArgs.appDataVHD || cliArgs.surfboard) {
        if (cliArgs.applicationVHD && cliArgs.ivString) {
            if (fs.existsSync(cliArgs.applicationVHD)) {
                const prepareCmd = await prepareDisk({ disk: cliArgs.applicationVHD, mountPoint: 'X:\\', writeAccess: !!(cliArgs.updateMode || cliArgs.encryptSetup) });
                if (prepareCmd) {
                    if (cliArgs.encryptSetup) {
                        const encryptCmd = await encryptDisk({ diskNumber: 0, mountPoint: 'X:\\', });
                        if (!encryptCmd) {
                            if (!cliArgs.verbose) {
                                process.stdout.write(".[FAIL]\n");
                            }
                            process.exit(99);
                        }
                    } else {
                        const unlockCmd = await unlockDisk({diskNumber: 0, mountPoint: 'X:\\',});
                        if (!unlockCmd) {
                            if (!cliArgs.verbose) {
                                process.stdout.write(".[FAIL]\n");
                            }
                            process.exit(103);
                        }
                    }
                } else {
                    if (!cliArgs.verbose) {
                        process.stdout.write(".[FAIL]\n");
                    }
                    process.exit(102);
                }
            } else {
                if (!cliArgs.verbose) {
                    process.stdout.write(".[FAIL]\n");
                }
                process.exit(101);
            }
        }
        if (cliArgs.optionVHD && cliArgs.ivString) {
            if (fs.existsSync(cliArgs.optionVHD)) {
                const prepareCmd = await prepareDisk({ disk: cliArgs.optionVHD, mountPoint: 'Z:\\', writeAccess: !!(cliArgs.updateMode || cliArgs.encryptSetup) });
                if (prepareCmd) {
                    if (cliArgs.encryptSetup) {
                        const encryptCmd = await encryptDisk({ diskNumber: 1, mountPoint: 'Z:\\', });
                        if (!encryptCmd) {
                            if (!cliArgs.verbose) {
                                process.stdout.write(".[FAIL]\n");
                            }
                            process.exit(99);
                        }
                    } else {
                        const unlockCmd = await unlockDisk({diskNumber: 1, mountPoint: 'Z:\\',});
                        if (!unlockCmd) {
                            if (!cliArgs.verbose) {
                                process.stdout.write(".[FAIL]\n");
                            }
                            process.exit(103);
                        }
                    }
                } else {
                    if (!cliArgs.verbose) {
                        process.stdout.write(".[FAIL]\n");
                    }
                    process.exit(102);
                }
            } else {
                if (!cliArgs.verbose) {
                    process.stdout.write(".[FAIL]\n");
                }
                process.exit(101);
            }
        }
        if (cliArgs.appDataVHD) {
            if (fs.existsSync(cliArgs.appDataVHD)) {
                const prepareCmd = await prepareDisk({ disk: cliArgs.appDataVHD, mountPoint: 'Y:\\', writeAccess: true });
                if (!prepareCmd) {
                    if (!cliArgs.verbose) {
                        process.stdout.write(".[FAIL]\n");
                    }
                    process.exit(102);
                }
            } else {
                if (!cliArgs.verbose) {
                    process.stdout.write(".[FAIL]\n");
                }
                process.exit(101);
            }
        }
        port.write('@$11$!');
        if (cliArgs.verbose) {
            console.log(`Done`);
        } else {
            process.stdout.write(".[OK]\n");
        }
        if (cliArgs.launchApp) {
            if (cliArgs.verbose) {
                console.log(`Launch App`);
            } else {
                process.stdout.write("アプリケーションソフトを起動する ... [OK]\n");
            }
            await runAppScript(`X:/${(cliArgs.applicationExec) ? cliArgs.applicationExec : 'game.ps1'}`);
            await runCheckOut();
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
async function runCheckOut() {
    ready = true;
    if (cliArgs.applicationVHD) {
        await dismountCmd({
            disk: ((cliArgs.applicationVHD && fs.existsSync(cliArgs.applicationVHD)) ? cliArgs.applicationVHD : undefined),
            mountPoint: 'X:\\',
            lockDisk: true
        });
    }
    if (cliArgs.appDataVHD) {
        await dismountCmd({
            disk: ((cliArgs.appDataVHD && fs.existsSync(cliArgs.appDataVHD)) ? cliArgs.appDataVHD : undefined),
            mountPoint: 'Y:\\'
        });
    }
    if (cliArgs.optionVHD) {
        await dismountCmd({
            disk: ((cliArgs.optionVHD && fs.existsSync(cliArgs.optionVHD)) ? cliArgs.optionVHD : undefined),
            mountPoint: 'Z:\\',
            lockDisk: true
        });
    }
    if (cliArgs.verbose) {
        console.log(`Wait for Check-Out`);
    } else {
        process.stdout.write(".[OK]\n");
    }
    setTimeout(() => {
        port.write('@$0$!');
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
            if (cliArgs.verbose && (!suppressOutput || result.hadErrors)) { console.log(result.raw); }
            ok(result);
        } catch (error) {
            if (cliArgs.verbose) { console.error(error); }
            ok(false);
        } finally {
            await ps.dispose();
        }
    });
}
async function runAppScript(input) {
    applicationArmed = spawn('powershell.exe', ['-File', input, '-ExecutionPolicy', 'Unrestricted ', '-NoProfile:$true'], {
        stdio: 'inherit' // Inherit the standard IO of the Node.js process
    });
}

async function prepareDisk(o) {
    if (cliArgs.verbose) {
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
    if (cliArgs.verbose && o.lockDisk) {
        console.log(`Lock Volume ${o.mountPoint}`);
    } else if (o.lockDisk) {
        process.stdout.write(".");
    }
    if (o.lockDisk)
        await runCommand(`Lock-BitLocker -MountPoint "${o.mountPoint}" -ForceDismount -Confirm:$false -ErrorAction SilentlyContinue`);
    if (cliArgs.verbose) {
        console.log(`Dismount Volume ${o.mountPoint}`);
    } else {
        process.stdout.write(".");
    }
    // Remove any existing disk mounts
    await runCommand(`Dismount-DiskImage -ImagePath "${resolve(o.disk)}" -Confirm:$false -ErrorAction SilentlyContinue`, true);
    return true;
}
async function unlockDisk(o) {
    if (cliArgs.verbose) {
        console.log(`Request Unlock ${o.diskNumber}`);
    } else {
        process.stdout.write(".");
    }
    returned_key = null;
    // Request the keychip to give decryption key for applicationID with a ivString and diskNumber
    const challangeCmd = `@$10$${cliArgs.applicationID}$${cliArgs.ivString}$${o.diskNumber}$!`;
    port.write(challangeCmd);
    // Wait inline for response
    while (!returned_key) { await sleep(5); }
    // Unlock bitlocker disk or folder
    if (cliArgs.verbose) {
        console.log(`Key Unlock ${o.diskNumber}`);
    } else {
        process.stdout.write(".");
    }
    const unlockCmd = await runCommand(`Unlock-BitLocker -MountPoint "${o.mountPoint}" -Password $(ConvertTo-SecureString -String "${returned_key}" -AsPlainText -Force) -Confirm:$false -ErrorAction Stop`);
    returned_key = null;
    return (!unlockCmd.hadErrors);
}
async function encryptDisk(o) {
    if (cliArgs.verbose) {
        console.log(`Request Encrypt ${o.diskNumber}`);
    } else {
        process.stdout.write(".");
    }
    returned_key = null;
    // Request the keychip to give decryption key for applicationID with a ivString and diskNumber
    port.write(`@$10$${cliArgs.applicationID}$${cliArgs.ivString}$${o.diskNumber}$!`);
    // Wait inline for response
    while (!returned_key) { await sleep(5); }
    // Unlock bitlocker disk or folder
    if (cliArgs.verbose) {
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
            if (cliArgs.verbose) {
                console.error(`Keychip is locked out, Press reset button or reconnect`);
            } else {
                console.error(`Hardware Failure ${receivedData.replace("KEYCHIP_FAILURE_", "")}`);
            }
        }
    } else if (receivedData === 'SG_HELLO' && (cliArgs.watchdog || (applicationArmed !== false && cliArgs.launchApp))) {
        lastCheckIn = new Date().valueOf();
        clearTimeout(dropOutTimer);
        dropOutTimer = setTimeout(() => {
            if (cliArgs.verbose) {
                console.error(`Keychip Checkin Failed`);
            }
            if (applicationArmed !== false) {
                applicationArmed.kill();
            } else {
                process.exit(1);
            }
        }, 5000)
    } else if (receivedData === 'SG_HELLO' && ready === false) {
        if (cliArgs.verbose) {
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
            if (cliArgs.verbose) {
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
    if (cliArgs.verbose) {
        console.error(`Keychip Communication Error`, err);
    } else if (cliArgs.watchdog) {
        console.error(`Keychip Communication Error`);
    } else if (applicationArmed) {
        applicationArmed.kill();
    } else {
        process.stdout.write(".[FAIL]\n");
    }
    if (!applicationArmed)
        process.exit(10);
});
port.on('close', (err) => {
    if (cliArgs.verbose) {
        console.error(`Keychip Communication Closed`, err);
    } else if (cliArgs.watchdog) {
        console.error(`Keychip Removal`);
    } else if (applicationArmed) {
        applicationArmed.kill();
    } else {
        process.stdout.write(".[FAIL]\n");
    }
    if (!applicationArmed)
        process.exit(10);
});

// Handle the opening of the serial port
port.on('open', async () => {
    if (cliArgs.watchdog) {
        console.log(`Keychip Presence Armed`);
    } else {
        if (cliArgs.launchApp) {
            await runCommand('Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Unrestricted -Confirm:$false -ErrorAction SilentlyContinue', true);
        }
        if (cliArgs.prepareScript) {
            if (cliArgs.verbose) {
                console.log(`Prepare Host`);
            } else {
                process.stdout.write("アプリケーションソフトを起動する ... [OK]\n");
            }
            await spawn('powershell.exe', ['-File', resolve(cliArgs.prepareScript), '-ExecutionPolicy', 'Unrestricted ', '-NoProfile:$true'], {
                stdio: 'inherit' // Inherit the standard IO of the Node.js process
            });
            await runCheckOut();
        }
        if (cliArgs.verbose) {
            console.log(`Keychip Connected`);
        } else {
            process.stdout.write("アプリケーションデータのマウント .");
        }
        if (!cliArgs.dontCleanup) {
            //await runCommand('Get-Disk -FriendlyName "Msft Virtual Disk" -ErrorAction SilentlyContinue | ForEach-Object { Dismount-VHD -DiskNumber $_.Number -Confirm:$false } | Out-Null', false);
        }
        port.write('@$5$!');
        await sleep(600);
        port.write('@$?$!');
    }
});
let pingTimer = setInterval(() => {
    port.write('@$?$!');
}, ((cliArgs.watchdog || cliArgs.launchApp) ? 1000 : 2000))
