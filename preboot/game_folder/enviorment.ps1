. C:\SEGA\system\secure.ps1 # Chnage to GAMEID.ps1 if you have multiple games with diff IDs

$game_folder = "S:\${game_id}"
$version = $(Get-Content -Path "C:\SEGA\preboot_data\disk") # Version Select File (sequenzia-kiosk-bridge)
$multiplayer = $($(Get-Content -Path "${game_folder}\preboot_data\multiplayer") -eq 1)
$audio_dev = "Multichannel Output*" # Set to exculsive audio device name

# If you dont need multi edition (same ID) remove this and replace {install} with {game_folder}
if ($version -eq 10) {
  $install = "${game_folder}\V10"
} elseif ($version -eq 11) {
  $install = "${game_folder}\NEW_V11"
}

$base = "${install}\app.vhd"
$data = "${install}\appdata.vhd"
$option = "${install}\option.vhd"