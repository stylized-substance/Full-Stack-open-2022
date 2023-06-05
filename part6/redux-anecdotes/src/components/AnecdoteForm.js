import { useSelector, useDispatch } from 'react-redux'
import { addNew } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  
  const add = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    console.log('add new anecdote:', content)
    dispatch(addNew(content))
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