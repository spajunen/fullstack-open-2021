import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'Blog title example',
  author: 'Some Author',
  url: 'www.something.fi',
  likes: 3,
  user: {
    username: 'some'
  }
}
const user = {
  username: 'some'
}

describe('<Blog />', () => {
  let container

  beforeEach(() => {
    container = render(
      <Blog blog={blog} user={user}></Blog>
    ).container
  })

  test('at start only blog title is displayed', () => {
    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
    const element = screen.getByText('Blog title example')
  })

  test('after clicking the button, rest are displayed', () => {
    const button = screen.getByText('view')
    userEvent.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

})

test('clicking the button twice calls event handler twice', async () => {

  const mockHandler = jest.fn()

  render(
    <Blog blog={blog} user={user} addLike={mockHandler}></Blog>
  )
  const button = screen.getByText('like')
  userEvent.click(button)
  userEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)

})

test('renders title but not author, url or likes', () => {

  render(<Blog blog={blog} user={user}/>)
  screen.debug()

  const element = screen.getByText('Blog title example')
  expect(element).toBeDefined()
})