const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;

  if (!password || password.length < 3) {
    response.status(400).send('password must be at least 3 characters long');
    return;
  }

  if (!username || username.length < 3) {
    response.status(400).send('username must be at least 3 characters long');
    return;
  }

  const userExists = await User.findOne({ username });
  if (userExists.username === username) {
    response.status(400).send('username is already taken');
    return;
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

module.exports = usersRouter;
