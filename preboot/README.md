# Iona Preboot and AppBoot Scripts
These are included in a standard image of ALLS NOVA Standard (Build of Windows 10 IoT Enterprise)<br/>
The included scripts are not plug in play and are deliberately censored and include things you dont need (Modify)

## Prerequisites
* (Optional) [ALLS NOVA Preboot](https://github.com/UiharuKazari2008/ARS-NOVA-Bootloader)
* Prepared Host
* Loaded VHD images according to the Iona standard specified in the main README file
* **C:\ MUST be encrypted with TPM at all times and enable write filter for C:\ if required**

## Warning
The folder structures and update USB structures **DO NOT APPLY TO Blue Steel (prebuilt images distributed by Missless)**, that uses different ways of packing updates (NOT Normal 7Zip).<br/>
The update files may use the same extensions and look the same when unpacked but are all encrypted and ARS NOVA OS will not execute any unsigned code<br/>
Blue Steel is a production and secured version of the system shown here, Things are intentional left out on purpose and may be running custom-builds of SOS as SOS is NOT built into the image<br/>

## Folder Structure
* [app](https://github.com/UiharuKazari2008/SOS-Keychip/tree/main/preboot/app) = X:\
* [game_folder](https://github.com/UiharuKazari2008/SOS-Keychip/tree/main/preboot/game_folder) = S:\XXXX
* [system](https://github.com/UiharuKazari2008/SOS-Keychip/tree/main/preboot/system) = C:\SEGA\system
* [SOS_INS](https://github.com/UiharuKazari2008/SOS-Keychip/tree/main/preboot/SOS_INS) = Update USB Format
Each folder contains a readme of the contents
