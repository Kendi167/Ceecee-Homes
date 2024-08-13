require('dotenv').config();

const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cors());



// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'Gmail', // You can use any email service
    auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS  // Your email password
    }
});

// Endpoint to handle booking and send emails
app.post('/book', (req, res) => {
    const { userName, userEmail, bnbName, checkinDate, checkoutDate } = req.body;

    // Email content for the user
    const userMailOptions = {
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: 'Booking Confirmation',
        text: `Dear ${userName},\n\nThank you for booking ${bnbName} from ${checkinDate} to ${checkoutDate}.\n\nWe look forward to hosting you!\n\nBest regards,\nYour B&B Team`
    };

    // Email content for the client (you)
    const clientMailOptions = {
        from: process.env.EMAIL_USER,
        to: 'lindakendi167@gmail.com',
        subject: 'New Booking Received',
        text: `New booking received:\n\nGuest: ${userName}\nEmail: ${userEmail}\nB&B: ${bnbName}\nCheck-in: ${checkinDate}\nCheck-out: ${checkoutDate}`
    };

    // Send email to user
    transporter.sendMail(userMailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ error: 'Error sending email to user' });
        }
        console.log('User email sent: ' + info.response);

        // Send email to client (you)
        transporter.sendMail(clientMailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ error: 'Error sending email to client' });
            }
            console.log('Client email sent: ' + info.response);

            // Respond to the frontend
            res.status(200).json({ message: 'Booking confirmed, emails sent.' });
        });
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
