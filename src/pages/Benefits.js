import Container from "../components/Container"
import savings from "../assets/images/alcancia.jpg";
import LeftSidebarLayout from "../components/LeftSidebarLayout";
import Pagination from "../components/Pagination";
import { useEffect, useState } from "react";
import CardIssuersList from "../components/CardIssuersList";
import CardsList from "../components/CardsList";
import ErrorMsg from "../components/ErrorMsg";
import useDiscounts from "../hooks/useDiscounts";
import DiscountStoreCard from "../components/dicounts/DiscountStoreCard";
import DiscountModal from "../components/dicounts/DiscountModal";
import useCategories from "../hooks/useCategories";
import clsx from "clsx";
import FiltersModal from "../components/FiltersModal";
import StoreCategoryFilter from "../components/StoreCategoryFilter";

const Benefits = () => {

  const [filters, setFilters] = useState({
    page: 1,
    isActive: true,
    cardIssuerIds: [],
    cardIds: [],
    perPage: 9,
    storeCategoryIds: []
  });

  const [showFiltersModal, setShowFiltersModal] = useState(false);

  const [cardIssuer, setCardIssuer] = useState(null);

  const [card, setCard] = useState(null);

  const [discount, setDiscount] = useState(null);

  const [{ discounts, error: discountsError, loading: discountsLoading, numberOfPages }, getDiscounts] = useDiscounts({ options: { useCache: false, manual: true } });

  const [{ categories, error: categoriesError, loading: categoriesLoading }, getCategories] = useCategories();

  useEffect(() => {
    getDiscounts({
      params: {
        ...filters,
        cardIssuerIds: filters.cardIssuerIds.join(","),
        cardIds: filters.cardIds.join(","),
        storeCategoryIds: filters.storeCategoryIds.join(",")
      }
    })
  }, [filters]);

  useEffect(() => {
    handleCard(null);
    setFilters((oldFilters) => {
      return {
        ...oldFilters,
        cardIssuerIds: cardIssuer?.id ? [cardIssuer?.id] : [],
        cardIds: [],
        page: 1
      }
    })
  }, [cardIssuer]);

  useEffect(() => {
    setFilters((oldFilters) => {
      return {
        ...oldFilters,
        cardIssuerIds: card ? [] : oldFilters.cardIssuerIds,
        cardIds: card?.id ? [card?.id] : [],
        page: 1
      }
    })
  }, [card]);

  const handleCardIssuer = (cardIssuer) => {
    setCardIssuer(cardIssuer)
  }

  const handleCard = (card) => {
    setCard(card);
  }

  const handleDiscount = (discount) => {
    setDiscount(discount);
  }

  const handleChange = (e) => {
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

  return <>
    <div className="h-80 flex flex-col" style={{
      backgroundImage: `url(${savings})`,
      backgroundSize: '100% 100%',
    }}>
      <Container className="pt-6">
        <h3 className="text-6xl font-semibold">Beneficios</h3>
      </Container>

      <Container className="mt-auto md:flex space-x-2 hidden">
        {
          categories.map((category, i) => <div
            key={i}
            onClick={() => { handleChange({ target: { name: "storeCategoryIds", value: Number(category?.id), type: "checkbox" } }) }}
            className={
              clsx(["flex items-center cursor-pointer justify-center w-1/5 py-3 capitalize hover:bg-main hover:text-white border border-main text-lg font-semibold rounded-md transitioncursor-pointer"], {
                "bg-white": !filters.storeCategoryIds?.includes(category?.id),
                "bg-main text-white": filters.storeCategoryIds?.includes(category?.id),
              })
            }
          >
            {category?.name}
          </div>)}
      </Container>
    </div >

    <Container className="my-10">
      <LeftSidebarLayout
        leftSide={
          window.innerWidth > 768 ?
            <div>
              <h4 className="mb-2 text-center text-xl font-bold">Bancos y Supermercados</h4>
              <CardIssuersList selectedCardIssuer={cardIssuer} emitCardIssuer={handleCardIssuer} />


              <div className="mt-8">
                <CardsList selectedCard={card} cardIssuer={cardIssuer} emitCard={handleCard} />
              </div>

            </div>
            :
            null
        }
      >
        <div className="my-4 text-3xl text-gray-500 font-bold">
          Tiendas con descuentos {cardIssuer ? `- Con ${cardIssuer?.name}` : null} {card ? ` - ${card?.name}` : null}
        </div>
        <div className="p-4 block md:hidden">
          <button
            className="w-full bg-white text-center text-gray-500 p-4 rounded shadow-xl"
            onClick={() => { setShowFiltersModal((oldShowModal) => !oldShowModal) }}
          >
            <span>Mostrar filtros</span>
          </button>
        </div>
        {
          discountsError ?
            <ErrorMsg message="Error al cargar los descuentos. Nuestro equipo ha sido notificado, intente más tarde." />
            :
            discountsLoading ?
              <div style={{ marginTop: 200 }} className="text-center text-gray-500 text-3xl">
                Cargando descuentos...
              </div>
              :
              discounts.length > 0 ?
                <div className="grid md:grid-cols-3 md:justify-none justify-center gap-8">
                  {
                    discounts.map((promo, i) => {
                      return (
                        <DiscountStoreCard key={i} emitDiscount={handleDiscount} discount={promo} />
                      )
                    })
                  }
                </div>
                :
                <div className="text-center text-red-500 text-2xl">
                  No hay descuentos
                </div>
        }
        {
          numberOfPages > 0 &&
          <div className="flex w-full justify-center items-center mt-10">
            <Pagination pages={numberOfPages} activePage={filters.page} onChange={(e) => { handleChange({ target: { name: "page", value: e, type: "number" } }) }}></Pagination>
          </div>
        }
      </LeftSidebarLayout>
      <DiscountModal discount={discount} onClose={() => { setDiscount(null) }} />
      <FiltersModal show={showFiltersModal} onClose={() => { setShowFiltersModal((oldShowModal) => !oldShowModal) }}>
        <StoreCategoryFilter name="storeCategoryIds" onChange={handleChange} values={filters?.storeCategoryIds} />
        <br />
        <div>
          <h4 className="mb-2 text-center text-xl font-bold">Bancos y Supermercados</h4>
          <CardIssuersList selectedCardIssuer={cardIssuer} emitCardIssuer={handleCardIssuer} />
          <div className="mt-8">
            <CardsList selectedCard={card} cardIssuer={cardIssuer} emitCard={handleCard} />
          </div>
        </div>
      </FiltersModal>
    </Container>
  </>;
};

export default Benefits;