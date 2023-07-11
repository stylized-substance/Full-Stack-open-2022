import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import NotificationContext from './NotificationContext'
import { useNotificationValue } from './NotificationContext'
import { useNotificationDispatch } from './NotificationContext'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, createAnecdote } from './requests'
import { voteAnecdote } from './requests'
import { useContext } from "react"


const App = () => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()
  const voteAnecdoteMutation = useMutation(voteAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })
  
  const result = useQuery('anecdotes', getAnecdotes,
  {
    retry: 2
  }
  )
  console.log('mainresult', result)

  if ( result.isLoading ) {
    return <div>Loading anecdotes...</div>
  }

  if ( result.isError ) {
    return <div>Service not available</div>
  }

  const anecdotes = result.data
  
  const handleVote = async (anecdote) => {
    const votedAnecdote = {...anecdote, votes: anecdote.votes + 1}
    voteAnecdoteMutation.mutate({ votedAnecdote })
    console.log(anecdote)
    notificationDispatch({type:'VOTE', payload: anecdote.content})
    setTimeout(() => {
      notificationDispatch({type: 'RESET'})
    }, 5000)
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
