const nodemailer = require("nodemailer");

var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "cb4b7e6fa1fc2f",
    pass: "d0efa6138f536b"
  }
});

async function sendEmail(mailOptions) {
  // send mail with defined transport object
  await transport.sendMail({
    from: mailOptions.from, // sender address
    to: mailOptions.to, // list of receivers
    subject: mailOptions.subject, // Subject line
    text: mailOptions.text, // plain text body
    html: mailOptions.html, // html body
  });

  console.log("Message sent");
}

module.exports = sendEmail