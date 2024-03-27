import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import NumberList from './components/NumberList'


const App = () => {
  const all_persons = [
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]
  const [persons, setPersons] = useState(all_persons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterApplied, setFilterApplied] = useState(false)
  const [filter, setFilter] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    if (event.target.value == '') {
      setFilterApplied(false)
    } else {
      setFilterApplied(true)
    }
    setFilter(event.target.value.toLowerCase())
  }

  const handleClick = (event) => {
    event.preventDefault()
    const nameList = persons.map(person => person.name.toLowerCase())

    if (nameList.includes(newName.toLowerCase())) {
      alert(`Yo man, ${newName} is already added to da phonebook`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const personsToShow = filterApplied
    ? persons.map(person => {
        if (person.name.toLowerCase().includes(filter)) {
          return person
        }
        }).filter((element) => {
          return element
        })
    : persons

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter handleFilter={handleFilter}/>
      <h2>Add new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleClick={handleClick}
      />
      <h2>Numbers</h2>
      <NumberList personsToShow={personsToShow} />
    </div>
  )
}

export default App