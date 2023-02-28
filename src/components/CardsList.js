import { useCallback, useEffect, useRef, useState } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import useCards from "../hooks/useCards";
import Button from "./Button";

const CardsList = ({ emitCard, cardIssuer, selectedCard }) => {

    const [filters, setFilter] = useState({
        page: 1,
        cardIssuerId: "",
    });

    const [actualCards, setActualCards] = useState([]);

    const observer = useRef();

    const [{ cards, numberOfPages: cardsPages, error, loading: cardsLoading }, getCards] = useCards({ options: { useCache: false, manual: true } });

    useEffect(() => {
        setActualCards([]);
        setFilter((oldFilters) => {
            return {
                ...oldFilters,
                cardIssuerId: cardIssuer?.id ? cardIssuer?.id : "",
            }
        })
    }, [cardIssuer])

    useEffect(() => {
        getCards({
            params: {
                ...filters
            }
        })
    }, [filters, getCards])

    const lastCardRef = useCallback((card) => {
        if (observer?.current) observer?.current?.disconnect?.();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && cardsPages > filters.page) {
                setFilter((oldFilters) => {
                    return {
                        ...oldFilters,
                        page: oldFilters.page + 1
                    }
                })
            }
        })
        if (card) observer?.current?.observe?.(card)
    }, [cardsPages, filters.page]);

    useEffect(() => {
        setActualCards((oldActualCards) => {
            return [...oldActualCards, ...cards]
        });
    }, [cards]);

    return (
        <>
            <h4 className="mb-2 text-center text-xl font-bold">Tarjetas {cardIssuer ? `de ${cardIssuer?.name}` : null}</h4>
            {
                error &&
                <div className="text-center text-red-500">
                    Ha ocurrido un error.
                    <Button className="bg-main" onClick={() => { getCards() }}>
                        Reintentar
                    </Button>
                </div>
            }
            <div style={{ maxHeight: "500px", overflowY: "auto" }} className="custom-scrollbar px-2">
                {
                    actualCards.length > 0 ?
                        actualCards?.map((card, i) => {
                            return (
                                <div className="relative" key={i}>
                                    {
                                        selectedCard?.id === card?.id &&
                                        <IoCloseCircleSharp
                                            onClick={() => { emitCard(null) }}
                                            className="absolute -top-2 -right-2 text-2xl hover:text-main cursor-pointer transition duration-500"
                                        />
                                    }
                                    <div
                                        onClick={() => { emitCard(card) }}
                                        ref={i + 1 === actualCards.length ? lastCardRef : null}
                                        className="text-center p-4 rounded bg-gray-200 my-4 space-y-2 cursor-pointer transition duration-500 hover:bg-white hover:shadow-xl">
                                        {
                                            card?.imgPath &&
                                            <img className="w-18 h-12 rounded m-auto" src={`${process.env.REACT_APP_API_URL}/${card?.imgPath}`} alt={card?.name} />
                                        }
                                        <p>{card?.name}</p>
                                    </div>
                                </div>
                            )
                        })
                        :
                        !cardsLoading &&
                        <div className="text-center text-red-500 font-bold">
                            No se encontraron tarjetas
                        </div>
                }
                {
                    cardsLoading &&
                    <div className="text-center text-xl">
                        Cargando...
                    </div>
                }
            </div>
        </>
    )
}

export default CardsList;