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

# 3. Convert dist/**/index.html to index.php for every pre-rendered ROUTE dir.
#
# The site ROOT is deliberately excluded. dist/index.php is the SEO router
# copied from public/index.php, and it serves unknown paths and 404s by
# reading its sibling dist/index.html (file_get_contents at the end of that
# file) and injecting per-route meta. Converting the root would overwrite the
# router with the homepage AND delete the file it reads, so every unknown
# path would soft-404 to the homepage or return HTTP 500.
$distRoot   = (Resolve-Path "dist").Path
$htmlFiles  = Get-ChildItem -Path "dist" -Recurse -Filter "index.html" | Where-Object {
    $_.DirectoryName -ne $distRoot
}
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
foreach ($htmlFile in $htmlFiles) {
    # Must read as UTF-8 explicitly — PowerShell 5.1's Get-Content default
    # (system ANSI codepage) mangles non-ASCII bytes (en-dashes, emoji),
    # which then get double-encoded back to UTF-8 on write. Write without a
    # BOM too: a leading BOM in the .php file is output before <?php, which
    # breaks setcookie() ("headers already sent").
    $htmlContent = Get-Content -Raw -Encoding UTF8 -Path $htmlFile.FullName
    $phpContent  = $phpHeader + "`n" + $htmlContent
    $phpPath     = Join-Path $htmlFile.DirectoryName "index.php"
    [System.IO.File]::WriteAllText($phpPath, $phpContent, $utf8NoBom)
    Remove-Item -Path $htmlFile.FullName -Force
    $relPath = $htmlFile.FullName -replace [regex]::Escape((Resolve-Path dist).Path), 'dist'
    Write-Host "  -> $relPath -> index.php" -ForegroundColor DarkGray
}

Write-Host "PHP injection complete ($($htmlFiles.Count) route files; root left as router + index.html)." -ForegroundColor Green

# 3b. The root is served by the SEO router, which never went through the loop
# above, so it still needs the geo-cookie header. Prepend it once, guarding
# against double-injection if this script is run twice over the same dist.
$rootRouter = "dist/index.php"
if (Test-Path $rootRouter) {
    $routerBody = Get-Content -Raw -Encoding UTF8 -Path $rootRouter
    if ($routerBody -notmatch "user_region") {
        [System.IO.File]::WriteAllText($rootRouter, $phpHeader + "`n" + $routerBody, $utf8NoBom)
        Write-Host "  -> dist/index.php (SEO router) geo-cookie header injected" -ForegroundColor DarkGray
    } else {
        Write-Host "  -> dist/index.php already carries the geo header, left alone" -ForegroundColor DarkGray
    }
    if (-not (Test-Path "dist/index.html")) {
        Write-Error "dist/index.html is missing - the SEO router has nothing to serve. Aborting."
        Exit 1
    }
} else {
    Write-Error "dist/index.php (SEO router) missing - is public/index.php still in place? Aborting."
    Exit 1
}

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
