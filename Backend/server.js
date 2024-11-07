const express = require('express');
const dotenv = require('dotenv');  
const connectDB = require('./dbconfig/db');
const searchRouter  = require('./router/search');

// Connect to the database
connectDB();

dotenv.config(); // Loading environment variables
const app = express();



// Middleware for JSON parsing and URL encoding
app.use(express.json());  // Corrected usage of express.json
app.use(express.urlencoded({ extended: true }));  // Corrected usage of express.urlencoded

// Route for product searching
app.use('/api/products', searchRouter); // Navigating to search router for product searching

// Set port with a fallback to 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
