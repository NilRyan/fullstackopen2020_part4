const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const logger = require('../utils/logger');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  logger.info('--BLOGS--', blogs);
  response.json(blogs);
});

blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body);
  try {
    const result = await blog.save();
    response.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete('/:id', (request, response, next) => {
  const { id } = request.params;

  Blog.findByIdAndRemove(id).then(() => response.status(204).end());
});

module.exports = blogsRouter;
