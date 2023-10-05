import { useField } from '../hooks'

const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
  }

  const resetForm = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  const margins = {
    marginRight: 5,
    marginTop: 5,
    marginBottom: 10
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button style={margins}>create</button>
        <button style={margins} type='button' onClick={resetForm}>reset</button>
      </form>


    </div>
  )

}

export default CreateNew
