import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { changeNote, hideNote } from '../reducers/noteReducer'

const AnecdoteList = () => {
  // Get filter from store
  const filterApplied = useSelector(state => state.filter).toLowerCase()

  // Get anecdotes from store and then filter them
  let anecdotes = useSelector(state => state.anecdotes)
  anecdotes = anecdotes.filter(anec => anec.content.toLowerCase().includes(filterApplied))

  const dispatch = useDispatch()
  
  const handleVote = (id) => {
    dispatch(voteAnecdote(id))
    dispatch(changeNote(`VOTED: ${anecdotes.find(anec => anec.id === id).content}!`))
    setTimeout(() => {
      dispatch(hideNote())
    }, 5000)
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList