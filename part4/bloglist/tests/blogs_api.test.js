const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');
const api = supertest(app);
const Blog = require('../models/blog');
const bcrypt = require('bcrypt')
const User = require('../models/user')


beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(helper.initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(helper.initialBlogs[1]);
  await blogObject.save();
});

describe('when there are blogs saved initially', () => {
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
      .expect(200);
    const { body } = response;
    body.forEach((object) => {
      expect(object.id).toBeDefined();
    });
  });
  
  test('there are two blogs', async () => {
    const response = await api.get('/api/blogs');
  
    expect(response.body).toHaveLength(2);
  });
  
  test('the first blog is test1', async () => {
    const response = await api.get('/api/blogs');
  
    expect(response.body[0].title).toBe('test1');
  });
  
  test('a blog titled test1 is within the returned blogs', async () => {
    const response = await api.get('/api/blogs');
  
    const contents = response.body.map((r) => r.title);
    expect(contents).toContain(
      'test1',
    );
  });
})



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

  const blogsAtEnd = await helper.blogsInDb();
  // blogsAtEnd.forEach(element => console.log(element))
  // console.log(`blogsAtEnd: ${blogsAtEnd[0]}`)
  // console.log(typeof(blogsAtEnd))
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
  const titles = blogsAtEnd.map((r) => r.title);
  expect(titles).toContain(
    'testblogtitle',
  );
});

test('blog without title is not added', async () => {
  const newBlog = {
    dummy: true,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
});

test('a blog can be deleted by Id', async () => {
  const response = await api
    .get('/api/blogs');
  const id = response.body[0].id;

  await api
    .delete(`/api/blogs/${id}`)
    .expect(204);
});

test('blog likes can be updated by Id', async () => {
  const response = await api
    .get('/api/blogs');
  const id = response.body[0].id;

  const updateResponse = await api
    .put(`/api/blogs/${id}`)
    .expect(200);
})

test('missing likes property defaults to 0', async () => {
  const newBlog = {
    title: "testTitle",
    url: "testUrl"
  }

  const postResponse = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

  expect(postResponse.body.likes === 0)  
})

test('missing blog title gets response 400', async () => {
  const newBlog = {
    likes: 10
  }

  const postResponse = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('missing url property gets response 400', async () => {
  const newBlog = {
    title: "testTitle",
  }

  const postResponse = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

afterAll(async () => {
  await mongoose.connection.close();
});

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    
    const passwordHash = await bcrypt.hash('secretpassword', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'testuser',
      name: 'test user',
      password: 'secret',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })
})