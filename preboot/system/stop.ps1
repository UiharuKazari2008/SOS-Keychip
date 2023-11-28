$version = $(Get-Content -Path "C:\SEGA\preboot_data\disk")
if ($version -gt 19) {
    cd S:\GAME_1\
} else {
    cd S:\GAME_0\
}
. .\stop.ps1