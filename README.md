<img src="https://github.com/UiharuKazari2008/SOS-Keychip/blob/main/.resources/Iona.png"/>

# Savior of Song "Iona" Hardware Keychip for Windows
Keychip emulator that handles game disk encryption and application lifecycle management for arcade cabinet or other applications

## Important Note!
This is NOT in ANY WAY compatible with a official ALLS/Nu keychip/preboot and is designed to work with a sudo-ALLS setup where sgpreboot does not exist. It is designed to recreate the hardware key requirement to use the game and protect data in transit and from offline ripping. This is not designed to be super high security.

## ToDo
* Option to not run application as administration due to weird issues (Diva......)
* Add special update password keystore for decrypting update files
* Add documention on how to pack inital application installation 7z file for easy distribution
* Segatools.ini keychip updates or direct integration to amdeamon
* Support to auto-relaunch application on death
* Board layout for custom keychip PCB with Infinion Private Key Store and Encryption Accelerator

## Use Cases
* Protection of a game/application where you are distributing images that should only be used by someone that has a physical keychip
* Protection of a game/application when the host in transport
* Prevention of offline data ripping

## Hardware
**More than 2KB of RAM IS REQUIRED**<br/>
Waveshare RP2040-GEEK<br>
<img src="https://github.com/UiharuKazari2008/SOS-Keychip/blob/main/.resources/IMG_5948.jpg"/><br>
or any generic RP2040/Arduino<br/>
**The SHA256 Implementation between the Arduino and other hardware ***may not*** be cross-compatible! Pick one hardware standard and stick with it for your own sanity**

## CMAK (Required in 2.0+)
CMAK (Cycling Message Authentication Key) is designed to prevent tampering and readability of messages to/from the keychip and system. Any and all serial messages that are sent in LV1 mode are encrypted using a key that was attached to the previous message and so on. The only way to decrypt the chain is to have access to the inital communication key that is set on the host.

## Keychip Lifecycle
In order of operation
1. Client opens serial port
2. Client takes ownership of hardware and enters ready state
3. Client requests firmware/crypto scheme versions
4. Client switches Keychip to Level 1 or CMAK (Cycling Message Authentication Keying)
5. Client mounts disk and prepares BitLocker unlock request
6. Client requests disk password with ID and IV
7. Keychip replys with disk password
8. Client uses password to unlock disk
9. Repeat step 3 until all disks are ready
10. Client requests full Keychip ID
11. Client injects KID into deamon
12. Client starts application and continues to ping keychip
    * If hardware is removed application will terminate and will panic eject all media
    * In RO setup, when cabinet is powered off (Steps 12 and beyond are not done) keychip should show RESET_OK when powered on
13. Waits for application to be terminated
14. Disks are locked and unmounted
15. Keychip is locked and placed in a offline state

## Updates in Firmware 2.0
* (2.3) Supports multiple games on the same hardware key
* (2.0) Keychip operations are split with Level 0 and Level 1
* (2.0) Level 1 operations use CMAK cycling key encryption and every message has a new key attached and must be used for the next command
* (2.0) Level 1 keys can be reset using a update operation if the keychip client must be temporarily paused

## Setup
0. Download the latest executables (and VHD Images if this is your first time)
  * https://github.com/UiharuKazari2008/SOS-Keychip/releases/download/release/savior_of_song_keychip.exe
  * https://github.com/UiharuKazari2008/SOS-Keychip/releases/tag/VHD-Templates
1. Create a device_key.h file in the ./Keychip-<version> folder
```cplusplus
const int numOfKeys = 1;
const char* keychipText[numOfKeys] = { "XXXX XX XX" };
const char* keychipID[numOfKeys] = { "XXXX-XXXXXXXXXXX" };
const char* applicationID[numOfKeys] = { "XXXX" };
const char* applicationKey[numOfKeys] = { "GAME_KEY" };
const char* applicationIV[numOfKeys] = { "EXPECTED_CLIENT_IV" };

const char* initCommunicationLKey[numOfKeys] = { "INITAL_128_AES_KEY" };
const char* ininCommunicationIV[numOfKeys] = { "INITAL_128_IV_KEY" };
```
* To use multiple keys for multiple games increase the `numOfKeys` and add them to the arrays
2. Create CMAK authentication string
    * Authentication String should be a [base64 encoded string](https://www.bing.com/search?q=base64+encode) like bellow with each value separated by spaces
    * `GAMEID INITAL_128_AES_KEY INITAL_128_IV_KEY` => BASE64
    * If you are using mutiple keys/games you must use a seperate authentication key for each
3. Launch Arduino IDE and flash the firmware
  * Install the following libraries with the library manager
    * ArduinoBearSSL
    * AESLib
    * base64_encode
    * Adafruit_ST7789 (ONLY If your using the ST7789 version)
  * Version Explanation
    * ST7789 - Waveshare RP2040-GEEK
      * "Premium" Keychip with Display
    * HS-ST7735 - LilyGo T-Dongle-S3
      * High Security "Premium" Keychip with Display and OTA checkin
      * Flash should be encypted with esptool
    * RGB_INV - Pimoroni Tiny2040 or Generic RP2040
      * Standard Generic Version with (or without) a LED (Inverted Output)
    * ARDUINO - Generic Arduino Version
      * This generic and cheap bearbone version
      * You must install the following libraries 
        * [Arduino-SHA-256](https://github.com/manutenfruits/Arduino-SHA-256/tree/master) 
        * [ArduinoMD5](https://github.com/tzikis/ArduinoMD5/tree/master)
4. Copy the exe in folder with the blank VHD to your new game folder
5. Mount and Encrypt the volumes<br>
**RUN AS ADMINISTRATOR**
```powershell
& ./savior_of_song_keychip.exe  --auth AUTH_STRING --applicationVHD app.vhd --optionVHD option.vhd --encryptSetup
```
* Disks will be mounted to the following locations:
    * app -> X:\
    * appdata -> Y:\
    * option -> Z:\
    * **Please keep any existing volumes not mounted there!**

6. When Encryption is completed and you have loaded the application, then checkout the keychip<br>
**RUN AS ADMINISTRATOR**
```powershell
& ./savior_of_song_keychip.exe --auth AUTH_STRING --applicationVHD app.vhd --appDataVHD appdata.vhd --optionVHD option.vhd --shutdown
```
7. Run the Keychip bootstrap<br>
**RUN AS ADMINISTRATOR**
  * Keychip should be on `COM5` or use `--port COM#` to change
```powershell
& ./savior_of_song_keychip.exe --auth AUTH_STRING --applicationVHD app.vhd --appDataVHD appdata.vhd --optionVHD option.vhd
```

## Update Games Data
To update option data you must add `--editMode` to enable read-write access
```powershell
& ./savior_of_song_keychip.exe --auth AUTH_STRING --optionVHD option.vhd --editMode
```
  * Remember to --shutdown or the hardware will lockout

## Proper Shutdown
If you are not restarting/powering off your hardware after the game, you must check-out otherwise the keychip will lockout. Run this command after game exe has close.
```powershell
& ./savior_of_song_keychip.exe --auth AUTH_STRING --applicationVHD app.vhd --appDataVHD appdata.vhd --optionVHD option.vhd --shutdown
```

## I need help and its not worth a Issue
For the love of god please don't post actually game keys in Issues, thanks<br/>
You can message me on discord `@vorekazari`<br/>
![image](https://github.com/UiharuKazari2008/SOS-Keychip/assets/15165770/f9ba98ae-7b46-454d-a1a5-c97c9a8813e9)

## Error Codes
The keychip is designed to handle requests in a very specific order and if any command is ran that is not at the correct stage the device will lock and require a power cycle.
* 0001 - Application does not match keychip's known store (Unlock Disk)
* 0091 - Illegal unlock of disk that has previouly been unlocked
* 9000 - Unknown Error when unlocking disk
* 0050 - Illegal Firmware and checksum request when device is owned
* 0055 - Illegal Mode request when exsiting chain was formed
* 0075 - Illegal Command in the current operation mode
* 0013 - Generic Unlock Error
* 0010 - Tried to take ownership when the device is already in use
* 0011 - Tried to release ownership when the device was never in use
* 0013 - Requested Keychip ID before unlock of any disks

## Command Line Options
```powershell
:::::;tX#W####W########WW###BV=::::::::::;=;:;itBBWBXVIIVBMWMXYIt=::::::::;+II+=
::::;tR#MW###WWM####MW#WWWMW#BV+;::::::::;+=;=+IRMWRVVRBMWMXYi=;;:::::::::::++t=
:::;IB##M####WBW###MWMBWWMBBMWBYi;:::=ii+=;;===IRWWRBWWWMRYi;::::;::;;;;::::=:;;
::;IRW########XMW##BBBVRWWBBRXBMRYtitt;;i;:;=iiIX#MRWWBXYi=;;=+itIYYVVVVVYIti=;:
::+VB##W##M#WWRRMXRXYRYVRMWMRXRXBMMRVYItIi+tYXBVR#BXBXYtiiIYVVXRRRRRRRRRRRRRXVYi
::+XMWWM#WXWWBXBRVVYi+IVXRM#WRRRRXXRMMMMWWWWW#MXMWRXYYVVXRRRRRRRRRRRRRRRRRRRRXXX
::;YMXBYRXYYVYVM##WBXtXYMBRMW#BRRXVVVXXXRRBBRRXMWBXRRRRRXXXXXXVVVYItttttIVXRRRVY
=;:=IVIYVVYttiM######WRW##BVMWWWRiitBBBRXXRRRRMWMXXXVVVVXXXRRRRXVVIi=::,:;+tYXRX
;i:::;=iVVVVXXX###########BXXXMWWWBXBBBBMBRBMWMXItiitttttIIYVXXRRRRXVI+;;;;=i+IV
=i++=;;;=IXVXB###########BBBB++IXMMWWWWWWWWWMVit=::::::::::;=+tVXRRRRRXYi===i:;i
;::i:,,,,:iVXVXMMW#WW##MRBBBBt;;;=IYBBBMWWWMBt+titi+==;::,,,,::;+YXRRRRRVI==i;==
+=+=::::::;=YXXXXXXIIYtiRMRYii;;;tt=VBBRIBWMRRBMBRXVYIIi=::::::::=tVRRRRRXItItII
;i;:::::::;;tMBRRXXVIi+++tIIIi+++V=+tRMMWWWMMMMMBBBBBBRXYt=::::::;;tVRRRRRXIYttt
;+:,,,,,,,:+VWBXXRRBRRXVVYYVVYYYXXRMWWWMMRXVXVVYVVXRRRRXXVY+;;===+++IXRRRVRYIIII
;:,,,,,::=iXWBXXRRRRRRBMWWWWWWWWWWWMMMRYi+=;+itttiiitYVXXIiIt;:::+++IVRRRVYYYItI
,,,,:;=iYRMMXVVXRRRRVRXXXIYYYYYYIRMBRY===+ittti=;;=;;=+itYIIt++++iiiIVVVRXIYYIIY
iitYXRMMBRVYVRRXRRRXXXXRRXRWXitIt+i++;:::::::;=iti;::==;;+tit+=;=iitIYYIXXtYVIYY
BBBRRVYYYYXRRRRXRRRVYVRRXIYXi++tI+;=====;:::::::;+t=::::::::=IttIYYIIYIIVYYYVIYY
YXXXVYYVXRRRRXXRRRYYYVRXI+==+itIYi=;;;=======;::::=I+::::::::iYXVVVYYIIIYIttYIII
XXYtYVRRRRRVVXRRXY++YXXI+==++tYYI====;;=======;::tXIi=:::::::iYIitIYIIIIIIIIYIII
Savior of Song Keychip v2.10
by Kazari

Options:
  -c, --port             Keychip Serial Port
                         COM5 is default port                           [string]
  -a, --auth             CMAK Authentication String
                         Base64 Encoded "GAMEID AES_KEY AES_IV"         [string]
  -x, --applicationVHD   Application Disk Image (X:\)                   [string]
  -y, --appDataVHD       Configuration Disk Image (Y:\)                 [string]
  -z, --optionVHD        Options Disk Image (Z:\)                       [string]
  -e, --env              Environment Configuration File                 [string]
  -s, --secureEnv        Environment Configuration File (Secured File)  [string]
      --applicationExec  File to execute (must be in X:\)
                         Default order:
                         1. X:\<applicationExec>
                         2. X:\game.ps1
                         3. X:\bin\game.bat                             [string]
  -p, --prepareScript    PS1 Script to execute to prepare host          [string]
  -q, --cleanupScript    PS1 Script to execute when shutting down       [string]
      --update           Mount Application with write access and run update
                         script (must be in X:\)
                         Default Order:
                         1. X:\update.ps1 (Load Option Pack)
                         2. X:\download.ps1 (SOS Download Order Update Script)
                         3. X:\bin\update.bat
      --editMode         Mount as ReadWrite Mode and Detach Keychip to modify
                         application files
      --shutdown         Unmount and Check-Out
      --encryptSetup     Setup Encryption of Application Volumes
      --dontCleanup      Do not unmount all disk images mounted
```

## Basic "just run the application" BAT file<br/>
**RUN AS ADMINISTRATOR**<br/>
This will login and launch one of the following (X:\game.ps1 or X:\bin\game.bat)
```powershell
savior_of_song_keychip.exe --auth AUTH_STRING --applicationVHD app.vhd --appDataVHD appdata.vhd --optionVHD option.vhd
```

## Creating your own sgpreboot (Fancy "this is a ALLS" setup)
**C:\ MUST be encrypted with TPM at all times and enable write filter for C:\ if required**<br/>

### System Folder
The system folder should be located in `C:\SEGA\system` and contain the following files:<br>
```
savior_of_song_keychip.exe
secure.ps1
```
#### secure.ps1
This is placed inside the system folder because it should be protected by BitLocker
```powershell
$game_id = "XXXX"
$keychip_auth = "AUTH_STRING"
```
### Application Folder
This should be located in a decrypted partition mounted at `S:\XXXX` (where **XXXX** is your game id), it should cotain the following files:<br/>
```
    Directory: S:\XXXX


Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d-----        09/11/2023     19:25                preboot_data
d-----        09/11/2023     19:18                V0001
d-----        09/11/2023     19:18                V0002
-a----        09/11/2023     21:25            632 enviorment.ps1
-a----        09/11/2023     21:45            222 mount.ps1
-a----        09/11/2023     21:22            869 prepare.ps1
-a----        09/11/2023     21:22            869 cleanup.ps1
-a----        13/11/2023     23:03            844 start.ps1
-a----        10/11/2023     02:04           1182 stop.ps
```
Each game version/edition should be in a separate folder and contain the VHDs<br/>
```
    Directory: S:\XXXX\V0001


Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a----        13/11/2023     23:03     8615190528 app.vhd
-a----        13/11/2023     23:03       23130112 appdata.vhd
-a----        13/11/2023     23:03     3303301120 option.vhd
```
#### enviorment.ps1
The enviorment file is loaded before each start/stop/mount/dismount
```powershell
. C:\SEGA\system\secure.ps1

$game_folder = "S:\${game_id}"
$version = $(Get-Content -Path "${game_folder}\preboot_data\disk")
$audio_dev = "Multichannel Output*"

if ($version -eq 10) {
  $install = "${game_folder}\V0001"
} elseif ($version -eq 11) {
  $install = "${game_folder}\V0002"
}

$base = "${install}\app.vhd"
$data = "${install}\appdata.vhd"
$option = "${install}\option.vhd"
```
Create a if statement for each version you would want to "disk swap" with, set the version in the `preboot_data\disk` file (just a number or string)
#### prepare.ps1
**This is only a example file and will for obvious reason not work for you**<br/>
A lot of my tasks are done via task scheduler to allow for asynchronous tasks and to handle elevation if used by another system<br/>
This file should contain tasks like:
* Setting audio devices
* Rotate Display
* Set Display Refresh Rate
* Close Applications
* Enter Lockdown Mode
```powershell
. S:\XXXX\enviorment.ps1
$Mouse=@' 
[DllImport("user32.dll",CharSet=CharSet.Auto, CallingConvention=CallingConvention.StdCall)]
public static extern void mouse_event(long dwFlags, long dx, long dy, long cButtons, long dwExtraInfo);
'@ 
$SendMouseClick = Add-Type -memberDefinition $Mouse -name "Win32MouseEventNew" -namespace Win32Functions -passThru
Function Move-Mouse {

`	Param (
        [int]$X, [int]$y

    )

Process {

        Add-Type -AssemblyName System.Windows.Forms
        $screen = [System.Windows.Forms.SystemInformation]::VirtualScreen
        $screen | Get-Member -MemberType Property
        $screen.Width = $X
        $screen.Height = $y
        [Windows.Forms.Cursor]::Position = "$($screen.Width),$($screen.Height)"


    }
}

Get-Process -Name slidershim -ErrorAction SilentlyContinue | Stop-Process -ErrorAction Stop # Only used for Sequenzia ADS UI and kill to release slider for game
Get-Process | Where-Object {$_.MainWindowTitle -eq "Sequenzia - [InPrivate]"} | Stop-Process -ErrorAction SilentlyContinue
Get-Process | Where-Object {$_.MainWindowTitle -eq "CHUN - [InPrivate]"} | Stop-Process -ErrorAction SilentlyContinue
Stop-ScheduledTask -TaskName "StartHDMIAudio" -ErrorAction SilentlyContinue
taskkill /F /IM explorer.exe | Out-Null
if ($(Get-Process -Name mono-to-stereo -ErrorAction SilentlyContinue).Count -gt 0) {
    Get-Process -Name mono-to-stereo -ErrorAction SilentlyContinue | Stop-Process -ErrorAction SilentlyContinue
}
Get-AudioDevice -List | Where-Object { $_.Type -eq "Playback" -and $_.Name -like "${audio_dev}" } | Set-AudioDevice -ErrorAction Stop | Out-Null # Set System Audio to Multichannel Sound Card
Start-ScheduledTask -TaskName "JVSEnable" -ErrorAction Stop # PowerShell.exe -WindowStyle hidden -Command "Get-PnpDevice -InstanceId 'USB\VID_0CA3&PID_0021\6&3A944CE5&0&2' | Enable-PnpDevice -Confirm:$false"
Start-ScheduledTask -TaskName "LockdownFirewall" -ErrorAction Stop

Move-Mouse -X 1920 -y 0 | Out-Null
```
#### start.ps1
This is what you call **as administrator** when you are starting the game
* This will look for a USB Drive called "SOS_INS" and if found run the update script
* Then run the keychip booting the default application script
```powershell
. .\enviorment.ps1
if ((Get-Volume -FileSystemLabel SOS_INS -ErrorAction SilentlyContinue | Format-List).Length -gt 0) {
    Start-Process -Wait -WindowStyle Normal -FilePath "C:\SEGA\system\savior_of_song_keychip.exe" -ArgumentList "--auth $keychip_auth --applicationVHD $base --appDataVHD $data --optionVHD $option --update"
}
Start-Process -Wait -WindowStyle Normal -FilePath "C:\SEGA\system\savior_of_song_keychip.exe" -ArgumentList "--auth $keychip_auth --applicationVHD $base --appDataVHD $data --optionVHD $option --prepareScript prepare.ps1 --cleanupScript shutdown.ps1"
```
#### stop.ps1
Closes the application to allow the keychip to shutdown
```powershell
Get-Process -Name inject_x86 -ErrorAction SilentlyContinue | Stop-Process -ErrorAction SilentlyContinue
Get-Process -Name inject_x64 -ErrorAction SilentlyContinue | Stop-Process -ErrorAction SilentlyContinue
Get-Process -Name <GAME_EXE> -ErrorAction SilentlyContinue | Stop-Process -ErrorAction SilentlyContinue
```
`<GAME_EXE>` is the actual games process name, like *mercury*
#### cleanup.ps1
What is called to stop the game processes and clean up (needed if your automating and this is a multi-purpose system)
```powershell
. .\enviorment.ps1
if ((Get-Process -Name explorer).Length -eq 0) { & explorer.exe }
Start-ScheduledTask -TaskName "JVSDisable" -ErrorAction Stop # PowerShell.exe -WindowStyle hidden -Command "Get-PnpDevice -InstanceId 'USB\VID_0CA3&PID_0021\6&3A944CE5&0&2' | Disable-PnpDevice -Confirm:$false"
Start-ScheduledTask -TaskName "EnableVNC" -ErrorAction SilentlyContinue # PowerShell.exe -WindowStyle hidden -Command "Start-Service -Name tvnserver"
Get-AudioDevice -List | Where-Object { $_.Type -eq "Playback" -and $_.Name -like "VoiceMeeter Aux Input*" } | Set-AudioDevice | Out-Null
```
#### mount.ps1
Used to mount disks as read-write to performance manual modifitications
```powershell
cd S:\XXXX\

. .\enviorment.ps1
Start-Process -Wait -WindowStyle Normal -FilePath "C:\SEGA\system\savior_of_song_keychip.exe" -ArgumentList "--auth $keychip_auth --applicationVHD $base --appDataVHD $data --optionVHD $option --editMode"
Read-Host "Press key to dismount"
Start-Process -Wait -WindowStyle Normal -FilePath "C:\SEGA\system\savior_of_song_keychip.exe" -ArgumentList "--auth $keychip_auth --applicationVHD $base --appDataVHD $data --optionVHD $option --shutdown"
```
### Application VHD Filesystems
#### app.vhd
This should contain the base application and all thats required to run the application
```
    Directory: X:\


Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d-----        08/11/2023     15:46                bin
-a----        10/11/2023     02:04           1182 game.ps1
-a----        10/11/2023     02:04           1182 update.ps1


    Directory: X:\bin


Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d----l        08/11/2023     15:46                amfs
d----l        08/11/2023     15:46                appdata
d----l        08/11/2023     15:46                option
-a---l        08/11/2023     15:45              0 segatools.ini
```
This will be a Read-Only filesystem when active
* `amfs` links to Y:\amfs
* `appdata` links to Y:\appdata
* `options` links to Z:\
* `segatools.ini` links to Y:\segatools.ini
##### game.ps1
This is the script to launch the game. 
This is considered "secure" and is located in the game to prevent modification 
```powershell
$game_exec = "GAME_NAME.exe"
$game_hook = "GAME_HOOK.dll"
$am_hook = "AM_HOOK.dll"
$am_opts = "JSON FILES"

Write-Host "############################"
cd X:\bin\
Get-Process -Name amdaemon -ErrorAction SilentlyContinue | Stop-Process -Force:$true -ErrorAction SilentlyContinue
Start-Process -WindowStyle Minimized -FilePath inject_x64.exe -ArgumentList "-d -k ${am_hook} amdaemon.exe -f -c ${am_opts}"
& .\inject_x86.exe -d -k ${game_hook} ${game_exec}
Write-Host ""
Write-Host "############################"
Write-Host " TERMINATED"
Write-Host "############################"
```
##### update.ps1 or download.ps1
* Update must be 7z format and contain only option folders in the root of the archive
* Installation of Option packs will cause a full check-in and check-out of the keychip in update mode, Please be present at the cabinet and ensure the host is secure as the disks will be read-write during the updates!
* Later versions will support full installations based on the SOS VHD format and encrypted updates
```powershell
if ((Get-Volume -FileSystemLabel SOS_INS -ErrorAction SilentlyContinue | Format-List).Length -gt 0) {
    $letter = (Get-Volume -FileSystemLabel SOS_INS).DriveLetter
    Get-ChildItem -Path "${letter}:\*.7z" | ForEach-Object {
        & 'C:\Program Files\7-Zip\7z.exe' x -aoa -oZ:\ "${_}"
    }
    Write-Host "Update Complete!"
}
```
If you have a remote update script that was provided by your network administrator then it should be placed in the X:\ drive and no update.ps1 should be present<br/>
This project is not responsible for the creation or maintenance of said scripts

#### appdata.vhd
This is Read-Write storage for all app data and configuration files
```powershell

    Directory: Y:\


Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d-----        08/11/2023     15:43                amfs
d-----        08/11/2023     15:43                appdata
-a----        08/11/2023     15:43            379 segatools.ini
```
* You can move segatools.ini overtop the one in X:\bin if you want to prevent modification
#### option.vhd
Contains all option folders and is empty by default

## Build EXE
```powershell
pkg -t node18 --compress GZip .
npx resedit --in .\build\RP-KeychipEmulator.exe --out .\build\savior_of_song_keychip.exe --icon 1,iona.ico --no-grow --company-name "Academy City Research P.S.R." --file-description "I-401 Keychip" --product-version 1.5.0.0 --product-name 'Savior Of Song Keychip "Iona"'
```
