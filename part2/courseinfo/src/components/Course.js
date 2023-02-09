import React from 'react';

const Course = ({ header, courses }) => {
    console.log(courses);
    return (
      <div>
      <Header content={header} />
      {courses.map(course =>
        <Content name={course.name} parts={course.parts} />
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
        {parts.map(part =>
          <Part name={part.name} exercises={part.exercises} id={part.id} />
        )}
        </ul>
        <b>Total number of exercises </b>
        {parts.reduce((accumulator, obj) => accumulator + obj.exercises, 0)}
      </div>
    )
  }
  
  const Part = ({ name, exercises, id }) => {
    return (
      <li key={id}>
        {name} {exercises}
      </li>
    )
  }

  export default Course