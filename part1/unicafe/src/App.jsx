import { useState } from 'react'

const StatisticLine = ({ text, value }) => (
  <tbody>
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  </tbody>
)

const Statistics = ({ good, neutral, bad, all, average, positive }) => (
  all > 0 ?
    <>
      <h1>Statistics</h1>
      <table>
        <StatisticLine text="Good" value={good} />
        <StatisticLine text="Neutral" value={neutral} />
        <StatisticLine text="Bad" value={bad} />
        <StatisticLine text="Average" value={average} />
        <StatisticLine text="Positive" value={`${positive} %`} />
      </table>
    </>
    :
    <>
      <p>No feedback given</p>
    </>
)

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGood = () => {
    const newGood = good + 1
    setGood(newGood)
    const newAll = all + 1
    setAll(newAll)
    setAverage(calculateAverage(newGood, bad, newAll))
    setPositive(calculatePositive(newGood, newAll))
  }
  const handleNeutral = () => {
    setNeutral(neutral + 1)
    const newAll = all + 1
    setAll(newAll)
    setAverage(calculateAverage(good, bad, newAll))
    setPositive(calculatePositive(good, newAll))
  }
  const handleBad = () => {
    const newBad = bad + 1
    setBad(newBad)
    const newAll = all + 1
    setAll(newAll)
    setAverage(calculateAverage(good, newBad, newAll))
    setPositive(calculatePositive(good, newAll))
  }
  const calculateAverage = (good, bad, all) => {
    return (good + (bad * -1)) / all 
  }
  const calculatePositive = (good, all) => {
    return (good * 100) / all
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button text="Good" onClick={handleGood} />
      <Button text="Neutral" onClick={handleNeutral} />
      <Button text="Bad" onClick={handleBad} />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      />
    </div>
  )
}

export default App
