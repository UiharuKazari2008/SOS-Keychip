. .\enviorment.ps1
# Look for Update USB
if ((Get-Volume -FileSystemLabel SOS_INS -ErrorAction SilentlyContinue | Format-List).Length -gt 0) {
    Set-Content -Encoding utf8 -Value "アップデートUSBは取り外さないでください!" -Path "C:\SEGA\system\preboot\preboot_Data\StreamingAssets\install.txt"
    Start-Process -Wait -WindowStyle Minimized -FilePath "C:\SEGA\system\savior_of_song_keychip.exe" -ArgumentList "--auth $keychip_auth --applicationVHD $base --appDataVHD $data --optionVHD $option --update --displayState `"C:\SEGA\system\preboot\preboot_Data\StreamingAssets\state.txt`""
    Set-Content -Encoding utf8 -Value "STEP 1=起動しています= `nerror=false" -Path "C:\SEGA\system\preboot\preboot_Data\StreamingAssets\state.txt"
}
# Run Application
Start-Process -Wait -WindowStyle Minimized -FilePath "C:\SEGA\system\savior_of_song_keychip.exe" -ArgumentList "--auth $keychip_auth --applicationVHD $base --appDataVHD $data --optionVHD $option --prepareScript prepare.ps1 --cleanupScript cleanup.ps1 --shutdownScript shutdown.ps1 --displayState `"C:\SEGA\system\preboot\preboot_Data\StreamingAssets\state.txt`""