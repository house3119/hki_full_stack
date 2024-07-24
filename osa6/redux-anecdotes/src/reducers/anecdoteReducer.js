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
    addAnecdote(state, action) {
      return state.concat(action.payload)
    },
    setAnecdotes(state, action) {
      return sortByVotes(action.payload)
    },
    updateAnecdote(state, action) {
      return sortByVotes(state.map(anec => anec.id === action.payload.id? action.payload : anec))
    }
  }
})

export const { addAnecdote, setAnecdotes, updateAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const newAnecdote = content => {
  return async dispatch => {
    const freshAnecdote = await anecdoteService.addNew(content)
    dispatch(addAnecdote(freshAnecdote))
  }
}

export const voteAnecdotes = anecdote => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.vote(anecdote)
    dispatch(updateAnecdote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer