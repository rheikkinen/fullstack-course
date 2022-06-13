import { useState } from "react"

const Anecdote = ({anecdote}) => (
  <div>
    {anecdote}
  </div>
)

const Votes = ({number}) => (
  <div>
    <p>Votes: {number}</p>
  </div>
)

const Button = ({ handleClick, text }) => (
  <div>
    <button onClick={handleClick}>
      {text}
    </button>
  </div>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length))
  
  const GenerateRandom = () => {
    const max = anecdotes.length - 1
    const randomNumber = Math.floor(Math.random() * max)
    setSelected(randomNumber)
  }

  const VoteAnecdote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  const MostVoted = () => {
    const max = Math.max(...votes)
    return votes.indexOf(max)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={anecdotes[selected]} />
      <Votes number={votes[selected]} />
      <table>
        <tbody>
          <tr>
            <td>
              <Button handleClick={VoteAnecdote} text='Vote' />
            </td>
            <td>
              <Button handleClick={GenerateRandom} text='Next anecdote' />
            </td>
          </tr>
          </tbody>
      </table>
      
      <h1>Most popular anecdote</h1>
      <Anecdote anecdote={anecdotes[MostVoted()]} />
      <Votes number={votes[MostVoted()]} />
    </div>
  )
}


export default App
