# Do not just use this script, you must adapt this to your setup
# This is censored live example

# Save Used AppData
$appdata_mode = "server"
if ($(Get-Content -Path "C:\SEGA\preboot_data\server" -ErrorAction SilentlyContinue) -ne 1) {
    $appdata_mode = "client"
}
Copy-Item "Y:\appdata\SDHD\appfile.dat" "Y:\templates\${appdata_mode}.appfile.dat" -Force -Confirm:$false