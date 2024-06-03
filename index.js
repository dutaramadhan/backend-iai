const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const setupDB = require('./models/setupDB');
const cors = require('cors');
require('dotenv').config();

const emailRouter = require('./routers/emailRouter');


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000;


setupDB()
app.use('/api/v1/gmail', emailRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});