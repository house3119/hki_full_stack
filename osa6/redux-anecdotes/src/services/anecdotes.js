import axios from 'axios'
import { getId } from '../reducers/anecdoteReducer'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addNew = async (anecdote) => {
  const response = await axios.post(baseUrl, {
    content: anecdote,
    id: getId(),
    votes: 0
  })
  return response.data
}

const vote = async (anecdoteObject) => {
  const response = await axios.put(`${baseUrl}/${anecdoteObject.id}`, {
    content: anecdoteObject.content,
    id: anecdoteObject.id,
    votes: anecdoteObject.votes + 1
  })
  return response.data
}

export default { getAll, addNew, vote }