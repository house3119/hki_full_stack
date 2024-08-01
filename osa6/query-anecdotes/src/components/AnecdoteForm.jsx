import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addAnecdote } from "../../requests"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: addAnecdote,
    onSuccess: () => {
      console.log('success')
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
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
