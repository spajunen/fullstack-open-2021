import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const addBlog = async (blogObject) => {

    try {
      blogFormRef.current.toggleVisibility()
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      setMessage('new blog created')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (e){
      setMessage('error creating blog')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

  const loginForm = () => (
    <LoginForm
      handleLogin={handleLogin}
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
    />
  )
  const blogForm = () => (
    <Togglable buttonLabel="new note" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const addLikeOf = id => {
    const blog = blogs.find(b => b.id === id)
    const changedBlog = { ...blog, likes: blog.likes + 1 }

    blogService
      .update(id, changedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      })
      // eslint-disable-next-line no-unused-vars
      .catch(error => {
        setMessage(
          `Note '${blog.title}' was already removed from server`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }

  const removeBlog = async (id, title) => {
    if (window.confirm(`Remove ${title}`)) {
      try {
        await blogService.remove(id)
        setBlogs(blogs.filter(blog => blog.id !== id))
        setMessage('blog removed')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      } catch (e) {
        setMessage('error removing blog')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }
    }

  }

  const sortedBlogs = blogs.sort(function(a,b){
    return b.likes - a.likes
  })

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={message} />
      <div>
        {user === null ?
          loginForm()
          :
          <div>
            <p>{user.name} logged in </p>
            <p><button onClick={handleLogout}>Logout</button></p>
            {blogForm()}
            <h2>blogs</h2>
            {sortedBlogs.map(blog =>
              <Blog key={blog.id} blog={blog} user={user} addLike={() => addLikeOf(blog.id)} removeBlog={removeBlog}/>
            )}
          </div>
        }
      </div></div>
  )
}

export default App