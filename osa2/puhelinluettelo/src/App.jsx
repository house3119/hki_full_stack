import { useState } from 'react'

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

  const hanleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    if (event.target.value == '') {
      setFilterApplied(false)
    } else {
      setFilterApplied(true)
      setFilter(event.target.value)
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

  function handleClick(event) {
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

  return (
    <div>
      <h1>Phonebook</h1>
      <h2>Filter</h2>
      <form>
        <div>
          Filter<input onChange={handleFilter}/>
        </div>
      </form>
      <h2>Add new</h2>
      <form>
        <div>
          Name: <input onChange={handleNameChange} value={newName} />
        </div>
        <div>
          Number: <input onChange={hanleNumberChange} value={newNumber} />
        </div>
        <div>
          <button type="submit" onClick={handleClick}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map(person =>
        <Number
          name = {person.name}
          key = {person.name}
          number = {person.number}
        />
      )}
    </div>
  )
}

const Number = ({ name, key, number }) => <p key={key}>{name} {number}</p>

export default App