const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');

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

describe('requests', () => {
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

    await User.deleteMany({});
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

  test('invalid users are not created and proper status code and error messages are sent', async () => {
    const badUser = {
      username: 'hi',
      password: 'aha221',
    };

    const badPassword = {
      username: 'hehehe',
      password: '11',
    };

    const badUserResult = await api
      .post('/api/users')
      .send(badUser)
      .expect(400);

    const passwordResult = await api
      .post('/api/users')
      .send(badPassword)
      .expect(400);

    expect(badUserResult.body.error).toContain(
      'shorter than the minimum allowed length'
    );

    expect(passwordResult.body.error).toContain(
      'password length must be greater than 3 characters'
    );
  });

  test('no duplicate usernames', async () => {
    await api.post('/api/users').send({
      username: 'ness',
      password: 'hahaha',
    });
    const result = await api
      .post('/api/users')
      .send({
        username: 'ness',
        password: 'hahaha',
      })
      .expect(400);
    expect(result.body.error).toContain('expected `username` to be unique');
  });
});

afterAll(() => {
  mongoose.connection.close();
});
