# 🚀 Beneficiosi Clients Frontend
## Tecnologías
* [Node.js](#item1)
* [React JS](#item2)
* [TailwindCSS](#item3)
## Instalación
```
git clone https://github.com/Tecsoe/beneficiosi-clients-front.git
cd beneficiosi-clients-front
npm install
cp .env-example .env
```
Configurar variables de entorno en el archivo .env
```
npm run start
```
## Componentes
* [dicounts](#item4)
* [DiscountStoreCard.js](#item5)
* [DiscountsSlider.js](#item6)
* [AppLayout.js](#item7)
* [CardIssuersList.js](#item8)
* [CardsList.js](#item9)
* [Container.js](#item10)
* [Footers.js](#item11)
* [LeftSidebarLayout.js](#item12)
* [NavLinks.js](#item13)
* [NavSearchBar.js](#item14)
* [Navbar.js](#item15)
* [PageLogo.js](#item16)
* [RatingsFilter.js](#item17)
* [SelectCardsList.js](#item18)
* [SelectUserToLogin.js](#item19)
* [StoreDiscountCard.js](#item20)
* [StoreFeatureFilter.js](#item21)
* [StoreInfo.js](#item22)
* [TagsFilter.js](#item23)
* [TagsFilterPrecio.js](#item24)
* [DiscountModal.js](#item25)
* [Map.js](#item26)
* [BolichesFeaturedProducts.js](#item27)
* [BussinessSection.js](#item28)
* [CategoryFilter.js](#item29)
* [CategorySectionCard.js](#item30)
* [CategoryDetailsCard.js](#item31)
* [CheckoutDetailsCard.js](#item32)
* [CustomInput.js](#item33)
* [FeaturedStores.js](#item34)
* [GastronomyFeaturedProducts.js](#item35)
* [HomeSlider.js](#item36)
* [MobileAppSection.js](#item37)
* [NecessaryInfo.js](#item38)
* [Pagination.js](#item39)
* [PharmacyFeaturedProducts.js](#item40)
* [ProductAdCard.js](#item41)
* [ProductCard.js](#item42)
* [ProductHorizontalCard.js](#item43)
* [ProductImagesCarousel.js](#item44)
* [ProductModal.js](#item45)
* [ProductProfile.js](#item46)
* [ProductsAdsSlider.js](#item47)
* [ProductsCollection.js](#item48)
* [ProductsFilters.js](#item49)
* [ProductsGrid.js](#item50)
* [QuestionsAnswer.js](#item51)
* [SearchAddressFilter.js](#item52)
* [SearchInputMobile.js](#item53)
* [SectionHeading.js](#item54)
* [Select.js](#item55)
* [SelectDeliverySection.js](#item56)
* [SelectGridMode.js](#item57)
* [ShareIcon.js](#item58)
* [ShowsFeaturedProducts.js](#item59)
* [StarIcon.js](#item60)
* [StoreCard.js](#item61)
* [StoreCategoryFilter.js](#item62)
* [StoreHorizontalCard.js](#item63)
* [StoresCollection.js](#item64)
* [StoresFilters.js](#item65)
* [SuperMarketsFeaturedProducts.js](#item66)
* [TableBody.js](#item67)
* [TableCell.js](#item68)
* [TableHead.js](#item69)
* [TableRow.js](#item80)
* [TextField.js](#item81)
* [UserAddressCard.js](#item82)
* [Componente usado para la informacion de las direcciones del cliente](#item83)
* [VideoComponent.js](#item84)
* [WhatsappIcon.js](#item85)
* [WidgetComponent.js](#item86)
* [logOutModal.js](#item87)
* [statCard.js](#item88)
* [StoreNewPost.js](#item89)
* [Checkbox.js](#item90)
* [TabContainer.js](#item91)


<a name="item4"></a>
### dicounts
---
Carpeta Principal que se encarga del contener los componentes de Descuento aplicado en la pagina de Beneficio.

[Subir](#top)

<a name="item5"></a>
### DiscountStoreCard.js
---
Componente donde se visualiza informacion de la tienda con su respectivo descuento y los agencias afiliadas a este beneficio

```
import { Link } from "react-router-dom";
import Button from "../Button";

const DiscountStoreCard = ({ discount, className, emitDiscount, ...rest }) => {
    return (
        <div
            {...rest}
            className={`flex flex-col justify-center items-center p-8 max-w-[300px] bg-white rounded-md shadow hover:shadow-lg transition ${className}`}
        >
            <div className="text-right w-full mb-4">
                {
                    discount?.store?.isOpen ?
                        <Button className="bg-green-500">
                            Abierta
                        </Button>
                        :
                        <Button className="bg-red-500">
                            Cerrada
                        </Button>
                }
            </div>
            <img
                src={`${process.env.REACT_APP_API_URL}/${discount?.store?.storeProfile?.logo}`}
                alt={discount?.store?.name}
                className="h-20"
            />
            <Link to={`/stores/${discount?.store?.slug}`}>
                <p className="text-gray-500 text-2xl text-center font-semibold my-3">{discount?.store?.name}</p>
            </Link>

            <p className="text-xl leading-none text-gray-600 tracking-tight uppercase">Descuento del {discount?.value}%</p>
            {
                discount?.discountType?.code === "dit-002" &&
                <div className="text-gray-600 text-center space-y-2 mt-4">
                    <p>En tarjetas seleccionadas.</p>
                    <p className="text-main cursor-pointer" onClick={() => { emitDiscount(discount) }}>
                        Ver tarjetas
                    </p>
                </div>
            }

            {
                discount?.discountType?.code === "dit-001" &&
                <div className="text-gray-600 text-center space-y-2 mt-4">
                    <p>En Bancos seleccionados.</p>
                    <p className="text-main cursor-pointer" onClick={() => { emitDiscount(discount) }}>
                        Ver Bancos
                    </p>
                </div>
            }

            {
                discount?.discountType?.code === "dit-003" &&
                <div className="text-gray-600 text-center space-y-2 mt-4">
                    <p>En todos nuestros productos.</p>
                    <p className="text-main cursor-pointer">
                        <Link to={`/stores/${discount?.store?.slug}`}>
                            Ver catalogo.
                        </Link>
                    </p>
                </div>
            }
        </div>
    )
}

export default DiscountStoreCard;
```

![](https://i.imgur.com/uJOv7jl.png)
[Subir](#top)

<a name="item6"></a>
### DiscountsSlider.js
---
Componente encargado del diseño del swiper del componente creado.

```
import SectionHeading from "../SectionHeading";
import { Swiper, SwiperSlide } from 'swiper/react';
import StoreDiscountCard from "../StoreDiscountCard";
import Button from "../Button";
import { useEffect, useState } from "react";
import DiscountModal from "./DiscountModal";
import useDiscounts from "../../hooks/useDiscounts";

const DiscountsSlider = ({ showTitle, storeId, slidesPerview }) => {

    const [discount, setDiscount] = useState(null);

    const [filters, setFilters] = useState({
        page: 1,
        isActive: true,
        storeIds: storeId ? [storeId] : []
    });

    const [{ discounts, error: discountsError, loading: discountsLoading }, getDiscounts] = useDiscounts({ axiosConfig: { params: { ...filters, storeIds: storeId } }, options: { useCache: false, manual: true } });

    useEffect(() => {
        getDiscounts({
            params: {
                ...filters,
                storeIds: storeId
            }
        })

    }, [storeId])

    const handleDiscount = (discount) => {
        setDiscount(discount);
    }

    return (
        <div>
            {
                showTitle &&
                <div className="container mt-20">
                    <SectionHeading>Descuentos</SectionHeading>
                </div>
            }

            <div className="md:px-24">
                {
                    discountsError ?
                        <div className="text-red-500 text-center">
                            <p>Ha ocurrido un error.</p>
                            <Button className="bg-main" onClick={() => { getDiscounts() }}>
                                Reintentar
                            </Button>
                        </div>
                        :
                        discountsLoading ?
                            <div className="text-center text-2xl text-gray-500">
                                Cargando descuentos...
                            </div>
                            :
                            discounts?.length > 0 ?
                                <Swiper
                                    navigation
                                    style={{ padding: '0 100px' }}
                                    className="my-20"
                                    onSlideChange={() => { }}
                                    slidesPerView={slidesPerview ? slidesPerview : 1}
                                    spaceBetween={50}
                                    onSwiper={(swiper) => { }}
                                >
                                    {
                                        discounts.map((discount, i) =>
                                            <SwiperSlide key={i}>
                                                <StoreDiscountCard emitDiscount={handleDiscount} storeType={storeId ? true : false} storeDiscount={discount}></StoreDiscountCard>
                                            </SwiperSlide>
                                        )
                                    }
                                </Swiper>
                                :
                                null
                }
                <DiscountModal discount={discount} onClose={() => { setDiscount(null) }} />
            </div>
        </div>
    )
}

export default DiscountsSlider;
```

![](https://i.imgur.com/R95hlvr.png)
[Subir](#top)

<a name="item7"></a>
### AppLayout.js
---
Es un componente padre de enrutamiento entre los hijos Navbar y Footer. Este contiene una variable que permite agregar el contenido correspondiente a casa pagina de la aplicacion.

```
import Navbar from "./Navbar";
import Footer from "./Footers";

const AppLayout = ({ children }) => {
  return <div className="min-h-screen bg-gray-50 text-sm text-gray-900 open-sans">
    <Navbar />

    {children}

    {/* FOOTER */}
    <Footer />
  </div>;
};

export default AppLayout;
```

[Subir](#top)

<a name="item8"></a>
### CardIssuersList.js
---
Componente que contiene las diferentes cards de las agencias bancarias y supermercados entes con el respectivo descuento.

```
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
```

![](https://i.imgur.com/FxlH1yr.png)
[Subir](#top)

<a name="item9"></a>
### CardsList.js
---
Componente donde muestra las diferentes tarjetas de sus agencias bancarias respectivas.

```
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
```

![](https://i.imgur.com/dqLmVYV.png)
[Subir](#top)

<a name="item10"></a>
### Container.js
---
Componente de navegacion que contine las diferentes categorias del marketplace como gastronomia espectaculos supermercados boliches y farmacias.

```
import clsx from "clsx";
const Container = ({ children, withMargin = false, className }) => {
  return <div className={clsx('container', withMargin && 'mt-20', className)}>
    {children}
  </div>;
};
export default Container;
```

![](https://i.imgur.com/IfTKKfy.png)
[Subir](#top)


<a name="item11"></a>
### Footers.js
---
Componente encargado para la vista del pie de pagina del sitio, contiene elementos para el redirecionamiento de las redes del sitio como Facebook, Twitter, Instagram, Youtube.

```
import useAxios from "../hooks/useAxios";
import { Link } from "react-router-dom";
import SystemInfo from "../util/SystemInfo";
import { useEffect, useState } from "react";
import clsx from "clsx";
import WidgetComponent from "./WidgetComponent";
const Footer = () => {

    const [{ data: footerData, error: footerError, loading: footerLoading }, getFooter] = useAxios({ url: `/settings/footer-sections` }, { useCache: false });

    const [footer, setFooter] = useState({});

    useEffect(() => {
        if (footerData) {
            setFooter(footerData);
        }
    }, [footerData])

    return (
        <footer className="bg-gray-800 text-white mt-auto pt-12 pr-12 pl-12 pb-2">
            <div className="container h-full">
                <div className="flex items-center mb-2">
                    <img src={SystemInfo.logo} className="w-12" alt={SystemInfo.name} />
                    <p className="font-bold text-white text-md ml-3">{SystemInfo.name}</p>
                </div>
                <div className="block md:flex justify-between items-top h-full">
                    {
                        Object.keys(footer).map((section, i) => {
                            return (
                                <div key={i} className={clsx(['text-center'], {
                                    'hidden': !footer[section]?.isActive
                                })}>
                                    <div>
                                        <h1 className="text-white font-bold my-5">
                                            {footer[section]?.name}
                                        </h1>
                                        <div className="space-y-2">
                                            {
                                                footer[section]?.widgets?.map((widget, i2) => {
                                                    return (
                                                        <WidgetComponent widget={widget} key={i2} />
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="text-center mt-4">
                    <p>© 2019 <span className="text-main">{SystemInfo.name}.</span> Todos los derechos reservados. Diseñado por J.V & A.N</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
```

![](https://i.imgur.com/xBPihZX.png)
[Subir](#top)

<a name="item12"></a>
### LeftSidebarLayout.js
---
Componente padre que contiene los elementos del sidebar y del body de la pagina donde se pueden apreciar las agencias bancarias los supermecados entes y tiendas.

```
const LeftSidebarLayout = ({children, leftSide}) => {
  return <div className="flex space-x-6">
    {leftSide && <div className="w-60 space-y-6 flex-shrink-0">{leftSide}</div>}
    <div className="flex-grow min-w-0">{children}</div>
  </div>;
};
export default LeftSidebarLayout;
```

![](https://i.imgur.com/RDdV2Ax.png)
[Subir](#top)

<a name="item13"></a>
### NavLinks.js
---
Componente que contiene los botones de Comprar ayuda y ingresar.

```
import { useState } from "react";
import { IoLogOut, IoPersonCircleSharp, IoCartSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import NotificationsComponent from "./notifications/NotificationsComponent";
import SelectUserToLogin from "./SelectUserToLogin";

const NavLinks = () => {

    const { user, setAuthInfo } = useAuth();

    const [show, setShow] = useState(false);

    const handleClick = () => {
        setAuthInfo({ isAuthenticated: false, user: null, token: null });
    }

    return (
        <div className="hidden md:flex items-center">
            <nav className="space-x-5 mr-5">
                <Link className="hover:text-main" to="/products">Comprar</Link>
                <a className="hover:text-main" href="/helps">Ayuda</a>
            </nav>
            {
                user ?
                    <div className="flex space-x-6 items-center">
                        <div className="flex items-center space-x-4 relative">
                            <Link className="flex items-center uppercase space-x-1 hover:text-main" to={"/my-account"}>
                                <p>{user.name}</p>
                                <IoPersonCircleSharp className="text-xl" />
                            </Link>
                            <Link title="Mis Carritos" className="hover:text-main" to={"/my-account/carts"}>
                                <IoCartSharp className="text-xl" />
                            </Link>
                            <NotificationsComponent />
                        </div>

                        <button onClick={handleClick} className="flex hover:text-main transition duration-500 focus:outline-none">
                            Cerrar Sesión
                            <IoLogOut className="text-xl ml-2" />
                        </button>

                    </div>

                    :
                    <button onClick={() => { setShow(true) }} className="inline-flex items-center justify-center px-3 py-2 space-x-2 leading-4 border border-white rounded">
                        <IoPersonCircleSharp className="text-xl" />
                        <span>Ingresar</span>
                    </button>
            }
            <SelectUserToLogin show={show} setShow={setShow}></SelectUserToLogin>
        </div>
    )
}

export default NavLinks;
```

![](https://i.imgur.com/T25jQZT.png)
[Subir](#top)

<a name="item14"></a>
### NavSearchBar.js
---
Componente que contiene los botones de buscar.

```
import { IoSearchSharp } from "react-icons/io5";
import useCategories from "../hooks/useCategories";

const NavSearchBar = ({ onChange, onSubmit, data }) => {

    const [{ categories, error: errorCategories, loading: categoriesLoading }] = useCategories();

    return (
        <form className="hidden relative md:flex items-center flex-grow" onSubmit={onSubmit}>
            <select
                name="storeCategoryId"
                style={{width: 150}}
                value={data.storeCategoryId}
                onChange={onChange}
                disabled={errorCategories || categoriesLoading ? true : false}
                className="bg-main h-full text-white border-none capitalize absolute rounded border-gray-300 focus:border-gray-300 focus:ring focus:ring-gray-200 focus:ring-opacity-50 text-sm leading-4"
            >
                <option value="">Todo</option>
                {categories.map((category, i) => {
                    return (
                        <option className="text-white capitalize" value={category.id} key={i}>{category.name}</option>
                    )
                })}
            </select>
            <input
                name="search"
                style={{paddingLeft: 155, paddingRight: 50}}
                value={data.search}
                onChange={onChange}
                placeholder="Nombre de tienda, producto..."
                className="w-full text-black rounded border-gray-300 focus:border-gray-300 focus:ring focus:ring-gray-200 focus:ring-opacity-50 text-sm leading-4"
                type="text"
            />
            <button className="absolute rounded bg-main text-white h-full text-center" style={{right: 0, width: 40}}>
                <IoSearchSharp className="m-auto"/>
            </button>
        </form>
    )
}

export default NavSearchBar;
```

![](https://i.imgur.com/xBPihZX.png)
[Subir](#top)

<a name="item15"></a>
### Navbar.js
---
Contiene la parte superior del header donde se ubica los items que direcciona la navegación del usuario que contiene el componente NavLinks, NavSearchBar. Tambien esta compuesto por la franga roja que contiene localizacion, ofretas, servicios y comercios.

```
import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import IPData from 'ipdata';
import PageLogo from './PageLogo';
import NavSearchBar from './NavSearchBar';
import NavLinks from './NavLinks';
import { IoCart, IoClose, IoMenu, IoSearch } from 'react-icons/io5';
import MobileMenu from './MobileMenu';
import useCategories from '../hooks/useCategories';
import SearchInputMobile from './SearchInputMobile';

const ipdata = new IPData('67c7dfbb37526fc8f7beacac55a5030413e74e26dab32be0e25cbc57');

const Navbar = () => {

  const history = useHistory();

  const [locationInfo, setLocationInfo] = useState({});

  const [ipData, setIpData] = useState(ipdata);

  const [showMenu, setShowMenu] = useState(false);

  const [showSearchBar, setShowSearchBar] = useState(false);

  const [searchData, setSearchData] = useState({ storeCategoryId: "", search: "" })

  const [{ categories, error: errorCategories, loading: categoriesLoading }] = useCategories();

  useEffect(() => {
    ipData.lookup().then((response) => {
      setLocationInfo(response);
    })
  }, [ipData])

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSearchBar(false);
    history.push(`/search?storeCategoryId=${searchData.storeCategoryId}&search=${searchData.search}`);
  }

  const handleChange = (e) => {
    setSearchData((oldSearchData) => {
      return {
        ...oldSearchData,
        [e.target.name]: e.target.value
      }
    })
  }

  return <>
    <div className="h-14 bg-gray-800 text-white">
      <div className="container h-full">
        <div className="flex space-x-4 justify-between md:justify-none items-center h-full">

          <PageLogo />

          <NavSearchBar onChange={handleChange} onSubmit={handleSubmit} data={searchData} />

          <NavLinks />

          <div className="md:hidden items-center flex space-x-4">
            <button onClick={() => { setShowSearchBar((oldShowSearchBar) => !oldShowSearchBar) }}>
              <IoSearch className="text-2xl" />
            </button>

            <Link type="button" title="Mis Carritos" to={"/my-account/carts"}>
              <IoCart className="text-2xl" />
            </Link>

            <button onClick={() => { setShowMenu((oldShowMenu) => !oldShowMenu) }} type="button" aria-controls="mobile-menu" aria-expanded="false">
              {
                showMenu ?
                  <IoClose className="text-2xl" />
                  :
                  <IoMenu className="text-2xl" />
              }
            </button>

          </div>
        </div>
      </div>
    </div>

    <MobileMenu show={showMenu} onClose={() => { setShowMenu((oldShowMenu) => !oldShowMenu) }} />

    <SearchInputMobile onClose={() => { setShowSearchBar((oldShowSearchBar) => !oldShowSearchBar) }} show={showSearchBar} onClick={() => { setShowSearchBar((oldShowSearchBar) => !oldShowSearchBar) }}>
      <form className="items-center px-10 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="stores-categories">Categorias</label>
          <select
            id="stores-categories"
            name="storeCategoryId"
            value={searchData.storeCategoryId}
            onChange={handleChange}
            disabled={errorCategories || categoriesLoading ? true : false}
            className="w-full capitalize rounded border-gray-300 focus:border-gray-300 focus:ring focus:ring-gray-200 focus:ring-opacity-50 bg-transparent text-sm leading-4"
          >
            <option value="">Seleccione una categoria</option>
            {categories.map((category, i) => {
              return (
                <option className="text-black capitalize" value={category.id} key={i}>{category.name}</option>
              )
            })}
          </select>
        </div>
        <div>
          <label htmlFor="search">Buscar</label>
          <input
            name="search"
            value={searchData.search}
            onChange={handleChange}
            id="search"
            placeholder="Nombre de tienda, producto..."
            className="w-full rounded border-gray-300 focus:border-gray-300 focus:ring focus:ring-gray-200 focus:ring-opacity-50 bg-transparent text-sm leading-4"
            type="text"
          />
        </div>
        <div className="text-center">
          <button className="bg-main px-8 py-2 rounded text-white transition duration-300 hover:bg-white hover:shadow-xl hover:text-main">
            Aceptar
          </button>
        </div>
      </form>
    </SearchInputMobile>

    <div className="bg-main text-white py-2">
      <div className="container relative space-y-2">
        <div className="relative md:absolute -mt-2 space-x-2 text-xs">
          <Link className="flex items-center" to={locationInfo?.city ? `/map?city=${locationInfo?.city}` : `/map`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <div className="flex flex-col">
              <span>Enviar a </span>
              <b>{locationInfo?.region ? locationInfo?.region : 'Buenos Aires'}, {locationInfo?.city ? locationInfo?.city : 'C.A.B.A'}</b>
            </div>
          </Link>
        </div>
        <div className="flex items-center justify-center flex-wrap">
          <nav className="flex items-center space-x-7">
            <a href="/benefits">Ofertas del dia</a>
            <a href="/#">Servicio al cliente</a>
            <Link to="/stores">Comercios</Link>
          </nav>
        </div>
      </div>
    </div>
  </>;
};

export default Navbar;
```

![](https://i.imgur.com/sQH93oK.png)
[Subir](#top)

<a name="item16"></a>
### PageLogo.js
---
Componete encargado de clasificar el ratin de la busqueda, en en el sitio, que varia desde un rango desde el mas valorado hast ael menos valorado.

```
import { Link } from "react-router-dom";
import SystemInfo from "../util/SystemInfo";

const PageLogo = () => {
    return (
        <Link className="flex items-center text-white space-x-4" to="/">
            <img
                src={SystemInfo.logo}
                alt={SystemInfo.name}
                className="inline-block h-9 rounded-lg"
            />
            <span className="md:hidden">{SystemInfo.name}</span>
        </Link>
    )
}

export default PageLogo;
```

![](https://i.imgur.com/0PD6ZOW.png)
[Subir](#top)

<a name="item17"></a>
### RatingsFilter.js
---
Componente donde si visualiza informacion de la tienda con su respectivo descuento y los agencias afiliadas a este beneficio.

```
import Checkbox from "./Checkbox";
import StarIcon from "./StarIcon";

const RatingsFilter = (props) => {

    const { onChange, name, values, ...rest } = props;

    return (
        <div {...rest}>
            <h4 className="text-xl font-semibold mb-2">Rating</h4>

            <ul className="text-gray-800 space-y-3">
                {Array.from(Array(5).keys()).map(i => <li
                    key={i}
                    className="flex items-center space-x-2"
                >
                    <Checkbox
                        value={i + 1}
                        checked={values?.includes(i + 1)}
                        onChange={onChange}
                        name={name}
                        label={
                            <div className="flex space-x-1">
                                {Array.from(Array(i + 1).keys()).map(n => <StarIcon
                                    key={n}
                                    className="w-4 h-4 text-yellow-400"
                                />)}
                            </div>
                        }
                    />
                </li>)}
            </ul>
        </div>
    )
}

export default RatingsFilter;
```

![](https://i.imgur.com/kzIls4O.png)
[Subir](#top)

<a name="item18"></a>
### SelectCardsList.js
---
Titulación de las secciones. Recibe parametro de texto modificable, debido a que se utiliza en varias secciones del Home.

```
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
```

![](https://i.imgur.com/X28kSxn.png)
[Subir](#top)

<a name="item19"></a>
### SelectUserToLogin.js
---
Componente encargado del diseño de seleccion de si eres user o tienda.

```
import clsx from "clsx";
import { useEffect, useState } from "react";

//ICONS
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoStorefrontSharp } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { IoCheckmarkCircleSharp } from "react-icons/io5";

//
import { useHistory } from 'react-router-dom';
import SystemInfo from "../util/SystemInfo";

const SelectUserToLogin = (props) => {

  const { show, setShow } = props;
  const [userType, setUserType] = useState(null);
  const history = useHistory();

  const handleContinue = () => {
    console.log(userType);
    if (userType === 'client') {
      history.push('/login');
    } else {
      window.location = 'http://stores.tubeneficiosi.com/';
    }
    closeModal();
  }

  const handleClick = (e) => {
    setUserType(e)
  }

  const closeModal = () => {
    setShow(false);
  }

  return (
    <div
      className={clsx('h-full w-full bg-black bg-opacity-50 fixed top-0 left-0 z-[9999999999999999999] flex animate__animated animate__fadeIn', {
        'hidden': !show
      })}>
      <div
        className={clsx('m-auto w-1/2 bg-white rounded relative p-4 animate__animated animate__fadeInUp', {
          'hidden': !show
        })}>
        <IoIosCloseCircleOutline onClick={closeModal} className="absolute -top-4 -right-4 text-4xl cursor-pointer text-main" />
        <div className="flex items-center">
          <img src={SystemInfo.logo} className="w-1/12" alt="" />
          <p className="text-gray-800 text-lg ml-4 font-bold">{SystemInfo.name}</p>
        </div>

        <h1 className="text-center text-gray-700 text-bold text-2xl my-5">Por favor selecciona el tipo de usuario:</h1>

        <div className="flex mt-12 justify-between items-center text-gray-600">
          <div className="w-1/2 border-r border-gray-500">
            <div className="p-4">
              <div onClick={() => { handleClick('client') }} className="hover:shadow-2xl py-4 hover:text-main cursor-pointer transition duration-500 relative">
                {
                  userType === 'client' ?
                    <IoCheckmarkCircleSharp className="absolute top-0 right-0 text-green-500 text-[40px]"></IoCheckmarkCircleSharp>
                    :
                    null
                }
                <IoPersonOutline className="m-auto text-[120px]"></IoPersonOutline>
                <h1 className="text-center text-3xl">
                  Cliente
                </h1>
              </div>
            </div>
          </div>
          <div className="w-1/2">
            <div className="p-4">
              <div onClick={() => { handleClick('store') }} className="hover:shadow-2xl py-4 hover:text-main cursor-pointer transition duration-500 hover:shadow-2xl relative">
                {
                  userType === 'store' ?
                    <IoCheckmarkCircleSharp className="absolute top-0 right-0 text-green-500 text-[40px]"></IoCheckmarkCircleSharp>
                    :
                    null
                }
                <IoStorefrontSharp className="m-auto text-[120px]"></IoStorefrontSharp>
                <h1 className="text-center text-3xl">
                  Tienda
                </h1>
              </div>
            </div>
          </div>
        </div>
        <p className="p-4 text-center text-xs mt-4">
          Por favor indique el tipo de usuario con el que desea iniciar sesion o registrarse en nuestra plataforma.
        </p>

        <div className="text-center mt-8">

          <button onClick={handleContinue} disabled={!userType} className={clsx('px-24 py-4 rounded-full transition duration-500', {
            'bg-gray-100 text-gray-500': !userType,
            'bg-main text-white': userType,
          })}>
            <p className="font-bold text-xl">Continuar</p>
          </button>
        </div>
      </div>
    </div >
  )

}

export default SelectUserToLogin;
```

![](https://i.imgur.com/IoXxBH0.png)
[Subir](#top)

<a name="item20"></a>
### StoreDiscountCard.js
---
Componente que filtra resultados por preferencia ya sea por wifi, parques para niños, estacionamientos.

```
import { Link } from "react-router-dom";

const StoreDiscountCard = ({ storeDiscount, storeType, emitDiscount }) => {

  return (
    <>
      {
        storeType ?
          <div className="rounded overflow-hidden relative">
            {
              storeDiscount?.imgPath &&
              <img className="h-36 w-full " src={`${process.env.REACT_APP_API_URL}/${storeDiscount?.imgPath}`} alt="" />
            }
            <div style={{ position: "absolute", height: "100%", width: "100%", backgroundColor: "rgba(0,0,0, .5)", display: "flex", top: 0, left: 0 }}>
              <div className="m-auto text-center text-white text-xl">

                {
                  storeDiscount?.discountType?.code === "dit-003" &&
                  <p>{storeDiscount?.name}</p>
                }

                {
                  storeDiscount?.value &&
                  <p>Descuento del {storeDiscount?.value}%</p>
                }

                {
                  storeDiscount?.discountType?.code === "dit-002" &&
                  <>
                    <p>En tarjetas seleccionadas.</p>
                    <p className="cursor-pointer" onClick={() => { emitDiscount(storeDiscount) }}>
                      Ver tarjetas
                    </p>
                  </>

                }

                {
                  storeDiscount?.discountType?.code === "dit-001" &&
                  <>
                    <p>En Bancos seleccionados.</p>
                    <p className="cursor-pointer" onClick={() => { emitDiscount(storeDiscount) }}>
                      Ver Bancos
                    </p>
                  </>

                }
              </div>
            </div>
          </div>
          :
          <div
            className="bg-white flex align-center p-3 rounded-lg"
          >
            <div className="w-3/12 text-center p-1 border-r border-gray">
              <img className="m-auto w-1/2 text-center" src={`${process.env.REACT_APP_API_URL}/${storeDiscount.store?.storeProfile?.logo}`} alt={storeDiscount?.store?.name} />
              <p className="text-gray-700 font-semibold text-center break-words">
                {storeDiscount?.store?.name}
              </p>
            </div>
            <div className="w-2/3 text-right">
              <div className="text-main">
                <p className="text-4xl text-bold">
                  {storeDiscount?.value}%
                </p>
                <p className="text-xs">Descuento</p>
              </div>
              <div className="mt-2">
                <Link to={`/stores/${storeDiscount.store?.slug}`}>
                  <button className="mt-2 bg-red-100 md:px-5 transition text-red-600 duration-500 hover:text-white hover:bg-main py-1 rounded-full">
                    <p className="font-extrabold text-lg">
                      Ir a tienda
                    </p>
                  </button>
                </Link>
              </div>
            </div>
          </div>
      }
    </>
  )
};

export default StoreDiscountCard;
```

![](https://i.imgur.com/NzCfUIz.png)
[Subir](#top)

<a name="item21"></a>
### StoreFeatureFilter.js
---
Componente que filtra resultados por preferencia ya sea por wifi, parques para niños, estacionamientos.

```
import useStoreFeatures from "../hooks/useStoresFeatures";
import Checkbox from "./Checkbox";

const StoreFeatureFilter = ({ onChange, name, values, filters }) => {

    const [{ storeFeatures, loading: featuresStoresLoading, error: featuresStoresError }, getFeatures] = useStoreFeatures({ params: { storeCategoryIds: filters?.storeCategoryIds.join(","), } });

    return (
        <div>
            {
                featuresStoresLoading ?
                    <div className="text-center">
                        Cargando preferencias...
                    </div>
                    :
                    featuresStoresError ?
                        <div className="text-red-500 text-center">
                            <p>Ha ocurrido un error</p>
                            <button onClick={() => { getFeatures() }}>Reintentar</button>
                        </div>
                        :
                        storeFeatures?.length > 0 && <div>
                            <h4 className="text-xl font-semibold mb-2">Preferencia</h4>

                            <ul className="max-h-72 custom-scrollbar overflow-y-auto text-gray-800 space-y-2">
                                {storeFeatures?.map((storeFeature) => <li key={storeFeature.id}>
                                    <Checkbox
                                        onChange={onChange}
                                        name={name}
                                        value={storeFeature.id}
                                        checked={values.includes(storeFeature.id)}
                                        id={`${storeFeature.name}-${storeFeature.id}`}
                                        label={storeFeature.name}
                                    />
                                </li>)}
                            </ul>
                        </div>
            }

        </div>
    )
}

export default StoreFeatureFilter;
```

![](https://i.imgur.com/Ef5YO1W.png)
[Subir](#top)

<a name="item22"></a>
### StoreInfo.js

Componente con una descripcion de la informacion de la tienda telefono y sus respectivas redes sociales Facebook Instagram y Whatsapp.

```
import { IoStorefrontSharp } from "react-icons/io5";

const StoreInfo = (props) => {

    const { phoneNumber, shortDescription, instagram, facebook, whatsapp } = props;

    return (
        <div>
            <h1 className="text-xl text-gray-600 font-bold flex flex-wrap items-center">
                <IoStorefrontSharp className="mr-4 text-4xl" />
                <p>Informacion de la tienda</p>
            </h1>
            <div>
                <p className="my-2"><span className="text-gray-700 font-bold">Telefono:</span> {phoneNumber}</p>
                <p className="my-2"><span className="text-gray-700 font-bold">Descripcion:</span> {shortDescription}</p>
                <p className="my-2"><span className="text-gray-700 font-bold">Instagram:</span> {instagram}</p>
                <p className="my-2"><span className="text-gray-700 font-bold">Facebook:</span> {facebook}</p>
                <p className="my-2"><span className="text-gray-700 font-bold">Whatsapp:</span> {whatsapp}</p>
            </div>
        </div>
    )
}

export default StoreInfo;
```

![](https://i.imgur.com/j7pHNdg.png)
[Subir](#top)

<a name="item23"></a>
### TagsFilter.js

Componente mediante el cual cumple la funcion de filtrar los items por sus respectivas etiquetas, ya sea por bebidas, comida rapida, alimentos , estacionamiento.

```
import Checkbox from "./Checkbox";

const TagsFilter = (props) => {

    const { values, loading, tags, onChange, name, ...rest } = props;

    return (
        <div {...rest}>
            <h4 className="text-xl font-semibold mb-2">Etiquetas</h4>
            {
                loading ?
                    <div className="text-center">
                        Cargando etiquetas...
                    </div>
                    :
                    tags?.length > 0 ?
                        <ul className="max-h-40 overflow-y-auto text-gray-800 space-y-2">
                            {
                                tags.map((tag, i) => {
                                    return (
                                        <li key={i}>
                                            <Checkbox
                                                label={tag.name}
                                                name={name}
                                                value={tag.id}
                                                onChange={onChange}
                                                checked={values.includes(tag.id)}
                                            />
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        :
                        <div className="text-red-500">
                            No se encontraron etiquetas.
                        </div>
            }
        </div>
    )
}

export default TagsFilter;
```

![](https://i.imgur.com/iLIWI2V.png)
[Subir](#top)

<a name="item24"></a>
### TagsFilters.js

Componete donde se visualiza y cumple la funcion de visualizar y filtrar los minimos y los maximos de los precios de sus productos

```
import useTags from "../hooks/useTags";
import Checkbox from "./Checkbox";

const TagsFilter = ({ onChange, filters, values, name }) => {

    const [{ tags, loading: loadingTags, error: errorTags }, getTags] = useTags({ params: { storeCategoryIds: filters?.storeCategoryIds?.join(","), } });

    return (
        <div>
            {
                loadingTags ?
                    <div className="text-center text-gray-500">
                        Obteniendo etiquetas
                    </div>
                    :
                    errorTags ?
                        <div className="text-red-500 text-center">
                            <p>Ha ocurrido un error.</p>
                            <button className="bg-main text-white" onClick={() => { getTags() }}>
                                Reintentar
                            </button>
                        </div>
                        :
                        <>
                            <h4 className="text-xl font-semibold mb-2">Etiquetas</h4>
                            <ul className="max-h-72 custom-scrollbar overflow-y-auto text-gray-800 space-y-2">
                                {tags?.map((tag) => <li key={tag.id}>
                                    <Checkbox
                                        onChange={onChange}
                                        name={name}
                                        value={tag.id}
                                        checked={values?.includes(tag.id)}
                                        id={`${tag.name}-${tag.id}`}
                                        label={tag.name}
                                    />
                                </li>)}
                            </ul>
                        </>
            }
        </div>
    )
}

export default TagsFilter;
```

![](https://i.imgur.com/5204kLy.png)
[Subir](#top)

<a name="item25"></a>
### DiscountModal.js

Componete usado para una ventana emergente para la visualizacion de los bancos afiliados en el descuento de una tienda.

```
import { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import reactDom from "react-dom";
import { Link } from "react-router-dom";
import DiscountCardRow from "./DiscountCardRow";
import DiscountCardIssuerRow from "./DiscountCardIssuerRow";
import Button from "../Button";

const DiscountModal = ({ discount, onClose, hiddenStoreButton, description }) => {

    const modalRef = useRef();

    const handleCloseModal = (e) => {
        if (modalRef.current === e.target) {
            onClose();
        }
    }

    if (!discount) {
        return null;
    }

    return reactDom.createPortal(
        <div ref={modalRef} onClick={handleCloseModal} className="fixed md:px-0 px-8 flex z-50 h-screen w-screen bg-black bg-opacity-50 left-0 top-0 animate__animated animate__fade">
            <div className="w-full md:w-7/12 overflow-hidden bg-white animate__animated animate__fadeInUp m-auto rounded-xl">
                <div style={{ height: "8%" }} className="p-4 bg-main flex justify-end items-center text-white">
                    <button className="text-2xl" onClick={() => { onClose() }}>
                        <IoClose />
                    </button>
                </div>
                <div className="text-center mt-4 text-2xl text-gray-500 font-bold">
                    {
                        discount?.discountType?.code === "dit-001" &&
                        "Bancos"
                    }

                    {
                        discount?.discountType?.code === "dit-002" &&
                        "Tarjetas"
                    }
                </div>

                {
                    discount?.cards?.length > 0 &&
                    <div style={{ maxHeight: 450, overflowY: "auto" }} className="mt-4 p-8 custom-scrollbar">
                        {
                            discount?.cards?.map((card, i) => {
                                return (
                                    <DiscountCardRow key={i} card={card} />
                                )
                            })
                        }
                    </div>
                }
                {
                    discount?.cardIssuers?.length > 0 &&
                    <div style={{ maxHeight: 450, overflowY: "auto" }} className="mt-4 p-8 custom-scrollbar">
                        {
                            discount?.cardIssuers?.map((cardIssuer, i) => {
                                return (
                                    <DiscountCardIssuerRow key={i} cardIssuer={cardIssuer} />
                                )
                            })
                        }
                    </div>
                }
                <div className="text-center my-8">
                    <p className="text-gray-500 mb-4">
                        {
                            description ?
                                description
                                :
                                "Pasa por la tienda, realiza una compra y selecciona el descuento que quieras al momento de pagar."
                        }
                    </p>
                    {
                        !hiddenStoreButton &&
                        <Link to={`/stores/${discount?.store?.slug}`}>
                            <Button className="bg-main">
                                Visitar la tienda
                            </Button>
                        </Link>
                    }
                </div>
            </div>
        </div>
        ,
        document.getElementById("portal")
    );
}

export default DiscountModal;
```

![](https://i.imgur.com/HoXCy37.png)
[Subir](#top)

<a name="item26"></a>
### Map.js

Compoente encargado de añadir la ubicacion geografica del cliente y a su vez realizar la busqueda de tiendas por geolocalizacion

```
import { GoogleApiWrapper, Map, Marker } from "google-maps-react";
import { useState } from "react";
import Button from "./Button";
import HeartIcon from "./HeartIcon";
import LocationMarker from "./LocationMarker";
import PhoneIcon from "./PhoneIcon";
import ShareIcon from "./ShareIcon";
import StarIcon from "./StarIcon";

const MapContainer = ({ google, height = 100, stores }) => {

  const [selectedStore, setSelectedStore] = useState(null);

  return <Map
    google={google}
    zoom={12}
    containerStyle={{
      position: 'relative',
      width: '100%',
      height: `800px`,
    }}
    initialCenter={{ lat: -34.605349, lng: -58.478619 }}
  >
    {stores?.map((store, i) => <Marker
      key={i}
      title={store.name}
      position={store.latLng}
      onClick={() => setSelectedStore(store)}
    />)}

    {selectedStore && <div className="absolute right-0 top-0 w-64 h-full p-4 bg-white">
      <div className="flex justify-center relative">
        <img
          src={selectedStore.imgSrc}
          alt={selectedStore.imgAlt}
          className="w-40 h-40"
        />
        <button
          className="absolute right-0 w-6 h-6 inline-flex items-center justify-center text-3xl bg-gray-200 hover:bg-gray-300 rounded focus:outline-none"
          onClick={() => setSelectedStore(null)}
        >
          &times;
        </button>
      </div>

      <div className="flex flex-col space-y-5 mt-3">
        <h4 className="font-semibold">{selectedStore.name}</h4>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map(n => <StarIcon
            key={n}
            className="w-5 h-5 text-yellow-400"
          />)}
        </div>

        <div className="flex justify-around text-blue-500">
          <a href="/#" className="inline-flex flex-col items-center space-y-2">
            <div className="inline-flex items-center justify-center w-10 h-10 border border-blue-500 rounded-full">
              <ShareIcon
                className="w-5 h-5"
              />
            </div>
            <span>Compartir</span>
          </a>

          <a href="/#" className="inline-flex flex-col items-center space-y-2">
            <div className="inline-flex items-center justify-center w-10 h-10 border border-blue-500 rounded-full">
              <HeartIcon
                className="w-5 h-5"
              />
            </div>
            <span>Favoritos</span>
          </a>
        </div>

        <div className="flex items-center space-x-2">
          <LocationMarker className="w-5 h-5 text-blue-500" />
          <span className="text-xs">Av. Rivadavia 5730, 1406 CABA</span>
        </div>

        <div className="flex items-center space-x-2">
          <PhoneIcon className="w-5 h-5 text-blue-500" />
          <span className="text-xs">+54 11 68647086</span>
        </div>

        <Button
          color="main"
          className="w-full"
          to="/stores/nombre-de-la-tienda"
        >
          Ir a la tienda
        </Button>
      </div>
    </div>}
  </Map>;
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
})(MapContainer);
```

![](https://i.imgur.com/cxtPEfR.png)
[Subir](#top)

<a name="item27"></a>
### BolichesFeaturedProducts.js

Componente que muestra los productos mas destacados de la categoria boliches.

```
import { useEffect, useState } from "react";
import CategorySectionCard from "./CategorySectionCard";
import ProductCard from "./ProductCard";
import { generateImageUrl } from "../helpers/url";
import ProductModal from "./ProductModal";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import useAxios from "../hooks/useAxios";
import StoreDiscountsModal from "./dicounts/StoreDiscountsModal";
import useFeaturedProducts from "../hooks/useFeaturedProducts";
import Button from "./Button";
import findShowsQuantity from "../helpers/findShowsQuantity";
import StoreModal from "./StoreModal";

const BolichesFeaturedProducts = ({ categoryInfo }) => {

    const history = useHistory();

    const { setLoading, setCustomAlert } = useAuth();

    const [{ loading, error, data }, addToCart] = useAxios({ url: `/carts/add-to-cart`, method: "POST" }, { manual: true, useCache: false });

    const [{ featuredProducts, error: featuredProductError, loading: featuredProductsLoading }, getFeaturedProducts] = useFeaturedProducts({ options: { useCache: false } });

    const [productOnModal, setProductOnModal] = useState(null);

    const [storeAndProduct, setStoreAndProduct] = useState(null);

    const [isAddToCart, setIsAddToCart] = useState(false);

    const [storeToModal, setStoreToModal] = useState(null);

    const [showStoreModal, setShowStoreModal] = useState(false);

    useEffect(() => {
        getFeaturedProducts({ params: { isActive: "true", storeCategoryId: 4 } });
    }, [])

    useEffect(() => {
        setLoading({ show: loading, message: "Añadiendo al carrito." })
    }, [loading, setLoading])

    useEffect(() => {
        if (error) {
            setLoading?.({ show: false, message: "" });
            setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${error?.response?.status === 400 ? error?.response?.data.message[0] : error?.response?.data.message}.`, severity: "error" });
        }
    }, [error, setLoading, setCustomAlert])

    useEffect(() => {
        if (data) {
            if (!isAddToCart) {
                history.push(`/checkout?cartId=${data?.id}`);
                return;
            } else {
                setIsAddToCart(false);
                setShowStoreModal(true);
            }
        }
    }, [data])

    const handleCloseModal = async (e) => {
        setProductOnModal(null);
        if (e) {
            if (e.discount) {
                setStoreAndProduct(e);
                return;
            }

            if (e?.addTocart) {
                setIsAddToCart(e?.addTocart);
                const { addTocart, store, ...rest } = e;
                setStoreToModal(store);
                await addToCart({ data: rest });
                return;
            }
            await addToCart({ data: e });
        }
    }

    const handleCloseStoreModal = () => {
        setShowStoreModal(false);
        setStoreToModal(null);
    }

    const handleClose = async (e) => {
        setStoreAndProduct(null);
        if (e) {
            await addToCart({ data: e });
        }
    }

    return (
        <div className="block md:flex space-x-4">
            <CategorySectionCard
                categoryId={categoryInfo?.id}
                text={categoryInfo?.name}
                imgSrc={`${process.env.REACT_APP_API_URL}${categoryInfo?.imgPath}`}
            />

            <div className="md:w-1/2">
                <h4 className="mb-4 text-center text-3xl font-semibold">Mejores productos</h4>

                {
                    featuredProductError ?
                        <div className="text-center flex text-xl h-72 text-red-500">
                            <div className="m-auto">
                                <p>Ha ocurrido un error.</p>
                                <Button className="bg-main" onClick={() => { getFeaturedProducts() }}>
                                    Reintentar
                                </Button>
                            </div>
                        </div>
                        :
                        featuredProductsLoading ?
                            <div className="text-center flex text-xl h-72 text-gray-500">
                                <p className="m-auto">Obteniendo Productos...</p>
                            </div>
                            :
                            featuredProducts.length > 0 ?
                                <Swiper
                                    style={{ padding: "20px 0" }}
                                    navigation
                                    autoplay
                                    slidesPerView={2}
                                    spaceBetween={15}
                                    pagination={{ clickable: true }}
                                    onSlideChange={() => { }}
                                    onSwiper={(swiper) => { }}
                                >
                                    {featuredProducts?.map((featuredProduct, i) => {
                                        return (
                                            <SwiperSlide key={featuredProduct.id}>
                                                <ProductCard
                                                    name={featuredProduct?.product?.name}
                                                    description={featuredProduct?.product?.productDetails?.shortDescription ? featuredProduct?.product?.productDetails?.shortDescription : featuredProduct?.product?.description ? featuredProduct?.product?.description : 'Sin descripción'}
                                                    imgSrc={generateImageUrl(featuredProduct?.product.productImages?.[0]?.path)}
                                                    rating={featuredProduct?.product?.rating}
                                                    imgAlt={featuredProduct?.product?.name}
                                                    price={featuredProduct?.product?.productDetails ? featuredProduct?.product.productDetails?.price > 0 ? `$${featuredProduct?.product.productDetails?.price}` : 'Gratis' : ''}
                                                    quantity={featuredProduct?.product?.productDetails ? featuredProduct?.product?.productDetails?.quantity : findShowsQuantity(featuredProduct?.product?.shows)}
                                                    onBuy={() => { featuredProduct?.product?.productDetails ? setProductOnModal(featuredProduct?.product) : history?.push(`/products/${featuredProduct?.product?.slug}`) }}
                                                    slug={featuredProduct?.product?.slug}
                                                />
                                            </SwiperSlide>
                                        )
                                    })}
                                </Swiper>
                                :
                                <div className="text-center flex h-72 text-red-500 space-y-8 mt-12">
                                    <div className="m-auto">
                                        <p className="mb-8">No hay productos destacados en la categoria de Boliches actualmente.</p>
                                        <Link to={`/products`} className="bg-main text-white px-8 py-4 rounded transition duration-500 hover:bg-white hover:shadow-xl hover:text-main">
                                            Ver Vitrina de productos
                                        </Link>
                                    </div>
                                </div>
                }
            </div>
            <ProductModal product={productOnModal} closeModal={handleCloseModal} />
            <StoreDiscountsModal onClose={handleClose} storeAndProduct={storeAndProduct} />
            <StoreModal show={storeToModal && showStoreModal ? true : false} store={storeToModal} onClose={handleCloseStoreModal} cartId={data?.id} />
        </div>
    )
}

export default BolichesFeaturedProducts;
```

![](https://i.imgur.com/EjXNYwT.png)
[Subir](#top)

<a name="item28"></a>
### BussinessSection.js

Componente que se encarga de invitar al usuario a registrarse ya sea como usuario cliente o venderdor para disfrutar de los diferentes beneficios que ofrece el marketplace.

```
import partner from '../assets/images/partner.jpg';
import waveUp from '../assets/images/wave-up.png';
import waveDown from '../assets/images/wave-down.png';
import clients from '../assets/images/clients.jpg';

const BussinessSection = ({ businessSectionData }) => {

    return (
        <div
            className="my-24 md:my-80 bg-white relative"
        >
            <img
                src={waveUp}
                alt="Wave up"
                className="w-full absolute transform -translate-y-full"
            />
            <div className="container">

                <h3 className="text-5xl text-center font-semibold">{businessSectionData?.sectionTitle ? businessSectionData?.sectionTitle : 'Hagámoslo juntos'}</h3>

                <div className="md:flex space-y-8 md:space-y-0 space-x-4 mt-20">
                    {[
                        {
                            imgSrc: businessSectionData?.leftSectionImage ? process.env.REACT_APP_API_URL + "/" + businessSectionData?.leftSectionImage : partner,
                            title: businessSectionData?.leftSectionTitle ? businessSectionData?.leftSectionTitle : 'Hazte Partner',
                            content: businessSectionData?.leftSectionText ? businessSectionData?.leftSectionText : '¡Crece con BeneficioSi! ¡Nuestra tecnología y base de usuarios puede ayudarte a aumentar las ventas y descubrir nuevas oportunidades!',
                            button: {
                                text: businessSectionData?.leftSectionBtnText ? businessSectionData?.leftSectionBtnText : "UNETE",
                                color: businessSectionData?.leftSectionBtnColor ? businessSectionData?.leftSectionBtnColor : "#F04141",
                                url: businessSectionData?.leftSectionBtnUrl ? businessSectionData?.leftSectionBtnUrl : "#",
                            }
                        },
                        {
                            imgSrc: businessSectionData?.rightSectionImage ? process.env.REACT_APP_API_URL + "/" + businessSectionData?.rightSectionImage : clients,
                            title: businessSectionData?.rightSectionTitle ? businessSectionData?.rightSectionTitle : 'Registrate como cliente',
                            content: businessSectionData?.rightSectionText ? businessSectionData?.rightSectionText : 'Pedí online rápido y fácil a reconocidas marcas y +10.000 restaurantes',
                            button: {
                                text: businessSectionData?.rightSectionBtnText ? businessSectionData?.rightSectionBtnText : "UNETE",
                                color: businessSectionData?.rightSectionBtnColor ? businessSectionData?.rightSectionBtnColor : "#F04141",
                                url: businessSectionData?.rightSectionBtnUrl ? businessSectionData?.rightSectionBtnUrl : "#",
                            }
                        },
                    ].map((item, i) => <div
                        key={i}
                        className="md:w-1/2 flex flex-col items-center"
                    >
                        <div className="flex flex-col items-center space-y-6 mb-6">
                            <img
                                src={item.imgSrc}
                                alt={`bussinesInfoImageleft + ${i + 1}`}
                                className="h-60 w-60 rounded-full shadow"
                            />
                            <h4 className="text-3xl font-semibold">{item.title}</h4>
                            <p className="max-w-[350px] text-center text-base">
                                {item.content}
                            </p>
                        </div>

                        <a
                            href={item.button.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center
                                mt-auto px-6 py-4 space-x-2
                                leading-4
                                border border-white rounded-lg shadow
                                text-white text-xl font-semibold"
                            style={{ background: item.button.color }}>
                            {item.button.text}
                        </a>
                    </div>)}
                </div>
            </div>

            <img
                src={waveDown}
                alt="Wave down"
                className="w-full absolute bottom-0 transform translate-y-full"
            />
        </div>
    )
}

export default BussinessSection;
```
![](https://i.imgur.com/vessPc9.png)
[Subir](#top)

<a name="item29"></a>
### CategoryFilter.js

Componete que filtra las categorias correspondientes dependiendo la tienda si es un cine filtra la categoria por tipo de peliculas, si es un ienda de informatica seria por productos.

```
import RenderListStoresCategories from "./RenderListStoresCategories";

const CategoryFilter = (props) => {

    const { loading, categoryStoreIds, onChange, name, categoriesStores, ...rest } = props;

    return (
        <div {...rest}>            
            {
                loading ?
                    <div>
                        Cargando Categorias
                    </div>
                    :
                    categoriesStores.length > 0 ?
                        <RenderListStoresCategories
                            name={name}
                            value={categoryStoreIds}
                            onChange={onChange}
                            categories={categoriesStores} className="mt-4 w-full" />
                        :
                        <div className="text-red-500">
                            <p>No se encontraron categorias en esta tienda.</p>
                        </div>
            }
        </div>
    )
}

export default CategoryFilter;
```
![](https://i.imgur.com/Dlx3yNt.png)
[Subir](#top)

<a name="item30"></a>
### CategorySectionCard.js

Componente que muestra de una manera dinamica las difetentes categorias del sitio, donde se redirecciona a la vitrina de productos.

```
const CategorySectionCard = ({ text, imgSrc, categoryId }) => {
  return <a href={`/products?storeCategoryId=${categoryId}`} className="group hidden md:block w-1/2 relative rounded-md overflow-hidden bg-full shadow-md">
    <div className="absolute inset-0">
      <img
        src={imgSrc}
        alt={text}
        className="h-full w-full transform transition duration-[400ms] group-hover:scale-125"
      />
    </div>
    <div className="absolute inset-0 bg-black opacity-30" />
    <div className="flex justify-center capitalize items-center absolute inset-0 text-white text-5xl font-semibold">
      {text}
    </div>
  </a>;
};

export default CategorySectionCard;
```
[Subir](#top)

<a name="item31"></a>
### CheckoutDetailsCard.js

Componente donde se visualiza los detalles del descuento por la compra del producto, detalles de la compra y direccion de la tienda.

```
import { useEffect, useState } from "react";
import { IoTrashSharp, IoLocationSharp } from "react-icons/io5";
import useAxios from "../hooks/useAxios";
import clsx from "clsx";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import Button from "./Button";
import ProductFeaturesModal from "./ProductFeaturesModal";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const CheckoutDetailsCard = ({ cartId, canBuy, emitCart, loadingDeliveryCost, deliveryCost, onBuy }) => {

    const { setLoading, setCustomAlert } = useAuth();

    const [productToDelete, setProductToDelete] = useState(null);

    const [cart, setCart] = useState(null);

    const [productDetails, setProductDetails] = useState(null);

    const [{ data, error: cartError, loading: cartLoading }, getCart] = useAxios({ url: `/carts/${cartId}` }, { useCache: false, manual: true });

    const [{ data: deleteData, error: deleteError, loading: deleteLoading }, deleteProductCart] = useAxios({ url: `/carts/${cart?.id}/cart-items/${productToDelete?.id}`, method: "DELETE" }, { useCache: false, manual: true });

    useEffect(() => {
        if (cartId) {
            getCart();
        }
    }, [cartId]);

    useEffect(() => {
        if (deleteData !== undefined) {
            setCustomAlert({ show: true, message: "Se ha eliminado el producto exitosamente.", severity: "success" });
            setCart((oldCart) => {
                return {
                    ...oldCart,
                    ...deleteData
                }
            })
        }
    }, [deleteData])

    useEffect(() => {
        setLoading({ show: deleteLoading, message: "Eliminando el producto" });
    }, [deleteLoading, setLoading]);

    useEffect(() => {
        if (productToDelete) {
            deleteProductCart();
        }
    }, [productToDelete, deleteProductCart]);

    useEffect(() => {
        if (cartError) {
            setLoading?.({ show: false, message: "" });
            setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${cartError?.response?.status === 400 ? cartError?.response?.data.message[0] : cartError?.response?.data.message}.`, severity: "cartError" });
        }

        if (deleteError) {
            setLoading?.({ show: false, message: "" });
            setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${deleteError?.response?.status === 400 ? deleteError?.response?.data.message[0] : deleteError?.response?.data.message}.`, severity: "cartError" });
        }
    }, [cartError, deleteError, setLoading, setCustomAlert]);

    useEffect(() => {
        if (cart) {
            emitCart(cart)
        }
    }, [cart])

    useEffect(() => {
        if (data) {
            if (!data.isProcessed) {
                setCart(data);
            }
        }
    }, [data]);

    const handleDelete = (product) => {
        setProductToDelete(product);
    }

    const handleFeatures = (product) => {
        setProductDetails(product);
    }

    const handleClose = () => {
        setProductDetails(null);
    }

    return (
        <>
            {
                cartLoading ?
                    <div className="h-56 w-full flex">
                        <span className="m-auto">Cargando...</span>
                    </div>
                    :
                    <>
                        {
                            !data?.isProcessed &&
                            <div className="bg-white  p-4 rounded mb-4  text-gray-500">
                                <div className="justify-between flex items-center">
                                    <Link className="text-center hover:text-main" to={`/stores/${cart?.store?.slug}`}>
                                        <img className="w-12 h-12 rounded m-auto" src={`${process.env.REACT_APP_API_URL}/${cart?.store?.storeProfile?.logo}`} alt={cart?.store?.name} />
                                        <h3 className="text-xl">{cart?.store?.name}</h3>
                                    </Link>
                                    <Button className="bg-green-500">
                                        Abierta
                                    </Button>
                                </div>
                                <div className="flex items-center space-x-2 mt-2">
                                    <IoLocationSharp className="text-4xl" />
                                    <p>{cart?.store?.address}</p>
                                </div>
                            </div>
                        }
                        {
                            cart?.discount &&
                            <div className="bg-white p-4 rounded items-center mb-4 text-gray-500 flex space-x-4">
                                <img className="w-12 h-12 rounded" src={`${process.env.REACT_APP_API_URL}/${cart?.discount?.imgPath}`} alt={cart?.discount?.name} />
                                <div className="w-2/3">
                                    <p className="font-bold text-xl">{cart?.discount?.name}</p>
                                    <div className="mb-1">
                                        {
                                            cart?.discount?.discountType?.code === "dit-002" &&
                                            <p>Al pagar con las siguientes tarjetas: <b>{cart?.discount?.cards?.map(card => card.name).join(", ")}</b></p>
                                        }
                                        {
                                            cart?.discount?.discountType?.code === "dit-001" &&
                                            <p>Al pagar con los siguientes bancos: <b>{cart?.discount?.cardIssuers?.map(cardIssuer => cardIssuer.name).join(", ")}</b></p>
                                        }
                                    </div>
                                </div>
                            </div>
                        }

                        <div className="bg-white rounded p-8">
                            {
                                data?.isProcessed ?
                                    <div className="text-red-500">
                                        <p>
                                            El carrito obtenido ya ha sido procesado.
                                            Si desea puede crear otro comprando uno de los productos.
                                        </p>
                                        <div className="text-center my-4">
                                            <Link to={`/products`}>
                                                <Button className="bg-main transition duration-500 hover:bg-white hover:text-main">
                                                    Ir a comprar
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                    :
                                    <>
                                        <h1 className="text-2xl my-4 border-b">Detalle de la Orden</h1>
                                        <div style={{ maxHeight: "40vh" }} className="custom-scrollbar overflow-y-auto px-4">
                                            {
                                                cart?.cartItems?.length > 0 ?
                                                    cart?.cartItems?.map((product, n) => {
                                                        return (
                                                            <div key={n} className="my-4">
                                                                <p className="text-right mb-2">$ {product?.total}</p>
                                                                <div className="flex justify-between items-center w-full">
                                                                    <div className="w-1/2 flex items-center">
                                                                        <img src={`${process.env.REACT_APP_API_URL}/${product?.productImage}`} className="rounded-full h-12 w-12" alt="" />
                                                                        <div className="ml-2 space-y-2">
                                                                            {
                                                                                product?.cartItemShowDetails ?
                                                                                    <h3>
                                                                                        Entradas para <b>{product?.productName}</b>
                                                                                        <p className="capitalize">{` ${format(new Date(product?.cartItemShowDetails?.show?.date), 'EEEE dd/MM/yyyy HH:mm:ss', { locale: es })}`}</p>
                                                                                    </h3>
                                                                                    :
                                                                                    <h3>{product?.productName}</h3>
                                                                            }
                                                                            {
                                                                                product?.cartItemFeatures?.length > 0 &&
                                                                                <div className="cursor-pointer text-main" onClick={() => { handleFeatures(product) }}>
                                                                                    Ver acompañantes
                                                                                </div>
                                                                            }
                                                                            <p>
                                                                                <b className="text-main">
                                                                                    $ {Number(product?.productPrice) + product?.cartItemFeatures?.map(feature => Number(feature?.price)).reduce((price, acum) => { return price + acum }, 0)}
                                                                                </b>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="bg-gray-100 text-main w-12 h-12 flex rounded">
                                                                        <p className="m-auto">{product.quantity}</p>
                                                                    </div>
                                                                    <div onClick={() => { handleDelete(product) }} className="rounded border border-main w-12 h-12 flex text-main transition duration-500 cursor-pointer hover:bg-main hover:text-white">
                                                                        <IoTrashSharp className="m-auto"></IoTrashSharp>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                    :
                                                    <div className="text-center">
                                                        <p className="text-red-500 text-xl my-8">No hay productos</p>
                                                        <Link to={`/products`} className="bg-main bg-main px-4 py-2 rounded text-white transition duration-500 hover:bg-gray-100 hover:text-main hover:shadow-xl">Ir a comprar</Link>
                                                    </div>
                                            }
                                        </div>
                                        <div className="border-t mt-2">
                                            <div className="flex justify-between text-gray-400 my-4">
                                                <span>Descuento</span>
                                                <span>{cart?.discount ? <span className="text-red-500">-${Number(cart?.subTotal - cart?.subTotalWithDiscount).toFixed(2)}</span> : "$0"}</span>
                                            </div>
                                            <div className="flex justify-between text-gray-400 my-4">
                                                <span>Envio</span>
                                                <span>{loadingDeliveryCost ? "Calculando costo de envio" : `$${deliveryCost}`}</span>
                                            </div>
                                            <div className="flex justify-between text-gray-400 my-4">
                                                <span>Sub total</span>
                                                <span>$ {cart?.discount ? cart?.subTotalWithDiscount : cart?.subTotal}</span>
                                            </div>
                                            <div className="flex font-bold justify-between text-gray-400 my-4">
                                                <span>Total a pagar</span>
                                                <span>$ {cart?.discount ? (Number(cart?.subTotalWithDiscount) + Number(deliveryCost)) : (Number(cart?.subTotal) + Number(deliveryCost))}</span>
                                            </div>
                                            <div className="px-8 text-center mt-6">
                                                <button id="buy-button" className={clsx(["text-center text-2xl px-14 py-2 rounded text-white"], {
                                                    'bg-red-500': canBuy,
                                                    'bg-red-100': !canBuy
                                                })} disabled={!canBuy} onClick={onBuy}>
                                                    Hacer Pedido
                                                </button>
                                            </div>
                                        </div>
                                    </>
                            }

                        </div>
                    </>
            }
            <ProductFeaturesModal product={productDetails} closeModal={handleClose} />
        </>
    )
}

export default CheckoutDetailsCard;
```
![](https://i.imgur.com/PVDlrBd.png)
[Subir](#top)

<a name="item32"></a>
### CustomInput.js

Componente que se utiliza como un campo de texto para indexar la busqueda de lo que se requiere.

```
const CustomInput = ({ name, onChange, value, type, placeholder, className, ...rest }) => {
    return (
        <input
            {...rest}
            name={name}
            onChange={onChange}
            value={value}
            type={type}
            placeholder={placeholder}
            className={`p-2 focus:border-none focus:ring-white focus:outline-none w-full rounded-xl bg-gray-100 border-none transition duration-500 focus:shadow-xl focus:bg-white ${className}`} />
    )
}


export default CustomInput;
```
![](https://i.imgur.com/E15zsgP.png)
[Subir](#top)

<a name="item33"></a>
### FeaturedStores.js

Componente que muestra todas las tiendas destacadas del marketplace.

```
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { generateImageUrl } from "../helpers/url";

const FeaturedStores = ({ storesAds }) => {

    return (
        <div className="container mt-20">
            {
                storesAds?.length > 0 ?
                    <Swiper
                        navigation
                        autoplay
                        centeredSlides={window.innerWidth > 768 ? false : true}
                        style={{ padding: "30px 0" }}
                        slidesPerView={window.innerWidth > 768 ? 4 : 1}
                        spaceBetween={25}
                        pagination={{ clickable: true }}
                        onSlideChange={() => { }}
                        onSwiper={(swiper) => { }}
                    >
                        {
                            storesAds?.map((storesAd, i) => {
                                return (
                                    <SwiperSlide key={storesAd.id}>
                                        <div className="relative bg-white md:max-w-xs w-full rounded-md overflow-hidden shadow">
                                            <img
                                                src={`${process.env.REACT_APP_API_URL}/${storesAd?.store?.storeProfile?.frontImage}`}
                                                alt={storesAd.name}
                                                className="h-20 w-full"
                                            />

                                            <img
                                                src={`${process.env.REACT_APP_API_URL}/${storesAd?.store?.storeProfile?.logo}`}
                                                alt={storesAd.name}
                                                className="absolute bg-white left-1/2 top-[40px] h-20 w-20 transform -translate-x-1/2 rounded shadow-md"
                                            />

                                            <div className="p-4 pt-16 space-y-7">
                                                <h4 className="text-2xl text-center">
                                                    <Link className="hover:text-main" to={`/stores/${storesAd.store?.slug}`}>
                                                        {storesAd?.store?.name}
                                                    </Link>
                                                </h4>

                                                <div className="flex justify-evenly space-x-2">
                                                    {
                                                        storesAd?.products?.length > 0 ?
                                                            storesAd?.products?.slice(0, 3).map((product, i) => {
                                                                return (
                                                                    <a key={i} href={`/products/${product.slug}`}>
                                                                        <img
                                                                            src={generateImageUrl(product.productImages?.[0]?.path)}
                                                                            alt=""
                                                                            className="w-14 h-14 border border-gray-200 rounded"
                                                                        />
                                                                    </a>
                                                                )
                                                            })
                                                            :
                                                            <div className="w-full text-red-500 text-center">
                                                                La tienda no tiene productos
                                                            </div>
                                                    }
                                                </div>

                                                <div className="text-center">
                                                    <Link className="hover:text-main" to={`/stores/${storesAd.store?.slug}`}>
                                                        Ver Tienda
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>
                    :
                    <div className="text-main text-center font-bold">
                        <h1 className="text-3xl">Acualmente no tenemos tiendas destacadas.</h1>
                        <p className="mb-12">Puede ir a la pagina de comercios donde podra encontrar una gran variedad de comercios.</p>
                        <a className="bg-main text-white px-8 py-5 rounded hover:bg-white hover:shadow-xl hover:text-main" href={"/stores"}>
                            Ver comercios
                        </a>
                    </div>
            }
        </div >
    )
}

export default FeaturedStores;
```
![](https://i.imgur.com/aRYpCAt.png)
[Subir](#top)

<a name="item34"></a>
### GastronomyFeaturedProducts.js

Componente encargado de mostrar los productos destacados de la categoria de Gatronomia.

```
import { useEffect, useState } from "react";
import CategorySectionCard from "./CategorySectionCard";
import ProductCard from "./ProductCard";
import { generateImageUrl } from "../helpers/url";
import ProductModal from "./ProductModal";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import useAxios from "../hooks/useAxios";
import StoreDiscountsModal from "./dicounts/StoreDiscountsModal";
import useFeaturedProducts from "../hooks/useFeaturedProducts";
import Button from "./Button";
import findShowsQuantity from "../helpers/findShowsQuantity";
import StoreModal from "./StoreModal";

const GastronomyFeaturedProducts = ({ categoryInfo }) => {

    const history = useHistory();

    const { setLoading, setCustomAlert } = useAuth();

    const [{ featuredProducts, error: featuredProductError, loading: featuredProductsLoading }, getFeaturedProducts] = useFeaturedProducts({ options: { manual: true, useCache: false } });

    const [{ loading, error, data }, addToCart] = useAxios({ url: `/carts/add-to-cart`, method: "POST" }, { manual: true, useCache: false });

    const [productOnModal, setProductOnModal] = useState(null);

    const [storeAndProduct, setStoreAndProduct] = useState(null);

    const [isAddToCart, setIsAddToCart] = useState(false);

    const [storeToModal, setStoreToModal] = useState(null);

    const [showStoreModal, setShowStoreModal] = useState(false);

    useEffect(() => {
        getFeaturedProducts({ params: { isActive: "true", storeCategoryId: 1 } })
    }, [])

    useEffect(() => {
        setLoading({ show: loading, message: "Añadiendo al carrito." })
    }, [loading])

    useEffect(() => {
        if (error) {
            setLoading?.({ show: false, message: "" });
            setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${error?.response?.status === 400 ? error?.response?.data.message[0] : error?.response?.data.message}.`, severity: "error" });
        }
    }, [error])

    useEffect(() => {
        if (data) {
            if (!isAddToCart) {
                history.push(`/checkout?cartId=${data?.id}`);
                return;
            } else {
                setIsAddToCart(false);
                setShowStoreModal(true);
            }
        }
    }, [data])

    const handleCloseModal = async (e) => {
        setProductOnModal(null);
        if (e) {
            if (e.discount) {
                setStoreAndProduct(e);
                return;
            }

            if (e?.addTocart) {
                setIsAddToCart(e?.addTocart);
                const { addTocart, store, ...rest } = e;
                setStoreToModal(store);
                await addToCart({ data: rest });
                return;
            }
            await addToCart({ data: e });
        }
    }

    const handleCloseStoreModal = () => {
        setShowStoreModal(false);
        setStoreToModal(null);
    }

    const handleClose = async (e) => {
        setStoreAndProduct(null);
        if (e) {
            await addToCart({ data: e });
        }
    }

    return (
        <div className="md:flex space-x-4">
            <div className="md:w-1/2">
                <h4 className="mb-4 text-center text-3xl font-semibold">Mejores productos</h4>
                {
                    featuredProductError ?
                        <div className="text-center flex text-xl h-72 text-red-500">
                            <div className="m-auto">
                                <p>Ha ocurrido un error.</p>
                                <Button className="bg-main" onClick={() => { getFeaturedProducts() }}>
                                    Reintentar
                                </Button>
                            </div>
                        </div>
                        :
                        featuredProductsLoading ?
                            <div className="text-center flex text-xl h-72 text-gray-500">
                                <p className="m-auto">Obteniendo Productos...</p>
                            </div>
                            :
                            featuredProducts.length > 0 ?
                                <Swiper
                                    style={{ padding: "20px 0" }}
                                    navigation
                                    autoplay
                                    slidesPerView={2}
                                    spaceBetween={15}
                                    pagination={{ clickable: true }}
                                    onSlideChange={() => { }}
                                    onSwiper={(swiper) => { }}
                                >
                                    {featuredProducts?.map((featuredProduct, i) => {
                                        return (
                                            <SwiperSlide key={featuredProduct.id}>
                                                <ProductCard
                                                    name={featuredProduct?.product?.name}
                                                    description={featuredProduct?.product?.productDetails?.shortDescription ? featuredProduct?.product?.productDetails?.shortDescription : featuredProduct?.product?.description ? featuredProduct?.product?.description : 'Sin descripción'}
                                                    imgSrc={generateImageUrl(featuredProduct?.product.productImages?.[0]?.path)}
                                                    rating={featuredProduct?.product?.rating}
                                                    imgAlt={featuredProduct?.product?.name}
                                                    price={featuredProduct?.product?.productDetails ? featuredProduct?.product.productDetails?.price > 0 ? `$${featuredProduct?.product.productDetails?.price}` : 'Gratis' : ''}
                                                    quantity={featuredProduct?.product?.productDetails ? featuredProduct?.product?.productDetails?.quantity : findShowsQuantity(featuredProduct?.product?.shows)}
                                                    onBuy={() => { featuredProduct?.product?.productDetails ? setProductOnModal(featuredProduct?.product) : history?.push(`/products/${featuredProduct?.product?.slug}`) }}
                                                    slug={featuredProduct?.product?.slug}
                                                />
                                            </SwiperSlide>
                                        )
                                    })}
                                </Swiper>
                                :
                                <div className="text-center h-72 text-red-500 space-y-8 mt-12">
                                    <div className="m-auto">
                                        <p className="mb-8">No hay productos destacados en la categoria de Gastronomia actualmente.</p>
                                        <Link to={`/products`} className="bg-main text-white px-8 py-4 rounded transition duration-500 hover:bg-white hover:shadow-xl hover:text-main">
                                            Ver Vitrina de productos
                                        </Link>
                                    </div>
                                </div>
                }
            </div>

            <CategorySectionCard
                categoryId={categoryInfo?.id}
                text={categoryInfo?.name}
                imgSrc={`${process.env.REACT_APP_API_URL}${categoryInfo?.imgPath}`}
            />
            <ProductModal product={productOnModal} closeModal={handleCloseModal} />
            <StoreDiscountsModal onClose={handleClose} storeAndProduct={storeAndProduct} />
            <StoreModal show={storeToModal && showStoreModal ? true : false} store={storeToModal} onClose={handleCloseStoreModal} cartId={data?.id} />
        </div>
    )
}

export default GastronomyFeaturedProducts;
```
![](https://i.imgur.com/gf8Hg5x.png)
[Subir](#top)

<a name="item35"></a>
### HomeSlider.js

Componente que me mediante el swiper muestra diferentes imagenes de los tiendas que ofrecen sus servicios y productos.

```
import { Swiper, SwiperSlide } from 'swiper/react';
import banner1 from '../assets/images/banner.jpg';
import banner2 from '../assets/images/banner2.jpg';

const HomeSlider = ({ banners }) => {

  return <Swiper
    navigation
    autoplay
    pagination={{ clickable: true }}
    onSlideChange={() => { }}
    onSwiper={(swiper) => { }}
  >
    {
      banners.map((banner, i) => {
        return (
          <SwiperSlide key={banner.id}>
            <a href={banner.url} target="_blank" rel="noreferrer">
              <img
                src={`${process.env.REACT_APP_API_URL}/${banner.imgPath}`}
                alt={`banner-${banner?.store?.name}-${i}`}
                className="h-72 w-full"
              />
            </a>
          </SwiperSlide>
        )
      })
    }
    <SwiperSlide>
      <img
        src={banner1}
        alt=""
        className="h-72 w-full"
      />
    </SwiperSlide>
    <SwiperSlide>
      <img
        src={banner2}
        alt=""
        className="h-72 w-full"
      />
    </SwiperSlide>
  </Swiper>;
};

export default HomeSlider;
```

![](https://i.imgur.com/kXZWM8V.png)
[Subir](#top)

<a name="item36"></a>
### MobileAppSection.js

Es un componete dedicado para informacion o algo que el administrador del sitio requiera colocar.

```
import useAxios from "../hooks/useAxios";
import appBg from '../assets/images/app-bg.jpg';

const MobileAppSection = () => {

    const [{ data: appSectionData, error: appSectionError }, getAppSectionData] = useAxios({ url: "settings/app-section" }, { useCache: false });

    return (
        <div className="relative py-4 md:py-32 md:mt-20 text-white"
            style={{ background: appSectionData?.backgroundColor ? appSectionData?.backgroundColor : "#F04141", }}
        >
            <div className="container space-y-8 md:space-y-0 md:flex items-center">
                <div className="md:w-7/12 space-y-6">
                    <div className="text-center">
                        <img
                            src={appSectionData?.leftSideImage ? process.env.REACT_APP_API_URL + "/" + appSectionData?.leftSideImage : appBg}
                            alt="Smartphone"
                            className="m-auto w-62 h-28"
                        />
                    </div>
                    <h4 className="text-5xl text-center font-bold flex-wrap" style={{ color: appSectionData?.titleColor ? appSectionData?.titleColor : "white" }}>{appSectionData?.title ? appSectionData?.title : "Descárgate  la app"}</h4>
                    <p className="text-center" style={{ color: appSectionData?.descriptionColor ? appSectionData?.descriptionColor : "white" }}>
                        {
                            appSectionData?.description ? appSectionData?.description : "Pide lo que sea y síguelo en tiempo real con la app BeneficioSi."
                        }
                    </p>
                </div>
                <div className="md:w-5/12">
                    <img
                        src={appSectionData?.rightSideImage ? process.env.REACT_APP_API_URL + "/" + appSectionData?.rightSideImage : appBg}
                        alt="App"
                        className="w-full"
                    />
                </div>
            </div>
        </div>
    )
}

export default MobileAppSection;
```

![](https://i.imgur.com/dRwiWeA.png)
[Subir](#top)

<a name="item37"></a>
### NecessaryInfo.js

Componente con informacion relevante sobre la seguridad y soporte del marketplace

```
import useAxios from "../hooks/useAxios";
import shield from '../assets/images/shield.png';
import callCenterAgent from '../assets/images/call-center-agent.png';
import rent from '../assets/images/rent.png';

const NecessaryInfo = () => {

    const [{ data: necessaryInfoSectionData, error: necessaryInfoSectionError }, getNecessaryInfoData] = useAxios({ url: "/settings/needed-info" }, { useCache: false });

    return (
        <div className="container my-20">
            <div className="md:flex space-y-8 md:space-y-0 justify-evenly">
                {[
                    {
                        imgSrc: necessaryInfoSectionData?.leftSectionImage ? process.env.REACT_APP_API_URL + "/" + necessaryInfoSectionData?.leftSectionImage : shield,
                        title: necessaryInfoSectionData?.leftSectionTitle ? necessaryInfoSectionData?.leftSectionTitle : 'Publicaciones verificadas',
                        content: necessaryInfoSectionData?.leftSectionDescription ? necessaryInfoSectionData?.leftSectionDescription : 'Nuestras publicaciones requieren una validación por datos y controlamos lo publicado'
                    },
                    {
                        imgSrc: necessaryInfoSectionData?.middleSectionImage ? process.env.REACT_APP_API_URL + "/" + necessaryInfoSectionData?.middleSectionImage : rent,
                        title: necessaryInfoSectionData?.middleSectionTitle ? necessaryInfoSectionData?.middleSectionTitle : 'Compra protegida',
                        content: necessaryInfoSectionData?.middleSectionDescription ? necessaryInfoSectionData?.middleSectionDescription : 'Podés señar el auto que quieras y si la compra no se hace efectiva se te devuelve el importe al 100%'
                    },
                    {
                        imgSrc: necessaryInfoSectionData?.rightSectionImage ? process.env.REACT_APP_API_URL + "/" + necessaryInfoSectionData?.rightSectionImage : callCenterAgent,
                        title: necessaryInfoSectionData?.rightSectionTitle ? necessaryInfoSectionData?.rightSectionTitle : 'Soporte',
                        content: necessaryInfoSectionData?.rightSectionDescription ? necessaryInfoSectionData?.rightSectionDescription : 'Acompañamos el proceso asegurandonos de que todo salga correctamente'
                    },
                ].map(item => <div
                    className="flex flex-col items-center space-y-4 w-full md:max-w-xs"
                    key={item.title}
                >
                    <img
                        src={item.imgSrc}
                        alt={item.title}
                        className="h-20 w-20"
                    />

                    <h4 className="text-xl font-semibold">{item.title}</h4>

                    <p className="text-center">{item.content}</p>
                </div>)}
            </div>
        </div>
    )
}

export default NecessaryInfo;
```
![](https://i.imgur.com/aHSs5dc.png)
[Subir](#top)

<a name="item38"></a>
### Pagination.js

Componente encargado de la navegacion entre paginas de los productos por vista.

```
import { IoChevronForwardSharp, IoChevronBack } from "react-icons/io5";
import clsx from "clsx";
import { useEffect, useState } from "react";

const PaginationButton = ({ children, active, onClick }) => {
  return <div
    onClick={onClick}
    className={clsx([
      `inline-flex items-center justify-center cursor-pointer
      w-6 h-6
      font-semibold hover:bg-main hover:text-white
      border border-gray-300
      transition duration-300
      p-5
      rounded-full`,
      {
        'bg-main text-white': active,
        'text-gray-700': !active,
      }
    ])}
  >
    {children}
  </div>;
};

const NavigationButton = ({ icon, color, className, onClick, canNext, hidden }) => {
  return (
    <button hidden={hidden} onClick={onClick} className={`text-${color} ${className}`} disabled={canNext}>
      {icon}
    </button>
  )
};


const Pagination = (props) => {

  const { pages, onChange, activePage, className } = props;

  const [canNext, setCanNext] = useState(true);
  const [canBack, setCanBack] = useState(false);

  const nextPage = (page) => {
    if (page <= pages) {
      onChange(page);
    }
  }
  const backPage = (page) => {
    if (page >= 1) {
      onChange(page);
    }
  }

  useEffect(() => {
    if (activePage === pages) {
      setCanNext(false);
    } else {
      setCanNext(true);
    }

    if (activePage > 1) {
      setCanBack(true);
    } else {
      setCanBack(false);
    }
  }, [activePage, setCanNext, setCanBack, pages])

  if (pages === 1) {
    return null;
  }

  return <ul className={`hidden-scrollbar flex items-center space-x-2 ${className}`} style={{ maxWidth: '100%', overflowX: 'auto', scrollBehavior: 'none' }}>
    <li>
      <p>
        <NavigationButton hidden={!canBack} disable={!canBack} onClick={() => { backPage(activePage - 1) }} color="main" className="text-xl hover:text-gray-500 transition duraion-500 transform hover:scale-150" icon={<IoChevronBack />}></NavigationButton>
      </p>
    </li>
    {pages
      ? Array.from(Array(pages).keys()).map(n =>
        <li key={n}>
          <PaginationButton active={n + 1 === activePage} onClick={() => { onChange(n + 1) }}>{n + 1}</PaginationButton>
        </li>
      )
      : null
    }
    <li>
      <NavigationButton
        hidden={!canNext}
        disable={!canNext}
        onClick={() => { nextPage(activePage + 1) }}
        color="main"
        className="text-xl hover:text-gray-500 transition duraion-500 transform hover:scale-150"
        icon={<IoChevronForwardSharp />}
      />
    </li>
  </ul>;
};

export default Pagination;
```
![](https://i.imgur.com/p3vfyZd.png)
[Subir](#top)

<a name="item39"></a>
### PharmacyFeaturedProducts.js

Componente que muestra los productos destacados de la Categoria Farmacia

```
import { useEffect, useState } from "react";
import CategorySectionCard from "./CategorySectionCard";
import ProductCard from "./ProductCard";
import { generateImageUrl } from "../helpers/url";
import ProductModal from "./ProductModal";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import useAxios from "../hooks/useAxios";
import StoreDiscountsModal from "./dicounts/StoreDiscountsModal";
import useFeaturedProducts from "../hooks/useFeaturedProducts";
import Button from "./Button";
import findShowsQuantity from "../helpers/findShowsQuantity";
import StoreModal from "./StoreModal";

const PharmacyFeaturedProducts = ({ categoryInfo }) => {

    const history = useHistory();

    const { setLoading, setCustomAlert } = useAuth();

    const [{ loading, error, data }, addToCart] = useAxios({ url: `/carts/add-to-cart`, method: "POST" }, { manual: true, useCache: false });

    const [{ featuredProducts, error: featuredProductError, loading: featuredProductsLoading }, getFeaturedProducts] = useFeaturedProducts({ options: { useCache: false } });

    const [productOnModal, setProductOnModal] = useState(null);
    const [storeAndProduct, setStoreAndProduct] = useState(null);

    const [isAddToCart, setIsAddToCart] = useState(false);

    const [storeToModal, setStoreToModal] = useState(null);

    const [showStoreModal, setShowStoreModal] = useState(false);

    useEffect(() => {
        getFeaturedProducts({ params: { isActive: "true", storeCategoryId: 5 } });
    }, [])

    useEffect(() => {
        setLoading({ show: loading, message: "Añadiendo al carrito." })
    }, [loading, setLoading])

    useEffect(() => {
        if (error) {
            setLoading?.({ show: false, message: "" });
            setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${error?.response?.status === 400 ? error?.response?.data.message[0] : error?.response?.data.message}.`, severity: "error" });
        }
    }, [error, setLoading, setCustomAlert])

    useEffect(() => {
        if (data) {
            if (!isAddToCart) {
                history.push(`/checkout?cartId=${data?.id}`);
                return;
            } else {
                setIsAddToCart(false);
                setShowStoreModal(true);
            }
        }
    }, [data])

    const handleCloseModal = async (e) => {
        setProductOnModal(null);
        if (e) {
            if (e.discount) {
                setStoreAndProduct(e);
                return;
            }

            if (e?.addTocart) {
                setIsAddToCart(e?.addTocart);
                const { addTocart, store, ...rest } = e;
                setStoreToModal(store);
                await addToCart({ data: rest });
                return;
            }
            await addToCart({ data: e });
        }
    }

    const handleCloseStoreModal = () => {
        setShowStoreModal(false);
        setStoreToModal(null);
    }

    const handleClose = async (e) => {
        setStoreAndProduct(null);
        if (e) {
            await addToCart({ data: e });
        }
    }

    return (
        <div className="block md:flex space-x-4">
            <div className="md:w-1/2">
                <h4 className="mb-4 text-center text-3xl font-semibold">Mejores productos</h4>

                {
                    featuredProductError ?
                        <div className="text-center flex text-xl h-72 text-red-500">
                            <div className="m-auto">
                                <p>Ha ocurrido un error.</p>
                                <Button className="bg-main" onClick={() => { getFeaturedProducts() }}>
                                    Reintentar
                                </Button>
                            </div>
                        </div>
                        :
                        featuredProductsLoading ?
                            <div className="text-center flex text-xl h-72 text-gray-500">
                                <p className="m-auto">Obteniendo Productos...</p>
                            </div>
                            :
                            featuredProducts.length > 0 ?
                                <Swiper
                                    style={{ padding: "20px 0" }}
                                    navigation
                                    autoplay
                                    slidesPerView={2}
                                    spaceBetween={15}
                                    pagination={{ clickable: true }}
                                    onSlideChange={() => { }}
                                    onSwiper={(swiper) => { }}
                                >
                                    {featuredProducts?.map((featuredProduct, i) => {
                                        return (
                                            <SwiperSlide key={featuredProduct.id}>
                                                <ProductCard
                                                    name={featuredProduct?.product?.name}
                                                    description={featuredProduct?.product?.productDetails?.shortDescription ? featuredProduct?.product?.productDetails?.shortDescription : featuredProduct?.product?.description ? featuredProduct?.product?.description : 'Sin descripción'}
                                                    imgSrc={generateImageUrl(featuredProduct?.product.productImages?.[0]?.path)}
                                                    rating={featuredProduct?.product?.rating}
                                                    imgAlt={featuredProduct?.product?.name}
                                                    price={featuredProduct?.product?.productDetails ? featuredProduct?.product.productDetails?.price > 0 ? `$${featuredProduct?.product.productDetails?.price}` : 'Gratis' : ''}
                                                    quantity={featuredProduct?.product?.productDetails ? featuredProduct?.product?.productDetails?.quantity : findShowsQuantity(featuredProduct?.product?.shows)}
                                                    onBuy={() => { featuredProduct?.product?.productDetails ? setProductOnModal(featuredProduct?.product) : history?.push(`/products/${featuredProduct?.product?.slug}`) }}
                                                    slug={featuredProduct?.product?.slug}
                                                />
                                            </SwiperSlide>
                                        )
                                    })}
                                </Swiper>
                                :
                                <div className="text-center flex h-72 text-red-500 space-y-8 mt-12">
                                    <div className="m-auto">
                                        <p className="mb-8">No hay productos destacados en la categoria de Farmacias actualmente.</p>
                                        <Link to={`/products`} className="bg-main text-white px-8 py-4 rounded transition duration-500 hover:bg-white hover:shadow-xl hover:text-main">
                                            Ver Vitrina de productos
                                        </Link>
                                    </div>
                                </div>
                }
            </div>

            <CategorySectionCard
                categoryId={categoryInfo?.id}
                text={categoryInfo?.name}
                imgSrc={`${process.env.REACT_APP_API_URL}${categoryInfo?.imgPath}`}
            />
            <ProductModal product={productOnModal} closeModal={handleCloseModal} />
            <StoreDiscountsModal onClose={handleClose} storeAndProduct={storeAndProduct} />
            <StoreModal show={storeToModal && showStoreModal ? true : false} store={storeToModal} onClose={handleCloseStoreModal} cartId={data?.id} />
        </div>
    )
}

export default PharmacyFeaturedProducts;
```

![](https://i.imgur.com/JC6Q1S3.png)
[Subir](#top)

<a name="item40"></a>
### ProductAdCard.js

Componente donde se visualiza las ofertas de los productos por parte de las tiendas con su respectiva imagen y titulo.

```
const ProductAdCard = ({ title, subtitle, btnText, href, imgSrc, imgAlt }) => {
  return <div className="flex items-center w-full bg-white rounded-sm shadow-sm overflow-hidden p-4">
    <div className="flex flex-col justify-center items-start w-full p-8 space-y-4">
      {subtitle && <p className="uppercase tracking-widest">{subtitle}</p>}
      <div className="uppercase text-3xl font-semibold">
        {title.length > 20 ? `${title.slice(0, 20)}...` : title}
      </div>
      <a
        href={href}
        className="inline-flex items-center justify-center px-5 py-3 space-x-2 leading-4 border border-white rounded bg-main text-white"
      >
        <span>{btnText}</span>
      </a>
    </div>
    <div className="w-full">
      <img
        src={imgSrc}
        alt={imgAlt}
        className="w-56 h-56"
      />
    </div>
  </div>;
};

export default ProductAdCard;
```

[Subir](#top)

<a name="item41"></a>
### ProductCard.js

Componente donde se visualiza la informacion del producto con su respectivo rating ademas ademas si se encuentra disponible o no se encuentra en existencia.

```
import clsx from "clsx";
import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button"
import { IoStarOutline } from "react-icons/io5";


const ProductCard = ({
  name,
  slug,
  description,
  rating,
  price,
  quantity,
  imgSrc,
  imgAlt,
  onBuy,
  buttonText,
  className
}) => {

  const [imgLoad, setImageLoad] = useState(false);

  return <div
    className={`p-5 mt-12 max-w-[250px] space-y-4 relative pt-28 w-full rounded-md transform hover:shadow-2xl hover:-translate-y-3 transition duration-500 ${className}`}
  >
    <img
      onLoad={() => { setImageLoad(true) }}
      src={imgSrc}
      alt={imgAlt}
      className={clsx(["w-9/12 -top-12 left-1/2 transform -translate-x-1/2  absolute h-36 rounded-md"], {
        "hidden": !imgLoad
      })}
    />

    <div
      className={clsx(["w-9/12 custom-skeleton -top-12 left-1/2 transform -translate-x-1/2  absolute h-36 rounded-md bg-white"], {
        "hidden": imgLoad
      })}
    >
    </div>

    <div className="space-y-2">

      <Link
        to={`/products/${slug}`}
        title={name}
      >
        <p className="font-bold text-center text-gray-600 text-lg hover:text-main">{name?.length > 35 ? `${name?.slice(0, 35)}...` : name}</p>
      </Link>

      <div className="flex space-x-1 justify-center">
        {Array.from(Array(5).keys()).map((n) => {
          return (
            <svg
              key={n}
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-yellow-300"
              fill={(n + 1) <= rating ? 'currentColor' : 'none'}
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          )

        })}
      </div>

      <p className="opacity-75 text-xs text-center text-gray-800 truncate" title={description}>{description}</p>

      <div className="text-center">
        <p className="font-bold text-gray-600 text-xl">{price}</p>
      </div>
    </div>

    {
      quantity > 0 ?
        <div className="flex items-center w-full justify-center space-x-1">
          <Button className="w-2/3 rounded-lg" color="main" onClick={onBuy}>{buttonText ? buttonText : "Comprar"}</Button>
        </div>
        :
        <div className="text-center text-red-500 text-xl">
          No Disponible
        </div>
    }
  </div >
};

export default ProductCard;
```
![](https://i.imgur.com/TmhpAXj.png)
[Subir](#top)


<a name="item42"></a>
### ProductHorizontalCard.js

Card component donde se visualiza mis productos y tiendas favoritas

```
import { Link } from "react-router-dom";
import ProductFeature from "./ProductFeature";
import StarIcon from "./StarIcon";
import { IoChevronForwardSharp } from "react-icons/io5";

const ProductHorizontalCard = ({
  imgSrc,
  imgAlt,
  name,
  slug,
  description,
  price,
  quantity,
  rating,
  onBuy,
  storeName,
  storeImageSrc,
  storeImageAlt,
  storeSlug,
  deliveryMethodTypes,
}) => {
  return <div
    className="flex items-center md:items-start bg-white border hover:shadow-2xl transform transition duration-500 hover:-translate-y-2 rounded-md p-4 animate__animated animate__rotateInUpLeft"
  >
    <img
      src={imgSrc}
      alt={imgAlt}
      className="w-12 h-12 md:w-56 md:h-56 rounded-xl"
    />
    <div className="flex-grow p-4">
      <Link className="hover:text-main" to={`/products/${slug}`}>
        <h4 className="text-lg font-semibold mb-1">{name}</h4>
      </Link>
      <span className="block text-gray-500 mb-1">{description}</span>
      <div className="flex space-x-1 mb-2">
        {Array.from(Array(5).keys()).map((n) => {
          return (
            <svg
              key={n}
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-yellow-300"
              fill={(n + 1) <= rating ? 'currentColor' : 'none'}
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          )
        })}
      </div>

      <div className="space-y-2">
        <ProductFeature
          className="w-full"
          name="Tienda"
          value={
            <Link className="text-blue-500 hover:text-main" to={`stores/${storeSlug}`}>
              <div className="flex items-center">
                <img className="w-8 h-8" src={storeImageSrc} alt={storeImageAlt} />
                <p className="ml-2">{storeName}</p>
              </div>
            </Link>
          }
        />
        {
          deliveryMethodTypes?.length > 0 ?
            <ProductFeature
              className="w-full"
              name="Envíos"
              value={deliveryMethodTypes.join(', ')}
            />
            :
            <ProductFeature
              className="w-full"
              name="Envíos"
              value={'Retiro en tienda'}
            />

        }
        <ProductFeature
          className="w-full hidden md:block"
          name="Cantidad"
          value={<span className="text-main"> {quantity}</span>}
        />
      </div>
    </div>
    <div className="md:w-64 flex-shrink-0 flex flex-col p-4 space-y-4">

      <div className="text-right md:text-center">
        <p className="font-semibold text-xl">{price}</p>
      </div>

      {
        quantity > 0 ?
          <button className="bg-main rounded-2xl p-4 text-white flex justify-between items-center font-bold text-md hover:bg-gray-100 transition duration-500 hover:text-main hover:shadow-xl" onClick={onBuy}>
            Comprar ahora
            <IoChevronForwardSharp className="text-xl" />
          </button>
          :
          <div className="text-center text-red-500 text-xl">
            No Disponible
          </div>
      }
    </div>
  </div >;
};

export default ProductHorizontalCard;
```

![](https://i.imgur.com/QvCtRoU.png)
[Subir](#top)

<a name="item43"></a>
### ProductImagesCarousel.js

Componente que mediante el efecto slider muestra las diferentes imagenes de un producto.

```
import clsx from "clsx";
import { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { generateBackendUrl } from "../helpers/url";
import { FaSearchPlus } from "react-icons/fa";
import { FaSearchMinus } from "react-icons/fa";

const ProductImagesCarousel = ({ images, productName }) => {
  const [swiper, setSwiper] = useState(null);

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const [zoomScale, setZoomScale] = useState(1);

  const isInInitialScale = zoomScale === 1;

  return <div className="hidden md:block">
    <div className="relative">
      <Swiper
        onSwiper={setSwiper}
        onSlideChange={(swiper) => setActiveSlideIndex(swiper.activeIndex)}
        onZoomChange={(_, scale) => setZoomScale(scale)}
        autoHeight={true}
        zoom={{ maxRatio: 2 }}
      >
        {
          images?.length > 0 &&
          images?.map(image => <SwiperSlide key={image.id}>
            <div className="swiper-zoom-container">
              <img
                src={generateBackendUrl(image.path)}
                alt={productName}
                className="rounded-xl w-full"
              />
            </div>
          </SwiperSlide>)}
      </Swiper>

      {swiper && <button
        type="button"
        className="
          absolute top-0 right-0 z-10
          w-14 h-14 mt-3 mr-3
          inline-flex items-center justify-center
          bg-black bg-opacity-25 hover:bg-opacity-50
          rounded focus:outline-none
        "
        onClick={() => isInInitialScale ? swiper.zoom.in() : swiper.zoom.out()}
      >
        {isInInitialScale
          ? <FaSearchPlus className="text-3xl text-white" />
          : <FaSearchMinus className="text-3xl text-white" />
        }
      </button>}
    </div>

    <div className="flex justify-center mt-6 space-x-3">
      {images?.length > 0 &&
        images?.map((image, i) => <img
          key={image.id}
          src={generateBackendUrl(image.path)}
          alt={productName}
          className={clsx(
            'h-20 w-20 rounded-xl border border-gray-100 rounded shadow hover:shadow-md cursor-pointer',
            activeSlideIndex === i && 'ring-2 ring-blue-300 ring-opacity-75'
          )}
          onClick={() => swiper.slideTo(i)}
        />)}
    </div>
  </div>;
};

export default ProductImagesCarousel;
```
![](https://i.imgur.com/rJzz6EC.png)
[Subir](#top)

<a name="item44"></a>
### ProductModal.js

Componente que se encarga que luego de haber elegido la compra del producto abre una ventana modal para añadir al carrito de compras el respectivo producto.

```
import { useEffect, useRef, useState } from "react";
import { IoClose, IoCart } from "react-icons/io5";
import { generateImageUrl } from "../helpers/url";
import { Swiper, SwiperSlide } from 'swiper/react';
import Checkbox from "./Checkbox";
import CustomSelect from "./CustomSelect";
import reactDom from "react-dom";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const ProductModal = ({ product, closeModal, isStore }) => {

  const { user } = useAuth();

  const [quantity, setQuantity] = useState(1);
  const [featuresPrice, setfeaturesPrice] = useState(0);
  const [productFeaturesData, setProductFeaturesData] = useState({ featureIds: [], featureForGroupIds: [] })

  const [total, setTotal] = useState(product?.productDetails?.price);

  const modalRef = useRef();

  useEffect(() => {
    if (product) {
      console.log(product);
    }
  }, [product])

  useEffect(() => {
    if (product) {
      setTotal((Number(product?.productDetails?.price) + featuresPrice) * quantity);
    }
  }, [quantity, product, featuresPrice]);

  useEffect(() => {
    setQuantity(1)
    setfeaturesPrice(0)
    setProductFeaturesData({ featureIds: [], featureForGroupIds: [] })
  }, [closeModal]);

  const handleFeatureChange = (event) => {
    const value = productFeaturesData[event.target.name].includes(Number(event.target.value));
    if (value) {
      const newfeatureIds = productFeaturesData[event.target.name].filter(n => n !== Number(event.target.value))
      setProductFeaturesData((oldProductFeaturesData) => {
        return {
          ...oldProductFeaturesData,
          [event.target.name]: newfeatureIds
        }
      });
      setfeaturesPrice((oldFeaturesPrice) => {
        return oldFeaturesPrice - Number(event.target.cost);
      })
    } else {
      setProductFeaturesData((oldProductFeaturesData) => {
        return {
          ...oldProductFeaturesData,
          [event.target.name]: [...oldProductFeaturesData[event.target.name], Number(event.target.value)]
        }
      });
      setfeaturesPrice((oldFeaturesPrice) => {
        return oldFeaturesPrice + Number(event.target.cost);
      })
    }
  }

  const handleCloseModal = (e) => {
    if (modalRef.current === e.target) {
      closeModal();
    }
  }

  const handleAccept = () => {
    closeModal({
      storeId: product?.store?.storeId,
      productId: product?.id,
      productFeaturesData,
      quantity: quantity,
      isDirectPurchase: isStore ? false : true,
      discount: product?.store?.latestActiveDiscount ? true : false
    });
  }

  const handleAddToCart = () => {
    closeModal({
      addTocart: true,
      store: product?.store,
      storeId: product?.store?.storeId,
      productId: product?.id,
      productFeaturesData,
      quantity: quantity,
      isDirectPurchase: false,
      discount: false
    });
  }

  if (!product) {
    return null;
  }

  return reactDom.createPortal(
    <div ref={modalRef} onClick={handleCloseModal} className="px-4 md:px-0 fixed flex z-50 h-screen w-screen bg-black bg-opacity-50 left-0 top-0 animate__animated animate__fade">
      <div className="w-full md:w-7/12 overflow-hidden bg-white animate__animated animate__fadeInUp m-auto rounded-xl">
        <div style={{ height: "8%" }} className="p-4 bg-main flex justify-end items-center text-white">
          <button className="text-2xl" onClick={() => { closeModal() }}>
            <IoClose />
          </button>
        </div>
        <div style={{ maxHeight: 550, overflowY: 'auto' }} className="custom-scrollbar p-8 md:p-16 md:flex md:items-center md:space-x-4">
          <div className="md:w-5/12">
            <Swiper
              autoHeight
              navigation
              slidesPerView={1}
              pagination={{ clickable: true }}
              onSlideChange={() => { }}
              onSwiper={(swiper) => { }}
            >
              {
                product?.productImages?.map((image, i) => {
                  return (
                    <SwiperSlide key={image.id} className="px-10">
                      <img
                        src={generateImageUrl(image?.path)}
                        alt={`product-${product?.store?.name}-${i}`}
                        className="w-full rounded"
                      />
                    </SwiperSlide>
                  )
                })
              }
            </Swiper>
          </div>

          <div className="mt-4 md:mt-0 md:w-9/12">
            <div className="mb-6">
              <div className="flex justify-center space-x-1 mb-2">
                {Array.from(Array(5).keys()).map((n) => {
                  return (
                    <svg
                      key={n}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-yellow-300"
                      fill={(n + 1) <= product?.rating ? 'currentColor' : 'none'}
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  )

                })}
              </div>
              <Link to={`/products/${product.slug}`}>
                <h1 className="text-2xl text-center mb-2 text-gray-600 font-bold hover:text-main">
                  {product.name?.length > 100 ? `${product.name?.slice(0, 100)}...` : product?.name}
                </h1>
              </Link>
              <p className="text-center text-gray-500">
                {
                  product?.productDetails?.shortDescription ?
                    product?.productDetails?.shortDescription?.length > 100 ?
                      `${product?.shortDescription?.slice(0, 100)}...`
                      :
                      product?.productDetails?.shortDescription
                    :
                    product?.description?.length > 100 ?
                      `${product?.description?.slice(0, 100)}...`
                      :
                      product?.description
                }
              </p>
            </div>
            <div style={{ maxHeight: "250px" }} className="overflow-y-auto h-[50%] custom-scrollbar">
              <div className="mb-2 flex items-center space-x-2">
                <p className="text-lg font-bold text-gray-600">Tienda:</p>
                <Link to={`/stores/${product?.store?.slug}`}>
                  <div className="flex items-center space-x-2">
                    {product?.store?.storeProfile?.logo &&
                      <img className="h-10 w-10 rounded" src={`${process.env.REACT_APP_API_URL}/${product?.store?.storeProfile?.logo}`} alt="" />
                    }
                    <p className="text-gray-500">{product?.store?.name}</p>
                  </div>
                </Link>
              </div>
              {
                product?.productDetails?.quantity > 0 &&
                <div className="mb-2 flex items-center space-x-4">
                  <h3 className="text-lg font-bold text-gray-600">Disponibles:</h3>
                  {
                    product?.productDetails?.quantity > 0 ?
                      <p className="text-main">{product?.productDetails?.quantity}</p>
                      :
                      <p className="text-red-500">No hay disponible</p>
                  }

                </div>
              }
              {
                product?.productFeatures?.length > 0 &&
                <div>
                  <h3 className="text-lg font-bold text-gray-600">Características</h3>
                  {product?.productFeatures?.map((feature, i) => <div key={i} className="flex items-center space-x-4 mb-2 text-gray-500">
                    {feature.isSelectable &&
                      <Checkbox
                        name="featureIds"
                        onChange={(e) => { handleFeatureChange({ target: { name: e.target.name, value: e.target.value, type: e.target.type, cost: feature.price } }) }}
                        value={feature.id}
                        checked={productFeaturesData.featureIds.includes(feature.id)}
                      />
                    }
                    <span className="font-bold">{feature.name}:</span>
                    {
                      feature.value &&
                      <span>{feature.value}</span>
                    }
                    <b>{feature.price > 0 ? `$${feature.price}` : feature.isSelectable ? "Gratis." : "Incluido en el producto."}</b>
                  </div>)}
                </div>
              }

              {
                product?.productFeatureGroups?.length > 0 &&
                product?.productFeatureGroups?.map((featuresGroup, i) => {
                  return (
                    <div key={i}>
                      <h3 className="text-lg font-bold text-gray-600">{featuresGroup?.name}</h3>
                      {featuresGroup?.productFeatureForGroups?.map((feature, i) => <div key={i} className="flex items-center space-x-4 mb-2 text-gray-500">
                        {feature.isSelectable &&
                          <Checkbox
                            name="featureForGroupIds"
                            onChange={(e) => { handleFeatureChange({ target: { name: e.target.name, value: e.target.value, type: e.target.type, cost: feature.price } }) }}
                            value={feature.id}
                            checked={productFeaturesData.featureForGroupIds.includes(feature.id)}
                          />
                        }
                        <span className="font-bold">{feature.name}:</span>
                        {
                          feature.value &&
                          <span>{feature.value}</span>
                        }
                        <b>{feature.price > 0 ? `$${feature.price}` : feature.isSelectable ? "Gratis." : "Incluido en el producto."}</b>
                      </div>)}
                    </div>
                  )
                })
              }
              <div>
                <h3 className="text-lg font-bold text-gray-600">Descripción</h3>
                <div dangerouslySetInnerHTML={{ __html: product?.description }} />
              </div>
            </div>
            {
              product?.productDetails?.price &&
              <div className="text-right text-2xl font-bold text-gray-600 font bold">
                ${product?.productDetails?.price}
              </div>
            }
            {
              product?.productDetails?.quantity > 0 &&
              <div className="flex items-center justify-between mt-4">
                <div className="w-1/2 flex items-center space-x-4">
                  <p>Cantidad: </p>
                  <CustomSelect value={quantity} name="quantity" onChange={(e) => { setQuantity(e.target.value) }}>
                    {Array.from(Array(product?.productDetails?.quantity).keys()).map(n => {
                      return (
                        <option key={n} value={n + 1}>{n + 1}</option>
                      )
                    })}
                  </CustomSelect>
                </div>
                <div className="w-1/2 flex justify-end text-xl font-bold text-gray-500 items-center space-x-4">
                  Total: ${total?.toLocaleString()}
                </div>
              </div>
            }
            <div className="md:flex md:justify-end md:space-x-4 mt-6 space-y-2 md:space-y-0">
              <button onClick={() => { closeModal() }} className="rounded w-full px-4 py-2 text-main transition duration-500 hover:shadow-xl hover:bg-white hover:text-main focus:ring-white">
                Cancelar
              </button>
              {
                !isStore &&
                <button onClick={handleAddToCart} className="bg-main w-full justify-center text-lg flex items-center space-x-4 rounded px-4 py-2 text-white transition duration-500 hover:shadow-xl hover:bg-white hover:text-main focus:ring-white">
                  <p>Añadir al carrito</p>
                </button>
              }
              {
                user ?
                  product?.store?.isOpen ?
                    product?.productDetails?.quantity > 0 ?
                      <button onClick={handleAccept} className="w-full justify-center bg-main text-lg flex items-center space-x-4 rounded px-4 py-2 text-white transition duration-500 hover:shadow-xl hover:bg-white hover:text-main focus:ring-white">
                        <p>{isStore ? "añadir al carrito" : "Comprar"}</p>
                        <IoCart />
                      </button>
                      :
                      <div className="text-red-500 px-4 py-2">No hay existencias.</div>
                    :
                    <div className="text-red-500 px-4 py-2">La tienda esta cerrada actualmente.</div>
                  :
                  <Link to={"/login"} className="rounded capitalize px-4 py-2 cursor-pointer text-main transition duration-500 hover:bg-white hover:text-main hover:shadow-xl">
                    iniciar sesión
                  </Link>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
    ,
    document.getElementById("portal")
  );
}

export default ProductModal;
```
![]([https://i.imgur.com/rJzz6EC.png](https://i.imgur.com/VAOLCVu.png))
[Subir](#top)

<a name="item45"></a>
### ProductProfile.js

Componete que describe a detalles las caracteristicas del producto, como su nombre lo indica hace referencia a detalles especificos del mismo.

```
import Container from "../components/Container"
import ProductFeature from "../components/ProductFeature";
import Select from "../components/Select";
import PlusIcon from "../components/PlusIcon";
import { TabsProvider } from "../contexts/TabsContext";
import TabsContainer from "../components/TabsContainer";
import Tab from "../components/Tab";
import TabPanel from "../components/TabPanel";
import Table from "../components/Table";
import TableHead from "../components/TableHead";
import TableRow from "../components/TableRow";
import TableCell from "../components/TableCell";
import TableBody from "../components/TableBody";
import QuestionsAnswer from '../components/QuestionsAnswer';
import ProductImagesCarousel from "../components/ProductImagesCarousel";
import ProductFeatureGroup from "../components/ProductFeatureGroup";
import { Swiper, SwiperSlide } from 'swiper/react';
import { generateBackendUrl } from "../helpers/url";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import useAxios from "../hooks/useAxios";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import noImage from "../assets/images/no-image.png";
import { getErrorMessage } from "../helpers/axiosErrors";
import { isRequired, validate } from "../helpers/formsValidations";
import { useHistory } from "react-router-dom";
import ProductModal from "./ProductModal";
import StoreDiscountsModal from "./dicounts/StoreDiscountsModal";
import VideoComponent from "./VideoComponent";

const ProductProfile = ({ product }) => {

    const history = useHistory();

    const { setLoading, setCustomAlert } = useAuth();

    const [favorite, setFavorite] = useState(false);

    const [productOnModal, setProductOnModal] = useState(null);

    const [storeAndProduct, setStoreAndProduct] = useState(null);

    const [questionFormData, setQuestionFormData] = useState({
        question: '',
        productId: null,
    });

    const [questionsFormErrors, setQuestionsFormErrors] = useState({
        question: null,
    });

    const [{ error: cartError, data: cart }, addToCart] = useAxios({ url: `/carts/add-to-cart`, method: "POST" }, { manual: true, useCache: false });

    const [{ data: favoriteData, loading: loadingFavorite, error: favoriteError }, toggleFavorite] = useAxios({ url: `/favorite-products/${product?.id}`, method: 'POST' }, { manual: true, useCache: false });

    const [{ data: questionsData, loading: questionsDataLoading }, fetchQuestions] = useAxios({ url: `/questions` }, { manual: true });

    const [, createQuestion] = useAxios({ url: '/questions', method: 'POST' }, { manual: true });

    useEffect(() => {
        if (product) {
            console.log(product)
            fetchQuestions({
                params: {
                    productId: product.id,
                    sort: 'createdAt,DESC',
                }
            });

            setFavorite(product?.isFavorite);

            setQuestionFormData(prevData => ({
                ...prevData,
                productId: product.id,
            }));
        }
    }, [product]);

    useEffect(() => {
        if (cart) {
            setLoading?.({ show: false, message: "" });
            history.push(`/checkout?cartId=${cart?.id}`);
        }
    }, [cart]);

    useEffect(() => {
        setFavorite(favoriteData);
    }, [favoriteData]);

    useEffect(() => {
        setQuestionsFormErrors({
            question: validate(questionFormData.question, [
                { validator: isRequired, errorMessage: 'La pregunta es requerida' },
            ]),
        });
    }, [questionFormData]);

    useEffect(() => {
        setLoading({ show: questionsDataLoading, message: 'Cargando preguntas' });
    }, [questionsDataLoading]);

    useEffect(() => {

        if (cartError) {
            setLoading?.({ show: false, message: "" });
            setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${cartError?.response?.status === 400 ? cartError?.response?.data.message[0] : cartError?.response?.data.message}.`, severity: "error" });
        }

        if (favoriteError) {
            setLoading?.({ show: false, message: "" });
            setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${favoriteError?.response?.status === 400 ? favoriteError?.response?.data.message[0] : favoriteError?.response?.data.message}.`, severity: "error" });
        }
    }, [favoriteError, cartError])

    const handleQuestionChange = (e) => {
        setQuestionFormData(prevData => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleQuestionSubmit = async (e) => {
        e.preventDefault();

        for (let errorName in questionsFormErrors) {
            if (questionsFormErrors[errorName] !== null) {
                setCustomAlert({ show: true, message: questionsFormErrors[errorName], severity: "error" });
                return;
            }
        }

        setLoading({ show: true, message: "Guardando pregunta" });

        try {
            await createQuestion({ data: questionFormData });
            fetchQuestions({
                params: {
                    productId: product.id,
                    sort: 'createdAt,DESC',
                }
            });
            setCustomAlert({ show: true, message: 'Pregunta agregada', severity: "success" });
            setQuestionFormData(currentData => ({
                ...currentData,
                question: '',
            }))
        } catch (error) {
            setCustomAlert({ show: true, message: getErrorMessage(error), severity: "error" });
        } finally {
            setLoading({ show: false, message: "" });
        }
    }

    const handleSeeMoreClick = () => {
        fetchQuestions({
            params: {
                productId: product.id,
                sort: 'createdAt,DESC',
                perPage: questionsData.size + 10,
            }
        });
    };

    const handleCloseModal = async (e) => {
        setProductOnModal(null);
        if (e) {
            if (e.discount) {
                setStoreAndProduct(e);
                return;
            }
            await addToCart({ data: e });
        }
    }

    const handleClose = async (e) => {
        setStoreAndProduct(null);
        if (e) {
            await addToCart({ data: e });
        }
    }


    return (
        <>
            <Container>
                <div className="md:flex md:space-x-6">
                    {/* Images */}
                    <div className="md:w-1/2 md:flex md:flex-col">
                        <ProductImagesCarousel
                            images={product?.productImages}
                        />

                        <Swiper
                            autoHeight={true}
                            pagination
                            className="md:hidden mb-4 md:mb-0"
                        >
                            {
                                product?.productImages?.length > 0 &&
                                product?.productImages?.map(image => <SwiperSlide key={image.id}>
                                    <div className="swiper-zoom-container">
                                        <img
                                            src={generateBackendUrl(image.path)}
                                            alt={product?.name}
                                            className="rounded-xl w-full"
                                        />
                                    </div>
                                </SwiperSlide>)}
                        </Swiper>
                    </div>

                    {/* Information */}
                    <div className="md:w-1/2">
                        <div className="flex items-center text-3xl justify-between">
                            <h3 className="font-bold mb-2 uppercase">{product?.name}</h3>
                            {
                                loadingFavorite ?
                                    <div>
                                        Cargando
                                    </div>
                                    :
                                    favorite ?
                                        <IoHeart onClick={() => {
                                            toggleFavorite()
                                        }} className="text-main cursor-pointer" />
                                        :
                                        <IoHeartOutline onClick={() => {
                                            toggleFavorite()
                                        }} className="text-main hover:text-main cursor-pointer" />
                            }
                        </div>

                        <div className="flex items-center space-x-1">
                            {Array.from(Array(5).keys()).map((n) => {
                                return (
                                    <svg
                                        key={n}
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 text-yellow-300"
                                        fill={(n + 1) <= product?.rating ? 'currentColor' : 'none'}
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                    </svg>
                                )
                            })}
                        </div>

                        <p className="mt-6">
                            {product?.productDetails?.shortDescription}
                        </p>

                        {/* Características */}
                        <div className="space-y-3 mt-10">
                            <div className="md:flex">
                                <ProductFeature
                                    className="md:w-1/2"
                                    name="Referencia"
                                    value={product?.productDetails?.reference || 'Sin referencia'}
                                />
                                <ProductFeature
                                    className="md:w-1/2"
                                    name="Metodo de Envio"
                                    value={product?.deliveryMethodTypes.map(item => item.name).join(', ')}
                                />
                            </div>

                            <div className="md:flex">
                                <ProductFeature
                                    className="md:w-1/2"
                                    name="Categorias"
                                    value={product?.categories?.length === 0
                                        ? 'Sin categorias'
                                        : product?.categories?.map((category) => category.name).join(', ')}
                                />
                                <ProductFeature
                                    className="md:w-1/2"
                                    name="Stock"
                                    value={product?.productDetails?.quantity > 0 ? <p className="text-main">En stock</p> : 'Sin existencia'}
                                />
                            </div>

                            <div className="md:flex">
                                <ProductFeature
                                    className="items-center md:w-1/2 md:items-start"
                                    name="Tienda"
                                    value={<div className="text-center hover:shadow-xl transition duration-500">
                                        <Link to={`/stores/${product?.store?.slug}`}>
                                            {
                                                product?.store?.storeProfile?.logo &&
                                                <img
                                                    className="w-12 h-12 rounded m-auto"
                                                    src={product?.store?.storeProfile?.logo ? generateBackendUrl(product?.store?.storeProfile?.logo) : noImage}
                                                    alt={product?.name}
                                                />
                                            }
                                            <p className="text-blue-500">{product?.store?.name}</p>
                                        </Link>
                                    </div>}
                                />
                            </div>
                        </div>

                        {/* Precio */}
                        <div className="flex items-center p-4 bg-white rounded-md mt-10">
                            <div className="md:w-56 flex-shrink-0">
                                {
                                    product?.discount ?
                                        <div>
                                            <p className="text-main text-3xl font-semibold">
                                                {
                                                    product?.productDetails?.price > 0 ?
                                                        <span> {(product?.productDetails?.price - ((product?.productDetails?.price * product?.discount) / 100)).toFixed(2)} USD</span>
                                                        :
                                                        "Gratis"
                                                }
                                            </p>
                                            <p className="line-through text-700 font-semibold opacity-50">{product?.price} USD</p>
                                        </div>
                                        :
                                        <p className="text-main text-3xl font-semibold">
                                            {
                                                Number(product?.productDetails?.price) > 0 ?
                                                    <span> {(Number(product?.productDetails?.price)).toFixed(2)} USD</span>
                                                    :
                                                    "Gratis"
                                            }
                                        </p>
                                }
                            </div>
                            <div className="flex-grow">
                                {
                                    product?.productDetails?.quantity > 0 ?
                                        <div className="flex items-center justify-end space-x-2">
                                            <div className="w-20">
                                                <Select>
                                                    {Array.from(Array(product?.productDetails?.quantity).keys()).map(n => {
                                                        return (
                                                            <option key={n} value={n + 1}>{n + 1}</option>
                                                        )
                                                    })}
                                                </Select>
                                            </div>
                                            <button
                                                className="bg-main flex items-center px-4 py-4 rounded-xl text-white font-bold transition duration-500 hover:bg-gray-100 hover:text-main"
                                                onClick={() => setProductOnModal(product)}
                                            >
                                                <PlusIcon className="w-4 h-4 rounded-xl" />
                                                Comprar
                                            </button>
                                        </div>
                                        :
                                        <div className="text-red-500 text-right">
                                            No hay existencias.
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

            <Container className="mt-10 p-0">
                <TabsProvider>
                    {/* Tabs */}
                    <TabsContainer className="md:flex">
                        <Tab value={0}>Descripción</Tab>
                        <Tab value={1}>Preguntas {questionsData?.total > 0 ? questionsData?.total : null}</Tab>
                        <Tab value={2}>Comparador</Tab>
                        <Tab value={3}>Caracteristicas</Tab>
                        {
                            product?.productVideos?.length > 0 &&
                            <Tab value={4}>Videos</Tab>
                        }
                    </TabsContainer>

                    {/* TAB PANELS */}
                    {/* Description */}
                    <TabPanel className="py-4 animate__animated animate__fadeInUp" value={0}>
                        <div dangerouslySetInnerHTML={{ __html: product?.description }} />
                    </TabPanel>

                    {/* Questions */}
                    <TabPanel className="py-4 space-y-6 animate__animated animate__fadeInUp" value={1}>
                        <QuestionsAnswer
                            questions={questionsData?.results ?? []}
                            ownerName={product?.store?.name}
                            ownerSlug={product?.store?.slug}
                            ownerImage={product?.store?.storeProfile?.logo ? generateBackendUrl(product?.store?.storeProfile?.logo) : ''}
                            onChange={handleQuestionChange}
                            value={questionFormData.question}
                            error={questionsFormErrors.question}
                            onSubmit={handleQuestionSubmit}
                            onSeeMoreClick={handleSeeMoreClick}
                            canSeeMore={questionsData?.results?.length < (questionsData?.total || 0)}
                        />
                    </TabPanel>

                    {/* Price table */}
                    <TabPanel className="py-4 animate__animated animate__fadeInUp" value={2}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell variant="head">Comercio</TableCell>
                                    <TableCell variant="head">Distancia</TableCell>
                                    <TableCell variant="head">Precio de lsita</TableCell>
                                    <TableCell variant="head">Promo A</TableCell>
                                    <TableCell variant="head">Promo B</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {[
                                    { store: { name: 'Express', street: 'Anchomera 1253', state: 'Ciudad Autónoma de Buenos Aires' }, distance: 0.05, price: 135.55 },
                                    { store: { name: 'Supermercados DIA', street: 'CI Charcas 2725', state: 'Capital Federal' }, distance: 0.05, price: 135.65 },
                                    { store: { name: 'COTO CICSA', street: 'Paraguay 2672', state: 'Barrio Norte' }, distance: 0.29, price: 136.69 },
                                    { store: { name: 'Market', street: 'Beruti 2951', state: 'Ciudad Autónoma de Buenos Aires' }, distance: 0.42, price: 135.65 },
                                ].map((item, i) => <TableRow key={i}>
                                    <TableCell>
                                        <div className="flex space-x-4">
                                            <div className="h-16 w-16 border border-gray-100 rounded bg-gray-100"></div>
                                            <div>
                                                <strong>{item.store.name}</strong>
                                                <p>{item.store.street}</p>
                                                <p>{item.store.state}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {item.distance} kilómetros
                                    </TableCell>
                                    <TableCell>$ {item.price}</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>)}
                            </TableBody>
                        </Table>
                    </TabPanel>

                    {/* Features */}
                    <TabPanel className="py-4 animate__animated animate__fadeInUp" value={3}>
                        {
                            product?.productFeatures?.length > 0 &&
                            <ProductFeatureGroup name="Características">
                                {product?.productFeatures?.map((feature, i) => {
                                    return (
                                        <div key={i}>
                                            {feature.name}
                                        </div>
                                    )
                                })}
                            </ProductFeatureGroup>
                        }
                        {
                            product?.productFeatureGroups?.length > 0 && product?.productFeatureGroups?.map((featuresGroup) => <ProductFeatureGroup
                                key={featuresGroup.id}
                                name={featuresGroup.name}
                            >
                                {featuresGroup?.productFeatureForGroups?.map((feature, i) => {
                                    return (
                                        <div key={i}>
                                            {feature?.name}
                                        </div>
                                    )
                                })}
                            </ProductFeatureGroup>)}
                    </TabPanel>
                    <TabPanel className="py-4 animate__animated animate__fadeInUp" value={4}>
                        {
                            product?.productVideos?.map((video, i) => {
                                return (
                                    <VideoComponent url={video?.url} />
                                )
                            })
                        }
                    </TabPanel>
                </TabsProvider>
            </Container>
            <ProductModal product={productOnModal} closeModal={handleCloseModal} />
            <StoreDiscountsModal onClose={handleClose} storeAndProduct={storeAndProduct} />
        </>
    )
}

export default ProductProfile
```
![](https://i.imgur.com/KFBRShp.png)
[Subir](#top)

<a name="item46"></a>
### ProductsAdsSlider.js

Componente con efecto slider para mostrar las card de ofertas y productos

```
import { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import laptop from "../assets/images/laptop.jpg";
import computadora from "../assets/images/monitos.jpg";
import ProductAdCard from './ProductAdCard';

const ProductsAdsSlider = ({ productAds, className }) => {

    useEffect(() => {
        console.log();
    }, [])

    return <Swiper
        className={className}
        navigation
        spaceBetween={8}
        slidesPerView={window.innerWidth > 768 ? 2 : 1}
        pagination={{ clickable: true }}
        onSlideChange={() => { }}
        onSwiper={(swiper) => { }}
    >
        {
            productAds.map((productAd, i) => {
                return (
                    <SwiperSlide key={productAd.id}>
                        <ProductAdCard
                            title={productAd.description}
                            subtitle={productAd.title}
                            btnText="Ver más"
                            href={productAd.url}
                            imgSrc={`${process.env.REACT_APP_API_URL}/${productAd.imgPath}`}
                            imgAlt={productAd?.store?.name}
                        />
                    </SwiperSlide>
                )
            })
        }
        <SwiperSlide>
            <ProductAdCard
                title={<>
                    <p>Pc de</p>
                    <p>Escritorios</p>
                </>}
                subtitle="black friday"
                btnText="Ver más"
                href="/#"
                imgSrc={computadora}
                imgAlt="Celulares"
            />
        </SwiperSlide>
        <SwiperSlide>
            <ProductAdCard
                title={<>
                    <p>Toda una variedad</p>
                    <p>de laptops</p>
                </>}
                subtitle="black friday"
                btnText="Ver más"
                href="/#"
                imgSrc={laptop}
                imgAlt="Aires acondicionados"
            />
        </SwiperSlide>
    </Swiper>;
};

export default ProductsAdsSlider;
```
![](https://i.imgur.com/axG1Jdh.png)
[Subir](#top)

<a name="item47"></a>
### ProductsCollection.js

Componete padre que se encarga de distribuir los demas componentes hijos para su distribucion en la vista ademas donde se redireciona a una vista mas detallada del producto.

```
import ProductCard from "./ProductCard";
import ProductHorizontalCard from "./ProductHorizontalCard";
import ProductModal from "./ProductModal";
import ProductsGrid from "./ProductsGrid";
import { useEffect, useState } from 'react';
import { generateImageUrl } from "../helpers/url";
import useAxios from "../hooks/useAxios";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import StoreDiscountsModal from "./dicounts/StoreDiscountsModal";
import findShowsQuantity from "../helpers/findShowsQuantity";
import StoreModal from "./StoreModal";

const ProductsCollection = ({ products, isInGridView, isStore, onAddToCard }) => {

  const history = useHistory();

  const { setLoading, setCustomAlert } = useAuth();

  const [{ loading, error, data }, addToCart] = useAxios({ url: `/carts/add-to-cart`, method: "POST" }, { manual: true, useCache: false });

  const [productOnModal, setProductOnModal] = useState(null);

  const [storeAndProduct, setStoreAndProduct] = useState(null);

  const [isAddToCart, setIsAddToCart] = useState(false);

  const [storeToModal, setStoreToModal] = useState(null);

  const [showStoreModal, setShowStoreModal] = useState(false);

  useEffect(() => {
    setLoading({ show: loading, message: "Añadiendo al carrito." })
  }, [loading, setLoading])

  useEffect(() => {
    if (error) {
      setLoading?.({ show: false, message: "" });
      setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${error?.response?.status === 400 ? error?.response?.data.message[0] : error?.response?.data.message}.`, severity: "error" });
    }
  }, [error])

  useEffect(() => {
    if (data) {
      if (!isStore && !isAddToCart) {
        history.push(`/checkout?cartId=${data?.id}`);
        return;
      } else {
        if (isStore) {
          onAddToCard?.(data);
          setCustomAlert?.({ show: true, message: `El producto ha sido añadido al carrito exitosamente.`, severity: "success" })
        } else {
          setIsAddToCart(false);
          setShowStoreModal(true);
        }
      }
    }
  }, [data])

  const handleCloseModal = async (e) => {
    setProductOnModal(null);
    if (e) {
      if (e.discount && !isStore) {
        setStoreAndProduct(e);
        return;
      }

      if (e?.addTocart) {
        setIsAddToCart(e?.addTocart);
        const { addTocart, store, ...rest } = e;
        setStoreToModal(store);
        await addToCart({ data: rest });
        return;
      }
      await addToCart({ data: e });
    }
  }

  const handleClose = async (e) => {
    setStoreAndProduct(null);
    if (e) {
      await addToCart({ data: e });
    }
  }

  const handleCloseStoreModal = () => {
    setShowStoreModal(false);
    setStoreToModal(null);
  }

  return (
    <div>
      {isInGridView
        ?
        <ProductsGrid>
          {products.map((product) => <div
            key={product.id}
            className="justify-center"
          >
            <ProductCard
              name={product.name}
              slug={product.slug}
              description={product?.productDetails?.shortDescription ? product?.productDetails?.shortDescription : product?.description ? product?.description : 'Sin descripción'}
              quantity={product?.productDetails ? product?.productDetails?.quantity : findShowsQuantity(product?.shows)}
              imgSrc={generateImageUrl(product.productImages?.[0]?.path)}
              imgAlt={product.name}
              price={product?.productDetails ? product.productDetails?.price > 0 ? `$${product.productDetails?.price}` : 'Gratis' : ''}
              rating={product?.rating}
              onBuy={() => { product?.productDetails ? setProductOnModal(product) : history?.push(`/products/${product?.slug}`) }}
              buttonText={isStore ? "Añadir al carrito" : "Comprar"}
            />
          </div>)}
        </ProductsGrid>
        : <div className="space-y-4">
          {products.map((product) => <ProductHorizontalCard
            key={product.id}
            name={product.name}
            rating={product?.rating}
            slug={product.slug}
            description={product.shortDescription}
            quantity={product?.productDetails ? product?.productDetails?.quantity : findShowsQuantity(product?.shows)}
            imgSrc={generateImageUrl(product.productImages?.[0]?.path)}
            imgAlt={product.name}
            price={product?.productDetails ? product.productDetails?.price > 0 ? `$${product.productDetails?.price}` : 'Gratis' : 'Ver Funciones'}
            onBuy={() => { product?.productDetails ? setProductOnModal(product) : history?.push(`/products/${product?.slug}`) }}
            storeName={product.store.name}
            storeImageSrc={generateImageUrl(product.store?.storeProfile?.logo)}
            storeImageAlt={product.store.name}
            storeSlug={product?.store?.slug}
            deliveryMethodTypes={product.deliveryMethodTypes.map(item => item.name)}

          />)}
        </div>
      }
      <ProductModal isStore={isStore} product={productOnModal} closeModal={handleCloseModal} />
      <StoreDiscountsModal onClose={handleClose} storeAndProduct={storeAndProduct} />
      <StoreModal show={storeToModal && showStoreModal ? true : false} store={storeToModal} onClose={handleCloseStoreModal} cartId={data?.id} />
    </div>
  )
};

export default ProductsCollection;
```
![](https://i.imgur.com/XYb9dto.png)
[Subir](#top)

<a name="item48"></a>
### ProductsFilters.js

Componente encargado de filtrar los resultados ya se a por por ratin caregoria y etiqueta

```
import RatingsFilter from "./RatingsFilter";
import StoreCategoryFilter from "./StoreCategoryFilter";
import TagsFilter from "./TagsFilters";
import { CalendarComponent } from "@syncfusion/ej2-react-calendars";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const ProductsFilters = ({ onChange, filters, hiddenEvents }) => {
  return (
    <div className="space-y-5">
      <StoreCategoryFilter
        name="storeCategoryIds"
        values={filters?.storeCategoryIds}
        onChange={onChange}
      />
      {filters?.showDate && !hiddenEvents ? (
        <>
          <h4 className="text-xl font-semibold mb-2">Fecha de eventos</h4>
          <div
            title="Quitar filtro"
            onClick={() => {
              onChange({ target: { name: "showDate", value: "" } });
            }}
            className="flex items-center justify-between text-white bg-main rounded-full px-2 py-1 cursor-pointer transition duration-500 hover:bg-white hover:text-main hover:shadow-xl"
            style={{ fontSize: 13 }}
          >
            <span className="capitalize">{`${format(
              new Date(filters?.showDate),
              "EEEE",
              { locale: es }
            )}, ${format(new Date(filters?.showDate), "dd", {
              locale: es,
            })} de ${format(new Date(filters?.showDate), "LLLL", {
              locale: es,
            })} de ${format(new Date(filters?.showDate), "yyyy", {
              locale: es,
            })}`}</span>
          </div>
        </>
      ) : null}
      {!filters?.showDate && !hiddenEvents ? (
        <CalendarComponent
          name="showDate"
          value={filters?.showDate}
          format="dd/MM/yyyy"
          onChange={onChange}
          allowEdit={false}
          floatLabelType="auto"
          openOnFocus={true}
        />
      ) : null}

      {/* Rating */}
      <RatingsFilter
        className="my-8"
        onChange={onChange}
        name="minRating"
        values={filters?.minRating}
      />

      <TagsFilter
        name="tagIds"
        values={filters?.tagIds}
        onChange={onChange}
        filters={filters}
      />
    </div>
  );
};

export default ProductsFilters;

```
![](https://i.imgur.com/NRPjoUX.png)
[Subir](#top)

<a name="item49"></a>
### ProductsGrid.js

Componente donde se visualizan los elementos por grilla

```
const ProductsGrid = ({ children }) => {
  return <div className="grid justify-center md:grid-cols-3 gap-8">{children}</div>;
};

export default ProductsGrid;
```
![](https://i.imgur.com/bNABrAp.png)
[Subir](#top)

<a name="item50"></a>
### QuestionsAnswer.js

Componente usado para que los clientes hagan preguntas a los tiendas sobre cualquier duda que tengan.

```
import { IoSendSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { generateImageUrl } from "../helpers/url";

const QuestionsAnswer = ({
  questions,
  className,
  ownerImage,
  ownerName,
  ownerSlug,
  value,
  onChange,
  name = 'question',
  error,
  onSubmit,
  onSeeMoreClick,
  canSeeMore = true,
}) => {
  return (
    <div className={className}>
      <h1 className="text-2xl text-gray-800 mb-4">Preguntale a: </h1>
      <Link to={`/stores/${ownerSlug}`}>
        <div className="text-2xl text-gray-500 flex items-center mb-4">
          {
            ownerImage &&
            <img className="h-20 w-20 mr-2 rounded-xl" src={ownerImage} alt={ownerName} />
          }
          {ownerName}
        </div>
      </Link>

      <form onSubmit={onSubmit} className="space-y-1">
        <div className="space-y-4 md:space-y-0 md:flex items-center">
          <input
            className="py-2 px-3 bg-gray-200 w-11/12 rounded-xl border-none focus:shadow-xl focus:ring-white focus:bg-white transition duration-500 transform"
            placeholder=" Escribe tu pregunta..."
            type="text"
            name={name}
            onChange={onChange}
            value={value}
          />
          <button className="ml-4 flex items-center font-bold bg-main px-8 py-2.5 text-white rounded-xl transition transform duration-500 hover:bg-gray-100 hover:text-main hover:scale-110 hover:shadow-xl">
            Enviar
            <IoSendSharp className="ml-2" />
          </button>
        </div>

        {error && <span className="block text-red-500 text-xs">{error}</span>}
      </form>

      <div style={{ maxHeight: 500 }} className="custom-scrollbar mt-4 overflow-y-auto">
        {questions.map(({ id, askedBy, question, createdAt, answer, answeredAt }) => <div key={id} className="my-8">
          <div className="flex items-center">
            <img className="h-[50px] w-[50px] rounded-full" src={generateImageUrl(askedBy?.imgPath)} alt={askedBy?.name} />
            <p className="ml-4 font-bold">{askedBy?.name}</p>
          </div>

          <p className="mt-2">{question} - <span className="font-bold">{createdAt}</span></p>

          {answer && <div className="text-gray-500 mt-2 ml-4">
            - {answer} <span className="font-bold">- {answeredAt}</span>
          </div>}
        </div>)}

        {canSeeMore && <button type="button" className="text-main mt-2" onClick={onSeeMoreClick}>
          Ver mas preguntas
        </button>}
      </div>
    </div>
  )
}


export default QuestionsAnswer;
```
![](https://i.imgur.com/DcsMxJe.png)
[Subir](#top)

<a name="item51"></a>
### SearchAddressFilter.js

Componente que filtra las ubicaciones de los envios por ubicacion.

```
import { useEffect, useState } from "react";
import {
  IoCheckmarkCircleSharp,
  IoClose,
  IoLocationSharp,
} from "react-icons/io5";
import useLocations from "../hooks/useLocations";
import CustomInput from "./CustomInput";

const SearchAddressFilter = ({ name, values, onChange, label }) => {
  const [showList, setShowList] = useState(false);

  const [locationFilters, setLocationFilters] = useState({
    name: "",
    perPage: 200,
    page: 1,
  });

  const [selectedLocation, setSelectedLocation] = useState(null);

  const [
    { locations, error: locationsError, loading: locationsLoading },
    getLocations,
  ] = useLocations({
    options: { manual: true, useCache: false },
    params: {
      ...locationFilters,
    },
  });  

  useEffect(() => {
    getLocations({
      params: {
        ...locationFilters,
      },
    });
  }, [locationFilters]);

  const handleChange = (e) => {
    setLocationFilters((oldLocationsFilters) => {
      return {
        ...oldLocationsFilters,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleLocationClick = (customLocation) => {
    setSelectedLocation(customLocation);
    onChange?.({
      target: { name: name, value: customLocation?.id, type: "checkbox" },
    });
  };

  return (
    <div>
      <h1 className="mb-4 flex items-center space-x-2 text-gray-500">
        <IoLocationSharp /> Seleccione las ubicaciones de envios
      </h1>
      <CustomInput
        name="name"
        id="locationsnameinput"
        autoComplete="off"
        placeholder={`Ejemplo: "Buenos Aires"`}
        type="text"
        onChange={handleChange}
        value={locationFilters?.name}
        onFocus={() => {
          setShowList(true);
        }}
        onBlur={() => {
          setTimeout(() => {
            setShowList(false);
          }, [100]);
        }}
      />      
      {locationsLoading ? (
        <div className="text-center text-xl mt-1 animate__animated animate__fadeIn">
          Cargando
        </div>
      ) : showList ? (
        locations?.length > 0 ? (
          <ul
            className="space-y-1 p-1 custom-scrollbar animate__animated animate__fadeIn mt-1"
            style={{ maxHeight: 500, overflowY: "auto" }}
          >
            {locations?.map((customLocation, i) => {
              return (
                <li
                  onClick={() => {
                    handleLocationClick(customLocation);
                  }}
                  key={i}
                  className="p-1 text-gray-500 flex items-center justify-between hover:bg-main hover:text-white capitalize border-b cursor-pointer"
                >
                  <p>
                    {customLocation?.parentLocation?.name
                      ? `${customLocation?.name}, ${customLocation?.parentLocation?.name}`
                      : customLocation?.name}
                  </p>
                  {values?.includes?.(customLocation?.id) && (
                    <IoCheckmarkCircleSharp className="text-green-500" />
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="text-center text-gray-500 mt-2">
            No se encontraron resulados
          </div>
        )
      ) : null}
    </div>
  );
};

export default SearchAddressFilter;

```
[Subir](#top)

<a name="item52"></a>
### SearchInputMobile.js

Componente que al colocarse en modo de dispositivos moviles abre una ventana para ejecutar las funciones de buscardor.

```
import { useRef } from "react";
import reactDom from "react-dom";


const SearchInputMobile = ({ show, onClose, children }) => {

    const modalRef = useRef();

    const handleClose = (e) => {
        if (modalRef.current === e.target) {
            onClose();
        }
    }

    if (!show) {
        return null;
    }

    return reactDom.createPortal(
        <div ref={modalRef} onClick={handleClose} className="fixed flex z-50 h-screen w-screen bg-black bg-opacity-50 left-0 top-0 animate__animated animate__fade">
            <div className="w-10/12 overflow-hidden bg-white animate__animated animate__fadeInUp m-auto rounded-xl">
                <div className="p-4" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                    {children}
                </div>
            </div>
        </div>
        ,
        document.getElementById("portal")
    );
}

export default SearchInputMobile;
```
[Subir](#top)

<a name="item53"></a>
### SectionHeading.js

Componente que se encarga de Cabecera por cada seccion del sitio.

```
const SectionHeading = ({children}) => <h3
  className="flex items-center justify-center p-4 text-2xl bg-main text-white font-semibold rounded-md shadow"
>
  {children}
</h3>;

export default SectionHeading;
```
[Subir](#top)

<a name="item54"></a>
### Select.js

Componente donde se selecciona el numero de telefono y el codigo del pais al que pertenece el cliente.

```
const Select = ({ children, onChange }) => {
  return <select
    className="block w-full text-sm leading-4 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
    onChange={onChange}
  >
    {children}
  </select>;
};

export default Select;
```
[Subir](#top)


<a name="item55"></a>
### SelectDeliverySection.js

Componente usado para visualizacion del detalle del delivery cuando el cliente realiza la compra.

```
import clsx from "clsx";
import { useEffect, useState } from "react";
import {
    IoRocketSharp,
    IoStorefrontSharp
} from "react-icons/io5";
import { Link } from "react-router-dom";
import useDeliveryMethods from "../hooks/useDeliveryMethods";
import useProfileAddress from "../hooks/useProfileAddress";
import Button from "./Button";
import UserAddressCard from "./UserAddressCard";

const SelectDeliverySection = ({ className, storeId, onChange, values, onSelectDeliveryMethod, deliveryMethod, isShowProducts }) => {

    const [{ profileAddress, error, loading }, getProfileAddress] = useProfileAddress({ axiosConfig: { params: { perPage: 200 } }, options: { manual: true, useCache: false } });

    const [selectedAddress, setSelectedAddress] = useState(null);

    const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(null);

    const [{ deliveryMethods, error: deliveryMethodsError, loading: deliveryMethodsLoading }, getDeliveryMethods] = useDeliveryMethods({ axiosConfig: { params: { perPage: 200, addressId: selectedAddress?.id, storeId: storeId } }, options: { manual: true, useCache: false } });

    const [method] = useState(false);

    useEffect(() => {
        if (selectedAddress) {
            return onChange({ target: { name: "profileAddressId", value: selectedAddress?.id, type: "text" } });
        }
        onChange({ target: { name: "profileAddressId", value: "", type: "text" } });
        setSelectedDeliveryMethod(null);
    }, [selectedAddress]);

    useEffect(() => {
        if (selectedDeliveryMethod) {
            return onChange({ target: { name: "deliveryMethodId", value: selectedDeliveryMethod?.id, type: "text" } });
        }
        onChange({ target: { name: "deliveryMethodId", value: "", type: "text" } });
    }, [selectedDeliveryMethod])

    useEffect(() => {
        if (deliveryMethod) {
            getProfileAddress();
            return;
        }
        setSelectedAddress(null);
        setSelectedDeliveryMethod(null);
    }, [deliveryMethod]);

    useEffect(() => {
        if (storeId && selectedAddress && deliveryMethod) {
            getDeliveryMethods({ params: { perPage: 200, addressId: selectedAddress?.id, storeId: storeId } });
        }
    }, [storeId, selectedAddress]);

    return (
        <div className={className}>
            {
                !isShowProducts &&
                <>
                    <h1 className="text-xl text-gray-500 font-bold mb-12 text-center">¿Por favor indique como desea recibir los productos?</h1>
                    <div className="flex items-center justify-around space-x-12">
                        <div onClick={() => { onSelectDeliveryMethod(true) }} className={clsx(["hover:text-main cursor-pointer"], {
                            "text-gray-500": !deliveryMethod,
                            "text-main": deliveryMethod
                        })}>
                            <IoRocketSharp className="m-auto text-4xl" />
                            <p>Quiero que me los envien.</p>
                        </div>
                        <div onClick={() => { onSelectDeliveryMethod(false) }} className={clsx(["hover:text-main cursor-pointer"], {
                            "text-gray-500": deliveryMethod,
                            "text-main": !deliveryMethod
                        })}>
                            <IoStorefrontSharp className="m-auto text-4xl" />
                            <p>Retirar en tienda</p>
                        </div>
                    </div>
                </>
            }


            {
                deliveryMethod && !selectedAddress &&
                <div className="animate__animated animate__fadeInUp mt-6">
                    {
                        loading ?
                            <p className="text-center text-xl my-8">Obteniendo tus direcciones de envio...</p>
                            :
                            profileAddress.length > 0 ?
                                <div>
                                    <h2 className="text-lg text-gray-500 font-bold">¿En cual dirección quieres recibir el envio?</h2>
                                    <div className="text-right my-4">
                                        <Link to={"/my-account/address/new"}>
                                            <Button className="bg-main transition duration-500 hover:bg-white hover:text-main">
                                                Agregar una nueva direccion
                                            </Button>
                                        </Link>
                                    </div>
                                    <div className="flex items-center justify-around flex-wrap">
                                        {
                                            error ?
                                                <div className="text-center w-full text-red-500">
                                                    Ha ocurrido un error.
                                                    <p className="border-b border-red-500 cursor-pointer" onClick={() => { getProfileAddress({ params: { perPage: 200 } }) }}>Reintentar</p>
                                                </div>
                                                :
                                                profileAddress.map((address, i) =>
                                                    <UserAddressCard
                                                        id={address.id}
                                                        key={i}
                                                        className="m-4 min-h-64 cursor-pointer border hover:shadow-xl relative w-64 bg-white rounded text-gray-500 p-8"
                                                        name={address.name}
                                                        address={address.address}
                                                        latLng={{ latitude: address.latitude, longitude: address.longitude }}
                                                        zipCode={address.zipCode}
                                                        onClick={() => { setSelectedAddress(address) }}
                                                    />
                                                )}
                                    </div>
                                </div>
                                :
                                <div className="text-center">
                                    <p>No hay direcciones disponibles.</p>
                                    <a className="text-main hover:text-gray-500" href="/my-account/address/new">¿Deseas registrar una?</a>
                                </div>
                    }
                </div>
            }

            {
                deliveryMethod && selectedAddress &&
                <div className="animate__animated animate__fadeInLeft mt-6">
                    <div className="flex items-center space-x-8">
                        <div>
                            <b>a:</b>
                        </div>
                        <div>
                            <p>Nombre:</p>
                            <b>
                                {selectedAddress?.name}
                            </b>
                        </div>
                        <div>
                            <p>Direccion</p>
                            <b>
                                {selectedAddress?.address}
                            </b>
                        </div>
                        <div>
                            <Button onClick={() => { setSelectedAddress(null) }} className="bg-main transition duration-500 hover:bg-white hover:text-main">
                                Escoger otra dirección.
                            </Button>
                        </div>
                    </div>
                </div>
            }

            {
                deliveryMethod && selectedAddress && storeId && !values.deliveryMethodId &&
                <div className="animate__animated animate__fadeInUp mt-6">
                    {
                        deliveryMethodsError &&
                        <div className="text-center w-full text-red-500">
                            Ha ocurrido un error.
                            <p className="border-b border-red-500 cursor-pointer" onClick={() => { getDeliveryMethods({ params: { perPage: 200, addressId: selectedAddress?.id, storeId: storeId } }) }}>Reintentar</p>
                        </div>

                    }
                    {
                        deliveryMethodsLoading ?
                            <div className="text-main">
                                Cargando Empresas de envio...
                            </div>
                            :
                            deliveryMethods.length > 0 ?
                                <div>
                                    <h3 className="text-gray-500 text-lg font-bold">
                                        Seleccione una empresa de envios
                                    </h3>
                                    <div className="flex space-x-8">
                                        {
                                            deliveryMethods?.map((deliveryMethod, i) => {
                                                return (
                                                    <div key={i} className="flex items-center space-x-2">
                                                        <input
                                                            type="checkbox"
                                                            id={`delivery-method-${deliveryMethod?.id}`}
                                                            value={deliveryMethod?.id}
                                                            name="deliveryMethodId"
                                                            checked={values.deliveryMethodId === deliveryMethod?.id}
                                                            onChange={() => { setSelectedDeliveryMethod(deliveryMethod) }} />
                                                        <label className="text-center cursor-pointer hover:text-main" htmlFor={`delivery-method-${deliveryMethod?.id}`}>
                                                            {
                                                                deliveryMethod?.imgPath ?
                                                                    <img className="w-16 h-16 rounded" src={`${process.env.REACT_APP_API_URL}/${deliveryMethod?.imgPath}`} alt={deliveryMethod.name} />
                                                                    :
                                                                    null
                                                            }
                                                            <p>{deliveryMethod.name}</p>
                                                        </label>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                :
                                <div className="text-center text-red-500">
                                    Esta tienda no tiene metodos de envios disponibles para la dirección seleccionada.
                                    <p>
                                        Por favor seleccione otra dirección o seleccione la opcion de <b>Retirar en tienda</b>.
                                        Ya que quizas la tienda no posee metodos de envio.
                                    </p>
                                </div>
                    }
                </div>
            }
            {
                deliveryMethod && selectedAddress && storeId && selectedDeliveryMethod && values.deliveryMethodId ?
                    <div className="animate__animated animate__fadeInLeft mt-6">
                        <div className="flex items-center space-x-8">
                            <div>
                                <b>con:</b>
                            </div>
                            <div className="text-center">
                                <p>Imagen:</p>
                                {
                                    selectedDeliveryMethod.imgPath ?
                                        <img className="h-12 w-16 rounded" src={`${process.env.REACT_APP_API_URL}/${selectedDeliveryMethod?.imgPath}`} alt={selectedDeliveryMethod?.name} />
                                        :
                                        <p>No poseee</p>
                                }
                            </div>
                            <div>
                                <p>Empresa</p>
                                <b>
                                    {selectedDeliveryMethod?.name}
                                </b>
                            </div>
                            <div>
                                <Button onClick={() => { setSelectedDeliveryMethod(null) }} className="bg-main transition duration-500 hover:bg-white hover:text-main">
                                    Escoger otra empresa de envios.
                                </Button>
                            </div>
                        </div>
                    </div>
                    :
                    null

            }

            {
                !isShowProducts && !deliveryMethod ?
                    <div className="animate__animated animate__fadeInUp text-center my-6 text-xl text-gray-500 font-bold">
                        ¡Perfecto los productos le estaran esperando en la tienda!
                    </div>
                    :
                    null
            }
            {
                isShowProducts &&
                < div className="animate__animated animate__fadeInUp text-center my-6 text-xl text-gray-500 font-bold">
                    Pague y luego retire las entradas con la orden de BeneficioSI en digital o en Fisico.
                </div>
            }
        </div >
    )
}

export default SelectDeliverySection;
```
[Subir](#top)


<a name="item56"></a>
### SelectGridMode.js

Componente encargado para los modos de visualizacion ya sea estilo grilla o por modo lista y su respectiva ubicacion en el mapa.

```
import clsx from "clsx";
import GridIcon from "./GridIcon";
import ListIcon from "./ListIcon";
import LocationMarker from "./LocationMarker";

const SelectGridMode = ({ onChange, viewType }) => {
    return (
        <div className="flex space-x-4">
            <span
                className={clsx(['inline-flex items-center space-x-1 cursor-pointer', viewType !== 'grid' && 'opacity-75'])}
                onClick={() => onChange('grid')}
            >
                <GridIcon className="w-4 h-4" />
                <span>Vista de grilla</span>
            </span>
            <span
                className={clsx(['inline-flex items-center space-x-1 cursor-pointer', viewType !== 'list' && 'opacity-75'])}
                onClick={() => onChange('list')}
            >
                <ListIcon className="w-4 h-4" />
                <span>Vista de lista</span>
            </span>
            <span
                className={clsx(['inline-flex items-center space-x-1 cursor-pointer', viewType !== 'map' && 'opacity-75'])}
                onClick={() => onChange('map')}
            >
                <LocationMarker className="w-4 h-4" />
                <span>Ver en mapa</span>
            </span>
        </div>
    )
}

export default SelectGridMode;
```

[Subir](#top)
<a name="item57"></a>
### ShareIcon.js

Componente no utilizado.

```
const ShareIcon = ({className, stroke = 'currentColor', fill = 'none'}) => <svg
  className={className}
  stroke={stroke}
  fill={fill}
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
>
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
</svg>;

export default ShareIcon;
```
[Subir](#top)


<a name="item58"></a>
### ShowsFeaturedProducts.js

Componente que se encarga de mostrar los productos destacados de la categoria espectaculos.

```
import { useEffect, useState } from "react";
import CategorySectionCard from "./CategorySectionCard";
import ProductCard from "./ProductCard";
import { generateImageUrl } from "../helpers/url";
import ProductModal from "./ProductModal";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import useAxios from "../hooks/useAxios";
import StoreDiscountsModal from "./dicounts/StoreDiscountsModal";
import useFeaturedProducts from "../hooks/useFeaturedProducts";
import Button from "./Button";
import findShowsQuantity from "../helpers/findShowsQuantity";
import StoreModal from "./StoreModal";

const ShowsFeaturedProducts = ({ categoryInfo }) => {

    const history = useHistory();

    const { setLoading, setCustomAlert } = useAuth();

    const [{ loading, error, data }, addToCart] = useAxios({ url: `/carts/add-to-cart`, method: "POST" }, { manual: true, useCache: false });

    const [{ featuredProducts, error: featuredProductError, loading: featuredProductsLoading }, getFeaturedProducts] = useFeaturedProducts({ options: { useCache: false } });

    const [productOnModal, setProductOnModal] = useState(null);
    const [storeAndProduct, setStoreAndProduct] = useState(null);

    const [isAddToCart, setIsAddToCart] = useState(false);

    const [storeToModal, setStoreToModal] = useState(null);

    const [showStoreModal, setShowStoreModal] = useState(false);

    useEffect(() => {
        getFeaturedProducts({ params: { isActive: "true", storeCategoryId: 2 } })
    }, [])

    useEffect(() => {
        setLoading({ show: loading, message: "Añadiendo al carrito." })
    }, [loading, setLoading])

    useEffect(() => {
        if (error) {
            setLoading?.({ show: false, message: "" });
            setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${error?.response?.status === 400 ? error?.response?.data.message[0] : error?.response?.data.message}.`, severity: "error" });
        }
    }, [error, setLoading, setCustomAlert])

    useEffect(() => {
        if (data) {
            if (!isAddToCart) {
                history.push(`/checkout?cartId=${data?.id}`);
                return;
            } else {
                setIsAddToCart(false);
                setShowStoreModal(true);
            }
        }
    }, [data])

    const handleCloseModal = async (e) => {
        setProductOnModal(null);
        if (e) {
            if (e.discount) {
                setStoreAndProduct(e);
                return;
            }

            if (e?.addTocart) {
                setIsAddToCart(e?.addTocart);
                const { addTocart, store, ...rest } = e;
                setStoreToModal(store);
                await addToCart({ data: rest });
                return;
            }
            await addToCart({ data: e });
        }
    }

    const handleCloseStoreModal = () => {
        setShowStoreModal(false);
        setStoreToModal(null);
    }

    const handleClose = async (e) => {
        setStoreAndProduct(null);
        if (e) {
            await addToCart({ data: e });
        }
    }


    return (
        <div className="block md:flex space-x-4">
            <CategorySectionCard
                categoryId={categoryInfo?.id}
                text={categoryInfo?.name}
                imgSrc={`${process.env.REACT_APP_API_URL}${categoryInfo?.imgPath}`}
            />

            <div className="md:w-1/2">
                <h4 className="mb-4 text-center text-3xl font-semibold">Mejores productos</h4>

                {
                    featuredProductError ?
                        <div className="text-center flex text-xl h-72 text-red-500">
                            <div className="m-auto">
                                <p>Ha ocurrido un error.</p>
                                <Button className="bg-main" onClick={() => { getFeaturedProducts() }}>
                                    Reintentar
                                </Button>
                            </div>
                        </div>
                        :
                        featuredProductsLoading ?
                            <div className="text-center flex text-xl h-72 text-gray-500">
                                <p className="m-auto">Obteniendo Productos...</p>
                            </div>
                            :
                            featuredProducts?.length > 0 ?
                                <Swiper
                                    style={{ padding: "20px 0" }}
                                    navigation
                                    autoplay
                                    slidesPerView={2}
                                    spaceBetween={15}
                                    pagination={{ clickable: true }}
                                    onSlideChange={() => { }}
                                    onSwiper={(swiper) => { }}
                                >
                                    {featuredProducts?.map((featuredProduct, i) => {
                                        return (
                                            <SwiperSlide key={featuredProduct.id}>
                                                <ProductCard
                                                    name={featuredProduct?.product?.name}
                                                    description={featuredProduct?.product?.productDetails?.shortDescription ? featuredProduct?.product?.productDetails?.shortDescription : featuredProduct?.product?.description ? featuredProduct?.product?.description : 'Sin descripción'}
                                                    imgSrc={generateImageUrl(featuredProduct?.product.productImages?.[0]?.path)}
                                                    rating={featuredProduct?.product?.rating}
                                                    imgAlt={featuredProduct?.product?.name}
                                                    price={featuredProduct?.product?.productDetails ? featuredProduct?.product.productDetails?.price > 0 ? `$${featuredProduct?.product.productDetails?.price}` : 'Gratis' : ''}
                                                    quantity={featuredProduct?.product?.productDetails ? featuredProduct?.product?.productDetails?.quantity : findShowsQuantity(featuredProduct?.product?.shows)}
                                                    onBuy={() => { featuredProduct?.product?.productDetails ? setProductOnModal(featuredProduct?.product) : history?.push(`/products/${featuredProduct?.product?.slug}`) }}
                                                    slug={featuredProduct?.product?.slug}
                                                />
                                            </SwiperSlide>
                                        )
                                    })}
                                </Swiper>
                                :
                                <div className="text-center flex h-72 text-red-500 space-y-8 mt-12">
                                    <div className="m-auto">
                                        <p className="mb-8">No hay productos destacados en la categoria de Espectaculos actualmente.</p>
                                        <Link to={`/products`} className="bg-main text-white px-8 py-4 rounded transition duration-500 hover:bg-white hover:shadow-xl hover:text-main">
                                            Ver Vitrina de productos
                                        </Link>
                                    </div>
                                </div>
                }
            </div>
            <ProductModal product={productOnModal} closeModal={handleCloseModal} />
            <StoreDiscountsModal onClose={handleClose} storeAndProduct={storeAndProduct} />
            <StoreModal show={storeToModal && showStoreModal ? true : false} store={storeToModal} onClose={handleCloseStoreModal} cartId={data?.id} />
        </div>
    )
}

export default ShowsFeaturedProducts;
```

[Subir](#top)


<a name="item59"></a>
### StarIcon.js

Componete usado como componete padre para el icono star para luego usarlo para el rating.
```
const StarIcon = ({className, stroke = 'currentColor', fill = 'none'}) => {
  return <svg
    className={className}
    stroke={stroke}
    fill={fill}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>;
};

export default StarIcon;
```

![](https://i.imgur.com/64aH7g6.png)
[Subir](#top)


<a name="item60"></a>
### StoreCard.js

Componente donde se visualiza una informacion de una tienda especifica alli se describen ciertas caracteristicas como el ranking, descuento, nombre, ademas si se encuentra abierta o cerrada.

```
import { useEffect, useState } from "react";
import {
  IoCartOutline,
  IoArrowForwardOutline,
  IoTrashSharp
} from "react-icons/io5";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import useAxios from "../hooks/useAxios";
import reactDom from "react-dom";

const StoreCart = (props) => {

  const { setLoading, setCustomAlert } = useAuth();

  const { show, closeCart, cart, onChangeCart } = props;

  const [productToDelete, setProductToDelete] = useState(null);

  const [{ data: deleteData, error: deleteError, loading: deleteLoading }, deleteProductCart] = useAxios({ url: `/carts/${cart?.id}/cart-items/${productToDelete?.id}`, method: "DELETE" }, { useCache: false, manual: true });

  useEffect(() => {
    if (deleteData !== undefined) {
      setCustomAlert({ show: true, message: "Se ha eliminado el producto exitosamente.", severity: "success" });
      onChangeCart({ ...cart, ...deleteData });
    }
  }, [deleteData, setCustomAlert, onChangeCart, cart]);

  useEffect(() => {
    setLoading({ show: deleteLoading, message: "Eliminando el producto" });
  }, [deleteLoading, setLoading]);

  useEffect(() => {
    if (productToDelete) {
      deleteProductCart();
    }
  }, [productToDelete, deleteProductCart]);

  useEffect(() => {
    if (deleteError) {
      setLoading?.({ show: false, message: "" });
      setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${deleteError?.response?.status === 400 ? deleteError?.response?.data.message[0] : deleteError?.response?.data.message}.`, severity: "cartError" });
    }
  }, [deleteError, setLoading, setCustomAlert]);

  const handleDelete = (product) => {
    setProductToDelete(product);
  }


  return reactDom.createPortal(
    <div hidden={!show} className="fixed h-full w-full bg-black bg-opacity-50 top-0 left-0 z-10 text-white animate__animated animate__fadeIn">
      <div className="ml-auto w-full md:w-3/12 bg-white text-gray-600 p-4 animate__animated animate__fadeInRight custom-scrollbar" style={{ maxHeight: "100vh", overflowY: 'auto' }}>
        <IoArrowForwardOutline onClick={() => { closeCart() }} className="text-2xl text-main cursor-pointer transition duration-500 transform hover:scale-150" />
        <div className="flex items-center text-2xl my-4">
          <IoCartOutline />
          <p className="ml-2">Mi Carrito</p>
        </div>

        <div className="border-b">
          <p className="flex text-main w-full items-center text-lg cursor-pointer">
            <span className="ml-auto">Eliminar todo</span>
            <IoTrashSharp />
          </p>
        </div>
        <div className="h-[60vh] overflow-y-auto px-4">
          {
            cart?.cartItems?.length > 0 ?
              cart?.cartItems?.map((product, n) => {
                return (
                  <div key={n} className="my-4">
                    <p className="text-right mb-2">$ {product?.total}</p>
                    <div className="flex justify-between w-full">
                      <div className="w-1/2 flex items-center">
                        <img src={`${process.env.REACT_APP_API_URL}/${product?.productImage}`} className="rounded-full h-12 w-12" alt="" />
                        <div className="ml-2">
                          <h3>{product?.productName}</h3>
                          <b className="text-main">$ {product?.productPrice}</b>
                        </div>
                      </div>
                      <div className="bg-gray-100 text-main w-12 flex rounded">
                        <p className="m-auto">{product.quantity}</p>
                      </div>
                      <div onClick={() => { handleDelete(product) }} className="rounded border border-main w-12 flex text-main transition duration-500 cursor-pointer hover:bg-main hover:text-white">
                        <IoTrashSharp className="m-auto"></IoTrashSharp>
                      </div>
                    </div>
                  </div>
                )
              })
              :
              <div className="text-center">
                <p className="text-red-500 text-xl my-8">No hay productos</p>
                <Link to={`/products`} className="bg-main bg-main px-4 py-2 rounded text-white transition duration-500 hover:bg-gray-100 hover:text-main hover:shadow-xl">Ir a comprar</Link>
              </div>
          }
        </div>
        <div className="border-t mt-2">
          <div className="flex justify-between text-gray-400 my-4">
            <span>Descuento</span>
            <span>$0</span>
          </div>
          <div className="flex justify-between text-gray-400 my-4">
            <span>Sub total</span>
            <span>$ {cart?.subTotal}</span>
          </div>
        </div>

        <div className="text-center my-6">
          <button onClick={() => { closeCart(cart) }} className="px-6 py-2 bg-main rounded w-8/12 text-white font-bold text-xl transition duration-300 hover:text-main hover:bg-gray-100">
            Pagar
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  )
}

export default StoreCart;
```
[Subir](#top)


<a name="item61"></a>
### StoreCategoryFilter.js

Componete padre que muestra los componetes filtros hijo en en el siderbar.

```
import useCategories from "../hooks/useCategories";

const StoreCategoryFilter = ({ onChange, name, values }) => {

    const [{ categories, error: errorCategories, loading: loadingCategories }, getCategories] = useCategories();

    return (
        <div>
            <h4 className="text-xl font-semibold mb-2">Categorias</h4>
            <ul className="text-gray-800 space-y-2 max-h-56 overflow-y-auto">
                {
                    loadingCategories ?
                        <div className="text-center text-gray-500">Obteniendo categorias...</div>
                        :
                        errorCategories ?
                            <div className="text-red-500 text-center">
                                <p>Ha ocurrido un error</p>
                                <button className="bg-red-500" onClick={() => { getCategories() }}>
                                    Reintentar
                                </button>
                            </div>
                            :
                            categories.map((category, i) =>
                                <div key={i} className="flex items-center space-x-4 cursor-pointer">
                                    <input
                                        onChange={onChange}
                                        name={name}
                                        value={category.id}
                                        checked={values?.includes(category.id)}
                                        className="text-main focus:ring-white"
                                        id={`${category.name}-${i}`}
                                        type="checkbox" />
                                    <label className="cursor-pointer capitalize" htmlFor={`${category.name}-${i}`}>
                                        <p>{category.name}</p>
                                    </label>
                                </div>
                            )}
            </ul>
        </div>
    )
}

export default StoreCategoryFilter;
```
[Subir](#top)


<a name="item62"></a>
### StoreHorizontalCard.js

Componente donde se visualiza la informacion del producto cuando el usuario elige la vista en modo lista alli se aprecian varios items como items, productos, descuentos, ubicacion.


```
import { Link } from "react-router-dom";
import Button from "./Button";
import StarIcon from "./StarIcon";
import { IoHeartOutline } from "react-icons/io5";
import { IoHeart } from "react-icons/io5";
import { useState } from "react";
import { IoStorefrontOutline } from "react-icons/io5";
import { IoLocationSharp } from "react-icons/io5";


const StoreHorizontalCard = ({ cheapestProduct, imgSrc, imgAlt, name, description, rating, shortDescription, isFavorite, slug, open }) => {

  const [favorite, setFavorite] = useState(isFavorite);

  return <div
    className="flex bg-white py-4 px-4 hover:shadow-2xl transition duration-300 rounded-md animate__animated animate__rotateInUpLeft"
  >

    {
      imgSrc ?
        <img
          src={`${process.env.REACT_APP_API_URL}/${imgSrc}`}
          alt={imgAlt}
          className="w-12 h-12 md:w-56  md:h-56 mr-4 rounded-xl"
        />
        :
        <IoStorefrontOutline className="w-12 h-12 md:w-56  md:h-56 mr-4 rounded-xl" />
    }

    <div className="flex-grow flex flex-col">
      <div className="flex justify-between">
        <div>
          <Link to={`/stores/${slug}`}>
            <h4 className="text-lg font-semibold hover:text-main transition duration-300">{name}</h4>
          </Link>
          <p className="mt-4">{shortDescription}</p>
          <div className="flex space-x-1 mt-2">
            {Array.from(Array(5).keys()).map((n) => {
              return (
                <svg
                  key={n}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-yellow-300"
                  fill={(n + 1) <= rating ? 'currentColor' : 'none'}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              )
            })}
          </div>
        </div>
        <div>
          <div className="flex items-center">
            {
              open ?
                <Button className="bg-green-500">
                  Abierta
                </Button>
                :
                <Button className="bg-red-500">
                  Cerrada
                </Button>
            }

            {
              favorite ?
                <IoHeart onClick={() => {
                  setFavorite((actualValue) => {
                    return !actualValue;
                  })
                }} className="text-[30px] ml-auto text-main cursor-pointer" />
                :
                <IoHeartOutline onClick={() => {
                  setFavorite((actualValue) => {
                    return !actualValue;
                  })
                }} className="text-[30px] ml-auto text-gray-600 hover:text-main cursor-pointer" />
            }
          </div>
          {
            cheapestProduct?.price ?
              <p className="text-xl font-bold p-4">Desde: ${cheapestProduct.price}</p>
              :
              <p className="text-xl text-red-500 font-bold p-4">Sin Productos</p>
          }

          <p className="hidden md:block text-gray-500 flex items-center">
            <IoLocationSharp className="text-lg mr-2"></IoLocationSharp> <span>A 5km de ti.</span>
          </p>
        </div>
      </div>
      <div className="text-gray-500">
        <p className="mb-4">Envios: Delivery, Envios largos.</p>
        <p>Productos: <span className="text-main">320</span></p>
      </div>
      <div className="flex my-4 items-center">
        <div className="hidden md:block w-1/2 flex-wrap">
          {
            Array.from(Array(5).keys()).splice(1).map((n) => {
              return (
                <div className="bg-red-100 px-2 rounded-full text-main font-bold  mx-1 text-[9px] my-2">
                  {n + '0% Descuento'}
                </div>
              )
            })
          }
        </div>
        <div className="flex justify-right md:w-1/2">
          <Link to={`/stores/${slug}`} className="ml-auto text-gray-600 flex items-center hover:text-main">
            <IoStorefrontOutline className="text-[30px] mr-1" />
            <p>Ver tienda</p>
          </Link>

          <Link className="ml-4 flex items-center text-gray-600 hover:text-main">
            <IoLocationSharp className="text-[30px] mr-1" />
            <p>Ver en mapa</p>
          </Link>
        </div>
      </div>
    </div>
  </div>;
};

export default StoreHorizontalCard;
```

![](https://i.imgur.com/cGnp1gh.png)
[Subir](#top)


<a name="item63"></a>
### StoresCollection.js

Componente donde muestra las tiendas almacenadas en el sitio, directamente desde la base de datos.


```
import StoreCard from "./StoreCard";
import StoreHorizontalCard from "./StoreHorizontalCard";

const StoresCollection = ({ isInGridView, stores }) => {
  return isInGridView
    ? <div className="grid md:grid-cols-3 gap-8">
      {stores.map((store, i) => <div
        key={i}
        className="flex justify-center"
      >
        <StoreCard
          id={store?.storeId}
          imgSrc={store?.storeProfile?.logo ? `${store.storeProfile.logo}` : null}
          imgAlt={store.imgAlt}
          name={store.name}
          description={store.shortDescription}
          rating={store.rating}
          key={i}
          isFavorite={store?.isFavorite}
          slug={store.slug}
          cheapestProduct={store.cheapestProduct}
          open={store?.isOpen}
        />
      </div>)}
    </div>
    : <div className="space-y-4">
      {stores.map((store, i) => <StoreHorizontalCard
        key={i}
        id={store.storeId}
        imgSrc={store?.storeProfile?.logo ? `${store.storeProfile.logo}` : null}
        imgAlt={store.imgAlt}
        name={store.name}
        shortDescription={store.shortDescription}
        description={store.description}
        rating={store.rating}
        isFavorite={store?.isFavorite}
        slug={store?.slug}
        cheapestProduct={store?.cheapestProduct}
        open={store?.isOpen}
      />)}
    </div>;
};

export default StoresCollection;
```

![](https://i.imgur.com/3TuddIO.png)
[Subir](#top)

<a name="item64"></a>
### StoresFilters.js

Componete que filtra los elementos por las categorias del sitio.


```
import Button from "./Button";
import ChevronRightIcon from "./ChevronRightIcon";
import RatingsFilter from "./RatingsFilter";
import SearchAddressFilter from "./SearchAddressFilter";
import StoreCategoryFilter from "./StoreCategoryFilter";
import StoreFeatureFilter from "./StoreFeatureFilter";

const StoresFilters = ({ onChange, filters }) => {

    return (
        <div className="space-y-5">

            <SearchAddressFilter                
                name="locationIds"
                values={filters?.locationIds}
                onChange={onChange}
            />

            <StoreCategoryFilter
                name="storeCategoryIds"
                values={filters?.storeCategoryIds}
                onChange={onChange} />

            {/* Rating */}
            <RatingsFilter
                className="my-8"
                onChange={onChange}
                name="minRating"
                values={filters?.minRating}
            />

            <StoreFeatureFilter
                onChange={onChange}
                name="storeFeatureIds"
                values={filters?.storeFeatureIds}
                filters={filters} />

            <Button
                color="white"
                endAdorment={<ChevronRightIcon className="w-3 h-3" fill="none" />}
                to="/benefits"
            >
                Beneficios
            </Button>
        </div>
    )
}

export default StoresFilters;
```

[Subir](#top)
<a name="item65"></a>
### SuperMarketsFeaturedProducts.js

Componete que muestra los productos destacados de la categoria supermercados.


```
import { useEffect, useState } from "react";
import CategorySectionCard from "./CategorySectionCard";
import ProductCard from "./ProductCard";
import { generateImageUrl } from "../helpers/url";
import ProductModal from "./ProductModal";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import useAxios from "../hooks/useAxios";
import StoreDiscountsModal from "./dicounts/StoreDiscountsModal";
import Button from "./Button";
import useFeaturedProducts from "../hooks/useFeaturedProducts";
import findShowsQuantity from "../helpers/findShowsQuantity";
import StoreModal from "./StoreModal";

const SuperMarketsFeaturedProducts = ({ categoryInfo }) => {

    const history = useHistory();

    const { setLoading, setCustomAlert } = useAuth();

    const [{ loading, error, data }, addToCart] = useAxios({ url: `/carts/add-to-cart`, method: "POST" }, { manual: true, useCache: false });

    const [{ featuredProducts, error: featuredProductError, loading: featuredProductsLoading }, getFeaturedProducts] = useFeaturedProducts({ options: { useCache: false } });

    const [productOnModal, setProductOnModal] = useState(null);
    const [storeAndProduct, setStoreAndProduct] = useState(null);

    const [isAddToCart, setIsAddToCart] = useState(false);

    const [storeToModal, setStoreToModal] = useState(null);

    const [showStoreModal, setShowStoreModal] = useState(false);

    useEffect(() => {
        getFeaturedProducts({ params: { isActive: "true", storeCategoryId: 3 } });
    }, [])

    useEffect(() => {
        setLoading({ show: loading, message: "Añadiendo al carrito." })
    }, [loading, setLoading])

    useEffect(() => {
        if (error) {
            setLoading?.({ show: false, message: "" });
            setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${error?.response?.status === 400 ? error?.response?.data.message[0] : error?.response?.data.message}.`, severity: "error" });
        }
    }, [error, setLoading, setCustomAlert])

    useEffect(() => {
        if (data) {
            if (!isAddToCart) {
                history.push(`/checkout?cartId=${data?.id}`);
                return;
            } else {
                setIsAddToCart(false);
                setShowStoreModal(true);
            }
        }
    }, [data])

    const handleCloseModal = async (e) => {
        setProductOnModal(null);
        if (e) {
            if (e.discount) {
                setStoreAndProduct(e);
                return;
            }

            if (e?.addTocart) {
                setIsAddToCart(e?.addTocart);
                const { addTocart, store, ...rest } = e;
                setStoreToModal(store);
                await addToCart({ data: rest });
                return;
            }
            await addToCart({ data: e });
        }
    }

    const handleCloseStoreModal = () => {
        setShowStoreModal(false);
        setStoreToModal(null);
    }

    const handleClose = async (e) => {
        setStoreAndProduct(null);
        if (e) {
            await addToCart({ data: e });
        }
    }


    return (
        <div className="block md:flex space-x-4">
            <div className="md:w-1/2">

                <h4 className="mb-4 text-center text-3xl font-semibold">Mejores productos</h4>
                {
                    featuredProductError ?
                        <div className="text-center flex text-xl h-72 text-red-500">
                            <div className="m-auto">
                                <p>Ha ocurrido un error.</p>
                                <Button className="bg-main" onClick={() => { getFeaturedProducts() }}>
                                    Reintentar
                                </Button>
                            </div>
                        </div>
                        :
                        featuredProductsLoading ?
                            <div className="text-center flex text-xl h-72 text-gray-500">
                                <p className="m-auto">Obteniendo Productos...</p>
                            </div>
                            :
                            featuredProducts.length > 0 ?
                                <Swiper
                                    style={{ padding: "20px 0" }}
                                    navigation
                                    autoplay
                                    slidesPerView={2}
                                    spaceBetween={15}
                                    pagination={{ clickable: true }}
                                    onSlideChange={() => { }}
                                    onSwiper={(swiper) => { }}
                                >
                                    {featuredProducts?.map((featuredProduct, i) => {
                                        return (
                                            <SwiperSlide key={featuredProduct.id}>
                                                <ProductCard
                                                    name={featuredProduct?.product?.name}
                                                    description={featuredProduct?.product?.productDetails?.shortDescription ? featuredProduct?.product?.productDetails?.shortDescription : featuredProduct?.product?.description ? featuredProduct?.product?.description : 'Sin descripción'}
                                                    imgSrc={generateImageUrl(featuredProduct?.product.productImages?.[0]?.path)}
                                                    rating={featuredProduct?.product?.rating}
                                                    imgAlt={featuredProduct?.product?.name}
                                                    price={featuredProduct?.product?.productDetails ? featuredProduct?.product.productDetails?.price > 0 ? `$${featuredProduct?.product.productDetails?.price}` : 'Gratis' : ''}
                                                    quantity={featuredProduct?.product?.productDetails ? featuredProduct?.product?.productDetails?.quantity : findShowsQuantity(featuredProduct?.product?.shows)}
                                                    onBuy={() => { featuredProduct?.product?.productDetails ? setProductOnModal(featuredProduct?.product) : history?.push(`/products/${featuredProduct?.product?.slug}`) }}
                                                    slug={featuredProduct?.product?.slug}
                                                />
                                            </SwiperSlide>
                                        )
                                    })}
                                </Swiper>
                                :
                                <div className="text-center h-72 text-red-500 space-y-8 mt-12">
                                    <div className="m-auto">
                                        <p className="mb-8">No hay productos destacados en la categoria de SuperMercados actualmente.</p>
                                        <Link to={`/products`} className="bg-main text-white px-8 py-4 rounded transition duration-500 hover:bg-white hover:shadow-xl hover:text-main">
                                            Ver Vitrina de productos
                                        </Link>
                                    </div>
                                </div>
                }
            </div>

            <CategorySectionCard
                categoryId={categoryInfo?.id}
                text={categoryInfo?.name}
                imgSrc={`${process.env.REACT_APP_API_URL}${categoryInfo?.imgPath}`}
            />
            <ProductModal product={productOnModal} closeModal={handleCloseModal} />
            <StoreDiscountsModal onClose={handleClose} storeAndProduct={storeAndProduct} />
            <StoreModal show={storeToModal && showStoreModal ? true : false} store={storeToModal} onClose={handleCloseStoreModal} cartId={data?.id} />
        </div>
    )
}

export default SuperMarketsFeaturedProducts;
```

[Subir](#top)

<a name="item66"></a>
### TableBody.js

Componente padre donde se colocan los elementos, es el cuerpo de los elementos.


```
const TableBody = ({children}) => {
  return <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>;
};

export default TableBody;
```

![](https://i.imgur.com/v6ZnQbE.png)
[Subir](#top)

<a name="item67"></a>
### TableCell.js

Componete que define las celdas que estan el grid del elemento.


```
const TableCell =  ({children, variant}) => {
  
  if (variant === 'head') {
    return <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100">{children}</th>;
  }

  return <td className="px-6 py-4 whitespace-nowrap">{children}</td>;
};

export default TableCell;
```

![](https://i.imgur.com/ZzSsmee.png)
[Subir](#top)

<a name="item68"></a>
### TableHead.js

Componente padre que se usa definir un layout para separar el espacio de todos los elementos items.

```
const TableHead = ({children}) => {
  return <thead className="bg-gray-50">{children}</thead>
};

export default TableHead;
```

[Subir](#top)

<a name="item69"></a>
### TableRow.js

Componente que se usa definir un layout para separar items.


```
const TableRow = ({children}) => <tr>{children}</tr>;

export default TableRow;
```

![](https://i.imgur.com/mibkJ9U.png)
[Subir](#top)

<a name="item70"></a>
### TextField.js

Componente usado para colocar el Campo de Texto.

```
import clsx from "clsx";

const TextField = ({
  id,
  type = 'text',
  className,
  inputClassName,
  placeHolder,
  onChange,
  name,
  value
}) => {
  const finalId = id ?? Math.random().toString(36).substring(7);

  return <div className={clsx('flex items-center', className)}>
    <label htmlFor={finalId}></label>
    <input
      onChange={onChange}
      name={name}
      value={value}
      type={type}
      id={finalId}
      className={clsx([
        `block w-full
        leading-4 text-sm
        border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
        rounded-md shadow-sm`,
        inputClassName,
      ])}
      placeholder={placeHolder}
    />
  </div>;
};

export default TextField;
```

![]()
[Subir](#top)


<a name="item72"></a>
### VideoComponent.js

Componete que muestra el video del producto elegido.


```
import { useEffect, useState } from "react";
import { validURL } from "../helpers/formsValidations";

const VideoComponent = ({ url }) => {

    const [videoUrl, setVideoUrl] = useState({
        url: '',
        type: ''
    });

    useEffect(() => {
        if (url && validURL(url)) {
            var url_string = url;
            var newUrl = new URL(url_string);
            var v = newUrl.searchParams.get("v");
            if (v) {
                setVideoUrl({
                    type: 'youtube',
                    url: `https://www.youtube.com/embed/${v}`
                });
            } else {
                setVideoUrl({
                    type: 'another',
                    url: url
                });
            }

        }
    }, [url]);

    return (
        <div className="text-center space-y-4">
            {
                videoUrl?.type === 'youtube' ?
                    <iframe
                        className="mx-auto h-56 w-full my-8 md:my-8 md:w-9/12 md:h-[60vh]"
                        src={videoUrl?.url}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                    :
                    <video src={videoUrl?.url} className="mx-auto h-56 w-full my-8 md:my-8 md:w-9/12 md:h-[60vh]"></video>
            }
        </div>
    )
}

export default VideoComponent;
```

![](https://i.imgur.com/EZ1W10b.png)
[Subir](#top)


<a name="item73"></a>
### WidgetComponent.js

Componente usado para facilitar y darle un sentido mas dinamicos a los elementos del sitio en el dinamismo del texto.


```
import { IoLogoFacebook, IoLogoInstagram, IoLogoTwitter, IoLogoYoutube } from "react-icons/io5";

const WidgetComponent = ({ widget }) => {

    if (widget.type === 'text') {
        return (
            <p className="text-white text-center md:text-justify">
                {widget.value}
            </p>
        )
    }

    if (widget.type === 'url') {
        return (
            <div>
                <a href={widget.url} className="text-white text-center md:text-justify border-b">
                    {widget.value}
                </a>
            </div>
        )
    }

    if (widget.type === 'image') {
        return (
            <img src={`${process.env.REACT_APP_API_URL}/${widget?.image}`} className="mx-auto md:m-none w-full" />
        )
    }

    if (widget.type === 'socials') {
        return (
            <div className="flex justify-center md:justify-none space-x-4">
                {
                    widget.facebook &&
                    <a className="text-2xl hover:text-main" href={widget.facebook} target="_blank">
                        <IoLogoFacebook />
                    </a>
                }
                {
                    widget.instagram &&
                    <a className="text-2xl hover:text-main" href={widget.instagram} target="_blank">
                        <IoLogoInstagram />
                    </a>
                }
                {
                    widget.twitter &&
                    <a className="text-2xl hover:text-main" href={widget.twitter} target="_blank">
                        <IoLogoTwitter />
                    </a>

                }
                {
                    widget.youtube &&
                    <a className="text-2xl hover:text-main" href={widget.youtube} target="_blank">
                        <IoLogoYoutube />
                    </a>
                }
            </div>
        )
    }

}

export default WidgetComponent;
```

![](https://i.imgur.com/6mgQWwt.png)
[Subir](#top)

<a name="item74"></a>
### logOutModal.js

componente que abre una ventana emergente para cerrar sesion

```
import clsx from "clsx";
//ICONS
import { IoIosCloseCircleOutline } from "react-icons/io";

//Imagenes
import BeneficioSiLogo from '../assets/images/logo.jpg';

import { useAuth } from "../contexts/AuthContext";

const LogOutModal = (props) => {

  const { setAuthInfo } = useAuth();

  const { show, setShow } = props;


  const handleContinue = () => {
    setAuthInfo({ isAuthenticated: false, user: null, token: null });
    closeModal();
  }

  const closeModal = () => {
    setShow(false);
  }

  return (
    <div
      className={clsx('h-full w-full bg-black bg-opacity-50 fixed top-0 left-0 z-[9999999999999999999] flex animate__animated animate__fadeIn', {
        'hidden': !show
      })}>
      <div
        className={clsx('m-auto w-1/2 bg-white rounded relative p-4 animate__animated animate__fadeInUp', {
          'hidden': !show
        })}>
        <IoIosCloseCircleOutline onClick={closeModal} className="absolute -top-4 -right-4 text-4xl cursor-pointer text-main"></IoIosCloseCircleOutline>
        <div className="flex items-center">
          <img src={BeneficioSiLogo} className="w-1/12" alt="" />
          <p className="text-gray-800 text-lg ml-4 font-bold">BeneficioSi</p>
        </div>

        <h1 className="text-center text-gray-700 text-bold text-2xl my-5">¿Deseas Cerrar la sesion?</h1>

        <div className="text-center mt-8">

          <button onClick={handleContinue} className={'bg-main text-white px-10 md:px-24 md:py-4 rounded-full transition duration-500'} >
            <p className="font-bold text-xl">Continuar</p>
          </button>
        </div>
      </div>
    </div >
  )

}

export default LogOutModal;
```

![]()
[Subir](#top)


<a name="item75"></a>
### StoreNewPost.js

Componente que se encarga de visualizar los nuevos posteos de las tiendas de sus respectivos productos o eventos.


```
import { useEffect, useState } from "react";
import useNews from "../hooks/useNews";
import { Swiper, SwiperSlide } from "swiper/react";

const StoresNewsPosts = ({ storeId }) => {
  const [actualNews, setActualNews] = useState([]);

  const [filters, setFilters] = useState({
    page: 1,
    storeId: "",
  });

  const [{ news, numberOfPages, error, loading }, getNews] = useNews({
    params: {
      ...filters,
    },
  });

  useEffect(() => {
    setActualNews((oldActualNews) => {
      return [...oldActualNews, ...news];
    });
  }, [news]);

  useEffect(() => {
    setActualNews([]);
    setFilters((oldFilters) => {
      return {
        ...oldFilters,
        storeId: storeId,
      };
    });
  }, [storeId]);

  useEffect(() => {
    getNews({
      params: {
        ...filters,
      },
    });
  }, [filters]);

  const handleEnd = (e) => {
    if (filters?.page < numberOfPages && actualNews.length > 0) {
      setFilters((oldFilters) => {
        return {
          ...oldFilters,
          page: oldFilters?.page + 1,
        };
      });
    }
  };

  return (
    <div className="px-8">
      {loading && actualNews?.length === 0 ? (
        <div className="text-center mt-10 text-3xl text-gray-500">
          Obteniendo noticias
        </div>
      ) : actualNews?.length > 0 ? (
        <>
          {storeId && (
            <h1 className="text-center mt-10 text-3xl text-gray-500">
              Boletín de noticias
            </h1>
          )}
          <Swiper
            slidesPerView={
              window.innerWidth > 768
                ? actualNews?.length > 7
                  ? 7
                  : actualNews?.length
                : 2
            }
            navigation
            style={{ padding: "50px 30px" }}
            onReachEnd={handleEnd}
          >
            {actualNews.map((newPost, i) => {
              return (
                <SwiperSlide key={i}>
                  <a
                    href={newPost?.redirectUrl}
                    target="_blank"
                    className="transform transition duration-500 hover:-translate-y-2 block"
                  >
                    <div
                      className="rounded-xl shadow-2xl relative overflow-hidden"
                      style={{ height: 200, width: 130 }}
                    >
                      <img
                        className="rounded-xl"
                        style={{ height: "100%", width: "100%" }}
                        src={`${process.env.REACT_APP_API_URL}/${newPost?.imgPath}`}
                      />
                      <div
                        className="absolute flex text-white text-xl text-center"
                        style={{
                          background: "rgba(0,0,0, .3)",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        <div className="m-auto">{newPost?.title}</div>
                      </div>
                    </div>
                  </a>
                  <div className="mt-4 text-center" style={{ width: 130 }}>
                    {newPost?.store?.storeProfile?.logo ? (
                      <a
                        href={`/stores/${newPost?.store?.slug}`}
                        target="_blank"
                      >
                        <img
                          className="w-10 h-10 m-auto rounded"
                          src={`${process.env.REACT_APP_API_URL}/${newPost?.store?.storeProfile?.logo}`}
                        />
                        <span>{newPost?.store?.name}</span>
                      </a>
                    ) : (
                      <a>{newPost?.store?.name}</a>
                    )}
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </>
      ) : (
        null
      )}
    </div>
  );
};

export default StoresNewsPosts;

```

![]()
[Subir](#top)

<a name="item76"></a>
### Checkbox.js

Elemento para tildar para selecionar un elento y asi filtrar una busqueda.

```
import clsx from "clsx";
const Checkbox = ({id, name, label, checked, value, onChange, className, nameClassName}) => {
  const finalId = id ?? Math.random().toString(36).substring(7);

  return <label
    htmlFor={finalId}
    className={clsx("inline-flex items-center space-x-2 cursor-pointer", className)}
  >
    <input
      name={name}
      id={finalId}
      type="checkbox"
      value={value}
      checked={checked}
      onChange={onChange}
      className="rounded border-gray-300 text-main shadow-sm focus:border-main-light focus:ring focus:ring-offset-0 focus:ring-main-light focus:ring-opacity-50 cursor-pointer"
    />
    {label && <span className={nameClassName}>{label}</span>}
  </label>;
};

export default Checkbox;
```

![](https://i.imgur.com/vO27pDw.png)
[Subir](#top)

<a name="item77"></a>
### TabContainer.js

Componente layout usado para dividir elementos por pestañas, y es el encargado de la estructura de la tab.

```
const TabsContainer = ({ children, className }) => {
  const finalChildren = Array.isArray(children) ? children : [children];

  return <div className={`${className}`}>{finalChildren}</div>;
}
export default TabsContainer;
```

![](https://imgur.com/a/kSdLskT)
[Subir](#top)