const Hello = () => {
  return (
    <div>
      <p>Hello world</p>
    </div>
  )
}

const App = () => {
  return (
    <div>
      <h1>Greetings</h1>

      <Hello />
      <Jou />
    </div>
  )
}

const Jou = () => {
  return (
    <div>
      <p>
        Marko
      </p>
      <br />
    </div>
  )
}

export default App