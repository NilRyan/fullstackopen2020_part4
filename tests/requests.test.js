const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');

const api = supertest(app);
const initialBlogs = [
  {
    title: 'MeBlog',
    author: 'Ryan',
    url: 'www.ryanblog.com',
    likes: 4242,
  },
  {
    title: 'MyBlog',
    author: 'Nil',
    url: 'www.nilblog.com',
    likes: 2421,
  },
  {
    title: 'Meog',
    author: 'Ryanil',
    url: 'www.ryangsblog.com',
  },
  {
    title: 'Glowrw',
    author: 'Nil',
    url: 'www.nilsfblog.com',
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[2]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[3]);
  await blogObject.save();
});

test('returns blogs in JSON format', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('unique identifier is id', async () => {
  const blogs = await api.get('/api/blogs');

  expect(blogs.body[0].id).toBeDefined();
});

test('create new blog post', async () => {
  const newBlog = {
    title: 'MyBlog',
    author: 'Ryan',
    url: 'www.nilblog.com',
    likes: 299,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');
  const contents = response.body.map((r) => r.title);

  expect(response.body).toHaveLength(initialBlogs.length + 1);
  expect(contents).toContain('MyBlog');
});

test('no like property creates like property defaulted to 0', async () => {
  const response = await api.get('/api/blogs');
  const likes = response.body.map((r) => r.likes);
  expect(likes).toMatchObject([4242, 2421, 0, 0]);
});

test('no title and url returns a status code of 400 Bad Request', async () => {
  const newBlog = {
    author: 'Ryans',
    likes: 300,
  };

  await api.post('/api/blogs').send(newBlog).expect(400);
});
afterAll(() => {
  mongoose.connection.close();
});
