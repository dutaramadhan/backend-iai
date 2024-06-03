const nodemailer = require('nodemailer');
const emailModel = require('../models/emailModel');

exports.sendEmail = async (req, res) => {
 try{
    const email = new emailModel(req.body);
    const emailUser = process.env.EMAIL;
    const password = process.env.PASSWORD;
    console.log(email + ' \n' + emailUser + ' \n' + password);
    const transporter = nodemailer.createTransport({
      host: 'live.smtp.mailtrap.io',
      port: 587,
      secure: false,
      auth: {
        user: emailUser,
        pass: password
      }
    });
    const mailOptions = {
      from: emailUser,
      to: email.to,
      subject: email.subject,
      text: email.text,
      html: email.html
    };
    transporter.sendMail(mailOptions);
    // await email.save();
    res.status(200).json(
      {
        status: 'success',
        message: 'Email sent successfully',
        data : email
      }
    );
 } catch(e){
    res.status(400).json(
      {
        status: 'fail',
        message: e.message
      }
    );
 }
}