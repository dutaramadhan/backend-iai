const nodemailer = require('nodemailer');
require('dotenv').config();

const sendDataToEmail = async (req, res) => {
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

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    let mailOptions = {
        from: process.env.EMAIL,
        to: userEmail,
        subject: "Detail Medical Record - DiCheck",
        html: htmlContent
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        res.status(200).send({ message: "Email sent", info: info });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { sendDataToEmail };
