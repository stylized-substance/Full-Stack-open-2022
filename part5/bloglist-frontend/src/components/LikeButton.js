import blogService from '../services/blogs'

const LikeButton = ({ id }) => {

  const handleLike = (id) => {
    blogService.getOne(id)
      .then((blog) => {
        const newLikes = blog.likes + 1
        const updateObject = {
          likes: newLikes
        }
        blogService.update(id, updateObject)
          .then((result => console.log('result', result)))
      })
  }

  return (
    <button onClick={() => handleLike(id)}>
      Like
    </button>
  )
}

export default LikeButton