const LikeButton = ({ blog, handleLike, title }) => {
  return (
    <button onClick={() => handleLike(blog, title)} className="like-button">
      Like
    </button>
  )
}

export default LikeButton