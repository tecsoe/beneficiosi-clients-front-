import { Swiper, SwiperSlide } from 'swiper/react';
import banner1 from '../assets/images/banner.jpg';
import banner2 from '../assets/images/banner2.jpg';

const HomeSlider = ({ banners }) => {

  return <Swiper
    navigation
    autoplay
    pagination={{ clickable: true }}
    onSlideChange={() => { }}
    onSwiper={(swiper) => { }}
  >
    {
      banners.map((banner, i) => {
        return (
          <SwiperSlide key={banner.id}>
            <a href={banner.url} target="_blank" rel="noreferrer">
              <img
                src={`${process.env.REACT_APP_API_URL}/${banner.imgPath}`}
                alt={`banner-${banner?.store?.name}-${i}`}
                className="h-72 w-full"
              />
            </a>
          </SwiperSlide>
        )
      })
    }
    <SwiperSlide>
      <img
        src={banner1}
        alt=""
        className="h-72 w-full"
      />
    </SwiperSlide>
    <SwiperSlide>
      <img
        src={banner2}
        alt=""
        className="h-72 w-full"
      />
    </SwiperSlide>
  </Swiper>;
};

export default HomeSlider;