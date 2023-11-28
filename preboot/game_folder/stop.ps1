Get-Process -Name inject_x86 -ErrorAction SilentlyContinue | Stop-Process -ErrorAction SilentlyContinue
Get-Process -Name inject_x64 -ErrorAction SilentlyContinue | Stop-Process -ErrorAction SilentlyContinue
Get-Process -Name gameexec -ErrorAction SilentlyContinue | Stop-Process -ErrorAction SilentlyContinue