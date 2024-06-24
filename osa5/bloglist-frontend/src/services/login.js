import axios from 'axios'
const baseUrl = '/api/login'

const login = async (username, password) => {
  const headers = {
    'Content-Type': 'application/json'
  }

  try {
    const response = await axios.post(baseUrl, {
      username: username,
      password: password
    }, headers)
    return response

  } catch(err) {
    return err.response
  }

}

export default { login }