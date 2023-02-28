import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import CardIssuersList from "../components/CardIssuersList";
import CardsList from "../components/CardsList";
import Checkbox from "../components/Checkbox";
import CustomInput from '../components/CustomInput';
import RatingsFilter from "../components/RatingsFilter";
import { useAuth } from "../contexts/AuthContext";
import useCategories from "../hooks/useCategories";
import useStores from "../hooks/useStores";
import useStoreFeatures from "../hooks/useStoresFeatures";
import useTags from "../hooks/useTags";
import StoresInMap from "./StoresInMap";


const StoresMap = () => {

    const location = useLocation();

    const { setLoading, setCustomAlert } = useAuth();

    const [googleMapsOptions, setGoogleMapsOptions] = useState({ center: { lat: -34.61816057938619, lng: -58.48617933677675 }, zoom: 5 })

    const [googleMapsMarkers, setGoogleMapsMarkers] = useState([]);

    const [selectedStore, setSelectedStore] = useState(null);

    const [filters, setFilters] = useState({
        page: 1,
        perPage: 12,
        storeCategoryIds: [],
        cardIds: [],
        cardIssuerIds: [],
        storeFeatureIds: [],
        tagsIds: [],
        minRating: ""
    });

    const [cardIssuer, setCardIssuer] = useState(null);

    const [card, setCard] = useState(null);

    const [priceFilter, setPriceFilter] = useState({ minPrice: "", maxPrice: "" });

    const [{ categories, error: errorCategories, loading: categoriesLoading }, getCategories] = useCategories();

    const [{ storeFeatures, loading: featuresStoresLoading, error: featuresStoresError }] = useStoreFeatures({ params: { storeCategoryIds: filters.storeCategoryIds.join(","), } });

    const [{ tags, loading: tagsLoading, error: tagsError }] = useTags({ params: { storeCategoryIds: filters.storeCategoryIds.join(","), } });

    const [{ stores, total, numberOfPages, error, loading }, getStores] = useStores({
        params: {
            ...filters,
            cardIssuerIds: filters.cardIssuerIds.join(","),
            cardIds: filters.cardIds.join(","),
            storeCategoryIds: filters.storeCategoryIds.join(","),
            storeFeatureIds: filters.storeFeatureIds.join(",")
        }
    });

    useEffect(() => {
        setLoading?.({ show: loading, message: 'Cargando...' });
    }, [loading])

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const city = params.get('city');

        console.log(city);
    }, [location]);

    const handleChange = (e) => {
        if (e.target.name === "minRating") {
            setFilters((oldFilters) => {
                return {
                    ...oldFilters,
                    [e.target.name]: oldFilters[e.target.name] === e.target.value ? "" : e.target.value
                }
            });
            return;
        }

        if (e.target.type === "checkbox") {
            const value = filters[e.target.name].includes(Number(e.target.value));
            if (value) {
                const newValues = filters[e.target.name].filter(n => n !== Number(e.target.value));
                setFilters((oldFilters) => {
                    return {
                        ...oldFilters,
                        [e.target.name]: newValues,
                        page: 1
                    }
                });
            } else {
                setFilters((oldFilters) => {
                    return {
                        ...oldFilters,
                        [e.target.name]: [Number(e.target.value), ...oldFilters[e.target.name]],
                        page: 1
                    }
                });
            }
            return;
        }
        setFilters((oldFilters) => {
            if (e.target.name !== "page") {
                return {
                    ...oldFilters,
                    [e.target.name]: e.target.value,
                    page: 1
                }
            }
            return {
                ...oldFilters,
                [e.target.name]: e.target.value,
            }
        })
    }

    const handleChangePriceFilter = (e) => {
        setPriceFilter((oldPriceFilter) => {
            return {
                ...oldPriceFilter,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleCardIssuer = (cardIssuer) => {
        setCardIssuer(cardIssuer)
    }

    const handleCard = (card) => {
        setCard(card);
    }

    const hanleMapClick = (e) => {
        console.log(e);
    }

    return (
        <div className="p-4">
            <div className="flex">
                <div className="w-4/12 p-4">
                    <div className="bg-white shadow-xl rounded p-4 space-y-6">
                        <h3 className="text-gray-500 font-bold text-lg">Filtros</h3>
                        <div>
                            <label htmlFor="name" className="text-main text-sm">Nombre</label>
                            <CustomInput id="name" placeholder="Ejem... 'Mac Donalds'" name="name"></CustomInput>
                        </div>

                        <div>
                            <label htmlFor="name" className="text-main text-sm mb-1">Categoria</label>
                            <ul className="text-gray-800 space-y-2 max-h-56 overflow-y-auto mt-2">
                                {
                                    errorCategories ?
                                        <div className="text-center text-red-500">
                                            <p>Ha ocurrido un error.</p>
                                            <button className="bg-main px-4 py-2 rounded text-white" onClick={() => { getCategories() }}>
                                                Reintentar
                                            </button>
                                        </div>
                                        :
                                        categoriesLoading ?
                                            <li>Cargando categorias</li>
                                            :
                                            categories.map((category, i) =>
                                                <li key={i} className="flex items-center space-x-4">
                                                    <Checkbox
                                                        className="capitalize"
                                                        onChange={handleChange}
                                                        name="storeCategoryIds"
                                                        value={category.id}
                                                        checked={filters.storeCategoryIds.includes(category.id)}
                                                        id={`${category.name}-${i}`}
                                                        label={category.name}
                                                    />
                                                </li>
                                            )
                                }
                            </ul>
                        </div>

                        <RatingsFilter
                            className="my-8"
                            onChange={handleChange}
                            name="minRating"
                            values={filters.minRating}
                        />

                        {
                            featuresStoresLoading ?
                                <div className="text-center">
                                    Cargando preferencias...
                                </div>
                                :
                                storeFeatures?.length > 0 && <div>
                                    <h4 className="text-xl font-semibold mb-2">Preferencia</h4>

                                    <ul className="max-h-72 custom-scrollbar overflow-y-auto text-gray-800 space-y-2">
                                        {storeFeatures?.map((storeFeature) => <li key={storeFeature.id}>
                                            <Checkbox
                                                onChange={handleChange}
                                                name="storeFeatureIds"
                                                value={storeFeature.id}
                                                checked={filters.storeFeatureIds.includes(storeFeature.id)}
                                                id={`${storeFeature.name}-${storeFeature.id}`}
                                                label={storeFeature.name}
                                            />
                                        </li>)}
                                    </ul>
                                </div>
                        }

                        {
                            tagsLoading ?
                                <div className="text-center">
                                    Cargando etiquetas...
                                </div>
                                :
                                tags?.length > 0 && <div>
                                    <h4 className="text-xl font-semibold mb-2">Etiquetas</h4>

                                    <ul className="max-h-72 custom-scrollbar overflow-y-auto text-gray-800 space-y-2">
                                        {tags?.map((tags) => <li key={tags.id}>
                                            <Checkbox
                                                onChange={handleChange}
                                                name="tagsIds"
                                                value={tags.id}
                                                checked={filters.tagsIds.includes(tags.id)}
                                                id={`${tags.name}-${tags.id}`}
                                                label={tags.name}
                                            />
                                        </li>)}
                                    </ul>
                                </div>
                        }

                        <CardIssuersList selectedCardIssuer={cardIssuer} emitCardIssuer={handleCardIssuer} />

                        <div className="mt-8">
                            <CardsList selectedCard={card} cardIssuer={cardIssuer} emitCard={handleCard} />
                        </div>
                    </div>
                </div>
                <div className="w-8/12">
                    <StoresInMap stores={stores} />
                </div>
            </div>
        </div>
    )
}

export default StoresMap;