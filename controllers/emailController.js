const nodemailer = require('nodemailer');
const emailModel = require('../models/emailModel');
require('dotenv').config();

exports.sendEmail = async (req, res) => {
    try {
        const { checks, userEmail } = req.body;

        // let htmlContent = "<h1>Detail Medical Record - DiCheck</h1>";
        // checks.forEach((check, index) => {
        //     htmlContent += `
        //         <p><strong>Symptoms:</strong> ${check.symptoms.join(', ')}</p>
        //         <p><strong>Disease:</strong> ${check.disease}</p>
        //         <p> ${check.description}</p>
        //         <p><strong>Treatment Advice:</strong> ${check.recommendations.join(', ')}</p>
        //         <p><strong>Medicine Name:</strong> ${check.medications.join(', ')}</p>
        //         <hr />
        //         <p><strong>Kamu menerima detail check ini pada tanggal:</strong> ${check.record_date}</p>
        //     `;
        // });

        // let htmlContent1 = ``
        const htmlContent1 = 
                `
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <style>
                            body {
                                font-family: Arial, sans-serif;
                                line-height: 1.6;
                            }
                            .container {
                                max-width: 600px;
                                margin: 0 auto;
                                padding: 20px;
                                border: 1px solid #ddd;
                                border-radius: 5px;
                            }
                            h1 {
                                color: #333;
                                font: bold;
                                font-size: x-large;
                            }
                            .section {
                                margin-bottom: 20px;
                            }
                            .section strong {
                                display: block;
                                margin-bottom: 5px;
                                color: #333;
                                font: bold;
                                font-size: medium;
                                text-underline-position: below;
                                text-decoration: underline;
                    
                            }
                            .section p {
                                margin: 5px 0;
                                font: normal;
                                font-size: medium;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <h1>Detail Checks</h1>
                            <p>Berikut detail medical record yang kamu buat!</p>
                            ${checks.map(check => `
                            <div class="section">
                                <strong>Symptoms</strong>
                                <ul>
                                    ${check.symptoms.map(symptom => `<li>${symptom}</li>`).join('')}
                                </ul>
                            </div>
                            <div class="section">
                                <strong>Disease</strong>
                                <p>${check.disease}</p>
                                <p>${check.description}</p>
                            </div>
                            <div class="section">
                                <strong>Treatment Advice</strong>
                                <ul>
                                    ${check.recommendations.map(recommendation => `<li>${recommendation}</li>`).join('')}
                                </ul>
                            </div>
                            <div class="section">
                                <strong>Medicine Name</strong>
                                <ul>
                                    ${check.medications.map(medication => `<li>${medication}</li>`).join('')}
                                </ul>
                            </div>
                            <div class="section">
                                <strong>Keterangan</strong>
                                <p>Kamu menerima detail check ini pada tanggal ${new Date(check.record_date).toLocaleDateString('id-ID')} pukul ${new Date(check.record_date).toLocaleTimeString('id-ID')} </p>
                            </div>
                            `).join('')}
                        </div>
                    </body>
                    </html>
                `
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
            // to: userEmail,
            to:userEmail,
            subject: "Detail Medical Record - DiCheck",
            html: htmlContent1
        };

      await transporter.sendMail(mailOptions);

        const email = new emailModel({
            from: emailHost,
            to: userEmail,
            subject: "Detail Medical Record - DiCheck",
            data: checks[0],
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