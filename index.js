const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');


// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const MONGODB = process.env.MONGODB;

// Import the routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user')
const prescriptionRoutes = require('./routes/prescription')
const doctorRoutes = require('./routes/doctor')
const nurseRoutes = require('./routes/nurse')

// Midleware
app.use(express.json()); 
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      console.error('Bad JSON');
      return res.status(400).json({ success: false, message: 'Invalid JSON payload' });
    }
    next();
  });
  

//Route midlewares 
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/prescription', prescriptionRoutes);
app.use('/api/doctor', doctorRoutes);
app.use('/api/nurse', nurseRoutes);

//start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

// Connect to MongoDB
mongoose.connect(MONGODB)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error: ', err));