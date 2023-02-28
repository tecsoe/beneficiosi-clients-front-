import { useEffect, useState } from 'react';
import useAxios from './useAxios';

const useShows = ({ options, axiosConfig } = {}) => {
  const [{ data, error, loading }, getShows] = useAxios({ url: '/shows', ...axiosConfig }, options);

  const [shows, setShows] = useState([])

  const [total, setTotal] = useState(0);

  const [size, setSize] = useState(0);

  const [numberOfPages, setNumberOfPages] = useState(0);

  useEffect(() => {
    if (data) {
      setShows(data.results);
      setTotal(data.total);
      setSize(data.size);
      setNumberOfPages(data.numberOfPages);
    }

  }, [data, loading, error]);

  return [{ shows, total, numberOfPages, size, error, loading }, getShows];
};

export default useShows;
