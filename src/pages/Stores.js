import { useEffect, useState } from "react";
import Container from "../components/Container";
import Pagination from "../components/Pagination";
import LeftSidebarLayout from "../components/LeftSidebarLayout";

import StoresCollection from "../components/StoresCollection";

import StoresInMap from "./StoresInMap";


import useStores from "../hooks/useStores";

import { useAuth } from "../contexts/AuthContext";

import useAds from "../hooks/useAds";
import HomeSlider from "../components/HomeSlider";
import DiscountsSlider from "../components/dicounts/DiscountsSlider";
import CardIssuersList from "../components/CardIssuersList";
import CardsList from "../components/CardsList";
import SelectGridMode from "../components/SelectGridMode";
import StoresFilters from "../components/StoresFilters";
import FiltersModal from "../components/FiltersModal";

const Stores = () => {

  const { setLoading, setCustomAlert } = useAuth();

  const [filters, setFilters] = useState({
    page: 1,
    perPage: 12,
    storeCategoryIds: [],
    minRating: "",
    withCheapestProduct: true,
    cardIssuerIds: [],
    cardIds: [],
    storeFeatureIds: [],
    locationIds: []
  });

  const [cardIssuer, setCardIssuer] = useState(null);

  const [card, setCard] = useState(null);

  const [showFiltersModal, setShowFiltersModal] = useState(false);

  const [viewType, setViewType] = useState('grid');
  const [canShowLoading, setCanShowLoading] = useState(false);

  const [{ ads: adsBanners, error: errorBannersAds }, getBannersAds] = useAds({ options: { useCahe: false }, axiosConfig: { params: { adsPositionId: 7, isActive: "true" } } })

  const [{ ads: adsLeftBanners, error: errorLeftBanners }, getLeftAds] = useAds({ options: { useCahe: false }, axiosConfig: { params: { adsPositionId: 8, isActive: "true" } } })

  const [{ stores, total, numberOfPages, error, loading }, getStores] = useStores({
    params: {
      ...filters,
      cardIssuerIds: filters.cardIssuerIds.join(","),
      cardIds: filters.cardIds.join(","),
      storeCategoryIds: filters.storeCategoryIds.join(","),
      storeFeatureIds: filters.storeFeatureIds.join(","),
      locationIds: filters?.locationIds?.join(',')
    }
  });


  useEffect(() => {
    console.log(filters?.locationIds);
  }, [filters?.locationIds])

  useEffect(() => {
    setLoading({ show: true, message: "Obteniendo Informacion" });
    Promise.all([getStores(), getBannersAds({ params: { adsPositionId: 7, isActive: "true" } }), getLeftAds({ params: { adsPositionId: 8, isActive: "true" } })]).then((values) => {
      setLoading({ show: false, message: "" });
      setCanShowLoading(true);
    })
  }, [getStores, getBannersAds, getLeftAds, setLoading, setCanShowLoading]);

  useEffect(() => {
    console.log(stores);
  }, [stores])

  useEffect(() => {
    if (canShowLoading) {
      setLoading({ show: loading, message: "Cargando tiendas" });
    }
  }, [canShowLoading]);

  useEffect(() => {
    if (error) {
      setLoading?.({ show: false, message: "" });
      setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${error?.response?.status === 400 ? error?.response?.data.message[0] : error?.response?.data.message}.`, severity: "error" });
    }
    if (errorBannersAds) {
      setLoading?.({ show: false, message: "" });
      setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${errorBannersAds?.response?.status === 400 ? errorBannersAds?.response?.data.message[0] : errorBannersAds?.response?.data.message}.`, severity: "error" });
    }
    if (errorLeftBanners) {
      setLoading?.({ show: false, message: "" });
      setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${errorLeftBanners?.response?.status === 400 ? errorLeftBanners?.response?.data.message[0] : errorLeftBanners?.response?.data.message}.`, severity: "error" });
    }
  }, [error, errorBannersAds, errorLeftBanners, setLoading, setCustomAlert]);

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

  useEffect(() => {
    if (viewType === 'map') {
      setFilters((oldFilters) => {
        return {
          ...oldFilters,
          perPage: 100,
          page: 1
        }
      });
    } else {
      setFilters((oldFilters) => {
        return {
          ...oldFilters,
          perPage: 12,
        }
      });
    }
  }, [viewType])

  const handleChange = (e) => {    

    console.log(e);

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
        console.log(newValues);
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

  const handleCardIssuer = (cardIssuer) => {
    setCardIssuer(cardIssuer)
  }

  const handleCard = (card) => {
    setCard(card);
  }

  return <>
    <HomeSlider banners={adsBanners} />
    <div className="bg-white shadow-sm">
      <Container className="py-5 mt-0">
        <div className="md:flex justify-between items-center">
          <h2 className="text-3xl font-semibold">Tiendas</h2>
          <br />
          <SelectGridMode onChange={(value) => { setViewType(value) }} viewType={viewType} />
        </div>
      </Container>
    </div>

    <div className="p-4 block md:hidden">
      <button
        className="w-full bg-white text-center text-gray-500 p-4 rounded shadow-xl"
        onClick={() => { setShowFiltersModal((oldShowModal) => !oldShowModal) }}
      >
        <span>Mostrar filtros</span>
      </button>
    </div>
    <Container withMargin className="mb-10 md:mb-20 mt-0 md:mt-20">
      <LeftSidebarLayout
        leftSide={
          window.innerWidth > 768 ?
            <>
              <StoresFilters onChange={handleChange} filters={filters} />
              <div className="text-center text-xl">
                Entes
              </div>
              <CardIssuersList selectedCardIssuer={cardIssuer} emitCardIssuer={handleCardIssuer} />

              <div className="mt-8">
                <CardsList selectedCard={filters?.card} cardIssuer={cardIssuer} emitCard={handleCard} />
              </div>
              {
                adsLeftBanners.map((leftBanner, i) => {
                  return (
                    <a href={leftBanner.url} key={i}>
                      <img className="w-full h-[120px] my-6 rounded" src={`${process.env.REACT_APP_API_URL}/${leftBanner.imgPath}`} alt={`leftBanner-${i}`} />
                    </a>
                  )
                })
              }
            </>
            :
            null
        }
      >
        <div className="md:mb-10">
          <DiscountsSlider slidesPerview={window.innerWidth > 768 ? 1.5 : 1} />
        </div>

        {
          stores.length > 0 ?
            <div>
              {viewType === 'map' && <StoresInMap stores={stores} />}
              {viewType !== 'map' && <StoresCollection stores={stores} isInGridView={viewType === 'grid'} />}
            </div>
            :
            <div className="text-center text-red-500 text-xl">
              No se encontraron resultados.
            </div>
        }
      </LeftSidebarLayout>


      <div className="flex w-full justify-center items-center mt-10">
        <Pagination pages={numberOfPages} activePage={filters.page} onChange={(e) => { handleChange({ target: { name: "page", value: e, type: "number" } }) }}></Pagination>
      </div>
    </Container>
    <FiltersModal show={showFiltersModal} onClose={() => { setShowFiltersModal((oldShowModal) => !oldShowModal) }}>
      <StoresFilters onChange={handleChange} filters={filters} />
      <div className="text-center text-xl">
        Entes
      </div>
      <CardIssuersList selectedCardIssuer={cardIssuer} emitCardIssuer={handleCardIssuer} />

      <div className="mt-8">
        <CardsList selectedCard={filters?.card} cardIssuer={cardIssuer} emitCard={handleCard} />
      </div>
    </FiltersModal>
  </>;
};

export default Stores;