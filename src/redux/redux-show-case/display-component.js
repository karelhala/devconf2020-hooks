import React from 'react'
import useSelector from '../rexud-using-hooks/use-selector'

const DisplayComponent = () => {
  const count = useSelector(({ count }) => count)
  return (
    <div>
      <h1>
        I am second child component {count}
      </h1>
    </div>
  )
}

export default DisplayComponent;
