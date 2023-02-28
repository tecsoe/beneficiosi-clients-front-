import { useCallback, useEffect, useRef, useState } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import useCardsIssuers from "../hooks/useCardsIssuers";
import Button from "./Button";

const CardIssuersList = ({ emitCardIssuer, selectedCardIssuer }) => {

    const [filters, setFilter] = useState({
        page: 1
    });



    const [actualCardIssuers, setActualCardIssuers] = useState([]);

    const observer = useRef();

    const [{ cardsIssuers, numberOfPages: cardsIssuersPages, error, loading: cardIssuersLoading }, getCardsIssuers] = useCardsIssuers({ options: { useCache: false, manual: true } });

    useEffect(() => {
        getCardsIssuers({
            params: {
                ...filters
            }
        })
    }, [filters, getCardsIssuers])

    const lastCardIssuerRef = useCallback((cardIssuer) => {
        if (observer?.current) observer?.current?.disconnect?.();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && cardsIssuersPages > filters.page) {
                setFilter((oldFilters) => {
                    return {
                        ...oldFilters,
                        page: oldFilters.page + 1
                    }
                })
            }
        })
        if (cardIssuer) observer?.current?.observe?.(cardIssuer)
    }, [cardsIssuersPages, filters.page]);

    useEffect(() => {
        setActualCardIssuers((oldActualCardIssuers) => {
            return [...oldActualCardIssuers, ...cardsIssuers]
        });
    }, [cardsIssuers]);

    return (
        <>
            <h4 className="text-center text-xl font-bold">Entes</h4>
            <div style={{ maxHeight: "500px", overflowY: "auto" }} className="custom-scrollbar px-2">
                {
                    error &&
                    <div className="text-center text-red-500">
                        <p>Ha ocurrido un error al obtener los entes</p>
                        <Button className="bg-main" onClick={() => { getCardsIssuers() }}>
                            Reintentar
                        </Button>
                    </div>
                }
                {
                    actualCardIssuers?.map((cardIssuer, i) => {
                        return (
                            <div className="relative" key={i}>
                                {
                                    selectedCardIssuer?.id === cardIssuer?.id &&
                                    <IoCloseCircleSharp
                                        onClick={() => { emitCardIssuer(null) }}
                                        className="absolute -top-2 -right-2 text-2xl hover:text-main cursor-pointer transition duration-500"
                                    />
                                }
                                <div
                                    onClick={() => { emitCardIssuer(cardIssuer) }}
                                    ref={i + 1 === actualCardIssuers.length ? lastCardIssuerRef : null}
                                    className="text-center p-4 rounded bg-gray-200 my-4 space-y-2 cursor-pointer transition duration-500 hover:bg-white hover:shadow-xl">
                                    {
                                        cardIssuer?.imgPath &&
                                        <img className="w-12 h-12 rounded m-auto" src={`${process.env.REACT_APP_API_URL}/${cardIssuer?.imgPath}`} alt={cardIssuer?.name} />
                                    }
                                    <p>{cardIssuer?.name}</p>
                                </div>
                            </div>
                        )
                    })
                }
                {
                    cardIssuersLoading &&
                    <div className="text-center text-xl">
                        Cargando...
                    </div>
                }
            </div>
        </>
    )
}

export default CardIssuersList;