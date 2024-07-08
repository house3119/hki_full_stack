import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('Rendered Blog component contains correct title', () => {
  const mockFunc = () => {
    console.log('test func')
  }

  render(<Blog
    id='12345'
    title='Test Blog 1'
    author='Test Writer 1'
    url='www.test.org'
    likes={1}
    user='Tepi Testikäyttäjä'
    likeBlog={mockFunc}
    addedByCurrentLoggedInUser='true'
    removeBlog={mockFunc}
  />)

  const element = screen.getByText('Test Blog 1 - by Test Writer 1')
})

test('URL, likes and user are shown correctly after view button clicked', async () => {
  const mockFunction = () => {
    console.log('this is a mock function')
  }

  render(<Blog
    id='12345'
    title='Test Blog 2'
    author='Test Writer 2'
    url='www.test.org'
    likes={1}
    user='Tepi Testikäyttäjä'
    likeBlog={mockFunction}
    addedByCurrentLoggedInUser='true'
    removeBlog={mockFunction}
  />)

  const user = userEvent.setup()
  const button = screen.getByText('View')
  await user.click(button)

  const urlElement = screen.getByText('Url: www.test.org')
  const likesElement = screen.getByText('Likes: 1')
  const userElement = screen.getByText('User: Tepi Testikäyttäjä')

})