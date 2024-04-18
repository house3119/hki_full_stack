import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import NumberList from './components/NumberList'
import Notification from './components/Notification'
import phonebookService from './services/phonebookService'
import './index.css'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterApplied, setFilterApplied] = useState(false)
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState({'message': null})

  useEffect(() => {
    phonebookService
      .getAllPersons()
      .then(allPersons => setPersons(allPersons))
      .catch(() => console.log('error connecting to db'))
  }, [])

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
      if (confirm(`${newName} already exist in the phonebook. Wanna update the number?`)) {
        const personToUpdate = persons.find(person => person.name.toLowerCase() === newName)
        phonebookService
          .updateNumber(personToUpdate, newNumber)
          .then((res) => {
            setMessage({'message': `${res.name}'s number updated!`})
            setTimeout(() => {
              setMessage({'message': null})
            }, 3000);
            phonebookService
              .getAllPersons()
              .then(response => {
                setPersons(response)
                setNewName('')
                setNewNumber('')
              })
          }).catch(() => {
            setMessage({
              'message': `Person ${personToUpdate.name} has already been removed from the phonebook`,
              'type': 'notification-fail'
            })
            setTimeout(() => {
              setMessage({'message': null})
            }, 3000);
            phonebookService
            .getAllPersons()
            .then(response => {
              setPersons(response)
              setNewName('')
              setNewNumber('')
            })
          })
      }      
    } else {
      
      //phonebookService
        //.getCurrentId()
        //.then(res => {
          //current = res.current

          const personObject = {
            name: newName,
            number: newNumber
            //id: ''
          }
  
          phonebookService
            .addNewPerson(personObject)
            .then(newPerson => {
              setMessage({'message': `${newPerson.name} added to the phonebook!`})
              setTimeout(() => {
                setMessage({'message': null})
              }, 3000);
              setPersons(persons.concat(newPerson))
            })

          //phonebookService
            //.incrementId(current)
      
      //.catch(error => console.log(error))

      setNewName('')
      setNewNumber('')
    }
  }

  const handleDelete = (id) => {
    if (!window.confirm(`Really remove ${persons.find(person => person.id === id).name}?`)) {
      return
    }
    const personToBeDeleted = (persons.find(person => person.id === id))

    phonebookService
      .deletePerson(id)
      .then(() => {
        setMessage({'message': `${personToBeDeleted.name} removed from the phonebook!`})
        setTimeout(() => {
          setMessage({'message': null})
        }, 3000);
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error => console.log(error))
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
      <Notification message={message.message} style={message.type? message.type : null} />
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
      <NumberList personsToShow={personsToShow} handleDelete={handleDelete}/>
    </div>
  )
}

export default App