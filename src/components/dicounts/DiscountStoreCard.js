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