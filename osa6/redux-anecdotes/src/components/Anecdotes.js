import { useDispatch, useSelector } from 'react-redux'
import { voteOf } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

const Anecdote = ({anecdote, handleClick}) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return(
    <div style={style}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const Anecdotes = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)

  return(
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <Anecdote
        key={anecdote.id}
        anecdote={anecdote}
        handleClick={() => 
          dispatch(voteOf(anecdote.id)) + dispatch(createNotification(anecdote))}
        />)}
    </div>
  )
}

export default Anecdotes