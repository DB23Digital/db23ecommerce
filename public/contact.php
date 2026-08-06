<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'message' => 'Method not allowed.']);
    exit;
}

// Credentials read from the server's PHP environment — set these in
// cPanel (Setup Node.js App / MultiPHP INI Editor / domain env vars),
// never hardcode them here. See DB23_SMTP_PASSWORD.
$smtpHost = getenv('DB23_SMTP_HOST') ?: 'mail.db23.co.za';
$smtpPort = (int) (getenv('DB23_SMTP_PORT') ?: 465);
$smtpUsername = getenv('DB23_SMTP_USERNAME') ?: 'deon@db23.co.za';
$smtpPassword = getenv('DB23_SMTP_PASSWORD') ?: '';
$toEmail = getenv('DB23_SMTP_TO_EMAIL') ?: 'deon@db23.co.za';
$toName = 'DB23';

function json_response($statusCode, $payload)
{
    http_response_code($statusCode);
    echo json_encode($payload);
    exit;
}

function clean_text($value, $maxLength = 2000)
{
    $value = trim((string) $value);
    $value = str_replace(["\r", "\0"], '', $value);
    return substr($value, 0, $maxLength);
}

function smtp_expect($socket, $expectedCodes)
{
    $response = '';

    while (($line = fgets($socket, 515)) !== false) {
        $response .= $line;
        if (strlen($line) >= 4 && $line[3] === ' ') {
            break;
        }
    }

    $code = (int) substr($response, 0, 3);
    if (!in_array($code, (array) $expectedCodes, true)) {
        throw new Exception('SMTP error: ' . trim($response));
    }

    return $response;
}

function smtp_command($socket, $command, $expectedCodes)
{
    fwrite($socket, $command . "\r\n");
    return smtp_expect($socket, $expectedCodes);
}

function smtp_send_mail($host, $port, $username, $password, $from, $to, $message)
{
    $socket = fsockopen('ssl://' . $host, $port, $errno, $errstr, 20);

    if (!$socket) {
        throw new Exception("Could not connect to SMTP server: $errstr ($errno)");
    }

    stream_set_timeout($socket, 20);

    try {
        smtp_expect($socket, 220);
        smtp_command($socket, 'EHLO ' . ($_SERVER['SERVER_NAME'] ?? 'db23.co.za'), 250);
        smtp_command($socket, 'AUTH LOGIN', 334);
        smtp_command($socket, base64_encode($username), 334);
        smtp_command($socket, base64_encode($password), 235);
        smtp_command($socket, 'MAIL FROM:<' . $from . '>', 250);
        smtp_command($socket, 'RCPT TO:<' . $to . '>', [250, 251]);
        smtp_command($socket, 'DATA', 354);
        fwrite($socket, $message . "\r\n.\r\n");
        smtp_expect($socket, 250);
        smtp_command($socket, 'QUIT', 221);
    } finally {
        fclose($socket);
    }
}

$name = clean_text($_POST['name'] ?? '', 120);
$email = clean_text($_POST['email'] ?? '', 180);
$message = clean_text($_POST['message'] ?? '', 4000);
$selectedSubject = clean_text($_POST['subject'] ?? 'Website Contact Form', 120);

$allowedSubjects = [
    'AI Workshop',
    'Introductory Business AI Workshop',
    'Practical AI for Teams',
    'AI Business Modernization Session',
    'Start a Project',
    'Essential Setup',
    'Growth Engine',
    'AI Operations',
    'Discovery Call',
    'Website Contact Form',
];

if (!in_array($selectedSubject, $allowedSubjects, true)) {
    $selectedSubject = 'Website Contact Form';
}

if ($smtpPassword === '') {
    json_response(500, ['ok' => false, 'message' => 'SMTP password has not been configured.']);
}

if ($name === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    json_response(422, ['ok' => false, 'message' => 'Please complete all required fields.']);
}

$subject = 'DB23 Website Enquiry - ' . $selectedSubject;
$date = date('Y-m-d H:i:s T');
$body = "New contact form submission from db23.co.za\n\n"
    . "Selected option: $selectedSubject\n"
    . "Name: $name\n"
    . "Email: $email\n"
    . "Submitted: $date\n\n"
    . "Message:\n$message\n";

$encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
$headers = [
    'From: DB23 Website <' . $smtpUsername . '>',
    'To: ' . $toName . ' <' . $toEmail . '>',
    'Reply-To: ' . $name . ' <' . $email . '>',
    'Subject: ' . $encodedSubject,
    'Date: ' . date(DATE_RFC2822),
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
];

$rawEmail = implode("\r\n", $headers) . "\r\n\r\n" . $body;

try {
    smtp_send_mail($smtpHost, $smtpPort, $smtpUsername, $smtpPassword, $smtpUsername, $toEmail, $rawEmail);
    json_response(200, ['ok' => true, 'message' => 'Message sent successfully.']);
} catch (Throwable $error) {
    json_response(500, ['ok' => false, 'message' => 'Sorry, the message could not be sent right now.']);
}
