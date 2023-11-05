#include <Arduino.h>
#include <ArduinoBearSSL.h>
#include "SHA256.h"
#include "device_key.h"
// device_key file should look like this
// const char* applicationID = "SDFE";
// const char* applicationKey = "SOME_CRYPTO_KEY";
// YOU SHOULD DAMN SURE GENERATE A RESPONSE FIRST TO GET THE OUTPUT TO ENCRYPT THE DISK

void setup() {
  Serial.begin(4800);
  Serial.println("SG_CRYPTO_RESET");
  ledColor(255,0,0);
}

void ledColor(int r, int g, int b) {
  analogWrite(18, map(r, 255, 0, 0, 255));
  analogWrite(19, map(g, 255, 0, 0, 255));
  analogWrite(20, map(b, 255, 0, 0, 255));
}

char c;
static String receivedMessage = "";
int open_disks[10] = {0,0,0,0,0,0,0,0,0,0}; 
bool deviceReady = false;

void loop() {
  if (Serial.available()) {
    c = Serial.read();
    if (c == '\n') {
      if (receivedMessage != "") {
        int headerIndex = receivedMessage.indexOf("//");
        if (headerIndex != -1) {
          String header = receivedMessage.substring(0, headerIndex);
          if (header == "SG_CRYPTO") {
            int commandIndex = receivedMessage.indexOf("//", headerIndex + 2);
            String command = receivedMessage.substring(headerIndex + 2, commandIndex);
            if (command == "PRESENSE") {
              Serial.println("CRYPTO_READY");
              ledColor(0,255,0);
              delay(1000);
              ledColor(0,64,0);
            } if (command == "CHECK_IN") {
              if (deviceReady == false) {
                Serial.println("READY");
                deviceReady = true;
                ledColor(0,255,0);
                delay(1000);
                ledColor(0,64,0);
              } else {
                lockDevice();
              }
            } if (command == "CHECK_OUT") {
              if (deviceReady == true) {
                int i = 0;
                while (i <= 10) {
                  open_disks[i] = 0;
                  i++;
                }
                deviceReady = false;
                Serial.println("LOCKED");
                ledColor(0,255,0);
                delay(1000);
                ledColor(0,64,0);
              } else  {
                lockDevice();
              }
            } else if (command == "DECRYPT") {
              if (deviceReady == true) {
                ledColor(0,0,255);
                int appIDIndex = receivedMessage.indexOf("//", commandIndex + 2);
                String appID = receivedMessage.substring(commandIndex + 2, appIDIndex);
                  int appCheckIndex = receivedMessage.indexOf("//", appIDIndex + 2);
                  String appCheck = receivedMessage.substring(appIDIndex + 2, appCheckIndex);
                  int appDriveIndex = receivedMessage.indexOf("//", appCheckIndex + 2);
                  String appDriveStr = receivedMessage.substring(appCheckIndex + 2, appDriveIndex);
                  int appDrive = appDriveStr.toInt();

                if (appID == applicationID && open_disks[appDrive] == 0) {
                  String inputString = applicationID;
                  inputString += " Copyright(C)SEGA ";
                  inputString += appDrive;
                  inputString += " DISK";
                  inputString += appCheck;
                  inputString += " 0x0001";
                  SHA256.beginHmac(applicationKey);
                  SHA256.print(inputString);
                  SHA256.endHmac();

                  while (SHA256.available()) {
                    byte b = SHA256.read();

                    if (b < 16) {
                      Serial.print("0");
                    }

                    Serial.print(b, HEX);
                  }
                  Serial.print("0");
                  Serial.println();
                  open_disks[appDrive] = 1;
                  delay(2000);
                  ledColor(0,64,0);
                } else {
                  lockDevice();
                }
              } else  {
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
  for(;;) {
    ledColor(255,0,0);
    delay(100);
    ledColor(64,0,0);
    delay(100);
  }
}