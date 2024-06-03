require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Import middleware cors

const app = express();
const emailRoutes = require('./routes/emailRoutes');
const port = 5000;

app.use(cors());

app.use(express.json());
app.use('/api', emailRoutes);

app.use((req, res, next) => {
    console.log(req.path, req.method);
    console.log(`Received ${req.method} request to ${req.url}`);
    next();
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;
