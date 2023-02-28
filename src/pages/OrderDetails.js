import { useParams } from 'react-router-dom';

import { IoCartOutline, IoDocumentTextOutline, IoCloudDownloadSharp } from "react-icons/io5";
import useAxios from '../hooks/useAxios';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';
import PrintOrderComponent from '../components/PrintOrderComponent';
import Button from '../components/Button';
import ProductToRatingModal from '../components/ProductToRatingModal';
import isAllRated from '../helpers/isAllRated';
import StoreToRatingModal from '../components/StoreToRatingModal';
import ProductCard from '../components/ProductCard';
import { generateImageUrl } from '../helpers/url';
import { format } from "date-fns";
import { es } from "date-fns/locale";

const OrderDetails = () => {

  const params = useParams();

  const { setLoading, setCustomAlert } = useAuth();

  const [print, setPrint] = useState(false);

  const [order, setOrder] = useState(null);

  const [productsToRating, setProductsToRating] = useState(null);

  const [storeToRating, setStoreToRating] = useState(null);

  const [{ data: orderData, error: orderError, loading: orderLoading }] = useAxios({ url: `/orders/${params?.id}` }, { useCache: false });

  const [{ data: updateData, error: updateError }, updateOrder] = useAxios({ url: `/orders/${params?.id}/status`, method: "PUT" }, { manual: true, useCache: false });

  useEffect(() => {
    if (updateData) {
      setLoading?.({ show: false, message: "" });
      setOrder(updateData);
      setCustomAlert?.({ show: true, message: "La orden ha sido finalizada exitosamente.", severity: "success" });
    }
  }, [updateData])

  useEffect(() => {
    if (orderError) {
      setLoading?.({ show: false, message: "" });
      setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${orderError?.response?.status === 400 ? orderError?.response?.data.message[0] : orderError?.response?.data.message}.`, severity: "error" });
    }

    if (updateError) {
      setLoading?.({ show: false, message: "" });
      setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${updateError?.response?.status === 400 ? updateError?.response?.data.message[0] : updateError?.response?.data.message}.`, severity: "error" });
    }
  }, [orderError, updateError]);

  useEffect(() => {
    setLoading?.({ show: orderLoading, message: "Obteniendo informacion del pedido" });
  }, [orderLoading])

  useEffect(() => {
    if (orderData) {
      setOrder(orderData)
    }
  }, [orderData]);

  const handlePrint = () => {
    setPrint((oldPrint) => !oldPrint);
  }

  const handleAccept = async () => {
    setLoading?.({ show: true, message: "Marcando como recibido." });
    await updateOrder({ data: { orderStatusCode: "ors-007" } })
    setLoading?.({ show: false, message: "" });
  }

  const handleSetRating = () => {
    setProductsToRating({ products: order?.cart?.cartItems, ratedProducts: order?.productIdsFromRatings });
  }

  return (
    <div className="p-8">
      <>
        <h1 className="text-4xl text-gray-500 font-bold">Detalles de la Orden</h1>

        <div className="text-right">
          <Button className="bg-main text-white" onClick={handlePrint}>
            Imprimir
          </Button>
        </div>

        {/*Referencia. */}
        <div className="bg-white rounded text-xl p-4 my-4 text-gray-500">
          Referencia de la orden <span className="font-bold">{order?.orderNumber}</span> - Realizado el {order?.createdAt}
        </div>

        {/*Tipo de envio y tipo de pago. */}
        <div className="bg-white rounded text-xl p-4 my-4 text-gray-500">
          <div className="flex items-center space-x-2">
            <p className="my-2">Metodo de Envio: <b>{order?.deliveryMethod?.name ? order?.deliveryMethod?.name : "Retira en tienda."}</b></p>
            {
              order?.deliveryMethod?.imgPath &&
              <img className="w-12 h-12 rounded" src={`${process.env.REACT_APP_API_URL}/${order?.deliveryMethod?.imgPath}`} alt={`${order?.deliveryMethod?.name}`} />
            }
          </div>

          <div className="flex items-center space-x-2">
            <p className="my-2">Metodo de Pago: <b className="capitalize">{order?.paymentMethod?.name}</b></p>
            {
              order?.paymentMethod?.imgPath &&
              <img className="w-12 h-12 rounded" src={`${process.env.REACT_APP_API_URL}${order?.paymentMethod?.imgPath}`} alt={order?.paymentMethod?.name} />
            }
          </div>
        </div>

        {/*Informacion de Pago */}

        {
          order?.cart?.discount &&
          <div className="bg-white rounded text-xl p-4 my-4 text-gray-500">
            <div className="mb-1">
              <b>Descuento:</b> <span style={{ textTransform: "capitalize" }}>{order?.cart?.discount?.name}</span>
            </div>
            <div className="mb-1">
              {
                order?.cart?.discount?.discountType?.code === "dit-002" &&
                <p>Al pagar con las siguientes tarjetas: <b>{order?.cart?.discount?.cards?.map(card => card.name).join(", ")}</b></p>
              }
              {
                order?.cart?.discount?.discountType?.code === "dit-001" &&
                <p>Al pagar con los siguientes bancos: <b>{order?.cart?.discount?.cardsIssuers?.map(cardIssuer => cardIssuer.name).join(", ")}</b></p>
              }
            </div>
          </div>
        }

        <div className="bg-white rounded text-lg p-8 my-4 text-gray-500">
          <h2>Estado de la orden: <span className="px-4 py-1 capitalize rounded text-white" style={{ backgroundColor: order?.orderStatus?.color }}>{order?.orderStatus?.name}</span></h2>
          {
            order?.orderRejectionReason &&
            <div className="text-gray-500 mt-8">
              <span className="text-gray-500 font-bold">Razon del rechazo:</span> {order?.orderRejectionReason?.reason}
            </div>
          }

          {
            order?.orderStatus?.code === "ors-005" &&
            <div className="text-right mt-2">
              <button onClick={handleAccept} className="bg-main rounded text-white px-4 py-1 transition duration-500 hover:bg-white hover:text-main hover:shadow-xl">
                Marcar como recibido.
              </button>
            </div>
          }

          {
            order?.orderStatus?.code === "ors-008" &&
            <div className="text-right mt-2">
              <button onClick={handleAccept} className="bg-main rounded text-white px-4 py-1 transition duration-500 hover:bg-white hover:text-main hover:shadow-xl">
                Marcar como recibido.
              </button>
            </div>
          }

          {
            order?.orderStatus?.code === "ors-007" && !isAllRated(order?.cart?.cartItems, order?.productIdsFromRatings) ?
              <div className="text-right mt-2 space-x-4">
                {
                  !order?.storeHasBeenRated &&
                  <button onClick={() => { setStoreToRating(order?.store) }} className="bg-main rounded text-white px-4 py-1 transition duration-500 hover:bg-white hover:text-main hover:shadow-xl">
                    Calificar tienda.
                  </button>
                }

                <button onClick={handleSetRating} className="bg-main rounded text-white px-4 py-1 transition duration-500 hover:bg-white hover:text-main hover:shadow-xl">
                  Calificar productos.
                </button>
              </div>
              :
              null
          }
        </div>

        <div className="bg-white rounded text-lg p-8 my-4 text-gray-500 flex items-center space-x-4">
          <h2>Tienda:</h2>
          <div className="text-center">
            {
              order?.store?.storeProfile?.logo &&
              <img className="h-16 w-16 m-auto" src={`${process.env.REACT_APP_API_URL}/${order?.store?.storeProfile?.logo}`} alt="" />
            }
            <p>
              {order?.store?.name}
            </p>
          </div>
        </div>


        {/*Direccion de Envio */}
        <div className="bg-white rounded text-lg p-4 my-4 text-gray-500">
          <h1>Direccion de envio:</h1>
          <div className="flex items-center space-x-4">
            <p>
              {
                order?.delivery?.profileAddress?.name && order?.delivery?.profileAddress?.address ?
                  <>
                    <b>{order?.delivery?.profileAddress?.name}</b> - {order?.delivery?.profileAddress?.address}
                  </>
                  :
                  "Retira en tienda."
              }
            </p>
          </div>
        </div>

        {/*Productos */}
        <div className="bg-white rounded text-lg p-4 my-4 text-gray-500">
          <h1 className="flex items-center text-2xl my-4">
            <IoCartOutline className="mr-2" />  Productos <span className=" ml-4 border rounded-full h-[38px] w-[40px] text-center">{order?.cart?.cartItems?.length}</span>
          </h1>

          <table className="hidden md:block md:w-2/3 text-center">
            <thead className="border-b">
              <tr>
                <th>
                  imagen
                </th>
                <th>
                  productos
                </th>
                <th>
                  Precio Unitario
                </th>
                <th>
                  Cantidad
                </th>
                <th>
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {
                order?.cart?.cartItems?.map((product, i) => {
                  return (
                    <tr key={i}>
                      <th>
                        <img className="w-[70px] h-[70px] m-auto" src={`${process.env.REACT_APP_API_URL}/${product.productImage}`} alt="" />
                      </th>
                      <th>
                        {
                          product?.cartItemShowDetails ?
                            <h3>
                              Entradas para <b>{product?.productName}</b>
                              <p className="capitalize">{` ${format(new Date(product?.cartItemShowDetails?.show?.date), 'EEEE dd/MM/yyyy HH:mm:ss', { locale: es })}`}</p>
                            </h3>
                            :
                            <h3>{product?.productName}</h3>
                        }
                      </th>
                      <th>
                        $ {product.productPrice}
                      </th>
                      <th>
                        {product.quantity}
                      </th>
                      <th>
                        $ {product?.total?.toFixed(2)}
                      </th>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
          <div className="md:hidden space-y-4">
            {
              order?.cart?.cartItems?.map((product, i) => {
                console.log(product);
                return (
                  <div className="text-center">
                    <img className="w-20 h-20 rounded m-auto" src={generateImageUrl(product?.productImage)} alt="" />
                    <p>{product?.productName}</p>
                    <p>{product?.quantity} X ${product?.productPrice} = <b>${product?.total}</b></p>
                  </div>
                )
              })
            }
          </div>
          <div className="text-right my-8 px-8">
            <p className="space-x-4 text-gray-400 my-4">
              <span>Descuento:</span>
              <span>{order?.cart?.discount ? <span className="text-red-500">-${Number(order?.cart?.subTotal - order?.cart?.subTotalWithDiscount).toFixed(2)}</span> : "$0"}</span>
            </p>
            <p className="space-x-4 text-gray-400 my-4">
              <span>Envio:</span>
              <span>${order?.delivery?.total ? order?.delivery?.total : "0"}</span>
            </p>
            <p className="space-x-4 text-gray-400 my-4">
              <span>Subtotal:</span>
              <span>${order?.cart?.discount ? order?.cart?.subTotalWithDiscount : order?.cart?.subTotal}</span>
            </p>
            <p className="space-x-4 text-gray-400 my-4">
              <span>Total:</span>
              <span>${order?.total}</span>
            </p>
          </div>
        </div>

        <div className="bg-white rounded text-lg p-4 my-4 text-gray-500">
          <h1>Datos de envio:</h1>
          {
            order?.orderStatus?.name === "enviada" ?
              <table className="w-full text-center">
                <thead className="border-b">
                  <tr>
                    <th>
                      Fecha
                    </th>
                    <th>
                      Transporte
                    </th>
                    <th>
                      Gastos de Envio
                    </th>
                    <th>
                      Tracking de Envio
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>
                      {new Date().toLocaleString()}
                    </th>
                    <th>
                      Delivery
                    </th>
                    <th>
                      $ 150
                    </th>
                    <th>
                      5445454asd8
                    </th>
                  </tr>
                </tbody>
              </table>
              :
              <div className="text-center text-red-500">
                Esta orden aun no tiene información de envio.
              </div>
          }
        </div>

        <div className="bg-white rounded text-lg p-8 my-4 text-gray-500">
          <h1 className="font-bold">
            Documentos:
          </h1>
          <div className="flex w-full justify-around">
            <div className="flex items-center my-4">
              <IoDocumentTextOutline />
              <p>Orden:</p>
              <span onClick={handlePrint} className="ml-4 cursor-pointer text-main">
                descargar <IoCloudDownloadSharp className="inline" />
              </span>
            </div>
            {
              order?.orderStatus?.name === "pagada" &&
              <div className="flex items-center my-4">
                <IoDocumentTextOutline />
                <p>Factura:</p>
                <span className="ml-4 cursor-pointer text-main">
                  descargar <IoCloudDownloadSharp className="inline" />
                </span>
              </div>
            }
            {
              order?.orderStatus?.name === "enviada" &&
              <div className="flex items-center my-4">
                <IoDocumentTextOutline />
                <p>Albaran de entrega:</p>
                <span className="ml-4 cursor-pointer text-main">
                  descargar <IoCloudDownloadSharp className="inline" />
                </span>
              </div>
            }
          </div>
        </div>
      </>
      <PrintOrderComponent print={print} onFinalizePrint={() => { setPrint(false) }} order={order} />
      <ProductToRatingModal products={productsToRating?.products} orderId={order?.id} ratedProducts={productsToRating?.ratedProducts} onClose={() => { setProductsToRating(null) }} />
      <StoreToRatingModal store={storeToRating} orderId={order?.id} onClose={() => { setStoreToRating(null) }} />
    </div>
  )
}

export default OrderDetails;