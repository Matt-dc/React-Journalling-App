const nodemailer = require('nodemailer');

const credentials = {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
}

const transporter = nodemailer.createTransport(credentials);

module.exports = async (to, content, token) => {

    const contacts = {
        from: process.env.MAIL_USER,
        to
    }

    const email = Object.assign({}, content, contacts, token)

    await transporter.sendMail(email)

    
}