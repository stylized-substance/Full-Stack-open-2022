import React, { Component } from 'react';

//Components for part 1, 2 and 3

const Part1 = () => {
  return (
    <div>
      <p>
        Fundamentals of React 10
      </p>
    </div>
  )
}

const Part2 = () => {
  return (
    <div>
      <p>
      Using props to pass data 7
      </p>
    </div>
  )
}

const Part3 = () => {
  return (
    <div>
      <p>
      State of a component 14
      </p>
    </div>
  )
}


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
      <Part1 />
      <Part2 />
      <Part3 />
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
  const course = 'Half stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  

  return (
    <div>
      <Header course={course} />
      <Content />
    </div>
  )
}

export default App;