<#
  generate_research_json.ps1
  Parse notebooklm_research_index.md -> data/research.json
  Run before push (or let GitHub Actions run it).
#>
[CmdletBinding()]
param(
  [string]$IndexPath = "$HOME\.claude\projects\C--Users-inuko--claude\memory\notebooklm_research_index.md",
  [string]$OutPath
)

$ErrorActionPreference = "Stop"

# Resolve script dir robustly ($PSScriptRoot is empty when invoked via a relative -File path in PS 5.1)
$scriptDir = $PSScriptRoot
if (-not $scriptDir) { $scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition }
if (-not $OutPath)   { $OutPath = Join-Path $scriptDir "..\data\research.json" }

if (-not (Test-Path $IndexPath)) {
  Write-Error "Index not found: $IndexPath"
  exit 1
}

$lines = Get-Content -LiteralPath $IndexPath -Encoding UTF8

$topics = New-Object System.Collections.Generic.List[object]
$cur = $null

# derive a coarse category from title + covers (priority order: first match wins)
function Get-Category {
  param([string]$text)
  $t = $text.ToLower()
  $rules = [ordered]@{
    "thai"       = 'thai|pdpa|ไทย|promptpay|slip'
    "finance"    = 'financ|trading|\bstock\b|equity|invoice|\bpayment\b|\btax\b|sec edgar|promptpay'
    "agents"     = 'agent|orchestrat|multi-agent|swarm|crew|autonomous|harness|recursive self'
    "claude"     = 'claude|anthropic|\bllm\b|prompt|token|gemini|gpt|model rout'
    "devtools"   = 'terminal|\bcli\b|rust|\bide\b|editor|vim|tmux|warp|tauri|notebooklm|obsidian'
    "knowledge"  = 'knowledge|research|vault|para|note|librarian|mytholog|philosoph|history'
    "governance" = 'governanc|safety|eval|validation|verif|quality gate|compliance|security'
  }
  foreach ($k in $rules.Keys) { if ($t -match $rules[$k]) { return $k } }
  return "other"
}

function Save-Cur {
  param($c, $list)
  if ($c -and $c.title) {
    $c.category = Get-Category ("$($c.title) $($c.covers)")
    $list.Add([pscustomobject]$c) | Out-Null
  }
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
      category    = "other"
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
