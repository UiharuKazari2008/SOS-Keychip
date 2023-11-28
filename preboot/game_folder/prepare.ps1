# Do not just use this script, you must adapt this to your setup
# This is censored live example
. ./enviorment.ps1
$Mouse=@' 
[DllImport("user32.dll",CharSet=CharSet.Auto, CallingConvention=CallingConvention.StdCall)]
public static extern void mouse_event(long dwFlags, long dx, long dy, long cButtons, long dwExtraInfo);
'@ 
$SendMouseClick = Add-Type -memberDefinition $Mouse -name "Win32MouseEventNew" -namespace Win32Functions -passThru
Function Move-Mouse {

`	Param (
        [int]$X, [int]$y

    )

Process {

        Add-Type -AssemblyName System.Windows.Forms
        $screen = [System.Windows.Forms.SystemInformation]::VirtualScreen
        $screen | Get-Member -MemberType Property
        $screen.Width = $X
        $screen.Height = $y
        [Windows.Forms.Cursor]::Position = "$($screen.Width),$($screen.Height)"


    }
}

Start-Process -WindowStyle Hidden -FilePath "C:\Windows\system32\reg.exe" -ArgumentList "IMPORT Assign-COM4.reg" # Ensure Serial Port D is COM4
Start-Process -WindowStyle Hidden -FilePath "C:\Windows\System32\pnputil.exe" -ArgumentList '/restart-device "FTDIBUS\VID_0403+PID_6011+FT84KFWRD\0000"' # Restart Serial Port D
Get-Process -Name slidershim -ErrorAction SilentlyContinue | Stop-Process -ErrorAction Stop # Kill Slidershim (only used for Sequenzia ADS UI)
Get-Process | Where-Object {$_.MainWindowTitle -eq "Sequenzia - [InPrivate]"} | Stop-Process -ErrorAction SilentlyContinue # Close Sequenzia ADS
Stop-ScheduledTask -TaskName "StartHDMIAudio" -ErrorAction SilentlyContinue # Stop HDMI Audio Input (mono-to-stereo)
taskkill /F /IM explorer.exe | Out-Null # No more user mode
if ($(Get-Process -Name mono-to-stereo -ErrorAction SilentlyContinue).Count -gt 0) {
    Get-Process -Name mono-to-stereo -ErrorAction SilentlyContinue | Stop-Process -ErrorAction SilentlyContinue
}
Get-AudioDevice -List | Where-Object { $_.Type -eq "Playback" -and $_.Name -like "${audio_dev}" } | Set-AudioDevice -ErrorAction Stop | Out-Null # Set Audio Device (Requires Audio Cmdlets for PowerShell)
Get-PnpDevice -InstanceId 'USB\VID_0CA3&PID_0021\6&3A944CE5&0&2' -ErrorAction SilentlyContinue | Enable-PnpDevice -Confirm:$false -ErrorAction Stop # Ensure JVS USB Device is Enabled

Move-Mouse -X 1920 -y 0 | Out-Null #Push Mouse off screen in case it was in the display