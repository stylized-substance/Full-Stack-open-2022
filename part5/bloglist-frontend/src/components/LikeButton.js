const LikeButton = ({ id }) => {

  const handleLike = async (id) => {
    console.log(id)
  }

  return (
    <button onClick={() => handleLike(id)}>
      Like
    </button>
  )
}

export default LikeButton