import dotenv from "dotenv";
import express from 'express';
import cors from 'cors';
import mongoose, { model } from 'mongoose';
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, min: 4, unique: true },
    password: { type: String, required: true },
});
const UserModel = model('Users', UserSchema);
export const User = UserModel;
const PostSchema = new mongoose.Schema({
    title: String,
    summary: String,
    content: String,
    cover: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
}, {
    timestamps: true,
});
export const Post = mongoose.model('Post', PostSchema);
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import multer from 'multer';
const uploadMiddleware = multer({ dest: 'uploads/' });
import fs from 'fs/promises';
const { rename } = fs;
const PORT = process.env.PORT || 4000;

dotenv.config();
const app = express();

app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(`${process.cwd()}/uploads`));

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
        jwt.sign({ username, id: userDoc._id }, process.env.SECRET, {}, (error, token) => {
            if (error) throw error;
            res.cookie('token', token).json({
                id: userDoc._id,
                username,
            });
        });
    } else {
        res.status(400).json('Wrong credentials!');
    }
});

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, process.env.SECRET, {}, (error, info) => {
        if (error) throw error;
        res.json(info);
    });
});

app.post('/logout', (req, res) => {
    res.cookie('token', '').json('Ok');
});

app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = `${path}.${ext}`;
    await rename(path, newPath);

    const { token } = req.cookies;
    jwt.verify(token, process.env.SECRET, {}, async (error, info) => {
        if (error) throw error;
        const { title, summary, content } = req.body;
        const postDoc = await Post.create({
            title,
            summary,
            content,
            cover: newPath,
            author: info.id,
        });
        res.json(postDoc);
    });

});

app.put('/post', uploadMiddleware.single('file'), async (req, res) => {
    let newPath = null
    if (req.file) {
        const { originalname, path } = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        newPath = `${path}.${ext}`;
        await rename(path, newPath);
    }
    const { token } = req.cookies;
    jwt.verify(token, process.env.SECRET, {}, async (error, info) => {
        if (error) throw error;
        const { id, title, summary, content } = req.body;
        const postDoc = await Post.findById(id);
        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);

        if (!isAuthor) {
            res.status(400).json('You are not the author!');
            throw 'You are not the author!';
        }
        await postDoc.update({
            title,
            summary,
            content,
            cover: newPath ? newPath : postDoc.cover
        });
    });
})

app.get('/post', async (req, res) => {
    res.json(await Post.find()
        .populate('author', ['username'])
        .sort({ createdAt: -1 })
        .limit(20)
    );
});

app.get('/post/:id', async (req, res) => {
    const { id } = req.params;
    const postDoc = await Post.findById(id).populate('author', ['username']);
    res.json(postDoc);
});

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
});