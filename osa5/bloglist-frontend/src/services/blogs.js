import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.get(baseUrl, config)
  return response.data
}

const postNew = async (data) => {
  const config = {
    headers: { Authorization: token },
  }
  
  try {
    const response = await axios.post(baseUrl, data, config)
    return {"status": response.status, "message": "Created"}
  } catch(err) {
    return {"status": err.response.status, "message": err.response.data}
  }
  
}

export default { getAll, setToken, postNew }