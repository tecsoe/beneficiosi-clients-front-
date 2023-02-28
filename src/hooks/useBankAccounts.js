import { useEffect, useState } from 'react';
import useAxios from './useAxios';

const useBankAccounts = ({ options, axiosConfig } = {}) => {

  const [{ data, error, loading }, getBankAccounts] = useAxios({ url: '/bank-accounts', ...axiosConfig }, options);

  const [bankAccounts, setBankAccounts] = useState([])

  const [total, setTotal] = useState(0);

  const [size, setSize] = useState(0);

  const [numberOfPages, setNumberOfPages] = useState(0);

  useEffect(() => {
    if (data) {
      setBankAccounts(data.results);
      setTotal(data.total);
      setSize(data.size);
      setNumberOfPages(data.numberOfPages);
    }

  }, [data, loading, error]);

  return [{ bankAccounts, total, numberOfPages, size, error, loading }, getBankAccounts];
};

export default useBankAccounts;
