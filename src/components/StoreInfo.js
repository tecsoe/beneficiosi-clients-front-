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