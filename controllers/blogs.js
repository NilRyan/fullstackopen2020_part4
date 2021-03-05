const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const logger = require('../utils/logger');

blogsRouter.get('/', async (request, response) => {
  // a join query functionality is done by mongoose by making multiple queries
  // the user: user_id pair is populated with the corresponding user who created the blog
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  });
  logger.info('--BLOGS--', blogs);
  response.json(blogs);
});

blogsRouter.post('/', async (request, response, next) => {
  try {
    const { body } = request;

    const user = await User.findOne();
    logger.info(user);
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id,
    });

    const savedBlog = await blog.save();
    // blog id is saved to the blog prop of user for populate method
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.put('/:id', async (request, response, next) => {
  const { id } = request.params;
  const { body } = request;
  const updatedBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };
  try {
    const result = await Blog.findByIdAndUpdate(id, updatedBlog, {
      new: true,
    });
    response.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete('/:id', async (request, response, next) => {
  const { id } = request.params;
  try {
    await Blog.findByIdAndRemove(id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
