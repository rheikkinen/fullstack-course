import axios, { AxiosError } from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => {
  return axios.get(baseUrl).then(response => response.data)
}

export const createAnecdote = anecdote => {
  if (anecdote.content.length < 5) {
    return Promise.reject('Anecdote must be minimum of 5 characters long.')
  }
  return axios.post(baseUrl, anecdote).then(response => response.data)
}

export const updateAnecdote = updatedAnecdote => {
  return axios
    .put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote)
    .then(response => response.data)
}
