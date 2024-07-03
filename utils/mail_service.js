const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport(
    {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: "gceksmartcampus@gmail.com",
            pass: process.env.email_pass
        }
    }
);

const sendMailWithOtp = async(email, otp) => {
    try {
        const sendMail = await transporter.sendMail(
            {
                from: "Nandan's Movie App <gceksmartcampus@gmail.com>",
                to: email,
                subject: "OTP for Nandan's Movie App",
                html: `
                <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nandan's Movie App OTP</title>
</head>
<body>
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2>Welcome to Nandan's Movie App</h2>
        <p>Hello,</p>
        <p>You are receiving this email because you are trying to log in to Nandan's Movie App. Please use the following OTP to proceed:</p>
        <h1 style="font-size: 2em; text-align: center; padding: 20px 0;">${otp}</h1>
        <p>If you didn't request this OTP, please ignore this email.</p>
        <p>Thank you for using Nandan's Movie App!</p>
        <p>Best regards,<br>Nandan's Movie App Team</p>
    </div>
</body>
</html>
`
            }
        ).then(() => {
            console.log("Email with OTP sent");
            return "success";
        })
        .catch((error) => {
            console.error(error);
            return error.message;
        });
    } catch (error) {
        console.error(error);
        return error.message;
    }
}

module.exports = {
    sendMailWithOtp
}