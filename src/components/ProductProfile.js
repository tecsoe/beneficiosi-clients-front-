import Container from "../components/Container"
import ProductFeature from "../components/ProductFeature";
import Select from "../components/Select";
import PlusIcon from "../components/PlusIcon";
import { TabsProvider } from "../contexts/TabsContext";
import TabsContainer from "../components/TabsContainer";
import Tab from "../components/Tab";
import TabPanel from "../components/TabPanel";
import Table from "../components/Table";
import TableHead from "../components/TableHead";
import TableRow from "../components/TableRow";
import TableCell from "../components/TableCell";
import TableBody from "../components/TableBody";
import QuestionsAnswer from '../components/QuestionsAnswer';
import ProductImagesCarousel from "../components/ProductImagesCarousel";
import ProductFeatureGroup from "../components/ProductFeatureGroup";
import { Swiper, SwiperSlide } from 'swiper/react';
import { generateBackendUrl } from "../helpers/url";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import useAxios from "../hooks/useAxios";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import noImage from "../assets/images/no-image.png";
import { getErrorMessage } from "../helpers/axiosErrors";
import { isRequired, validate } from "../helpers/formsValidations";
import { useHistory } from "react-router-dom";
import ProductModal from "./ProductModal";
import StoreDiscountsModal from "./dicounts/StoreDiscountsModal";
import VideoComponent from "./VideoComponent";

const ProductProfile = ({ product }) => {

    const history = useHistory();

    const { setLoading, setCustomAlert } = useAuth();

    const [favorite, setFavorite] = useState(false);

    const [productOnModal, setProductOnModal] = useState(null);

    const [storeAndProduct, setStoreAndProduct] = useState(null);

    const [questionFormData, setQuestionFormData] = useState({
        question: '',
        productId: null,
    });

    const [questionsFormErrors, setQuestionsFormErrors] = useState({
        question: null,
    });

    const [{ error: cartError, data: cart }, addToCart] = useAxios({ url: `/carts/add-to-cart`, method: "POST" }, { manual: true, useCache: false });

    const [{ data: favoriteData, loading: loadingFavorite, error: favoriteError }, toggleFavorite] = useAxios({ url: `/favorite-products/${product?.id}`, method: 'POST' }, { manual: true, useCache: false });

    const [{ data: questionsData, loading: questionsDataLoading }, fetchQuestions] = useAxios({ url: `/questions` }, { manual: true });

    const [, createQuestion] = useAxios({ url: '/questions', method: 'POST' }, { manual: true });

    useEffect(() => {
        if (product) {
            console.log(product)
            fetchQuestions({
                params: {
                    productId: product.id,
                    sort: 'createdAt,DESC',
                }
            });

            setFavorite(product?.isFavorite);

            setQuestionFormData(prevData => ({
                ...prevData,
                productId: product.id,
            }));
        }
    }, [product]);

    useEffect(() => {
        if (cart) {
            setLoading?.({ show: false, message: "" });
            history.push(`/checkout?cartId=${cart?.id}`);
        }
    }, [cart]);

    useEffect(() => {
        setFavorite(favoriteData);
    }, [favoriteData]);

    useEffect(() => {
        setQuestionsFormErrors({
            question: validate(questionFormData.question, [
                { validator: isRequired, errorMessage: 'La pregunta es requerida' },
            ]),
        });
    }, [questionFormData]);

    useEffect(() => {
        setLoading({ show: questionsDataLoading, message: 'Cargando preguntas' });
    }, [questionsDataLoading]);

    useEffect(() => {

        if (cartError) {
            setLoading?.({ show: false, message: "" });
            setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${cartError?.response?.status === 400 ? cartError?.response?.data.message[0] : cartError?.response?.data.message}.`, severity: "error" });
        }

        if (favoriteError) {
            setLoading?.({ show: false, message: "" });
            setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${favoriteError?.response?.status === 400 ? favoriteError?.response?.data.message[0] : favoriteError?.response?.data.message}.`, severity: "error" });
        }
    }, [favoriteError, cartError])

    const handleQuestionChange = (e) => {
        setQuestionFormData(prevData => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleQuestionSubmit = async (e) => {
        e.preventDefault();

        for (let errorName in questionsFormErrors) {
            if (questionsFormErrors[errorName] !== null) {
                setCustomAlert({ show: true, message: questionsFormErrors[errorName], severity: "error" });
                return;
            }
        }

        setLoading({ show: true, message: "Guardando pregunta" });

        try {
            await createQuestion({ data: questionFormData });
            fetchQuestions({
                params: {
                    productId: product.id,
                    sort: 'createdAt,DESC',
                }
            });
            setCustomAlert({ show: true, message: 'Pregunta agregada', severity: "success" });
            setQuestionFormData(currentData => ({
                ...currentData,
                question: '',
            }))
        } catch (error) {
            setCustomAlert({ show: true, message: getErrorMessage(error), severity: "error" });
        } finally {
            setLoading({ show: false, message: "" });
        }
    }

    const handleSeeMoreClick = () => {
        fetchQuestions({
            params: {
                productId: product.id,
                sort: 'createdAt,DESC',
                perPage: questionsData.size + 10,
            }
        });
    };

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


    return (
        <>
            <Container>
                <div className="md:flex md:space-x-6">
                    {/* Images */}
                    <div className="md:w-1/2 md:flex md:flex-col">
                        <ProductImagesCarousel
                            images={product?.productImages}
                        />

                        <Swiper
                            autoHeight={true}
                            pagination
                            className="md:hidden mb-4 md:mb-0"
                        >
                            {
                                product?.productImages?.length > 0 &&
                                product?.productImages?.map(image => <SwiperSlide key={image.id}>
                                    <div className="swiper-zoom-container">
                                        <img
                                            src={generateBackendUrl(image.path)}
                                            alt={product?.name}
                                            className="rounded-xl w-full"
                                        />
                                    </div>
                                </SwiperSlide>)}
                        </Swiper>
                    </div>

                    {/* Information */}
                    <div className="md:w-1/2">
                        <div className="flex items-center text-3xl justify-between">
                            <h3 className="font-bold mb-2 uppercase">{product?.name}</h3>
                            {
                                loadingFavorite ?
                                    <div>
                                        Cargando
                                    </div>
                                    :
                                    favorite ?
                                        <IoHeart onClick={() => {
                                            toggleFavorite()
                                        }} className="text-main cursor-pointer" />
                                        :
                                        <IoHeartOutline onClick={() => {
                                            toggleFavorite()
                                        }} className="text-main hover:text-main cursor-pointer" />
                            }
                        </div>

                        <div className="flex items-center space-x-1">
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

                        <p className="mt-6">
                            {product?.productDetails?.shortDescription}
                        </p>

                        {/* Características */}
                        <div className="space-y-3 mt-10">
                            <div className="md:flex">
                                <ProductFeature
                                    className="md:w-1/2"
                                    name="Referencia"
                                    value={product?.productDetails?.reference || 'Sin referencia'}
                                />
                                <ProductFeature
                                    className="md:w-1/2"
                                    name="Metodo de Envio"
                                    value={product?.deliveryMethodTypes.map(item => item.name).join(', ')}
                                />
                            </div>

                            <div className="md:flex">
                                <ProductFeature
                                    className="md:w-1/2"
                                    name="Categorias"
                                    value={product?.categories?.length === 0
                                        ? 'Sin categorias'
                                        : product?.categories?.map((category) => category.name).join(', ')}
                                />
                                <ProductFeature
                                    className="md:w-1/2"
                                    name="Stock"
                                    value={product?.productDetails?.quantity > 0 ? <p className="text-main">En stock</p> : 'Sin existencia'}
                                />
                            </div>

                            <div className="md:flex">
                                <ProductFeature
                                    className="items-center md:w-1/2 md:items-start"
                                    name="Tienda"
                                    value={<div className="text-center hover:shadow-xl transition duration-500">
                                        <Link to={`/stores/${product?.store?.slug}`}>
                                            {
                                                product?.store?.storeProfile?.logo &&
                                                <img
                                                    className="w-12 h-12 rounded m-auto"
                                                    src={product?.store?.storeProfile?.logo ? generateBackendUrl(product?.store?.storeProfile?.logo) : noImage}
                                                    alt={product?.name}
                                                />
                                            }
                                            <p className="text-blue-500">{product?.store?.name}</p>
                                        </Link>
                                    </div>}
                                />
                            </div>
                        </div>

                        {/* Precio */}
                        <div className="flex items-center p-4 bg-white rounded-md mt-10">
                            <div className="md:w-56 flex-shrink-0">
                                {
                                    product?.discount ?
                                        <div>
                                            <p className="text-main text-3xl font-semibold">
                                                {
                                                    product?.productDetails?.price > 0 ?
                                                        <span> {(product?.productDetails?.price - ((product?.productDetails?.price * product?.discount) / 100)).toFixed(2)} USD</span>
                                                        :
                                                        "Gratis"
                                                }
                                            </p>
                                            <p className="line-through text-700 font-semibold opacity-50">{product?.price} USD</p>
                                        </div>
                                        :
                                        <p className="text-main text-3xl font-semibold">
                                            {
                                                Number(product?.productDetails?.price) > 0 ?
                                                    <span> {(Number(product?.productDetails?.price)).toFixed(2)} USD</span>
                                                    :
                                                    "Gratis"
                                            }
                                        </p>
                                }
                            </div>
                            <div className="flex-grow">
                                {
                                    product?.productDetails?.quantity > 0 ?
                                        <div className="flex items-center justify-end space-x-2">
                                            <div className="w-20">
                                                <Select>
                                                    {Array.from(Array(product?.productDetails?.quantity).keys()).map(n => {
                                                        return (
                                                            <option key={n} value={n + 1}>{n + 1}</option>
                                                        )
                                                    })}
                                                </Select>
                                            </div>
                                            <button
                                                className="bg-main flex items-center px-4 py-4 rounded-xl text-white font-bold transition duration-500 hover:bg-gray-100 hover:text-main"
                                                onClick={() => setProductOnModal(product)}
                                            >
                                                <PlusIcon className="w-4 h-4 rounded-xl" />
                                                Comprar
                                            </button>
                                        </div>
                                        :
                                        <div className="text-red-500 text-right">
                                            No hay existencias.
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

            <Container className="mt-10 p-0">
                <TabsProvider>
                    {/* Tabs */}
                    <TabsContainer className="md:flex">
                        <Tab value={0}>Descripción</Tab>
                        <Tab value={1}>Preguntas {questionsData?.total > 0 ? questionsData?.total : null}</Tab>
                        <Tab value={2}>Comparador</Tab>
                        <Tab value={3}>Caracteristicas</Tab>
                        {
                            product?.productVideos?.length > 0 &&
                            <Tab value={4}>Videos</Tab>
                        }
                    </TabsContainer>

                    {/* TAB PANELS */}
                    {/* Description */}
                    <TabPanel className="py-4 animate__animated animate__fadeInUp" value={0}>
                        <div dangerouslySetInnerHTML={{ __html: product?.description }} />
                    </TabPanel>

                    {/* Questions */}
                    <TabPanel className="py-4 space-y-6 animate__animated animate__fadeInUp" value={1}>
                        <QuestionsAnswer
                            questions={questionsData?.results ?? []}
                            ownerName={product?.store?.name}
                            ownerSlug={product?.store?.slug}
                            ownerImage={product?.store?.storeProfile?.logo ? generateBackendUrl(product?.store?.storeProfile?.logo) : ''}
                            onChange={handleQuestionChange}
                            value={questionFormData.question}
                            error={questionsFormErrors.question}
                            onSubmit={handleQuestionSubmit}
                            onSeeMoreClick={handleSeeMoreClick}
                            canSeeMore={questionsData?.results?.length < (questionsData?.total || 0)}
                        />
                    </TabPanel>

                    {/* Price table */}
                    <TabPanel className="py-4 animate__animated animate__fadeInUp" value={2}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell variant="head">Comercio</TableCell>
                                    <TableCell variant="head">Distancia</TableCell>
                                    <TableCell variant="head">Precio de lsita</TableCell>
                                    <TableCell variant="head">Promo A</TableCell>
                                    <TableCell variant="head">Promo B</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {[
                                    { store: { name: 'Express', street: 'Anchomera 1253', state: 'Ciudad Autónoma de Buenos Aires' }, distance: 0.05, price: 135.55 },
                                    { store: { name: 'Supermercados DIA', street: 'CI Charcas 2725', state: 'Capital Federal' }, distance: 0.05, price: 135.65 },
                                    { store: { name: 'COTO CICSA', street: 'Paraguay 2672', state: 'Barrio Norte' }, distance: 0.29, price: 136.69 },
                                    { store: { name: 'Market', street: 'Beruti 2951', state: 'Ciudad Autónoma de Buenos Aires' }, distance: 0.42, price: 135.65 },
                                ].map((item, i) => <TableRow key={i}>
                                    <TableCell>
                                        <div className="flex space-x-4">
                                            <div className="h-16 w-16 border border-gray-100 rounded bg-gray-100"></div>
                                            <div>
                                                <strong>{item.store.name}</strong>
                                                <p>{item.store.street}</p>
                                                <p>{item.store.state}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {item.distance} kilómetros
                                    </TableCell>
                                    <TableCell>$ {item.price}</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>)}
                            </TableBody>
                        </Table>
                    </TabPanel>

                    {/* Features */}
                    <TabPanel className="py-4 animate__animated animate__fadeInUp" value={3}>
                        {
                            product?.productFeatures?.length > 0 &&
                            <ProductFeatureGroup name="Características">
                                {product?.productFeatures?.map((feature, i) => {
                                    return (
                                        <div key={i}>
                                            {feature.name}
                                        </div>
                                    )
                                })}
                            </ProductFeatureGroup>
                        }
                        {
                            product?.productFeatureGroups?.length > 0 && product?.productFeatureGroups?.map((featuresGroup) => <ProductFeatureGroup
                                key={featuresGroup.id}
                                name={featuresGroup.name}
                            >
                                {featuresGroup?.productFeatureForGroups?.map((feature, i) => {
                                    return (
                                        <div key={i}>
                                            {feature?.name}
                                        </div>
                                    )
                                })}
                            </ProductFeatureGroup>)}
                    </TabPanel>
                    <TabPanel className="py-4 animate__animated animate__fadeInUp" value={4}>
                        {
                            product?.productVideos?.map((video, i) => {
                                return (
                                    <VideoComponent url={video?.url} />
                                )
                            })
                        }
                    </TabPanel>
                </TabsProvider>
            </Container>
            <ProductModal product={productOnModal} closeModal={handleCloseModal} />
            <StoreDiscountsModal onClose={handleClose} storeAndProduct={storeAndProduct} />
        </>
    )
}

export default ProductProfile