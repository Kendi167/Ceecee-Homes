<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = $_POST['name'];
    $idNumber = $_POST['idNumber'];
    $phoneNumber = $_POST['phoneNumber'];
    $email = $_POST['email'];
    $checkinDate = $_POST['checkinDate'];
    $checkoutDate = $_POST['checkoutDate'];
    $numPeople = $_POST['numPeople'];

    // Client email
    $toClient = $email;
    $subjectClient = "Reservation Confirmation - Ceecee Homes";
    $messageClient = "
        <html>
        <head>
            <title>Reservation Confirmation</title>
        </head>
        <body>
            <h1>Thank you for your reservation, $name!</h1>
            <p>Your reservation details are as follows:</p>
            <ul>
                <li>ID Number: $idNumber</li>
                <li>Phone Number: $phoneNumber</li>
                <li>Check-in Date: $checkinDate</li>
                <li>Check-out Date: $checkoutDate</li>
                <li>Number of People: $numPeople</li>
            </ul>
            <p>We look forward to hosting you!</p>
        </body>
        </html>
    ";
    $headersClient = "MIME-Version: 1.0" . "\r\n";
    $headersClient .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headersClient .= 'From: <reservations@ceeceehomes.com>' . "\r\n";

    // Send email to client
    mail($toClient, $subjectClient, $messageClient, $headersClient);

    // Email to Ceecee Homes
    $toCeecee = "reservations@ceeceehomes.com";
    $subjectCeecee = "New Reservation - $name";
    $messageCeecee = "
        <html>
        <head>
            <title>New Reservation</title>
        </head>
        <body>
            <h1>New reservation received from $name</h1>
            <p>Details are as follows:</p>
            <ul>
                <li>ID Number: $idNumber</li>
                <li>Phone Number: $phoneNumber</li>
                <li>Email: $email</li>
                <li>Check-in Date: $checkinDate</li>
                <li>Check-out Date: $checkoutDate</li>
                <li>Number of People: $numPeople</li>
            </ul>
        </body>
        </html>
    ";
    $headersCeecee = "MIME-Version: 1.0" . "\r\n";
    $headersCeecee .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headersCeecee .= 'From: <reservations@ceeceehomes.com>' . "\r\n";

    // Send email to Ceecee Homes
    mail($toCeecee, $subjectCeecee, $messageCeecee, $headersCeecee);

    // Redirect back to a thank you page or show a confirmation message
    echo "Reservation submitted successfully!";
} else {
    echo "Invalid request method.";
}
?>
