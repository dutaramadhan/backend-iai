const nodemailer = require('nodemailer');
const emailModel = require('../models/emailModel');
require('dotenv').config();

exports.sendEmail = async (req, res) => {
    try {
        const { checks, userEmail } = req.body;

        let htmlContent = "<h1>Detail Medical Record - DiCheck</h1>";
        checks.forEach((check, index) => {
            htmlContent += `
                <p><strong>Symptoms:</strong> ${check.symptoms.join(', ')}</p>
                <p><strong>Disease:</strong> ${check.disease}</p>
                <p> ${check.description}</p>
                <p><strong>Treatment Advice:</strong> ${check.recommendations.join(', ')}</p>
                <p><strong>Medicine Name:</strong> ${check.medications.join(', ')}</p>
                <hr />
                <p><strong>Kamu menerima detail check ini pada tanggal:</strong> ${check.record_date}</p>
            `;
        });

        const emailHost = process.env.EMAIL;
        const password = process.env.PASSWORD;

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: emailHost,
                pass: password
            }
        });

        const mailOptions = {
            from: emailHost,
            to: userEmail,
            subject: "Detail Medical Record - DiCheck",
            html: htmlContent
        };

      await transporter.sendMail(mailOptions);

        const email = new emailModel({
            from: emailHost,
            to: userEmail,
            subject: "Detail Medical Record - DiCheck",
            text: "",
            html: htmlContent
        });
        await email.save();

        res.status(200).json({
            status: 'success',
            message: 'Email sent successfully',
            data: email
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};