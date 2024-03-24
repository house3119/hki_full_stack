const App = () => {
  const course1 = {
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
      }
    ]
  }

  return (
    <div>
      <Course course = {course1} />
    </div>
  )
}

const Course = ({ course }) => {
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
    </div>
  )
}

const Part = ({ partName, partExercises }) => <p>{partName} {partExercises}</p>

export default App