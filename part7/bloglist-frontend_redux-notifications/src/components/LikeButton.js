import useHandleLike from '../utils/useHandleLike'

const LikeButton = ({ blog }) => {
  const handleLike = useHandleLike()
  return (
    <button onClick={() => handleLike({ blog })} className="like-button">
      Like
    </button>
  )
}

export default LikeButton
