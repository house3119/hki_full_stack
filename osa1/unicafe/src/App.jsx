import { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button text="Good" clickAction={() => setGood(good + 1)} />
      <Button text="Neutral" clickAction={() => setNeutral(neutral + 1)} />
      <Button text="Bad" clickAction={() => setBad(bad + 1)} />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const Button = ({clickAction, text}) => <button onClick={clickAction}>{text}</button>

const Statistics = ({good, neutral, bad}) => {
  let total = good + neutral + bad

  let average = "-"
  let positive = "-"
  if (total != 0) {
    average = (good + bad * (-1)) / total
    positive = (good / total * 100) + "%"
  } else {
    return <div>No feedback given</div>
  }

  return (
    <div>
      <table>
        <StatisticLine name="Good" value={good} />
        <StatisticLine name="Neutral" value={neutral} />
        <StatisticLine name="Bad" value={bad} />
        <StatisticLine name="Total" value={total} />
        <StatisticLine name="Average" value={average} />
        <StatisticLine name="Positive" value={positive} />
      </table>
    </div>
  )
}

const StatisticLine = ({name, value}) => <tr><td>{name}</td><td>{value}</td></tr>

export default App