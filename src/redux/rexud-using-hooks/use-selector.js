import { useContext } from 'react';
import reduxContext from './provider';

const useSelector = (selectorFunc) => {
  const {state} = useContext(reduxContext)
  return selectorFunc(state)
}

export default useSelector;
