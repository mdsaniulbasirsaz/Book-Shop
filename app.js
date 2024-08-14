const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const multer = require('multer');
const http = require('http');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// mongoose.connect('your-mongodb-connection-string', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.log(err));


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'images')));
app.use(express.static(path.join(__dirname, 'src')));
app.use(express.static(path.join(__dirname, 'styles')));

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.get('/checkout', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'checkout.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/order', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'order.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

// Serve the index.html file by default for any unmatched routes (for a single-page application)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Create the server with http module
const server = http.createServer(app);


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});
const upload = multer({ storage: storage });


app.post('/upload', upload.single('file'), (req, res) => {
    res.status(200).send('File uploaded');
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
