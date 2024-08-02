import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, voteAnecdote } from '../requests'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import NotificationContext from './context/NotificationContext'

const App = () => {
  const [notification, dispatch] = useContext(NotificationContext)

  const voteAnecdoteMutation = useMutation({
     mutationFn: voteAnecdote,
  })

  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes++})
    dispatch({ type:'CHANGE', payload:`Voted: ${anecdote.content}` })
    setTimeout(() => dispatch({ type:'HIDE' }), 5000)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 3
  })
  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isError) {
    return <div>Error connecting to server.</div>
  }
  else if (result.isLoading) {
    return <div>Loading data...</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification content={"Yo"}/>
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
