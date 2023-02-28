import clsx from "clsx";
import { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { generateBackendUrl } from "../helpers/url";
import { FaSearchPlus } from "react-icons/fa";
import { FaSearchMinus } from "react-icons/fa";

const ProductImagesCarousel = ({ images, productName }) => {
  const [swiper, setSwiper] = useState(null);

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const [zoomScale, setZoomScale] = useState(1);

  const isInInitialScale = zoomScale === 1;

  return <div className="hidden md:block">
    <div className="relative">
      <Swiper
        onSwiper={setSwiper}
        onSlideChange={(swiper) => setActiveSlideIndex(swiper.activeIndex)}
        onZoomChange={(_, scale) => setZoomScale(scale)}
        autoHeight={true}
        zoom={{ maxRatio: 2 }}
      >
        {
          images?.length > 0 &&
          images?.map(image => <SwiperSlide key={image.id}>
            <div className="swiper-zoom-container">
              <img
                src={generateBackendUrl(image.path)}
                alt={productName}
                className="rounded-xl w-full"
              />
            </div>
          </SwiperSlide>)}
      </Swiper>

      {swiper && <button
        type="button"
        className="
          absolute top-0 right-0 z-10
          w-14 h-14 mt-3 mr-3
          inline-flex items-center justify-center
          bg-black bg-opacity-25 hover:bg-opacity-50
          rounded focus:outline-none
        "
        onClick={() => isInInitialScale ? swiper.zoom.in() : swiper.zoom.out()}
      >
        {isInInitialScale
          ? <FaSearchPlus className="text-3xl text-white" />
          : <FaSearchMinus className="text-3xl text-white" />
        }
      </button>}
    </div>

    <div className="flex justify-center mt-6 space-x-3">
      {images?.length > 0 &&
        images?.map((image, i) => <img
          key={image.id}
          src={generateBackendUrl(image.path)}
          alt={productName}
          className={clsx(
            'h-20 w-20 rounded-xl border border-gray-100 rounded shadow hover:shadow-md cursor-pointer',
            activeSlideIndex === i && 'ring-2 ring-blue-300 ring-opacity-75'
          )}
          onClick={() => swiper.slideTo(i)}
        />)}
    </div>
  </div>;
};

export default ProductImagesCarousel;