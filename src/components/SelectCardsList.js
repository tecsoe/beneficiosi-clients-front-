import { useCallback, useEffect, useRef, useState } from "react";
import { IoCheckmark } from "react-icons/io5";
import { useAuth } from "../contexts/AuthContext";
import useCards from "../hooks/useCards";
import Button from "./Button";
import CustomInput from "./CustomInput";

const SelectCardsList = ({ onChange, name, className, values }) => {

    const { user } = useAuth();

    const [{ cards, total, numberOfPages, error, loading }, getCards] = useCards();

    const [showMyCards, setShowMyCards] = useState(false);

    const [actualCards, setActualCards] = useState([]);

    const [filters, setFilters] = useState({ name: "", cardIssuerName: "", page: 1, isOwnedById: "" });

    const observer = useRef();

    const lastCardRef = useCallback((card) => {
        if (loading) return
        if (observer?.current) observer?.current?.disconnect?.();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && filters.page < numberOfPages) {
                handleFilterChange({ target: { name: "page", value: filters.page + 1 } });
            }
        })
        if (card) observer?.current?.observe?.(card)
    }, [loading, numberOfPages, filters]);

    useEffect(() => {
        setActualCards([]);
        setFilters((oldFilters) => {
            return {
                ...oldFilters,
                page: 1,
                isOwnedById: showMyCards ? user?.id : ''
            }
        })
    }, [showMyCards])

    useEffect(() => {
        setActualCards((oldCards) => {
            return [...oldCards, ...cards];
        })
    }, [cards])

    useEffect(() => {
        getCards({ params: { ...filters } });
    }, [filters])

    const handleFilterChange = (e) => {
        setFilters((oldFilters) => {
            if (e.target.name !== "page") {
                setActualCards([]);
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

    const handleChange = (card) => {
        onChange(card);
    }

    return (
        <>
            <div className="md:flex justify-between">
                <h3>Filtros:</h3>
                <p>Resultados: {actualCards.length}</p>
                <div className="text-right">
                    <Button onClick={() => { setShowMyCards((oldShowMyCards) => !oldShowMyCards) }} className="bg-main">
                        Mostrar solo mis tarjetas
                    </Button>
                </div>
            </div>
            <div className="md:flex items-center md:space-x-4 space-y-4 my-2">
                <CustomInput name="name" onChange={handleFilterChange} value={filters.name} placeholder="Nombre" />
                <CustomInput name="cardIssuerName" onChange={handleFilterChange} value={filters.cardIssuerName} placeholder="Nombre del emisor" />
            </div>
            <div className={`overflow-y-auto px-4 custom-scrollbar w-full ${className}`}>
                {
                    error ?
                        <div className="text-red-500 text-center">
                            Ha ocurrido un error:  <span onClick={() => { getCards() }}>¿desea reintentar?</span>
                        </div>
                        :
                        actualCards.length > 0 ?
                            <div>
                                <h1 className="text-center mt-4 font-bold">Seleccione sus tarjetas</h1>
                                <div className="flex cursor-pointer flex-wrap space-y-4 space-x-4 justify-center items-center mt-4 animate__animated animate__fadeInUp">
                                    {
                                        actualCards?.map((card, i) => {
                                            return (
                                                <div
                                                    onClick={() => { handleChange(card) }}
                                                    ref={i + 1 === actualCards.length ? lastCardRef : null}
                                                    key={i}
                                                    className="space-x-4 relative bg-white text-center shadow p-4 rounded space-y-2">
                                                    {
                                                        values?.includes(card?.id) &&
                                                        <IoCheckmark
                                                            className="absolute text-green-500 -top-2 -right-2 text-2xl hover:text-main cursor-pointer transition duration-500"
                                                        />
                                                    }
                                                    {card?.imgPath &&
                                                        <img className="w-12 h-8 md:w-20 md:h-14 rounded inline" src={`${process.env.REACT_APP_API_URL}/${card?.imgPath}`} alt="" />
                                                    }
                                                    <p>{card?.name} {`- ${card?.cardIssuer?.name}`}</p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            :
                            <div className="text-center text-red-500">
                                No hay Tarjetas.
                            </div>
                }
                {
                    total === actualCards.length &&
                    <div className="text-center text-gray-500 text-xl">
                        No hay mas resultados
                    </div>
                }
                {
                    loading &&
                    <div className="text-center text-gray-500 text-xl">
                        Cargando...
                    </div>

                }
            </div>
        </>
    )
}

export default SelectCardsList;