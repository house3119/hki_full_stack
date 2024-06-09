import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      blogService.getAll().then(blogs => setBlogs(blogs))
    }
  }, [])

  const setError = (error) => {
    setErrorMessage(error)
    setTimeout(() => {
      setErrorMessage('')
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
      setError('Invalid Username and/or Password')
    }
  }

  const addNewBlog = async (event) => {
    event.preventDefault()
    if (newBlogTitle === '' || newBlogUrl === '') {
      setError('Blog Name and URL required')
      return
    }

    const result = await blogService.postNew({
      'title': newBlogTitle,
      'author': newBlogAuthor,
      'url': newBlogUrl
    })

    if (result.status === 201) {
      setBlogs(await blogService.getAll())
      setNewBlogAuthor('')
      setNewBlogTitle('')
      setNewBlogUrl('')
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
      {errorMessage}

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
          <button onClick={handleLogout}>Log Out</button>
          <h2>Logged in as {user.username}</h2>
          {blogs.map(blog => <p key={blog.id}>{blog.title} - {blog.author? blog.author : 'No Author'}</p>)}

          <h2>Add New Blog</h2>
          <form onSubmit={addNewBlog}>
            <label htmlFor="new-blog-title">Title</label>
            <input type="text" id="new-blog-title" value={newBlogTitle} onChange={({target}) => setNewBlogTitle(target.value)}/>
            <br />
            <label htmlFor="new-blog-author">Author</label>
            <input type="text" id="new-blog-author" value={newBlogAuthor}  onChange={({target}) => setNewBlogAuthor(target.value)}/>
            <br />
            <label htmlFor="new-blog-url">Url</label>
            <input type="text" id="new-blog-url" value={newBlogUrl}  onChange={({target}) => setNewBlogUrl(target.value)}/>
            <br />
            <button type="submit">Add Blog</button>
          </form>
          <br />
        </div>
      }
      
    </div>
  )
}

export default App