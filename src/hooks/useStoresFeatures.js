import { useEffect, useState } from 'react';
import useAxios from './useAxios';

const useStoreFeatures = ({ options, axiosConfig } = {}) => {
  const [{ data, error, loading }, getStoreFeatures] = useAxios({ url: '/store-features', ...axiosConfig }, options);

  const [storeFeatures, setStoreFeatures] = useState([])

  const [total, setTotal] = useState(0);

  const [size, setSize] = useState(0);

  const [numberOfPages, setNumberOfPages] = useState(0);

  useEffect(() => {
    if (data) {
      setStoreFeatures(data.results);
      setTotal(data.total);
      setSize(data.size);
      setNumberOfPages(data.numberOfPages);
    }

  }, [data, loading, error]);

  return [{ storeFeatures, total, numberOfPages, size, error, loading }, getStoreFeatures];
};

export default useStoreFeatures;
