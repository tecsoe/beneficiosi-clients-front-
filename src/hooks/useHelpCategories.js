import { useEffect, useState } from 'react';
import useAxios from './useAxios';

const useHelpsCategories = ({ options, ...axiosConfig } = {}) => {

  const [{ data, error, loading }, getHelpsCategories] = useAxios({ url: '/help-categories', ...axiosConfig }, { useCache: false, ...options });

  const [helpsCategories, setHelpsCategories] = useState([]);
  const [total, setTotal] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);

  useEffect(() => {
    if (data) {
      setHelpsCategories(data.results);
      setTotal(data.total);
      setNumberOfPages(data.numberOfPages)
    }
  }, [data]);

  return [{ helpsCategories, total, numberOfPages, error, loading }, getHelpsCategories];
};

export default useHelpsCategories;
