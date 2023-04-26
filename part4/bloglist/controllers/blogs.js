const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
});

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  const user = await User.findOne()

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  if (body.title === undefined) {
    response.status(400).send('blog title missing')
  } else if (body.url === undefined) {
    response.status(400).send('blog url missing')
  } else {
    const savedBlog = await blog.save()
    console.log(savedBlog);
    try {
      user.blogs = await user.blogs.concat(savedBlog._id)
      await user.save()
      response.status(201).json(savedBlog)
    } catch (exception) {
      next(exception)
    }
  }

  // const savedBlog = await blog.save()
  // response.status(201).json(savedBlog)

  // blog
  //   .save()
  //   .then((result) => {
  //     response.status(201).json(result);
  //   });
});

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const updatedBlog = {
    likes: 20,
  }

  await Blog.findByIdAndUpdate(request.params.id, updatedBlog)
  response.json(updatedBlog)
  response.status(200).end()
})

module.exports = blogsRouter;
