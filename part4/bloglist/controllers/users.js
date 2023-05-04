const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs');
  response.json(users);
});

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;
  (request.body)

  if (!password || password.length < 3) {
    response.status(400).json({ error: 'password must be at least 3 characters long' });
    return;
  }

  if (!username || username.length < 3) {
    response.status(400).json({ error: 'username must be at least 3 characters long' });
    return;
  }

  const userExists = await User.findOne({ username });
  ('userExists:', userExists);
  if (userExists != null) {
    response.status(400).json({ error: 'username is already taken' });
  } else {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      passwordHash,
    });

    const savedUser = await user.save();
    (savedUser)

    response.status(201).json(savedUser);
  }
});

module.exports = usersRouter;
