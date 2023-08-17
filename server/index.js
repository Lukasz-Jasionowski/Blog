require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL);

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const userDoc = await User.create({ username, password });
        res.json(userDoc);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
})