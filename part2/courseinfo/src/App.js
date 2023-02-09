import React from 'react';

const Course = ({ header, courses }) => {
  console.log(header);
  return (
    <div>
      <Header content={header} />
      {courses.map(course =>
        <div>
          <h2>
            {course.name}
          </h2>
          <ul>
            {course.parts.map(part =>
              <li key={part.id}>
                {part.name} {part.exercises}
              </li>
            )}
          </ul>
          <b>Total number of exercises </b>
          {course.parts.reduce((accumulator, obj) => accumulator + obj.exercises, 0)}
        </div>
      )}
    </div>
  )
}

const Header = ({ content }) => {
  return (
    <div>
      <h1>
        {content}
      </h1>
    </div>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part =>
        <Part name={part.name} exercises={part.exercises} />
      )}
    </div>
  )
}

const Part = ({ name, exercises }) => {
  return (
    <p>
    {name} {exercises}
    </p>
  )
}

const App = () => {
  const firstHeader = 'Web development curriculum'
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return <Course header={firstHeader} courses={courses} />
}

export default App;