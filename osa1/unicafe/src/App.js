import { useState } from "react"

const StatisticLine = ({ text, value }) => {
  return (
    <>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </>
  )
}

const Statistics = ({ bad, good, neutral }) => {
  if (good + neutral + bad === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine 
            text="Good" 
            value={good} />
          <StatisticLine 
            text="Neutral" 
            value={neutral} />
          <StatisticLine 
            text="Bad" 
            value={bad} />
          <StatisticLine 
            text="All" 
            value={good + neutral + bad} />
          <StatisticLine 
            text="Average" 
            value={((good - bad) / (good + neutral + bad)).toFixed(2)} />
          <StatisticLine 
            text="Positive" 
            value={(good / (good + neutral + bad)).toFixed(2)} />
        </tbody>
      </table>
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral +1)
  const handleBadClick = () => setBad(bad + 1)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={handleGoodClick} text='Good' />
      <Button handleClick={handleNeutralClick} text='Neutral' />
      <Button handleClick={handleBadClick} text='Bad' />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
