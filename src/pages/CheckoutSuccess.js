import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { IoPrintSharp } from "react-icons/io5";

import useAxios from "../hooks/useAxios";
import Button from "../components/Button";
import PrintOrderComponent from "../components/PrintOrderComponent";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const CheckoutSuccess = () => {

    const params = useParams();

    const { setLoading, setCustomAlert } = useAuth();

    const [print, setPrint] = useState(false);

    const [{ data: checkout, error: checkoutError, loading: checkoutLoading }] = useAxios({ url: `/orders/${params?.id}` }, { useCache: false });

    useEffect(() => {
        if (checkoutError) {
            setLoading?.({ show: false, message: "" });
            setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${checkoutError?.response?.status === 400 ? checkoutError?.response?.data.message[0] : checkoutError?.response?.data.message}.`, severity: "error" });
        }
    }, [checkoutError]);

    useEffect(() => {
        setLoading?.({ show: checkoutLoading, message: "Obteniendo informacion del pedido" });
    }, [checkoutLoading]);

    useEffect(() => {
        console.log(checkout);
    }, [checkout])

    const handlePrint = () => {
        setPrint((oldPrint) => !oldPrint);
    }

    return (
        <div className="p-8">
            <div className="bg-white p-4">
                <div className="flex justify-end">
                    <div onClick={handlePrint} className="text-center hover:text-main cursor-pointer">
                        <IoPrintSharp className="m-auto text-main text-2xl" />
                        <p>Imprimir Orden</p>
                    </div>
                </div>
                <h1 className="text-center text-3xl text-green-500 my-4">
                    ¡Enhorabuena se ha creado tu pedido!
                </h1>
                <div>
                    Nota: <b className="text-gray-500">Tu pedido se encuentra en revisión.</b> Estamos validando el pago de tu pedido al ser validado
                    tu pedido cambiara su estatus a <b className="text-green-500">"Aprobado"</b> y recibira una notificacion de nuestra parte.
                    Cuando eso suceda procederemos con el envio de los productos, por favor sea paciente.
                </div>

                <div className="mt-4">
                    <h1 className="text-2xl text-gray-500">
                        Información de la orden: <b>{checkout?.orderNumber}</b>
                    </h1>

                    <div className="flex items-top">
                        <div className="w-4/12">
                            <div className="my-4">
                                <b>Estatus:</b> {checkout?.orderStatus?.name}
                            </div>
                            <div className="flex items-center space-x-4 my-4">
                                <b>Metodo de pago:</b>
                                <div className="text-center">
                                    <img className="h-12 w-14" src={`${process.env.REACT_APP_API_URL}${checkout?.paymentMethod?.imgPath}`} alt="" />
                                    <p className="capitalize">{checkout?.paymentMethod?.name}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 my-4">
                                <b>Metodo de envio:</b>
                                <div className="text-center">
                                    {
                                        checkout?.deliveryMethod?.imgPath &&
                                        <img className="h-12 w-14" src={`${process.env.REACT_APP_API_URL}/${checkout?.deliveryMethod?.imgPath}`} alt="" />
                                    }
                                    <p className="capitalize">{checkout?.deliveryMethod?.name ? checkout?.deliveryMethod?.name : "Retirar en tienda"}</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-8/12">
                            <div>
                                <h1 className="text-xl text-gray-500 font-bold">Detalles de la orden</h1>
                                <div style={{ maxHeight: "50vh" }} className="px-4 overflow-y-auto custom-scrollbar">
                                    {
                                        checkout?.cart?.cartItems?.map((product, n) => {
                                            return (
                                                <div key={n} className="my-4">
                                                    <p className="text-right mb-2">$ {product?.total}</p>
                                                    <div className="flex justify-between items-center w-full">
                                                        <div className="w-1/2 flex items-center space-x-4">
                                                            <b>{n + 1}</b>
                                                            <img src={`${process.env.REACT_APP_API_URL}/${product?.productImage}`} className="rounded-full h-12 w-12" alt="" />
                                                            <div className="ml-2">
                                                                {
                                                                    product?.cartItemShowDetails ?
                                                                        <h3>
                                                                            Entradas para <b>{product?.productName}</b>
                                                                            <p className="capitalize">{` ${format(new Date(product?.cartItemShowDetails?.show?.date), 'EEEE dd/MM/yyyy HH:mm:ss', { locale: es })}`}</p>
                                                                        </h3>
                                                                        :
                                                                        <h3>{product?.productName}</h3>
                                                                }
                                                                <b className="text-main">$ {product?.productPrice}</b>
                                                            </div>
                                                        </div>
                                                        <div className="bg-gray-100 text-main w-12 h-12 flex rounded">
                                                            <p className="m-auto">{product.quantity}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className="border-t mt-2">
                                    <div className="flex justify-between text-gray-400 my-4">
                                        <span>Descuento</span>
                                        <span>{checkout?.cart?.discount ? <span className="text-red-500">-${Number(checkout?.cart?.subTotal - checkout?.cart?.subTotalWithDiscount).toFixed(2)}</span> : "$0"}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-400 my-4">
                                        <span>Envio</span>
                                        <span>{checkout?.delivery?.total}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-400 my-4">
                                        <span>Sub total</span>
                                        <span>$ {checkout?.cart?.discount ? checkout?.cart?.subTotalWithDiscount : checkout?.cart?.subTotal}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-400 my-4">
                                        <span>Total</span>
                                        <span>$ {checkout?.total}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-4">
                    <p className="text-gray-500">
                        <b>Nota: </b> También le enviamos esta información por correo electrónico.
                    </p>
                    <br />
                    <p className="text-gray-500">
                        Si tiene preguntas, comentarios o inquietudes, comuníquese con nuestro equipo de <Link to={"#"}>Atención al cliente.</Link>
                    </p>
                </div>

                <div className="text-center mt-8 space-x-4">
                    <h1 className="mb-4 text-xl text-gray-500">¿Que desea hacer a continuación?</h1>
                    <Link to={`/products`}>
                        <Button className="bg-main transition duration-500 hover:bg-white hover:text-main">
                            Ir a comprar
                        </Button>
                    </Link>
                    <Link to={`/stores`}>
                        <Button className="bg-main transition duration-500 hover:bg-white hover:text-main">
                            Ver tiendas
                        </Button>
                    </Link>
                    <Link to={`/my-account/orders`}>
                        <Button className="bg-main transition duration-500 hover:bg-white hover:text-main">
                            Ver mi listado de ordenes
                        </Button>
                    </Link>
                </div>
            </div>
            <PrintOrderComponent print={print} onFinalizePrint={() => { setPrint(false) }} order={checkout} />
        </div>
    )
}

export default CheckoutSuccess;