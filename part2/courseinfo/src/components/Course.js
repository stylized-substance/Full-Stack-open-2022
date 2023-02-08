const Course = ({ courses }) => {
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