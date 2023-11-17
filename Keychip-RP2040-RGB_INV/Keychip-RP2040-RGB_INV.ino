#include <Arduino.h>
#include <ArduinoBearSSL.h>
#include "SHA256.h"
#include "device_key.h"
// device_key.h file should look like this
// const char* keychipText = "SDFE XX XX"; // Should be GAME_ID VER REGION
// const char* keychipID = "XXXX-XXXXXXXXXXX"; // Keychip ID that will be sent to segatools
// const char* applicationID = "SDFE";
// const char* applicationKey = "SOME_CRYPTO_KEY"; // Refer to "the list of keys" or make your own does not matter
// const char* applicationIV = "EXPECTED_CHECK_CODE" // Same as above, used as check string and not actually used as IV at this time

const String SW_VERSION = "1.1";
const String CRYPTO_VERSION = "2";
// I love you Iona

void setup() {
  ledColor(255,0,212, 255);
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
int active_r;
int active_g;
int active_b;

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
              flashLED(250);
            } if (command == "1") {
              if (deviceReady == false && exchangeStage == 0) {
                Serial.println("SG_UNLOCK");
                deviceReady = true;
                exchangeStage = 1;
                ledColor(0, 255, 0, 255);
                delay(100);
                ledColor(0, 255, 0, 128);
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
                ledColor(255, 0, 0, 255);
                delay(100);
                ledColor(255, 0, 0, 128);
                delay(100);
              } else  {
                errorNumber = "0011";
                lockDevice();
              }
            } else if (command == "5") {
              Serial.print("FIRMWARE_VER_");
              Serial.print(SW_VERSION);
              Serial.print(" CRYPTO_VER_");
              Serial.println(CRYPTO_VERSION);
            } else if (command == "11") {
              if (deviceReady == true && exchangeStage == 2) {
                Serial.print("KEYCHIP_ID_");
                Serial.println(keychipID);
                deviceReady = true;
                exchangeStage = 3;
                ledColor(255, 128, 0, 255);
                delay(100);
                ledColor(255, 128, 0, 128);
              } else {
                errorNumber = "0013";
                lockDevice();
              }
            } else if (command == "10") {
              if (deviceReady == true && exchangeStage <= 2) {
                ledColor(255, 0, 255, 255);
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
                  ledColor(0, 255, 0, 128);
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