import { useEffect, useState } from 'react';
import useAxios from './useAxios';

const useAdsPositions = ({ options, axiosConfig } = {}) => {

  const [{ data, error, loading }, getAdsPositions] = useAxios({ url: '/ads-positions', ...axiosConfig }, options);

  const [adsPositions, setAdsPositions] = useState([])

  const [total, setTotal] = useState(0);

  const [size, setSize] = useState(0);

  const [numberOfPages, setNumberOfPages] = useState(0);

  useEffect(() => {
    if (data) {
      setAdsPositions(data.results);
      setTotal(data.total);
      setSize(data.size);
      setNumberOfPages(data.numberOfPages);
    }

  }, [data, loading, error]);

  return [{ adsPositions, total, numberOfPages, size, error, loading }, getAdsPositions];
};

export default useAdsPositions;
