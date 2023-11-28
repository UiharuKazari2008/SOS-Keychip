if ((Get-Volume -FileSystemLabel SOS_INS -ErrorAction SilentlyContinue | Format-List).Length -gt 0) {
    $letter = (Get-Volume -FileSystemLabel SOS_INS).DriveLetter
    Get-ChildItem -Path "${letter}:\*.7z" | ForEach-Object {
        & 'C:\Program Files\7-Zip\7z.exe' x -aoa -oZ:\ "${_}"
    }
    Write-Host "Update Complete!"
}