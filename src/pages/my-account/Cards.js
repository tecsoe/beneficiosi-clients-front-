import { useEffect, useState } from "react";
import { IoCard } from "react-icons/io5";
import SelectCardsList from "../../components/SelectCardsList";
import useAxios from "../../hooks/useAxios";
import { useAuth } from "../../contexts/AuthContext";
import useCards from "../../hooks/useCards";


const Cards = () => {

    const { setLoading, setCustomAlert, user } = useAuth();

    const [userCardsIds, setUserCardsIds] = useState([]);

    const [selectedCardId, setSelectedCardId] = useState(null);

    const [{ data: addCardData, error: addCardError, loading: addCardLoading }, addCard] = useAxios({ method: 'POST' }, { manual: true, useCache: false });

    const [{ cards, error: cardsError }, getCards] = useCards({ axiosConfig: { params: { isOwnedById: user?.id, perPage: 100 } }, options: { useCache: false } });

    useEffect(() => {
        if (cards.length > 0) {
            setUserCardsIds(cards.map((card) => card.id));
        }
    }, [cards])

    useEffect(() => {
        if (addCardData) {
            setUserCardsIds((oldUserCardsIds) => {
                return [...oldUserCardsIds, selectedCardId];
            });
            setSelectedCardId(null);
            setCustomAlert({ show: true, message: 'Tarjeta añadida exitosamente.', severity: 'success' })
        }

        if (!addCardData && selectedCardId) {
            setUserCardsIds((oldUserCardsIds) => {
                return oldUserCardsIds.filter((userCardsIds) => userCardsIds !== selectedCardId);
            });
            setSelectedCardId(null);
            setCustomAlert({ show: true, message: 'Tarjeta removida exitosamente.', severity: 'success' })
        }
    }, [addCardData])

    useEffect(() => {
        setLoading({ show: addCardLoading, message: 'Añadiendo tarjeta' });
    }, [addCardLoading])

    useEffect(() => {
        if (addCardError) {
            setLoading?.({ show: false, message: "" });
            setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${addCardError?.response?.status === 400 ? addCardError?.response?.data.message[0] : addCardError?.response?.data.message}.`, severity: "error" });
        }
    }, [addCardError])

    const handleChange = (card) => {
        setSelectedCardId(card?.id);
        addCard({ url: `/client-cards/${card?.id}` })
    }

    return (
        <div className="p-8 h-screen" style={{ overflowX: 'hidden' }}>
            <div className="text-2xl font-bold text-gray-500 mb-4 flex items-center space-x-4">
                <IoCard />
                <p>Mis tarjetas</p>
            </div>

            <SelectCardsList values={userCardsIds} onChange={handleChange} />

        </div>
    )
}

export default Cards;