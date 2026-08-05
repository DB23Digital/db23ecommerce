$tc = New-Object System.Net.Sockets.TcpClient("db23.co.za", 443)
$callback = {
    param($sender, $certificate, $chain, $sslPolicyErrors)
    $global:chainElementsCount = $chain.ChainElements.Count
    $global:chainElements = @()
    foreach ($element in $chain.ChainElements) {
        $global:chainElements += [PSCustomObject]@{
            Subject = $element.Certificate.Subject
            Issuer = $element.Certificate.Issuer
            Thumbprint = $element.Certificate.Thumbprint
        }
    }
    return $true
}
$stream = New-Object System.Net.Security.SslStream($tc.GetStream(), $false, $callback)
try {
    $stream.AuthenticateAsClient("db23.co.za")
    Write-Host "Chain elements count: $global:chainElementsCount"
    $global:chainElements | Format-Table -AutoSize
} catch {
    Write-Error $_.Exception.Message
} finally {
    $stream.Close()
    $tc.Close()
}
