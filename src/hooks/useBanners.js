import { useEffect, useState } from 'react';
import useAxios from './useAxios';

const useBanners = ({ options, ...axiosConfig } = {}) => {

  const [{ data, error, loading }, getBanners] = useAxios({ url: '/main-banner-ads', ...axiosConfig }, options);

  const [banners, setBanners] = useState([]);
  const [total, setTotal] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [size, setSize] = useState(0);

  useEffect(() => {
    if (data) {
      setBanners(data.results);
      setTotal(data.total);
      setNumberOfPages(data.numberOfPages);
      setSize(data.size);
    }
  }, [data]);

  return [{ banners, size, total, numberOfPages, error, loading }, getBanners];
};

export default useBanners;
