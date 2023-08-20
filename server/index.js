require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const secret = process.env.SECRET;
const jwt = require('jsonwebtoken');
const PORT = process.env.PORT || 4000;

app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL);

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const userDoc = await User.create({
            username,
            password: bcrypt.hashSync(password, salt)
        });
        res.json(userDoc);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const userDoc = await User.findOne({ username: username });
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
        jwt.sign({ username, id: userDoc._id }, secret, {}, (error, token) => {
            if (error) throw error;
            res.cookie('token', token).json('Ok');
        });
    } else {
        res.status(400).json('Wrong credentials!');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
});