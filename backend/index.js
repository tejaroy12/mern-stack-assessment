const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const { seedDatabase } = require('./controllers/ProductController');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Connect to DB
connectDB().then(() => {
  seedDatabase();
});

// Test Route
app.get('/', (req, res) => {
  res.send('Welcome to the Backend Product API!');
});

// Routes
app.use('/', productRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
