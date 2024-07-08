import { render, screen } from '@testing-library/react'
import { beforeEach, expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

// Render same test Blog before each test
beforeEach(() => {

})


test('Rendered Blog component contains correct title', () => {
  const likeMockHandler = vi.fn()
  const removeMockHandler = vi.fn()
  render(<Blog
    id='12345'
    title='Test Blog 1'
    author='Test Writer 1'
    url='www.test.org'
    likes={1}
    user='Tepi Testikäyttäjä'
    likeBlog={likeMockHandler}
    addedByCurrentLoggedInUser='true'
    removeBlog={removeMockHandler}
  />)

  const element = screen.getByText('Test Blog 1 - by Test Writer 1')
})


test('URL, likes and user are shown correctly after view button clicked', async () => {
  const likeMockHandler = vi.fn()
  const removeMockHandler = vi.fn()
  render(<Blog
    id='12345'
    title='Test Blog 1'
    author='Test Writer 1'
    url='www.test.org'
    likes={1}
    user='Tepi Testikäyttäjä'
    likeBlog={likeMockHandler}
    addedByCurrentLoggedInUser='true'
    removeBlog={removeMockHandler}
  />)

  const user = userEvent.setup()
  const button = screen.getByText('View')
  await user.click(button)

  const urlElement = screen.getByText('Url: www.test.org')
  const likesElement = screen.getByText('Likes: 1')
  const userElement = screen.getByText('User: Tepi Testikäyttäjä')
})


test('If Like button is clicked twice, mock Handler is called 2 times', async () => {
  const likeMockHandler = vi.fn()
  const removeMockHandler = vi.fn()
  render(<Blog
    id='12345'
    title='Test Blog 1'
    author='Test Writer 1'
    url='www.test.org'
    likes={1}
    user='Tepi Testikäyttäjä'
    likeBlog={likeMockHandler}
    addedByCurrentLoggedInUser='true'
    removeBlog={removeMockHandler}
  />)

  const user = userEvent.setup()

  let button = screen.getByText('View')
  await user.click(button)

  button = screen.getByText('Like')
  await user.click(button)
  await user.click(button)

  expect(likeMockHandler.mock.calls).toHaveLength(2)
})