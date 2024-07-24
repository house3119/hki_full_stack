import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

export const getId = () => (100000 * Math.random()).toFixed(0)

/*const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}*/

const sortByVotes = (listOfAnecdoteObjects) => {
  return listOfAnecdoteObjects.sort(
    (a, b) => {
      return (b.votes - a.votes)
    }
  )
}

const anecdoteSlice = createSlice({
  name: 'anecdoteState',
  initialState: [],
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
      return state.concat(action.payload)
    },
    setAnecdotes(state, action) {
      return sortByVotes(action.payload)
    }
  }
})

export const { voteAnecdote, addAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export default anecdoteSlice.reducer