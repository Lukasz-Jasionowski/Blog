const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    res.json({ requestData: { username, password } });
});

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
})