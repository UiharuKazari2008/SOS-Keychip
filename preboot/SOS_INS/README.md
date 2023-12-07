
# Update USB Structure
SOS Keychip is designed to use the SOS Installer Format for game distribution. Please refer to this standard for update files to work.<br/>
**update.ps1 MUST be present in the base app.vhd in order to install updates**

## USB Disk Setup
* Disk must be named "SOS_INS"
* Disk should be formated as a Windows readable format (NTFS is standard)
* All files should be placed in the root of disk
```powershell
    Directory: H:\


Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a----        06/12/2023     03:41     5617840395 SDHD_X.XX.00_XXXXX_Bundled_SOS_INS_XXXXXXXX_0000_Base.app
-a----        06/12/2023     15:46           1590 SDHD_X.XX.00_XXXXX_Bundled_SOS_INS_XXXXXXXX_0000_Base.db
-a----        06/12/2023     03:32      657311979 SDHD_X.XX.00_XXXXX_Bundled_SOS_INS_XXXXXXXX_0099_Omnimix.opt
-a----        06/12/2023     03:28      233542554 SDHD_X.XX.00_XXXXX_Bundled_SOS_INS_XXXXXXXX_0100.opt
-a----        06/12/2023     04:47           3941 SDHD_X.XX.00_XXXXX_Bundled_SOS_INS_XXXXXXXX_9000_AppData.db
-a----        06/12/2023     14:34        4109126 SDHD_X.XX.00_XXXXX_Bundled_SOS_INS_XXXXXXXX_9000_RealCab.app
-a----        06/12/2023     03:26          39516 SDHD_X.XX.00_XXXXX_Bundled_SOS_INS_XXXXXXXX_9999_Suplimental.opt
-a----        06/12/2023     15:35            363 SDHD_X.XX.00_XXXXX_Bundled_SOS_INS_XXXXXXXX_Z9ML_vorekazari.db
-a----        14/11/2023     20:02             39 {{ Format System }}
```

## Update Files
Game installations and updates are broken into 3 types that map to the 3 different volumes
### File Types
* `*.app` Game Program Files => `X:\`
* `*.opt` Suplimental Game Updates => `Z:\`
* `*.db` Game AppData Updates => `Y:\`

### Disk Fromatting Files
When releaseing new updates that will contain conflicting files or are installing complete new version, you should use the following files to format specific disks.
* `{{ Format System }}` Eraseing the contents of `X:\ Y:\ Z:\`
  * Will exclude `game.ps1` and `update.ps1`
  * Will recreate the following volumes and maps
    * `X:\bin\segatools.ini` => `Y:\segatools.ini`
    * `X:\bin\amfs` => `Y:\amfs`
    * `X:\bin\appdata` => `Y:\appdata`
    * `X:\bin\option` => `Z:\`
  * You must include a `.app` that contains your `download.ps1` if you are using remote updates
* `{{ Format Sub }}` Erase Option data `Z:\`
* `{{ Format Data }}` Erase AppData `Y:\`
  * Will recreate the following folders and empty files
    * `Y:\segatools.ini`
    * `Y:\amfs`
    * `Y:\appdata`
  * Your `.db` must contain AMFS ICF and segatools.ini configuration

### Packing Update Files
* Archive the contents as 7z with what ever compression you choose (if you need to, change the file extention after creation)
* Pack all files in the root of the archive as they should apper on the disks

![image](https://github.com/UiharuKazari2008/SOS-Keychip/assets/15165770/1e114ad8-8411-40a3-b1f4-a3ca950e3037)

#### Update Encryption
* Obtain the "Disk 9 Decryption Key" from the Keychip by running `--update -v`<br/>
![image](https://github.com/UiharuKazari2008/SOS-Keychip/assets/15165770/fbb735f2-bcac-45db-bf63-bd56212449a9)

* Enter the password into the Password field when creating archive<br/>
![image](https://github.com/UiharuKazari2008/SOS-Keychip/assets/15165770/e94b325b-42c5-4a6f-877c-c4d4e8f155a2)
