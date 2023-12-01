import useHandleLike from '../utils/useHandleLike'

const LikeButton = ({ blog, title }) => {
  const handleLike = useHandleLike()
  console.log(handleLike)
  return (
    <button onClick={() => handleLike(blog, title)} className="like-button">
      Like
    </button>
  )
}

export default LikeButton