import { useEffect, useRef, useState } from "react";
import { IoClose, IoCart } from "react-icons/io5";
import { generateImageUrl } from "../helpers/url";
import { Swiper, SwiperSlide } from 'swiper/react';
import Checkbox from "./Checkbox";
import CustomSelect from "./CustomSelect";
import reactDom from "react-dom";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const ProductModal = ({ product, closeModal, isStore }) => {

  const { user } = useAuth();

  const [quantity, setQuantity] = useState(1);
  const [featuresPrice, setfeaturesPrice] = useState(0);
  const [productFeaturesData, setProductFeaturesData] = useState({ featureIds: [], featureForGroupIds: [] })

  const [total, setTotal] = useState(product?.productDetails?.price);

  const modalRef = useRef();

  useEffect(() => {
    if (product) {
      console.log(product);
    }
  }, [product])

  useEffect(() => {
    if (product) {
      setTotal((Number(product?.productDetails?.price) + featuresPrice) * quantity);
    }
  }, [quantity, product, featuresPrice]);

  useEffect(() => {
    setQuantity(1)
    setfeaturesPrice(0)
    setProductFeaturesData({ featureIds: [], featureForGroupIds: [] })
  }, [closeModal]);

  const handleFeatureChange = (event) => {
    const value = productFeaturesData[event.target.name].includes(Number(event.target.value));
    if (value) {
      const newfeatureIds = productFeaturesData[event.target.name].filter(n => n !== Number(event.target.value))
      setProductFeaturesData((oldProductFeaturesData) => {
        return {
          ...oldProductFeaturesData,
          [event.target.name]: newfeatureIds
        }
      });
      setfeaturesPrice((oldFeaturesPrice) => {
        return oldFeaturesPrice - Number(event.target.cost);
      })
    } else {
      setProductFeaturesData((oldProductFeaturesData) => {
        return {
          ...oldProductFeaturesData,
          [event.target.name]: [...oldProductFeaturesData[event.target.name], Number(event.target.value)]
        }
      });
      setfeaturesPrice((oldFeaturesPrice) => {
        return oldFeaturesPrice + Number(event.target.cost);
      })
    }
  }

  const handleCloseModal = (e) => {
    if (modalRef.current === e.target) {
      closeModal();
    }
  }

  const handleAccept = () => {
    closeModal({
      storeId: product?.store?.storeId,
      productId: product?.id,
      productFeaturesData,
      quantity: quantity,
      isDirectPurchase: isStore ? false : true,
      discount: product?.store?.latestActiveDiscount ? true : false
    });
  }

  const handleAddToCart = () => {
    closeModal({
      addTocart: true,
      store: product?.store,
      storeId: product?.store?.storeId,
      productId: product?.id,
      productFeaturesData,
      quantity: quantity,
      isDirectPurchase: false,
      discount: false
    });
  }

  if (!product) {
    return null;
  }

  return reactDom.createPortal(
    <div ref={modalRef} onClick={handleCloseModal} className="px-4 md:px-0 fixed flex z-50 h-screen w-screen bg-black bg-opacity-50 left-0 top-0 animate__animated animate__fade">
      <div className="w-full md:w-7/12 overflow-hidden bg-white animate__animated animate__fadeInUp m-auto rounded-xl">
        <div style={{ height: "8%" }} className="p-4 bg-main flex justify-end items-center text-white">
          <button className="text-2xl" onClick={() => { closeModal() }}>
            <IoClose />
          </button>
        </div>
        <div style={{ maxHeight: 550, overflowY: 'auto' }} className="custom-scrollbar p-8 md:p-16 md:flex md:items-center md:space-x-4">
          <div className="md:w-5/12">
            <Swiper
              autoHeight
              navigation
              slidesPerView={1}
              pagination={{ clickable: true }}
              onSlideChange={() => { }}
              onSwiper={(swiper) => { }}
            >
              {
                product?.productImages?.map((image, i) => {
                  return (
                    <SwiperSlide key={image.id} className="px-10">
                      <img
                        src={generateImageUrl(image?.path)}
                        alt={`product-${product?.store?.name}-${i}`}
                        className="w-full rounded"
                      />
                    </SwiperSlide>
                  )
                })
              }
            </Swiper>
          </div>

          <div className="mt-4 md:mt-0 md:w-9/12">
            <div className="mb-6">
              <div className="flex justify-center space-x-1 mb-2">
                {Array.from(Array(5).keys()).map((n) => {
                  return (
                    <svg
                      key={n}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-yellow-300"
                      fill={(n + 1) <= product?.rating ? 'currentColor' : 'none'}
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  )

                })}
              </div>
              <Link to={`/products/${product.slug}`}>
                <h1 className="text-2xl text-center mb-2 text-gray-600 font-bold hover:text-main">
                  {product.name?.length > 100 ? `${product.name?.slice(0, 100)}...` : product?.name}
                </h1>
              </Link>
              <p className="text-center text-gray-500">
                {
                  product?.productDetails?.shortDescription ?
                    product?.productDetails?.shortDescription?.length > 100 ?
                      `${product?.shortDescription?.slice(0, 100)}...`
                      :
                      product?.productDetails?.shortDescription
                    :
                    product?.description?.length > 100 ?
                      `${product?.description?.slice(0, 100)}...`
                      :
                      product?.description
                }
              </p>
            </div>
            <div style={{ maxHeight: "250px" }} className="overflow-y-auto h-[50%] custom-scrollbar">
              <div className="mb-2 flex items-center space-x-2">
                <p className="text-lg font-bold text-gray-600">Tienda:</p>
                <Link to={`/stores/${product?.store?.slug}`}>
                  <div className="flex items-center space-x-2">
                    {product?.store?.storeProfile?.logo &&
                      <img className="h-10 w-10 rounded" src={`${process.env.REACT_APP_API_URL}/${product?.store?.storeProfile?.logo}`} alt="" />
                    }
                    <p className="text-gray-500">{product?.store?.name}</p>
                  </div>
                </Link>
              </div>
              {
                product?.productDetails?.quantity > 0 &&
                <div className="mb-2 flex items-center space-x-4">
                  <h3 className="text-lg font-bold text-gray-600">Disponibles:</h3>
                  {
                    product?.productDetails?.quantity > 0 ?
                      <p className="text-main">{product?.productDetails?.quantity}</p>
                      :
                      <p className="text-red-500">No hay disponible</p>
                  }

                </div>
              }
              {
                product?.productFeatures?.length > 0 &&
                <div>
                  <h3 className="text-lg font-bold text-gray-600">Características</h3>
                  {product?.productFeatures?.map((feature, i) => <div key={i} className="flex items-center space-x-4 mb-2 text-gray-500">
                    {feature.isSelectable &&
                      <Checkbox
                        name="featureIds"
                        onChange={(e) => { handleFeatureChange({ target: { name: e.target.name, value: e.target.value, type: e.target.type, cost: feature.price } }) }}
                        value={feature.id}
                        checked={productFeaturesData.featureIds.includes(feature.id)}
                      />
                    }
                    <span className="font-bold">{feature.name}:</span>
                    {
                      feature.value &&
                      <span>{feature.value}</span>
                    }
                    <b>{feature.price > 0 ? `$${feature.price}` : feature.isSelectable ? "Gratis." : "Incluido en el producto."}</b>
                  </div>)}
                </div>
              }

              {
                product?.productFeatureGroups?.length > 0 &&
                product?.productFeatureGroups?.map((featuresGroup, i) => {
                  return (
                    <div key={i}>
                      <h3 className="text-lg font-bold text-gray-600">{featuresGroup?.name}</h3>
                      {featuresGroup?.productFeatureForGroups?.map((feature, i) => <div key={i} className="flex items-center space-x-4 mb-2 text-gray-500">
                        {feature.isSelectable &&
                          <Checkbox
                            name="featureForGroupIds"
                            onChange={(e) => { handleFeatureChange({ target: { name: e.target.name, value: e.target.value, type: e.target.type, cost: feature.price } }) }}
                            value={feature.id}
                            checked={productFeaturesData.featureForGroupIds.includes(feature.id)}
                          />
                        }
                        <span className="font-bold">{feature.name}:</span>
                        {
                          feature.value &&
                          <span>{feature.value}</span>
                        }
                        <b>{feature.price > 0 ? `$${feature.price}` : feature.isSelectable ? "Gratis." : "Incluido en el producto."}</b>
                      </div>)}
                    </div>
                  )
                })
              }
              <div>
                <h3 className="text-lg font-bold text-gray-600">Descripción</h3>
                <div dangerouslySetInnerHTML={{ __html: product?.description }} />
              </div>
            </div>
            {
              product?.productDetails?.price &&
              <div className="text-right text-2xl font-bold text-gray-600 font bold">
                ${product?.productDetails?.price}
              </div>
            }
            {
              product?.productDetails?.quantity > 0 &&
              <div className="flex items-center justify-between mt-4">
                <div className="w-1/2 flex items-center space-x-4">
                  <p>Cantidad: </p>
                  <CustomSelect value={quantity} name="quantity" onChange={(e) => { setQuantity(e.target.value) }}>
                    {Array.from(Array(product?.productDetails?.quantity).keys()).map(n => {
                      return (
                        <option key={n} value={n + 1}>{n + 1}</option>
                      )
                    })}
                  </CustomSelect>
                </div>
                <div className="w-1/2 flex justify-end text-xl font-bold text-gray-500 items-center space-x-4">
                  Total: ${total?.toLocaleString()}
                </div>
              </div>
            }
            <div className="md:flex md:justify-end md:space-x-4 mt-6 space-y-2 md:space-y-0">
              <button onClick={() => { closeModal() }} className="rounded w-full px-4 py-2 text-main transition duration-500 hover:shadow-xl hover:bg-white hover:text-main focus:ring-white">
                Cancelar
              </button>
              {
                !isStore &&
                <button onClick={handleAddToCart} className="bg-main w-full justify-center text-lg flex items-center space-x-4 rounded px-4 py-2 text-white transition duration-500 hover:shadow-xl hover:bg-white hover:text-main focus:ring-white">
                  <p>Añadir al carrito</p>
                </button>
              }
              {
                user ?
                  product?.store?.isOpen ?
                    product?.productDetails?.quantity > 0 ?
                      <button onClick={handleAccept} className="w-full justify-center bg-main text-lg flex items-center space-x-4 rounded px-4 py-2 text-white transition duration-500 hover:shadow-xl hover:bg-white hover:text-main focus:ring-white">
                        <p>{isStore ? "añadir al carrito" : "Comprar"}</p>
                        <IoCart />
                      </button>
                      :
                      <div className="text-red-500 px-4 py-2">No hay existencias.</div>
                    :
                    <div className="text-red-500 px-4 py-2">La tienda esta cerrada actualmente.</div>
                  :
                  <Link to={"/login"} className="rounded capitalize px-4 py-2 cursor-pointer text-main transition duration-500 hover:bg-white hover:text-main hover:shadow-xl">
                    iniciar sesión
                  </Link>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
    ,
    document.getElementById("portal")
  );
}

export default ProductModal;