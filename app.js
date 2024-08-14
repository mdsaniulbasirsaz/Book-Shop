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
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.post('/upload', upload.single('image'), (req, res) => {
  res.send('File uploaded successfully!');
});



// Define Book Schema and Model
const bookSchema = new mongoose.Schema({
  bookname: String,
  author: String,
  price: String,
  image: String,
});
const Collections = mongoose.model('Collections', bookSchema);
module.exports = Collections;

app.post('/addBook', upload.single('image'), async (req, res) => {
    try {
      const { bookname, author, price } = req.body;
      const image = req.file ? req.file.filename : ''; // Use the filename saved by multer
  
      const newBook = new Collections({ bookname, author, price, image });
      const savedBook = await newBook.save();
  
      console.log('Received data:', req.body);
      console.log('Saved book:', savedBook);
  
      res.status(201).send('Book added successfully');
    } catch (error) {
      res.status(500).send('Error adding book: ' + error.message);
    }
  });
 
  app.get('/info', async (req, res) => {
    try {
      const bookinfo = await Collections.find(); 
  
      console.log('Fetched books:', bookinfo);
  
      res.status(200).json(bookinfo); 
    } catch (error) {
      res.status(500).send('Error fetching books: ' + error.message);
    }
  });
  


  //Delete Book
  app.delete('/delete-book', async (req, res) => {
    try {
      const { bookname } = req.body; 
  
      const result = await Collections.findOneAndDelete({ bookname: bookname });
  
      if (result) {
        res.status(200).json({ message: 'Book deleted successfully' });
      } else {
        res.status(404).json({ message: 'Book not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error deleting book', error });
    }
  });
  

  //Sign up
  const userCollection = new mongoose.Schema({
      name: String,
      username: String,
      phone: String,
      password: String,
  });

  const User = mongoose.model('User',userCollection);
  module.exports = User;

  app.post('/signup', async (req, res) => {
    const { name, username, phone, password } = req.body;
  
    if (!name || !username || !phone || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    try {
      const existingUser = await User.findOne({ $or: [{ username }, { phone }] });
      if (existingUser) {
        return res.status(400).json({ message: 'Username or phone already in use' });
      }
  
      const newUser = new User({
        name,
        username,
        phone,
        password 
      });
  
      await newUser.save();
  
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error('Error creating user:', error); // Detailed logging
      res.status(500).json({ message: 'Error creating user', error: error.message }); // Provide error message
    }
  });
  
  
  //Login
  app.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
  
    try {
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      if (password !== user.password) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'Error logging in', error: error.message });
    }
  });
  
//Order
const orderSchema = new mongoose.Schema({
    username: String,
    bookname: String,
    author: String,
    price: String,
    orderDate:{
      type:Date,
      default:Date.now
    }
});
const Order = mongoose.model('Order',orderSchema);
module.exports = Order;


app.post('/api/saveBook', async (req, res) => {
  try {
    const { username, bookname, author, price } = req.body;

    const newOrder = new Order({
      username: username,
      bookname: bookname,
      author: author,
      price: price
    });

    await newOrder.save();

    res.json({ message: 'Book saved successfully!' });
  } catch (error) {
    console.error('Error saving book:', error);
    res.status(500).json({ message: 'Error saving book' });
  }
});
app.get('/api/getorder', async (req, res) => {
  try {
    const books = await Order.find();
    res.json(books);
  } catch (error) {
    console.error('Error retrieving books:', error);
    res.status(500).json({ message: 'Error retrieving books' });
  }
});


app.get('/api/getorder/:username', async (req, res) => {
  try {
      const { username } = req.params;
      const orders = await Order.find({ username }).sort({ orderDate: -1 });
      res.json(orders);
  } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ error: 'An error occurred while fetching orders.' });
  }
});





// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
