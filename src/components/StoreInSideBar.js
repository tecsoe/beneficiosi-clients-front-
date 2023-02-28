import { useEffect, useRef } from "react";
import {
  IoArrowForwardOutline,
} from "react-icons/io5";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import reactDom from "react-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import useProducts from "../hooks/useProducts";
import { generateImageUrl } from "../helpers/url";

const StoreInSideBar = (props) => {

  const { onClose, store } = props;

  const { setLoading, setCustomAlert } = useAuth();

  const modalRef = useRef();

  const [{ products, error, loading }, getProducts] = useProducts({
    params: {
      storeId: store?.storeId
    },
    options: {
      manual: true
    }
  });

  useEffect(() => {
    if (store) {
      getProducts({
        params: {
          storeId: store?.storeId,
        }
      })
    }
  }, [store]);

  const handleCloseModal = (e) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  }

  if (!store) {
    return null;
  }

  return reactDom.createPortal(
    <div ref={modalRef} onClick={handleCloseModal} className="fixed h-full w-full bg-black bg-opacity-50 top-0 left-0 z-10 text-white animate__animated animate__fadeIn">
      <div className="ml-auto w-3/12 space-y-8 h-full bg-white text-gray-600 p-4 animate__animated animate__fadeInRight">
        <IoArrowForwardOutline onClick={() => { onClose() }} className="text-2xl text-main cursor-pointer transition duration-500 transform hover:scale-150" />
        <img className="m-auto h-28 rounded" src={`${process.env.REACT_APP_API_URL}/${store?.storeProfile?.logo}`} alt="" />
        <h2 className="text-center text-2xl font-bold">{store?.name}</h2>
        <div>
          <p><b>Telefono: </b> {store?.phoneNumber}</p>
          <p><b>whatsapp: </b>{store?.storeProfile?.whatsapp}</p>
          <p><b>Dirección: </b> {store?.address}</p>
        </div>
        <div>
          <h1 className="font-bold mb-2">Productos</h1>
          {
            loading ?
              <div className="text-center text-xl text-gray-500 font-bold">
                Cargando...
              </div>
              :
              <Swiper
                style={{ padding: '0 0 40px 0' }}
                autoplay
                slidesPerView={3}
                pagination={{ clickable: true }}
                onSlideChange={() => { }}
                onSwiper={(swiper) => { }}
              >
                {
                  products.map((product, i) => {
                    return (
                      <SwiperSlide key={product.id}>
                        <a href={`/products/${product?.slug}`} target="_blank">
                          <img
                            src={generateImageUrl(product.productImages?.[0]?.path)}
                            alt={`product-${product?.store?.name}-${i}`}
                            className="h-16 w-16 w-full rounded border"
                          />
                        </a>
                      </SwiperSlide>
                    )
                  })
                }
              </Swiper>
          }

        </div>
        {store?.isOpen ?
          <div className="bg-green-500 text-center text-xl py-2 text-white">
            Abierta
          </div>
          :
          <div className="bg-red-500 text-center text-xl py-2 text-white">
            Cerrada
          </div>
        }
        <div className="mt-8 text-center">
          <Link className="bg-main px-20 py-4 rounded text-white transition duration-500 hover:text-main hover:bg-white hover:shadow-xl" to={`/stores/${store?.slug}`}>
            Visitar tienda
          </Link>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  )
}

export default StoreInSideBar;