const express = require('express');
const emailController = require('../controllers/emailController');
const middleware = require('../middleware/sendMailMiddleware');

const emailRouter = express.Router();

emailRouter.get('/sendGmail', middleware.verifyApiKey, emailController.sendEmail);

module.exports = emailRouter;