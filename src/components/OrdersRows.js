import { useEffect, useState } from "react";
import { IoCheckmarkDoneOutline, IoEye, IoStorefrontSharp, IoStarOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import isAllRated from "../helpers/isAllRated";
import useAxios from "../hooks/useAxios";
import ProductToRatingModal from "./ProductToRatingModal";


const OrdersRows = ({ orderValue, ...rest }) => {

    const { setLoading, setCustomAlert } = useAuth();

    const [order, setOrder] = useState(null);

    const [productsToRating, setProductsToRating] = useState(null);

    const [{ data: updateData, error: updateError }, updateOrder] = useAxios({ url: `/orders/${order?.id}/status`, method: "PUT" }, { manual: true, useCache: false });

    useEffect(() => {
        if (orderValue) {
            console.log(orderValue);
            setOrder(orderValue)
        }
    }, [orderValue]);

    useEffect(() => {
        if (updateData) {
            setLoading?.({ show: false, message: "" });
            setOrder(updateData);
            setCustomAlert?.({ show: true, message: "La orden ha sido finalizada exitosamente.", severity: "success" });
        }
    }, [updateData]);

    useEffect(() => {
        if (updateError) {
            setLoading?.({ show: false, message: "" });
            setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${updateError?.response?.status === 400 ? updateError?.response?.data.message[0] : updateError?.response?.data.message}.`, severity: "error" });
        }
    }, [updateError]);

    const handleAccept = async () => {
        setLoading?.({ show: true, message: "Marcando como recibido." });
        await updateOrder({ data: { orderStatusCode: "ors-007" } })
        setLoading?.({ show: false, message: "" });
    }

    const handleSetRating = () => {
        setProductsToRating({ products: order?.cart?.cartItems, ratedProducts: order?.productIdsFromRatings });
    }

    return (
        <div {...rest} className="md:flex bg-white space-y-4 md:space-y-0 my-4 p-6 items-center rounded-lg transition duration-300 transform hover:shadow-xl hover:-translate-y-2">
            <div className="md:w-1/12 text-center">
                {order?.orderNumber}
            </div>
            <div className="md:w-2/12">
                {order?.delivery?.profileAddress?.address ?
                    order?.delivery?.profileAddress?.address
                    :
                    <b>Retira en tienda.</b>
                }
            </div>
            <div className="md:w-2/12">
                <Link to={`/stores/${order?.store?.slug}`} className="text-blue-500">
                    {
                        order?.store?.storeProfile?.logo ?
                            <img className="w-12 h-12 rounded m-auto" src={`${process.env.REACT_APP_API_URL}/${order?.store?.storeProfile?.logo}`} alt="" />
                            :
                            <IoStorefrontSharp className="m-auto text-gray-500 text-xl" />
                    }
                    <p>{order?.store?.name}</p>
                </Link>
            </div>
            <div className="md:w-1/12">
                $ {order?.total?.toLocaleString()}
            </div>
            <div className="md:w-2/12">
                {order?.createdAt?.toLocaleString()}
            </div>
            <div className="md:w-1/12 rounded-lg p-2 font-bold bg-opacity-10" >
                <p className="px-2 py-1 rounded text-white capitalize" style={{ backgroundColor: order?.orderStatus?.color }}>
                    {order?.orderStatus?.name}
                </p>
            </div>
            <div className="md:w-2/12 capitalize">
                {order?.paymentMethod?.name}
            </div>
            <div className="md:w-1/12 md:flex justify-center">
                <Link to={`/my-account/orders/${order?.id}`}>
                    <IoEye className="m-auto text-2xl cursor-pointer hover:text-main transition duration-300"></IoEye>
                </Link>
                {
                    order?.orderStatus?.code === "ors-005" &&
                    <IoCheckmarkDoneOutline onClick={handleAccept} title="Marcar como recibido." className="m-auto text-2xl cursor-pointer hover:text-green-500 transition duration-300" />
                }
                {
                    order?.orderStatus?.code === "ors-007" && !isAllRated(order?.cart?.cartItems, order?.productIdsFromRatings) ?
                        < IoStarOutline
                            onClick={handleSetRating}
                            title="Agregar rating a los productos."
                            className="m-auto text-2xl cursor-pointer text-yellow-500 transition duration-300" />
                        :
                        null
                }
            </div>
            <ProductToRatingModal products={productsToRating?.products} orderId={order?.id} ratedProducts={productsToRating?.ratedProducts} onClose={() => { setProductsToRating(null) }} />
        </div>
    )
}
export default OrdersRows;