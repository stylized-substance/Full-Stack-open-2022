import React from 'react';

const Course = ({ header, courses }) => {
  return (
    <div>
      <Header content={header} />
      {courses.map((course) =>
        <Content name={course.name} parts={course.parts} key={course.id} />
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

const Content = ({ name, parts }) => {
  return (
    <div>
      <h2>
        {name}
      </h2>
      <ul>
        {parts.map((part) =>
          <Part name={part.name} exercises={part.exercises} key={part.id} />
        )}
      </ul>
      <b>Total number of exercises </b>
      {parts.reduce((accumulator, obj) => accumulator + obj.exercises, 0)}
    </div>
  )
}

const Part = ({ name, exercises}) => {
  return (
    <li>
      {name} {exercises}
    </li>
  )
}

export default Course