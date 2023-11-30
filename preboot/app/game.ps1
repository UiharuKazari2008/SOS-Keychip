$game_exec = ".exe"
$game_hook = ".dll"
$am_hook = ".dll"
$am_opts = ".json .json .json .json .json .json"

$appdata_mode = "server"
if ($(Get-Content -Path "C:\SEGA\preboot_data\server" -ErrorAction SilentlyContinue) -ne 1) {
    $appdata_mode = "client"
    Write-Host "Running in Client Mode"
} else {
    Write-Host "Running in Server Mode"
}
Copy-Item "Y:\templates\${appdata_mode}.appfile.dat" "Y:\appdata\SDHD\appfile.dat" -Force -Confirm:$false

Write-Host "############################"
cd X:\bin\
Get-Process -Name amdaemon -ErrorAction SilentlyContinue | Stop-Process -Force:$true -ErrorAction SilentlyContinue
Start-Process -WindowStyle Minimized -FilePath inject_x64.exe -ArgumentList "-d -k ${am_hook} amdaemon.exe -f -c ${am_opts}"
& .\inject_x86.exe -d -k ${game_hook} ${game_exec}
Write-Host ""
Write-Host "############################"
Write-Host " TERMINATED"
Write-Host "############################"
