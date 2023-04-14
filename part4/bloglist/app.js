require('dotenv').config();
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const express = require('express');
const config = require('./utils/config');
require('express-async-errors')

const app = express();

const blogsRouter = require('./controllers/blogs');
const logger = require('./utils/logger');
const Blog = require('./models/blog');

mongoose.set('strictQuery', false);

logger.info('Connecting to', config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(() => {
    console.error('Error connecting to MongoDB');
  });

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use('/api/blogs', blogsRouter);

module.exports = app;

// // Create body token for morgan
// morgan.token('body', (req) => JSON.stringify(req.body));
