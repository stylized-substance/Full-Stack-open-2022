require('dotenv').config();
const config = require('.utils/config')
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const blogsRouter = ('./controllers/blogs');
const Blog = require('./models/blog');
const logger = require('./utils/logger');
const mongoose = require('mongoose');
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
app.use('/api/blogs, blogsRouter')

module.exports = app

// // Create body token for morgan
// morgan.token('body', (req) => JSON.stringify(req.body));