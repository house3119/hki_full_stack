import { render, screen } from '@testing-library/react'
import { expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import AddBlogForm from './AddBlogForm'

test('Form calls handler function with correct information when Add Blog button is clicked', async () => {
  const mockHandler = vi.fn()
  const { container } = render(<AddBlogForm
    addNewBlog={mockHandler}
  />)

  const user = userEvent.setup()

  let input = container.querySelector('#new-blog-title')
  await user.type(input, 'Testiotsikko 123')

  input = container.querySelector('#new-blog-author')
  await user.type(input, 'Testiauthor 35')

  input = container.querySelector('#new-blog-url')
  await user.type(input, 'Testi-URL 69')

  const button = screen.getByText('Add Blog')
  await user.click(button)

  expect(mockHandler.mock.calls[0][0].title).toBe('Testiotsikko 123')
  expect(mockHandler.mock.calls[0][0].author).toBe('Testiauthor 35')
  expect(mockHandler.mock.calls[0][0].url).toBe('Testi-URL 69')
})