$password = "$($args[0])"
Write-Host $password
if ((Get-Volume -FileSystemLabel SOS_INS -ErrorAction SilentlyContinue | Format-List).Length -gt 0) {
    # Detect USB Drive
    $letter = (Get-Volume -FileSystemLabel SOS_INS).DriveLetter
    
    # Format
    if (Test-Path -Path "${letter}:\{{ Format System }}") {
      # Full System Format
      Set-Content -Encoding utf8 -Value "システムストレージの総消去..." -Path "C:\SEGA\system\preboot\preboot_Data\StreamingAssets\install.txt"
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
      # Erase Application
      if (Test-Path -Path "${letter}:\{{ Format App }}") {
        Set-Content -Encoding utf8 -Value "メインストレージを消去する..." -Path "C:\SEGA\system\preboot\preboot_Data\StreamingAssets\install.txt"
        Sleep -Seconds 1
        Remove-Item -Force -Confirm:$false -Recurse -Path Z:\* -ErrorAction SilentlyContinue

        New-Item -ItemType Directory -Path X:\bin

        New-Item -ItemType SymbolicLink -Path X:\bin\segatools.ini -Value Y:\segatools.ini
        New-Item -ItemType Junction -Path X:\bin\amfs -Value Y:\amfs
        New-Item -ItemType Junction -Path X:\bin\appdata -Value Y:\appdata
        New-Item -ItemType Junction -Path X:\bin\option -Value Z:\
      }
      # Erase Sub Storage
      if (Test-Path -Path "${letter}:\{{ Format Sub }}") {
        Set-Content -Encoding utf8 -Value "補助ストレージの消去..." -Path "C:\SEGA\system\preboot\preboot_Data\StreamingAssets\install.txt"
        Sleep -Seconds 1
        Remove-Item -Force -Confirm:$false -Recurse -Path Z:\* -ErrorAction SilentlyContinue
      }
      # Erase Database
      if (Test-Path -Path "${letter}:\{{ Format Data }}") {
        Set-Content -Encoding utf8 -Value "データベースの消去..." -Path "C:\SEGA\system\preboot\preboot_Data\StreamingAssets\install.txt"
        Sleep -Seconds 1
        Remove-Item -Force -Confirm:$false -Recurse -Path Y:\* -ErrorAction SilentlyContinue

        New-Item -ItemType Directory -Path Y:\amfs
        New-Item -ItemType Directory -Path Y:\appdata
        New-Item -ItemType File -Path Y:\segatools.ini
      }
    }

    # Platform Update Pack
    if (Test-Path -Path "${letter}:\SYSTEM_*.pack") {
      Set-Content -Encoding utf8 -Value "システムアップデートのインストール... (0/$((Get-ChildItem -Path "${letter}:\SYSTEM_*.pack").Count))" -Path "C:\SEGA\system\preboot\preboot_Data\StreamingAssets\install.txt"
      Sleep -Seconds 1
      $i = 0
      if (Test-Path -Path "C:\SEGA\update\") {
        Remove-Item -Path "C:\SEGA\update\*" -Force -Recurse -Confirm:$false
      } else {
        New-Item -ItemType Directory -Path "C:\SEGA\update" -Force -Confirm:$false
      }
      Get-ChildItem -Path "${letter}:\SYSTEM_*.pack" | ForEach-Object {
        $i++
        Set-Content -Encoding utf8 -Value "システムアップデートのインストール... (${i}/$((Get-ChildItem -Path "${letter}:\SYSTEM_*.pack").Count))" -Path "C:\SEGA\system\preboot\preboot_Data\StreamingAssets\install.txt"
        &'C:\Program Files\7-Zip\7z.exe' x -aoa -p"${password}" -oC:\SEGA\update "${_}"
        if (Test-Path -Path "C:\SEGA\update\post_update.ps1" -ErrorAction SilentlyContinue) {
          . C:\SEGA\update\post_update.ps1
        }
        if (Test-Path -Path "C:\SEGA\update\system_update.ps1" -ErrorAction SilentlyContinue) {
          Set-Content -Encoding utf8 -Value "システムの再起動が必要です!" -Path "C:\SEGA\system\preboot\preboot_Data\StreamingAssets\install.txt"
          Sleep -Seconds 15
        }

      }
    }
    # Game Program
    if (Test-Path -Path "${letter}:\*.app") {
      Set-Content -Encoding utf8 -Value "ゲームプログラムのインストール... (0/$((Get-ChildItem -Path "${letter}:\*.app").Count))" -Path "C:\SEGA\system\preboot\preboot_Data\StreamingAssets\install.txt"
      Sleep -Seconds 1
      $i = 0
      Get-ChildItem -Path "${letter}:\*.app" | ForEach-Object {
        $i++
        Set-Content -Encoding utf8 -Value "ゲームプログラムのインストール... (${i}/$((Get-ChildItem -Path "${letter}:\*.app").Count))" -Path "C:\SEGA\system\preboot\preboot_Data\StreamingAssets\install.txt"
        &'C:\Program Files\7-Zip\7z.exe' x -aoa -p"${password}" -oX:\ "${_}"
        if (Test-Path -Path "X:\post_update.ps1" -ErrorAction SilentlyContinue) {
          . X:\post_update.ps1
        }
      }
    }
    # Option Update
    if (Test-Path -Path "${letter}:\*.opt") {
      $i = 0
      Set-Content -Encoding utf8 -Value "ゲームアップデートのインストール... (0/$((Get-ChildItem -Path "${letter}:\*.opt").Count))" -Path "C:\SEGA\system\preboot\preboot_Data\StreamingAssets\install.txt"
      Get-ChildItem -Path "${letter}:\*.opt" | ForEach-Object {
        $i++
        Set-Content -Encoding utf8 -Value "ゲームアップデートのインストール... (${i}/$((Get-ChildItem -Path "${letter}:\*.opt").Count))" -Path "C:\SEGA\system\preboot\preboot_Data\StreamingAssets\install.txt"
        Sleep -Seconds 1
        & 'C:\Program Files\7-Zip\7z.exe' x -aoa -p"${password}" -oZ:\ "${_}"
        if (Test-Path -Path "Z:\post_update.ps1" -ErrorAction SilentlyContinue) {
          . Z:\post_update.ps1
        }
      }
    }
    # Database Update
    if (Test-Path -Path "${letter}:\*.db") {
      $i = 0
      Set-Content -Encoding utf8 -Value "データベース更新のインストール... (0/$((Get-ChildItem -Path "${letter}:\*.db").Count))" -Path "C:\SEGA\system\preboot\preboot_Data\StreamingAssets\install.txt"
      Get-ChildItem -Path "${letter}:\*.db" | ForEach-Object {
        $i++
        Set-Content -Encoding utf8 -Value "データベース更新のインストール... (${i}/$((Get-ChildItem -Path "${letter}:\*.db").Count))" -Path "C:\SEGA\system\preboot\preboot_Data\StreamingAssets\install.txt"
        Sleep -Seconds 1
        & 'C:\Program Files\7-Zip\7z.exe' x -aoa -p"${password}" -oY:\ "${_}"
        if (Test-Path -Path "Y:\post_update.ps1" -ErrorAction SilentlyContinue) {
          . Y:\post_update.ps1
        }
      }
    }
    # Wait for USB Removal
    Set-Content -Value "続行するにはアップデートUSBを削除します!" -Path "C:\SEGA\system\preboot\preboot_Data\StreamingAssets\install.txt"
    While ((Get-Volume -FileSystemLabel SOS_INS -ErrorAction SilentlyContinue | Format-List).Length -gt 0) {
        Sleep -Seconds 1
    }
    Set-Content -Value " `n" -Path "C:\SEGA\system\preboot\preboot_Data\StreamingAssets\install.txt"
} else {
    if (Test-Path -Path "X:\download.ps1" -ErrorAction SilentlyContinue) {
        . X:\download.ps1 "${password}"
    }
}