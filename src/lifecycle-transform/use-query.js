import { useLocation } from 'react-router-dom';

const useQuery = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  return {
    breed: query.get('breed'),
    subBreed: query.get('sub-breed'),
  }
};

export default useQuery;