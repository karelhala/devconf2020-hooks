import React from 'react'
import { useDispatch } from '../rexud-using-hooks'
import useSelector from '../rexud-using-hooks/use-selector'

const ChildComponent = () => {
  const dispatch = useDispatch()
  const count = useSelector(({ count }) => count)
  return (
    <div>
      <h1>
        I am first child component {count}
      </h1>
      <div>
        <button onClick={() => dispatch({type: 'increment'})}>Increment</button>
      </div>
    </div>
  )
}

export default ChildComponent;
