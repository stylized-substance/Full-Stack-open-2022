import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, createAnecdote } from '../requests'
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (result) => {
      queryClient.invalidateQueries('anecdotes')
    },
    onError: (error) => {
      notificationDispatch({type: 'ERROR'})
    }
  })

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote', content)
    const result = newAnecdoteMutation.mutate({ content })
    console.log('result', result);
    notificationDispatch({type: 'CREATE', payload: content})
    setTimeout(() => {
      notificationDispatch({type: 'RESET'})
    }, 5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
