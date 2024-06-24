import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = (event) => {
    event.preventDefault()
    handleLogin(username, password)
  }

  return (
    <div>
      <form onSubmit={ login }>
        <label htmlFor="username" className="login-label">Username:</label>
        <input
          id="username"
          type="text"
          value={ username }
          onChange={({ target }) => setUsername(target.value)}
        />
        <br />
        <label htmlFor="password" className="login-label">Password: </label>
        <input
          type="password"
          name=""
          id="password"
          value={ password }
          onChange={({ target }) => setPassword(target.value)}
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
}

export default LoginForm