import { Loader } from "@googlemaps/js-api-loader";
import { useRef } from "react";
import { useEffect, useState } from "react";

const loader = new Loader({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  version: "weekly",
  libraries: ["drawing", "geometry", "places", "visualization"],
});

const Map = ({
  searchBox,
  onClick,
  markers,
  options,
  height = "50vh",
  forStores,
  onSelectedStore,
  className,
  style,
  defaultPolygon,
  drawingEnd
}) => {
  const [mapApi, setMapApi] = useState(null);

  const [map, setMap] = useState(null);

  const [autoCompleteInput, setAutoCompleteInput] = useState(null);

  const [actualMarkers, setActualMarkers] = useState([]);

  const [selectedStore, setSelectedStore] = useState(null);

  const [polyline, setPolyLine] = useState(null);
  const [polygon, setPolygon] = useState(null);

  const [polygonPath, setPolygonPath] = useState([]);

  const [draw, setDraw] = useState(false);

  const mapRef = useRef(null);

  const searchRef = useRef(null);

  useEffect(() => {
    if (map && mapApi) {
      setPolyLine(new mapApi.maps.Polyline({
        map: map,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
      }));
    }
  }, [map, mapApi]);

  useEffect(() => {
    if(polyline && polygon){
        onCancelDraw();
    }
    if (defaultPolygon && defaultPolygon?.length > 0) {
      setPolygonPath((oldPolygonPath) => [        
        ...defaultPolygon,
      ]);
    }    
  }, [defaultPolygon]);

  useEffect(() => {
    if (
      defaultPolygon &&
      defaultPolygon?.length > 0 &&
      polygonPath &&
      map &&
      polygonPath.length > 0 &&
      !draw
    ) {
      onAcceptDraw?.();
    }
  }, [polygonPath]);

  useEffect(() => {
    loader.load().then((response) => {
      setMapApi(response);
    });
  }, []);

  useEffect(() => {
    onSelectedStore?.(selectedStore);
  }, [selectedStore]);

  useEffect(() => {
    if (mapApi && mapRef.current) {
      setMap(
        new mapApi.maps.Map(mapRef.current, {
          center: options.center,
          zoom: options.zoom,
        })
      );
    }
  }, [mapApi, mapRef]);

  useEffect(() => {
    if (mapApi && searchRef.current) {
      setAutoCompleteInput(
        new mapApi.maps.places.Autocomplete(searchRef.current, {
          types: ["geocode"],
          componentRestrictions: { country: "ar" },
          fields: ["geometry", "formatted_address"],
        })
      );
    }
  }, [mapApi, searchRef]);

  useEffect(() => {
    if (autoCompleteInput) {
      autoCompleteInput.addListener("place_changed", () => {
        const { geometry, formatted_address } = autoCompleteInput.getPlace();
        searchBox.onChange({
          target: {
            value: formatted_address,
            name: searchBox.name,
            type: "text",
          },
        });
        onClick({ lat: geometry.location.lat(), lng: geometry.location.lng() });
      });
    }
  }, [autoCompleteInput, searchBox, onClick]);

  useEffect(() => {
    if (map) {
      map.setZoom(options.zoom);
      map.setCenter(options.center);
    }
  }, [options, map]);

  useEffect(() => {
    if (map) {
      map.addListener("click", (e) => {
        onClick({ lat: e.latLng.lat(), lng: e.latLng.lng() });
      });
    }
  }, [map]);

  useEffect(() => {
    if (markers && mapApi && map) {
      actualMarkers?.map((actualMarker, i) => {
        actualMarker?.setMap(null);
      });
      setActualMarkers([]);

      markers?.forEach((marker, i) => {
        let newMarker = new mapApi.maps.Marker({
          animation: mapApi.maps.Animation.DROP,
          position: new mapApi.maps.LatLng(marker.lat, marker.lng),
        });
        newMarker.setMap(map);
        if (forStores) {
          newMarker.addListener("click", (e) => {
            setSelectedStore(marker.store);
          });
        }
        setActualMarkers((oldActualMarkers) => {
          return [...oldActualMarkers, newMarker];
        });
      });
    }
  }, [markers, mapApi, map]);

  useEffect(() => {
    if (map) {
      mapApi.maps.event.clearListeners(map, "click");
      map.addListener('click', onClickTheMap);
    }

    if (polygon) {
      if (draw) {
        polygon.setMap(null);
        setPolygonPath([]);
      } else {
        polygon.setMap(map);
      }
    }
  }, [map, draw]);

  const onClickTheMap = ({ latLng }) => {
    if (draw) {
      const path = polyline.getPath();
      path.push(latLng);
      if (path.length === 1) {
        const marker = new mapApi.maps.Marker({
          position: latLng,
          map: map,
        });
        setActualMarkers((oldActualMarkers) => {
          return [...oldActualMarkers, marker];
        })
      }
      setPolygonPath((oldPolygonPath) => [...oldPolygonPath, { lat: latLng.lat(), lng: latLng.lng() }]);
    } else {
      onClick?.({ lat: latLng.lat(), lng: latLng.lng() });
    }
  }

  const onAcceptDraw = () => {
    polyline?.getPath?.()?.clear?.();
    actualMarkers.map((actualMarker, i) => {
      actualMarker.setMap(null);
    });
    setActualMarkers([]);
    setDraw(false);
    setPolygon(new mapApi.maps.Polygon({
      map: map,
      paths: polygonPath,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
    }));
    drawingEnd?.(polygonPath);
  }

  const onCancelDraw = () => {
    polyline.getPath().clear();
    polygon.getPath().clear();
    actualMarkers.forEach((actualMarker, i) => {
      actualMarker.setMap(null);
    });
    setActualMarkers([]);
    setDraw(false);
  }

  return (
    <div className={className} style={style}>
      {mapApi ? (
        <div>
          {searchBox ? (
            <div>
              <div>{searchBox.label}</div>
              <input
                className="w-full rounded"
                ref={searchRef}
                onChange={searchBox.onChange}
                value={searchBox.value}
                name={searchBox.name}
                type="text"
              />
            </div>
          ) : null}
          <div
            style={{ height: `${height}` }}
            className={`cursor-pointer rounded shadow-xl w-full mt-4`}
            ref={mapRef}
          ></div>
        </div>
      ) : (
        <div>Cargando el mapa...</div>
      )}
    </div>
  );
};

export default Map;
