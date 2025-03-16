const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use(express.static('public'));

app.get('/', (req, res) => res.send('Welcome to the Auth System!'));

app.get('/signup.html', (req, res) => {
    res.sendFile(__dirname + '/public/signup.html');
});

app.get('/login.html', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

app.get('/success.html', (req, res) => {
    res.sendFile(__dirname + '/public/success.html');
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
