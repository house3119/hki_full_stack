import { render, screen } from '@testing-library/react'
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