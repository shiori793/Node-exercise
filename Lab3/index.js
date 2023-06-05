const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const users = [];

const secretKey = 'my-secret-key';

async function hashedPassword(password){
    const saltRounds = 10;
    const hashed = await bcrypt.hash(password, saltRounds);
    return hashed;
}

async function comparePasswords(password, hashedPassword) {
    const match = await bcrypt.compare(password, hashedPassword);
    return match
}

function generateToken(payload) {
    return jwt.sign(payload, secretKey, { expiresIn: "1h" })
}

function verifyToken(token) {
    return jwt.verify(token, secretKey);
}

function authenticateToken(req, res, next) {
    const { token } = req.cookies
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
    const user = verifyToken(token);

    if (!user) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    req.user = user;
    next();
}

app.post("/register", async (req, res) => {
    const { username, password } = req.body;

    let existingUser = users.find(user => user.username === username);

    if(existingUser){
        res.status(409).json({
            message: "Username already exist"
        })
    }

    const hashed = await hashedPassword(password);

    const newUser = {
        id: users.length + 1,
        username,
        password: hashed
    }

    users.push(newUser);

    res.status(201).json({
        message: "user registered successfully!"
    })

})

app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    let user = users.find(user => user.username === username);

    if(!user) {
        res.status(401).json({
            message: "Invalid credentials!"
        })
    }

    const match = await comparePasswords(password, user.password);

    if(!match) {
        res.status(401).json({
            message: "Wrong password!"
        })
    }

    const token = generateToken({ id: user.id, username: user.username });

    res.cookie("token", token, { maxAge: 300 * 1000 })
    res.status(200).json({
        token
    })

})

app.get("/protected", authenticateToken, (req, res) => {
    res.json({
        message: "Hello World"
    })
})

app.listen(3001, () => {
    console.log("Server is running on 3001");
})