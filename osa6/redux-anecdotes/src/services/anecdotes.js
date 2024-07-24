import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addNew = async () => {
  const response = await axios.post(baseUrl)
  return response.data
}

export default { getAll, addNew }