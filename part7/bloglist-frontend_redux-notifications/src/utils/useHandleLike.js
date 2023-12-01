import { useDispatch } from 'react-redux'
import { likeBlog } from '../reducers/blogReducer'
import { updateNotification } from '../reducers/notificationReducer'

const useHandleLike = (blog, title) => {
  const dispatch = useDispatch()

  dispatch(likeBlog(blog))
  dispatch(
    updateNotification({ content: `Liked blog ${title}`, type: 'success' })
  )
  setTimeout(() => {
    dispatch(updateNotification({}))
  }, 5000)
}

export default useHandleLike