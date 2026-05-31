<#
  install-hooks.ps1
  Copy repo hooks/ into .git/hooks so research.json auto-regenerates on commit.
  Run once after cloning:  pwsh ./scripts/install-hooks.ps1
#>
$ErrorActionPreference = "Stop"
$repo  = Split-Path -Parent $PSScriptRoot
$src   = Join-Path $repo "hooks\pre-commit"
$dstDir = Join-Path $repo ".git\hooks"
$dst   = Join-Path $dstDir "pre-commit"

if (-not (Test-Path $dstDir)) { Write-Error "Not a git repo (.git/hooks missing)"; exit 1 }
Copy-Item -LiteralPath $src -Destination $dst -Force
Write-Host "Installed pre-commit hook -> $dst"
