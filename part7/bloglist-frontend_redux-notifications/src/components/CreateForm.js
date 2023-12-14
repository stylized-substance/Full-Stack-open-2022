import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const CreateForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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
      <br></br>
      <h2>Create a new blog</h2>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            id="title-input"
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          ></Form.Control>
          <Form.Label>Author</Form.Label>
          <Form.Control
            id="author-input"
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          ></Form.Control>
          <Form.Label>Url</Form.Label>
          <Form.Control
            id="url-input"
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          ></Form.Control>
        </Form.Group>
        <Button size="sm" variant="primary" type="submit" id="submit-button">
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default CreateForm
