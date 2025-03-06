const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');


// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const MONGODB = process.env.MONGODB;

// Midleware
app.use(express.json()); 
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());

//start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

// Connect to MongoDB
mongoose.connect(MONGODB)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error: ', err));