import { useState } from 'react'

const renderRemovebutton = (blog, user, removeBlog) => {
  if (blog.user !== null) {
    if (user !== null) {
      if (blog.user.username === user.username) {
        return <button onClick={() => removeBlog(blog.id, blog.title)}>remove</button>
      }
    }
  }
}

const Blog = ({ blog, user, addLike, removeBlog }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {blog.title} <button onClick={toggleVisibility}>hide</button><br/>
        {blog.url} <br/>
        likes {blog.likes} <button onClick={addLike}>like</button><br/>
        {blog.author} <br/>
        {renderRemovebutton(blog, user, removeBlog)}
      </div>
    </div>
  )
}

export default Blog