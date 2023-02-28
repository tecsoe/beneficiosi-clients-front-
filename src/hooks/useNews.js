import { useEffect, useState } from 'react';
import useAxios from './useAxios';

const useNews = ({ options, axiosConfig } = {}) => {
  const [{ data, error, loading }, getNews] = useAxios({ url: '/news', ...axiosConfig }, options);

  const [news, setNews] = useState([])

  const [total, setTotal] = useState(0);

  const [size, setSize] = useState(0);

  const [numberOfPages, setNumberOfPages] = useState(0);

  useEffect(() => {
    if (data) {
      setNews(data.results);
      setTotal(data.total);
      setSize(data.size);
      setNumberOfPages(data.numberOfPages);
    }

  }, [data, loading, error]);

  return [{ news, total, numberOfPages, size, error, loading }, getNews];
};

export default useNews;
