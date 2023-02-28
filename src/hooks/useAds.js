import { useEffect, useState } from 'react';
import useAxios from './useAxios';

const useAds = ({ options, axiosConfig } = {}) => {

  const [{ data, error, loading }, getAds] = useAxios({ url: '/ads', ...axiosConfig }, options);

  const [ads, setAds] = useState([])

  const [total, setTotal] = useState(0);

  const [size, setSize] = useState(0);

  const [numberOfPages, setNumberOfPages] = useState(0);

  useEffect(() => {
    if (data) {
      setAds(data.results);
      setTotal(data.total);
      setSize(data.size);
      setNumberOfPages(data.numberOfPages);
    }

  }, [data, loading, error]);

  return [{ ads, total, numberOfPages, size, error, loading }, getAds];
};

export default useAds;
