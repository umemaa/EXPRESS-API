const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


// Create an Express application
const app = express();

// Set up middleware
app.use(bodyParser.json());
// app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/Shopping', {

}).then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Define routes
const productsRoute = require('./routes/product');
app.use('/api', productsRoute);

// Handle 404 errors
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

// Error handling middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
