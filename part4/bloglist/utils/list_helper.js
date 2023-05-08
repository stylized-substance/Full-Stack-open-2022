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
//   let authorsAndLikes = new Array()
//   _.forEach(inputBlogs, function(blog) {
//     const filteredBlog = _.pick(blog, ['author', 'likes'])
//     authorsAndLikes.push(filteredBlog)
//   })
//   return authorsAndLikes
// }

const mostLikes = (inputBlogs) => {
  const result = _(inputBlogs)
    .groupBy('author')
    .mapValues(blogs => 
      _.sumBy(blogs, 'likes')
    )
    .map((likes, author) => ({ author, likes }))
    .maxBy('likes')
  
    return result
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
