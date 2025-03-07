// redux-anecdotes/src/components/AnecdoteList.jsx
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'


const Anecdote = ({ anecdote, vote }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)
    if (filter === 'ALL') return sortedAnecdotes
    return sortedAnecdotes.filter(anecdote => 
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )
  })

  const vote = (id) => {
    dispatch(voteAnecdote(id))
    dispatch(setNotification(`Voted for anecdote with id ${id}`))
    setTimeout(() => dispatch(clearNotification()), 5000)
  }

  return (
    <div>
      {anecdotes.map(anecdote => (
        <Anecdote key={anecdote.id} anecdote={anecdote} vote={vote} />
      ))}
    </div>
  )
}

export default AnecdoteList