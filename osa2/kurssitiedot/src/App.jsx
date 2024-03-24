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

  return (
    <div>
      {courses.map(course => <Course course={course}/>)}
    </div>
  )
}

const Course = ({ course }) => {
  console.log(course)
  return (
    <div>
      <Header header = {course.name} />
      <Content parts = {course.parts} />
    </div>
  )
}

const Header = ({ header }) => <h1>{header}</h1>

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => <Part
        key = {part.id}
        partName = {part.name}
        partExercises = {part.exercises}
      />)}
      <Total exercisesList={parts.map(part => part.exercises)}/>
    </div>
  )
}

const Part = ({ partName, partExercises }) => <p>{partName} {partExercises}</p>

const Total = ({ exercisesList }) => {
  const start = 0

  const total = exercisesList.reduce(
    (summa, edellinen) => summa + edellinen, start
  )

  return <p><b>Total of {total} exercises</b></p>
}

export default App