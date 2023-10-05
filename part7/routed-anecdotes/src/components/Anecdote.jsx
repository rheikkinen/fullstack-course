const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>{anecdote.content}</h2>
      {anecdote.author &&
        <h3>
          <em>
            by {anecdote.author}
          </em>
        </h3>
      }
      <p>has {anecdote.votes} votes</p>
    </div>
  )
}

export default Anecdote