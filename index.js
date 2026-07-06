const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3000;

const URL = process.env.URL;

app.use(cors({
    origin: 'http://localhost:5173/',
    credentials: true
}));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

mongoose.connect(URL).then(() => {
    console.log('Database connected successfully');
}).catch((err) => {
    console.log('Database connection failed', err);
});