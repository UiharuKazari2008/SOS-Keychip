#include <Arduino.h>
#include <ArduinoBearSSL.h>
#include "SHA256.h"
#include "MD5.h"
#include "AESLib.h"
#include "arduino_base64.hpp"
#include "device_key.h"
// device_key.h file should look like whats in the github

AESLib aesLib;

const String SW_VERSION = "2.3";
const String CRYPTO_VERSION = "2";
String COMM_KEY_HASH = "NOT_READY";
// I love you Iona

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
int currentIndex = 0;
int active_r;
int active_g;
int active_b;

void setup() {
  ledColor(255,0,212, 255);
  Serial.begin(4800);
  pinMode(A0, INPUT);
  pinMode(A3, INPUT);
  randomSeed((millis() + analogRead(A0)) * analogRead(A3));
  currentKey = initCommunicationLKey[currentIndex];
  currentIV = ininCommunicationIV[currentIndex];
  String combinded_hash = initCommunicationLKey[currentIndex];
  combinded_hash += "-";
  combinded_hash += ininCommunicationIV[currentIndex];
  MD5.beginHash();
  MD5.print(combinded_hash.c_str());
  MD5.endHash();
  COMM_KEY_HASH = "";
  while (MD5.available()) {
    byte b = MD5.read();
    char hex[3];
    sprintf(hex, "%02X", b);
    COMM_KEY_HASH += hex;
  }
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
    flashLED(250);
  } else if (command == "5") {
    Serial.print("FIRMWARE_VER_");
    Serial.print(SW_VERSION);
    Serial.print(" CRYPTO_VER_");
    Serial.print(CRYPTO_VERSION);
    Serial.print(" INIT_CRYPTO_HASH_");
    Serial.println(COMM_KEY_HASH);
  } else if (command == "6" && encryptComm == false) {
    //TODO: Set LED Color
    int appIDIndex = receivedMessage.indexOf(":", commandIndex + 1);
      String appID = receivedMessage.substring(commandIndex + 1, appIDIndex);
      int foundIndex = -1;
      for (int i=0; i < numOfKeys; i++) {
        if (String(applicationID[i]) == appID) {
          foundIndex = i;
        }
      }
      if (foundIndex == -1) {
        errorNumber = "0001";
        lockDevice();
      } else {
        currentIndex = foundIndex;
        currentKey = initCommunicationLKey[currentIndex];
        currentIV = ininCommunicationIV[currentIndex];
        encryptComm = true;
        String message = "SG_ENC_READY";
        Serial.println(message);
        sendEncryptedMessage(message);
        Serial.println("SG_LV0_GOODBYE");
      }
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
    flashLED(250);
  } else if (command == "0") {
    if (deviceReady == true && exchangeStage >= 1) {
      int i = 0;
      while (i <= max_disks) {
        open_disks[i] = 0;
        i++;
      }
      deviceReady = false;
      exchangeStage = 0;
      sendEncryptedMessage("SG_LOCK");
      sendEncryptedMessage("SG_LV1_GOODBYE");
      ledColor(255, 0, 0, 255);
      delay(100);
      ledColor(255, 0, 0, 128);
      delay(100);
      encryptComm = false;
      currentKey = initCommunicationLKey[currentIndex];
      currentIV = ininCommunicationIV[currentIndex];
      Serial.println("SG_LV0_HELLO");
    } else  {
      errorNumber = "0011";
      lockDevice();
    }
  } else if (command == "1") {
    if (deviceReady == false && exchangeStage == 0) {
      deviceReady = true;
      exchangeStage = 1;
      ledColor(0, 255, 0, 255);
      delay(100);
      ledColor(0, 255, 0, 128);
      sendEncryptedMessage("SG_UNLOCK");
    } else {
      errorNumber = "0010";
      lockDevice();
    }
  } else if (command == "2") {
    sendEncryptedMessage("SG_RESET");
    Serial.println("SG_LV1_RESET");
    currentKey = initCommunicationLKey[currentIndex];
    currentIV = ininCommunicationIV[currentIndex];
  } else if (command == "5") {
    String res = "FIRMWARE_VER_";
    res += SW_VERSION;
    res += " CRYPTO_VER_";
    res += CRYPTO_VERSION;
    res += " INIT_CRYPTO_HASH_";
    res += COMM_KEY_HASH;
    sendEncryptedMessage(res);
  } else if (command == "10") {
    ledColor(255, 0, 255, 255);
    if (deviceReady == true && exchangeStage <= 2) {
      int appIDIndex = receivedMessage.indexOf(":", commandIndex + 1);
      String appID = receivedMessage.substring(commandIndex + 1, appIDIndex);
      int appDriveIndex = receivedMessage.indexOf(":", appIDIndex + 1);
      String appDriveStr = receivedMessage.substring(appIDIndex + 1, appDriveIndex);
      int appDrive = appDriveStr.toInt();

      if (appID == applicationID[currentIndex] && open_disks[appDrive] == 0) {
        String inputString = applicationID[currentIndex];
        inputString += " Copyright(C)SEGA ";
        inputString += applicationIV[currentIndex];
        inputString += " DISK";
        inputString += appDrive;
        inputString += " 0x0001";
        SHA256.beginHmac(applicationKey[currentIndex]);
        SHA256.print(inputString);
        SHA256.endHmac();

        String res = "CRYPTO_KEY_";
        while (SHA256.available()) {
          byte b = SHA256.read();
          char hex[3];
          sprintf(hex, "%02X", b);
          res += hex;
        }
        res += "x0";
        open_disks[appDrive] = 1;
        exchangeStage = 2;
        sendEncryptedMessage(res);
        delay(1000);
        ledColor(0, 255, 0, 128);
      } else {
        if (appID != applicationID[currentIndex]) {
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
      res += keychipID[currentIndex];
      deviceReady = true;
      exchangeStage = 3;
      ledColor(255, 128, 0, 255);
      delay(100);
      ledColor(255, 128, 0, 128);
      sendEncryptedMessage(res);
    } else {
      errorNumber = "0013";
      lockDevice();
    }
  }
}

void lockDevice() {
  ledColor(255, 0, 0, 255);
  for(;;) {
    Serial.print("KEYCHIP_FAILURE_");
    Serial.println(errorNumber);
    flashLED(500);
    delay(1000);
  }
}
void ledColor(int r, int g, int b, long brightness) {
  active_r = r;
  active_g = g;
  active_b = b;
  analogWrite(18, map(r, 255, 0, map(brightness, 255, 0, 0, 255), 255));
  analogWrite(19, map(g, 255, 0, map(brightness, 255, 0, 0, 255), 255));
  analogWrite(20, map(b, 255, 0, map(brightness, 255, 0, 0, 255), 255));
}
void flashLED(long time) {
  analogWrite(18, map(active_r, 255, 0, 0, 255));
  analogWrite(19, map(active_g, 255, 0, 0, 255));
  analogWrite(20, map(active_b, 255, 0, 0, 255));
  delay(time);
  analogWrite(18, map(active_r, 255, 0, map(((deviceReady) ? 128 : 32), 255, 0, 0, 255), 255));
  analogWrite(19, map(active_g, 255, 0, map(((deviceReady) ? 128 : 32), 255, 0, 0, 255), 255));
  analogWrite(20, map(active_b, 255, 0, map(((deviceReady) ? 128 : 32), 255, 0, 0, 255), 255));
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
void parseEncryptedMessage(String receivedMessage) {
  const String decMessage = decrypt(receivedMessage);
  const String decHeader = decMessage.substring(0,10);
  if (decHeader == "SG_ENCMSG ") {
    parseLevel1Message(decMessage.substring(10, decMessage.length()));
  } else {
    Serial.println("SG_LV1_MSG_CRYPTO_FAILURE");
  }
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
