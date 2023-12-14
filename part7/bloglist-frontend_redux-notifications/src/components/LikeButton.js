import useHandleLike from '../utils/useHandleLike'
import Button from 'react-bootstrap/Button'

const LikeButton = ({ blog }) => {
  const handleLike = useHandleLike()
  return (
    // <button onClick={() => handleLike({ blog })} className="like-button">
    //   Like
    // </button>
    <Button
      size="sm"
      variant="dark"
      onClick={() => handleLike({ blog })}
      className="like-button"
    >
      Like
    </Button>
  )
}

export default LikeButton
