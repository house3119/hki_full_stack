import { useDispatch } from "react-redux"
import { changeNote, hideNote } from "../reducers/noteReducer"
import { newAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleNew = (event) => {
    event.preventDefault()
    dispatch(newAnecdote(event.target.anecdoteInput.value))
    dispatch(changeNote(`ADDED: ${event.target.anecdoteInput.value}!`))
    setTimeout(() => {dispatch(hideNote())}, 5000)
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