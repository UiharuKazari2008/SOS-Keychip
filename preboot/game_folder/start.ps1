. .\enviorment.ps1
# Look for Update USB
if ((Get-Volume -FileSystemLabel SOS_INS -ErrorAction SilentlyContinue | Format-List).Length -gt 0) {
    Start-Process -Wait -WindowStyle Normal -FilePath "C:\SEGA\system\savior_of_song_keychip.exe" -ArgumentList "--auth $keychip_auth --applicationVHD $base --appDataVHD $data --optionVHD $option --update"
}
# Run Application
Start-Process -Wait -WindowStyle Normal -FilePath "C:\SEGA\system\savior_of_song_keychip.exe" -ArgumentList "--auth $keychip_auth --applicationVHD $base --appDataVHD $data --optionVHD $option --prepareScript prepare.ps1 --cleanupScript shutdown.ps1 --cleanupScript cleanup.ps1"