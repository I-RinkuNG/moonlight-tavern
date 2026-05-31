<#
  generate_research_json.ps1
  Parse notebooklm_research_index.md -> data/research.json
  Run before push (or let GitHub Actions run it).
#>
[CmdletBinding()]
param(
  [string]$IndexPath = "$HOME\.claude\projects\C--Users-inuko--claude\memory\notebooklm_research_index.md",
  [string]$OutPath   = (Join-Path $PSScriptRoot "..\data\research.json")
)

$ErrorActionPreference = "Stop"

if (-not (Test-Path $IndexPath)) {
  Write-Error "Index not found: $IndexPath"
  exit 1
}

$lines = Get-Content -LiteralPath $IndexPath -Encoding UTF8

$topics = New-Object System.Collections.Generic.List[object]
$cur = $null

function Save-Cur {
  param($c, $list)
  if ($c -and $c.title) { $list.Add([pscustomobject]$c) | Out-Null }
}

foreach ($line in $lines) {
  # section header: "## Title"  (but not "# Title" or "### ...")
  if ($line -match '^##\s+(?!#)(.+?)\s*$') {
    Save-Cur $cur $topics
    $cur = @{
      title       = $Matches[1].Trim()
      notebook_id = ""
      sources     = ""
      tier        = ""
      extracted   = ""
      covers      = ""
    }
    continue
  }
  if (-not $cur) { continue }

  if     ($line -match '^\-\s+\*\*Notebook ID:\*\*\s*`?([0-9a-fA-F\-]+)`?') { $cur.notebook_id = $Matches[1].Trim() }
  elseif ($line -match '^\-\s+\*\*Sources:\*\*\s*(\d+)')                    { $cur.sources     = $Matches[1] }
  elseif ($line -match '^\-\s+\*\*Tier:\*\*\s*(.+?)\s*$')                   { $cur.tier        = $Matches[1].Trim() }
  elseif ($line -match '^\-\s+\*\*Extracted:\*\*\s*(.+?)\s*$')              { $cur.extracted   = $Matches[1].Trim() }
  elseif ($line -match '^\-\s+\*\*Covers:\*\*\s*(.+?)\s*$')                 { $cur.covers      = $Matches[1].Trim() }
}
Save-Cur $cur $topics

# drop pure section headers (no id, no covers, no sources); sort newest first
$out = $topics |
  Where-Object { $_.notebook_id -or $_.covers -or $_.sources } |
  Sort-Object -Property extracted -Descending

$dir = Split-Path -Parent $OutPath
if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }

# ConvertTo-Json wraps single item in object; force array
$json = $out | ConvertTo-Json -Depth 4
if ($out.Count -eq 1) { $json = "[$json]" }

# write UTF8 without BOM for clean web serving
$utf8 = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText((Resolve-Path -LiteralPath $dir).Path + "\" + (Split-Path -Leaf $OutPath), $json, $utf8)

Write-Host "Wrote $($out.Count) topics -> $OutPath"
