import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote: (state, action) => {
      state.push(action.payload)
    },
    update: (state, action) => {
      const changedAnecdote = action.payload
      return state
        .map(anecdote =>
          anecdote.id !== changedAnecdote.id ? anecdote : changedAnecdote
        )
        .sort((a, b) => b.votes - a.votes)
    },
    setAnecdotes: (state, action) => action.payload
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = anecdote => {
  return async dispatch => {
    const changedAnecdote = await anecdoteService.vote(anecdote)
    dispatch(update(changedAnecdote))
  }
}

export const { appendAnecdote, update, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer