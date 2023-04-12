const _ = require('lodash');

const dummy = (blogs) => 1;

const totalLikes = (blogs) => blogs.reduce((previous, current) => previous + current.likes, 0);

const favoriteBlog = (blogs) => {
  const mostLikedBlog = blogs.reduce(
    (previous, current) => ((previous.likes > current.likes) ? previous : current),
  );
  const mostLikedBlogFiltered = _.pick(mostLikedBlog, ['title', 'author', 'likes']);
  return [mostLikedBlog, mostLikedBlogFiltered];
};

const mostBlogs = (inputBlogs) => {
  const { author } = _.maxBy(inputBlogs, 'author');
  const blogsCount = _.countBy(inputBlogs, 'author');
  const blogs = _.max(Object.values(blogsCount));
  return { author, blogs };
};

// TODO 4.7*: helper functions and unit tests, step5
// const mostLikes = (inputBlogs) => {
//   const author = _.sumBy(inputBlogs, 'likes')
//   return author
// }


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
