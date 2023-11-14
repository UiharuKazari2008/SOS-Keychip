#include <Arduino.h>
#include <Adafruit_GFX.h>    // Core graphics library
#include <Adafruit_ST7789.h> // Hardware-specific library for ST7789
#include <Fonts/FreeSans9pt7b.h>
#include <ArduinoBearSSL.h>
#include <SPI.h>
#include "SHA256.h"
#include "device_key.h"
// device_key file should look like this
// const char* keychipText = "SDFE XX XX";
// const char* keychipID = "XXXX-XXXXXXXXXXX";
// const char* applicationID = "SDFE";
// const char* applicationKey = "SOME_CRYPTO_KEY";
// const char* applicationIV = "EXPECTED_CHECK_CODE"
#include "images.h"

#define LCD_CS 9
#define LCD_DC 8
#define LCD_MOSI 11
#define LCD_SCK 10
#define LCD_RST 12
#define LCD_BL 25
#define LCD_BRIGHTNESS 2

#define SDIO_SCK 18
#define SDIO_MOSI 19
#define SDIO_MISO 20
#define SDIO_CS  23

#define BG_COLOR ST77XX_WHITE
#define FG_WHITE ST77XX_BLACK

Adafruit_ST7789 tft = Adafruit_ST7789(LCD_CS, LCD_DC, LCD_MOSI, LCD_SCK, LCD_RST);

void setup() {
  tft.init(135, 240);
  tft.setRotation(tft.getRotation()+3);
  clearScreen();
  SPI.setRX(SDIO_MISO);
  SPI.setTX(SDIO_MOSI);
  SPI.setSCK(SDIO_SCK);
  analogWrite(LCD_BL, LCD_BRIGHTNESS);
  drawMainScreen();
  ledColor(ST77XX_MAGENTA);
  
  Serial.begin(4800);
  Serial.println("SG_CRYPTO_RESET");
}

char c;
static String receivedMessage = "";
String errorNumber = "";
int max_disks = 10;
int open_disks[10] = {0,0,0,0,0,0,0,0,0,0};
bool deviceReady = false;
int exchangeStage = 0;
bool encryptComm = false;
char activeKey[24];

void loop() {
  if (Serial.available()) {
    c = Serial.read();
    if (c == '!') {
      if (receivedMessage != "") {
        int headerIndex = receivedMessage.indexOf("$");
        if (headerIndex != -1) {
          String header = receivedMessage.substring(0, headerIndex);
          if (header == "@") {
            int commandIndex = receivedMessage.indexOf("$", headerIndex + 1);
            String command = receivedMessage.substring(headerIndex + 1, commandIndex);
            if (command == "?") {
              Serial.println("SG_HELLO");
              //ledColor(ST77XX_GREEN);
              analogWrite(LCD_BL, 126);
              delay(250);
              analogWrite(LCD_BL, (deviceReady) ? 64 : 2);
            } if (command == "1") {
              if (deviceReady == false && exchangeStage == 0) {
                Serial.println("SG_UNLOCK");
                deviceReady = true;
                exchangeStage = 1;
                ledColor(ST77XX_GREEN);
                analogWrite(LCD_BL, 255);
                delay(100);
                analogWrite(LCD_BL, 2);
              } else {
                errorNumber = "0010";
                lockDevice();
              }
            } if (command == "0") {
              if (deviceReady == true && exchangeStage >= 1) {
                int i = 0;
                while (i <= max_disks) {
                  open_disks[i] = 0;
                  i++;
                }
                deviceReady = false;
                exchangeStage = 0;
                Serial.println("SG_LOCK");
                ledColor(ST77XX_RED);
                analogWrite(LCD_BL, 255);
                delay(100);
                analogWrite(LCD_BL, 2);
                delay(100);
              } else  {
                errorNumber = "0011";
                lockDevice();
              }
            } else if (command == "11") {
              if (deviceReady == true && exchangeStage == 2) {
                Serial.print("KEYCHIP_ID_");
                Serial.println(keychipID);
                deviceReady = true;
                exchangeStage = 3;
                ledColor(ST77XX_ORANGE);
                analogWrite(LCD_BL, 255);
                delay(100);
                analogWrite(LCD_BL, 64);
              } else {
                errorNumber = "0013";
                lockDevice();
              }
            } else if (command == "10") {
              if (deviceReady == true && exchangeStage <= 2) {
                ledColor(0xfb9f);
                analogWrite(LCD_BL, 255);
                int appIDIndex = receivedMessage.indexOf("$", commandIndex + 1);
                String appID = receivedMessage.substring(commandIndex + 1, appIDIndex);
                int appCheckIndex = receivedMessage.indexOf("$", appIDIndex + 1);
                String appCheck = receivedMessage.substring(appIDIndex + 1, appCheckIndex);
                int appDriveIndex = receivedMessage.indexOf("$", appCheckIndex + 1);
                String appDriveStr = receivedMessage.substring(appCheckIndex + 1, appDriveIndex);
                int appDrive = appDriveStr.toInt();

                if (appID == applicationID && open_disks[appDrive] == 0 && appCheck == applicationIV) {
                  String inputString = applicationID;
                  inputString += " Copyright(C)SEGA ";
                  inputString += appCheck;
                  inputString += " DISK";
                  inputString += appDrive;
                  inputString += " 0x0001";
                  SHA256.beginHmac(applicationKey);
                  SHA256.print(inputString);
                  SHA256.endHmac();

                  Serial.print("CRYPTO_KEY_");
                  while (SHA256.available()) {
                    byte b = SHA256.read();
                    if (b < 16) {
                      Serial.print("0");
                    }
                    Serial.print(b, HEX);
                  }
                  Serial.println("x0");
                  open_disks[appDrive] = 1;
                  delay(1000);
                  analogWrite(LCD_BL, 64);
                  exchangeStage = 2;
                } else {
                  if (appID != applicationID) {
                    errorNumber = "0001";
                  } else if (appCheck != applicationIV) {
                    errorNumber = "0090";
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
            }
          }
        }
      }
      receivedMessage = "";
    } else {
      receivedMessage += c;
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
  ledColor(0xffe0);
  for(;;) {
    ledColor(0xffe0);
    analogWrite(LCD_BL, 255);
    delay(1000);
    ledColor(ST77XX_MAGENTA);
    Serial.print("KEYCHIP_FAILURE_");
    Serial.println(errorNumber);
  }
}
void clearScreen(){
  tft.setCursor(0, 0);
  tft.fillScreen(ST77XX_BLACK);
  tft.setTextColor(ST77XX_WHITE);
}
void ledColor(uint16_t color) {
  tft.fillRect((tft.width() - 24), 96, 24, 39, color);
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
  tft.getTextBounds("Savior of Song Keychip", 0, 0, &x, &y, &w, &h);
  x = (tft.width() - w) / 2;
  y = (tft.height() - h) / 2 - 40;
  drawOutlinedText("Savior of Song Keychip", x, y, FG_WHITE, BG_COLOR);
  drawKeychipInfo();
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
  rectWidth = tft.width() - 24;
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
void drawActiveKeychipInfo() {
  tft.setFont(&FreeSans9pt7b);
  int16_t x, y, rectX, rectY, rectHeight, rectWidth;
  uint16_t w, h;
  const String censoredID = String(keychipID).substring(0, 13);
  tft.getTextBounds(censoredID, 0, 0, &x, &y, &w, &h);
  x = 4;
  y = (tft.height() - h) / 2 + 51;
  rectHeight = ((h + 6) * 2) + 1;
  rectWidth = tft.width() - 24;
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