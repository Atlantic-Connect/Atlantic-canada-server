const nodemailer = require('nodemailer');

// Load environment variables from .env file


// Create nodemailer transporter
const transporter = nodemailer.createTransport({
  host:'smtp.gmail.com',
  port:587 ,
  secure: false,
  auth: {
    user:'smeet1048@gmail.com',
    pass: 'Smeet1048@123',
  },
});

module.exports = transporter;
