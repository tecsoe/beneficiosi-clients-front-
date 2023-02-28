import { useEffect, useState } from "react";
import useNews from "../hooks/useNews";
import { Swiper, SwiperSlide } from "swiper/react";

const StoresNewsPosts = ({ storeId }) => {
  const [actualNews, setActualNews] = useState([]);

  const [filters, setFilters] = useState({
    page: 1,
    storeId: "",
  });

  const [{ news, numberOfPages, error, loading }, getNews] = useNews({
    params: {
      ...filters,
    },
  });

  useEffect(() => {
    setActualNews((oldActualNews) => {
      return [...oldActualNews, ...news];
    });
  }, [news]);

  useEffect(() => {
    setActualNews([]);
    setFilters((oldFilters) => {
      return {
        ...oldFilters,
        storeId: storeId,
      };
    });
  }, [storeId]);

  useEffect(() => {
    getNews({
      params: {
        ...filters,
      },
    });
  }, [filters]);

  const handleEnd = (e) => {
    if (filters?.page < numberOfPages && actualNews.length > 0) {
      setFilters((oldFilters) => {
        return {
          ...oldFilters,
          page: oldFilters?.page + 1,
        };
      });
    }
  };

  return (
    <div className="px-8">
      {loading && actualNews?.length === 0 ? (
        <div className="text-center mt-10 text-3xl text-gray-500">
          Obteniendo noticias
        </div>
      ) : actualNews?.length > 0 ? (
        <>
          {storeId && (
            <h1 className="text-center mt-10 text-3xl text-gray-500">
              Boletín de noticias
            </h1>
          )}
          <Swiper
            slidesPerView={
              window.innerWidth > 768
                ? actualNews?.length > 7
                  ? 7
                  : actualNews?.length
                : 2
            }
            navigation
            style={{ padding: "50px 30px" }}
            onReachEnd={handleEnd}
          >
            {actualNews.map((newPost, i) => {
              return (
                <SwiperSlide key={i}>
                  <a
                    href={newPost?.redirectUrl}
                    target="_blank"
                    className="transform transition duration-500 hover:-translate-y-2 block"
                  >
                    <div
                      className="rounded-xl shadow-2xl relative overflow-hidden"
                      style={{ height: 200, width: 130 }}
                    >
                      <img
                        className="rounded-xl"
                        style={{ height: "100%", width: "100%" }}
                        src={`${process.env.REACT_APP_API_URL}/${newPost?.imgPath}`}
                      />
                      <div
                        className="absolute flex text-white text-xl text-center"
                        style={{
                          background: "rgba(0,0,0, .3)",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        <div className="m-auto">{newPost?.title}</div>
                      </div>
                    </div>
                  </a>
                  <div className="mt-4 text-center" style={{ width: 130 }}>
                    {newPost?.store?.storeProfile?.logo ? (
                      <a
                        href={`/stores/${newPost?.store?.slug}`}
                        target="_blank"
                      >
                        <img
                          className="w-10 h-10 m-auto rounded"
                          src={`${process.env.REACT_APP_API_URL}/${newPost?.store?.storeProfile?.logo}`}
                        />
                        <span>{newPost?.store?.name}</span>
                      </a>
                    ) : (
                      <a>{newPost?.store?.name}</a>
                    )}
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </>
      ) : (
        null
      )}
    </div>
  );
};

export default StoresNewsPosts;
