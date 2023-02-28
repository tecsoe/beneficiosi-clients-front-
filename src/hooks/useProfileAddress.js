import { useEffect, useState } from 'react';
import useAxios from './useAxios';

const useProfileAddress = ({ options, axiosConfig } = {}) => {
  const [{ data, error, loading }, getProfileAddress] = useAxios({ url: '/profile/addresses', ...axiosConfig }, options);

  const [profileAddress, setProfileAddress] = useState([])

  const [total, setTotal] = useState(0);

  const [size, setSize] = useState(0);

  const [numberOfPages, setNumberOfPages] = useState(0);

  useEffect(() => {
    if (data) {
      setProfileAddress(data.results);
      setTotal(data.total);
      setSize(data.size);
      setNumberOfPages(data.numberOfPages);
    }

  }, [data, loading, error]);

  return [{ profileAddress, total, numberOfPages, size, error, loading }, getProfileAddress];
};

export default useProfileAddress;
