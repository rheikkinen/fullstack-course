import { useEffect, useState } from 'react'
import personService from './services/persons'
import { Notification } from './components/Notification'

const PersonForm = (props) => {
	return (
		<form onSubmit={props.submitFunction}>
			<div>
				<p>
					Name:<br></br>
					<input value={props.name}
						onChange={props.nameHandler} />
				</p>
			</div>
			<div>
				<p>
					Number: <br></br>
					<input value={props.number}
						onChange={props.numberHandler} />
				</p>
			</div>
			<div>
				<button type='submit'>add</button>
			</div>
		</form>
	)
}

const Person = ({ person, deletePerson }) => {
	return (
		<>
			<tr>
				<td>{person.name}</td>
				<td>{person.number}</td>
				<td>
					<button onClick={deletePerson}>delete</button>
				</td>
			</tr>
		</>
	)
}

const PersonList = ({ persons, deletePerson }) => {
	return (
		<div>
			<table>
				<tbody>
					{persons.map(person =>
						<Person key={person.name} person={person} deletePerson={() => deletePerson(person.id)} />
					)}
				</tbody>
			</table>
		</div>
	)
}

const Filter = ({ filter, handleFilterChange }) => {
	return (
		<div>
			Filter with <input value={filter}
				onChange={handleFilterChange} />
		</div>
	)
}

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [nameFilter, setNameFilter] = useState('')
	const [notification, setNotification] = useState(null)

	useEffect(() => {
		personService
			.getAll()
			.then(initialPersons => {
				setPersons(initialPersons)
			})
	}, [])

	const addPerson = (event) => {
		event.preventDefault()

		if (persons.map(person => person.name).includes(newName)) {
			if (window.confirm(
				`${newName} is already added to the phonebook. Replace the old number with the new one?`
			)) {
				const person = persons.find(p => p.name === newName)
				const updatedPerson = { ...person, number: newNumber }
				const id = person.id

				personService
					.update(id, updatedPerson)
					.then((returnedPerson) => {
						setPersons(persons.map(person => person.id !== id
							? person
							: returnedPerson
						))
						setNewName('')
						setNewNumber('')
					})
					.finally(() => {
						setNotification(
							{
								type: 'success',
								message: `Phone number of ${person.name} was updated succesfully!`
							}
						)
						setTimeout(() => {
							setNotification(null)
						}, 5000)
					})
			}
		} else {
			const personObject = {
				name: newName,
				number: newNumber
			}

			personService
				.create(personObject)
				.then(returnedPerson => {
					setPersons(persons.concat(returnedPerson))
					setNewName('')
					setNewNumber('')
				})
				.finally(() => {
					setNotification({
						type: 'success',
						message: `Added ${personObject.name} to the phonebook!`
					})
					setTimeout(() => {
						setNotification(null)
					}, 5000)
				})
				.catch(error => {
					setNotification({
						type: 'error',
						message: error.response.data.error
					})
					setTimeout(() => {
						setNotification(null)
					}, 5000)
				})
		}
	}

	const deletePerson = (id) => {
		const person = persons.find(p => p.id === id)

		if (window.confirm(
			`Do you really want to delete ${person.name} from the phonebook?`
		)) {
			personService
				.remove(id)
				.then(
					setPersons(persons.filter(person => person.id !== id))
				)
				.finally(() => {
					setNotification(
						{
							type: 'success',
							message: `${person.name} was deleted succesfully!`
						}
					)
					setTimeout(() => {
						setNotification(null)
					}, 5000)
				}
				)
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

			<Notification notification={notification} />

			<h2>Add new</h2>

			<PersonForm submitFunction={addPerson}
				name={newName}
				nameHandler={handleNameChange}
				number={newNumber}
				numberHandler={handleNumberChange} />

			<h2>Numbers</h2>

			<Filter filter={nameFilter}
				handleFilterChange={handleFilterChange} />

			<PersonList persons={personsToShow} deletePerson={deletePerson} />
		</div>
	)
}

export default App