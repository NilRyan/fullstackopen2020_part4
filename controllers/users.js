const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

usersRouter.post('/', async (request, response, next) => {
  const { body } = request;

  // password validation is done in the controller instead of the schema because
  // the passwordHash is stored in the database instead of the password
  if (body.password.length < 3) {
    return response
      .status(400)
      .json({ error: 'password length must be greater than 3 characters' });
  }
  try {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    });

    const savedUser = await user.save();
    response.json(savedUser);
  } catch (exception) {
    next(exception);
  }
});

usersRouter.get('/', async (request, response, next) => {
  try {
    const users = await User.find({});
    response.json(users);
  } catch (exception) {
    next(exception);
  }
});

usersRouter.delete('/:id', async (request, response, next) => {
  try {
    const { id } = request.params;
    await User.findByIdAndRemove(id);
    response.status(204).end();
  } catch (exception) {
    next(exception);
  }
});

module.exports = usersRouter;
