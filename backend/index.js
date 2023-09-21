const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const userRoutes = require('./routes/Users');
const ratingRoutes = require('./routes/Ratings');
const cors = require('cors');

// Middleware
app.use(express.json());
app.use(cors())

// Routes
app.use('/user', userRoutes);
app.use('/ratings', ratingRoutes);


// DB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('DB connected'))
    .catch(err => console.error(err));
    

const PORT = process.env.PORT || 8080

app.listen(PORT, console.log(`listening on port ${PORT}`));