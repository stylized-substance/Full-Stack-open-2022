import React from 'react';

const Course = ({ courses }) => {
  console.log(courses);
  return (
    <div>
      <h1>
        Web development curriculum
      </h1>
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

const Header = (course) => {
  return (
    <div>
      <h1>{course.course}</h1>
    </div>
  )
}

const Content = (parts) => {
  return (
    <div>
      <Part name={parts.parts[0].name} exercises={parts.parts[0].exercises} />
      <Part name={parts.parts[1].name} exercises={parts.parts[1].exercises} />
      <Part name={parts.parts[2].name} exercises={parts.parts[2].exercises} />
    </div>
  )
}

const Part = (parts) => {
  console.log(parts)
  return (
    <p>
    {parts.name} {parts.exercises}
    </p>
  )
}

const App = () => {
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

  return <Course courses={courses} />
}

export default App;