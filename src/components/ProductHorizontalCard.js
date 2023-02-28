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