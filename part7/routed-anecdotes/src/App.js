import { useState } from 'react'
import { useField } from './hooks/index'
import {
  BrowserRouter as Router,
  Routes, Route, Link, useParams, useNavigate
} from 'react-router-dom'

const Menu = ({anecdotes, addNew, setNotification}) => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Router>
        <div>
          <Link style={padding} to='/anecdotes'>anecdotes</Link>
          <Link style={padding} to='/create'>create new</Link>
          <Link style={padding} to='/about'>about</Link>
        </div>
        <Routes>
          <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />} />
          <Route path='/anecdotes' element={<AnecdoteList anecdotes={anecdotes} />} />
          <Route path='/anecdotes/:id' element={<Anecdote anecdotes={anecdotes} />} />
          <Route path='/create' element={<CreateNew addNew={addNew} setNotification={setNotification}/>} />
          <Route path='/about' element={<About />} />
        </Routes>
      </Router>
    </div>
  )
}

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id
  const anecdote = anecdotes.find(anecdote => anecdote.id === Number(id))
  const url = anecdote.info
  return (
    <div>
      <h2>
        {anecdote.content} by {anecdote.author}
      </h2>
      <div>
        Has {anecdote.votes} votes
      </div>
      <br />
      <div>
        For more info see
        <br />
        <a href={url}>
          {url}
        </a>
      </div>
      <br />
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => {
  return (
    <div>
      <h2>Anecdotes</h2>
        <ul>
          {anecdotes.map(anecdote => 
            <li key={anecdote.id}>
              <Link to={`/anecdotes/${anecdote.id}`}>
                {anecdote.content}
              </Link>
            </li>
          )}
        </ul>
    </div>
  )
}  

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const content = useField('content')
  const author = useField('author')
  const info = useField('info')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    navigate('/')
  }

  const resetFields = () => {
    contentReset()
    authorReset()
    infoReset()
  }

  const { reset: contentReset, ...contentNoReset } = content
  const { reset: authorReset, ...authorNoReset } = author
  const { reset: infoReset, ...infoNoReset } = info

  console.log('contentReset:', contentReset, 'contentNoReset', contentNoReset);

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...contentNoReset} />
        </div>
        <div>
          author
          <input {...authorNoReset} />
        </div>
        <div>
          url for more info
          <input {...infoNoReset} />
        </div>
        <button>create</button>
      </form>
      <button onClick={resetFields}>reset</button>
    </div>
  )
}

const Notification = ({ notification}) => {
  console.log('notification', notification)
  return (
    <div>
      <h2>
        {notification}
      </h2>
    </div>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])


  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`Anecdote "${anecdote.content}" created`)
    setTimeout(() => {
      setNotification(null)
      }, 5000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }


  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu anecdotes={anecdotes} addNew={addNew} setNotification={setNotification} />
      <Notification notification={notification} />
      <Footer />
    </div>
  )
}

export default App
