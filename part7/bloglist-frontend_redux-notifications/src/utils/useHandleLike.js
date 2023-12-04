import { useDispatch } from 'react-redux'
import { likeBlog } from '../reducers/blogReducer'
import { updateNotification } from '../reducers/notificationReducer'

const useHandleLike = () => {
  const dispatch = useDispatch()
  const handleLike = ({ blog }) => {
    dispatch(likeBlog(blog))
    dispatch(
      updateNotification({
        content: `Liked blog ${blog.title}`,
        type: 'success'
      })
    )
    setTimeout(() => {
      dispatch(updateNotification({}))
    }, 5000)
  }
  return handleLike
}

export default useHandleLike