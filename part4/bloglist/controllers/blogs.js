const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
});

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findById(request.user)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  blog.populate('user')
  
  if (body.title === undefined) {
    response.status(400).send('blog title missing')
  } else if (body.url === undefined) {
    response.status(400).send('blog url missing')
  } else {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  }
});

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const blogCreatorId = blog.user.toString()
  
  if (request.user !== blogCreatorId) {
    return response.status(401).json({ error: 'you are not the blogs creator' })
  }
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
