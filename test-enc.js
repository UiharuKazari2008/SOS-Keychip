const crypto = require('crypto-js');

const UApplicationKey = 'D73CA01F0A6A1341839B0CDEE23E6D03'; // Replace with your actual key
const UApplicationIV = '0FFABCAD7D8257C5574F82376E0928D4';  // Replace with your actual IV

// Your encrypted Base64 string from Arduino
const encryptedBase64String = '$Gtc1WmtY3DjfVLz+/uJVmX1UXhoNQgV7+0hsmJghBCc=:xJVQr7f8+JUazn6gKm763TjL0nrRWhGlXOiXc5QLSudXwumVfw6CDWRd9itMGIBRGEBPfQ3OJWsLn88FFQ44OWHoAgfeCjwrcSgVtRcFsMUFA4cyCSNRq121fYmBcfHw'; // Replace with your actual encrypted string

if (encryptedBase64String.length > 0) {
// Convert Base64 to bytes
    encryptedBase64String.split("$")[1].split(":").forEach((string) => {
        const encryptedBytes = crypto.enc.Base64.parse(string);

        const decryptedBytes = crypto.AES.decrypt(
            {ciphertext: encryptedBytes},
            crypto.enc.Hex.parse(UApplicationKey),
            {
                iv: crypto.enc.Hex.parse(UApplicationIV),
                mode: crypto.mode.CBC, // Use the appropriate mode based on Arduino's implementation
                padding: crypto.pad.ZeroPadding   // Use the appropriate padding based on Arduino's implementation
            }
        );

// Convert decrypted bytes to a string
        let decryptedText = (crypto.enc.Utf8.stringify(decryptedBytes)).trim().split('\r')[0].split('\n')[0];
        decryptedText = decryptedText.split(" ");
        console.log(decryptedText);
        console.log(decryptedText[1]);
    })
}

const messageBytes = crypto.AES.encrypt(
    "SG_ENCMSG 1:",
    crypto.enc.Hex.parse(UApplicationKey),
    {
        iv: crypto.enc.Hex.parse(UApplicationIV),
        mode: crypto.mode.CBC,
        padding: crypto.pad.ZeroPadding
    }
);
const encryptedString = messageBytes.toString();

console.log(encryptedString);
