# Application Disk
This is the contents of the application disk (X:\)

## game.ps1
This is the script to launch the game.
This is considered "secure" and is located in the game to prevent modification
## update.ps1 or download.ps1
* Update must be 7z format and contain only option folders in the root of the archive
* Installation of Option packs will cause a full check-in and check-out of the keychip in update mode, Please be present at the cabinet and ensure the host is secure as the disks will be read-write during the updates!
* Later versions will support full installations based on the SOS VHD format and encrypted updates

If you have a remote update script that was provided by your network administrator then it should be placed in the X:\ drive and no update.ps1 should be present<br/>
This project is not responsible for the creation or maintenance of said scripts

## appdata.vhd
This is Read-Write storage for all app data and configuration files
* You can move segatools.ini overtop the one in X:\bin if you want to prevent modification
## option.vhd
Contains all option folders and is empty by default


## Application VHD Filesystems
### app.vhd
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
