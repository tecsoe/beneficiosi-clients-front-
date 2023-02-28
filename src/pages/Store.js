import Container from "../components/Container";
import Button from "../components/Button";
import ChevronRightIcon from "../components/ChevronRightIcon";
import Pagination from "../components/Pagination";
import { useEffect, useState } from "react";
import ProductsCollection from "../components/ProductsCollection";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  IoHeartOutline,
  IoCartOutline,
  IoLocationSharp,
  IoHeart,
  IoTime,
} from "react-icons/io5";
import StoreCart from "../components/StoreCart";
import useProducts from "../hooks/useProducts";
import useCategoriesStores from "../hooks/useCategoriesStores";
import { useParams, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import useAxios from "../hooks/useAxios";

import StoreInfo from "../components/StoreInfo";
import CategoryFilter from "../components/CategoryFilter";
import PriceFilter from "../components/PriceFilter";
import useTags from "../hooks/useTags";
import { validURL } from "../helpers/formsValidations";
import DiscountsSlider from "../components/dicounts/DiscountsSlider";
import StoreDiscountsModal from "../components/dicounts/StoreDiscountsModal";
import ProductsFilters from "../components/ProductsFilters";
import FiltersModal from "../components/FiltersModal";
import StoresNewsPosts from "../components/StoresNewsPosts";
import defaultBanner from "../assets/images/welcome.jpg";

const Store = () => {
  const params = useParams();

  const history = useHistory();

  const { setLoading, setCustomAlert, user } = useAuth();

  const [storeInfo, setStoreInfo] = useState({
    phoneNumber: "",
    shortDescription: "",
    instagram: "",
    facebook: "",
    whatsapp: "",
  });

  const [videoPreview, setVideoPreview] = useState("");

  const [filters, setFilters] = useState({
    page: 1,
    categoryIds: [],
    rating: [],
    tagIds: [],
    perPage: 12,
    storeId: "",
    minRating: "",
  });
  const [priceFilter, setPriceFilter] = useState({
    minPrice: "",
    maxPrice: "",
  });

  const [isInGridView] = useState(true);

  const [favorite, setFavorite] = useState(false);

  const [showCart, setShowCart] = useState(false);

  const [cart, setCart] = useState(null);

  const [cartQuantity, setCartQuantity] = useState(0);

  const [showFiltersModal, setShowFiltersModal] = useState(false);

  const [storeAndProduct, setStoreAndProduct] = useState(null);

  const [{ data: store, error: storeError, loading: loadingStore }] = useAxios(
    { url: `/stores/${params?.slug}` },
    { useCache: false }
  );

  const [{ products, numberOfPages, error, loading }, getProducts] =
    useProducts({
      params: {
        ...filters,
      },
      options: {
        manual: true,
      },
    });

  const [
    {
      categoriesStores,
      error: errorCategoriesStores,
      loading: loadingCategoriesStores,
    },
    getCategoriesStores,
  ] = useCategoriesStores({
    params: { parentOnly: true, storeId: store?.storeId, perPage: 200 },
    options: { useCache: false, manual: true },
  });

  const [{ tags, error: errorTags, loading: loadingTags }, getTags] = useTags({
    params: { storeCategoryId: store?.storeCategory?.id },
    options: { useCache: false, manual: true },
  });

  const [{ data: cartData, error: cartError, loading: cartLoading }, getCart] = useAxios({ url: `/carts/stores/${store?.storeId}`, params: { isProcessed: "false", isExpired: "false", isDirectPurchase: "false" }, }, { manual: true, useCache: false });

  const [
    {
      data: updateCartData,
      error: updateCartError,
      loading: updateCartLoading,
    },
    updateCart,
  ] = useAxios(
    { url: `/carts/${cart?.id}/update-discount`, method: "PUT" },
    { manual: true, useCache: false }
  );

  const [
    { data: favoriteData, loading: loadingFavorite, error: favoriteError },
    toggleFavorite,
  ] = useAxios(
    { url: `/favorite-stores/${store?.storeId}`, method: "POST" },
    { manual: true, useCache: false }
  );

  useEffect(() => {
    setFavorite(favoriteData);
  }, [favoriteData]);

  useEffect(() => {
    setLoading({
      show: loadingStore,
      message: "Cargando Informacion de la tienda.",
    });
  }, [loadingStore, setLoading]);

  useEffect(() => {
    if (cartData) {
      setCart(cartData);
    }
  }, [cartData]);

  useEffect(() => {
    if (store) {
      console.log(store);
    }
  }, [store]);

  useEffect(() => {
    if (cart) {
      setCartQuantity(
        cart?.cartItems?.reduce?.(
          (acum, item) => acum + Number(item.quantity),
          0
        )
      );
    }
  }, [cart]);

  useEffect(() => {
    if (error) {
      setLoading?.({ show: false, message: "" });
      setCustomAlert?.({
        show: true,
        message: `Ha ocurrido un error: ${error?.response?.status === 400
          ? error?.response?.data.message[0]
          : error?.response?.data.message
          }.`,
        severity: "error",
      });
    }
    if (errorCategoriesStores) {
      setLoading?.({ show: false, message: "" });
      setCustomAlert?.({
        show: true,
        message: `Ha ocurrido un error: ${errorCategoriesStores?.response?.status === 400
          ? errorCategoriesStores?.response?.data.message[0]
          : errorCategoriesStores?.response?.data.message
          }.`,
        severity: "error",
      });
    }

    if (storeError) {
      setLoading?.({ show: false, message: "" });
      setCustomAlert?.({
        show: true,
        message: `Ha ocurrido un error: ${storeError?.response?.status === 400
          ? storeError?.response?.data.message[0]
          : storeError?.response?.data.message
          }.`,
        severity: "error",
      });
    }

    if (errorTags) {
      setLoading?.({ show: false, message: "" });
      setCustomAlert?.({
        show: true,
        message: `Ha ocurrido un error: ${errorTags?.response?.status === 400
          ? errorTags?.response?.data.message[0]
          : errorTags?.response?.data.message
          }.`,
        severity: "error",
      });
    }

    if (cartError) {
      setLoading?.({ show: false, message: "" });
      if (cartError?.response?.data.message !== "Carrito no encontrado") {
        setCustomAlert?.({
          show: true,
          message: `Ha ocurrido un error: ${cartError?.response?.status === 400
            ? cartError?.response?.data.message[0]
            : cartError?.response?.data.message
            }.`,
          severity: "error",
        });
      }
    }

    if (updateCartError) {
      setLoading?.({ show: false, message: "" });
      if (updateCartError?.response?.data.message !== "Carrito no encontrado") {
        setCustomAlert?.({
          show: true,
          message: `Ha ocurrido un error: ${updateCartError?.response?.status === 400
            ? updateCartError?.response?.data.message[0]
            : updateCartError?.response?.data.message
            }.`,
          severity: "error",
        });
      }
    }

    if (favoriteError) {
      setLoading?.({ show: false, message: "" });
      setCustomAlert?.({
        show: true,
        message: `Ha ocurrido un error: ${favoriteError?.response?.status === 400
          ? favoriteError?.response?.data.message[0]
          : favoriteError?.response?.data.message
          }.`,
        severity: "error",
      });
    }
  }, [
    error,
    errorCategoriesStores,
    storeError,
    errorTags,
    cartError,
    updateCartError,
    favoriteError,
  ]);

  useEffect(() => {
    if (updateCartData) {
      setLoading({ show: false, message: "" });
      history.push(`/checkout?cartId=${updateCartData?.id}`);
    }
  }, [updateCartData]);

  useEffect(() => {
    if (store) {
      const { storeProfile } = store;

      if (storeProfile?.videoUrl && validURL(storeProfile?.videoUrl)) {
        const { videoUrl } = storeProfile;
        var url_string = videoUrl; //window.location.href
        var url = new URL(url_string);
        var v = url.searchParams.get("v");
        setVideoPreview(`https://www.youtube.com/embed/${v}`);
      }

      setStoreInfo({
        phoneNumber: store?.phoneNumber,
        shortDescription: store?.storeProfile?.shortDescription,
        instagram: store?.storeProfile?.instagram,
        facebook: store?.storeProfile?.facebook,
        whatsapp: store?.storeProfile?.whatsapp,
      });

      setFilters((oldFilters) => {
        return {
          ...oldFilters,
          storeId: store.storeId,
        };
      });

      setFavorite(store?.isFavorite);

      getCategoriesStores();
      getTags();

      if (user) {
        getCart();
      }
    }
  }, [store, user]);

  useEffect(() => {
    getProducts({
      params: {
        ...filters,
        tagIds: filters?.tagIds?.join(","),
        categoryIds: filters?.categoryIds?.join(","),
        rating: filters?.rating?.join(","),
        ...priceFilter,
      },
    });
  }, [filters, getProducts]);

  const handleChange = (e) => {
    if (e.target.name === "minRating") {
      setFilters((oldFilters) => {
        return {
          ...oldFilters,
          [e.target.name]:
            oldFilters[e.target.name] === e.target.value ? "" : e.target.value,
        };
      });
      return;
    }

    if (e.target.type === "checkbox") {
      const value = filters[e.target.name].includes(Number(e.target.value));
      if (value) {
        const newValues = filters[e.target.name].filter(
          (n) => n !== Number(e.target.value)
        );
        setFilters((oldFilters) => {
          return {
            ...oldFilters,
            [e.target.name]: newValues,
            page: 1,
          };
        });
      } else {
        setFilters((oldFilters) => {
          return {
            ...oldFilters,
            [e.target.name]: [
              ...filters[e.target.name],
              Number(e.target.value),
            ],
            page: 1,
          };
        });
      }

      return;
    }

    setFilters((oldFilters) => {
      return {
        ...oldFilters,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleChangePriceFilter = (e) => {
    setPriceFilter((oldPriceFilter) => {
      return {
        ...oldPriceFilter,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleCart = (cart) => {
    setCart(cart);
  };

  const handleCloseCart = async (e) => {
    setShowCart(false);
    if (e) {
      if (store.latestActiveDiscount) {
        setStoreAndProduct({
          storeId: store?.storeId,
        });
        return;
      }
      history.push(`/checkout?cartId=${cart?.id}`);
    }
  };

  const handleClose = async (e) => {
    setStoreAndProduct(null);
    if (e) {
      setLoading({ show: true, message: "Cargando..." });
      await updateCart({
        data: {
          ...e,
          discountId: e.discountId ? e.discountId : null,
        },
      });
      setLoading({ show: false, message: "" });
    }
  };

  return (
    <>
      <div>
        {loadingStore ? (
          <div className="h-[30vh] md:h-[60vh] custom-skeleton mb-4 rounded-xl"></div>
        ) : (
          <Swiper
            navigation
            onSlideChange={() => null}
            onSwiper={(swiper) => null}
            autoHeight
            className="bg-red-500 z-auto"
          >
            <SwiperSlide className="w-full relative">
              <img
                src={
                  store?.storeProfile?.banner
                    ? `${process.env.REACT_APP_API_URL}/${store?.storeProfile?.banner}`
                    : defaultBanner
                }
                alt="Tienda"
                className="h-[30vh] md:h-[60vh] w-full"
              />
              <div className="bg-black justify-between items-center bg-opacity-50 flex absolute z-10 bottom-0 w-full left-0 p-6 text-white">
                <div className="flex items-center">
                  <div>
                    <img
                      className="w-[50px] rounded"
                      src={`${process.env.REACT_APP_API_URL}/${store?.storeProfile?.logo}`}
                      alt=""
                    />
                  </div>
                  <div className="ml-4">
                    <p className="text-2xl mb-2">{store?.name}</p>
                    <p>{store?.address}</p>
                  </div>
                </div>
                <IoLocationSharp className="text-4xl cursor-pointer hover:text-main transition duration-500" />
              </div>
            </SwiperSlide>
            {videoPreview ? (
              <SwiperSlide className="w-full text-center">
                <iframe
                  className="w-full md:h-[60vh]"
                  src={videoPreview}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </SwiperSlide>
            ) : null}
          </Swiper>
        )}
      </div>
      <div className="mt-4">
        {store?.isOpen ? (
          <div className="bg-green-500 text-center text-xl py-4 text-white">
            Abierta
          </div>
        ) : (
          <div className="bg-red-500 text-center text-xl py-4 text-white">
            Cerrada
          </div>
        )}
      </div>

      <StoresNewsPosts storeId={store?.storeId} />

      <DiscountsSlider
        storeId={store?.storeId}
        slidesPerview={window.innerWidth > 768 ? 3 : 1}
      />
      <Container withMargin className="mb-20">
        <div className="p-4 block md:hidden">
          <button
            className="w-full bg-white text-center text-gray-500 p-4 rounded shadow-xl"
            onClick={() => {
              setShowFiltersModal((oldShowModal) => !oldShowModal);
            }}
          >
            <span>Mostrar filtros</span>
          </button>
        </div>
        <div className="md:flex justify-between items-start space-x-12">
          <div className="md:w-3/12 hidden md:block">
            <StoreInfo {...storeInfo} />

            <br />
            {store?.storeHours?.length > 0 ? (
              <div className="space-y-2">
                <h1 className="text-gray-500 text-xl font-bold">
                  <IoTime className="text-4xl" />
                  Horarios
                </h1>
                {store?.storeHours?.map((day, i) => {
                  return (
                    <div key={i}>
                      <b>{day?.dayInSpanish}</b>: {day?.startTime} -{" "}
                      {day?.endTime}
                    </div>
                  );
                })}
              </div>
            ) : null}
            <br />
            <ProductsFilters
              hiddenEvents={
                store?.storeCategory?.id === 2 || store?.storeCategory?.id === 4
                  ? false
                  : true
              }
              onChange={handleChange}
              filters={filters}
            />
            <h4 className="text-xl font-semibold mt-8">Categorias</h4>
            <CategoryFilter
              className="max-h-64 overflow-y-auto custom-scrollbar"
              loading={loadingCategoriesStores}
              categoryStoreIds={filters.categoryIds}
              onChange={handleChange}
              name="categoryIds"
              categoriesStores={categoriesStores}
            />

            <PriceFilter
              className=" my-8"
              min={{ value: priceFilter.minPrice, name: "minPrice" }}
              max={{ value: priceFilter.maxPrice, name: "maxPrice" }}
              onChange={handleChangePriceFilter}
              onSubmit={(e) => {
                if (e) {
                  e.preventDefault();
                }
                getProducts({
                  params: {
                    ...filters,
                    tagIds: filters?.tagIds?.join?.(","),
                    categoryStoreIds: filters?.categoryStoreIds?.join?.(","),
                    rating: filters?.rating?.join?.(","),
                    ...priceFilter,
                  },
                });
              }}
            />

            <Button
              color="white"
              endAdorment={<ChevronRightIcon className="w-3 h-3" fill="none" />}
              to="/benefits"
              className="my-8"
            >
              Beneficios
            </Button>
          </div>
          <div className="md:w-9/12">
            <div className="mb-10 flex items-center justify-between">
              <div className="md:w-9/12 hidden md:block"></div>

              {/* Cart and Favorite Button */}
              <div className="md:w-3/12 p-4 flex items-center space-x-8">
                {loadingFavorite ? (
                  <div>Cargando</div>
                ) : favorite ? (
                  <IoHeart
                    onClick={() => {
                      toggleFavorite();
                    }}
                    className="text-[50px] bg-white p-2 rounded-full shadow-lg text-main cursor-pointer"
                  />
                ) : (
                  <IoHeartOutline
                    onClick={() => {
                      toggleFavorite();
                    }}
                    className="text-[50px] bg-white p-2 rounded-full shadow-lg text-main hover:text-main cursor-pointer"
                  />
                )}

                {cartLoading ? (
                  <span>Obteniendo carrito...</span>
                ) : cart ? (
                  <div className="relative">
                    <IoCartOutline
                      onClick={() => {
                        setShowCart(true);
                      }}
                      className="animate__animated animate__zoomIn text-[50px] bg-white p-2 rounded-full text-gray-500 shadow-lg transition duration-500 hover:text-main cursor-pointer"
                    ></IoCartOutline>
                    {cart?.cartItems?.length > 0 && cartQuantity > 0 && (
                      <span
                        style={{
                          right:
                            cartQuantity.toString().length === 1
                              ? -5
                              : cartQuantity.toString().length === 2
                                ? -7
                                : -10,
                          top: -7,
                        }}
                        className="bg-main text-white absolute top-0 rounded-full px-1"
                      >
                        {cartQuantity}
                      </span>
                    )}
                  </div>
                ) : (
                  <span>Sin carrito con esta tienda</span>
                )}
              </div>
            </div>
            {loading ? (
              <div className="text-center text-4xl animate__animated animate__fadeIn">
                Cargando Productos...
              </div>
            ) : products.length > 0 ? (
              <div className="animate__animated animate__fadeIn">
                <ProductsCollection
                  isStore
                  products={products}
                  isInGridView={isInGridView}
                  onAddToCard={handleCart}
                />
              </div>
            ) : (
              <div className="text-center text-red-500 animate__animated animate__fadeIn">
                No se han encontrado productos.
              </div>
            )}
            {numberOfPages > 0 ? (
              <div className="mt-12">
                <Pagination
                  pages={numberOfPages}
                  activePage={filters.page}
                  onChange={(e) => {
                    handleChange({ target: { name: "page", value: e } });
                  }}
                />
              </div>
            ) : null}
          </div>
        </div>
      </Container>
      <StoreCart
        show={showCart}
        cart={cart}
        onChangeCart={handleCart}
        closeCart={handleCloseCart}
      />
      <StoreDiscountsModal
        onClose={handleClose}
        storeAndProduct={storeAndProduct}
      />
      <FiltersModal
        show={showFiltersModal}
        onClose={() => {
          setShowFiltersModal((oldShowModal) => !oldShowModal);
        }}
      >
        <ProductsFilters
          hiddenEvents={
            store?.storeCategory === 2 || store?.storeCategory === 4
              ? false
              : true
          }
          onChange={handleChange}
          filters={filters}
        />

        <CategoryFilter
          className="my-8 max-h-64 overflow-y-auto"
          loading={loadingCategoriesStores}
          categoryStoreIds={filters.categoryIds}
          onChange={handleChange}
          name="categoryIds"
          categoriesStores={categoriesStores}
        />

        <PriceFilter
          className=" my-8"
          min={{ value: priceFilter.minPrice, name: "minPrice" }}
          max={{ value: priceFilter.maxPrice, name: "maxPrice" }}
          onChange={handleChangePriceFilter}
          onSubmit={(e) => {
            if (e) {
              e.preventDefault();
            }
            getProducts({
              params: {
                ...filters,
                tagIds: filters?.tagIds?.join?.(","),
                categoryStoreIds: filters?.categoryStoreIds?.join?.(","),
                rating: filters?.rating?.join?.(","),
                ...priceFilter,
              },
            });
          }}
        />
      </FiltersModal>
    </>
  );
};

export default Store;
