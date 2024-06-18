import { useState, useEffect, useRef } from 'react'
import AddBlogForm from './components/AddBlogForm'
import Login from './components/Login'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const addBlogFormTogglableRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      blogService.getAll().then(blogs => setBlogs(blogs))
    }
  }, [])

  const setMessage = (message, type) => {
    if (type === 'error') {
      setErrorMessage(message)
    } else if (type === 'success') {
      setSuccessMessage(message)
    }

    setTimeout(() => {
      setErrorMessage(null)
      setSuccessMessage(null)
    }, 2000);
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    const response = await loginService.login(username, password)
    if (response.status === 200) {
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(response.data)
      ) 
      await blogService.setToken(response.data.token)
      setUser(response.data)
      setUsername('')
      setPassword('')
      setBlogs(await blogService.getAll())
    } else {
      setMessage('Invalid Username and/or Password', 'error')
    }
  }

  const addNewBlog = async (event) => {
    event.preventDefault()
    if (newBlogTitle === '' || newBlogUrl === '') {
      setMessage('Blog title and URL are required', 'error')
      return
    }

    const result = await blogService.postNew({
      'title': newBlogTitle,
      'author': newBlogAuthor,
      'url': newBlogUrl
    })

    if (result.status === 201) {
      setBlogs(await blogService.getAll())
      setMessage('Blog added', 'success')
      setNewBlogTitle('')
      setNewBlogAuthor('')
      setNewBlogUrl('')
      addBlogFormTogglableRef.current.toggleVisibility()
    } else {
      console.log(result.status)
      console.log(result.message)
    }
  } 

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')

    setUser(null)
    setBlogs([])
    setNewBlogAuthor('')
    setNewBlogTitle('')
    setNewBlogUrl('')
  }



  return (
    <div>
      <h1>Blog App</h1>
      <div className={errorMessage? 'blog-error-text': ''}>
        {errorMessage}
      </div>
      <div className={successMessage? 'blog-success-text': ''}>
        {successMessage}
      </div>
      

      
      {!user &&
        <Login
          handleLogin={handleLogin}
          username={username}
          password={password}
          handleUsernameChange={({target}) => setUsername(target.value)}
          handlePasswordChange={({target}) => setPassword(target.value)}
        />
      }

      {user &&
        <div>
          <button onClick={ handleLogout }>Log Out</button>

          <h2>Logged in as { user.username }</h2>

          {blogs.map(blog => <p key={blog.id}>{blog.title} - {blog.author? blog.author : 'No Author'}</p>)}

          <Togglable buttonLabel='Add new blog' ref={ addBlogFormTogglableRef }>
            <AddBlogForm
              addNewBlog={ addNewBlog }
              newBlogTitle={newBlogTitle}
              newBlogAuthor={newBlogAuthor}
              newBlogUrl={newBlogUrl}
              handleTitleChange={({target}) => setNewBlogTitle(target.value)}
              handleAuthorChange={({target}) => setNewBlogAuthor(target.value)}
              handleUrlChange={({target}) => setNewBlogUrl(target.value)}
            />
          </Togglable>

        </div>
      }
      
    </div>
  )
}

export default App