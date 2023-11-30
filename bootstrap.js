const application_version = 2.18;
const expected_crypto_version = 2;
const min_firmware_version = 2.3;
process.stdout.write(
    '[34m:[34m:[34m:[34m:[34m:[34m;[36mt[37mX[97m#[97mW[97m#[97m#[97m#[97m#[97mW[97m#[97m#[97m#[97m#[97m#[97m#[97m#[97m#[97mW[97mW[97m#[97m#[97m#[37mB[37mV[34m=[34m:[34m:[34m:[34m:[34m:[34m:[34m:[34m:[34m:[34m:[34m;[94m=[34m;[34m:[34m;[94mi[36mt[37mB[37mB[97mW[37mB[37mX[37mV[36mI[90mI[37mV[37mB[37mM[97mW[37mM[37mX[94mY[94mI[94mt[34m=[34m:[34m:[34m:[34m:[34m:[34m:[34m:[34m:[34m;[34m+[94mI[94mI[34m+[34m=[0m\n' +
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
    `\x1b[36mSavior of Song Keychip\x1b[0m \x1b[31mv${application_version}\x1b[0m\nby \x1b[35mKazari\x1b[0m\n\n`);

const fs = require('fs');
const {SerialPort, ReadlineParser} = require('serialport');
const yargs = require('yargs/yargs')
const {hideBin} = require('yargs/helpers');
const {spawn} = require('child_process');
const {PowerShell} = require("node-powershell");
const {resolve, join} = require("path");
const crypto = require('crypto-js');
const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));
const cliProgress = require('cli-progress');
const colors = require('ansi-colors');
const {release, tmpdir} = require("os");

let options = {};
let secureOptions = {};
const cliArgs = yargs(hideBin(process.argv))
    .option('port', {
        alias: 'c',
        type: 'string',
        description: 'Keychip Serial Port\nCOM5 is default port'
    })
    .option('verbose', {
        alias: 'v',
        type: 'bool',
        description: 'Verbose Mode',
        hidden: true
    })

    .option('auth', {
        alias: 'a',
        type: 'string',
        description: 'CMAK Authentication String\nBase64 Encoded "GAMEID AES_KEY AES_IV"'
    })

    .option('applicationVHD', {
        alias: 'x',
        type: 'string',
        description: 'Application Disk Image (X:\\)'
    })
    .option('appDataVHD', {
        alias: 'y',
        type: 'string',
        description: 'Configuration Disk Image (Y:\\)'
    })
    .option('optionVHD', {
        alias: 'z',
        type: 'string',
        description: 'Options Disk Image (Z:\\)'
    })

    .option('env', {
        alias: 'e',
        type: 'string',
        description: 'Environment Configuration File'
    })
    .option('secureEnv', {
        alias: 's',
        type: 'string',
        description: 'Environment Configuration File (Secured File)'
    })

    .option('forkExec', {
        type: 'bool',
        description: 'Fork the application as another child process in the event that the application is malfunctioning being launched the normal way'
    })
    .option('applicationExec', {
        type: 'string',
        description: 'File to execute (must be in X:\\)\nDefault order:\n1. X:\\<applicationExec>\n2. X:\\game.ps1\n3. X:\\bin\\game.bat\n4. X:\\bin\\start.bat'
    })
    .option('prepareScript', {
        alias: 'p',
        type: 'string',
        description: 'PS1 Script to execute to prepare host'
    })
    .option('shutdownScript', {
        alias: 'k',
        type: 'string',
        description: 'PS1 Script to execute when application is terminated\nThis is where tasks that require access to AppData should occur (Only AppData is Writable)'
    })
    .option('cleanupScript', {
        alias: 'q',
        type: 'string',
        description: 'PS1 Script to execute right before exiting keychip'
    })

    .option('update', {
        type: 'bool',
        description: 'Mount Application with write access and run update script (must be in X:\\)\nDefault Order:\n1. X:\\update.ps1 (Load Option Pack)\n2. X:\\download.ps1 (Online Update)\n3. X:\\bin\\update.bat'
    })
    .option('editMode', {
        type: 'bool',
        description: 'Mount as ReadWrite Mode and Detach Keychip to modify application files'
    })
    .option('shutdown', {
        type: 'bool',
        description: 'Unmount and Check-Out'
    })
    .option('encryptSetup', {
        type: 'bool',
        description: 'Setup Encryption of Application Volumes'
    })
    .option('dontCleanup', {
        type: 'bool',
        description: 'Do not unmount all disk images mounted'
    })
    .option('displayState', {
        type: 'string',
        description: 'state.txt file used by "A.S.R."'
    })
    .argv

async function errorState(errNum, errMessage) {
    const output =  `STEP ${lastStep}=${lastState}=true\nerror=true\nerrorno=ERROR ${errNum}\nerrormessage=${errMessage}\n`;
    if (cliArgs.displayState) {
        fs.writeFileSync(cliArgs.displayState, Buffer.from(output));
    }
}
let lastStep = "";
let lastState = "";
async function setState(step, state, completed) {
    lastStep = step;
    lastState = state;
    const output =  `STEP ${step}=${state}=true\nerror=false`;
    if (cliArgs.displayState) {
        fs.writeFileSync(cliArgs.displayState, Buffer.from(output));
    }
}

const subar = new cliProgress.SingleBar({
    format: '{stage} ({value}/{total}) |' + colors.cyan('{bar}') + '| {percentage}%',
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true
});
const sdbar = new cliProgress.SingleBar({
    format: '{stage} ({value}/{total}) |' + colors.redBright('{bar}') + '| {percentage}%',
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true
});
subar.start(35, 0, {
    stage: "Initialization"
});
setState('1', `起動しています`)

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
    loginKey: secureOptions.login_key || options.login_key,
    loginIV: secureOptions.login_iv || options.login_iv,
    applicationID: secureOptions.id || options.id,
    applicationVHD: cliArgs.applicationVHD || options.app,
    appDataVHD: cliArgs.appDataVHD || options.appdata,
    optionVHD: cliArgs.optionVHD || options.option,
    applicationExec: cliArgs.applicationExec || options.app_script,
    prepareScript: cliArgs.prepareScript || options.prepare_script,
    cleanupScript: cliArgs.cleanupScript || options.cleanup_script,
    shutdownScript: cliArgs.shutdownScript || options.shutdown_script,
    dontCleanup: cliArgs.dontCleanup || options.no_dismount_vhds,
};
if (cliArgs.auth) {
    // XXXX KEY IV
    try {
        const authString = Buffer.from(cliArgs.auth, 'base64').toString('ascii');
        if (!authString)
            throw new Error('No String');
        const authArray = authString.split(' ');
        if (authArray.length !== 3)
            throw new Error('Invalid Auth String Format');

        options.applicationID = authArray[0];
        options.loginKey = authArray[1];
        options.loginIV = authArray[2];
    } catch (err) {
        subar.stop();
        if (options.verbose) {
            console.error(`Failed to decode auth string: ${err.message}`);
        } else {
            console.error('\nInvalid Authentication');
        }
    }
}
if (cliArgs.versionFile) {
    const vf = JSON.parse(fs.readFileSync(resolve(cliArgs.versionFile)).toString());
    const versionFile = {
        applicationID: vf.id,
        applicationVHD: vf.app,
        appDataVHD: vf.appdata,
        optionVHD: vf.option,
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


setInterval(() => {
    process.title = `ARS NOVA I-401 Keychip [${options.applicationID}]`;
}, 100);

const port = new SerialPort({path: options.port, baudRate: 4800});
const parser = port.pipe(new ReadlineParser({delimiter: '\n'}));
subar.increment();

let returned_key = null;
let keychip_id = null;
let keychip_version = [0, 0, null];
let ready = false;
let applicationArmed = false;
let encryptedMode = !!(cliArgs.shutdown);
let currentKey = options.loginKey;
let currentIV = options.loginIV;

async function startCheckIn() {
    ready = true;
    if (parseFloat(keychip_version[0]) < min_firmware_version) {
        subar.stop();
        if (options.verbose) {
            console.error(`Firmware "${keychip_version[0]}" is outdated, please flash the latest version!`);
        } else {
            console.error('\n\x1b[5m\x1b[41m\x1b[30mKeychip Firmware Outdated\x1b[0m');
        }
        sendMessage('0');
        ps.dispose().then(r => process.exit(102));
    }
    if (parseFloat(keychip_version[1]) !== expected_crypto_version) {
        subar.stop();
        if (options.verbose) {
            console.error(`Disk Decryption Scheme (${keychip_version[1]} != ${expected_crypto_version}) Mismatch!`);
            console.error(`## IMPORTANT NOTICE ###############################################################`);
            console.error(`You must use the bootstrap version that matches your hardware crypto scheme`);
            console.error(`and mount disks as update mode, then disable encryption from BitLocker.`);
            console.error(`Once decrypted, you can update the bootstrap and firmware and run --encryptSetup`);
            console.error(`###################################################################################`);
        } else {
            console.error('\n\x1b[5m\x1b[41m\x1b[30mKeychip Crypto Incompatible\x1b[0m');
        }
        sendMessage('0');
        ps.dispose().then(r => process.exit(102));
    }
    if (options.applicationVHD || options.optionVHD || options.appDataVHD) {
        await setState('11', `ファイルシステムのマウント`)
        subar.update(10, {
            stage: "Mount Application"
        });
        if (options.applicationVHD) {
            if (fs.existsSync(options.applicationVHD)) {
                const prepareCmd = await prepareDisk({
                    disk: options.applicationVHD,
                    mountPoint: 'X:\\',
                    writeAccess: !!(cliArgs.update || cliArgs.editMode || cliArgs.encryptSetup)
                });
                if (!prepareCmd) {
                    subar.stop();
                    console.error('\n\x1b[5m\x1b[41m\x1b[30mFailed to Prepare Disk\x1b[0m');
                    await errorState('0084', 'ストレージデバイスの故障');
                    await ps.dispose().then(r => process.exit(102));
                } else {
                    subar.increment();
                }
            } else {
                subar.increment();
                await ps.dispose().then(r => process.exit(101));
            }
        }
        if (options.optionVHD) {
            if (fs.existsSync(options.optionVHD)) {
                const prepareCmd = await prepareDisk({
                    disk: options.optionVHD,
                    mountPoint: 'Z:\\',
                    writeAccess: !!(cliArgs.update || cliArgs.editMode || cliArgs.encryptSetup)
                });
                if (!prepareCmd) {
                    subar.stop();
                    console.error('\n\x1b[5m\x1b[41m\x1b[30mFailed to Prepare Disk\x1b[0m');
                    await errorState('0084', 'ストレージデバイスの故障');
                    await ps.dispose().then(r => process.exit(102));
                }
            } else {
                subar.stop();
                console.error('\n\x1b[5m\x1b[41m\x1b[30mFailed to Locate Disk\x1b[0m');
                await errorState('0084', 'ストレージデバイスの故障');
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
                    subar.stop();
                    console.error('\n\x1b[5m\x1b[41m\x1b[30mFailed to Prepare Disk\x1b[0m');
                    await errorState('0084', 'ストレージデバイスの故障');
                    await ps.dispose().then(r => process.exit(102));
                }
            } else {
                subar.stop();
                console.error('\n\x1b[5m\x1b[41m\x1b[30mFailed to Locate Disk\x1b[0m');
                await errorState('0084', 'ストレージデバイスの故障');
                ps.dispose().then(r => process.exit(101));
            }
        }
        if (options.verbose) {
            console.log(`Disk Setup Complete`);
        }
        await setState('15', `ゲームプログラムの認証`)
        subar.update(25, {
            stage: (cliArgs.encryptSetup) ? "Encrypt Application" :"Authorize Application"
        });

        if (cliArgs.encryptSetup) {
            if (options.applicationVHD && fs.existsSync(options.applicationVHD)) {
                const encryptCmd = await encryptDisk({diskNumber: 0, mountPoint: 'X:\\',});
                if (!encryptCmd) {
                    subar.stop();
                    console.error('\n\x1b[5m\x1b[41m\x1b[30mFailed to Encrypt Disk\x1b[0m');
                    ps.dispose().then(r => process.exit(99));
                } else {
                    subar.increment();
                }
            }
            if (options.optionVHD && fs.existsSync(options.optionVHD)) {
                const encryptCmd = await encryptDisk({diskNumber: 1, mountPoint: 'Z:\\',});
                if (!encryptCmd) {
                    subar.stop();
                    console.error('\n\x1b[5m\x1b[41m\x1b[30mFailed to Encrypt Disk\x1b[0m');
                    ps.dispose().then(r => process.exit(99));
                } else {
                    subar.increment();
                }
            }
        } else {
            if (options.applicationVHD && fs.existsSync(options.applicationVHD)) {
                const unlockCmd = await unlockDisk({diskNumber: 0, mountPoint: 'X:\\',});
                if (!unlockCmd) {
                    subar.stop();
                    console.error('\n\x1b[5m\x1b[41m\x1b[30mFailed to Unlock Disk\x1b[0m');
                    await errorState('0056', 'ストレージデバイスを認証できません');
                    ps.dispose().then(r => process.exit(103));
                } else {
                    subar.increment();
                }
            }
            if (options.optionVHD && fs.existsSync(options.optionVHD)) {
                const unlockCmd = await unlockDisk({diskNumber: 1, mountPoint: 'Z:\\',});
                if (!unlockCmd) {
                    subar.stop();
                    console.error('\n\x1b[5m\x1b[41m\x1b[30mFailed to Unlock Disk\x1b[0m');
                    await errorState('0056', 'ストレージデバイスを認証できません');
                    ps.dispose().then(r => process.exit(103));
                } else {
                    subar.increment();
                }
            }
        }
        if (options.verbose)
            console.log(`Unlock Done`);
        subar.update(34);
        await setState('21', `ゲームプログラムの起動準備中です`)
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
    if (cliArgs.editMode || cliArgs.encryptSetup) {
        subar.update(35, {
            stage: "Detach Keychip"
        });
        clearTimeout(watchdog);
        sendMessage("2");
    } else if (!cliArgs.shutdown) {
        if (options.verbose) {
            console.log(`Launch App`);
        }
        subar.update(35, {
            stage: (cliArgs.update) ? "Update Application" : "Launch Application"
        });
        await sleep(100);
        subar.stop();
        if (cliArgs.update) {
            if (fs.existsSync(resolve(`X:/update.ps1`))) {
                await runAppScript(`X:/update.ps1`);
            } else if (fs.existsSync(resolve(`X:/download.ps1`))) {
                await runAppScript(`X:/download.ps1`);
            } else if (fs.existsSync(resolve(`X:/bin/update.bat`))) {
                await runAppScript(`X:/bin/update.bat`, true);
            } else {
                await errorState('0063', 'ゲームプログラムが見つかりません');
                console.error('\n\n\x1b[5m\x1b[41m\x1b[30mNo Update Application was found\x1b[0m\n');
            }
        } else {
            if (options.applicationExec) {
                if (fs.existsSync(resolve(`X:/${options.applicationExec}`))) {
                    await runAppScript(`X:/${options.applicationExec}`, options.applicationExec.endsWith('.bat'));
                }
            } else if (fs.existsSync(resolve(`X:/game.ps1`))) {
                await runAppScript(`X:/game.ps1`);
            } else if (fs.existsSync(resolve(`X:/bin/game.bat`))) {
                await runAppScript(`X:/bin/game.bat`, true);
            } else if (fs.existsSync(resolve(`X:/bin/start.bat`))) {
                await runAppScript(`X:/bin/start.bat`, true);
            } else {
                await errorState('0063', 'ゲームプログラムが見つかりません');
                console.error('\n\n\x1b[5m\x1b[41m\x1b[30mNo Application was found\x1b[0m\n');
            }
        }
        process.stdout.write("\n");
        await runCheckOut();
    }
}
async function runCheckOut() {
    subar.stop();
    sdbar.start(11,0, {
        stage: "Application Terminated"
    })
    if (options.shutdownScript) {
        sdbar.update(1, {
            stage: "Shutdown System"
        })
        await new Promise((ok) => {
            const prepare = spawn('powershell.exe', ['-File', resolve(options.shutdownScript), '-ExecutionPolicy', 'Unrestricted ', '-NoProfile:$true'], {
                stdio: 'inherit', // Inherit the standard IO of the Node.js process,
                workingDirectory: process.cwd(),
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
        sdbar.increment();
    }
    sdbar.update(2, {
        stage: "Dismount Application"
    })
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
    }
    sdbar.update(9, {
        stage: "Release Keychip"
    })
    sendMessage('0');
    if (options.cleanupScript) {
        sdbar.update(10, {
            stage: "Cleanup System"
        })
        await new Promise((ok) => {
            const prepare = spawn('powershell.exe', ['-File', resolve(options.cleanupScript), '-ExecutionPolicy', 'Unrestricted ', '-NoProfile:$true'], {
                stdio: 'inherit', // Inherit the standard IO of the Node.js process
                workingDirectory: process.cwd(),
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
        sdbar.increment();
    }
    sdbar.update(11, {
        stage: "Shutdown Complete"
    })
    if (!options.dontCleanup) {
        await runCommand('Get-Disk -FriendlyName "Msft Virtual Disk" -ErrorAction SilentlyContinue | ForEach-Object { Dismount-DiskImage -DevicePath $_.Path -Confirm:$false } | Out-Null', false);
    }
    sdbar.stop();
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
async function createTask(exec, is_bat, workingDir, suppressOutput = false) {
    return new Promise(async ok => {
        try {
            fs.copyFileSync(join(__dirname , 'JOB_SOS_APP.xml'), join(tmpdir(), 'job.xml'));
            const printCommand = PowerShell.command([
                `Unregister-ScheduledTask -TaskName "TEMP_SOS_APP" -Confirm:$false -ErrorAction SilentlyContinue; `,
                `Register-ScheduledTask -TaskName TEMP_SOS_APP -Xml (Get-Content -Raw -Path "${resolve(join(tmpdir(), 'job.xml'))}") -ErrorAction Stop; `,
                `Set-ScheduledTask -TaskName 'TEMP_SOS_APP' -Action (New-ScheduledTaskAction -Execute '${(is_bat) ? 'cmd.exe' : 'powershell.exe'}' -Argument '${(is_bat) ? '/c' : '-NoProfile -ExecutionPolicy Bypass -File'} "${exec}"' -WorkingDirectory "${workingDir}")`,
            ]);
            const result = await ps.invoke(printCommand);
            if (options.verbose && (!suppressOutput || result.hadErrors)) {
                console.log(result.raw);
            }
            fs.unlinkSync(join(tmpdir(), 'job.xml'));
            ok(result);
        } catch (error) {
            if (options.verbose) {
                console.error(error);
            }
            fs.unlinkSync(join(tmpdir(), 'job.xml'));
            ok(false);
        }
    });
}
async function runAppScript(input, is_bat) {
    return new Promise(async (ok) => {
        let args = ["-Command"];
        if (cliArgs.forkExec) {
            await createTask(input, is_bat, process.cwd());
            args.push(`Start-ScheduledTask -TaskName "TEMP_SOS_APP"; While ((Get-ScheduledTask -TaskName "TEMP_SOS_APP").State -eq "Running") { Sleep -Seconds 1 }`)
        } else if (is_bat) {
            args.push(`Start-Process -Wait -FilePath runas -ArgumentList '${(parseInt(release().split('.').pop()) >= 22000) ? '/machine:amd64' : ''} /trustlevel:0x20000 "cmd.exe /c ${input}"'`)
        } else {
            args.push(`Start-Process -Wait -FilePath runas -ArgumentList '${(parseInt((release()).split('.').pop()) >= 22000) ? '/machine:amd64' : ''} /trustlevel:0x20000 "powershell.exe -File ${input} -NoProfile:$true"'`)
        }
        await setState('30', `まもなくゲームプログラムが起動します`, !(cliArgs.update))
        console.error('\n\x1b[42m\x1b[30mApplication Running\x1b[0m\n');
        applicationArmed = spawn("powershell.exe", args, {
            stdio: 'inherit' // Inherit the standard IO of the Node.js process
        });
        applicationArmed.on('exit', async function () {
            if (cliArgs.forkExec)
                await runCommand('Unregister-ScheduledTask -TaskName "TEMP_SOS_APP" -Confirm:$false -ErrorAction SilentlyContinue');
            ok()
        })
        applicationArmed.on('close', async function () {
            if (cliArgs.forkExec)
                await runCommand('Unregister-ScheduledTask -TaskName "TEMP_SOS_APP" -Confirm:$false -ErrorAction SilentlyContinue');
            ok()
        })
        applicationArmed.on('end', async function () {
            if (cliArgs.forkExec)
                await runCommand('Unregister-ScheduledTask -TaskName "TEMP_SOS_APP" -Confirm:$false -ErrorAction SilentlyContinue');
            ok()
        })
    })
}

async function prepareDisk(o) {
    subar.increment();
    // Remove any existing disk mounts
    await runCommand(`Dismount-DiskImage -ImagePath "${resolve(o.disk)}" -Confirm:$false -ErrorAction SilentlyContinue`, true);
    // Attach the disk to the drive letter or folder
    subar.increment();
    const mountCmd = await runCommand(`Mount-DiskImage -ImagePath "${resolve(o.disk)}" -StorageType VHD -NoDriveLetter -Passthru -Access ${(o.writeAccess) ? 'ReadWrite' : 'ReadOnly'} -Confirm:$false -ErrorAction Stop | Get-Disk | Get-Partition | where { ($_ | Get-Volume) -ne $Null } | Add-PartitionAccessPath -AccessPath ${o.mountPoint} -ErrorAction Stop | Out-Null`, true);
    return (mountCmd);
}
async function dismountCmd(o) {
    if (options.verbose && o.lockDisk) {
        console.log(`Lock Volume ${o.mountPoint}`);
    } else if (o.lockDisk) {
        sdbar.increment();
    }
    if (o.lockDisk)
        await runCommand(`Lock-BitLocker -MountPoint "${o.mountPoint}" -ForceDismount -Confirm:$false -ErrorAction SilentlyContinue`);
    if (options.verbose) {
        console.log(`Dismount Volume ${o.mountPoint}`);
    } else {
        sdbar.increment();
    }
    // Remove any existing disk mounts
    await runCommand(`Dismount-DiskImage -ImagePath "${resolve(o.disk)}" -Confirm:$false -ErrorAction SilentlyContinue`, true);
    return true;
}
async function unlockDisk(o) {
    if (options.verbose) {
        console.log(`Request Unlock ${o.diskNumber}`);
    } else {
        subar.increment();
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
        subar.increment();
    }
    const unlockCmd = await runCommand(`Unlock-BitLocker -MountPoint "${o.mountPoint}" -Password $(ConvertTo-SecureString -String "${returned_key}" -AsPlainText -Force) -Confirm:$false -ErrorAction Stop`);
    returned_key = null;
    await sleep(1000);
    return (unlockCmd);
}
async function encryptDisk(o) {
    if (options.verbose) {
        console.log(`Request Encrypt ${o.diskNumber}`);
    } else {
        subar.increment();
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
        subar.increment();
    }
    const unlockCmd = await runCommand(`Enable-BitLocker -MountPoint "${o.mountPoint}" -EncryptionMethod XtsAes256 -UsedSpaceOnly -SkipHardwareTest -PasswordProtector -Password $(ConvertTo-SecureString -String "${returned_key}" -AsPlainText -Force) -Confirm:$false -ErrorAction Stop`);
    returned_key = null;
    await sleep(1000);
    return (unlockCmd);
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
        errorState('0008', 'キーチップアクセスの失敗');
    }
}
async function parseIncomingMessage(receivedData) {
    if (receivedData.startsWith('KEYCHIP_FAILURE_')) {
        if (options.verbose) {
            console.error(`Keychip is locked out, Press reset button or reconnect`);
        } else {
            console.error(`\nHardware Failure ${receivedData.replace("KEYCHIP_FAILURE_", "")}`);
        }
        switch (receivedData.replace("KEYCHIP_FAILURE_", "")) {
            case "0001":
                await errorState('0004', 'ゲームプログラムは受け入れられません');
                break;
            case "0050":
                await errorState('0009', 'キーチップのファームウェアが古い\nファームウェアをアップデートしてください');
                break;
            default:
                await errorState('0009', 'キーチップのハードウェアの故障');
                break;
        }
        process.exit(100);
    } else if (receivedData === 'SG_HELLO' && (applicationArmed !== false && !(cliArgs.editMode && cliArgs.shutdown && cliArgs.encryptMode))) {
        lastCheckIn = new Date().valueOf();
        clearTimeout(dropOutTimer);
        dropOutTimer = setTimeout(async () => {
            if (options.verbose) {
                console.error(`Keychip Checkin Failed`);
            }
            if (applicationArmed !== false) {
                if (cliArgs.forkExec)
                    await runCommand('Stop-ScheduledTask -TaskName "TEMP_SOS_APP" -ErrorAction SilentlyContinue');
                applicationArmed.kill("SIGINT");
            } else {
                ps.dispose().then(r => process.exit(1));
            }
        }, 5000)
    } else if (receivedData === 'SG_HELLO' && ready === false) {
        if (options.verbose) {
            console.log(`Ready`);
        }
        subar.increment();
        if (cliArgs.shutdown) {
            subar.update(35, {
                stage: "Shutdown Request",
            });
            runCheckOut();
        } else {
            port.write('@5!');
            sleep(100).then(() => {
                port.write(`@6:${options.applicationID}:!`);
            });
        }
    } else if (receivedData === 'SG_LV1_RESET' || receivedData === 'SG_LV1_GOODBYE') {
        ps.dispose().then(r => process.exit(0));
    } else if (receivedData === 'SG_LV0_GOODBYE') {
        sendMessage(`1`);
    } else if (receivedData === 'SG_ENC_READY') {
        if (options.verbose) {
            console.log(`Switching to Encrypted Mode`);
        }
        subar.increment();
        encryptedMode = true;
    } else if (receivedData.startsWith("SG_UNLOCK")) {
        subar.increment();
        if (!cliArgs.shutdown) {
            startCheckIn();
        }
    } else if (receivedData.startsWith("CRYPTO_KEY_")) {
        returned_key = receivedData.substring(11).trim().split("x0")[0];
    } else if (receivedData.startsWith("KEYCHIP_ID_")) {
        keychip_id = receivedData.substring(11).trim();
        if (options.verbose) {
            console.log(`Keychip ID: ${keychip_id}`);
        }
        subar.increment();
        postCheckIn();
    } else if (receivedData.startsWith("FIRMWARE_VER_")) {
        keychip_version = receivedData.split(' ').map(e => e.split('_VER_').pop());
        if (options.verbose) {
            console.log(`Keychip Version: ${keychip_version.join('-')}`);
        }
        subar.increment();
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
port.on('error', async (err) => {
    if (options.verbose) {
        console.error(`Keychip Communication Error`, err);
        await errorState('0008', 'キーチップアクセスの失敗');
    } else if (applicationArmed) {
        if (cliArgs.forkExec)
            await runCommand('Stop-ScheduledTask -TaskName "TEMP_SOS_APP" -ErrorAction SilentlyContinue');
        applicationArmed.kill("SIGINT");
    } else {
        if (err.message.includes("File not found")) {
            subar.stop();
            console.error('\n\x1b[5m\x1b[41m\x1b[30mKeychip not found\x1b[0m');
            await errorState('0001', 'キーチップが見つかりません');
            await sleep(5000)
        } else {
            subar.stop();
            console.error('\n\x1b[5m\x1b[41m\x1b[30mKeychip Hardware Failure\x1b[0m');
            await errorState('0009', 'キーチップのハードウェアの故障');
        }
    }
    if (!applicationArmed)
        ps.dispose().then(r => process.exit(10));
});
port.on('close', async (err) => {
    if (options.verbose) {
        console.error(`Keychip Communication Closed`, err);
    } else if (applicationArmed) {
        console.error(`\nKeychip Removal\n`);
        if (cliArgs.forkExec)
            await runCommand('Stop-ScheduledTask -TaskName "TEMP_SOS_APP" -ErrorAction SilentlyContinue');
        applicationArmed.kill("SIGINT");
    } else {
        if (err.message.includes("File not found")) {
            subar.stop();
            console.error('\n\x1b[5m\x1b[41m\x1b[30mKeychip Removal\x1b[0m');
            await errorState('0001', 'キーチップが見つかりません');
        } else {
            subar.stop();
            console.error('\n\x1b[5m\x1b[41m\x1b[30mKeychip Hardware Failure\x1b[0m');
            await errorState('0009', 'キーチップのハードウェアの故障');
        }
    }
    if (!applicationArmed)
        ps.dispose().then(r => process.exit(10));
});

// Handle the opening of the serial port
port.on('open', async () => {
    await runCommand('Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Unrestricted -Confirm:$false -ErrorAction SilentlyContinue | Out-Null', true);
    subar.increment();
    if (options.prepareScript) {
        if (options.verbose) {
            console.log(`Prepare Host`);
        }
        await setState('3', `システムの設定`)
        subar.update(3, {
            stage: "Preparing System"
        });
        await new Promise((ok) => {
            const prepare = spawn('powershell.exe', ['-File', resolve(options.prepareScript), '-ExecutionPolicy', 'Unrestricted ', '-NoProfile:$true'], {
                stdio: 'inherit', // Inherit the standard IO of the Node.js process
                workingDirectory: process.cwd(),
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
    if (options.verbose) {
        console.log(`Keychip Connected`);
    }
    subar.update(4, {
        stage: "Preparing Keychip"
    });
    await setState('4', `キーチップとの通信`)
    if (!options.dontCleanup) {
        await runCommand('Get-Disk -FriendlyName "Msft Virtual Disk" -ErrorAction SilentlyContinue | ForEach-Object { Dismount-DiskImage -DevicePath $_.Path -Confirm:$false } | Out-Null', false);
    }
    await sleep(200);
    sendMessage('?');
    watchdog = setInterval(() => {
        sendMessage('?');
    }, ((!(cliArgs.editMode && cliArgs.shutdown && cliArgs.encryptMode)) ? 1000 : 2000));
});
