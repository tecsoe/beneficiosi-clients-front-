import ProductCard from "../components/ProductCard";
import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import useAxios from "../hooks/useAxios";
import { useAuth } from "../contexts/AuthContext";
import { generateImageUrl } from "../helpers/url";
import useProducts from "../hooks/useProducts";
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductLoadingComponent from "../components/ProductLoadingComponent";
import ProductProfile from "../components/ProductProfile";
import ShowProfile from "../components/ShowProfile";
import findShowsQuantity from "../helpers/findShowsQuantity";
import ProductModal from "../components/ProductModal";
import StoreDiscountsModal from "../components/dicounts/StoreDiscountsModal";


const NavigationButton = ({ icon, color, className, onClick, canNext, hidden }) => {
  return (
    <button hidden={hidden} onClick={onClick} className={`text-${color} focus:outline-none ${className}`} disabled={canNext}>
      {icon}
    </button>
  )
};

const Product = () => {

  const history = useHistory();

  const { setLoading, setCustomAlert } = useAuth();

  const [productOnModal, setProductOnModal] = useState(null);

  const { slug } = useParams();

  const [swiper, setSwiper] = useState(null);

  const [storeAndProduct, setStoreAndProduct] = useState(null);

  const [{ data: product, loading: productLoading }] = useAxios({ url: `/products/${slug}` });

  const [{ error: cartError, data: cart }, addToCart] = useAxios({ url: `/carts/add-to-cart`, method: "POST" }, { manual: true, useCache: false });

  const [{ products }, getProducts] = useProducts({ options: { manual: true } });

  useEffect(() => {
    setLoading({ show: productLoading, message: 'Cargando' });
  }, [productLoading]);

  useEffect(() => {
    if (product) {
      getProducts({
        params: {
          storeId: product.store.storeId
        }
      })
    }
  }, [product]);

  useEffect(() => {
    if (cart) {
      setLoading?.({ show: false, message: "" });
      history.push(`/checkout?cartId=${cart?.id}`);
    }
  }, [cart]);

  useEffect(() => {
    if (cartError) {
      setLoading?.({ show: false, message: "" });
      setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${cartError?.response?.status === 400 ? cartError?.response?.data.message[0] : cartError?.response?.data.message}.`, severity: "error" });
    }
  }, [cartError])

  const handleSwiper = (swiper) => {
    setSwiper(swiper);
  }

  const handleNext = () => {
    swiper?.slideNext();
  }

  const handleBack = () => {
    swiper?.slidePrev();
  }

  const handleCloseModal = async (e) => {
    setProductOnModal(null);
    if (e) {
      if (e.discount) {
        setStoreAndProduct(e);
        return;
      }
      await addToCart({ data: e });
    }
  }

  const handleClose = async (e) => {
    setStoreAndProduct(null);
    if (e) {
      await addToCart({ data: e });
    }
  }

  /**
   * Si no existe el producto redireccionar a un 404
   */

  return <div className={product?.productDetails ? "p-4 md:p-16" : ""} >
    {
      productLoading ?
        <ProductLoadingComponent />
        :
        <>
          {
            product?.productDetails ?
              <ProductProfile product={product} />
              :
              <ShowProfile show={product} />
          }
          <div className="animate__animated animate__fadeIn">


            <div className="mt-24">
              <h3 className="text-xl text-gray-500 font-bold mb-12 text-center w-full">Tambien te puede interesar...</h3>
            </div>

            <div className="flex justify-between">
              <NavigationButton className="text-4xl text-main focus:outlined-none focus:border-none" onClick={handleBack} icon={<IoChevronBackOutline />}></NavigationButton>
              <Swiper
                slidesPerView={window.innerWidth > 768 ? 4 : 1}
                style={{ width: "80%", padding: "40px 0" }}
                onSwiper={(swiper) => { handleSwiper(swiper) }}
                spaceBetween={window.innerWidth > 768 ? 80 : 0}
                pagination={window.innerWidth > 768 ? false : true}
              >
                {
                  products.map((product, i) => {
                    return (
                      <SwiperSlide key={product.id}>
                        <ProductCard
                          className="m-auto"
                          name={product.name}
                          slug={product.slug}
                          description={product?.productDetails?.shortDescription ? product?.productDetails?.shortDescription : product?.description ? product?.description : 'Sin descripción'}
                          quantity={product?.productDetails ? product?.productDetails?.quantity : findShowsQuantity(product?.shows)}
                          imgSrc={generateImageUrl(product.productImages?.[0]?.path)}
                          imgAlt={product.name}
                          price={product?.productDetails ? product.productDetails?.price > 0 ? `$${product.productDetails?.price}` : 'Gratis' : ''}
                          rating={product?.rating}
                          onBuy={() => { product?.productDetails ? setProductOnModal(product) : history?.push(`/products/${product?.slug}`) }}
                          buttonText={"Comprar"}
                        />
                      </SwiperSlide>
                    )
                  }
                  )
                }
              </Swiper>
              <NavigationButton className="text-4xl text-main focus:outlined-none focus:border-none" onClick={handleNext} icon={<IoChevronForwardOutline />}></NavigationButton>
            </div>
          </div>
          <ProductModal product={productOnModal} closeModal={handleCloseModal} />
          <StoreDiscountsModal onClose={handleClose} storeAndProduct={storeAndProduct} />
        </>
    }
  </div>
};

export default Product;