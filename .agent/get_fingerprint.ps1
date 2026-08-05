$tc = New-Object System.Net.Sockets.TcpClient("db23.co.za", 443)
$callback = {
    param($sender, $certificate, $chain, $sslPolicyErrors)
    $global:certBytes = $certificate.Export([System.Security.Cryptography.X509Certificates.X509ContentType]::Cert)
    return $true
}
$stream = New-Object System.Net.Security.SslStream($tc.GetStream(), $false, $callback)
try {
    $stream.AuthenticateAsClient("db23.co.za")
    $hasher = [System.Security.Cryptography.HashAlgorithm]::Create("SHA256")
    $hashBytes = $hasher.ComputeHash($global:certBytes)
    $hashStr = ($hashBytes | ForEach-Object { $_.ToString("x2") }) -join ""
    Write-Host "Server Certificate SHA256 Fingerprint: $hashStr"
} catch {
    Write-Error $_.Exception.Message
} finally {
    $stream.Close()
    $tc.Close()
}
