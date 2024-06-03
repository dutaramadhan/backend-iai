const express = require('express');
const {sendDataToEmail} = require('../controller/emailController');

const router = express.Router();

router.post('/send-email', sendDataToEmail)

module.exports = router;