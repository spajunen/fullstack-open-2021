import React from 'react'

const Persons = ({rows}) => {

  return(
    <ul>{rows()}</ul>
  )
  
}

export default Persons