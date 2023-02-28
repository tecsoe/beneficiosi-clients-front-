import HomeSlider from "../components/HomeSlider";
import SectionHeading from "../components/SectionHeading";
import { useEffect } from "react";
import useAxios from "../hooks/useAxios";
import { useAuth } from "../contexts/AuthContext";
import useBanners from "../hooks/useBanners";
import useStoreAds from "../hooks/useStoreAds";
import FeaturedStores from "../components/FeaturedStores";
import useFeaturedProducts from "../hooks/useFeaturedProducts";
import GastronomyFeaturedProducts from "../components/GastronomyFeaturedProducts";
import ShowsFeaturedProducts from "../components/ShowsFeaturedProducts";
import SuperMarketsFeaturedProducts from "../components/SuperMarketsFeaturedProducts";
import BolichesFeaturedProducts from "../components/BolichesFeaturedProducts";
import PharmacyFeaturedProducts from "../components/PharmacyFeaturedProducts";
import useAds from "../hooks/useAds";
import ProductsAdsSlider from '../components/ProductsAdsSlider';
import useCategories from '../hooks/useCategories';
import BussinessSection from '../components/BussinessSection';
import HomeBanksDiscountsSlider from '../components/HomeBanksDiscountsSlider';
import DiscountsSlider from '../components/dicounts/DiscountsSlider';
import NecessaryInfo from '../components/NecessaryInfo';
import MobileAppSection from '../components/MobileAppSection';
import StoresNewsPosts from "../components/StoresNewsPosts";

const Home = () => {

  const { setLoading, setCustomAlert } = useAuth();

  const [{ data: businessSectionData, error: businessSectionError }, getBusinessInfo] = useAxios({ url: "/settings/business-info" }, { useCache: false, manual: true });

  const [{ banners, error: errorBanners, }, getBanners] = useBanners({ axiosConfig: { params: { isActive: "true" } }, options: { manual: true, useCache: false } });

  const [{ storeAds, error: errorStoresAds }, getStoreAds] = useStoreAds({ axiosConfig: { params: { isActive: "true" } }, options: { manual: true, useCache: false } });

  const [{ ads, error: adsError }, getAds] = useAds({ axiosConfig: { params: { isActive: "true" } }, options: { manual: true, useCache: false } });

  const [{ categories, error: errorCategories }, getCategories] = useCategories({ options: { manual: true, useCache: false } });

  useEffect(() => {
    setLoading({ show: true, message: "Cargando datos" });
    Promise.all([
      getBusinessInfo(),
      getBanners({ params: { isActive: "true" } }),
      getStoreAds({ params: { isActive: "true" } }),
      getAds({ params: { isActive: "true" } }),
      getCategories()
    ]).then((values) => {
      setLoading({ show: false, message: "" });
    })
  }, [getBusinessInfo, getBanners, getStoreAds, getAds, getCategories, setLoading]);

  useEffect(() => {

    if (businessSectionError) {
      setLoading?.({ show: false, message: "" });
      setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${businessSectionError?.response?.status === 400 ? businessSectionError?.response?.data.message[0] : businessSectionError?.response?.data.message}.`, severity: "error" });
    }

    if (errorBanners) {
      setLoading?.({ show: false, message: "" });
      setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${errorBanners?.response?.status === 400 ? errorBanners?.response?.data.message[0] : errorBanners?.response?.data.message}.`, severity: "error" });
    }

    if (errorStoresAds) {
      setLoading?.({ show: false, message: "" });
      setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${errorStoresAds?.response?.status === 400 ? errorStoresAds?.response?.data.message[0] : errorStoresAds?.response?.data.message}.`, severity: "error" });
    }

    if (adsError) {
      setLoading?.({ show: false, message: "" });
      setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${adsError?.response?.status === 400 ? adsError?.response?.data.message[0] : adsError?.response?.data.message}.`, severity: "error" });
    }

    if (errorCategories) {
      setLoading?.({ show: false, message: "" });
      setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${errorCategories?.response?.status === 400 ? errorCategories?.response?.data.message[0] : errorCategories?.response?.data.message}.`, severity: "error" });
    }
  }, [errorBanners, businessSectionError, errorStoresAds, adsError, errorCategories]);

  return <>
    <HomeSlider banners={banners} />

    {/* CATEGORIES */}
    <div className="container mt-20">
      <div className="block space-y-4 md:flex md:space-x-4 md:space-y-0">
        {categories.map((category, index) => <a
          key={index}
          href={`/products?storeCategoryId=${category?.id}`}
          className="
            flex items-center justify-center
            relative w-full py-8
            text-white font-semibold text-2xl
            rounded-md overflow-hidden shadow
            transform transition duration-300
            hover:-translate-y-1 hover:shadow-2xl
          "
          style={{
            backgroundImage: `url(${process.env.REACT_APP_API_URL}${category.imgPath})`,
            backgroundSize: 'cover',
          }}
        >
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <span className="relative capitalize">{category.name}</span>
        </a>)}
      </div>
    </div>

    <div className="container mt-20">
      <SectionHeading>Descubrí</SectionHeading>
    </div>

    {/* PRODUCT ADS */}
    <div className="container mt-20">
      <ProductsAdsSlider productAds={ads.filter(ads => ads.adsPosition.id === 1)} />
    </div>


    {/* HAGAMOSLO JUNTOS */}
    <BussinessSection businessSectionData={businessSectionData} />

    <div className="container mt-0 md:mt-20 mt-20">
      <SectionHeading>Explorá</SectionHeading>
    </div>

    {/* GASTRONOMIA */}
    <div className="container mt-0 md:mt-20">
      <GastronomyFeaturedProducts categoryInfo={categories.filter(category => category.id === 1)[0]} />
    </div>

    {/* ESPECTACULOS */}
    <div className="container mt-0 md:mt-20">
      <ShowsFeaturedProducts categoryInfo={categories.filter(category => category.id === 2)[0]} />
    </div>

    {/* Supermercados */}
    <div className="container my-0 md:my-20">
      <SuperMarketsFeaturedProducts categoryInfo={categories.filter(category => category.id === 3)[0]} />
    </div>

    <HomeSlider className="my-12 h-84" imgHeight="400px" banners={ads.filter(ads => ads.adsPosition.id === 3)} />

    {/* Boliches */}
    <div className="container my-20">
      <BolichesFeaturedProducts categoryInfo={categories.filter(category => category.id === 4)[0]} />
    </div>

    {/* Farmcias */}
    <div className="container mt-20">
      <PharmacyFeaturedProducts categoryInfo={categories.filter(category => category.id === 5)[0]} />
    </div>

    <div className="container mt-20">
      <SectionHeading>Información de las tiendas</SectionHeading>
    </div>

    {/* TIENDA DESTACADAS */}

    <StoresNewsPosts />

    <div className="container mt-8">
      <SectionHeading>Las Mejores tiendas te esperan</SectionHeading>
    </div>

    {/* TIENDA DESTACADAS */}

    <FeaturedStores storesAds={storeAds} />

    {/*Descuentos*/}

    <DiscountsSlider showTitle slidesPerview={window.innerWidth > 768 ? 3 : 1} />

    {/* BENEFICIOS POR BANCO */}

    <HomeBanksDiscountsSlider />


    <div className="container mt-12">
      <p className="text-center font-bold text-gray-500 text-2xl">Mas Productos</p>
    </div>

    {/* PRODUCT ADS */}
    <div className="container mt-12">
      <ProductsAdsSlider productAds={ads.filter(ads => ads.adsPosition.id === 2)} />
    </div>

    {/* MOBILE APP SECTION */}
    <MobileAppSection />

    {/* WHAT WE OFFER */}

    <NecessaryInfo />
  </>;
};

export default Home;