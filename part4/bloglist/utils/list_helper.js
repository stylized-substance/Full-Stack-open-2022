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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
