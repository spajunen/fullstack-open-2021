import React, { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Header = ({text}) => (
  <div>
    <h1>{text}</h1>
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
  const votesArray = new Uint8Array(7)
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(votesArray)

  const handleRandomClick = () => {
    const number = Math.floor(Math.random() * 6);
    setSelected(number)
  }

  const handleVoteClick = () => {
    const copy = [...votes]
    copy[selected] += 1   
    setVotes(copy)
  }

  return (
    <div>
      <Header text='Anecdote of the day' />
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button handleClick={handleVoteClick} text='vote' />
      <Button handleClick={handleRandomClick} text='next anecdote' />
      <Header text='Anecdote with most votes' />
      <p>{anecdotes[votes.indexOf(Math.max(...votes))]}</p>
      <p>has {votes[votes.indexOf(Math.max(...votes))]}</p>
    </div>
  )
}

export default App