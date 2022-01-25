import React from 'react'

const Total = ({course}) => {

  const total = course.parts.reduce(
    ( previousValue, currentValue ) => previousValue + currentValue.exercises,
    0
  )

  return (
    <div>
      <h4>
      Number of exercises {total}
      </h4>
    </div>
  )
}

export default Total