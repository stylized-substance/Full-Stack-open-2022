
import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const FilterForm = () => {
  const dispatch = useDispatch()

  const handleFilterChange = (event) => {
    event.preventDefault()
    dispatch(filterChange(event.target.value))
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      <h2>
        Filter
      </h2>
      <form>
        <input onChange={handleFilterChange} />
      </form>
    </div>
  )
}

export default FilterForm