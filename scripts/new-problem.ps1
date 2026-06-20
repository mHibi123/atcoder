param(
    [Parameter(Mandatory = $true)]
    [string]$Contest,

    [Parameter(Mandatory = $true)]
    [string]$Problem,

    [string]$TaskLabel = "",
    [string]$TaskTitle = "",
    [string]$TaskUrl = ""
)

$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$contestId = $Contest.ToLower()
$problemId = $Problem.ToLower()
$contestDir = Join-Path $repoRoot "contests\$contestId"
$testsDir = Join-Path $contestDir "tests"
$problemFile = Join-Path $contestDir "$problemId.ts"
$testInputFile = Join-Path $testsDir "$problemId.in"
$templateFile = Join-Path $repoRoot "template.ts"

if (-not (Test-Path $templateFile)) {
    throw "template.ts not found at $templateFile"
}

if (Test-Path $problemFile) {
    throw "Problem file already exists: $problemFile"
}

if ($TaskLabel -eq "") {
    $TaskLabel = $problemId.ToUpper()
}

if ($TaskUrl -eq "") {
    $TaskUrl = "https://atcoder.jp/contests/$contestId/tasks/$contestId`_$problemId"
}

New-Item -ItemType Directory -Path $testsDir -Force | Out-Null

$content = Get-Content -Path $templateFile -Raw -Encoding UTF8
$content = $content.Replace('${CONTEST_ID}', $contestId)
$content = $content.Replace('${TASK_LABEL}', $TaskLabel)
$content = $content.Replace('${TASK_TITLE}', $TaskTitle)
$content = $content.Replace('${TASK_URL}', $TaskUrl)
$content = $content.Replace(
    'Get-Content input.txt | bun run atcoderTemplate.ts',
    "Get-Content contests/$contestId/tests/$problemId.in | bun run contests/$contestId/$problemId.ts"
)

Set-Content -Path $problemFile -Value $content -Encoding UTF8 -NoNewline
New-Item -ItemType File -Path $testInputFile -Force | Out-Null

Write-Host "Created:"
Write-Host "  $problemFile"
Write-Host "  $testInputFile"
