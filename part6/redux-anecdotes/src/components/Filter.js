import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const filterStyle = {
    marginBottom: '10px'
  }

  return (
    <div style={filterStyle}>
      Filter: <input onChange={(e) => dispatch(setFilter(e.target.value))} />
    </div>
  )
}

export default Filter