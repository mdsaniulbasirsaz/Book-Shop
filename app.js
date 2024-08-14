const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'images')));
app.use(express.static(path.join(__dirname, 'src')));
app.use(express.static(path.join(__dirname, 'styles')));

// MongoDB Connection
mongoose.connect('mongodb+srv://saniulsaz:12345@roktodin.abnxvco.mongodb.net/BookShop', {

})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Static File Routes
app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'public', 'admin.html')));
app.get('/checkout', (req, res) => res.sendFile(path.join(__dirname, 'public', 'checkout.html')));
app.get('/dashboard', (req, res) => res.sendFile(path.join(__dirname, 'public', 'dashboard.html')));
app.get('/index', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'public', 'login.html')));
app.get('/order', (req, res) => res.sendFile(path.join(__dirname, 'public', 'order.html')));
app.get('/signup', (req, res) => res.sendFile(path.join(__dirname, 'public', 'signup.html')));

// Serve index.html for unmatched routes (SPA)
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

// Set up storage for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  
  const upload = multer({ storage: storage });

// Define Book Schema and Model
const bookSchema = new mongoose.Schema({
  bookname: String,
  author: String,
  price: String,
  image: String,
});
const Book = mongoose.model('Book', bookSchema);
module.exports = Book;

app.post('/addBook', upload.single('image'), async (req, res) => {
    try {
      const { bookname, author, price } = req.body;
      const image = req.file ? req.file.filename : ''; // Use the filename saved by multer
  
      const newBook = new Book({ bookname, author, price, image });
      const savedBook = await newBook.save();
  
      console.log('Received data:', req.body);
      console.log('Saved book:', savedBook);
  
      res.status(201).send('Book added successfully');
    } catch (error) {
      res.status(500).send('Error adding book: ' + error.message);
    }
  });
 
  





// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
