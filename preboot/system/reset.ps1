if ((Get-Process -Name gameexec -ErrorAction SilentlyContinue).length -gt 0 -or (Get-Process -Name othergameexec -ErrorAction SilentlyContinue).length -gt 0) {
    Get-Process -Name inject_x86 -ErrorAction SilentlyContinue | Stop-Process -ErrorAction SilentlyContinue
    Get-Process -Name inject_x64 -ErrorAction SilentlyContinue | Stop-Process -ErrorAction SilentlyContinue
    Get-Process -Name inject -ErrorAction SilentlyContinue | Stop-Process -ErrorAction SilentlyContinue
    Get-Process -Name gameexec -ErrorAction SilentlyContinue | Stop-Process -ErrorAction SilentlyContinue
    Get-Process -Name othergameexec -ErrorAction SilentlyContinue | Stop-Process -ErrorAction SilentlyContinue
    while ((Get-Process -Name savior_of_song_keychip -ErrorAction SilentlyContinue).Length -gt 0) {
        Sleep -Seconds 1
    }
    Start-ScheduledTask -TaskName "StartALLSRuntime"
}