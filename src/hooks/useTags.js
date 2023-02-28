import { useEffect, useState } from 'react';
import useAxios from './useAxios';

const useTags = ({ options, ...axiosConfig } = {}) => {

  const [{ data, error, loading }, getTags] = useAxios({ url: '/tags', ...axiosConfig }, { useCache: false, ...options });

  const [tags, setTags] = useState([]);
  const [total, setTotal] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [size, setSize] = useState(0);

  useEffect(() => {
    if (data) {
      setTags(data.results);
      setTotal(data.total);
      setNumberOfPages(data.numberOfPages);
      setSize(data.size);
    }
  }, [data]);

  return [{ tags, total, size, numberOfPages, error, loading }, getTags];
};

export default useTags;
