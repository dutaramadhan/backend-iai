const nodemailer = require('nodemailer');
const emailModel = require('../models/emailModel');

exports.sendEmail = async (req, res) => {
 try{
    const email = new emailModel(req.body);
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to: email.to,
      subject: email.subject,
      text: email.text
    };
    await transporter.sendMail(mailOptions);
    await email.save();
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