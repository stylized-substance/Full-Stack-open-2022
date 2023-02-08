import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const Course = ({ course }) => {
  console.log(course.parts.reduce(function (acc, obj) {return acc, obj.exercises}, 0));
  return (
    <div>
      <h1>
        {course.name}
      </h1>
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
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
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
      }
    ]
  }

  return <Course course={course} />
}

export default App;