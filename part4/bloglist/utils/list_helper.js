const dummy = (blogs) => 1;

const totalLikes = (blogs) => blogs.reduce(
  (previousValue, currentValue) => previousValue + currentValue.likes, 0);

module.exports = {
  dummy,
  totalLikes,
};
