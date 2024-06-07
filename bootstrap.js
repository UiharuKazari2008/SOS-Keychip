(async ()=> {
    const application_version = 4.04;
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
    const ini = require('ini');
    const { SerialPort, ReadlineParser } = require('serialport');
    const yargs = require('yargs/yargs')
    const request = require('request');
    const { hideBin } = require('yargs/helpers');
    const { spawn } = require('child_process');
    const { PowerShell } = require("node-powershell");
    const { resolve, join, basename, dirname } = require("path");
    const crypto = require('crypto-js');
    const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));
    const cliProgress = require('cli-progress');
    const colors = require('ansi-colors');
    const {release, tmpdir} = require("os");
    const express = require('express');
    const app = express();
    const restPort = 6789;

    let options = {};
    let secureOptions = {};
    const cliArgs = yargs(hideBin(process.argv))
        .option('port', {
            alias: 'c',
            type: 'string',
            description: 'Keychip Serial Port\nCOM5 is default port'
        })
        .option('swMode', {
            type: 'boolean',
            description: 'Use Software Keychip'
        })
        .option('verbose', {
            alias: 'v',
            type: 'bool',
            description: 'Verbose Mode',
            hidden: true
        })
        .option('debug', {
            type: 'bool',
            description: 'Debugger Enabled',
            hidden: true
        })
        .option('lifecycleEnabled', {
            type: 'bool',
            description: 'Enable REST endpoints for Lifecycle controller',
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
        .option('runtimeVHD', {
            alias: 'w',
            type: 'string',
            description: 'Runtime Modification Disk Image (W:\\)'
        })

        .option('applicationDelta', {
            type: 'bool',
            description: 'Enable Runtime Delta Disk (Application Disk Image)'
        })
        .option('appDataDelta', {
            type: 'bool',
            description: 'Enable Runtime Delta Disk (Configuration Disk Image)'
        })
        .option('optionDelta', {
            type: 'bool',
            description: 'Enable Runtime Delta Disk (Options Disk Image)'
        })
        .option('runtimeDelta', {
            type: 'bool',
            description: 'Enable Runtime Delta Disk (Runtime Workspace)'
        })

        .option('runtimeOption', {
            type: 'string',
            description: 'String Passed to Runtime Modification Script'
        })

        .option('appIni', {
            alias: 'i',
            type: 'string',
            description: 'Applications INI file to be used for networking and keychip pass-trough'
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
        .option('restrictExec', {
            type: 'bool',
            description: 'Run Application with Restricted Permissions (Created new window)'
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
        .option('preStartScript', {
            type: 'string',
            description: 'PS1 Script to execute before applicationExec'
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

        .option('networkDirect', {
            type: 'string',
            description: 'Network Environment IP Address'
        })
        .option('networkDriver', {
            alias: 'h',
            type: 'string',
            description: 'Haruna Network Driver (or other applicable)'
        })
        .option('networkOverlay', {
            type: 'string',
            description: 'Haruna Status Overlay (or other applicable)'
        })
        .option('networkConfig', {
            alias: 'n',
            type: 'string',
            description: 'Network Driver configFile Value'
        })
        .option('netPrepScript', {
            type: 'string',
            description: 'Network Prepare Script'
        })
        .option('netCleanScript', {
            type: 'string',
            description: 'Network Cleanup Script'
        })

        .option('patchDriver', {
            type: 'string',
            description: 'Application Patch Driver'
        })

        .option('freePlay', {
            type: 'bool',
            description: 'Enable Freeplay'
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
        .option('configState', {
            type: 'string',
            description: 'current_config.txt file used by "A.S.R."'
        })
        .option('configErrors', {
            type: 'string',
            description: 'config_error.txt file used by "A.S.R."'
        })

        .option('logFile', {
            type: 'string',
            description: 'Log file for powershell transactions'
        })
        .argv

    if (cliArgs.lifecycleEnabled) {
        console.error('\n\x1b[46m\x1b[30mLifecycle Controller Enabled [Kongou + Iona]\x1b[0m\n');
        const remote_options = await new Promise(ok => {
            request(`http://127.0.0.1:6799/lce/iona/config.json`, {
                timeout: 15000
            }, async (error, response, body) => {
                if (!error && response.statusCode === 200) {
                    try {
                        const json = JSON.parse(body.toString());
                        ok(json);
                    } catch (e) {
                        ok(false);
                    }
                } else {
                    await addError(`ERROR: Unable to read PRAM from LCC!\n`);
                    if (error)
                        await addError(`ERROR: ${error.message}\n`);
                    ok(undefined);
                }
            })
        })
        if (remote_options) {
            options = remote_options;
        } else {
            await errorState('0002', 'Configuration Failure');
        }
    } else {
        if (cliArgs.env && fs.existsSync(resolve(cliArgs.env))) {
            options = JSON.parse(fs.readFileSync(resolve(cliArgs.env)).toString());
        }
        if (cliArgs.secureEnv && fs.existsSync(resolve(cliArgs.secureEnv))) {
            secureOptions = JSON.parse(fs.readFileSync(resolve(cliArgs.secureEnv)).toString());
        }
    }

    async function errorState(errNum, errMessage) {
        const output =  `STEP ${lastStep}=${lastState}=true\nerror=true\nerrorno=ERROR ${errNum}\nerrormessage=${errMessage}\n`;
        if (options.asrState || cliArgs.displayState) {
            try {
                fs.writeFileSync((options.asrState || cliArgs.displayState), Buffer.from(output));
            } catch (e) {
                console.error('Failed to communicate with preboot')
            }
        }
    }
    let lastStep = "";
    let lastState = "";
    async function setState(step, state, completed) {
        lastStep = step;
        lastState = state;
        const output =  `STEP ${step}=${state}=${(completed) ? completed : 'false'}\nerror=false`;
        if (options.asrState || cliArgs.displayState) {
            try {
                fs.writeFileSync((options.asrState || cliArgs.displayState), Buffer.from(output));
            } catch (e) {
                console.error('Failed to communicate with preboot')
            }
        }
    }
    let lastHarunaState = "false"
    let lastSpState = "false"
    let lastKeyState = "not_ready"
    let lastPatcherState = "not_ready"
    async function setConState(haruna_state, sp_state, key_state, patcher_state) {
        if (haruna_state !== undefined)
            lastHarunaState = haruna_state;
        if (sp_state !== undefined)
            lastSpState = sp_state;
        if (key_state !== undefined)
            lastKeyState = key_state;
        if (patcher_state !== undefined)
            lastPatcherState = patcher_state;
        const output =  `haruna=${lastHarunaState}\nsp_en=${lastSpState}\nkeychip=${lastKeyState}\nrtp=${lastPatcherState}\n`;
        if (options.asrConfig || cliArgs.configState) {
            try {
                fs.writeFileSync((options.asrConfig || cliArgs.configState), Buffer.from(output));
            } catch (e) {
                console.error('Failed to communicate with preboot')
            }
        }
    }

    async function addError(error_text) {
        let errorWrote = false;
        if (options.asrErrors || cliArgs.configErrors) {
            while (!errorWrote) {
                try {
                    const errorFile = (options.asrErrors || cliArgs.configErrors)
                    fs.appendFileSync(errorFile, Buffer.from((fs.readFileSync(errorFile)).toString() + '\n' + error_text.toString()));
                    errorWrote = true;
                } catch (e) {
                    console.error('Failed to writing config error')
                    await sleep(12);
                }
            }
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
    subar.start(36, 0, {
        stage: "Initialization"
    });
    setState('1', `Boot`)

    let knox_mode = false;
    let returned_key = null;
    let keychip_id = (options && options.keychip_id) ? options.keychip_id : null;
    let board_id = (options && options.board_id) ? options.board_id : 'ACA401A00660401';
    let keychip_version = [0, 0, null];
    let ready = false;
    let applicationArmed = false;
    let encryptedMode = !!(cliArgs.shutdown);
    let highRefreshRate = false;

    options = {
        ...options,
        port: cliArgs.port || options.port || "COM5",
        softwareMode: cliArgs.swMode || options.softwareMode || false,
        verbose: cliArgs.verbose || options.verbose,
        debug: cliArgs.debug || options.debug,
        lcc: cliArgs.lifecycleEnabled || options.lifecycle_controller,
        loginKey: secureOptions.login_key || options.login_key,
        loginIV: secureOptions.login_iv || options.login_iv,
        applicationID: secureOptions.id || options.id,
        applicationINI: cliArgs.appIni || options.ini,
        applicationVHD: cliArgs.applicationVHD || options.app,
        appDataVHD: cliArgs.appDataVHD || options.appdata,
        optionVHD: cliArgs.optionVHD || options.option,
        runtimeVHD: cliArgs.runtimeVHD || options.runtime_modify,
        applicationDelta: cliArgs.applicationDelta || options.app_delta,
        optionDelta: cliArgs.optionDelta || options.option_delta,
        runtimeDelta: cliArgs.runtimeDelta || options.runtime_delta,
        runtimeOption: cliArgs.runtimeOption || options.runtime_modify_option,
        applicationExec: cliArgs.applicationExec || options.app_script,
        prepareScript: cliArgs.prepareScript || options.prepare_script,
        preStartScript: cliArgs.preStartScript || options.pre_exec_script,
        cleanupScript: cliArgs.cleanupScript || options.cleanup_script,
        shutdownScript: cliArgs.shutdownScript || options.shutdown_script,
        dontCleanup: cliArgs.dontCleanup || options.no_dismount_vhds,
        networkDriver: cliArgs.networkDriver || options.network_driver,
        networkOverlay: cliArgs.networkOverlay || options.network_overlay,
        networkConfig: cliArgs.networkConfig || options.network_config,
        netPrepareScript: cliArgs.netPrepScript || options.network_start_script,
        netShutdownScript: cliArgs.netCleanScript || options.network_stop_script,
        freePlayEnabled: cliArgs.freePlay || options.freePlayEnabled,
        delevate_exec: cliArgs.restrictExec || options.delevate_exec,
        fork_exec: cliArgs.forkExec || options.fork_exec,
        patchDriver: cliArgs.patchDriver || options.patch_driver,
    };
    if (cliArgs.auth) {
        // XXXX KEY IV
        try {
            const authString = Buffer.from(cliArgs.auth, 'base64').toString('ascii');
            if (!authString)
                throw new Error('No String');
            const authArray = authString.split(' ');
            if (authArray.length < 3)
                throw new Error('Invalid Auth String Format');

            options.applicationID = authArray[0];
            options.loginKey = authArray[1];
            options.loginIV = authArray[2];
            if (options.softwareMode) {
                keychip_id = authArray[3];
                if (authArray.length >= 5) {
                    board_id = authArray[4];
                }
            }
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
            applicationID: vf.id || options.applicationID,
            applicationVHD: vf.app || options.applicationVHD,
            appDataVHD: vf.appdata || options.appDataVHD,
            optionVHD: vf.option || options.optionVHD,
            runtimeVHD: vf.runtime_modify || options.runtimeVHD,
            applicationDelta: vf.enable_app_delta || options.applicationDelta,
            appDataDelta: vf.enable_appdata_delta || options.appDataDelta,
            optionDelta: vf.enable_options_delta || options.optionDelta,
            runtimeOption: vf.runtime_modify_option || options.runtimeOption,
            applicationExec: vf.app_script || options.applicationExec,
        }
        options = {
            ...options,
            ...versionFile
        };
    }

    let login_key_md5 = "NOT_READY";
    let watchdog = null;
    let unlockPassword = null;
    let userUnlockPassword = null;

    if (options.loginKey && options.loginIV) {
        login_key_md5 = (crypto.MD5(`${options.loginKey}-${options.loginIV}`)).toString();
        options.login_check = login_key_md5;
    }

    if (options.verbose)
        console.log(options);


    setInterval(() => {
        process.title = `ARS NOVA I-401 Keychip${(cliArgs.lifecycleEnabled) ? " + Kongou LCC" : ''} (${(options.softwareMode) ? 'Software Mode' : 'via ' + options.port }) [${options.applicationID || 'Invalid'}]`;
    }, 100);

    let port = null;
    let parser = null;
    if (!options.softwareMode) {
        port = new SerialPort({path: options.port, baudRate: 4800});
        parser = port.pipe(new ReadlineParser({delimiter: '\n'}));
    }
    subar.increment();

    let currentKey = options.loginKey;
    let currentIV = options.loginIV;

    async function startCheckIn() {
        ready = true;
        if ((options.runtimeVHD && fs.existsSync(options.runtimeVHD)) || options.patchDriver) {
            await setConState(undefined, undefined, (options.runtimeOption && options.runtimeOption.includes("PRIVATE")) ? "overlay_not_ready_ex" : "overlay_not_ready");
        }
        if (options.patchDriver) {
            await setConState(undefined, undefined, undefined, "ready");
        }
        if (!options.softwareMode && parseFloat(keychip_version[0]) < min_firmware_version) {
            subar.stop();
            if (options.verbose) {
                console.error(`Firmware "${keychip_version[0]}" is outdated, please flash the latest version!`);
            } else {
                console.error('\n\x1b[5m\x1b[41m\x1b[30mKeychip Firmware Outdated\x1b[0m');
            }
            sendMessage('0');
            await exitAction(102);
        }
        if (!options.softwareMode && parseFloat(keychip_version[1]) !== expected_crypto_version) {
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
            await exitAction(102);
        }
        if (options.applicationVHD || options.optionVHD  || options.runtimeVHD || options.appDataVHD) {
            await setState('11', (cliArgs.update) ? `Mount Volumes (Update)` : `Mount Game Program`)
            subar.update(10, {
                stage: "Mount Application"
            });
            if (options.applicationVHD) {
                if (fs.existsSync(options.applicationVHD)) {
                    const prepareCmd = await prepareDisk({
                        disk: options.applicationVHD,
                        mountPoint: 'X:\\',
                        delta: !!(((options.applicationDelta && options.runtimeVHD) || options.patchDriver) && !(cliArgs.update || cliArgs.editMode || cliArgs.encryptSetup)),
                        writeAccess: !!(cliArgs.update || cliArgs.editMode || cliArgs.encryptSetup)
                    });
                    if (!prepareCmd) {
                        subar.stop();
                        console.error('\n\x1b[5m\x1b[41m\x1b[30mFailed to Prepare Disk\x1b[0m');
                        await errorState('0084', 'Storage Device Malfunctioning');
                        await exitAction(102);
                    } else {
                        subar.increment();
                    }
                } else {
                    subar.increment();
                    await exitAction(101);
                }
            }
            if (options.optionVHD) {
                if (fs.existsSync(options.optionVHD)) {
                    const prepareCmd = await prepareDisk({
                        disk: options.optionVHD,
                        mountPoint: 'Z:\\',
                        delta: !!(options.optionDelta && options.runtimeVHD && !(cliArgs.update || cliArgs.editMode || cliArgs.encryptSetup)),
                        writeAccess: !!(cliArgs.update || cliArgs.editMode || cliArgs.encryptSetup)
                    });
                    if (!prepareCmd) {
                        subar.stop();
                        console.error('\n\x1b[5m\x1b[41m\x1b[30mFailed to Prepare Disk\x1b[0m');
                        await errorState('0084', 'Storage Device Malfunctioning');
                        await exitAction(102);
                    }
                } else {
                    subar.stop();
                    console.error('\n\x1b[5m\x1b[41m\x1b[30mFailed to Locate Disk\x1b[0m');
                    await errorState('0084', 'Storage Device Malfunctioning');
                    await exitAction(101);
                }
            }
            if (options.appDataVHD) {
                if (fs.existsSync(options.appDataVHD)) {
                    const prepareCmd = await prepareDisk({
                        disk: options.appDataVHD,
                        mountPoint: 'Y:\\',
                        delta: !!(options.appDataDelta && options.runtimeVHD && !(cliArgs.update || cliArgs.editMode || cliArgs.encryptSetup)),
                        writeAccess: true
                    });
                    if (!prepareCmd) {
                        subar.stop();
                        console.error('\n\x1b[5m\x1b[41m\x1b[30mFailed to Prepare Disk\x1b[0m');
                        await errorState('0084', 'Storage Device Malfunctioning');
                        await exitAction(102);
                    }
                } else {
                    subar.stop();
                    console.error('\n\x1b[5m\x1b[41m\x1b[30mFailed to Locate Disk\x1b[0m');
                    await errorState('0084', 'Storage Device Malfunctioning');
                    await exitAction(101);
                }
            }
            if (options.runtimeVHD) {
                if (fs.existsSync(options.runtimeVHD)) {
                    const prepareCmd = await prepareDisk({
                        disk: options.runtimeVHD,
                        mountPoint: 'W:\\',
                        delta: !!(options.runtimeDelta && options.runtimeVHD && !(cliArgs.update || cliArgs.editMode || cliArgs.encryptSetup)),
                        writeAccess: !!(cliArgs.update || cliArgs.editMode || cliArgs.encryptSetup)
                    });
                    if (!prepareCmd) {
                        subar.stop();
                        console.error('\n\x1b[5m\x1b[41m\x1b[30mFailed to Prepare Disk\x1b[0m');
                        await errorState('0084', 'Storage Device Malfunctioning');
                        await exitAction(102);
                    } else {
                        await setConState(undefined, undefined, (options.runtimeOption && options.runtimeOption.includes("PRIVATE")) ? "overlay_ready_ex" : "overlay_ready");
                    }
                } else {
                    subar.stop();
                    console.error('\n\x1b[5m\x1b[41m\x1b[30mFailed to Locate Disk\x1b[0m');
                    await errorState('0084', 'Storage Device Malfunctioning');
                    await exitAction(101);
                }
            } else {
                await setConState(undefined, undefined, (options.softwareMode) ? "ready": "lock");
            }
            if (options.verbose) {
                console.log(`Disk Setup Complete`);
            }

            await setState('15', `Authenticate Game Program`)
            subar.update(25, {
                stage: (cliArgs.encryptSetup) ? "Encrypt Application" :"Authorize Application"
            });

            if (cliArgs.encryptSetup) {
                if (options.applicationVHD && fs.existsSync(options.applicationVHD)) {
                    const encryptCmd = await encryptDisk({diskNumber: 0, mountPoint: 'X:\\',});
                    if (!encryptCmd) {
                        subar.stop();
                        console.error('\n\x1b[5m\x1b[41m\x1b[30mFailed to Encrypt Disk\x1b[0m');
                        await exitAction(99);
                    } else {
                        subar.increment();
                    }
                }
                if (options.optionVHD && fs.existsSync(options.optionVHD)) {
                    const encryptCmd = await encryptDisk({diskNumber: 1, mountPoint: 'Z:\\',});
                    if (!encryptCmd) {
                        subar.stop();
                        console.error('\n\x1b[5m\x1b[41m\x1b[30mFailed to Encrypt Disk\x1b[0m');
                        await exitAction(99);
                    } else {
                        subar.increment();
                    }
                }
                if (options.runtimeVHD && fs.existsSync(options.runtimeVHD)) {
                    const encryptCmd = await encryptDisk({diskNumber: 3, mountPoint: 'W:\\',});
                    if (!encryptCmd) {
                        subar.stop();
                        console.error('\n\x1b[5m\x1b[41m\x1b[30mFailed to Encrypt Disk\x1b[0m');
                        await exitAction(99);
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
                        await errorState('0083', 'Storage Device Not Acceptable');
                        await exitAction(103);
                    } else {
                        subar.increment();
                    }
                }
                if (options.optionVHD && fs.existsSync(options.optionVHD)) {
                    const unlockCmd = await unlockDisk({diskNumber: 1, mountPoint: 'Z:\\',});
                    if (!unlockCmd) {
                        subar.stop();
                        console.error('\n\x1b[5m\x1b[41m\x1b[30mFailed to Unlock Disk\x1b[0m');
                        await errorState('0083', 'Storage Device Not Acceptable');
                        await exitAction(103);
                    } else {
                        subar.increment();
                    }
                }
                if (options.runtimeVHD && fs.existsSync(options.runtimeVHD)) {
                    const unlockCmd = await unlockDisk({diskNumber: 3, mountPoint: 'W:\\',});
                    if (!unlockCmd) {
                        subar.stop();
                        console.error('\n\x1b[5m\x1b[41m\x1b[30mFailed to Unlock Disk\x1b[0m');
                        await errorState('0083', 'Storage Device Not Acceptable');
                        await exitAction(103);
                    } else {
                        subar.increment();
                    }
                }
                if (!(cliArgs.update || cliArgs.editMode || cliArgs.shutdown)) {
                    await setState('16', `Prepare Game Volumes`)
                    let preloadCmd = undefined;
                    if (options.preStartScript && fs.existsSync(resolve(options.preStartScript))) {
                        preloadCmd = await runCommand(`. ${resolve(options.preStartScript)} "${options.runtimeOption}"`, true, `Preload Script`);
                    } else if (fs.existsSync(resolve(`Q:/lib/keychip/preload.ps1`))) {
                        preloadCmd = await runCommand(`. ${resolve(`Q:/lib/keychip/preload.ps1`)} "${options.runtimeOption}"`, true, `Preload Script (LLC)`);
                    } else if (fs.existsSync(resolve(`W:\\preload.ps1`))) {
                        preloadCmd = await runCommand(`. W:\\preload.ps1 "${options.runtimeOption}"`, false, `Runtime Volume Overlay`);
                    }
                    if (preloadCmd === undefined) {
                        // Skipped
                    } else if (!preloadCmd) {
                        subar.stop();
                        console.error('\n\x1b[5m\x1b[41m\x1b[30mFailed to Prepare Application Data\x1b[0m');
                        await errorState('0087', 'Overlay Volume Malfunctioning');
                        await exitAction(102);
                    } else {
                        await setConState(undefined, undefined, (options.runtimeOption && options.runtimeOption.includes("PRIVATE")) ? "overlay_done_ex" : "overlay_done");
                    }
                    if (options.patchDriver) {
                        const patchCmd = await runCommand(`& '${resolve(options.patchDriver)}'`, false, `App Configuration`);
                        if (!patchCmd) {
                            subar.stop();
                            console.error('\n\x1b[5m\x1b[41m\x1b[30mFailed to Prepare Application Config\x1b[0m');
                            await errorState('0088', 'Application Config Malfunctioning');
                            await exitAction(102);
                        } else {
                            await setConState(undefined, undefined, undefined, "done");
                        }
                    }
                }
            }
            if (cliArgs.update) {
                const unlockKey = await getUpdatePassword({});
                if (!unlockKey) {
                    subar.stop();
                    console.error('\n\x1b[5m\x1b[41m\x1b[30mFailed to obtain update password!\x1b[0m');
                    await errorState('0053', 'Install Media Access Failed');
                    await exitAction(102);
                } else {
                    await sleep(1100);
                    const userUnlockKey = await getUserOptionPassword({});
                }
                await sleep(1100);
            }
            if (options.verbose)
                console.log(`Unlock Done`);
            try {
                if (options.applicationINI && fs.existsSync(resolve(options.applicationINI) + '.bak')) {
                    fs.unlinkSync(resolve(options.applicationINI));
                    fs.copyFileSync(resolve(options.applicationINI) + '.bak', resolve(options.applicationINI));
                } else if (options.applicationINI && fs.existsSync(resolve(options.applicationINI))) {
                    fs.copyFileSync(resolve(options.applicationINI), resolve(options.applicationINI) + '.bak');
                }
            } catch (e) {
                await addError(e.message);
                await errorState('0110', 'Corrupted Database Volume');
            }
            subar.update(34);
            if (options.softwareMode) {
                await injectKeychipID();
                subar.increment();
                postCheckIn();
            } else {
                sendMessage('11');
            }
        } else {
            // Nothing to do, Check-Out Crypto
            setTimeout(() => {
                if (!options.softwareMode)
                    sendMessage('0');
                exitAction(1);
            }, 1000);
        }
    }
    async function postCheckIn() {
        if (cliArgs.editMode || cliArgs.encryptSetup) {
            subar.update(36, {
                stage: "Detach Keychip"
            });
            clearTimeout(watchdog);
            if (!options.softwareMode)
                sendMessage("2");
            exitAction(0);
        } else if (!cliArgs.shutdown) {
            if (options.networkDriver && !cliArgs.update) {
                if (fs.existsSync(resolve(options.networkConfig))) {
                   try {
                       const haruna_config = JSON.parse(fs.readFileSync(resolve(options.networkConfig)));
                       if (haruna_config && haruna_config.login && haruna_config.login.group) {
                           switch (haruna_config.login.group) {
                               case "B":
                                   await setConState("B");
                                   break;
                               case "C":
                                   await setConState("C");
                                   break;
                               case "D":
                                   await setConState("D");
                                   break;
                               default:
                                   await setConState("A");
                                   break;
                           }
                       }
                   } catch (e) {
                       console.error("Failed to read Harunas Config")
                   }
                } else {
                    //                      XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                    await addError(`ERROR: Missing Haruna Network Configuration!\n       Global matching will be unavailable`);
                }
                await setState('17', `Setup Networking`);
                subar.update(35, {
                    stage: "Configure Network Driver"
                });
                if (options.verbose) {
                    console.log(`Setup Network Driver`);
                }
                let initNetworkPasses = true
                async function startDriver() {
                    let args = [];
                    if (options.netPrepareScript)
                        args.push(`. ${resolve(options.netPrepareScript)}; `);
                    args.push(`Start-Process -Wait -WindowStyle Hidden -FilePath "${resolve(options.networkDriver)}" -ArgumentList '--configFile "${options.networkConfig}" ${(options.applicationINI) ? '--iniFile "' + dirname(options.applicationINI) + '"' : ''}'; `);
                    const initStart = PowerShell.command(args);
                    networkDriver = await psUtility.invoke(initStart);
                    networkOk = false;
                    await setConState("false");
                    if (initNetworkPasses)
                        startDriver();
                }
                startDriver();
                await setState('18', `Waiting for Network`);
                await sleep(10000);
                if (!networkOk) {
                    //                      XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                    await addError(`ERROR: Haruna Network Driver did not stabilize!\n       - Check Internet connection\n       - Check Group Occupancy`);
                    initNetworkPasses = false;
                }
            }

            if (options.verbose) {
                console.log(`Launch App`);
            }
            if (!cliArgs.update) {
                await setState('20', `Flush Write Cache`);
                await runCommand(`Write-VolumeCache Y`, false, `Database Volume Write Cache Flush`);
                await runCommand(`Write-VolumeCache S`, false, `AMFS Volume Write Cache Flush`);
            }
            await setState((cliArgs.update) ? '22' : '21', (cliArgs.update) ? 'Install Program Update' : `Launch Game Program`)
            subar.update(36, {
                stage: (cliArgs.update) ? "Update Application" : "Launch Application"
            });
            await sleep(100);
            subar.stop();
            if (!networkOk) {
                enableNetworkDriver = false;
                //await errorState('8002', 'Network setting error (SYSTEM)');
                await setConState("false");
            }
            if (cliArgs.update) {
                if (fs.existsSync(resolve(`X:/update.ps1`))) {
                    await runCommand(`. X:/update.ps1  "${unlockPassword}" "${userUnlockPassword}"`, false, `ALLS Update`);
                } else if (fs.existsSync(resolve(`Q:/lib/keychip/update.ps1`))) {
                    await runCommand(`. Q:/lib/keychip/update.ps1  "${unlockPassword}" "${userUnlockPassword}"`, false, `ALLS Update (LCC)`);
                } else if (fs.existsSync(resolve(`X:/download.ps1`))) {
                    await runCommand(`. X:/download.ps1 "${unlockPassword}"`, false, `Remote Update`);
                } else {
                    await errorState('0049', 'Install Media Access Failed');
                    console.error('\n\n\x1b[5m\x1b[41m\x1b[30mNo Update Application was found\x1b[0m\n');
                }

                await setState('23', `Flush Write Cache`);
                await runCommand(`Write-VolumeCache X`, false, `Application Volume Write Cache Flush`);
                await runCommand(`Write-VolumeCache Y`, false, `Database Volume Write Cache Flush`);
                await runCommand(`Write-VolumeCache Z`, false, `Options Volume Write Cache Flush`);
                await runCommand(`Write-VolumeCache S`, false, `AMFS Volume Write Cache Flush`);
            } else {
                if (options.networkOverlay) {
                    await runCommand(`Start-Process -WindowStyle Hidden -FilePath "${resolve(options.networkOverlay)}" -WorkingDirectory "${dirname(resolve(options.networkOverlay))}" -ArgumentList '${lastHarunaState.toLowerCase()} ${(options.networkDriver) ? (basename(options.networkDriver)).replace('.exe', '') : "haruna_network"}'; `);
                }
                if (options.applicationExec) {
                    if (fs.existsSync(resolve(`X:/${options.applicationExec}`))) {
                        await runAppScript(`X:/${options.applicationExec}`, options.applicationExec.endsWith('.bat'));
                        if (!lccTerminate)
                            await errorState('0010', 'Unexpected Game Program Failure');
                    } else {
                        await errorState('0022', 'Game Program Not Found on Storage Device');
                    }
                } else if (fs.existsSync(resolve(`X:/game.ps1`))) {
                    await runAppScript(`X:/game.ps1`);
                    if (!lccTerminate)
                        await errorState('0010', 'Unexpected Game Program Failure');
                } else if (fs.existsSync(resolve(`X:/bin/game.bat`))) {
                    await runAppScript(`X:/bin/game.bat`, true);
                    if (!lccTerminate)
                        await errorState('0010', 'Unexpected Game Program Failure');
                } else if (fs.existsSync(resolve(`X:/bin/start.bat`))) {
                    await runAppScript(`X:/bin/start.bat`, true);
                    if (!lccTerminate)
                        await errorState('0010', 'Unexpected Game Program Failure');
                } else {
                    await errorState('0022', 'Game Program Not Found on Storage Device');
                    console.error('\n\n\x1b[5m\x1b[41m\x1b[30mNo Application was found\x1b[0m\n');
                }
            }
            process.stdout.write("\n");
            await runCheckOut();
        }
    }
    async function runCheckOut() {
        enableNetworkDriver = false;
        subar.stop();
        sdbar.start(11,0, {
            stage: "Application Terminated"
        })
        if (!cliArgs.update) {
            if (options.shutdownScript) {
                sdbar.update(1, {
                    stage: "Shutdown System"
                })
                await runCommand(`. ${resolve(options.shutdownScript)} "${options.runtimeOption}"`, true, `Shutdown Process`);
                sdbar.increment();
            }
        }
        if (options.applicationINI && fs.existsSync(resolve(options.applicationINI))) {
            const _sg = fs.readFileSync(resolve(options.applicationINI), 'utf-8');
            let st_cfg = ini.parse(_sg.toString());
            delete st_cfg['keychip']['id'];
            delete st_cfg['pcbid'];
            const _st_string = ini.stringify(st_cfg);
            try {
                fs.writeFileSync(resolve(options.applicationINI), _st_string);
            } catch (e) {
                await errorState('0700', 'Database Write Failure\nEnter Emergency Mode and reload Database');
            }
        }
        sdbar.update(2, {
            stage: "Dismount Application"
        })
        ready = true;
        if (options.applicationVHD) {
            await dismountCmd({
                disk: ((options.applicationVHD && fs.existsSync(options.applicationVHD)) ? options.applicationVHD : undefined),
                mountPoint: 'X:\\',
                delta: !!(((options.applicationDelta && options.runtimeVHD) || options.patchDriver) && !(cliArgs.update || cliArgs.editMode || cliArgs.encryptSetup)),
                lockDisk: true
            });
        }
        if (options.appDataVHD) {
            await dismountCmd({
                disk: ((options.appDataVHD && fs.existsSync(options.appDataVHD)) ? options.appDataVHD : undefined),
                delta: !!(options.appDataDelta && options.runtimeVHD && !(cliArgs.update || cliArgs.editMode || cliArgs.encryptSetup)),
                mountPoint: 'Y:\\'
            });
        }
        if (options.optionVHD) {
            await dismountCmd({
                disk: ((options.optionVHD && fs.existsSync(options.optionVHD)) ? options.optionVHD : undefined),
                delta: !!(options.optionDelta && options.runtimeVHD && !(cliArgs.update || cliArgs.editMode || cliArgs.encryptSetup)),
                mountPoint: 'Z:\\',
                lockDisk: true
            });
        }
        if (options.runtimeVHD) {
            await dismountCmd({
                disk: ((options.runtimeVHD && fs.existsSync(options.runtimeVHD)) ? options.runtimeVHD : undefined),
                delta: !!(options.runtimeDelta && options.runtimeVHD && !(cliArgs.update || cliArgs.editMode || cliArgs.encryptSetup)),
                mountPoint: 'W:\\',
                lockDisk: true
            });
        }
        if (options.verbose) {
            console.log(`Wait for Check-Out`);
        }
        sdbar.update(9, {
            stage: "Release Keychip"
        })
        if (!options.softwareMode)
            sendMessage('0');
        if (!cliArgs.update) {
            if (options.cleanupScript || options.netShutdownScript) {
                sdbar.update(10, {
                    stage: "Cleanup System"
                })
                if (options.cleanupScript) {
                    await runCommand(`. ${resolve(options.cleanupScript)} "${options.runtimeOption}"`, true, `Cleanup Process`);
                }
                if (options.netShutdownScript) {
                    await runCommand(`. ${resolve(options.netShutdownScript)} "${options.runtimeOption}"`, true, `Network Driver Shutdown`);
                }
                sdbar.increment();
            }
        }
        sdbar.update(11, {
            stage: "Shutdown Complete"
        })
        if (!options.dontCleanup) {
            await runCommand('Get-Disk -FriendlyName "Msft Virtual Disk" -ErrorAction SilentlyContinue | ForEach-Object { Dismount-DiskImage -DevicePath $_.Path -Confirm:$false } | Out-Null', false);
        }
        sdbar.stop();
        setTimeout(() => {
            exitAction(0);
        }, 10000);
    }

    const ps = new PowerShell({
        executableOptions: {
            '-ExecutionPolicy': 'Bypass',
            '-NoProfile': true,
        },
    });
    const psUtility = new PowerShell({
        executableOptions: {
            '-ExecutionPolicy': 'Bypass',
            '-NoProfile': true,
        },
    });
    (async () => {
        if (cliArgs.logFile) {
            await ps.invoke(PowerShell.command([`Start-Transcript -Path ${resolve(cliArgs.logFile)} -Append`]));
            await psUtility.invoke(PowerShell.command([`Start-Transcript -Path ${resolve(cliArgs.logFile)} -Append`]));
        }
    })()
    let networkDriver = null;
    let enableNetworkDriver = true;
    let networkOk = true;
    let lccTerminate = false;

    async function exitAction(code) {
        if (cliArgs.logFile) {
            await ps.invoke(PowerShell.command([`Stop-Transcript`]));
            await psUtility.invoke(PowerShell.command([`Stop-Transcript`]));
        }
        await ps.dispose();
        await psUtility.dispose();
        await process.exit(code);
    }
    async function runCommand(input, suppressOutput = false, diagnosticMessage) {
        return new Promise(async ok => {
            try {
                const printCommand = PowerShell.command([input]);
                const result = await ps.invoke(printCommand);
                if (options.verbose && (!suppressOutput || result.hadErrors)) {
                    console.log(result.raw);
                }
                if (!suppressOutput && diagnosticMessage && result.stdout && result.stdout.length > 2) {
                    await addError(`WARNING: ${diagnosticMessage}!\n\n${result.stdout}\n`);
                }
                if (!suppressOutput && diagnosticMessage && result.stderr && result.stderr.length > 2) {
                    await addError(`ERROR: ${diagnosticMessage}!\n\n${result.stderr}\n`);
                }
                ok(result);
            } catch (error) {
                if (options.verbose) {
                    console.error(error);
                }
                if (!suppressOutput) {
                    //                      XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                    await addError(`ERROR: ${diagnosticMessage}!\n\n${error}\n`);
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
                    `Set-ScheduledTask -TaskName 'TEMP_SOS_APP' -Action (New-ScheduledTaskAction -Execute '${(is_bat) ? 'cmd.exe' : 'powershell.exe'}' -Argument '${(is_bat) ? '/c' : '-NoProfile -WindowStyle Minimized -ExecutionPolicy Bypass -File'} "${exec}"' -WorkingDirectory "${workingDir}")`,
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
                    //                      XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                    await addError(`ERROR: Application Task Creation!\n\n${error.message}`);

                }
                fs.unlinkSync(join(tmpdir(), 'job.xml'));
                ok(false);
            }
        });
    }
    async function runAppScript(input, is_bat) {
        return new Promise(async (ok) => {
            let args = ["-Command"];
            if (options.fork_exec) {
                await createTask(input, is_bat, process.cwd());
                args.push(`Start-ScheduledTask -TaskName "TEMP_SOS_APP"; While ((Get-ScheduledTask -TaskName "TEMP_SOS_APP").State -eq "Running") { Sleep -Seconds 1 }`)
            } else if (options.delevate_exec) {
                if (is_bat) {
                    args.push(`Start-Process -Wait -WindowStyle Minimized -FilePath runas -ArgumentList '${(parseInt(release().split('.').pop()) >= 22000) ? '/machine:amd64' : ''} /trustlevel:0x20000 "cmd.exe /c ${input}"'`)
                } else {
                    args.push(`Start-Process -Wait -WindowStyle Minimized -FilePath runas -ArgumentList '${(parseInt((release()).split('.').pop()) >= 22000) ? '/machine:amd64' : ''} /trustlevel:0x20000 "powershell.exe -File ${input} -NoProfile:$true"'`)
                }
            } else {
                args = [
                    ((is_bat) ? 'cmd.exe' : 'powershell.exe'),
                    ...((is_bat) ? ['/c', input] : ['-File', input, '-ExecutionPolicy', 'Unrestricted ', '-NoProfile:$true'])
                ];
            }
            await setState('30', `Game Program Ready`, true)
            console.error('\n\x1b[42m\x1b[30mApplication Running\x1b[0m\n');
            applicationArmed = spawn("powershell.exe", args, {
                stdio: 'inherit' // Inherit the standard IO of the Node.js process
            });
            applicationArmed.on('exit', async function () {
                if (options.fork_exec)
                    await runCommand('Unregister-ScheduledTask -TaskName "TEMP_SOS_APP" -Confirm:$false -ErrorAction SilentlyContinue');
                ok()
            })
            applicationArmed.on('close', async function () {
                if (options.fork_exec)
                    await runCommand('Unregister-ScheduledTask -TaskName "TEMP_SOS_APP" -Confirm:$false -ErrorAction SilentlyContinue');
                ok()
            })
            applicationArmed.on('end', async function () {
                if (options.fork_exec)
                    await runCommand('Unregister-ScheduledTask -TaskName "TEMP_SOS_APP" -Confirm:$false -ErrorAction SilentlyContinue');
                ok()
            })
        })
    }

    async function prepareDisk(o) {
        let diskPath = resolve(o.disk);
        subar.increment();
        // Remove any existing disk mounts
        await runCommand(`Dismount-DiskImage -ImagePath "${diskPath}" -Confirm:$false -ErrorAction SilentlyContinue`, true);
        if (o.delta) {
            // Generate Path for Runtime Disk Image
            const diskExt = ('.' + o.disk.toString().split('.').pop());
            const basePath = dirname(diskPath);
            const deltaName = `${basename(diskPath, diskExt)}-runtime${diskExt}`;
            const deltaPath = resolve(join(basePath, deltaName));
            // Remove Delta Disk if exists
            await runCommand(`Dismount-DiskImage -ImagePath "${deltaPath}" -Confirm:$false -ErrorAction SilentlyContinue`, true);
            // Delete Runtime Delta Disk if exists
            if (fs.existsSync(deltaPath)) {
                // Ignore Errors
                try { fs.unlinkSync(deltaPath) } catch (e) { }
            }
            // Generate Runtime Delta Disk by generating a DiskPart Script
            // The PowerShell alternative does not exist without Hyper-V
            const diskPartCommand = `create vdisk FILE="${deltaPath}" PARENT="${diskPath}\n"`
            const diskPathScript = resolve(join(tmpdir(), 'create-vhd.dat'))
            fs.writeFileSync(diskPathScript, diskPartCommand, { encoding: "ascii" });
            await runCommand(`& diskpart.exe /s "${diskPathScript}"`, true);
            // Cleanup
            try { fs.unlinkSync(diskPathScript) } catch (e) { }
            // Redirect Path when its saved
            if (fs.existsSync(deltaPath)) {
                diskPath = deltaPath;
            } else {
                //                      XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                await addError(`ERROR: Delta Volume Creation Failure!\n       Disk will be locked to its base volume`);
            }
        }
        subar.increment();
        // Attach the disk to the drive letter or folder
        const mountCmd = await runCommand(`Mount-DiskImage -ImagePath "${diskPath}" -StorageType VHD -NoDriveLetter -Passthru -Access ${(o.delta || o.writeAccess) ? 'ReadWrite' : 'ReadOnly'} -Confirm:$false -ErrorAction Stop | Get-Disk | Get-Partition | where { ($_ | Get-Volume) -ne $Null } | Add-PartitionAccessPath -AccessPath ${o.mountPoint} -ErrorAction Stop | Out-Null`, true);
        return (mountCmd);
    }
    async function dismountCmd(o) {
        if (options.verbose && o.lockDisk) {
            console.log(`Lock Volume ${o.mountPoint}`);
        } else if (o.lockDisk) {
            sdbar.increment();
        }
        if (o.lockDisk)
            await runCommand(`Lock-BitLocker -MountPoint "${o.mountPoint}" -ForceDismount -Confirm:$false -ErrorAction SilentlyContinue`, false);
        if (options.verbose) {
            console.log(`Dismount Volume ${o.mountPoint}`);
        } else {
            sdbar.increment();
        }
        // Remove any existing disk mounts
        let diskPath = resolve(o.disk);
        if (o.delta) {
            const diskExt = ('.' + o.disk.toString().split('.').pop());
            const basePath = dirname(diskPath);
            const deltaName = `${basename(diskPath, diskExt)}-runtime${diskExt}`;
            const deltaPath = resolve(join(basePath, deltaName));
            await runCommand(`Dismount-DiskImage -ImagePath "${deltaPath}" -Confirm:$false -ErrorAction SilentlyContinue`, true);
            if (fs.existsSync(deltaPath)) {
                // Ignore Errors
                try { fs.unlinkSync(deltaPath) } catch (e) { }
            }
        }
        await runCommand(`Dismount-DiskImage -ImagePath "${diskPath}" -Confirm:$false -ErrorAction SilentlyContinue`, true);
        return true;
    }
    async function unlockDisk(o) {
        if (options.verbose) {
            console.log(`Request Unlock ${o.diskNumber}`);
        } else {
            subar.increment();
        }
        returned_key = null;
        if (options.softwareMode) {
            const challangeString = `${options.applicationID} Copyright(C)SEGA ${options.loginIV} DISK ${o.diskNumber} `
            returned_key = await hashPassword(challangeString);
        } else {
            // Request the keychip to give decryption key for applicationID with a diskNumber
            const challangeCmd = `10:${options.applicationID}:${o.diskNumber}:`;
            sendMessage(challangeCmd);
            // Wait inline for response
            while (!returned_key) {
                await sleep(5);
            }
        }
        // Unlock bitlocker disk or folder
        if (options.verbose) {
            console.log(`Key Unlock ${o.diskNumber}`);
        } else {
            subar.increment();
        }
        const unlockCmd = await runCommand(`Unlock-BitLocker -MountPoint "${o.mountPoint}" -Password $(ConvertTo-SecureString -String "${returned_key}" -AsPlainText -Force) -Confirm:$false -ErrorAction Stop`, false);
        returned_key = null;
        await sleep(1250);
        return (unlockCmd);
    }
    async function getUpdatePassword(o) {
        if (options.verbose) {
            console.log(`Request Update Password`);
        } else {
            subar.increment();
        }
        returned_key = null;
        if (options.softwareMode) {
            const challangeString = `${options.applicationID} Copyright(C)SEGA ${options.loginIV} DISK 9 `
            returned_key = await hashPassword(challangeString);
        } else {
            // Request the keychip to give decryption key for applicationID with a diskNumber
            const challangeCmd = `10:${options.applicationID}:9:`;
            sendMessage(challangeCmd);
            // Wait inline for response
            while (!returned_key) {
                await sleep(5);
            }
        }
        if (options.verbose) {
            console.log(`\n\n"${returned_key}"\n\n`)
        }
        unlockPassword = returned_key;
        returned_key = null;
        await sleep(1000);
        return true;
    }
    async function getUserOptionPassword(o) {
        if (options.verbose) {
            console.log(`Request Update Password`);
        } else {
            subar.increment();
        }
        returned_key = null;
        if (options.softwareMode) {
            const challangeString = `${options.applicationID} Copyright(C)SEGA ${options.loginIV} ${keychip_id} DISK 8 `
            returned_key = await hashPassword(challangeString);
        } else {
            // Request the keychip to give decryption key for applicationID with a diskNumber
            const challangeCmd = `10:${options.applicationID}:8:`;
            sendMessage(challangeCmd);
            // Wait inline for response
            while (!returned_key) {
                await sleep(5);
            }
        }
        if (options.verbose) {
            console.log(`\n\n"${returned_key}"\n\n`)
        }
        userUnlockPassword = returned_key;
        returned_key = null;
        await sleep(1000);
        return true;
    }
    async function encryptDisk(o) {
        if (options.verbose) {
            console.log(`Request Encrypt ${o.diskNumber}`);
        } else {
            subar.increment();
        }
        returned_key = null;
        if (options.softwareMode) {
            const challangeString = `${options.applicationID} Copyright(C)SEGA ${options.loginIV} DISK ${o.diskNumber} `
            returned_key = await hashPassword(challangeString);
        } else {
        // Request the keychip to give decryption key for applicationID with a ivString and diskNumber
        sendMessage(`10:${options.applicationID}:${o.diskNumber}:`);
        // Wait inline for response
        while (!returned_key) {
            await sleep(5);
        }
        }
        // Unlock bitlocker disk or folder
        if (options.verbose) {
            console.log(`Key Encrypt ${o.diskNumber}`);
            console.log(returned_key);
        } else {
            subar.increment();
        }
        const unlockCmd = await runCommand(`Enable-BitLocker -MountPoint "${o.mountPoint}" -EncryptionMethod XtsAes256 -UsedSpaceOnly -SkipHardwareTest -PasswordProtector -Password $(ConvertTo-SecureString -String "${returned_key}" -AsPlainText -Force) -Confirm:$false -ErrorAction Stop`);
        returned_key = null;
        await sleep(1000);
        return (unlockCmd);
    }
    async function injectKeychipID() {
        if (options.applicationINI && fs.existsSync(resolve(options.applicationINI))) {
            const _sg = fs.readFileSync(resolve(options.applicationINI), 'utf-8');
            let st_cfg = ini.parse(_sg.toString());
            st_cfg['keychip']['id'] = keychip_id;
            st_cfg['pcbid'] = { "serialNo": board_id };
            if (st_cfg['netenv'] === undefined)
                st_cfg['netenv'] = {'enable': 1};
            if (cliArgs.networkDirect && cliArgs.networkDirect.length > 0) {
                st_cfg['netenv']['addrSuffix'] = cliArgs.networkDirect;
            }
            switch (options.applicationID) {
                case "SDHD":

                    // Chunithm New
                    st_cfg['gpio'] = { 'dipsw1' : 0 };
                    st_cfg['gpio']['dipsw2'] = (highRefreshRate) ? 0 : 1
                    st_cfg['gpio']['dipsw3'] = (highRefreshRate) ? 0 : 1
                    break;
                default:
                    // Nothing to do
                    break;
            }
            const _st_string = ini.stringify(st_cfg);
            try {
                fs.writeFileSync(resolve(options.applicationINI), _st_string);
            } catch (e) {
                //                      XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                await addError(`ERROR: amdaemon Keychip Connection!\n       Failed to save database for amdeamon`);
                await errorState('0700', 'Database Write Failure\nEnter Emergency Mode and reload Database');
            }
        }
        if (options.verbose) {
            console.log(`Keychip ID: ${keychip_id}`);
            console.log(`Board ID  : ${board_id}`);
        }
    }
    async function hashPassword(inputString) {
        const encrypted = await crypto.AES.encrypt(
            inputString,
            crypto.enc.Hex.parse(options.loginKey),
            {
                iv: crypto.enc.Hex.parse(options.loginIV),
                mode: crypto.mode.CBC,
                padding: crypto.pad.ZeroPadding
            }
        );
        return (crypto.SHA256(encrypted.ciphertext.toString(crypto.enc.Base64))).toString().toUpperCase();
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

    async function prepareHost() {
        if (options.verbose) {
            console.log(`Prepare Host`);
        }
        await setState('3', `Preparing System`)
        subar.update(3, {
            stage: "Preparing System"
        });
        if (options.prepareScript) {
            await runCommand(`. ${resolve(options.prepareScript)} "${options.runtimeOption}"`, true, `Prepare System`);
        }
        const hz = parseFloat((await runCommand(`(Get-WmiObject win32_videocontroller | Where { $_.Status -eq 'OK' -and $_.Availability -eq 3 } | Select -Last 1).CurrentRefreshRate`)).raw)
        highRefreshRate = (hz >= 120);
        await setConState("false", (highRefreshRate) ? "true" : "false", "not_ready");
        if (options.networkDriver && options.networkConfig) {
            await setConState("true");
        }
    }

    if (options.lcc) {
        if (options.debug) {
            app.get('/debug/config', (req, res) => {
                res.status(200).json(options)
            })
        }
        app.get('/', (req, res) => {
            res.status(200).json("Iona Application Security & Keychip")
        })
        app.get('/terminate', (req, res) => {
            if (applicationArmed) {
                lccTerminate = true;
                applicationArmed.kill("SIGINT");
                res.status(200).send("OK");
            }
        })
        app.listen(restPort, () => { });
    }
    if (options.softwareMode) {
        (async () => {
            await setConState("false", "false", "not_ready");
            if (!(options.applicationID && options.loginKey && options.loginIV)) {
                subar.stop();
                //                      XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                await addError(`ERROR: Keychip not found!\n       - Was keychip file loaded?\n       - Is keychip valid?`);
                console.error('\n\x1b[5m\x1b[41m\x1b[30mKeychip not found\x1b[0m');
                await errorState('0001', 'Keychip Not Found');
                await errorState('0001', 'Keychip Not Found');
                await sleep(5000);
                exitAction(240);
            }
            subar.increment();
            if (!cliArgs.update)
                await prepareHost();
            if (options.verbose) {
                console.log(`Software Keychip Emulator Mode`);
            }
            await setConState(undefined, undefined, "ready");
            subar.update(4, {
                stage: "Preparing Keychip"
            });
            await setState('4', `Keychip Login`)
            if (!options.dontCleanup) {
                await runCommand('Get-Disk -FriendlyName "Msft Virtual Disk" -ErrorAction SilentlyContinue | ForEach-Object { Dismount-DiskImage -DevicePath $_.Path -Confirm:$false } | Out-Null', false);
            }
            await sleep(200);
            if (options.verbose) {
                console.log(`Ready`);
            }
            await setConState(undefined, undefined, (options.softwareMode) ? "ready": "lock");
            if (cliArgs.shutdown) {
                subar.update(36, {
                    stage: "Shutdown Request",
                });
                runCheckOut();
            } else {
                await startCheckIn();
            }
        })()
    } else {
        let dropOutTimer = null;
        let lastCheckIn = null;

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
                //                      XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                addError(`ERROR: Failed to decrypt packet from Keychip!`);
                errorState('0008', 'Keychip Access Failed');
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
                        await errorState('0004', 'Game Program Not Acceptable');
                        break;
                    case "0050":
                        await errorState('0009', 'Keychip Hardware Lockout');
                        break;
                    default:
                        await errorState('0009', 'Keychip Access Failed');
                        break;
                }
                //                      XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                await addError(`ERROR: Keychip Hardware Error!\n       Number ${receivedData.replace("KEYCHIP_FAILURE_", "")}`);
                process.exit(100);
            } else if (receivedData === 'SG_HELLO' && (applicationArmed !== false && !(cliArgs.editMode && cliArgs.shutdown && cliArgs.encryptMode))) {
                lastCheckIn = new Date().valueOf();
                clearTimeout(dropOutTimer);
                if (knox_mode) {
                    dropOutTimer = setTimeout(async () => {
                        if (options.verbose) {
                            console.error(`Keychip Checkin Failed`);
                        }
                        if (applicationArmed !== false) {
                            if (options.fork_exec)
                                await runCommand('Stop-ScheduledTask -TaskName "TEMP_SOS_APP" -ErrorAction SilentlyContinue');
                            applicationArmed.kill("SIGINT");
                        } else {
                            await exitAction(1);
                        }
                    }, 5000)
                }
            } else if (receivedData === 'SG_HELLO' && ready === false) {
                await setConState(undefined, undefined, "ready");
                if (options.verbose) {
                    console.log(`Ready`);
                }
                subar.increment();
                if (cliArgs.shutdown) {
                    subar.update(36, {
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
                await exitAction(0);
            } else if (receivedData === 'SG_LV0_GOODBYE') {
                sendMessage(`1`);
            } else if (receivedData === 'SG_ENC_READY') {
                if (options.verbose) {
                    console.log(`Switching to Encrypted Mode`);
                }
                subar.increment();
                encryptedMode = true;
                await setConState(undefined, undefined, "lock");
            } else if (receivedData.startsWith("SG_UNLOCK")) {
                subar.increment();
                if (!cliArgs.shutdown) {
                    startCheckIn();
                }
            } else if (receivedData.startsWith("CRYPTO_KEY_")) {
                returned_key = receivedData.substring(11).trim().split("x0")[0];
            } else if (receivedData.startsWith("KEYCHIP_ID_")) {
                keychip_id = receivedData.substring(11).trim();
                await injectKeychipID();
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
                await errorState('0008', 'Keychip Access Failed');
            } else if (applicationArmed) {
                if (options.fork_exec)
                    await runCommand('Stop-ScheduledTask -TaskName "TEMP_SOS_APP" -ErrorAction SilentlyContinue');
                applicationArmed.kill("SIGINT");
            } else {
                if (err.message.includes("File not found")) {
                    subar.stop();
                    console.error('\n\x1b[5m\x1b[41m\x1b[30mKeychip not found\x1b[0m');
                    await errorState('0001', 'Keychip Not Found');
                    await addError(`ERROR: Keychip not connected!\n       Device not connected`);
                    await sleep(5000)
                } else {
                    subar.stop();
                    await addError(`ERROR: Keychip access fault!\n       ${err.message}`);
                    console.error('\n\x1b[5m\x1b[41m\x1b[30mKeychip Hardware Failure\x1b[0m');
                    await errorState('0009', 'Keychip Access Failed');
                }
            }
            if (!applicationArmed) {
                await exitAction(10);
            }
        });
        port.on('close', async (err) => {
            await addError(`ERROR: Keychip was removed!`);
            if (options.verbose) {
                console.error(`Keychip Communication Closed`, err);
            } else if (applicationArmed) {
                console.error(`\nKeychip Removal\n`);
                if (options.fork_exec)
                    await runCommand('Stop-ScheduledTask -TaskName "TEMP_SOS_APP" -ErrorAction SilentlyContinue');
                applicationArmed.kill("SIGINT");
            } else {
                if (err.message.includes("File not found")) {
                    subar.stop();
                    console.error('\n\x1b[5m\x1b[41m\x1b[30mKeychip Removal\x1b[0m');
                    await errorState('0001', 'Keychip Not Found');
                } else {
                    subar.stop();
                    console.error('\n\x1b[5m\x1b[41m\x1b[30mKeychip Hardware Failure\x1b[0m');
                    await errorState('0009', 'Keychip Access Failed');
                }
            }
            if (!applicationArmed) {
                await exitAction(10);
            }
        });

        // Handle the opening of the serial port
        port.on('open', async () => {
            await setConState("false", "false", "not_ready");
            if (!(options.applicationID && options.loginKey && options.loginIV)) {
                await addError(`ERROR: Keychip access fault!\n       Missing required communication encryption keys`);
                subar.stop();
                console.error('\n\x1b[5m\x1b[41m\x1b[30mKeychip not found\x1b[0m');
                await errorState('0001', 'Keychip Not Found');
                await errorState('0001', 'Keychip Not Found');
                await sleep(5000);
                exitAction(240);
            }
            await runCommand('Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Unrestricted -Confirm:$false -ErrorAction SilentlyContinue | Out-Null', true);
            subar.increment();
            if (!cliArgs.update)
                await prepareHost();
            subar.update(4, {
                stage: "Preparing Keychip"
            });
            await setState('4', `Keychip Login`)
            if (!options.dontCleanup) {
                await runCommand('Get-Disk -FriendlyName "Msft Virtual Disk" -ErrorAction SilentlyContinue | ForEach-Object { Dismount-DiskImage -DevicePath $_.Path -Confirm:$false } | Out-Null', false);
            }
            await sleep(200);
            sendMessage('?');
            watchdog = setInterval(() => {
                sendMessage('?');
            }, ((!(cliArgs.editMode || cliArgs.shutdown || cliArgs.encryptMode)) ? 1000 : 2000));
        });
    }

    process.on('uncaughtException', async (err) => {
        console.log(err);
        await errorState('0401', "Keychip Driver Error");
        await addError(`ERROR: Uncaught Error\n       ${err.message}`);
    })
})()
