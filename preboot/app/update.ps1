$password = "$($args[0])"
Write-Host $password
if ((Get-Volume -FileSystemLabel SOS_INS -ErrorAction SilentlyContinue | Format-List).Length -gt 0) {
    $letter = (Get-Volume -FileSystemLabel SOS_INS).DriveLetter
    
    if (Test-Path -Path "${letter}:\{{ Format System }}") {
      Set-Content -Encoding utf8 -Value "システムストレージのフォーマット中..." -Path "C:\SEGA\system\preboot\preboot_Data\StreamingAssets\install.txt"
      Sleep -Seconds 1
      Get-ChildItem -Path X:\ -Force | Where-Object Name -NotIn @("game.ps1", "update.ps1") | Remove-Item -Force -Recurse -Confirm:$false
      Remove-Item -Force -Confirm:$false -Recurse -Path Y:\* -ErrorAction SilentlyContinue
      Remove-Item -Force -Confirm:$false -Recurse -Path Z:\* -ErrorAction SilentlyContinue

      New-Item -ItemType Directory -Path X:\bin
      New-Item -ItemType Directory -Path Y:\amfs
      New-Item -ItemType Directory -Path Y:\appdata
      New-Item -ItemType File -Path Y:\segatools.ini

      New-Item -ItemType SymbolicLink -Path X:\bin\segatools.ini -Value Y:\segatools.ini
      New-Item -ItemType Junction -Path X:\bin\amfs -Value Y:\amfs
      New-Item -ItemType Junction -Path X:\bin\appdata -Value Y:\appdata
      New-Item -ItemType Junction -Path X:\bin\option -Value Z:\
    } else {
      if (Test-Path -Path "${letter}:\{{ Format Sub }}") {
        Set-Content -Encoding utf8 -Value "補助ストレージのフォーマット..." -Path "C:\SEGA\system\preboot\preboot_Data\StreamingAssets\install.txt"
        Sleep -Seconds 1
        Remove-Item -Force -Confirm:$false -Recurse -Path Z:\* -ErrorAction SilentlyContinue
      }
      if (Test-Path -Path "${letter}:\{{ Format Data }}") {
        Set-Content -Encoding utf8 -Value "データベースのフォーマット中..." -Path "C:\SEGA\system\preboot\preboot_Data\StreamingAssets\install.txt"
        Sleep -Seconds 1
        Remove-Item -Force -Confirm:$false -Recurse -Path Y:\* -ErrorAction SilentlyContinue
        New-Item -ItemType Directory -Path Y:\amfs
        New-Item -ItemType Directory -Path Y:\appdata
        New-Item -ItemType File -Path Y:\segatools.ini
      }
    }

    if (Test-Path -Path "${letter}:\*.app") {
      Set-Content -Encoding utf8 -Value "ゲームプログラムのインストール... (0/$((Get-ChildItem -Path "${letter}:\*.app").Count))" -Path "C:\SEGA\system\preboot\preboot_Data\StreamingAssets\install.txt"
      Sleep -Seconds 5
      $i = 0
      Get-ChildItem -Path "${letter}:\*.app" | ForEach-Object {
        $i++
        Set-Content -Encoding utf8 -Value "ゲームプログラムのインストール... (${i}/$((Get-ChildItem -Path "${letter}:\*.app").Count))" -Path "C:\SEGA\system\preboot\preboot_Data\StreamingAssets\install.txt"
         &'C:\Program Files\7-Zip\7z.exe' x -aoa -p"${password}" -oX:\ "${_}"
      }
    }
    if (Test-Path -Path "${letter}:\*.opt") {
      $i = 0
      Set-Content -Encoding utf8 -Value "ゲームアップデートのインストール... (0/$((Get-ChildItem -Path "${letter}:\*.opt").Count))" -Path "C:\SEGA\system\preboot\preboot_Data\StreamingAssets\install.txt"
      Get-ChildItem -Path "${letter}:\*.opt" | ForEach-Object {
        $i++
        Set-Content -Encoding utf8 -Value "ゲームアップデートのインストール... (${i}/$((Get-ChildItem -Path "${letter}:\*.opt").Count))" -Path "C:\SEGA\system\preboot\preboot_Data\StreamingAssets\install.txt"
        Sleep -Seconds 5
        & 'C:\Program Files\7-Zip\7z.exe' x -aoa -p"${password}" -oZ:\ "${_}"
      }
    }
    if (Test-Path -Path "${letter}:\*.db") {
      $i = 0
      Set-Content -Encoding utf8 -Value "データベース更新のインストール... (0/$((Get-ChildItem -Path "${letter}:\*.db").Count))" -Path "C:\SEGA\system\preboot\preboot_Data\StreamingAssets\install.txt"
      Get-ChildItem -Path "${letter}:\*.db" | ForEach-Object {
        $i++
        Set-Content -Encoding utf8 -Value "データベース更新のインストール... (${i}/$((Get-ChildItem -Path "${letter}:\*.db").Count))" -Path "C:\SEGA\system\preboot\preboot_Data\StreamingAssets\install.txt"
        Sleep -Seconds 5
        & 'C:\Program Files\7-Zip\7z.exe' x -aoa -p"${password}" -oY:\ "${_}"
      }
    }
    Set-Content -Value " `n" -Path "C:\SEGA\system\preboot\preboot_Data\StreamingAssets\install.txt"
}