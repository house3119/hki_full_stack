import { createSlice } from "@reduxjs/toolkit"

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const sortByVotes = (listOfAnecdoteObjects) => {
  return listOfAnecdoteObjects.sort(
    (a, b) => {
      return (b.votes - a.votes)
    }
  )
}

const anecdoteSlice = createSlice({
  name: 'anecdoteState',
  initialState: anecdotesAtStart.map(asObject),
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload
      const updatedAnecdote = state.find(anec => anec.id === id)
      updatedAnecdote.votes += 1
      //console.log(JSON.parse(JSON.stringify(sortByVotes(state))))
      //console.log(sortByVotes(state))
      state.map(anec => anec.id !== id? anec : updatedAnecdote)
      sortByVotes(state)
    },
    addAnecdote(state, action) {
      return state.concat(asObject(action.payload))
    }
  }
})

export const { voteAnecdote, addAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer