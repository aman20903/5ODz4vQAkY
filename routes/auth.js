const express = require('express');
const bcrypt= require('bcrypt');
const fs= require('fs');
const router = express.Router();

const usersFilePath = 'C:/Users/kulam/OneDrive/Desktop/Hilbert/data/user.json'

const readUsers = () => {
    const data = fs.readFileSync(usersFilePath);
    return JSON.parse(data);
};

const writeUsers = (data) => {
    fs.writeFileSync(usersFilePath,JSON.stringify(data,null,2))
};

router.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    // Password length check
    if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    const users = readUsers();

    // Check if user already exists
    if (users.some(user => user.email === email)) {
        return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password and save the user
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ email, password: hashedPassword });
    writeUsers(users);

    res.status(201).json({ message: 'Signup successful' });
});

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const users = readUsers();

    const user = users.find(user => user.email === email);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ error: 'Incorrect password' });
    }

    res.json({ message: 'Login successful' });
});

module.exports = router;