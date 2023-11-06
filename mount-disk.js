const exec = require('child_process').exec;
const fs = require('fs');
const shell = require('child-shell');
const { SerialPort, ReadlineParser } = require('serialport');
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers');
const {PowerShell} = require("node-powershell");
const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));
const cliArgs = yargs(hideBin(process.argv))
    .option('port', {
        type: 'string',
        description: 'Keychip Serial Port'
    })
    .option('verbose', {
        alias: 'v',
        type: 'bool',
        description: 'Verbose Mode'
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
    .argv


if (cliArgs.verbose)
    console.log(`Savior of Song Keychip Bootstrap by Yukimi Kazari`);

const port = new SerialPort({path: cliArgs.port || "COM5", baudRate: 4800});
const parser = port.pipe(new ReadlineParser({delimiter: '\n'}));

let returned_key = null;
let ready = false;

async function startCheckIn() {
    ready = true;
    if (cliArgs.applicationVHD || cliArgs.optionVHD || cliArgs.appDataVHD || cliArgs.surfboard) {
        if (cliArgs.applicationVHD) {
            if (fs.existsSync(cliArgs.applicationVHD)) {
                const prepareCmd = await prepareDisk({ disk: cliArgs.applicationVHD, mountPoint: 'X:\\', writeAccess: !!(cliArgs.updateMode || cliArgs.encryptSetup) });
                if (prepareCmd) {
                    if (cliArgs.encryptSetup) {
                        const encryptCmd = await encryptDisk({ diskNumber: 0, mountPoint: 'X:\\', });
                        if (!encryptCmd) {
                            process.exit(99);
                        }
                    } else {
                        const unlockCmd = await unlockDisk({diskNumber: 0, mountPoint: 'X:\\',});
                        if (!unlockCmd) {
                            process.exit(103);
                        }
                    }
                } else {
                    process.exit(102);
                }
            } else {
                process.exit(101);
            }
        }
        if (cliArgs.optionVHD) {
            if (fs.existsSync(cliArgs.optionVHD)) {
                const prepareCmd = await prepareDisk({ disk: cliArgs.optionVHD, mountPoint: 'Z:\\', writeAccess: !!(cliArgs.updateMode || cliArgs.encryptSetup) });
                if (prepareCmd) {
                    if (cliArgs.encryptSetup) {
                        const encryptCmd = await encryptDisk({ diskNumber: 1, mountPoint: 'Z:\\', });
                        if (!encryptCmd) {
                            process.exit(99);
                        }
                    } else {
                        const unlockCmd = await unlockDisk({diskNumber: 1, mountPoint: 'Z:\\',});
                        if (!unlockCmd) {
                            process.exit(103);
                        }
                    }
                } else {
                    process.exit(102);
                }
            } else {
                process.exit(101);
            }
        }
        if (cliArgs.appDataVHD) {
            if (fs.existsSync(cliArgs.appDataVHD)) {
                const prepareCmd = await prepareDisk({ disk: cliArgs.appDataVHD, mountPoint: 'Y:\\', writeAccess: true });
                if (!prepareCmd) {
                    process.exit(102);
                }
            } else {
                process.exit(101);
            }
        }
        if (cliArgs.encryptSetup) {
            if (cliArgs.verbose)
                console.log(`Wait for Check-Out`);
            setTimeout(() => {
                port.write('SG_CRYPTO//CHECK_OUT//\n');
                process.exit(0);
            }, 1000);
        } else {
            process.exit(0);
        }
    } else {
        // Nothing to do, Check-Out Crypto
        setTimeout(() => {
            port.write('SG_CRYPTO//CHECK_OUT//\n');
            process.exit(1);
        }, 1000);
    }
}
async function runCheckOut() {
    ready = true;
    await dismountCmd({ disk: ((cliArgs.applicationVHD && fs.existsSync(cliArgs.applicationVHD)) ? cliArgs.applicationVHD : undefined), mountPoint: 'X:\\', lockDisk: true });
    await dismountCmd({ disk: ((cliArgs.appDataVHD && fs.existsSync(cliArgs.appDataVHD)) ? cliArgs.appDataVHD : undefined), mountPoint: 'Y:\\' });
    await dismountCmd({ disk: ((cliArgs.optionVHD && fs.existsSync(cliArgs.optionVHD)) ? cliArgs.optionVHD : undefined), mountPoint: 'Z:\\', lockDisk: true });
    if (cliArgs.verbose)
        console.log(`Wait for Check-Out`);
    setTimeout(() => {
        port.write('SG_CRYPTO//CHECK_OUT//\n');
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

async function prepareDisk(o) {
    if (cliArgs.verbose)
        console.log(`Prepare Volume ${o.mountPoint}`);
    // Remove any existing disk mounts
    await runCommand(`Dismount-VHD -Path "${o.disk}" -Confirm:$false -ErrorAction SilentlyContinue`, true);
    // Attach the disk to the drive letter or folder
    const mountCmd = await runCommand(`Mount-VHD -Path "${o.disk}" -NoDriveLetter -Passthru${(o.writeAccess) ? '' : ' -ReadOnly'} -Confirm:$false -ErrorAction Stop | Get-Disk | Get-Partition | where { ($_ | Get-Volume) -ne $Null } | Add-PartitionAccessPath -AccessPath ${o.mountPoint} -ErrorAction Stop | Out-Null`, true);
    return (!mountCmd.hadErrors);
}
async function dismountCmd(o) {
    if (cliArgs.verbose && o.lockDisk)
        console.log(`Lock Volume ${o.mountPoint}`);
    if (o.lockDisk)
        await runCommand(`Lock-BitLocker -MountPoint "${o.mountPoint}" -ForceDismount -Confirm:$false -ErrorAction SilentlyContinue`);
    if (cliArgs.verbose)
        console.log(`Dismount Volume ${o.mountPoint}`);
    // Remove any existing disk mounts
    await runCommand(`Dismount-VHD -Path "${o.disk}" -Confirm:$false -ErrorAction SilentlyContinue`, true);
    return true;
}
async function unlockDisk(o) {
    if (cliArgs.verbose)
        console.log(`Request Unlock ${o.diskNumber}`);
    returned_key = null;
    // Request the keychip to give decryption key for applicationID with a ivString and diskNumber
    port.write(`SG_CRYPTO//DECRYPT//${cliArgs.applicationID}//${cliArgs.ivString}//${o.diskNumber}//\n`);
    // Wait inline for response
    while (!returned_key) { await sleep(5); }
    // Unlock bitlocker disk or folder
    const unlockCmd = await runCommand(`Unlock-BitLocker -MountPoint "${o.mountPoint}" -Password $(ConvertTo-SecureString -String "${returned_key}" -AsPlainText -Force) -Confirm:$false -ErrorAction Stop`);
    returned_key = null;
    return (!unlockCmd.hadErrors);
}
async function encryptDisk(o) {
    if (cliArgs.verbose)
        console.log(`Request Encrypt ${o.diskNumber}`);
    returned_key = null;
    // Request the keychip to give decryption key for applicationID with a ivString and diskNumber
    port.write(`SG_CRYPTO//DECRYPT//${cliArgs.applicationID}//${cliArgs.ivString}//${o.diskNumber}//\n`);
    // Wait inline for response
    while (!returned_key) { await sleep(5); }
    // Unlock bitlocker disk or folder
    const unlockCmd = await runCommand(`Enable-BitLocker -MountPoint "${o.mountPoint}" -EncryptionMethod XtsAes256 -UsedSpaceOnly -SkipHardwareTest -PasswordProtector -Password $(ConvertTo-SecureString -String "${returned_key}" -AsPlainText -Force) -Confirm:$false -ErrorAction Stop`);
    returned_key = null;
    return (!unlockCmd.hadErrors);
}

parser.on('data', (data) => {
    let receivedData = data.toString().trim();
    if (receivedData === 'CRYPTO_LOCKOUT') {
        if (cliArgs.verbose) {
            console.error(`Keychip is locked out, Press reset button or reconnect`);
        } else {
            console.error(`0xFE000099`);
        }
    } else if (receivedData === 'CRYPTO_READY' && ready === false) {
        if (cliArgs.verbose) { console.log(`Ready`); }
        if (cliArgs.shutdown) {
            runCheckOut();
        } else {
            port.write('SG_CRYPTO//CHECK_IN//\n');
        }
    } else if (receivedData.startsWith("DEVICE_READY")) {
        if (!cliArgs.shutdown) {
            if (cliArgs.verbose) {
                console.log(`Lifesycle started`);
            }
            startCheckIn();
        }
    } else if (receivedData.startsWith("CRYPTO_KEY_")) {
        returned_key = receivedData.substring(11).trim().split("x0")[0];
    }
});
port.on('error', (err) => {
    if (cliArgs.verbose) { console.error(`Keychip Communication Error`, err); }
    process.exit(10);
});
port.on('close', (err) => {
    if (cliArgs.verbose) { console.error(`Keychip Communication Closed`, err); }
    process.exit(10);
});

// Handle the opening of the serial port
port.on('open', () => {
    if (cliArgs.verbose) { console.log(`Keychip Connected`); }
    port.write('SG_CRYPTO//PRESENCE//\n');
});
let pingTimer = setInterval(() => {
    port.write('SG_CRYPTO//PRESENCE//\n');
}, 2000)
