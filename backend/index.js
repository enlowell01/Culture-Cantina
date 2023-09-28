const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const cors = require('cors');
const userRoutes = require('./routes/Users');
const ratingRoutes = require('./routes/Ratings');
const movieRoutes = require('./routes/Movies');
const profilePicturesRoutes = require('./routes/ProfilePictures');
const cookieSession = require('cookie-session');

// Middleware
app.use(cookieSession({
  name: 'session',
  keys: [ process.env.SESSION_SECRET ],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))
app.use(express.json());
app.use(cors({ credentials: true, origin: 'https://culture-cantina-59e5.vercel.app' }));

// Routes
app.use('/user', userRoutes);
app.use('/ratings', ratingRoutes);
app.use('/movies', movieRoutes);
app.use('/pictures', profilePicturesRoutes);

// DB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('DB connected'))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
