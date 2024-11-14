import { useSelector, useDispatch } from 'react-redux'
import { incrementVote } from '../reducers/anecdoteReducer'

const Anecdote = ({anecdote, onClick}) => {
    return (
        <div>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={onClick}>vote</button>
          </div>
        </div>
    )
}
const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase())))

    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(incrementVote(id))
      }
    
    return (
        <>
        <h2>create new</h2>
        {[...anecdotes].sort((a, b) => b.votes - a.votes).map(anecdote =>
            <Anecdote key={anecdote.id} anecdote={anecdote} onClick={() => vote(anecdote.id)}/>
        )}
        </>
    )
    
}
  
export default AnecdoteList