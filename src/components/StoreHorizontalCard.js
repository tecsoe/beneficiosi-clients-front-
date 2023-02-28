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