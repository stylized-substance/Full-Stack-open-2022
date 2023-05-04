require('dotenv').config();
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const express = require('express');
const config = require('./utils/config');
require('express-async-errors')

const app = express();

const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login')
const tokenExtractor = require('./utils/tokenExtractor')
const userExtractor = require('./utils/userExtractor')
const logger = require('./utils/logger');
const errorHandler = require('./utils/errorHandler')
const Blog = require('./models/blog');

mongoose.set('strictQuery', false);

logger.info('Connecting to', config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connected to MongoDB');
  })
  .catch(() => {
    logger.error('Error connecting to MongoDB');
  });

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(tokenExtractor);
app.use('/api/blogs', userExtractor, blogsRouter);
app.use('/api/users', userExtractor, usersRouter)
app.use('/api/login', loginRouter);
app.use(errorHandler)

module.exports = app;

// // Create body token for morgan
// morgan.token('body', (req) => JSON.stringify(req.body));
