import React from 'react'

const BlogForm = (props) => (
    <form onSubmit={props.addBlog}>
      <div>
      title
      <input
        value={props.title}
        name="title"
        onChange={({ target }) => props.setTitle(target.value)}
      /></div>
      <div>
      author
      <input
        value={props.author}
        name="author"
        onChange={({ target }) => props.setAuthor(target.value)}
      /></div>
      <div>
      url
      <input
        value={props.url}
        name="url"
        onChange={({ target }) => props.setUrl(target.value)}
      /></div>
      <button type="submit">create</button>
    </form>  
  )

  export default BlogForm
