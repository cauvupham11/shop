const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const passport = require('passport');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
require('./config/config'); // Load config trước
require('./middleware/auth'); // Sau đó mới load auth
// Routes
const userRoutes = require('./routes/UserRoutes');
const productRoutes = require('./routes/ProductRoutes');

app.use('/users', userRoutes);
app.use('/products', productRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});