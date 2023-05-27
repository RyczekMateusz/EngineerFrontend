import React from 'react'

const PageWithError = () => {
  throw new Error('I crashed!')
  const handleClick = () => {
    throw new Error('I crashed!')
  }

  return (
    <div>
      <button type="button" onClick={handleClick}>
        Click for error
      </button>
    </div>
  )
}

export default PageWithError
