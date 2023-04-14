const Blog = require('../models/blog');

const initialBlogs = [
  {
    title: 'test1',
  },
  {
    title: 'test2',
  },
];

const nonExistingId = async () => {
  const blog = new Blog({ title: thiswillbedeleted });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const notesInDb = async () => {
  const blogs = await Blog.find({});
  return blogs
  //.map((blog) => blog.toJSON);
};

module.exports = {
  initialBlogs, nonExistingId, notesInDb,
};
