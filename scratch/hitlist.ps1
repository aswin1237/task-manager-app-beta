$file = 'c:\Users\aswin\OneDrive\Desktop\uiux app\index.html'
$c = [System.IO.File]::ReadAllLines($file)
$results = New-Object System.Collections.Generic.List[string]
$idx = 0
foreach ($line in $c) {
    $idx++
    if ($line -match 'broadcastSosEmergency|I Am Safe|closeSosModal|landPass|securityConfig|masterPin|setMode|exportCsv|escapeHtml') {
        $results.Add("$idx`: $line")
    }
}
[System.IO.File]::WriteAllLines('c:\Users\aswin\OneDrive\Desktop\uiux app\scratch\hitlist.txt', $results)
Write-Host "Total hits: $($results.Count)"
