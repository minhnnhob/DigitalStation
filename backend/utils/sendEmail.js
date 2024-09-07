// require('dotenv').config();
const nodemailer = require('nodemailer');

const sendEmail = async (email,subject,text) => {
    try{
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            service: 'gmail',
            secure: true,
            auth: {
                user: process.env.EMAIL,//"digitalstationnote@gmail.com",
                pass: process.env.PASSWORD //"iauc mzfs wxem rwfw"
            }
        });
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject,
            text
        };
        const result = await transporter.sendMail(mailOptions);
        return result;
    }
    catch(error){
        console.error('Error sending email:', error.message);
    }
};

module.exports = sendEmail;