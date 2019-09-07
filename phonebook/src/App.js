import React, { useState, useEffect } from 'react'
import getId from './NameChecker'
import Contacts from './Contacts'
import personService from './services/persons'
import indexFinder from './IdIndexFinder'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    personService.getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const id = getId(persons, newName)
    if (id === -1) {
      personService.create({ name: newName, number: newNumber })
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
    } else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        updatePerson(id, newName, newNumber)
      }
    }
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService.remove(id)
        .then(response => {
          if (response.status === 200) {
            const newPersons = []
            for (const person of persons) {// eslint-disable-line no-unused-vars
              if (person.id !== id) {
                newPersons.push(person)
              }
            }
            setPersons(newPersons)
          }
        })
    }
  }

  const updatePerson = (id, newName, newNumber) => {
    const newObject = { name: newName, number: newNumber }
    personService.update(id, newObject)
      .then(response => {
        if (response.status === 200) {
          const newPersons = [...persons]
          newPersons[indexFinder(newPersons, id)] = response.data
          setPersons(newPersons)
        }
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with: <input value={newFilter} onChange={handleFilterChange} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Contacts persons={persons} filter={newFilter} deletePerson={deletePerson} />
    </div>
  )
}

export default App