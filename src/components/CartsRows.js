import clsx from "clsx";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { IoCashSharp, IoChevronDownOutline, IoChevronUp, IoCloseSharp, IoStorefrontSharp } from "react-icons/io5"
import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext";
import useAxios from "../hooks/useAxios";
import { es } from "date-fns/locale";

const CartsRows = ({ cartValue, ...rest }) => {

    const { setLoading, setCustomAlert } = useAuth();

    const [showDetails, setShowDetails] = useState(false);

    const [cart, setCart] = useState(null);

    const [itemToDelete, setItemToDelete] = useState(null);

    const [{ data: deleteData, error: deleteError, loading: deleteLoading }, deleteItem] = useAxios({ url: `/carts/${cart?.id}/cart-items/${itemToDelete?.id}`, method: "DELETE" }, { manual: true, useCache: false });

    useEffect(() => {
        if (deleteData) {
            setLoading?.({ show: false, message: "" });
            setCart(deleteData);
            setCustomAlert({ show: true, message: "Se ha eliminado el item exitosamente.", severity: "success" });
        }
    }, [deleteData, setLoading, setCart, setCustomAlert]);

    useEffect(() => {
        if (deleteError) {
            setLoading?.({ show: false, message: "" });
            setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${deleteError?.response?.status === 400 ? deleteError?.response?.data.message[0] : deleteError?.response?.data.message}.`, severity: "error" });
        }
    }, [deleteError, setLoading, setCustomAlert]);

    useEffect(() => {
        setLoading({ show: deleteLoading, message: "Eliminando item del carrito." })
    }, [deleteLoading, setLoading])

    useEffect(() => {
        if (cartValue) {
            setCart(cartValue);
        }
    }, [cartValue, setCart]);

    useEffect(() => {
        if (itemToDelete) {
            deleteItem();
        }
    }, [itemToDelete, deleteItem]);

    const toggleShowDetails = () => {
        setShowDetails((oldShowDetails) => !oldShowDetails);
    }

    const deleteCartItem = (item) => {
        if (item) {
            setItemToDelete(item)
        }
    }

    return (
        <div {...rest} className="bg-white my-4 p-6 rounded-lg transition duration-300 transform hover:shadow-xl hover:-translate-y-2">
            <div className="md:flex items-center">
                <div className="md:w-3/12">
                    {cart?.id}
                </div>
                <div className="md:w-3/12">
                    <Link to={`/stores/${cart?.store?.slug}`} className="text-blue-500">
                        {
                            cart?.store?.storeProfile?.logo &&
                            <img className="w-[50px] m-auto" src={`${process.env.REACT_APP_API_URL}/${cart?.store?.storeProfile?.logo}`} alt="" />
                        }
                        <p>{cart?.store?.name}</p>
                    </Link>
                </div>
                <div className="capitalize md:w-3/12">

                    {
                        cart?.createdAt &&
                        format(new Date(cart?.createdAt), 'EEEE, dd/MM/yyyy', { locale: es })
                    }
                </div>
                <div className="md:w-3/12 font-bold text-gray-500">
                    ${cart?.subTotal}
                </div>
                <div className="md:w-3/12 flex justify-center items-center text-gray-400">
                    <Link to={`/stores/${cart?.store?.slug}`} title="Ir a la tienda.">
                        <IoStorefrontSharp className="mx-2 text-2xl cursor-pointer hover:text-main transition duration-300" />
                    </Link>
                    <Link to={`/checkout?cartId=${cart?.id}`} title="Pagar">
                        <IoCashSharp className="mx-2 text-2xl cursor-pointer hover:text-main transition duration-300" />
                    </Link>
                    {
                        showDetails ?
                            <IoChevronUp title="Mostrar destalles" onClick={toggleShowDetails} className="mx-2 text-2xl cursor-pointer hover:text-main transition duration-300" />
                            :
                            <IoChevronDownOutline title="Ocultar destalles" onClick={toggleShowDetails} className="mx-2 text-2xl cursor-pointer hover:text-main transition duration-300" />
                    }
                </div>
            </div>
            <div className={clsx(["w-full animate__animated animate__zoomIn bg-white border-gray-300 border-t mt-4", {
                'hidden': !showDetails
            }])}>
                {
                    cart?.cartItems?.length > 0 ?
                        cart?.cartItems?.map((product, i2) =>
                            <div key={i2} className="flex items-center my-4 text-gray-400 text-md">
                                <div className="w-2/12">
                                    <IoCloseSharp onClick={() => { deleteCartItem(product) }} className="cursor-pointer hover:text-main m-auto text-4xl text-main" />
                                </div>
                                <div className="w-3/12">
                                    <p>{product.productName}</p>
                                </div>
                                <div className="w-3/12">
                                    <img className="h-20 w-20 m-auto rounded" src={`${process.env.REACT_APP_API_URL}/${product.productImage}`} alt="" />
                                </div>
                                <div className="w-2/12 text-lg">
                                    {product.quantity}
                                </div>
                                <div className="w-2/12 text-lg">
                                    ${product.productPrice}
                                </div>
                            </div>
                        )
                        :
                        <div className="text-center text-red-500 text-xl mt-8">
                            El carrito esta vacio.
                        </div>
                }
            </div>
        </div>
    )
}

export default CartsRows;