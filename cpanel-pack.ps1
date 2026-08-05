# DB23 eCommerce - Automated cPanel Build & Packaging Pipeline
# Runs SSG prerender (client build + SSR build + prerender), converts all
# index.html files to index.php with server-side geolocation cookie injection,
# removes the SSR bundle, then zips dist/ into build.zip.

Write-Host "Starting DB23 SSG Build Pipeline..." -ForegroundColor Cyan

# 1. Full SSG build (client + server bundle + prerender all routes)
npm run build:ssg
if ($LASTEXITCODE -ne 0) {
    Write-Error "SSG build failed! Aborting packaging."
    Exit 1
}

Write-Host "SSG build succeeded. Injecting PHP Geolocation Cookie Engine..." -ForegroundColor Green

# 2. PHP cookie dropper - single-quoted so $ signs are literal (no PowerShell expansion)
$phpHeader = @'
<?php
// DB23 eCommerce - Dynamic Regional Currency Detector (cPanel/Apache Edge Hybrid)
if (!isset($_COOKIE['user_region'])) {
    $country = 'US';
    if (isset($_SERVER['HTTP_CF_IPCOUNTRY'])) {
        $country = $_SERVER['HTTP_CF_IPCOUNTRY'];
    } else {
        if (function_exists('geoip_country_code_by_name')) {
            $ip = $_SERVER['REMOTE_ADDR'];
            $code = @geoip_country_code_by_name($ip);
            if ($code) {
                $country = $code;
            }
        } else {
            $country = 'ZA'; // Default South African Rand
        }
    }
    setcookie('user_region', $country, time() + (86400 * 30), "/");
    $_COOKIE['user_region'] = $country;
}
?>
'@

# 3. Convert ALL dist/**/index.html to index.php (root + every pre-rendered route dir)
$htmlFiles = Get-ChildItem -Path "dist" -Recurse -Filter "index.html"
foreach ($htmlFile in $htmlFiles) {
    $htmlContent = Get-Content -Raw -Path $htmlFile.FullName
    $phpContent  = $phpHeader + "`n" + $htmlContent
    $phpPath     = Join-Path $htmlFile.DirectoryName "index.php"
    Set-Content -Path $phpPath -Value $phpContent -Encoding UTF8
    Remove-Item -Path $htmlFile.FullName -Force
    $relPath = $htmlFile.FullName -replace [regex]::Escape((Resolve-Path dist).Path), 'dist'
    Write-Host "  -> $relPath -> index.php" -ForegroundColor DarkGray
}

Write-Host "PHP injection complete ($($htmlFiles.Count) files)." -ForegroundColor Green

# 4. Remove the SSR bundle - Node.js file, not needed on cPanel Apache
$ssrBundle = "dist/entry-server.js"
if (Test-Path $ssrBundle) {
    Remove-Item -Path $ssrBundle -Force
    Write-Host "Removed SSR bundle: $ssrBundle" -ForegroundColor DarkGray
}

# 5. Compress dist/ into build.zip
Write-Host "Generating build.zip deployable archive..." -ForegroundColor Cyan
if (Test-Path "build.zip") {
    Remove-Item -Path "build.zip" -Force
}
Compress-Archive -Path "dist\*" -DestinationPath "build.zip" -Force

Write-Host "SUCCESS! build.zip is ready for cPanel extraction." -ForegroundColor Green
