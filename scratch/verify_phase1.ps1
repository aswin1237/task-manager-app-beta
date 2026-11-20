# Quick Phase 1 fix verification
$file = 'c:\Users\aswin\OneDrive\Desktop\uiux app\index.html'
$c = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8)

$checks = @{
  'SOS no alert() call'                   = -not ($c.Contains('alert("🚨 HIGH PRIORITY') -or $c.Contains('alert("EMERGENCY BROADCAST'))
  'SOS uses real sms: protocol'           = $c.Contains('sms:')
  'SOS markIAmSafe() function exists'     = $c.Contains('function markIAmSafe()')
  'SOS buttons split (I Am Safe / Close)' = (-not $c.Contains('I Am Safe / Close')) -and $c.Contains('markIAmSafe()')
  'landPass no pre-filled dots'           = -not ($c -match 'id=.landPass.[^>]*value=.[^"]*•')
  'hashSecret WebCrypto defined'          = $c.Contains('crypto.subtle.digest')
  'verifySecret async defined'            = $c.Contains('async function verifySecret')
  'enterDashboard is async'              = $c.Contains('async function enterDashboard')
  'csvCell() injection guard defined'     = $c.Contains('function csvCell(')
  'CSV export uses csvCell()'             = $c.Contains('csvCell(e.name)')
  'escapeHTML still present'              = $c.Contains('function escapeHTML(')
}

$pass = 0; $fail = 0
foreach ($k in ($checks.Keys | Sort-Object)) {
  $v = $checks[$k]
  $status = if ($v) { 'PASS ✅' } else { 'FAIL ❌' }
  if ($v) { $pass++ } else { $fail++ }
  Write-Host "$status  $k"
}
Write-Host ""
Write-Host "Results: $pass PASS / $fail FAIL"

# Tag balance
$opens  = ([regex]::Matches($c, '<(?!/)(?!!--)[a-zA-Z]')).Count
$closes = ([regex]::Matches($c, '</[a-zA-Z]')).Count
Write-Host "HTML Tag balance: $opens opens / $closes closes (diff = $($opens - $closes))"

# File size
$bytes = (Get-Item $file).Length
Write-Host "File size: $([math]::Round($bytes/1024))KB"
