import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'
import { setNotification } from '../reducers/notificationReducer'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    /*createAnecdote(state, action) {
      //state.push(asObject(action.payload))
      state.push(action.payload)
    incrementVote(state, action) {
        const {id} = action.payload
        return state.map(anecdote => anecdote.id === id ? { ...anecdote, votes: anecdote.votes + 1 } : anecdote) 
      },
    },*/
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      state = action.payload
      return state
    },
    updateAnecdotes(state, action) {
      return state.map(anecdote => anecdote.id === action.payload.id ? action.payload : anecdote)
    }
  }
})

/*export const incrementVote = (id) => {
  return {
      type: 'VOTE',
      payload: {
        id: id
      }
  }
}

export const createAnecdote = (anecdote) => {
  return {
    type: 'NEW_ANECDOTE',
    payload: asObject(anecdote)
  }
}

const anecdoteReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'VOTE':
      const id = action.payload.id
      const anecdoteToVote = state.find(anecdote => anecdote.id === id)
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      return state.map(anecdote => anecdote.id === id ? votedAnecdote : anecdote)
    case 'NEW_ANECDOTE':
      return [...state, action.payload]
    default:
      return state
  }
}*/

export const { appendAnecdote, setAnecdotes, updateAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdoteFromBackend = await anecdoteService.createNewAnecdoteOnBackend(content)
    dispatch(appendAnecdote(newAnecdoteFromBackend))
  }
}

export const incrementVote = (id) => {
  return async (dispatch, getState) => {
    const anecdote = getState().anecdotes.find(anecdote => anecdote.id === id)
    console.log(getState().anecdotes)
    const anecdoteFromBackend = await anecdoteService.updateAnecdoteOnBackend({
      ...anecdote,
      votes: anecdote.votes + 1
    })
    dispatch(updateAnecdotes(anecdoteFromBackend))
    dispatch(setNotification(`you voted ${anecdote.content}`, 10))
  }
}

export default anecdoteSlice.reducer