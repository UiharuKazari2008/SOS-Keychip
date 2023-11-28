Get-Process | Where-Object {$_.MainWindowTitle -eq "Sequenzia - [InPrivate]"} | Stop-Process -ErrorAction SilentlyContinue
Stop-Process -Name allsbootsimulator -ErrorAction SilentlyContinue
$version = $(Get-Content -Path "C:\SEGA\preboot_data\disk")
if ($version -gt 19) {
    cd S:\GAME_1\
} else {
    cd S:\GAME_0\
}
. .\start.ps1