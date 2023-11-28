## Application Folder
This should be located in a decrypted partition mounted at `S:\XXXX` (where **XXXX** is your game id), it should contain the following files:<br/>
```
    Directory: S:\XXXX


Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d-----        09/11/2023     19:25                preboot_data
d-----        09/11/2023     19:18                V0001
d-----        09/11/2023     19:18                V0002
-a----        09/11/2023     21:25            632 enviorment.ps1
-a----        09/11/2023     21:45            222 mount-direct.ps1
-a----        09/11/2023     21:22            869 prepare.ps1
-a----        09/11/2023     21:22            869 cleanup.ps1
-a----        09/11/2023     21:22            869 shutdown.ps1
-a----        13/11/2023     23:03            844 start.ps1
-a----        10/11/2023     02:04           1182 stop.ps
```
Each game version/edition should be in a separate folder and contain the VHDs. If you are not using multiple editions place the VHDs in the game folder<br/>
```
    Directory: S:\XXXX\V0001


Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a----        13/11/2023     23:03     8615190528 app.vhd
-a----        13/11/2023     23:03       23130112 appdata.vhd
-a----        13/11/2023     23:03     3303301120 option.vhd
```
#### enviorment.ps1
The enviorment file is loaded before commands that require variables<br/>
#### prepare.ps1
**This is only a example file and will for obvious reason not work for you**<br/>
A lot of my tasks are done via task scheduler to allow for asynchronous tasks and to handle elevation if used by another system<br/>
This file should contain tasks like:
* Setting audio devices
* Rotate Display
* Set Display Refresh Rate
* Close Applications
* Enter Lockdown Mode
#### start.ps1
This is what you call **as administrator** when you are starting the game
* This will look for a USB Drive called "SOS_INS" and if found run the update script
* Then run the keychip booting the default application script
#### stop.ps1
Closes the application to allow the keychip to shutdown
`<GAME_EXE>` is the actual games process name, like *mercury*
#### shutdown.ps1
What is called when the application is terminated BEFORE the mount points are removed
#### cleanup.ps1
This is called once the keychip is shutdown and right before exit. This is for final cleanup steps
#### mount.ps1
Used to mount disks as read-write to do manual modification and updates
