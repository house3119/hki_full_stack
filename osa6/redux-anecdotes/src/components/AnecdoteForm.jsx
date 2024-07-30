import { useDispatch } from "react-redux"
import { newAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/noteReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleNew = (event) => {
    event.preventDefault()
    dispatch(newAnecdote(event.target.anecdoteInput.value))
    dispatch(setNotification(`ADDED: ${event.target.anecdoteInput.value}!`, 2))
    event.target.anecdoteInput.value = ''
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleNew}>
        <div><input name="anecdoteInput"/></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm