<img src="https://github.com/UiharuKazari2008/SOS-Keychip/blob/main/.resources/Iona.jpg"/>

# Savior of Song Keychip
ALLS Keychip emulator designed to handle game disk encryption for peak realism on a non-official preboot environment

## Important Note!
This is NOT in ANY WAY compatible with a official ALLS/Nu keychip/preboot and is designed to work with a sudo-ALLS setup where sgpreboot does not exist and is specically designed to recreate the hardware key requirement to use the game. This is not designed to be high security and can be intercepted without much work.

## CHANGE OF OPERATIONS
YOU MUST DECRYPT GAME DATA BEFORE UPDATING AND RE-ENCRYPT AFTER UPDATING, The password hash algorithm has changed and will not match previous disk passwords.

## Hardware
Waveshare RP2040-GEEK<br>
<img src="https://github.com/UiharuKazari2008/SOS-Keychip/blob/main/.resources/IMG_5948.jpg"/><br>
or any generic RP2040/Arduino

## Setup
0. Download the latest executables (and VHD Images if this is your first time)
  * https://github.com/UiharuKazari2008/SOS-Keychip/releases/tag/release
  * https://github.com/UiharuKazari2008/SOS-Keychip/releases/tag/VHD-Templates
1. Create a device_key.h file in the ./Keychip-<version> folder
```cplusplus
const char* keychipText = "XXXX XX XX";
const char* keychipID = "XXXX-XXXXXXXXXXX";
const char* applicationID = "XXXX";
const char* applicationKey = "GAME_KEY";
const char* applicationIV = "EXPECTED_CLIENT_IV";
```
2. Launch Arduino IDE and flash the firmware
  * Install the following libraries with the library manager
    * ArduinoBearSSL
    * Adafruit_ST7789 (ONLY If your using the ST7789 version)
  * Version Explanation
    * ST7789 - Waveshare RP2040-GEEK
      * "Premium" Keychip with Display
    * RGB_INV - Pimoroni Tiny2040 or Generic RP2040
      * Standard Generic Version with (or without) a LED (Inverted Output)
    * ARDUINO - Generic Arduino Version
      * This generic and cheap bearbone version
3. Unzip release.zip in folder with the blank VHD to your new game folder
4. Mount and Encrypt the volumes<br>
**RUN AS ADMINISTRATOR**
```powershell
& ./savior_of_song_keychip.exe --ivString IV_STATIC_STRING_GOES_HERE --applicationID XXXX --applicationVHD app.vhd --optionVHD option.vhd --encryptSetup
```
5. Run the Keychip bootstrap<br>
**RUN AS ADMINISTRATOR**
  * Keychip should be on `COM5` or use `--port COM#` to change
```powershell
& ./savior_of_song_keychip.exe --ivString IV_STATIC_STRING_GOES_HERE --applicationID XXXX --applicationVHD app.vhd --appDataVHD appdata.vhd --optionVHD option.vhd
```
  * Game ID and IV String MUST MATCH device_key.h at all times!
  * Disks will be mounted to the following locations:
    * app -> X:\
    * appdata -> Y:\
    * option -> Z:\
    * **Please keep any existing volumes not mounted there!**
6. When Encryption is completed, and you have loaded your game data then checkout the keychip<br>
**RUN AS ADMINISTRATOR**
```powershell
& ./savior_of_song_keychip.exe --applicationVHD app.vhd --appDataVHD appdata.vhd --optionVHD option.vhd --shutdown
```

## Update Games Data
To update option data you must add `--updateMode` to enable read-write access
```powershell
& ./savior_of_song_keychip.exe --ivString IV_STATIC_STRING_GOES_HERE --applicationID XXXX --optionVHD option.vhd --updateMode
```
  * Remember to --shutdown or the hardware will lockout

## Proper Shutdown
If you are not restarting/powering off your hardware after the game, you must check-out otherwise the keychip will lockout. Run this command after game exe has close.
```powershell
& ./savior_of_song_keychip.exe --applicationVHD app.vhd --appDataVHD appdata.vhd --optionVHD option.vhd --shutdown
```

## Error Codes
The keychip is designed to handle requests in a very specific order and if any command is ran that is not at the correct stage the device will lock and require a power cycle.
* 0001 - Application does not match keychip's known store (Unlock Disk)
* 0090 - Invalid Check String (Unlock Disk)
* 0091 - Illegal unlock of disk that has previouly been unlocked
* 9000 - Unknown Error when unlocking disk
* 0013 - Generic Unlock Error
* 0010 - Tried to take ownership when the device is already in use
* 0011 - Tried to release ownership when the device was never in use
* 0013 - Requested Keychip ID before unlock of any disks

## Basic "just run the application" BAT file
**RUN AS ADMINISTRATOR**
```powershell
savior_of_song_keychip.exe --ivString IV_STATIC_STRING_GOES_HERE --applicationID XXXX --applicationVHD app.vhd --optionVHD option.vhd
X:\app\start.bat
savior_of_song_keychip.exe --applicationVHD app.vhd --appDataVHD appdata.vhd --optionVHD option.vhd --shutdown
```

## Creating your own sgpreboot (Fancy "this is a ALLS" setup)
**C:\ should be encrypted with TPM at all times and enable write filter for C:\ if required**<br/>

### System Folder
The system folder should be located in `C:\SEGA\system` and contain the following files:<br>
```
node_modules
savior_of_song_keychip.exe
savior_of_song_warchdog.exe
secure.ps1
```
#### secure.ps1
This is placed inside the system folder because it should be protected by BitLocker
```powershell
$game_id = "XXXX"
$game_iv = "EXPECTED_CLIENT_IV"
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
-a----        09/11/2023     21:46            331 dismount.ps1
-a----        09/11/2023     21:25            632 enviorment.ps1
-a----        09/11/2023     21:45            222 mount-direct.ps1
-a----        09/11/2023     21:22            869 prepare.ps1
-a----        13/11/2023     23:03            844 start.ps1
-a----        10/11/2023     02:04           1182 stop.ps
```
Each game version should be in a separate folder and contain the VHDs<br/>
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
This file should contain tasks like:
* Setting audio devices
* Rotate Display
* Set Display Refresh Rate
* Close Applications
* Enter Lockdown Mode
This is a example:
```powershell
Write-Host "ソフトウェアの設定 ." -NoNewline
Get-Process -Name slidershim -ErrorAction SilentlyContinue | Stop-Process -ErrorAction Stop
Write-Host "." -NoNewline
Get-Process | Where-Object {$_.MainWindowTitle -eq "Sequenzia - [InPrivate]"} | Stop-Process -ErrorAction SilentlyContinue
Write-Host "." -NoNewline
Stop-ScheduledTask -TaskName "StartHDMIAudio" -ErrorAction SilentlyContinue
Write-Host "." -NoNewline
taskkill /F /IM explorer.exe | Out-Null
Write-Host "." -NoNewline
if ($(Get-Process -Name mono-to-stereo -ErrorAction SilentlyContinue).Count -gt 0) {
    Get-Process -Name mono-to-stereo -ErrorAction SilentlyContinue | Stop-Process -ErrorAction SilentlyContinue
}
Write-Host ". [OK]"
```
#### start.ps1
This is what you call **as administrator** when you are starting the game
```powershell
Write-Host "############################"
Write-Host " SEGA app_boot"
Write-Host "############################"
. .\enviorment.ps1

Write-Host "システムボードを待っています ..." -NoNewline
Sleep -Seconds 2
Write-Host " [OK]"
. .\prepare.ps1
Write-Host "アプリケーションデータのマウント ..." -NoNewline
Get-Disk -FriendlyName "Msft Virtual Disk" -ErrorAction SilentlyContinue | ForEach-Object { Dismount-VHD -DiskNumber $_.Number -Confirm:$false } | Out-Null
Write-Host "." -NoNewline
& C:\SEGA\system\savior_of_song_keychip.exe --ivString $game_iv --applicationID $game_id --applicationVHD $base --appDataVHD $data --optionVHD $option
Write-Host "アプリケーションソフトを起動する ... [OK]"
#Select-Window -ProcessName powershell | Set-WindowPosition -Minimize
cd X:\
. .\game.ps1
```
#### stop.ps1
What is called to stop the game processes and clean up (needed if your automating and this is a multi-purpose system)
```powershell
. .\enviorment.ps1
if ((Get-Process -Name explorer).Length -eq 0) { & explorer.exe }
Start-ScheduledTask -TaskName "JVSDisable" -ErrorAction Stop
Stop-ScheduledTask -TaskName "StartALLSRuntime" -ErrorAction SilentlyContinue
Start-ScheduledTask -TaskName "EnableVNC" -ErrorAction SilentlyContinue
Get-Process -Name inject_x86 -ErrorAction SilentlyContinue | Stop-Process -ErrorAction SilentlyContinue
Get-Process -Name inject_x64 -ErrorAction SilentlyContinue | Stop-Process -ErrorAction SilentlyContinue
Get-Process -Name <GAME_EXE> -ErrorAction SilentlyContinue | Stop-Process -ErrorAction SilentlyContinue
Get-Process -Name savior_of_song_watchdog -ErrorAction SilentlyContinue | Stop-Process -ErrorAction SilentlyContinue
Get-AudioDevice -List | Where-Object { $_.Type -eq "Playback" -and $_.Name -like "VoiceMeeter Aux Input*" } | Set-AudioDevice | Out-Null
if (Test-Path "X:\") {
    & C:\SEGA\system\savior_of_song_keychip.exe --ivString $game_iv --applicationID $game_id --applicationVHD $base --appDataVHD $data --optionVHD $option --shutdown
}
Get-Disk -FriendlyName "Msft Virtual Disk" | ForEach-Object { Dismount-VHD -DiskNumber $_.Number -Confirm:$false }
```
`<GAME_EXE>` is the actual games process name, like *mercury*
#### mount-direct.ps1
Used to mount the game disks as update mode
```powershell
cd S:\XXXX\

. .\enviorment.ps1
. .\dismount.ps1
& C:\SEGA\system\savior_of_song_keychip.exe -v --ivString $game_iv --applicationID $game_id --applicationVHD $base --appDataVHD $data --optionVHD $option --updateMode
```
**Remember to dismount or you will lockout the keychip**
#### dismount.ps1
```powershell
cd S:\XXXX\

. .\enviorment.ps1
if (Test-Path "X:\") {
    & C:\SEGA\system\savior_of_song_keychip.exe --applicationVHD $base --appDataVHD $data --optionVHD $option --shutdown
}
Get-Disk -FriendlyName "Msft Virtual Disk" -ErrorAction SilentlyContinue | ForEach-Object { Dismount-VHD -DiskNumber $_.Number -Confirm:$false }
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
Move-Mouse -X 1920 -y 0

Write-Host "############################"
Write-Host " SECURE BOOT"
Write-Host "############################"

$game_exec = "GAME_NAME.exe"
$game_hook = "GAME_HOOK.dll"
$am_hook = "AM_HOOK.dll"
$am_opts = "JSON FILES"

Write-Host "マルチチャンネルオーディオ構成のセットアップ..." -NoNewline
Get-AudioDevice -List | Where-Object { $_.Type -eq "Playback" -and $_.Name -like "${audio_dev}" } | Set-AudioDevice -ErrorAction Stop | Out-Null
Write-Host " [OK]"
Write-Host "JVS ハードウェアの初期化 ..." -NoNewline
Start-ScheduledTask -TaskName "JVSEnable" -ErrorAction Stop
Sleep -Seconds 3
Write-Host " [OK]"

Write-Host "############################"
Start-Job -ScriptBlock {
  & C:\SEGA\system\savior_of_song_watchdog.exe
  Get-Process -Name inject_x86 -ErrorAction SilentlyContinue | Stop-Process -ErrorAction SilentlyContinue
  Get-Process -Name inject_x64 -ErrorAction SilentlyContinue | Stop-Process -ErrorAction SilentlyContinue
  Get-Process -Name GAME_EXE -ErrorAction SilentlyContinue | Stop-Process -ErrorAction SilentlyContinue
} | Out-Null
cd X:\bin\
Get-Process -Name amdaemon -ErrorAction SilentlyContinue | Stop-Process -Force:$true -ErrorAction SilentlyContinue
Start-Process -WindowStyle Minimized -FilePath inject_x64.exe -ArgumentList "-d -k ${am_hook} amdaemon.exe -f -c ${am_opts}"
& .\inject_x86.exe -d -k ${game_hook} ${game_exec}
Write-Host "############################"
Write-Host " TERMINATED"
Write-Host "############################"
```
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
nexe --input mount-disk.js --target windows-x64-14.15.3 --output .\build\savior_of_song_keychip.exe --ico .\icon.ico
nexe --input watchdog.js --target windows-x64-14.15.3 --output .\build\savior_of_song_watchdog.exe --ico .\icon.ico
```
