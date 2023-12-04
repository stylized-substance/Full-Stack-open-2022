import useHandleLike from '../utils/useHandleLike'

const LikeButton = ({ blog }) => {
  console.log(blog)
  const handleLike = useHandleLike()
  console.log(handleLike)
  return (
    <button onClick={() => handleLike({ blog })} className="like-button">
      Like
    </button>
  )
}

export default LikeButton