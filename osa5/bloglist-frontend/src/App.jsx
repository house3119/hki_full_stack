import { useState, useEffect, useRef } from 'react'
import AddBlogForm from './components/AddBlogForm'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const addBlogFormTogglableRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      blogService.getAll().then(blogs => {
        setBlogs(blogs)
      }).catch(() => {
        logout()
      })
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
    }, 2000)
  }

  const handleLogin = async (username, password) => {
    const response = await loginService.login(username, password)
    if (response.status === 200) {
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(response.data)
      )
      await blogService.setToken(response.data.token)
      setUser(response.data)
      setBlogs(await blogService.getAll())
    } else {
      setMessage('Invalid Username and/or Password', 'error')
    }
  }

  const addNewBlog = async ( blogDataObject ) => {
    if (blogDataObject.title === '' || blogDataObject.url === '') {
      setMessage('Blog title and URL are required', 'error')
      return
    }

    const result = await blogService.postNew(blogDataObject)

    if (result.status === 201) {
      setBlogs(await blogService.getAll())
      setMessage('Blog added', 'success')
      addBlogFormTogglableRef.current.toggleVisibility()
      return blogDataObject

    } else {
      console.log(result.status, result.message)
    }
  }

  const likeBlog = async (id) => {
    const response = await blogService.like(blogs.find(blog => blog.id === id))

    if (response.status === 200) {
      setBlogs(await blogService.getAll())
    } else {
      setMessage('Error occurred', 'error')
    }
  }

  const removeBlog = async (id) => {
    const response = await blogService.remove(id)

    if (response.status === 204) {
      setBlogs(await blogService.getAll())
      setMessage('Blog removed', 'success')
    } else {
      setMessage('Error removing blog', 'error')
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')

    setUser(null)
    setBlogs([])
  }

  const logout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    setBlogs([])
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
        <LoginForm handleLogin={ handleLogin } />
      }

      {user &&
        <div>
          <button onClick={ handleLogout }>Log Out</button>

          <h2>Logged in as { user.username }</h2>

          {blogs.map(blog =>
            <Blog
              key={blog.id}
              id={blog.id}
              title={blog.title}
              author={blog.author}
              url={blog.url}
              likes={blog.likes}
              user={blog.user.username}
              likeBlog={likeBlog}
              addedByCurrentLoggedInUser={blog.user.username === user.username? 'true' : 'false'}
              removeBlog={removeBlog}
            />
          )}

          <Togglable buttonLabel='Add new blog' ref={ addBlogFormTogglableRef }>
            <AddBlogForm addNewBlog={ addNewBlog } />
          </Togglable>
        </div>
      }

    </div>
  )
}

export default App