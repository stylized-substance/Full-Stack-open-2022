const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
});

blogsRouter.post('/', async (request, response) => {
  //const blog = new Blog(request.body);

  const body = request.body

  const blog = new Blog({ title: body.title })

  if (blog.title === undefined) {
    response.status(400).send('blog title missing')
  } else {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  }

  // blog
  //   .save()
  //   .then((result) => {
  //     response.status(201).json(result);
  //   });
});

module.exports = blogsRouter;
