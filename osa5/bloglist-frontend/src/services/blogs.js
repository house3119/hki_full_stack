import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.get(baseUrl, config)
  const dataSortedByLikesDesc = response.data.sort(
    (a, b) => {
      return (b.likes - a.likes)
    }
  )
  return dataSortedByLikesDesc
}

const postNew = async (data) => {
  const config = {
    headers: { Authorization: token }
  }

  try {
    const response = await axios.post(baseUrl, data, config)
    return { 'status': response.status, 'message': 'Created' }
  } catch(err) {
    return { 'status': err.response.status, 'message': err.response.data }
  }

}

const like = async(data) => {
  const config = {
    headers: { Authorization: token }
  }

  const updatedData = {
    id: data.id,
    title: data.title,
    author: data.author,
    likes: data.likes + 1,
    url: data.url,
    user: data.user.id
  }

  try {
    const response = await axios.put(`${baseUrl}/${data.id}`, updatedData, config)
    return { 'status': response.status, 'message': 'Updated' }
  } catch(err) {
    return { 'status': err.response.status, 'message': err.response.data }
  }
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token }
  }

  try {
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return { 'status': response.status, 'message': 'Removed' }
  } catch(err) {
    return { 'status': err.response.status, 'message': err.response.data }
  }

}

export default { getAll, setToken, postNew, like, remove }