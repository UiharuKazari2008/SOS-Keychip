# System Folder
The system folder should be located in `C:\SEGA\system` and contain the following files:<br>
```
savior_of_song_keychip.exe
secure.ps1
init_start.ps1
stop.ps1
reset.ps1
```
* If you have multiple game IDs you will rename secure to the game ID and update the environment file in each game volume to reference the game ID .ps1 

## secure.ps1 or GAMEID.ps1
This is placed inside the system folder because it should be protected by BitLocker
```powershell
$game_id = "XXXX"
$keychip_auth = "AUTH_STRING"
```
## init_start.ps1
This is what is called to start the keychip boot proccess and select the game ID that will be started (edition/version selection occurs in the start.ps1 of the game)
## stop.ps1
This is called to stop the active game that is running
## reset.ps1
This is called when the selected game is changed or to restart the application
