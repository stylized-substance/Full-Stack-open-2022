import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'TestTitle',
    author: 'TestAuthor',
    url: 'TestUrl',
    likes: 1,
    user: {
      username: 'TestUser'
    }
  }

  const { container } = render(<Blog blog={blog} />)

  const title = container.querySelector('.title')
  const author = container.querySelector('.author')
  const url = container.querySelector('.url')
  const likes = container.querySelector('.likes')

  expect(title).toHaveTextContent('TestTitle')
  expect(author).toHaveTextContent('TestAuthor')
  expect(url).not.toBeIntheDocument()
  expect(likes).not.toBeIntheDocument()

  // const elements = [
  // "const title = screen.getByText('TestTitle')",
  // "const author = screen.getByText('TestAuthor')'",
  // "const url = screen.getByText('TestUrl')",
  // "const likes = screen.getByText('1')"
  // ]
  
  // screen.debug()

  // elements.forEach((element => expect(element).toBeDefined()))
  


})