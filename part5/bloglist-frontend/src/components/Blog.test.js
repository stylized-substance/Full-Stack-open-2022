import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'TestTitle',
    author: 'TestAuthor',
    url: 'TestUrl',
    user: {
      username: 'TestUser'
    }
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('TestTitle')
  screen.debug()
  expect(element).toBeDefined()
})