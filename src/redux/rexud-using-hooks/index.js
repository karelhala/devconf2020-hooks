import React, {useReducer} from 'react'
import reduxContext from './provider';
export { default as reduxContext } from './provider'
export { default as useDispatch } from './use-dispatch'

export const Store = ({ reducer, initialState, children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
  <reduxContext.Provider value={{
    dispatch,
    state
  }}>
    {children}
  </reduxContext.Provider>
)}
