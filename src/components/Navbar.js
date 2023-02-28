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