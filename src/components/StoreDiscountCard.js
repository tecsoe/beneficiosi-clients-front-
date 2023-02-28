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