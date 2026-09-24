# Quick sync script for OmniTask App
$git = "C:\Users\aswin\AppData\Local\Programs\Git\cmd\git.exe"

$msg = if ($args[0]) { $args[0] } else { "Update workspace: $(Get-Date -Format 'yyyy-MM-dd HH:mm')" }

& $git add -A
& $git commit -m "$msg"
& $git push origin main

Write-Host "Changes successfully pushed to https://github.com/aswin1237/task-manager-app-beta" -ForegroundColor Green
