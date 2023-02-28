import { useEffect, useState } from 'react';
import useAxios from './useAxios';

const useStores = ({ options, ...axiosConfig } = {}) => {

  const [{ data, error, loading }, getStores] = useAxios({ url: '/stores', ...axiosConfig }, { useCache: false, ...options });

  const [stores, setStores] = useState([]);
  const [total, setTotal] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [size, setSize] = useState(0);

  useEffect(() => {
    if (data) {
      setStores(data.results);
      setTotal(data.total);
      setNumberOfPages(data.numberOfPages);
      setSize(data.size);
    }
  }, [data]);

  return [{ stores, total, size, numberOfPages, error, loading }, getStores];
};

export default useStores;
