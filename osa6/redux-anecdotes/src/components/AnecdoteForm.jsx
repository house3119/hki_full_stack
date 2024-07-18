import { useDispatch } from "react-redux"
import { addAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleNew = (event) => {
    event.preventDefault()
    dispatch(addAnecdote(event.target.anecdoteInput.value))
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