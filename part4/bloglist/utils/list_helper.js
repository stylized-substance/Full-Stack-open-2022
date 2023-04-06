const lodash = require('lodash');

const dummy = (blogs) => 1;

const totalLikes = (blogs) => blogs.reduce((previous, current) => previous + current.likes, 0);

const favoriteBlog = (blogs) => blogs.reduce(
  (previous, current) => ((previous.likes > current.likes) ? previous : current),
);

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
};
