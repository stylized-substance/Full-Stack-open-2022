import React, { Component } from 'react';

const Part = (parts) => {
  console.log(parts)
  return (
    <p>
    {parts.name} {parts.exercises}
    </p>
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

const Total = (parts) => {
  return (
      <p>
      {parts.parts[0].exercises + parts.parts[1].exercises + parts.parts[2].exercises}
      </p>
  )
}

// Root component

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using parts to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App;