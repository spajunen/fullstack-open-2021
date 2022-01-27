import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const personsToShow = filter.length === 0
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const removePerson = person => {
    if (window.confirm(`Do you want to remove ${person.name}`)) {
      personService
        .remove(person.id)
        .then(() => {
          setPersons(persons.filter(p => person.id !== p.id))
        })
    }
  }

  const addPerson = (event) => {
    event.preventDefault()

    const person = persons.find(p => p.name === newName)
    
    const personObject = {
      name: newName,
      number: newNumber,
    }

    if (person !== undefined){
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with new one?`)) {
        personService
        .update(person.id, personObject)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
        })
        setNewName('')
        setNewNumber('')
      }
    }else{
      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} handleFilterChange={handleFilterChange}/>

      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} 
      newNumber={newNumber} handleNumberChange={handleNumberChange}/>

      <h3>Numbers</h3>
      {personsToShow.map(person=>
        <Persons key={person.id} person={person} removePerson={removePerson} />
        )}
      
    </div>
  )

}

export default App
