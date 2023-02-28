import clsx from "clsx";
import { useEffect, useState } from "react";
import { IoClose, IoHappyOutline, IoLocationSharp } from "react-icons/io5";
import Map from "../components/googlemaps/Map";
import StoreInSideBar from "../components/StoreInSideBar";
import { useAuth } from "../contexts/AuthContext";
import useCategories from "../hooks/useCategories";
import useLocations from "../hooks/useLocations";
import useStores from "../hooks/useStores";
import SystemInfo from "../util/SystemInfo";

var WKT = require('terraformer-wkt-parser');

const StoresInMap = () => {
  const { setLoading } = useAuth();

  const [filters, setFilters] = useState({
    page: 1,
    perPage: 500,
    userLatLng: "",
    locationIds: [],
    storeCategoryIds: [],
  });

  const [polygon, setPolygon] = useState(null);

  const [showList, setShowList] = useState(false);

  const [selectedLocation, setSelectedLocation] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const [{ categories }, getCategories] = useCategories();

  const [locationFilters, setLocationFilters] = useState({
    name: "",
    perPage: 200,
    page: 1,
  });

  const [googleMapsOptions, setGoogleMapsOptions] = useState({
    center: { lat: -34.61816057938619, lng: -58.48617933677675 },
    zoom: 5,
  });

  const [googleMapsMarkers, setGoogleMapsMarkers] = useState([]);

  const [selectedStore, setSelectedStore] = useState(null);

  const [
    { locations, error: locationsError, loading: locationsLoading },
    getLocations,
  ] = useLocations({
    options: { manual: true, useCache: false },
    params: {
      ...locationFilters,
    },
  });

  const [{ stores, total, size, numberOfPages, error, loading }, getStores] =
    useStores({
      params: {
        ...filters,
        locationIds: filters?.locationIds?.join(","),
        storeCategoryIds: filters?.storeCategoryIds?.join(","),
      },
    });

  useEffect(() => {
    setLoading({ show: loading, message: "Obteniendo tiendas" });
  }, [loading]);

  useEffect(() => {
    setFilters((oldFilters) => {
      return {
        ...oldFilters,
        locationIds: [selectedLocation?.id],
      };
    });

    /* if (selectedLocation) {      
      var realArea = [];
      WKT?.parse?.(selectedLocation?.area)?.coordinates?.forEach?.(
        (areas) => {
          return realArea.push(
            areas[0].map((points) => {
              return {
                lat: points[0],
                lng: points[1],
              };
            })
          );
        }
      );
      
      setPolygon(realArea);
      setGoogleMapsOptions((oldGoogleMapsOpts) => {
        return {
          ...oldGoogleMapsOpts,
          center: realArea?.[0],
        };
      });
    } */
  }, [selectedLocation]);

  useEffect(() => {
    setFilters((oldFilters) => {
      return {
        ...oldFilters,
        storeCategoryIds: [selectedCategory?.id],
      };
    });
  }, [selectedCategory]);

  useEffect(() => {
    getLocations({
      params: {
        ...locationFilters,
      },
    });
  }, [locationFilters]);  

  useEffect(() => {
    setGoogleMapsMarkers(
      stores?.map((store) => {
        return {
          lat: store?.latitude,
          lng: store?.longitude,
          store: store,
        };
      })
    );
  }, [stores]);  

  const hanleMapClick = (e) => {
    console.log(e);
  };

  const handleChange = (e) => {
    setLocationFilters((oldLocationsFilters) => {
      return {
        ...oldLocationsFilters,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleLocation = (l) => {
    setSelectedLocation(l);
  };

  const handleCategory = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="p-8">
      <div>
        <div className="flex justify-center items-center mb-8">
          <img
            style={{ width: 70 }}
            className="text-gray-700"
            src={SystemInfo.logo}
            alt=""
          />
          <h1 className="ml-2 text-gray-500 font-bold text-[30px]">
            {SystemInfo.name}
          </h1>
        </div>
        <h1 className="text-center text-2xl mb-4 flex items-center space-x-2 justify-center text-gray-500">
          <IoLocationSharp /> Indique su Ubicación
        </h1>
        <p className="text-center mb-10">
          Por favor ingrese su dirección para mostrarle los comercios que realizan envios
          a su ubicación.
        </p>
        <div>
          <input
            placeholder={`Ejemplo: "Buenos Aires"`}
            className="w-full p-6 border-none focus:border-main rounded shadow-xl focus:outline-white focus:ring-white"
            type="text"
            onChange={handleChange}
            name="name"
            autoComplete="off"
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
            <div className="text-center text-xl mt-4 animate__animated animate__fadeIn">
              Cargando
            </div>
          ) : showList ? (
            locations?.length > 0 ? (
              <div className="px-4">
                <ul
                  className="space-y-3 p-4 custom-scrollbar bg-white shadow-xl animate__animated animate__fadeIn"
                  style={{ maxHeight: 500, overflowY: "auto" }}
                >
                  {locations?.map((customLocation, i) => {
                    return (
                      <li
                        onClick={() => {
                          handleLocation(customLocation);
                        }}
                        key={i}
                        className="p-2 text-gray-500 font-semibold hover:bg-main hover:text-white capitalize text-lg border-b cursor-pointer"
                      >
                        {customLocation?.name}
                        {customLocation?.parentLocation?.name
                          ? `, ${customLocation?.parentLocation?.name}`
                          : null}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : (
              <div className="text-center text-gray-500 text-2xl mt-8">
                No se encontraron resulados
              </div>
            )
          ) : null}

          {selectedLocation && (
            <div className="flex items-center justify-between bg-main mt-4 p-4 text-white rounded-full animate__animated animate__fadeInLeft">
              <p>
                {selectedLocation?.name}
                {selectedLocation?.parentLocation?.name
                  ? `, ${selectedLocation?.parentLocation?.name}`
                  : null}
              </p>
              <IoClose
                className="text-2xl cursor-pointer"
                onClick={() => {
                  setSelectedLocation(null);
                }}
              />
            </div>
          )}
        </div>
        {selectedLocation ? (
          <div>
            <h3 className="text-2xl font-bold text-gray-500 mt-8">
              Tiendas: {stores?.length}
            </h3>
            <h3 className="text-2xl text-center font-bold text-gray-500 mt-8">
              Categorias
            </h3>
            {categories?.length > 0 && (
              <div className="flex items-center justify-between my-8">
                <div
                  onClick={() => {
                    handleCategory(null);
                  }}
                  className={clsx(
                    [
                      "flex w-full p-4 hover:shadow-xl cursor-pointer rounded hover:text-main text-gray-500",
                    ],
                    {
                      "bg-white": !selectedCategory?.id,
                    }
                  )}
                  style={{ width: "10vw", height: "10vw" }}
                >
                  <div className="m-auto text-center">
                    <p className="capitalize font-bold">Todo</p>
                  </div>
                </div>
                {categories?.map((category, i) => {
                  return (
                    <div
                      onClick={() => {
                        handleCategory(category);
                      }}
                      key={i}
                      className={clsx(
                        [
                          "flex w-full p-4 hover:shadow-xl cursor-pointer rounded hover:text-main text-gray-500",
                        ],
                        {
                          "bg-white": category?.id === selectedCategory?.id,
                        }
                      )}
                      style={{ width: "10vw", height: "10vw" }}
                    >
                      <div className="m-auto text-center">
                        <img
                          style={{ height: 60, width: 60 }}
                          className="m-auto mb-4"
                          src={`${process.env.REACT_APP_API_URL}${category?.logo}`}
                        />
                        <p className="capitalize font-bold">{category?.name}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            {stores?.length === 0 && (
              <div className="text-center text-red-500 my-8 font-bold text-2xl">
                Lo sentimos pero no tenemos {selectedCategory ? `comercios de ${selectedCategory?.name}` : 'comercios'} que atiendan en esta zona.
              </div>
            )}
          </div>
        ) : (
          <div className="text-gray-500 text-center my-8 font-bold text-2xl">
            Por favor seleccione una ubicación
          </div>
        )}
        {
          selectedLocation && stores?.length > 0 ?
          <div className="text-center text-gray-500">
            Estos son los comercios que realizan envios a tu zona <IoHappyOutline className="inline text-xl"/>
          </div>
          :
          null
        }
        <Map
          className="animate__animated animate__fadeIn"
          style={{
            display: selectedLocation && stores?.length > 0 ? "block" : "none",
          }}
          height="90vh"
          defaultPolygon={polygon}
          forStores
          options={googleMapsOptions}
          onClick={hanleMapClick}
          markers={googleMapsMarkers}
          onSelectedStore={(store) => {
            setSelectedStore(store);
          }}
        />
      </div>
      <StoreInSideBar
        store={selectedStore}
        onClose={() => {
          setSelectedStore(null);
        }}
      />
    </div>
  );
};

export default StoresInMap;
