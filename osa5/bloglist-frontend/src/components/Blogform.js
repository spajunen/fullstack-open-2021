import { useState } from 'react'

const BlogForm = ({ createBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }


  return (
    <div>
      <h2>Add a new blog</h2>
      <form onSubmit={addBlog}>
        <div>
      title
          <input
            value={title}
            name="title"
            onChange={handleTitleChange}
          /></div>
        <div>
      author
          <input
            value={author}
            name="author"
            onChange={handleAuthorChange}
          /></div>
        <div>
      url
          <input
            value={url}
            name="url"
            onChange={handleUrlChange}
          /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
