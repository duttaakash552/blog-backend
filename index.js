const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');

const userModel = require('./models/User');
const userRoutes = require('./routes/User');

const app = express();

const PORT = process.env.PORT || 3000;

const URL = process.env.URL;

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24
    }
  })
);

app.use(passport.initialize());

app.use(passport.session());

passport.use(userModel.createStrategy());

passport.serializeUser(userModel.serializeUser());

passport.deserializeUser(userModel.deserializeUser());

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

app.use('/api/user', userRoutes);