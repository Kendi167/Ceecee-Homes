require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const twilio = require('twilio');

// Twilio credentials from environment variables
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(cors());

// Endpoint to handle booking submission
app.post('/book', (req, res) => {
    const bookingData = req.body;

    // Extract the necessary information
    const { userName, userPhone, bnbName, checkinDate, checkoutDate, numPeople } = bookingData;

    // Format the SMS message
    const messageBody = `Hello ${userName}, your booking for ${bnbName} from ${checkinDate} to ${checkoutDate} for ${numPeople} people has been confirmed.`;

    // Send SMS using Twilio
    client.messages.create({
        body: messageBody,
        from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio phone number
        to: userPhone // User's phone number from the form
    })
    .then(message => {
        console.log(`SMS sent with SID: ${message.sid}`);
        res.json({ message: 'Booking confirmed and SMS sent successfully!' });
    })
    .catch(error => {
        console.error('Error sending SMS:', error);
        res.status(500).json({ message: 'An error occurred while sending the SMS.' });
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
