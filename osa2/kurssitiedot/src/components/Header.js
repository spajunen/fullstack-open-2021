import React from 'react'

const Header = ({course}) => {
  return (
    <div>
      <h2>
        {course.name}
      </h2>
    </div>
  )
}

export default Header