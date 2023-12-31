#include "MD5.h"
#include "AESLib.h"
#include "sha256.h"
#include "arduino_base64.hpp"
#include "device_key.h"
// device_key.h file should look like this
// const char* keychipText = "SDFE XX XX"; // Should be GAME_ID VER REGION
// const char* keychipID = "XXXX-XXXXXXXXXXX"; // Keychip ID that will be sent to segatools
// const char* applicationID = "SDFE";
// const char* applicationKey = "SOME_CRYPTO_KEY"; // Refer to "the list of keys" or make your own does not matter
// const char* applicationIV = "EXPECTED_CHECK_CODE" // Same as above, used as check string and not actually used as IV at this time

const String SW_VERSION = "2.2";
const String CRYPTO_VERSION = "2";
String COMM_KEY_HASH = "NOT_READY";
// I love you Iona

AESLib aesLib;

char c;
static String receivedMessage = "";
String errorNumber = "";
int max_disks = 10;
int open_disks[10] = {0,0,0,0,0,0,0,0,0,0};
bool deviceReady = false;
int exchangeStage = 0;
bool encryptComm = false;
String currentKey = "";
String currentIV = "";
int usageKey = 0;
int active_r;
int active_g;
int active_b;

void setup() {
  Serial.begin(4800);
  randomSeed((millis() + analogRead(A0)) * analogRead(A5));
  currentKey = initCommunicationLKey;
  currentIV = ininCommunicationIV;
  String combinded_hash = initCommunicationLKey;
  combinded_hash += "-";
  combinded_hash += ininCommunicationIV;
  unsigned char* hash = MD5::make_hash(combinded_hash.c_str());
  char *output = MD5::make_digest(hash, 16);
  free(hash);
  COMM_KEY_HASH = (String)output;
  free(output);
  Serial.println("\n\n\nSG_CRYPTO_RESET");
}

void loop() {
  if (Serial.available()) {
    c = Serial.read();
    if (c == '!') {
      if (receivedMessage != "") {
        int headerIndex = 1;
        String header = receivedMessage.substring(0, 1);
        if (header == "@") {
          parseLevel0Message(receivedMessage);
        } else if (header == "$" && encryptComm == true) {
          parseEncryptedMessage(receivedMessage.substring(1, receivedMessage.length()));
        }
      }
      receivedMessage = "";
    } else {
      receivedMessage += c;
    }
  }
}

// ?  Ping
// 5  Firmware Info
// 6  Enter Level 1 mode
void parseLevel0Message(String receivedMessage) {
  int commandIndex = receivedMessage.indexOf(":", 1);
  String command = receivedMessage.substring(1, commandIndex);
  if (command == "?") {
    Serial.println("SG_HELLO");
  } else if (command == "5") {
    Serial.print("FIRMWARE_VER_");
    Serial.print(SW_VERSION);
    Serial.print(" CRYPTO_VER_");
    Serial.print(CRYPTO_VERSION);
    Serial.print(" INIT_CRYPTO_HASH_");
    Serial.println(COMM_KEY_HASH);
  } else if (command == "6" && encryptComm == false) {
    encryptComm = true;
    String message = "SG_ENC_READY";
    Serial.println(message);
    sendEncryptedMessage(message);
    Serial.println("SG_LV0_GOODBYE");
  }
}

// ?  Ping
// 0  Release Hardware
// 1  Claim Hardware
// 2  Partial Release
// 5  Firmware Info
// 10 Get BitLocker Key
// 11 Get Keychip ID
void parseLevel1Message(String receivedMessage) {
  int commandIndex = receivedMessage.indexOf(":");
  String command = receivedMessage.substring(0, commandIndex);
  if (command == "?") {
    sendEncryptedMessage("SG_HELLO");
  } if (command == "0") {
    if (deviceReady == true && exchangeStage >= 1) {
      int i = 0;
      while (i <= max_disks) {
        open_disks[i] = 0;
        i++;
      }
      deviceReady = false;
      exchangeStage = 0;
      encryptComm = false;
      currentKey = initCommunicationLKey;
      currentIV = ininCommunicationIV;
      sendEncryptedMessage("SG_LOCK");
      sendEncryptedMessage("SG_LV1_GOODBYE");
      Serial.println("SG_LV0_HELLO");
    } else  {
      errorNumber = "0011";
      lockDevice();
    }
  } if (command == "1") {
    if (deviceReady == false && exchangeStage == 0) {
      deviceReady = true;
      exchangeStage = 1;
      sendEncryptedMessage("SG_UNLOCK");
    } else {
      errorNumber = "0010";
      lockDevice();
    }
  } else if (command == "2") {
    sendEncryptedMessage("SG_RELEASE");
    currentKey = initCommunicationLKey;
    currentIV = ininCommunicationIV;
  } else if (command == "5") {
    String res = "FIRMWARE_VER_";
    res += SW_VERSION;
    res += " CRYPTO_VER_";
    res += CRYPTO_VERSION;
    res += " INIT_CRYPTO_HASH_";
    res += COMM_KEY_HASH;
    sendEncryptedMessage(res);
  } else if (command == "10") {
    if (deviceReady == true && exchangeStage <= 2) {
      int appIDIndex = receivedMessage.indexOf(":", commandIndex + 1);
      String appID = receivedMessage.substring(commandIndex + 1, appIDIndex);
      int appDriveIndex = receivedMessage.indexOf(":", appIDIndex + 1);
      String appDriveStr = receivedMessage.substring(appIDIndex + 1, appDriveIndex);
      int appDrive = appDriveStr.toInt();

      if (appID == applicationID && open_disks[appDrive] == 0) {
        String inputString = applicationID;
        inputString += " Copyright(C)SEGA ";
        inputString += applicationIV;
        inputString += " DISK";
        inputString += appDrive;
        inputString += " 0x0001";
        Sha256.init();
        Sha256.initHmac(applicationKey, sizeof(applicationKey));
        Sha256.print(inputString);

        String res = "CRYPTO_KEY_";
        res += hashToString(Sha256.result());
        res += "x0";
        open_disks[appDrive] = 1;
        exchangeStage = 2;
        sendEncryptedMessage(res);
      } else {
        if (appID != applicationID) {
          errorNumber = "0001";
        } else if (open_disks[appDrive] == 0) {
          errorNumber = "0091";
        } else {
          errorNumber = "9000";
        }
        lockDevice();
      }
    } else  {
      errorNumber = "0013";
      lockDevice();
    }
  } else if (command == "11") {
    if (deviceReady == true && exchangeStage == 2) {
      String res = "KEYCHIP_ID_";
      res += keychipID;
      deviceReady = true;
      exchangeStage = 3;
      sendEncryptedMessage(res);
    } else {
      errorNumber = "0013";
      lockDevice();
    }
  }
}
void parseEncryptedMessage(String receivedMessage) {
  const String decMessage = decrypt(receivedMessage);
  const String decHeader = decMessage.substring(0,10);
  if (decHeader == "SG_ENCMSG ") {
    parseLevel1Message(decMessage.substring(10, decMessage.length()));
  } else {
    Serial.println("SG_LV1_MSG_CRYPTO_FAILURE");
  }
}

void lockDevice() {
  for(;;) {
    Serial.print("KEYCHIP_FAILURE_");
    Serial.println(errorNumber);
    delay(1000);
  }
}

// https://adriancs.com/arduino/1096/arduino-aes-encryption-128-bits-cbc/
String encrypt(String inputText) {
    byte UApplicationKey[16];
    byte UApplicationIV[16];
    hexStringToByteArray(currentKey, UApplicationKey);
    hexStringToByteArray(currentIV, UApplicationIV);
    int bytesInputLength = inputText.length() + 1;
    byte bytesInput[bytesInputLength];
    inputText.getBytes(bytesInput, bytesInputLength);
    int outputLength = aesLib.get_cipher_length(bytesInputLength);
    byte bytesEncrypted[outputLength];
    aesLib.set_paddingmode((paddingMode)0);
    aesLib.encrypt(bytesInput, bytesInputLength, bytesEncrypted, UApplicationKey, 16, UApplicationIV);
    char base64EncodedOutput[base64::encodeLength(outputLength)];
    base64::encode(bytesEncrypted, outputLength, base64EncodedOutput);
    usageKey++;
    return String(base64EncodedOutput);
}
String decrypt(String encryptedBase64Text) {
    byte UApplicationKey[16];
    byte UApplicationIV[16];
    hexStringToByteArray(currentKey, UApplicationKey);
    hexStringToByteArray(currentIV, UApplicationIV);
    int originalBytesLength = base64::decodeLength(encryptedBase64Text.c_str());
    byte encryptedBytes[originalBytesLength];
    byte decryptedBytes[originalBytesLength];
    base64::decode(encryptedBase64Text.c_str(), encryptedBytes);
    aesLib.set_paddingmode((paddingMode)0);
    aesLib.decrypt(encryptedBytes, originalBytesLength, decryptedBytes, UApplicationKey, 16, UApplicationIV);
    String decryptedText = String((char*)decryptedBytes);
    usageKey++;
    return decryptedText;
}
void sendEncryptedMessage(String input) {
  Serial.print("$");
  String _message = "SG_ENCSND ";
  _message += input;
  _message += " ";
  _message += "^EOL";
  Serial.print(encrypt(_message));
  Serial.print(":");
  Serial.println(generateNewKeyPair());
}

void printHash(uint8_t* hash) {
  int i;
  for (i=0; i<32; i++) {
    Serial.print("0123456789ABCDEF"[hash[i]>>4]);
    Serial.print("0123456789ABCDEF"[hash[i]&0xf]);
  }
}
String hashToString(uint8_t* hash) {
  String result = "";
  for (int i = 0; i < 32; i++) {
    result += "0123456789ABCDEF"[hash[i] >> 4];
    result += "0123456789ABCDEF"[hash[i] & 0xf];
  }
  return result;
}
void hexStringToByteArray(String hexString, byte* byteArray) {
  for (int i = 0; i < hexString.length(); i += 2) {
    byteArray[i / 2] = strtoul(hexString.substring(i, i + 2).c_str(), NULL, 16);
  }
}
String generateNewKeyPair() {
  byte key[16];
  for (int i = 0; i < 16; ++i) {
    key[i] = random(256);
  }
  byte iv[16];
  for (int i = 0; i < 16; ++i) {
    iv[i] = random(256);
  }

  String _currentKey = "";
  for (size_t i = 0; i < 16; ++i) {
    char hex[3];
    sprintf(hex, "%02X", key[i]);
    _currentKey += hex;
  }
  String _currentIV = "";
  for (size_t i = 0; i < 16; ++i) {
    char hex[3];
    sprintf(hex, "%02X", iv[i]);
    _currentIV += hex;
  }

  String newKeyResponse = "SG_KEYCRC ";
  newKeyResponse += _currentKey;
  newKeyResponse += " ";
  newKeyResponse += _currentIV;
  newKeyResponse += " ";
  newKeyResponse += "^EOL";
  String encKey = encrypt(newKeyResponse);

  currentKey = _currentKey;
  currentIV = _currentIV;

  return encKey;
}
int freeRam() {
  extern int __heap_start, *__brkval;
  int v;
  return (int)&v - (__brkval == 0 ? (int)&__heap_start : (int)__brkval);
}
