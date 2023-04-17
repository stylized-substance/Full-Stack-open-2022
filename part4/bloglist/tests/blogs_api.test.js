const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');

const api = supertest(app);
const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});

  let blogObject = new Blog(helper.initialBlogs[0]);
  await blogObject.save();

  blogObject = new Blog(helper.initialBlogs[1]);
  await blogObject.save();
});

afterAll(async () => {
  await mongoose.connection.close();
});

test('all blogs are returned as json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test('blog posts unique ID is named id', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
  const body = response.body
  body.forEach(object => {
    expect(object.id).toBeDefined()
  })
})

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(2);
});

test('the first blog is test1', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body[0].title).toBe('test1');
});

// test('all blogs are returned', async () => {
//   const response = await api.get('/api/blogs');

//   expect(response.body).toHaveLength(initialBlogs.length);
// });

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs');

  const contents = response.body.map((r) => r.title);
  expect(contents).toContain(
    'test1',
  );
});

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'testblogtitle',
    author: 'testblogauthor',
    url: 'testblogURL',
    likes: 99,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  // const titles = blogsAtEnd.map(r => r.title);
  // expect(titles).toContain(
  //   'testblog',
  // );
});

test('blog without title is not added', async () => {
  const newBlog = {
    dummy: true,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400);

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
});
