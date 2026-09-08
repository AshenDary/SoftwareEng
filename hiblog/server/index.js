const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Import routes
const articleRoutes = require('./routes/articleRoutes');
const authRoutes = require('./routes/authRoutes');
const commentRoutes = require('./routes/commentRoutes');
const profileRoutes = require('./routes/profileRoutes');
const statisticsRoutes = require('./routes/statisticsRoutes');

// Mount routes
app.use('/articles', articleRoutes);
app.use('/auth', authRoutes);
app.use('/comments', commentRoutes);
app.use('/profile', profileRoutes);
app.use('/statistics', statisticsRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error('MongoDB connection error:', err));
