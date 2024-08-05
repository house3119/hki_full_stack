import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addAnecdote } from "../../requests"
import NotificationContext from "../context/NotificationContext"
import { useContext } from "react"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const [notification, dispatch] = useContext(NotificationContext)

  const newAnecdoteMutation = useMutation({
    mutationFn: addAnecdote,
    onSuccess: () => {
      setMessage('Added new anecdote succesfully!')
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError: () => {
      setMessage('Error! New anecdote must be at least 5 characters long.')
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')

    newAnecdoteMutation.mutate({
      content: content,
      id: Math.floor(Math.random() * 100000).toString(),
      votes: 0
    })
  }

  const setMessage = (message) => {
    dispatch({ type:'CHANGE', payload: message })
    setTimeout(() => dispatch({ type:'HIDE' }), 5000)
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
