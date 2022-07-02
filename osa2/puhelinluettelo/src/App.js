import { useEffect, useState } from 'react'
import axios from 'axios'

const PersonForm = (props) => {
  return (
    <form onSubmit={props.submitFunction}>
      <div>
        Name: <input value={props.name}
                    onChange={props.nameHandler}/>
      </div>
      <div>
        Number: <input value={props.number}
                      onChange={props.numberHandler}/>
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  )
}

const Person = ({ person }) => {
  return (
    <p>{person.name}: {person.number}</p>
  )
}

const PersonList = ({ persons }) => {
  return (
    <div>
      {persons.map(person =>
        <Person key={person.name} person={person} />
      )}
    </div>
  )
}

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      Filter with <input value={filter}
                         onChange={handleFilterChange}/>
    </div>
  )
}

const App = () => {
  console.log('aloitetaan renderöinti...')
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()

    const nameObject = {
      name: newName,
      number: newNumber
    }

    if (persons.map(person => person.name).includes(newName)) {
      alert(`${newName} is already added to the phonebook`)
    } else {
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNameFilter(event.target.value)
  }

  const personsToShow = (nameFilter === '')
    ? persons
    : persons.filter(person => 
        person.name
        .toLowerCase()
        .includes(nameFilter.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      
      <h2>Add new</h2>

      <PersonForm submitFunction={addPerson}
                  name={newName}
                  nameHandler={handleNameChange}
                  number={newNumber}
                  numberHandler={handleNumberChange}/>

      <h2>Numbers</h2>
      
      <Filter filter={nameFilter} 
              handleFilterChange={handleFilterChange}/>
      
      <PersonList persons={personsToShow} />
    </div>
  )
}

export default App