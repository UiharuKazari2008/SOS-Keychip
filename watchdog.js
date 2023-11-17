const { SerialPort, ReadlineParser } = require('serialport');
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers');
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
    .argv


if (cliArgs.verbose)
    console.log(`Savior of Song Keychip Watchdog by Yukimi Kazari`);

const port = new SerialPort({path: cliArgs.port || "COM5", baudRate: 4800});
const parser = port.pipe(new ReadlineParser({delimiter: '\n'}));

let dropOutTimer = null;

parser.on('data', (data) => {
    let receivedData = data.toString().trim();
    if (receivedData.startsWith('KEYCHIP_FAILURE_')) {
        console.error(`Keychip Failure ${receivedData.replace("KEYCHIP_FAILURE_", "")}`);
        process.exit(10);
    } else if (receivedData === 'SG_HELLO') {
        if (cliArgs.verbose) { console.log(`Present`); }
        lastCheckIn = new Date().valueOf();
        clearTimeout(dropOutTimer);
        dropOutTimer = setTimeout(() => {
            process.exit(1);
        }, 5000)
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
});
let pingTimer = setInterval(() => {
    port.write('@$?$!');
}, 1500)
