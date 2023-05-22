import blogService from '../services/blogs'

const LikeButton = ({ id }) => {

  const handleLike = async (id) => {
    try {
      const oldLikes = async (id) => {
      await blogService.getOne(id)
      }
    } catch (exception) {
      console.log(exception)
    }
    //console.log(oldLikes)
    //const updatedBlog = await blogService.update(id)
    //console.log(id)
  }

  return (
    <button onClick={() => handleLike(id)}>
      Like
    </button>
  )
}

export default LikeButton