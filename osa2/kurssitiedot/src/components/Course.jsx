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

export default Course