import { useDispatch } from "react-redux"
import { addAnecdote } from "../reducers/anecdoteReducer"
import { changeNote, hideNote } from "../reducers/noteReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  
  const handleNew = (event) => {
    event.preventDefault()
    dispatch(addAnecdote(event.target.anecdoteInput.value))
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