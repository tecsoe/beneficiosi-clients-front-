import { useEffect, useState } from 'react';
import useAxios from './useAxios';

const useStoreAds = ({ options, axiosConfig } = {}) => {
  const [{ data, error, loading }, getStoreAds] = useAxios({ url: '/store-ads', ...axiosConfig }, options);

  const [storeAds, setStoreAds] = useState([])

  const [total, setTotal] = useState(0);

  const [size, setSize] = useState(0);

  const [numberOfPages, setNumberOfPages] = useState(0);

  useEffect(() => {
    if (data) {
      setStoreAds(data.results);
      setTotal(data.total);
      setSize(data.size);
      setNumberOfPages(data.numberOfPages);
    }

  }, [data, loading, error]);

  return [{ storeAds, total, numberOfPages, size, error, loading }, getStoreAds];
};

export default useStoreAds;
