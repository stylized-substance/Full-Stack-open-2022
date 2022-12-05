import React, { Component } from 'react';

// New components

const Header = (header) => {
  return (
    <div>
      <h1>{header.course}</h1>
    </div>
  )
}

const Content = (content) => {
  console.log(content)
  return (
    <div>
      {content.parts}
    </div>
  )
}

const Total = (total) => {
  return (
    <div>
      <p>
        Number of exercises {total.exercises1 + total.exercises2 + total.exercises3}
      </p>
    </div>
  )
}

// Root component

const App = () => {
  const course = {
    name: 'Half stack application development',
    parts: [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
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
      <Header course={course} />
      <Content parts={parts}/>
      <Total parts={parts} />
    </div>
  )
}

export default App;