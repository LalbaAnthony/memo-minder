module.exports = (subject = '', text = '', to = '', from = process.env.BACK_EMAIL_FROM) => {
    if (!subject || !text || !to || !from) return;

    const nodemailer = require('nodemailer');

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.BACK_EMAIL_USER,
            pass: process.env.BACK_EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from,
        to,
        subject,
        text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            logConsole(`An error occurred: ${error}`, 'error');
            return false;
        } else {
            logFile('Email sent: ' + info.response, 'info');
            return true;
        }
    });
}