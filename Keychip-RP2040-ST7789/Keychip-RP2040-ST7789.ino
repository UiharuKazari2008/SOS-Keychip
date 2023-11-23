#include <Arduino.h>
#include <Adafruit_GFX.h>    // Core graphics library
#include <Adafruit_ST7789.h> // Hardware-specific library for ST7789
#include <Fonts/FreeSans9pt7b.h>
#include <ArduinoBearSSL.h>
#include <SPI.h>
#include "SHA256.h"
#include "MD5.h"
#include "AESLib.h"
#include "arduino_base64.hpp"
#include "device_key.h"
// device_key.h file should look like this
// const char* keychipText = "SDFE XX XX"; // Should be GAME_ID VER REGION
// const char* keychipID = "XXXX-XXXXXXXXXXX"; // Keychip ID that will be sent to segatools
// const char* applicationID = "SDFE";
// const char* applicationKey = "SOME_CRYPTO_KEY"; // Refer to "the list of keys" or make your own does not matter
// const char* applicationIV = "EXPECTED_CHECK_CODE" // Same as above, used as check string and not actually used as IV at this time
#include "images.h"

#define LCD_CS 9
#define LCD_DC 8
#define LCD_MOSI 11
#define LCD_SCK 10
#define LCD_RST 12
#define LCD_BL 25
#define LCD_BRIGHTNESS 255

#define SDIO_SCK 18
#define SDIO_MOSI 19
#define SDIO_MISO 20
#define SDIO_CS  23

#define BG_COLOR ST77XX_WHITE
#define FG_WHITE ST77XX_BLACK

AESLib aesLib;

const String SW_VERSION = "2.2";
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
int active_r;
int active_g;
int active_b;

Adafruit_ST7789 tft = Adafruit_ST7789(LCD_CS, LCD_DC, LCD_MOSI, LCD_SCK, LCD_RST);

void setup() {
  tft.init(135, 240);
  pinMode(A0, INPUT);
  pinMode(A3, INPUT);
  randomSeed((millis() + analogRead(A0)) * analogRead(A3));
  tft.setRotation(tft.getRotation()+3);
  clearScreen();
  SPI.setRX(SDIO_MISO);
  SPI.setTX(SDIO_MOSI);
  SPI.setSCK(SDIO_SCK);
  analogWrite(LCD_BL, LCD_BRIGHTNESS);
  drawMainScreen();
  ledColor(0);

  Serial.begin(4800);
  currentKey = initCommunicationLKey;
  currentIV = ininCommunicationIV;
  String combinded_hash = initCommunicationLKey;
  combinded_hash += "-";
  combinded_hash += ininCommunicationIV;
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
    analogWrite(LCD_BL, 126);
    delay(250);
    analogWrite(LCD_BL, (deviceReady) ? 64 : 2);
  } else if (command == "5") {
    if (deviceReady == false) {
      Serial.print("FIRMWARE_VER_");
      Serial.print(SW_VERSION);
      Serial.print(" CRYPTO_VER_");
      Serial.print(CRYPTO_VERSION);
      Serial.print(" INIT_CRYPTO_HASH_");
      Serial.println(COMM_KEY_HASH);
    } else {
      errorNumber = "0050";
      lockDevice();
    }
  } else if (command == "6") {
    //TODO: Set LED Color
    if (deviceReady == false) {
      encryptComm = true;
      String message = "SG_ENC_READY";
      Serial.println(message);
      sendEncryptedMessage(message);
      Serial.println("SG_LV0_GOODBYE");
    } else {
      errorNumber = "0055";
      lockDevice();
    }
  } else if (command == "0" || command == "1" || command == "2" || command == "10" || command == "11") {
    errorNumber = "0075";
    lockDevice();
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
    analogWrite(LCD_BL, 126);
    delay(250);
    analogWrite(LCD_BL, (deviceReady) ? 64 : 2);
  } else if (command == "0") {
    if (deviceReady == true && exchangeStage >= 1) {
      int i = 0;
      while (i <= max_disks) {
        open_disks[i] = 0;
        i++;
      }
      deviceReady = false;
      exchangeStage = 0;
      drawKeychipInfo();
      sendEncryptedMessage("SG_LOCK");
      sendEncryptedMessage("SG_LV1_GOODBYE");
      ledColor(1);
      analogWrite(LCD_BL, 255);
      delay(100);
      analogWrite(LCD_BL, 2);
      delay(100);
      encryptComm = false;
      currentKey = initCommunicationLKey;
      currentIV = ininCommunicationIV;
      Serial.println("SG_LV0_HELLO");
    } else  {
      errorNumber = "0011";
      lockDevice();
    }
  } else if (command == "1") {
    if (deviceReady == false && exchangeStage == 0) {
      drawActiveInfo("OPEN DEV", keychipText);
      deviceReady = true;
      exchangeStage = 1;
      ledColor(2);
      analogWrite(LCD_BL, 255);
      delay(100);
      analogWrite(LCD_BL, 2);
      sendEncryptedMessage("SG_UNLOCK");
    } else {
      errorNumber = "0010";
      lockDevice();
    }
  } else if (command == "2") {
    ledColor(6);
    sendEncryptedMessage("SG_RESET");
    Serial.println("SG_LV1_RESET");
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
    ledColor(5);
    analogWrite(LCD_BL, 255);
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
        String line1 = "DISK KEY REQ ";
        line1 += appDrive;
        drawActiveInfo(line1, keychipText);
        SHA256.beginHmac(applicationKey);
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
        analogWrite(LCD_BL, 64);
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
      drawActiveInfo("APP RUNNING", keychipText);
      ledColor(10);
      analogWrite(LCD_BL, 255);
      delay(100);
      analogWrite(LCD_BL, 64);
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

void lockDevice() {
  tft.setFont(&FreeSans9pt7b);
  tft.setTextSize(1);
  drawBitmap(0, 0, tft.width(), tft.height(), fail_ios_image);
  int16_t x, y, rectX, rectY, rectHeight, rectWidth;
  uint16_t w, h;
  tft.getTextBounds("KEYCHIP_FAILURE", 0, 0, &x, &y, &w, &h);
  x = 4;
  y = (tft.height() - h) / 2 + 51;
  rectHeight = ((h + 6) * 2) + 1;
  rectWidth = tft.width() - 24;
  rectX = x - 4;
  rectY = y - 16;
  Serial.println(x);
  Serial.println(y);
  Serial.println(h);
  Serial.println(w);
  tft.fillRect(rectX, rectY, rectWidth, rectHeight, ST77XX_BLACK);
  tft.drawRect(rectX, rectY, rectWidth, rectHeight, ST77XX_BLACK);
  tft.setCursor(x, y);
  tft.setTextColor(ST77XX_ORANGE);
  tft.print("KEYCHIP_FAILURE");
  y = y + h + 4;
  tft.setCursor(x, y);
  tft.setTextColor(ST77XX_ORANGE);
  tft.print(errorNumber);
  ledColor(20);
  for(;;) {
    analogWrite(LCD_BL, 255);
    delay(1000);
    Serial.print("KEYCHIP_FAILURE_");
    Serial.println(errorNumber);
  }
}
void clearScreen(){
  tft.setCursor(0, 0);
  tft.fillScreen(ST77XX_BLACK);
  tft.setTextColor(ST77XX_WHITE);
}
void ledColor(int state) {
  switch (state) {
    case 0:
      tft.fillRect((tft.width() - 38), 94, 38, 41, 0xf81b);
      drawBitmap((tft.width() - 35), 100, 32, 32, warn_icon);
      break;
    case 1:
      tft.fillRect((tft.width() - 38), 94, 38, 41, 0xf800);
      drawBitmap((tft.width() - 35), 100, 32, 32, unlock_icon);
      break;
    case 2:
      tft.fillRect((tft.width() - 38), 94, 38, 41, 0x07e4);
      drawBitmap((tft.width() - 35), 100, 32, 32, claim_icon);
      break;
    case 5:
      tft.fillRect((tft.width() - 38), 94, 38, 41, 0xf81b);
      drawBitmap((tft.width() - 35), 100, 32, 32, disk_key);
      break;
    case 6:
      tft.fillRect((tft.width() - 38), 94, 38, 41, 0x071f);
      drawBitmap((tft.width() - 35), 100, 32, 32, update_icon);
      break;
    case 10:
      tft.fillRect((tft.width() - 38), 94, 38, 41, 0xfb40);
      drawBitmap((tft.width() - 35), 100, 32, 32, lock_icon);
      break;
    case 20:
      tft.fillRect((tft.width() - 38), 94, 38, 41, 0xfea0);
      drawBitmap((tft.width() - 35), 100, 32, 32, fail_icon);
      break;
    default:
      break;
  }
}
void printHex(uint8_t *text, size_t size) {
  for (byte i = 0; i < size; i = i + 1) {
    if (text[i] < 16) {
      Serial.print("0");
    }
    Serial.print(text[i], HEX);
  }
}
void convertCharToUint8(const char* charArray, uint8_t* uintArray, size_t length) {
  for (size_t i = 0; i < length; ++i) {
    uintArray[i] = static_cast<uint8_t>(charArray[i]);
  }
}
void drawBitmap(int16_t x, int16_t y, int16_t width, int16_t height, const uint16_t* bitmap) {
  tft.startWrite();
  for (int16_t i = 0; i < height; i++) {
    for (int16_t j = 0; j < width; j++) {
      tft.writePixel(x + j, y + i, bitmap[i * width + j]);
    }
  }
  tft.endWrite();
}
void drawOutlinedText(const char *text, int16_t x, int16_t y, uint16_t color, uint16_t outlineColor) {
  // Draw the outline
  tft.setTextColor(outlineColor);
  tft.setCursor(x - 1, y - 1);
  tft.print(text);
  tft.setCursor(x + 1, y - 1);
  tft.print(text);
  tft.setCursor(x - 1, y + 1);
  tft.print(text);
  tft.setCursor(x + 1, y + 1);
  tft.print(text);

  // Draw the main text
  tft.setTextColor(color);
  tft.setCursor(x, y);
  tft.print(text);
}
void drawMainScreen() {
  tft.setFont(&FreeSans9pt7b);
  tft.setTextSize(1);
  drawBitmap(0, 0, tft.width(), tft.height(), home_ios_image);
  int16_t x, y, rectX, rectY, rectHeight, rectWidth;
  uint16_t w, h;
  //tft.getTextBounds("Savior of Song Keychip", 0, 0, &x, &y, &w, &h);
  //x = (tft.width() - w) / 2;
  //y = (tft.height() - h) / 2 - 40;
  //drawOutlinedText("Savior of Song Keychip", x, y, FG_WHITE, BG_COLOR);
  String version = "FW:";
  version += SW_VERSION;
  version += " - CG:";
  version += CRYPTO_VERSION;
  tft.getTextBounds(version, 0, 0, &x, &y, &w, &h);
  x = (tft.width() - w) - 5;
  y = (tft.height() - h) / 2 + 30;
  drawOutlinedText(version.c_str(), x, y, FG_WHITE, BG_COLOR);
  drawActiveInfo("Savior of Song", "RESET_OK");
}
void drawKeychipInfo() {
  tft.setFont(&FreeSans9pt7b);
  int16_t x, y, rectX, rectY, rectHeight, rectWidth;
  uint16_t w, h;
  const String censoredID = String(keychipID).substring(0, 13);
  tft.getTextBounds(censoredID, 0, 0, &x, &y, &w, &h);
  x = 4;
  y = (tft.height() - h) / 2 + 51;
  rectHeight = ((h + 6) * 2) + 1;
  rectWidth = tft.width() - 38;
  rectX = x - 4;
  rectY = y - 16;
  tft.fillRect(rectX, rectY, rectWidth, rectHeight, ST77XX_BLACK);
  tft.drawRect(rectX, rectY, rectWidth, rectHeight, ST77XX_BLACK);
  tft.setCursor(x, y);
  tft.setTextColor(BG_COLOR);
  tft.print(censoredID);
  y = y + h + 4;
  tft.setCursor(x, y);
  tft.setTextColor(BG_COLOR);
  tft.print(keychipText);
}
void drawActiveInfo(String line1, String line2) {
  tft.setFont(&FreeSans9pt7b);
  int16_t x, y, rectX, rectY, rectHeight, rectWidth;
  uint16_t w, h;
  tft.getTextBounds(line1, 0, 0, &x, &y, &w, &h);
  x = 4;
  y = (tft.height() - h) / 2 + 51;
  rectHeight = ((h + 6) * 2) + 1;
  rectWidth = tft.width() - 38;
  rectX = x - 4;
  rectY = y - 16;
  tft.fillRect(rectX, rectY, rectWidth, rectHeight, ST77XX_BLACK);
  tft.drawRect(rectX, rectY, rectWidth, rectHeight, ST77XX_BLACK);
  tft.setCursor(x, y);
  tft.setTextColor(BG_COLOR);
  tft.print(line1);
  y = y + h + 4;
  tft.setCursor(x, y);
  tft.setTextColor(BG_COLOR);
  tft.print(line2);
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
