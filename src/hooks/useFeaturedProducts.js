import { useEffect, useState } from 'react';
import useAxios from './useAxios';

const useFeaturedProducts = ({ options, ...axiosConfig } = {}) => {

  const [{ data, error, loading }, getFeaturedProducts] = useAxios({ url: '/featured-ads', ...axiosConfig }, { useCache: false, ...options });

  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [size, setSize] = useState(0);

  useEffect(() => {
    if (data) {
      setFeaturedProducts(data.results);
      setTotal(data.total);
      setNumberOfPages(data.numberOfPages);
      setSize(data.size);
    }
  }, [data]);

  return [{ featuredProducts, total, size, numberOfPages, error, loading }, getFeaturedProducts];
};

export default useFeaturedProducts;
