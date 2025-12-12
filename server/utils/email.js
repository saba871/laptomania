const nodeMailer = require('nodemailer');

const transporter = nodeMailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  secure: false,
  port: 2525,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
})

const sendEmail = async (options) => {
  try {
    await transporter.sendMail({
      from: 'Laptomania <p6lYV@example.com>',
      to: options.email,
      html: options.html
    })
  } catch(error) {
    console.log("error is in sand email function", error);
  }
}


module.exports = sendEmail;
