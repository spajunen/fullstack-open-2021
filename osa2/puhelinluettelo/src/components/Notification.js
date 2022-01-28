import React from "react"

const Notification = ({ success, error, setErrorMessage }) => {

    if (success === '' && error === '') {
      return null
    }else if (success !== ''){
        return (
            <div className="success">
              {success}
            </div>
          )
    }else if (error !== '') {
        setTimeout(() => {
            setErrorMessage('')
          }, 5000)
        return (
            <div className="error">
            {error}
          </div>
        )
    }
  
 
  }

  export default Notification