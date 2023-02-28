import { Link } from "react-router-dom";
const BankDiscountCard = ({ bankDiscount }) => {

  return <div
    className="bg-white flex align-center p-3 rounded-lg text-gray-500"
  >
    <div className="w-3/12 space-y-2 text-center p-1">
      <img className="m-auto w-1/2 rounded text-center" src={`${process.env.REACT_APP_API_URL}/${bankDiscount?.store?.storeProfile?.logo}`} alt={bankDiscount?.store?.name} />
      <p className="text-gray-700 font-semibold text-center break-words">
        {bankDiscount?.store?.name}
      </p>
    </div>
    <div className="w-6/12 space-y-2 text-center border-r border-l border-gray">
      <p className="text-4xl text-bold">
        {bankDiscount?.value}%
      </p>
      <p className="text-xs">Descuento</p>
      <Link to={`/stores/${bankDiscount?.store?.slug}`}>
        <button className="mt-2 bg-red-100 px-5 transition text-red-600 duration-500 hover:text-white hover:bg-main py-1 rounded-full">
          <p className="font-extrabold text-lg">
            Ir a tienda
          </p>
        </button>
      </Link>
    </div>
    <div className="w-3/12 text-right">
      <div className="text-main">
      </div>
      <div className="mt-2 space-y-2">
        <img className="m-auto w-16 h-16 rounded text-center" src={`${process.env.REACT_APP_API_URL}/${bankDiscount?.cardIssuers?.[0]?.imgPath}`} alt={bankDiscount?.cardIssuers?.[0]?.name} />
        <p className="text-gray-700 font-semibold text-center break-words">
          {bankDiscount?.cardIssuers?.[0]?.name}
        </p>
      </div>
    </div>
  </div>;
};

export default BankDiscountCard;