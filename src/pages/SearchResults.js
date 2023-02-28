import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import useProducts from "../hooks/useProducts";
import useStores from "../hooks/useStores";
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductCard from "../components/ProductCard";
import { generateImageUrl } from "../helpers/url";
import StoreCard from "../components/StoreCard";
import ProductModal from "../components/ProductModal";
import useAxios from "../hooks/useAxios";
import { IoFastFoodOutline, IoStorefrontOutline } from "react-icons/io5";
import StoreDiscountsModal from "../components/dicounts/StoreDiscountsModal";
import findShowsQuantity from "../helpers/findShowsQuantity";
import StoreModal from "../components/StoreModal";


const SearchResults = () => {

    const { setLoading, setCustomAlert } = useAuth();

    const history = useHistory();

    const location = useLocation();

    const [filters, setFilters] = useState({ name: "", storeCategoryId: "" });

    const [productPage, setProductPage] = useState(1);

    const [storePage, setStorePage] = useState(1);

    const [productsList, setProductsList] = useState([]);

    const [storesList, setStoresList] = useState([]);

    const [productOnModal, setProductOnModal] = useState(null);

    const [storeAndProduct, setStoreAndProduct] = useState(null);

    const [isAddToCart, setIsAddToCart] = useState(false);

    const [storeToModal, setStoreToModal] = useState(null);

    const [showStoreModal, setShowStoreModal] = useState(false);

    const [{ error: cartError, data: cart }, addToCart] = useAxios({ url: `/carts/add-to-cart`, method: "POST" }, { manual: true, useCache: false });

    const [{ products, total: productsTotal, numberOfPages: productsPages, error: productsError }, getProducts] = useProducts({ axiosConfig: { params: { ...filters, page: productPage } }, options: { manual: true, useCache: false } });

    const [{ stores, total: storesTotal, numberOfPages: storesPages, error: storesError }, getStores] = useStores({ axiosConfig: { params: { ...filters, page: storePage, withCheapestProduct: "true" } }, options: { manual: true, useCache: false } });

    useEffect(() => {
        if (cart) {
            if (!isAddToCart) {
                history.push(`/checkout?cartId=${cart?.id}`);
                return;
            } else {
                setIsAddToCart(false);
                setShowStoreModal(true);
            }
        }
    }, [cart])

    useEffect(() => {
        setProductsList((oldProductsList) => {
            return [...oldProductsList, ...products];
        });
    }, [products])

    useEffect(() => {
        setStoresList((oldStoresList) => {
            return [...oldStoresList, ...stores];
        });
    }, [stores])

    useEffect(() => {
        if (productsError) {
            setLoading?.({ show: false, message: "" });
            setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${productsError?.response?.status === 400 ? productsError?.response?.data.message[0] : productsError?.response?.data.message}.`, severity: "error" });
        }

        if (storesError) {
            setLoading?.({ show: false, message: "" });
            setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${storesError?.response?.status === 400 ? storesError?.response?.data.message[0] : storesError?.response?.data.message}.`, severity: "error" });
        }

        if (cartError) {
            setLoading?.({ show: false, message: "" });
            setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${cartError?.response?.status === 400 ? cartError?.response?.data.message[0] : cartError?.response?.data.message}.`, severity: "error" });
        }
    }, [productsError, storesError, cartError]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const storeCategoryId = params.get('storeCategoryId');
        const name = params.get('search');

        setFilters((oldFilters) => {
            return {
                ...oldFilters,
                name: name,
                storeCategoryId: storeCategoryId ? storeCategoryId : null
            }
        });
    }, [location]);

    useEffect(() => {
        setProductsList([]);
        setStoresList([]);
        setStorePage(1);
        setProductPage(1);
        setLoading({ show: true, message: "Cargando datos" });
        Promise.all([
            getProducts({ params: { storeCategoryIds: filters.storeCategoryId, name: filters.name, page: productPage } }),
            getStores({ params: { ...filters, page: storePage, withCheapestProduct: "true" } }),
        ]).then((values) => {
            setLoading({ show: false, message: "" });
        })
    }, [filters]);

    useEffect(() => {
        setLoading({ show: true, message: "Obteniendo productos" });
        getProducts({ params: { storeCategoryIds: filters.storeCategoryId, name: filters.name, page: productPage } }).then(() => {
            setLoading({ show: false, message: "" });
        })
    }, [productPage, filters.storeCategoryId, filters.name]);

    useEffect(() => {
        setLoading({ show: true, message: "Obteniendo Tiendas" });
        getStores({ params: { ...filters, page: storePage, withCheapestProduct: "true" } }).then(() => {
            setLoading({ show: false, message: "" });
        })
    }, [storePage, filters]);



    const handleProductsEnd = (e) => {
        if (productPage < productsPages && productsList.length > 0) {
            setProductPage((oldProductPage) => {
                return oldProductPage + 1
            });
        }
    }

    const handleStoresEnd = (e) => {
        if (storePage < storesPages && storesList.length > 0) {
            setStorePage((oldStorePage) => {
                return oldStorePage + 1
            });
        }
    }

    const handleCloseModal = async (e) => {
        setProductOnModal(null);
        if (e) {
            if (e.discount) {
                setStoreAndProduct(e);
                return;
            }

            if (e?.addTocart) {
                setIsAddToCart(e?.addTocart);
                const { addTocart, store, ...rest } = e;
                setStoreToModal(store);
                setLoading?.({ show: true, message: "Realizando compra" });
                await addToCart({ data: e });
                setLoading?.({ show: false, message: "" });
                return;
            }
            setLoading?.({ show: true, message: "Realizando compra" });
            await addToCart({ data: e });
            setLoading?.({ show: false, message: "" });
        }
    }

    const handleCloseStoreModal = () => {
        setShowStoreModal(false);
        setStoreToModal(null);
    }

    const handleClose = async (e) => {
        setStoreAndProduct(null);
        if (e) {
            setLoading?.({ show: true, message: "Realizando compra" });
            await addToCart({ data: e });
            setLoading?.({ show: false, message: "" });
        }
    }

    return (
        <div className="p-8 space-y-4">
            <div className="text-2xl text-gray-500 font-bold">
                Resultados de la busqueda...
            </div>

            <div className="bg-white p-4 space-y-8">
                <div style={{ minHeight: 300 }}>
                    <h2 className="text-2xl justify-between md:flex mb-4 font-bold text-gray-500">
                        <div className="flex items-center text-3xl space-x-2">
                            <IoFastFoodOutline />
                            <p>Productos</p>
                        </div>
                        <div className="text-lg text-main">
                            <span className="text-gray-500 mr-4">Mostrados: {productsList.length}</span> Resultados: {productsTotal}
                        </div>
                    </h2>

                    <div>
                        {
                            productsList.length > 0 ?
                                <Swiper
                                    slidesPerView={window.innerWidth > 768 ? 4 : 1}
                                    navigation
                                    style={{ padding: "80px 20px" }}
                                    onReachEnd={handleProductsEnd}
                                >
                                    {
                                        productsList.map((product, i) => {
                                            return (
                                                <SwiperSlide key={i}>
                                                    <ProductCard
                                                        className="m-auto md:m-0"
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
                                        })
                                    }
                                </Swiper>
                                :
                                <div className="my-auto text-center text-red-500 text-xl">
                                    No se encontraron productos.
                                </div>
                        }

                    </div>
                </div>
                <div>
                    <h2 className="text-2xl justify-between md:flex mb-4 font-bold text-gray-500">
                        <div className="flex items-center text-3xl space-x-2">
                            <IoStorefrontOutline />
                            <p>Tiendas</p>
                        </div>
                        <div className="text-lg text-main">
                            <span className="text-gray-500 mr-4">Mostrados: {storesList.length}</span> Resultados: {storesTotal}
                        </div>
                    </h2>
                    {
                        storesList.length > 0 ?
                            <Swiper
                                slidesPerView={window.innerWidth > 768 ? 4 : 1}
                                navigation
                                style={{ padding: "20px 20px" }}
                                onReachEnd={handleStoresEnd}
                            >
                                {
                                    storesList.map((store, i) => {
                                        return (
                                            <SwiperSlide key={i}>
                                                <StoreCard
                                                    imgSrc={store?.storeProfile?.logo ? `${store.storeProfile.logo}` : null}
                                                    imgAlt={store.imgAlt}
                                                    name={store.name}
                                                    description={store.shortDescription}
                                                    rating={store.rating}
                                                    key={i}
                                                    isFavorite={false}
                                                    open={store?.isOpen}
                                                    slug={store.slug}
                                                    cheapestProduct={store.cheapestProduct}
                                                    className="m-auto md:m-0"
                                                />
                                            </SwiperSlide>
                                        )
                                    })
                                }
                            </Swiper>
                            :
                            <div className="text-center text-red-500 text-xl">
                                No se encontraron tiendas.
                            </div>
                    }
                </div>
            </div>
            <ProductModal product={productOnModal} closeModal={handleCloseModal} />
            <StoreDiscountsModal onClose={handleClose} storeAndProduct={storeAndProduct} />
            <StoreModal show={storeToModal && showStoreModal ? true : false} store={storeToModal} onClose={handleCloseStoreModal} cartId={cart?.id} />
        </div>
    )
}

export default SearchResults;