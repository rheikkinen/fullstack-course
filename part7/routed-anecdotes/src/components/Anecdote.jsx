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
      {anecdote.info &&
        <p>For more info see: <br />
          <a href={anecdote.info.includes('//')
            ? anecdote.info
            : `//${anecdote.info}`}
            target='_blank'
            rel='noreferrer'>
            {anecdote.info}
          </a>
        </p>
      }
    </div>
  )
}

export default Anecdote