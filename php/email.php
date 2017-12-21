<?php

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header("HTTP/1.0 404 Not Found");
    exit();
}
$email_name = $POST['email_name'];
$email_subject = $POST["email_subject"];
$email_from = $_POST['email_from'];
$email_content = $_POST['email_content'];
$email_to = "galy.benoit.64@gmail.com";

$headers = 'From: ' . $email_from . "\r\n" .
    'Reply-To: ' . $email_from . "\r\n" .
    'X-Mailer: PHP/' . phpversion();


if (@!mail($email_to, $email_subject, $email_name . ' vous a envoyé un email : ' . $email_content, $headers)) {
    header("HTTP/1.0 500 Error");
}

?>
