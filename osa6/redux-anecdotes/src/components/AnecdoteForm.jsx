import { useDispatch } from "react-redux"
import { newAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const add = (event) => {
    event.preventDefault()
    dispatch(newAnecdote(event.target.anecdoteInput.value))
    event.target.anecdoteInput.value = ''
  }

  return (
    <form onSubmit={add}>
      <div><input name="anecdoteInput"/></div>
      <button type='submit'>create</button>
    </form>
  )
}

export default AnecdoteForm