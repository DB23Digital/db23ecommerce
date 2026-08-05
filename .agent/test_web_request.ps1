try {
    $resp = Invoke-WebRequest -Uri "https://db23.co.za" -Method Head -UseBasicParsing
    Write-Host "Success! Status Code: $($resp.StatusCode)"
} catch {
    Write-Host "Failed!"
    Write-Host "Error message: $($_.Exception.Message)"
    if ($_.Exception.InnerException) {
        Write-Host "Inner Exception: $($_.Exception.InnerException.Message)"
    }
}
