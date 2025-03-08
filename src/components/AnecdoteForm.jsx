// redux-anecdotes/src/components/AnecdoteForm.jsx
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'


const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.querySelector('input').value
    event.target.querySelector('input').value = ''
    dispatch(createAnecdote(content))
    dispatch(setNotification(`Created new anecdote "${content}"`))
    setTimeout(() => dispatch(clearNotification()), 5000)
  }

  return (
    <div>
      <h2>Create a new anecdote</h2>
      <form onSubmit={addAnecdote}>
        <div><input /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm