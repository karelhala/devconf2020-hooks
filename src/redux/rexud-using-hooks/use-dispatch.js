import { useContext } from 'react';
import reduxContext from './provider';

const useDispatch = () => {
  const {dispatch} = useContext(reduxContext)
  return dispatch
}

export default useDispatch;
