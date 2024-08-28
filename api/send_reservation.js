const nodemailer = require('nodemailer');

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, idNumber, phoneNumber, email, checkinDate, checkoutDate, numPeople } = req.body;

        // Set up the transporter for sending emails
        let transporter = nodemailer.createTransport({
            service: 'Gmail', // or any email service you use
            auth: {
                user: process.env.EMAIL_USER, // Your email
                pass: process.env.EMAIL_PASS, // Your email password or app password
            },
        });

        // Email to the client
        let mailOptionsClient = {
            from: 'reservations@ceeceehomes.com',
            to: email,
            subject: 'Reservation Confirmation - Ceecee Homes',
            html: `<h1>Thank you for your reservation, ${name}!</h1>
                   <p>Your reservation details are as follows:</p>
                   <ul>
                       <li>ID Number: ${idNumber}</li>
                       <li>Phone Number: ${phoneNumber}</li>
                       <li>Check-in Date: ${checkinDate}</li>
                       <li>Check-out Date: ${checkoutDate}</li>
                       <li>Number of People: ${numPeople}</li>
                   </ul>
                   <p>We look forward to hosting you!</p>`,
        };

        // Email to Ceecee Homes
        let mailOptionsCeecee = {
            from: 'reservations@ceeceehomes.com',
            to: 'reservations@ceeceehomes.com',
            subject: `New Reservation - ${name}`,
            html: `<h1>New reservation received from ${name}</h1>
                   <p>Details are as follows:</p>
                   <ul>
                       <li>ID Number: ${idNumber}</li>
                       <li>Phone Number: ${phoneNumber}</li>
                       <li>Email: ${email}</li>
                       <li>Check-in Date: ${checkinDate}</li>
                       <li>Check-out Date: ${checkoutDate}</li>
                       <li>Number of People: ${numPeople}</li>
                   </ul>`,
        };

        try {
            // Send the emails
            await transporter.sendMail(mailOptionsClient);
            await transporter.sendMail(mailOptionsCeecee);
            res.status(200).json({ message: 'Reservation submitted successfully!' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to send reservation email.' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
