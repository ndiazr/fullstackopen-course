import { useState, useEffect } from 'react'

import personService from './services/persons'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const emptyNotification = {
    message: null,
    className: ''
  }
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [search, setSearch] = useState('')
  const [filterPersons, setFilterPersons] = useState([])
  const [notificationInfo, setNotificationInfo] = useState(emptyNotification)

  useEffect(() => {
    personService
      .getAll()
      .then(response =>
        setPersons(response)
      )
  }, [])

  const clearFields = () => {
    setNewName('')
    setNewPhone('')
  }

  const handleSearchChange = (event) => {
    const text = event.target.value
    setSearch(text)
    setFilterPersons(
      persons.filter(person =>
        person.name.toLowerCase().includes(text.toLowerCase())
      )
    )
  }

  const handleNewNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNewPhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const handleAddPerson = (event) => {
    event.preventDefault()
    const exist = persons.find(person => person.name === newName)
    
    if (exist) {
      if (
        window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        updatePerson(exist.id, { ...exist, number: newPhone })
      }
    } else {
      const newObject = {
        name: newName,
        number: newPhone
      }
      personService
        .create(newObject)
        .then(response => {
          setPersons(persons.concat(response))
          setNotificationInfo(
            {
              className: 'success',
              message: `Added ${response.name}`
            }
          )
          setTimeout(() => {
            setNotificationInfo(emptyNotification)
          }, 5000)
          clearFields()
        })
    }
  }

  const updatePerson = (id, changedPerson) => {
    personService
      .update(id, changedPerson)
      .then(response => {
        setPersons(
          persons.map(person => person.id !== id ? person : response)
        )
        setNotificationInfo(
          {
            className: 'success',
            message: `Updated ${response.name}`
          }
        )
        setTimeout(() => {
          setNotificationInfo(emptyNotification)
        }, 5000)
        clearFields()
      })
  }

  const handleDeletePerson = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .remove(person.id)
        .then(response => {
          setPersons(persons.filter(p => p.id !== response.id))
        })
        .catch(error => {
          setNotificationInfo(
            {
              className: 'error',
              message: `Person '${person.name}' was already removed from server`
            }
          )
          setTimeout(() => {
            setNotificationInfo(emptyNotification)
          }, 5000)
          setPersons(persons.filter(p => p.id !== person.id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification info={notificationInfo} />
      <Filter  search={search} handleSearchChange={handleSearchChange} />
      <h3>add a new</h3>
      <PersonForm
        newName={newName}
        newPhone={newPhone}
        handleNewNameChange={handleNewNameChange}
        handleNewPhoneChange={handleNewPhoneChange}
        handleAddPerson={handleAddPerson}
      />
      <h3>Numbers</h3>
      <Persons
        search={search}
        filterPersons={filterPersons}
        persons={persons}
        handleDeletePerson={handleDeletePerson}
      />
    </div>
  )
}

export default App
