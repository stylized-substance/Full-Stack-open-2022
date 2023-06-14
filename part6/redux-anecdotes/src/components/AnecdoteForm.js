import { useDispatch } from 'react-redux'
import { addNew } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  
  const add = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    dispatch(addNew(content))
    // dispatch(showNotification(content))
    event.target.anecdote.value = ''
  }

  return (
    <div>
      <h2>create new</h2>
        <form onSubmit={add}>
          <div><input name="anecdote" /></div>
          <button type="submit">create</button>
        </form>
    </div>
  )
}

export default AnecdoteForm