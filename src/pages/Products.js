import Button from "../components/Button";
import ChevronRightIcon from "../components/ChevronRightIcon";
import Container from "../components/Container";
import Pagination from "../components/Pagination";
import Checkbox from "../components/Checkbox";
import LeftSidebarLayout from "../components/LeftSidebarLayout";
import { useEffect, useState } from "react";
import ProductsCollection from "../components/ProductsCollection";
import { useAuth } from "../contexts/AuthContext";
import ErrorMsg from "../components/ErrorMsg";
import RatingsFilter from "../components/RatingsFilter";
import PriceFilter from "../components/PriceFilter";
import useProducts from "../hooks/useProducts";
import useCategories from "../hooks/useCategories";
import useTags from "../hooks/useTags";
import HomeSlider from "../components/HomeSlider";
import useAds from "../hooks/useAds";
import { useLocation } from "react-router-dom";
import DiscountsSlider from "../components/dicounts/DiscountsSlider";
import CardIssuersList from "../components/CardIssuersList";
import CardsList from "../components/CardsList";
import SelectGridMode from "../components/SelectGridMode";
import ProductsFilters from "../components/ProductsFilters";
import FiltersModal from "../components/FiltersModal";
import { format } from "date-fns";

const Products = () => {

  const location = useLocation();

  const { setLoading, setCustomAlert } = useAuth();

  const [isInGridView, setIsInGridView] = useState(true);

  const [showFiltersModal, setShowFiltersModal] = useState(false);

  const [filters, setFilters] = useState({
    page: 1,
    perPage: 12,
    storeCategoryIds: [],
    tagIds: [],
    cardIds: [],
    cardIssuerIds: [],
    minRating: "",
    showDate: ''
  });

  const [cardIssuer, setCardIssuer] = useState(null);

  const [card, setCard] = useState(null);

  const [priceFilter, setPriceFilter] = useState({ minPrice: "", maxPrice: "" });
  const [{ products, total, numberOfPages, error, loading }, getProducts] = useProducts({
    params: {
      ...filters
    }
  });

  const [{ ads: adsBanners, error: errorBannersAds, loading: loadingBannersAds }] = useAds({ options: { useCahe: false }, axiosConfig: { params: { adsPositionId: 5, isActive: "true" } } })

  const [{ ads: adsLeftBanners, error: errorLeftBanners, loading: loadingLeftBannersAds }] = useAds({ options: { useCahe: false }, axiosConfig: { params: { adsPositionId: 4, isActive: "true" } } })

  const [{ categories, error: errorCategories }] = useCategories();


  useEffect(() => {
    console.log(products);
  }, [products]);

  useEffect(() => {
    if (errorBannersAds) {
      setLoading?.({ show: false, message: "" });
      setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${errorBannersAds?.response?.status === 400 ? errorBannersAds?.response?.data.message[0] : errorBannersAds?.response?.data.message}.`, severity: "error" });
    }
    if (errorLeftBanners) {
      setLoading?.({ show: false, message: "" });
      setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${errorLeftBanners?.response?.status === 400 ? errorLeftBanners?.response?.data.message[0] : errorLeftBanners?.response?.data.message}.`, severity: "error" });
    }
    if (errorCategories) {
      setLoading?.({ show: false, message: "" });
      setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${errorCategories?.response?.status === 400 ? errorCategories?.response?.data.message[0] : errorCategories?.response?.data.message}.`, severity: "error" });
    }
  }, [errorBannersAds, errorCategories, errorLeftBanners])

  useEffect(() => {
    setLoading({ show: loadingBannersAds, message: "Obteniendo Banners" });
  }, [loadingBannersAds]);

  useEffect(() => {
    setLoading({ show: loadingLeftBannersAds, message: "Cargando publicidades" });
  }, [loadingLeftBannersAds]);

  useEffect(() => {
    setLoading({ show: loading, message: "Cargando" });
  }, [loading]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const storeCategoryId = params.get('storeCategoryId');

    if (storeCategoryId) {
      handleChange({ target: { name: "storeCategoryIds", value: Number(storeCategoryId), type: "checkbox" } })
    }
  }, [location]);

  useEffect(() => {
    getProducts({
      params: {
        ...filters,
        showDate: filters?.showDate ? format(new Date(filters?.showDate), 'yyyy-MM-dd') : '',
        storeCategoryIds: filters.storeCategoryIds.join(","),
        cardIds: filters?.cardIds?.join(","),
        cardIssuerIds: filters?.cardIssuerIds?.join?.(","),
        tagIds: filters.tagIds.join(","),
        ...priceFilter
      }
    });
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

  const handleView = (value) => {

    if (value === 'grid') {
      setIsInGridView(true);
      return;
    }

    if (value === 'list') {
      setIsInGridView(false);
      return;
    }
  }

  return <>
    <HomeSlider banners={adsBanners} />
    <div className="bg-white shadow-sm">
      <Container className="py-5">
        <div className="md:flex justify-between items-center space-y-4 md:space-y-0">
          <h2 className="text-3xl font-semibold">Comprar</h2>
          <SelectGridMode onChange={handleView} />
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
              <ProductsFilters onChange={handleChange} filters={filters} />
              <PriceFilter
                className=" my-8"
                min={{ value: priceFilter.minPrice, name: "minPrice" }}
                max={{ value: priceFilter.maxPrice, name: "maxPrice" }}
                onChange={handleChangePriceFilter}
                onSubmit={(e) => { if (e) { e?.preventDefault() } getProducts({ params: { ...filters, ...priceFilter, storeCategoryId: filters?.storeCategoryId?.join(",") } }) }}
              />
              <CardIssuersList selectedCardIssuer={cardIssuer} emitCardIssuer={handleCardIssuer} />
              <div className="mt-8">
                <CardsList selectedCard={card} cardIssuer={cardIssuer} emitCard={handleCard} />
              </div>
              <Button
                color="white"
                endAdorment={<ChevronRightIcon className="w-3 h-3" fill="none" />}
                to="/benefits"
              >
                Beneficios
              </Button>
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
        <DiscountsSlider slidesPerview={window.innerWidth > 768 ? 1.5 : 1} />
        {error
          ? <ErrorMsg message="Error al cargar los productos. Nuestro equipo ha sido notificado, intente más tarde." />
          : products.length > 0
            ? <ProductsCollection
              products={products}
              isInGridView={isInGridView}
            />
            : <div className="text-center text-red-500 text-xl">
              No se encontraron productos.
            </div>
        }
      </LeftSidebarLayout>

      <div className="flex justify-center items-center mt-10">
        {
          numberOfPages > 0 ?
            <Pagination
              pages={numberOfPages}
              activePage={filters.page}
              onChange={e => { handleChange({ target: { name: "page", value: e } }) }}
            />
            :
            null
        }
      </div>
    </Container>
    <FiltersModal show={showFiltersModal} onClose={() => { setShowFiltersModal((oldShowModal) => !oldShowModal) }}>
      <ProductsFilters onChange={handleChange} filters={filters} />
      <PriceFilter
        className=" my-8"
        min={{ value: priceFilter.minPrice, name: "minPrice" }}
        max={{ value: priceFilter.maxPrice, name: "maxPrice" }}
        onChange={handleChangePriceFilter}
        onSubmit={(e) => { if (e) { e?.preventDefault() } getProducts({ params: { ...filters, ...priceFilter, storeCategoryId: filters?.storeCategoryId?.join(",") } }) }}
      />
      <CardIssuersList selectedCardIssuer={cardIssuer} emitCardIssuer={handleCardIssuer} />
      <div className="mt-8">
        <CardsList selectedCard={card} cardIssuer={cardIssuer} emitCard={handleCard} />
      </div>
      <br />
      <Button
        color="white"
        endAdorment={<ChevronRightIcon className="w-3 h-3" fill="none" />}
        to="/benefits"
      >
        Beneficios
      </Button>
      {
        adsLeftBanners.map((leftBanner, i) => {
          return (
            <a href={leftBanner.url} key={i}>
              <img className="w-full h-[120px] my-6 rounded" src={`${process.env.REACT_APP_API_URL}/${leftBanner.imgPath}`} alt={`leftBanner-${i}`} />
            </a>
          )
        })
      }
    </FiltersModal>
  </>
};

export default Products;