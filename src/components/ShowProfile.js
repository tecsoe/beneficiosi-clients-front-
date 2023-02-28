import { useCallback, useEffect, useRef, useState } from 'react';
import { IoCheckbox } from 'react-icons/io5';
import { Swiper, SwiperSlide } from 'swiper/react';
import { validURL } from '../helpers/formsValidations';
import { format } from "date-fns";
import { es } from "date-fns/locale";
import CustomSelect from './CustomSelect';
import useAxios from '../hooks/useAxios';
import { useHistory } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import Button from './Button';
import { CalendarComponent } from '@syncfusion/ej2-react-calendars';

const ShowProfile = ({ show }) => {

    const history = useHistory();

    const { setLoading, setCustomAlert } = useAuth();

    const [videoPreview, setVideoPreview] = useState('');

    const [selectedPlace, setSelectedPlace] = useState(null);

    const [total, setTotal] = useState(0);

    const [selectedFunctionShow, setSelectedFunctionShow] = useState(null);

    const [selectedZone, setSelectedZone] = useState(null);

    const [quantity, setQuantity] = useState(1);

    const [filters, setFilters] = useState({
        page: 1,
        isActive: true,
        date: ''
    });

    const [actualShows, setActualShows] = useState([]);

    const observer = useRef();

    const [{ data, error: showsError, loading: showsLoading }, getShows] = useAxios({ url: `/shows/${show?.id}/shows`, params: { ...filters } }, { manual: true, useCache: false });

    const [{ data: createCartData, error: createCartError }, addToCart] = useAxios({ url: `/carts/add-show-to-cart`, method: 'POST' }, { manual: true, useCache: false });

    const lastShowRef = useCallback((show) => {
        if (observer?.current) observer?.current?.disconnect?.();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && data?.numberOfPages > filters.page) {
                setFilters((oldFilters) => {
                    return {
                        ...oldFilters,
                        page: oldFilters.page + 1
                    }
                })
            }
        })
        if (show) observer?.current?.observe?.(show)
    }, [data?.numberOfPages, filters.page]);


    useEffect(() => {
        getShows({
            params: {
                ...filters,
                date: filters?.date ? format(new Date(filters?.date), 'yyyy-MM-dd') : '',
            }
        });
    }, [filters])

    useEffect(() => {
        if (data) {
            setActualShows((oldShows) => {
                return [...oldShows, ...data?.results];
            });
        }
    }, [data]);

    useEffect(() => {
        if (createCartData) {
            setLoading?.({ show: false, message: "" });
            history.push(`/checkout?cartId=${createCartData?.id}`);
        }
    }, [createCartData]);

    useEffect(() => {
        if (createCartError) {
            setLoading?.({ show: false, message: "" });
            setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${createCartError?.response?.status === 400 ? createCartError?.response?.data.message[0] : createCartError?.response?.data.message}.`, severity: "error" });
        }
    }, [createCartError])

    useEffect(() => {
        if (selectedZone) {
            setTotal(Number(selectedZone?.price) * quantity);
        }
    }, [quantity, selectedZone]);

    useEffect(() => {
        if (show) {
            if (validURL(show?.showDetails?.trailer)) {
                var url_string = show?.showDetails?.trailer; //window.location.href
                var url = new URL(url_string);
                var v = url.searchParams.get("v");
                setVideoPreview(`https://www.youtube.com/embed/${v}`);
            }
        }
    }, [show]);

    if (!show) {
        return null;
    }

    const handleBuy = async () => {
        if (!quantity) {
            alert('La cantidad debe ser igual o mayor a 1');
            return;
        }

        if (!selectedFunctionShow) {
            alert('Debe seleccionar una función.');
            return;
        }

        if (!selectedZone) {
            alert('Debe seleccionar una zona.');
            return;
        }

        setLoading({ show: true, message: 'Procesando solicitud' });
        await addToCart({
            data: {
                storeId: show?.store?.storeId,
                productId: show?.id,
                quantity: Number(quantity),
                showId: selectedFunctionShow?.id,
                zoneId: selectedZone?.zone?.id
            }
        });
        setLoading({ show: false, message: '' });
    }

    const handleChange = (e) => {
        setActualShows([]);
        setFilters((oldFilters) => {
            return {
                ...oldFilters,
                [e.target.name]: e.target.value,
                page: 1
            }
        })
    }

    return (
        <>
            <Swiper
                navigation
                onSlideChange={() => null}
                onSwiper={(swiper) => null}
                autoHeight
                className="bg-red-500 z-auto"
            >
                <SwiperSlide className="w-full relative">
                    <img
                        src={`${process.env.REACT_APP_API_URL}/${show?.productImages[1].path}`}
                        alt={show?.name}
                        className="h-[30vh] md:h-[60vh] w-full"
                    />
                    <div className="bg-black justify-between items-center bg-opacity-50 flex absolute z-10 bottom-0 w-full left-0 p-6 text-white">
                        <div className="flex items-center">
                            <div>
                                <img className="w-[50px] rounded" src={`${process.env.REACT_APP_API_URL}/${show?.productImages[0].path}`} alt="" />
                            </div>
                            <div className="ml-4">
                                <p className="text-2xl mb-2">{show?.name}</p>
                                <p>{show?.description}</p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                {
                    videoPreview ?
                        <SwiperSlide className="w-full text-center">
                            <iframe
                                className="w-full md:h-[60vh]"
                                src={videoPreview}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen></iframe>
                        </SwiperSlide>
                        :
                        null
                }
            </Swiper>
            <div className="p-8 md:flex items-center space-y-8 md:space-y-0 justify-between" style={{ background: 'rgba(0,0,0, .3)' }}>
                <div>
                    <a href={`/stores/${show?.store?.slug}`}>
                        {
                            show?.store?.storeProfile?.logo &&
                            <img className="h-28" src={`${process.env.REACT_APP_API_URL}/${show?.store?.storeProfile?.logo}`} alt="" />
                        }
                        <p className="text-4xl text-white">{show?.store?.name}</p>
                    </a>
                </div>
                <div className="text-white">
                    <h2 className="font-bold text-xl">Información de la tienda</h2>
                    <p>Telefono: {show?.store?.phoneNumber}</p>
                    <p>Dirección: {show?.store?.address}</p>
                    <p>Instagram: {show?.store?.storeProfile?.instagram}</p>
                    <p>Whatsapp: {show?.store?.storeProfile?.whatsapp}</p>
                </div>
            </div>
            <div className="p-8">
                <div className="md:flex md:space-x-8 space-y-8 md:space-y-0 w-full justify-between">
                    <div className="md:w-1/2">
                        <div className="md:flex md:items-center md:justify-between w-full">
                            <h3 className="text-center md:text-left text-xl text-gray-500 mb-2 font-bold">
                                Seleccione el dia
                            </h3>

                            <Button onClick={() => {
                                setActualShows([]);
                                setFilters({
                                    page: 1,
                                    isActive: true,
                                    date: ''
                                })
                            }} className="bg-main text-white">
                                Mostrar todo
                            </Button>

                        </div>
                        <CalendarComponent
                            name="date"
                            value={filters?.date}
                            format="dd/MM/yyyy"
                            onChange={handleChange}
                            allowEdit={false}
                            floatLabelType="auto"
                            openOnFocus={true} />
                    </div>
                    <div className="md:w-1/2">
                        <h3 className="text-xl text-center md:text-left text-gray-500 capitalize font-bold">Seleccione la función <b>Total: {actualShows?.length}</b></h3>
                        {
                            showsLoading && actualShows?.length === 0 ?
                                <div className="text-center text-gray-500 text-xl">
                                    Obteniendo Funciones
                                </div>
                                :
                                showsError ?
                                    <div className="text-center text-red-500">
                                        <p>Ha ocurrido un error.</p>
                                        <Button onClick={() => { getShows({ params: { ...filters } }) }} className="bg-main text-white">
                                            Reintentar
                                        </Button>
                                    </div>
                                    :
                                    actualShows?.length > 0 ?
                                        <ul className="custom-scrollbar bg-white shadow-lg p-4 rounded-xl" style={{ maxHeight: "400px", overflowY: 'auto' }}>
                                            {
                                                actualShows?.map((funtionsShow, i) => {
                                                    return (
                                                        <li
                                                            ref={i + 1 === actualShows.length ? lastShowRef : null}
                                                            className="border-b flex justify-between items-center py-4 px-2 rounded cursor-pointer transition duration-500 hover:shadow-xl"
                                                            key={i}
                                                            onClick={() => { setSelectedFunctionShow(funtionsShow) }}
                                                        >
                                                            <span className="capitalize">{`${format(new Date(funtionsShow?.date), 'EEEE', { locale: es })}, ${format(new Date(funtionsShow?.date), 'dd', { locale: es })} de ${format(new Date(funtionsShow?.date), 'LLLL', { locale: es })} de ${format(new Date(funtionsShow?.date), 'yyyy', { locale: es })} a las ${format(new Date(funtionsShow?.date), 'HH:mm:ss', { locale: es })}`} <b>{funtionsShow?.place?.name}</b></span>
                                                            {
                                                                selectedFunctionShow?.id === funtionsShow?.id &&
                                                                <IoCheckbox className="text-green-500 text-2xl animate__animated animate__fadeInUp" />
                                                            }
                                                        </li>
                                                    )
                                                })
                                            }
                                            {
                                                showsLoading &&
                                                <li className="text-center text-gray-500 text-xl">
                                                    Obteniendo Funciones
                                                </li>
                                            }
                                        </ul>
                                        :
                                        <div className="text-red-500 text-xl text-center">
                                            No tiene eventos
                                        </div>
                        }
                    </div>
                </div>
                {
                    selectedFunctionShow &&
                    <div className="animate__animated animate__fadeInUp">
                        <h1 className="text-center text-gray-500 text-2xl mt-8">Seleccione los puestos</h1>
                        <div className="md:flex justify-between space-y-8 md:space-y-0 md:space-x-8 mt-4 border-t py-8">
                            <div className="md:w-1/2">
                                <h3 className="text-center text-gray-500 text-2xl mb-2">Mapa del lugar</h3>
                                <img src={`${process.env.REACT_APP_API_URL}/${selectedFunctionShow?.place?.imgPath}`} alt="" />
                            </div>
                            <div className="md:w-1/2">
                                <h3 className="text-center text-gray-500 text-2xl mb-2">Seleccione la zona</h3>
                                {selectedFunctionShow?.showToZones?.length > 0 ?
                                    <ul>
                                        {
                                            selectedFunctionShow?.showToZones?.map((zone, i) => {
                                                return (
                                                    <li
                                                        className="border-b flex justify-between items-center py-4 px-2 rounded cursor-pointer transition duration-500 hover:shadow-xl"
                                                        key={i}
                                                        onClick={() => { setSelectedZone(zone) }}>
                                                        <span>{zone?.zone?.name} <b className="text-xl text-gray-500">${zone?.price}</b></span>
                                                        {
                                                            zone?.id === selectedZone?.id &&
                                                            <IoCheckbox className="text-green-500 text-2xl animate__animated animate__fadeInUp" />
                                                        }
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                    :
                                    <div className="text-red-500 text-xl">
                                        No tiene zonas
                                    </div>
                                }
                                {
                                    selectedZone &&
                                    <div className="animate__animated animate__fadeInUp mt-8">
                                        <h3 className="text-center text-gray-500 text-lg mb-4">Seleccione la cantidad de asientos:</h3>
                                        <CustomSelect value={quantity} name="quantity" onChange={(e) => { setQuantity(e.target.value) }}>
                                            {Array.from(Array(selectedZone?.availableSeats).keys()).map(n => {
                                                return (
                                                    <option key={n} value={n + 1}>{n + 1}</option>
                                                )
                                            })}
                                        </CustomSelect>
                                        <div className="text-right text-gray-500 text-xl mt-4">
                                            <b>TOTAL: ${total}</b>
                                        </div>
                                        <div className="text-center mt-8">
                                            <button onClick={handleBuy} className="bg-main text-white px-8 py-2 rounded transition duration-500 hover:bg-white hover:text-main hover:shadow-xl">
                                                Realizar Pedido
                                            </button>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default ShowProfile;