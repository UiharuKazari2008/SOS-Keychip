# Do not just use this script, you must adapt this to your setup
# This is censored live example

if ((Get-Process -Name explorer).Length -eq 0) { & explorer.exe } # Start Explorer
Get-PnpDevice -InstanceId 'USB\VID_0CA3&PID_0021\6&3A944CE5&0&2' -ErrorAction SilentlyContinue | Disable-PnpDevice -Confirm:$false -ErrorAction Stop # Disable JVS USB Device (Its very noisey)
Get-AudioDevice -List | Where-Object { $_.Type -eq "Playback" -and $_.Name -like "VoiceMeeter Aux Input*" } | Set-AudioDevice | Out-Null # Return Audio Output
