<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $idNumber = htmlspecialchars($_POST['idNumber']);
    $phoneNumber = htmlspecialchars($_POST['phoneNumber']);
    $email = htmlspecialchars($_POST['email']);
    $checkinDate = htmlspecialchars($_POST['checkinDate']);
    $checkoutDate = htmlspecialchars($_POST['checkoutDate']);
    $numPeople = htmlspecialchars($_POST['numPeople']);

    // Send email to the client (Ceecee Homes)
    $clientEmail = "beryll497@gmail.com"; // Replace with your email address
    $subject = "New Reservation Request";
    $message = "
    <html>
    <head>
        <title>New Reservation Request</title>
    </head>
    <body>
        <h2>New Reservation Details</h2>
        <p><strong>Name:</strong> $name</p>
        <p><strong>ID Number:</strong> $idNumber</p>
        <p><strong>Phone Number:</strong> $phoneNumber</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Check-in Date:</strong> $checkinDate</p>
        <p><strong>Check-out Date:</strong> $checkoutDate</p>
        <p><strong>Number of People:</strong> $numPeople</p>
    </body>
    </html>
    ";
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: theeron13@gmail.com" . "\r\n"; // Replace with your sender email

    mail($clientEmail, $subject, $message, $headers);

    // Send confirmation email to the user
    $userSubject = "Reservation Confirmation";
    $userMessage = "
    <html>
    <head>
        <title>Reservation Confirmation</title>
    </head>
    <body>
        <h2>Your Reservation Details</h2>
        <p>Thank you for choosing Ceecee Homes. Here are your reservation details:</p>
        <p><strong>Name:</strong> $name</p>
        <p><strong>ID Number:</strong> $idNumber</p>
        <p><strong>Phone Number:</strong> $phoneNumber</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Check-in Date:</strong> $checkinDate</p>
        <p><strong>Check-out Date:</strong> $checkoutDate</p>
        <p><strong>Number of People:</strong> $numPeople</p>
        <p>We look forward to hosting you!</p>
    </body>
    </html>
    ";

    mail($email, $userSubject, $userMessage, $headers);

    // Redirect to a thank you page or display a success message
    echo "<script>alert('Reservation submitted successfully!'); window.location.href = '/public/thank_you.html';</script>";
}
?>
