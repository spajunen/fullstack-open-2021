import React from 'react'

const Persons = ({person, removePerson}) => {

  return(
    <ul>
        <li >{person.name} {person.number} <button onClick={() => removePerson(person)}>delete</button></li>
    </ul>
  )
  
}

export default Persons