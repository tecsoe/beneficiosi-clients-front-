import { useEffect, useState } from 'react';
import useAxios from './useAxios';

const useBankAccountsPurpose = ({ options, axiosConfig } = {}) => {

  const [{ data, error, loading }, getBankAccountsPurpose] = useAxios({ url: '/bank-account-purposes', ...axiosConfig }, options);

  const [bankAccountsPurpose, setBankAccountsPurpose] = useState([])

  const [total, setTotal] = useState(0);

  const [size, setSize] = useState(0);

  const [numberOfPages, setNumberOfPages] = useState(0);

  useEffect(() => {
    if (data) {
      setBankAccountsPurpose(data.results);
      setTotal(data.total);
      setSize(data.size);
      setNumberOfPages(data.numberOfPages);
    }

  }, [data, loading, error]);

  return [{ bankAccountsPurpose, total, numberOfPages, size, error, loading }, getBankAccountsPurpose];
};

export default useBankAccountsPurpose;
