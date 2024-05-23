import { useState } from 'react'

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>

const MostVoted = ({ anecdote, votes }) => (
  <>
    <p>{anecdote}</p>
    <p>Has {votes} Votes</p>
  </>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ]

  const [selected, setSelected] = useState(0);
  const [anecdotesVotes, setAnecdotesVotes] = useState(Array(anecdotes.length).fill(0))
  const [anecdoteMostVoted, setAnecdoteMostVoted] = useState()

  const handleNext = () => {
    const random = Math.floor(Math.random() * (anecdotes.length - 1))
    setSelected(random)
  }
  const handleVote = () => {
    const copyVotes = [ ...anecdotesVotes ]
    copyVotes[selected] += 1
    setAnecdotesVotes(copyVotes)
    setAnecdoteMostVoted(findMostVoted(copyVotes))
  }
  const findMostVoted = (copyVotes) => {
    return copyVotes.findIndex(x => x === Math.max(...copyVotes))
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>Has {anecdotesVotes[selected]} votes</p>
      <Button onClick={handleVote} text="Vote" />
      <Button onClick={handleNext} text="Next anecdote" />
      <h1>Anecdote with most votes</h1>
      {anecdoteMostVoted != undefined ?
        <MostVoted
          anecdote={anecdotes[anecdoteMostVoted]}
          votes={anecdotesVotes[anecdoteMostVoted]}
        />
        :
        <p>The are not votes</p>
      }
    </div>
  )
}

export default App
