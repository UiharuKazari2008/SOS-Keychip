. .\enviorment.ps1
Start-Process -Wait -WindowStyle Normal -FilePath "C:\SEGA\system\savior_of_song_keychip.exe" -ArgumentList "--auth $keychip_auth --applicationVHD $base --appDataVHD $data --optionVHD $option --editMode"
Read-Host "Press key to dismount"
Start-Process -Wait -WindowStyle Normal -FilePath "C:\SEGA\system\savior_of_song_keychip.exe" -ArgumentList "--auth $keychip_auth --applicationVHD $base --appDataVHD $data --optionVHD $option --shutdown"