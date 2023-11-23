const application_version = 2.7;
const expected_crypto_version = 2;
const min_firmware_version = 2.0;
process.stdout.write('[34m:[34m:[34m:[34m:[34m:[34m;[36mt[37mX[97m#[97mW[97m#[97m#[97m#[97m#[97mW[97m#[97m#[97m#[97m#[97m#[97m#[97m#[97m#[97mW[97mW[97m#[97m#[97m#[37mB[37mV[34m=[34m:[34m:[34m:[34m:[34m:[34m:[34m:[34m:[34m:[34m:[34m;[94m=[34m;[34m:[34m;[94mi[36mt[37mB[37mB[97mW[37mB[37mX[37mV[36mI[90mI[37mV[37mB[37mM[97mW[37mM[37mX[94mY[94mI[94mt[34m=[34m:[34m:[34m:[34m:[34m:[34m:[34m:[34m:[34m;[34m+[94mI[94mI[34m+[34m=[0m\n' +
    '[34m:[34m:[34m:[34m:[34m;[36mt[37mR[97m#[97mM[97mW[97m#[97m#[97m#[97mW[97mW[37mM[97m#[97m#[97m#[97m#[97mM[97mW[97m#[97mW[97mW[97mW[97mM[97mW[97m#[37mB[37mV[34m+[34m;[34m:[34m:[34m:[34m:[34m:[34m:[34m:[34m:[34m;[94m+[34m=[34m;[34m=[94m+[36mI[37mR[37mM[97mW[37mR[37mV[37mV[37mR[37mB[37mM[97mW[37mM[37mX[94mY[36mi[34m=[34m;[34m;[34m:[34m:[34m:[34m:[34m:[34m:[34m:[34m:[34m:[34m:[34m:[34m+[34m+[36mt[34m=[0m\n' +
    '[34m:[34m:[34m:[34m;[90mI[37mB[97m#[97m#[37mM[97m#[97m#[97m#[97m#[97mW[37mB[97mW[97m#[97m#[97m#[37mM[97mW[37mM[37mB[97mW[97mW[37mM[37mB[37mB[37mM[97mW[37mB[90mY[36mi[34m;[34m:[34m:[34m:[34m=[36mi[36mi[34m+[34m=[34m;[34m;[34m=[34m=[34m=[36mI[37mR[97mW[97mW[37mR[37mB[97mW[97mW[97mW[37mM[37mR[94mY[36mi[34m;[34m:[34m:[34m:[34m:[34m;[34m:[34m:[34m;[34m;[34m;[34m;[34m:[34m:[34m:[34m:[34m=[34m:[34m;[34m;[0m\n' +
    '[34m:[34m:[34m;[90mI[37mR[97mW[97m#[97m#[97m#[97m#[97m#[97m#[97m#[97m#[37mX[97mM[97mW[97m#[97m#[37mB[37mB[37mB[37mV[37mR[97mW[97mW[37mB[37mB[37mR[37mX[37mB[97mM[37mR[37mY[36mt[36mi[36mt[36mt[34m;[34m;[36mi[34m;[34m:[34m;[34m=[94mi[36mi[36mI[37mX[97m#[97mM[37mR[97mW[97mW[37mB[37mX[94mY[36mi[34m=[34m;[34m;[34m=[34m+[36mi[36mt[36mI[94mY[94mY[37mV[37mV[37mV[94mV[94mV[94mY[36mI[36mt[36mi[34m=[34m;[34m:[0m\n' +
    '[34m:[34m:[34m+[37mV[37mB[97m#[97m#[97mW[97m#[97m#[37mM[97m#[97mW[97mW[37mR[37mR[37mM[37mX[37mR[37mX[37mY[37mR[90mY[37mV[37mR[97mM[97mW[37mM[37mR[37mX[37mR[37mX[37mB[97mM[37mM[37mR[37mV[90mY[36mI[36mt[36mI[36mi[36m+[36mt[94mY[37mX[37mB[37mV[37mR[97m#[37mB[37mX[37mB[37mX[94mY[36mt[36mi[36mi[36mI[94mY[37mV[37mV[96mX[37mR[96mR[37mR[37mR[37mR[37mR[37mR[37mR[37mR[37mR[37mR[37mR[37mR[37mX[37mV[94mY[36mi[0m\n' +
    '[34m:[34m:[36m+[37mX[37mM[97mW[97mW[37mM[97m#[97mW[37mX[97mW[97mW[37mB[37mX[37mB[37mR[37mV[37mV[90mY[36mi[36m+[90mI[37mV[37mX[37mR[97mM[97m#[97mW[37mR[37mR[37mR[37mR[37mX[37mX[37mR[97mM[97mM[97mM[97mM[97mW[97mW[97mW[97mW[97mW[97m#[97mM[37mX[97mM[97mW[37mR[37mX[94mY[94mY[94mV[37mV[37mX[37mR[37mR[37mR[37mR[37mR[37mR[37mR[37mR[37mR[37mR[96mR[96mR[96mR[37mR[37mR[37mR[37mR[37mR[37mR[37mR[37mX[96mX[96mX[0m\n' +
    '[34m:[34m:[34m;[90mY[97mM[37mX[37mB[90mY[37mR[37mX[37mY[90mY[37mV[37mY[37mV[37mM[97m#[97m#[97mW[37mB[37mX[90mt[37mX[90mY[37mM[37mB[37mR[97mM[97mW[97m#[37mB[37mR[37mR[37mX[37mV[37mV[37mV[37mX[37mX[37mX[37mR[37mR[37mB[37mB[37mR[37mR[37mX[37mM[97mW[37mB[37mX[37mR[37mR[96mR[37mR[37mR[37mX[37mX[37mX[37mX[37mX[37mX[37mV[94mV[94mV[94mY[36mI[36mt[36mt[36mt[36mt[36mt[36mI[94mV[96mX[96mR[96mR[37mR[37mV[94mY[0m\n' +
    '[34m=[34m;[34m:[34m=[90mI[37mV[36mI[90mY[37mV[37mV[37mY[90mt[90mt[36mi[37mM[97m#[97m#[97m#[97m#[97m#[97m#[97mW[37mR[97mW[97m#[97m#[37mB[37mV[37mM[97mW[97mW[97mW[37mR[36mi[36mi[90mt[37mB[37mB[37mB[37mR[37mX[37mX[37mR[37mR[37mR[37mR[37mM[97mW[37mM[37mX[37mX[37mX[37mV[37mV[37mV[37mV[37mX[37mX[37mX[37mR[37mR[37mR[37mR[37mX[37mV[94mV[36mI[36mi[34m=[34m:[34m:[34m,[34m:[34m;[34m+[36mt[94mY[96mX[96mR[96mX[0m\n' +
    '[34m;[94mi[34m:[34m:[34m:[34m;[34m=[36mi[37mV[37mV[37mV[37mV[37mX[37mX[37mX[97m#[97m#[97m#[97m#[97m#[97m#[97m#[97m#[97m#[97m#[97m#[37mB[37mX[37mX[37mX[37mM[97mW[97mW[97mW[37mB[37mX[37mB[37mB[37mB[37mB[37mM[37mB[37mR[37mB[37mM[97mW[37mM[37mX[36mI[36mt[36mi[36mi[36mt[36mt[36mt[36mt[36mt[36mI[94mI[94mY[37mV[96mX[96mX[37mR[37mR[37mR[96mR[37mX[37mV[36mI[34m+[34m;[34m;[34m;[34m;[34m=[36mi[36m+[36mI[94mV[0m\n' +
    '[34m=[36mi[36m+[36m+[34m=[34m;[34m;[34m;[34m=[90mI[37mX[37mV[37mX[37mB[97m#[97m#[97m#[97m#[97m#[97m#[97m#[97m#[97m#[97m#[97m#[37mB[37mB[37mB[37mB[36m+[36m+[90mI[37mX[37mM[97mM[97mW[97mW[97mW[97mW[97mW[97mW[97mW[97mW[97mW[37mM[37mV[36mi[36mt[34m=[34m:[34m:[34m:[34m:[34m:[34m:[34m:[34m:[34m:[34m:[34m;[34m=[34m+[36mt[94mV[96mX[96mR[37mR[37mR[96mR[96mR[37mX[94mY[36mi[34m=[34m=[34m=[36mi[34m:[34m;[36mi[0m\n' +
    '[34m;[34m:[34m:[36mi[34m:[34m,[34m,[34m,[34m,[34m:[36mi[37mV[37mX[37mV[37mX[37mM[97mM[97mW[97m#[97mW[97mW[97m#[97m#[37mM[37mR[37mB[37mB[37mB[37mB[90mt[34m;[34m;[34m;[34m=[90mI[90mY[37mB[37mB[37mB[37mM[97mW[97mW[97mW[37mM[37mB[90mt[34m+[36mt[36mi[36mt[36mi[36m+[34m=[34m=[34m;[34m:[34m:[34m,[34m,[34m,[34m,[34m:[34m:[34m;[36m+[94mY[96mX[37mR[37mR[37mR[96mR[96mR[37mV[36mI[34m=[34m=[36mi[34m;[34m=[34m=[0m\n' +
    '[36m+[36m=[36m+[34m=[34m:[34m:[34m:[34m:[34m:[34m:[34m;[34m=[90mY[37mX[37mX[37mX[37mX[37mX[37mX[90mI[90mI[90mY[90mt[36mi[37mR[37mM[37mR[90mY[36mi[36mi[34m;[34m;[34m;[90mt[36mt[34m=[37mV[37mB[37mB[37mR[90mI[37mB[97mW[37mM[37mR[37mR[37mB[37mM[37mB[37mR[37mX[37mV[37mY[90mI[36mI[36mi[34m=[34m:[34m:[34m:[34m:[34m:[34m:[34m:[34m:[34m=[36mt[94mV[96mR[37mR[37mR[37mR[37mR[37mX[94mI[36mt[94mI[36mt[94mI[94mI[0m\n' +
    '[34m;[36mi[34m;[34m:[34m:[34m:[34m:[34m:[34m:[34m:[34m;[34m;[36mt[37mM[37mB[37mR[37mR[37mX[37mX[37mV[90mI[36mi[34m+[34m+[34m+[36mt[90mI[90mI[90mI[36mi[34m+[34m+[34m+[37mV[34m=[34m+[36mt[37mR[37mM[37mM[97mW[97mW[97mW[37mM[37mM[37mM[37mM[37mM[37mB[37mB[37mB[37mB[37mB[37mB[37mR[37mX[37mY[36mt[34m=[34m:[34m:[34m:[34m:[34m:[34m:[34m;[34m;[36mt[94mV[96mR[37mR[37mR[37mR[37mR[37mX[94mI[94mY[94mt[94mt[94mt[0m\n' +
    '[34m;[36m+[34m:[34m,[34m,[34m,[34m,[34m,[34m,[34m,[34m:[34m+[37mV[97mW[37mB[37mX[37mX[37mR[37mR[37mB[37mR[37mR[37mX[37mV[37mV[37mY[90mY[37mV[37mV[90mY[90mY[37mY[37mX[37mX[37mR[37mM[97mW[97mW[97mW[97mM[37mM[37mR[37mX[37mV[37mX[37mV[37mV[37mY[37mV[37mV[37mX[37mR[37mR[37mR[37mR[37mX[37mX[37mV[90mY[36m+[34m;[34m;[34m=[34m=[34m=[36m+[36m+[36m+[94mI[96mX[37mR[37mR[37mR[37mV[96mR[94mY[94mI[94mI[94mI[94mI[0m\n' +
    '[34m;[34m:[34m,[34m,[34m,[34m,[34m,[34m:[34m:[34m=[36mi[37mX[97mW[37mB[37mX[37mX[37mR[37mR[37mR[37mR[37mR[37mR[37mB[97mM[97mW[97mW[97mW[97mW[97mW[97mW[97mW[97mW[97mW[97mW[97mW[97mM[37mM[37mM[37mR[90mY[36mi[34m+[34m=[34m;[34m+[36mi[36mt[94mt[36mt[36mi[36mi[36mi[36mt[90mY[37mV[37mX[37mX[36mI[36mi[94mI[94mt[34m;[34m:[34m:[34m:[36m+[36m+[36m+[94mI[94mV[96mR[96mR[37mR[37mV[37mY[94mY[94mY[94mI[94mt[94mI[0m\n' +
    '[34m,[34m,[34m,[34m,[34m:[34m;[34m=[36mi[37mY[37mR[97mM[37mM[37mX[37mV[37mV[37mX[37mR[37mR[37mR[37mR[37mV[37mR[37mX[37mX[37mX[90mI[90mY[37mY[90mY[90mY[90mY[90mY[90mI[37mR[97mM[37mB[37mR[90mY[34m=[34m=[34m=[36m+[36mi[90mt[90mt[90mt[36mi[34m=[34m;[34m;[34m=[34m;[34m;[34m=[34m+[36mi[36mt[90mY[36mI[94mI[94mt[36m+[36m+[36m+[36m+[36mi[36mi[94mi[94mI[94mV[94mV[94mV[96mR[96mX[36mI[94mY[96mY[94mI[94mI[96mY[0m\n' +
    '[36mi[36mi[36mt[37mY[37mX[37mR[37mM[37mM[37mB[37mR[37mV[37mY[37mV[37mR[37mR[37mX[37mR[37mR[37mR[37mX[37mX[37mX[37mX[37mR[37mR[37mX[37mR[97mW[37mX[36mi[90mt[90mI[90mt[34m+[36mi[34m+[34m+[34m;[34m:[34m:[34m:[34m:[34m:[34m:[34m:[34m;[34m=[36mi[90mt[36mi[34m;[34m:[34m:[34m=[34m=[34m;[34m;[34m+[36mt[36mi[36mt[36m+[34m=[34m;[34m=[36mi[36mi[94mt[94mI[94mY[94mY[94mI[96mX[96mX[94mt[94mY[96mV[94mI[94mY[96mY[0m\n' +
    '[37mB[37mB[37mB[37mR[37mR[37mV[37mY[94mY[94mY[94mY[37mX[37mR[37mR[37mR[37mR[37mX[37mR[37mR[37mR[37mV[37mY[37mV[37mR[37mR[37mX[94mI[90mY[37mX[36mi[34m+[34m+[90mt[90mI[34m+[34m;[34m=[34m=[34m=[34m=[34m=[34m;[34m:[34m:[34m:[34m:[34m:[34m:[34m:[34m;[34m+[36mt[34m=[34m:[34m:[34m:[34m:[34m:[34m:[34m:[34m:[34m=[36mI[36mt[36mt[90mI[90mY[90mY[90mI[90mI[94mY[94mI[94mI[94mV[94mY[94mY[94mY[96mV[94mI[96mY[96mY[0m\n' +
    '[94mY[37mX[37mX[96mX[94mV[94mY[94mY[94mV[37mX[37mR[37mR[37mR[37mR[37mX[37mX[37mR[37mR[96mR[94mY[94mY[94mY[94mV[96mR[37mX[94mI[36m+[34m=[34m=[34m+[36mi[36mt[90mI[37mY[35mi[34m=[34m;[34m;[34m;[34m=[34m=[34m=[34m=[34m=[34m=[34m=[34m;[34m:[34m:[34m:[34m:[34m=[90mI[36m+[34m:[34m:[34m:[34m:[34m:[34m:[34m:[34m:[36mi[37mY[37mX[37mV[37mV[37mV[90mY[90mY[94mI[94mI[94mI[94mY[94mI[94mt[94mt[96mY[94mI[94mI[94mI[0m\n' +
    '[96mX[37mX[94mY[36mt[94mY[94mV[37mR[37mR[37mR[37mR[37mR[37mV[37mV[37mX[37mR[37mR[96mX[94mY[36m+[36m+[94mY[96mX[96mX[94mI[34m+[34m=[34m=[36m+[36m+[36mt[90mY[37mY[90mI[34m=[34m=[34m=[34m=[34m;[34m;[34m=[34m=[34m=[34m=[34m=[34m=[34m=[34m;[34m:[34m:[90mt[37mX[90mI[36mi[34m=[34m:[34m:[34m:[34m:[34m:[34m:[34m:[36mi[90mY[90mI[94mi[94mt[94mI[94mY[94mI[94mI[94mI[94mI[94mI[94mI[94mI[94mI[96mY[94mI[94mI[94mI[0m\n' +
    `Savior of Song Keychip v${application_version}\nby Kazari\n\n`);

const fs = require('fs');
const {SerialPort, ReadlineParser} = require('serialport');
const yargs = require('yargs/yargs')
const {hideBin} = require('yargs/helpers');
const {spawn} = require('child_process');
const {PowerShell} = require("node-powershell");
const {resolve, join} = require("path");
const crypto = require('crypto-js');
const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));
process.stdout.write("Initializing ...");

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

    .option('loginKey', {
        type: 'string',
        description: 'Key used to login to Keychip'
    })
    .option('loginIV', {
        type: 'string',
        description: 'IV used to login to Keychip'
    })

    .option('applicationID', {
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
    loginKey: cliArgs.loginKey || secureOptions.login_key || options.login_key,
    loginIV: cliArgs.loginIV || secureOptions.login_iv || options.login_iv,
    applicationID: cliArgs.applicationID || secureOptions.id || options.id,
    applicationVHD: cliArgs.applicationVHD || options.app,
    appDataVHD: cliArgs.appDataVHD || options.appdata,
    optionVHD: cliArgs.optionVHD || options.option,
    launchApp: cliArgs.launchApp || options.launch,
    applicationExec: cliArgs.applicationExec || options.app_script,
    prepareScript: cliArgs.prepareScript || options.prepare_script,
    cleanupScript: cliArgs.cleanupScript || options.cleanup_script,
    dontCleanup: cliArgs.dontCleanup || options.no_dismount_vhds,
};
if (cliArgs.versionFile) {
    const vf = JSON.parse(fs.readFileSync(resolve(cliArgs.versionFile)).toString());
    const versionFile = {
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

let login_key_md5 = "NOT_READY";
let watchdog = null;

if (options.loginKey && options.loginIV) {
    login_key_md5 = (crypto.MD5(`${options.loginKey}-${options.loginIV}`)).toString();
    options.login_check = login_key_md5;
}

if (options.verbose)
    console.log(options);

const port = new SerialPort({path: options.port, baudRate: 4800});
const parser = port.pipe(new ReadlineParser({delimiter: '\n'}));
process.stdout.write(".");

let returned_key = null;
let keychip_id = null;
let keychip_version = [0, 0];
let ready = false;
let applicationArmed = false;
let encryptedMode = !!(cliArgs.shutdown);
let currentKey = options.loginKey;
let currentIV = options.loginIV;

async function startCheckIn() {
    ready = true;
    if (parseFloat(keychip_version[0]) < min_firmware_version) {
        if (options.verbose) {
            console.error(`Firmware "${keychip_version[0]}" is outdated, please flash the latest version!`);
        } else {
            process.stdout.write(".[FAIL]\n");
        }
        sendMessage('0');
        ps.dispose().then(r => process.exit(102));
    }
    if (parseFloat(keychip_version[1]) !== expected_crypto_version) {
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
        sendMessage('0');
        ps.dispose().then(r => process.exit(102));
    }
    if (options.applicationVHD || options.optionVHD || options.appDataVHD) {
        if (options.applicationVHD) {
            if (fs.existsSync(options.applicationVHD)) {
                const prepareCmd = await prepareDisk({
                    disk: options.applicationVHD,
                    mountPoint: 'X:\\',
                    writeAccess: !!(cliArgs.updateMode || cliArgs.encryptSetup)
                });
                if (prepareCmd) {
                    if (cliArgs.encryptSetup) {
                        const encryptCmd = await encryptDisk({diskNumber: 0, mountPoint: 'X:\\',});
                        if (!encryptCmd) {
                            if (!options.verbose) {
                                process.stdout.write(".[FAIL]\n");
                            }
                            ps.dispose().then(r => process.exit(99));
                        }
                    } else {
                        const unlockCmd = await unlockDisk({diskNumber: 0, mountPoint: 'X:\\',});
                        if (!unlockCmd) {
                            if (!options.verbose) {
                                process.stdout.write(".[FAIL]\n");
                            }
                            ps.dispose().then(r => process.exit(103));
                        }
                    }
                } else {
                    if (!options.verbose) {
                        process.stdout.write(".[FAIL]\n");
                    }
                    ps.dispose().then(r => process.exit(102));
                }
            } else {
                if (!options.verbose) {
                    process.stdout.write(".[FAIL]\n");
                }
                ps.dispose().then(r => process.exit(101));
            }
        }
        if (options.optionVHD) {
            if (fs.existsSync(options.optionVHD)) {
                const prepareCmd = await prepareDisk({
                    disk: options.optionVHD,
                    mountPoint: 'Z:\\',
                    writeAccess: !!(cliArgs.updateMode || cliArgs.encryptSetup)
                });
                if (prepareCmd) {
                    if (cliArgs.encryptSetup) {
                        const encryptCmd = await encryptDisk({diskNumber: 1, mountPoint: 'Z:\\',});
                        if (!encryptCmd) {
                            if (!options.verbose) {
                                process.stdout.write(".[FAIL]\n");
                            }
                            ps.dispose().then(r => process.exit(99));
                        }
                    } else {
                        const unlockCmd = await unlockDisk({diskNumber: 1, mountPoint: 'Z:\\',});
                        if (!unlockCmd) {
                            if (!options.verbose) {
                                process.stdout.write(".[FAIL]\n");
                            }
                            ps.dispose().then(r => process.exit(103));
                        }
                    }
                } else {
                    if (!options.verbose) {
                        process.stdout.write(".[FAIL]\n");
                    }
                    ps.dispose().then(r => process.exit(102));
                }
            } else {
                if (!options.verbose) {
                    process.stdout.write(".[FAIL]\n");
                }
                ps.dispose().then(r => process.exit(101));
            }
        }
        if (options.appDataVHD) {
            if (fs.existsSync(options.appDataVHD)) {
                const prepareCmd = await prepareDisk({
                    disk: options.appDataVHD,
                    mountPoint: 'Y:\\',
                    writeAccess: true
                });
                if (!prepareCmd) {
                    if (!options.verbose) {
                        process.stdout.write(".[FAIL]\n");
                    }
                    ps.dispose().then(r => process.exit(102));
                }
            } else {
                if (!options.verbose) {
                    process.stdout.write(".[FAIL]\n");
                }
                ps.dispose().then(r => process.exit(101));
            }
        }
        if (options.verbose) {
            console.log(`Done`);
        } else {
            process.stdout.write(".[OK]\n");
        }
        sendMessage('11');
    } else {
        // Nothing to do, Check-Out Crypto
        setTimeout(() => {
            sendMessage('0');
            ps.dispose().then(r => process.exit(1));
        }, 1000);
    }
}
async function postCheckIn() {
    if (options.launchApp) {
        if (options.verbose) {
            console.log(`Launch App`);
        } else {
            process.stdout.write("Starting Application ...");
        }
        if (options.applicationExec) {
            if (fs.existsSync(resolve(`X:/${options.applicationExec}`))) {
                process.stdout.write("[OK]\n");
                await runAppScript(`X:/${options.applicationExec}`, options.applicationExec.endsWith('.bat'));
            }
        } else if (fs.existsSync(resolve(`X:/game.ps1`))) {
            process.stdout.write("[OK]\n");
            await runAppScript(`X:/game.ps1`);
        } else if (fs.existsSync(resolve(`X:/bin/game.bat`))) {
            process.stdout.write("[OK]\n");
            await runAppScript(`X:/bin/game.bat`, true);
        } else {
            process.stdout.write("[FAIL]\nNo application was found to start!\n\n");
        }
        process.stdout.write("\nPlease Wait .");
        await runCheckOut();
    } else {
        if (cliArgs.updateMode) {
            clearTimeout(watchdog);
            sendMessage("2");
        }
    }
}
async function runCheckOut() {
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
    sendMessage('0');
    if (options.cleanupScript) {
        await new Promise((ok) => {
            const prepare = spawn('powershell.exe', ['-File', resolve(options.cleanupScript), '-ExecutionPolicy', 'Unrestricted ', '-NoProfile:$true'], {
                stdio: 'inherit' // Inherit the standard IO of the Node.js process
            });
            prepare.on('exit', function () {
                ok()
            })
            prepare.on('close', function () {
                ok()
            })
            prepare.on('end', function () {
                ok()
            })
        })
    }
    if (!options.dontCleanup) {
        await runCommand('Get-Disk -FriendlyName "Msft Virtual Disk" -ErrorAction SilentlyContinue | ForEach-Object { Dismount-DiskImage -DevicePath $_.Path -Confirm:$false } | Out-Null', false);
    }
    setTimeout(() => {
        ps.dispose().then(r => process.exit(0));
    }, 1000);
}

const ps = new PowerShell({
    executableOptions: {
        '-ExecutionPolicy': 'Bypass',
        '-NoProfile': true,
    },
});

async function runCommand(input, suppressOutput = false) {
    return new Promise(async ok => {
        try {
            const printCommand = PowerShell.command([input]);
            const result = await ps.invoke(printCommand);
            if (options.verbose && (!suppressOutput || result.hadErrors)) {
                console.log(result.raw);
            }
            ok(result);
        } catch (error) {
            if (options.verbose) {
                console.error(error);
            }
            ok(false);
        }
    });
}
async function runAppScript(input, is_bat) {
    return new Promise((ok) => {
        applicationArmed = spawn(((is_bat) ? 'cmd.exe' : 'powershell.exe'), ((is_bat) ? ['/c', input] : ['-File', input, '-ExecutionPolicy', 'Unrestricted ', '-NoProfile:$true']), {
            stdio: 'inherit' // Inherit the standard IO of the Node.js process
        });
        applicationArmed.on('exit', function () {
            ok()
        })
        applicationArmed.on('close', function () {
            ok()
        })
        applicationArmed.on('end', function () {
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
    // Request the keychip to give decryption key for applicationID with a diskNumber
    const challangeCmd = `10:${options.applicationID}:${o.diskNumber}:`;
    sendMessage(challangeCmd);
    // Wait inline for response
    while (!returned_key) {
        await sleep(5);
    }
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
    sendMessage(`10:${options.applicationID}:${o.diskNumber}:`);
    // Wait inline for response
    while (!returned_key) {
        await sleep(5);
    }
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

function sendMessage(message) {
    if (encryptedMode) {
        const messageBytes = crypto.AES.encrypt(
            `SG_ENCMSG ${message}`,
            crypto.enc.Hex.parse(currentKey),
            {
                iv: crypto.enc.Hex.parse(currentIV),
                mode: crypto.mode.CBC,
                padding: crypto.pad.ZeroPadding
            }
        );
        const encryptedString = messageBytes.toString();
        if (options.verbose && message !== "?") {
            console.log(`   >>>[MSG ENCRYPT] $SG_ENCMSG ${message}!`)
        }
        port.write(`$${encryptedString}!`);
    } else {
        port.write(`@${message}!`);
    }
}
function decryptMessage(string) {
    try {
        if (string.length > 2) {
            const ripped_str = string.split(":");
            if (ripped_str.length === 2) {
                let message = null;
                ripped_str.map(s => {
                    const encryptedBytes = crypto.enc.Base64.parse(s);
                    const decryptedBytes = crypto.AES.decrypt(
                        {ciphertext: encryptedBytes},
                        crypto.enc.Hex.parse(currentKey),
                        {
                            iv: crypto.enc.Hex.parse(currentIV),
                            mode: crypto.mode.CBC, // Use the appropriate mode based on Arduino's implementation
                            padding: crypto.pad.ZeroPadding   // Use the appropriate padding based on Arduino's implementation
                        }
                    );
                    let decryptedText = (crypto.enc.Utf8.stringify(decryptedBytes)).trim().split('\r')[0].split('\n')[0];
                    decryptedText = decryptedText.split(" ");
                    if (decryptedText.length > 2) {
                        if (decryptedText[0] === 'SG_KEYCRC') {
                            currentKey = decryptedText[1];
                            currentIV = decryptedText[2];
                            if (options.verbose) {
                                console.log('   <<<[KEY CYCLE] Key: ' + currentKey + ' - IV: ' + currentIV);
                            }
                        } else {
                            if (options.verbose && decryptedText[1] !== "SG_HELLO") {
                                console.log(`   <<<[MSG DECRYPT] ${decryptedText[1]}`)
                            }
                            message = decryptedText[1];
                        }
                    }
                })
                if (message)
                    parseIncomingMessage(message);
            } else {
                return false;
            }
        } else {
            return false;
        }
    } catch (e) {
        if (options.verbose) {
            console.error("Failed to decrypt packet!");
        }
    }
}
function parseIncomingMessage(receivedData) {
    if (receivedData.startsWith('KEYCHIP_FAILURE_')) {
        if (options.verbose) {
            console.error(`Keychip is locked out, Press reset button or reconnect`);
        } else {
            console.error(`Hardware Failure ${receivedData.replace("KEYCHIP_FAILURE_", "")}`);
        }
    } else if (receivedData === 'SG_HELLO' && (applicationArmed !== false && options.launchApp)) {
        lastCheckIn = new Date().valueOf();
        clearTimeout(dropOutTimer);
        dropOutTimer = setTimeout(() => {
            if (options.verbose) {
                console.error(`Keychip Checkin Failed`);
            }
            if (applicationArmed !== false) {
                applicationArmed.kill("SIGINT");
            } else {
                ps.dispose().then(r => process.exit(1));
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
            port.write('@5!');
            sleep(100).then(() => {
                port.write('@6!');
            });
        }
    } else if (receivedData === 'SG_LV1_RESET' || receivedData === 'SG_LV1_GOODBYE') {
        ps.dispose().then(r => process.exit(0));
    } else if (receivedData === 'SG_LV0_GOODBYE') {
        sendMessage('1');
    } else if (receivedData === 'SG_ENC_READY') {
        if (options.verbose) {
            console.log(`Switching to Encrypted Mode`);
        }
        encryptedMode = true;
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
        if (options.verbose) {
            console.log(`Keychip ID: ${keychip_id}`);
        }
        postCheckIn();
    } else if (receivedData.startsWith("FIRMWARE_VER_")) {
        keychip_version = receivedData.split(' ').map(e => e.split('_VER_')[1]);
        if (options.verbose) {
            console.log(`Keychip Version: ${keychip_version.join('-')}`);
        }
    }
}

let dropOutTimer = null;
let lastCheckIn = null;

parser.on('data', (data) => {
    let receivedData = data.toString().trim();
    if (receivedData.startsWith('$')) {
        decryptMessage(receivedData.split('$')[1]);
    } else {
        parseIncomingMessage(receivedData);
    }
});
port.on('error', (err) => {
    if (options.verbose) {
        console.error(`Keychip Communication Error`, err);
    } else if (applicationArmed) {
        applicationArmed.kill("SIGINT");
    } else {
        if (err.message.includes("File not found")) {
            console.error('.[FAIL]\nKeychip not found');
        } else {
            process.stdout.write(".[FAIL]\n");
        }
    }
    if (!applicationArmed)
        ps.dispose().then(r => process.exit(10));
});
port.on('close', (err) => {
    if (options.verbose) {
        console.error(`Keychip Communication Closed`, err);
    } else if (applicationArmed) {
        console.error(`\nKeychip Removal\n`);
        applicationArmed.kill("SIGINT");
    } else {
        if (err.message.includes("File not found")) {
            console.error('\nKeychip not found');
        } else {
            process.stdout.write(".[FAIL]\n");
        }
    }
    if (!applicationArmed)
        ps.dispose().then(r => process.exit(10));
});

// Handle the opening of the serial port
port.on('open', async () => {
    if (options.launchApp) {
        await runCommand('Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Unrestricted -Confirm:$false -ErrorAction SilentlyContinue', true);
    }
    if (!(options.launchApp || cliArgs.launchApp || cliArgs.updateMode || cliArgs.shutdown || cliArgs.encryptSetup)) {
        process.stdout.write(".[FAIL]\n");
        process.exit(100);
    } else {
        process.stdout.write(".[OK]\n");
    }
    if (options.prepareScript) {
        if (options.verbose) {
            console.log(`Prepare Host`);
        } else {
            process.stdout.write("Preparing .");
        }
        await new Promise((ok) => {
            const prepare = spawn('powershell.exe', ['-File', resolve(options.prepareScript), '-ExecutionPolicy', 'Unrestricted ', '-NoProfile:$true'], {
                stdio: 'inherit' // Inherit the standard IO of the Node.js process
            });
            prepare.on('exit', function () {
                ok()
            })
            prepare.on('close', function () {
                ok()
            })
            prepare.on('end', function () {
                ok()
            })
        })
        if (!options.verbose) {
            process.stdout.write(".[OK]\n");
        }
    }
    if (options.verbose) {
        console.log(`Keychip Connected`);
    } else if (cliArgs.shutdown) {
        process.stdout.write("Please Wait .");
    } else {
        process.stdout.write("Mount Application .");
    }
    if (!options.dontCleanup) {
        await runCommand('Get-Disk -FriendlyName "Msft Virtual Disk" -ErrorAction SilentlyContinue | ForEach-Object { Dismount-DiskImage -DevicePath $_.Path -Confirm:$false } | Out-Null', false);
    }
    await sleep(200);
    sendMessage('?');
    watchdog = setInterval(() => {
        sendMessage('?');
    }, ((options.launchApp) ? 1000 : 2000));
});
