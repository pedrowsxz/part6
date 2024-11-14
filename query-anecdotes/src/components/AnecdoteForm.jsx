import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useContext } from 'react'
import NotificationContext from './NotificationContext'

const AnecdoteForm = () => {

  const queryClient = useQueryClient()
  
  const [notification, notificationDispatch] = useContext(NotificationContext)

  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdote, 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError: (error) => {
      if (error.response.status === 400) {
        notificationDispatch({ type: 'ERROR', payload: { message: error.response.data.error } })
      } else {
        notificationDispatch({ type: 'ERROR', payload: { message: 'An error ocurred' } })
      }
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    if (content.length >= 5) {
      newAnecdoteMutation.mutate({ content: content, votes: 0 },
        {
          onSuccess: () => {
            notificationDispatch({ type: 'CREATE', payload: { content: content }})
          }
        }
      )
    } else {
      notificationDispatch({ type: 'ERROR', payload: { message: 'too short anecdote, must have length 5 or more' }})
    }
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
