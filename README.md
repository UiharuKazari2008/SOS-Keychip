# Savior of Song Keychip
ALLS Keychip emulator designed to handle game disk encryption for peak realism on a non-official preboot environment

## Important Note!
This is NOT in ANY WAY compatible with a offical ALLS/Nu keychip/preboot and is designed to work with a sudo-ALLS setup where sgpreboot does not exist and is specically designed to recreate the hardware key requirement to use the game. This is not designed to be high security and can be intercepted without much work.

## Hardware
Current design uses any Pimoroni Tiny2040 but if you remove the LED code you can use this with any arduino or RP2040

## Implimentation
1. Create a device_key.h file in the ./alls_keychip folder
```cplusplus
const char* applicationID = "XXXX";
const char* applicationKey = "ENCRYPTION_KEY_STRING_GOES_HERE";
```
2. Build the Ino on your hardware
3. Unzip release.zip in folder with your VHDs
4. Encrypt the volumes
```powershell
& ./savior_of_song_keychip.exe --ivString IV_STATIC_STRING_GOES_HERE --applicationID XXXX --applicationVHD app.vhd --optionVHD option.vhd --encryptSetup
```
5. Run the keychip 
* Your ALLS must have Hyper-V Commandlets installed to use the Mount-VHD commands<br>
* Keychip should be on COM5 or use `--port COM#` to change
```powershell
& ./savior_of_song_keychip.exe --ivString IV_STATIC_STRING_GOES_HERE --applicationID XXXX --applicationVHD app.vhd --appDataVHD appdata.vhd --optionVHD option.vhd
```
* Game ID should matches device_key.h and ivString should be constant otherwise the encryption password will chnage

* Disks will be mounted to the following locations:
  * app -> X:\
  * appdata -> Y:\
  * option -> Z:\
  * Please keep any existing volumes not mounted there!

## Update Games Data
To update option data you must add `--updateMode` to enable read-write access
```powershell
& ./savior_of_song_keychip.exe --ivString IV_STATIC_STRING_GOES_HERE --applicationID XXXX --optionVHD option.vhd --updateMode
```

## Proper Shutdown
If you are not restarting your hardware after the game is closed, you must check-out otherwise the keychip will lockout. Run this command after game exe has close.
```powershell
& ./savior_of_song_keychip.exe --applicationVHD app.vhd --appDataVHD appdata.vhd --optionVHD option.vhd --shutdown
```


## LOL
Fuck off this does not violate any copyright, try me
