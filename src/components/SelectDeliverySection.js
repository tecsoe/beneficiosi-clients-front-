import clsx from "clsx";
import { useEffect, useState } from "react";
import {
    IoRocketSharp,
    IoStorefrontSharp
} from "react-icons/io5";
import { Link } from "react-router-dom";
import useDeliveryMethods from "../hooks/useDeliveryMethods";
import useProfileAddress from "../hooks/useProfileAddress";
import Button from "./Button";
import UserAddressCard from "./UserAddressCard";

const SelectDeliverySection = ({ className, storeId, onChange, values, onSelectDeliveryMethod, deliveryMethod, isShowProducts }) => {

    const [{ profileAddress, error, loading }, getProfileAddress] = useProfileAddress({ axiosConfig: { params: { perPage: 200 } }, options: { manual: true, useCache: false } });

    const [selectedAddress, setSelectedAddress] = useState(null);

    const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(null);

    const [{ deliveryMethods, error: deliveryMethodsError, loading: deliveryMethodsLoading }, getDeliveryMethods] = useDeliveryMethods({ axiosConfig: { params: { perPage: 200, addressId: selectedAddress?.id, storeId: storeId } }, options: { manual: true, useCache: false } });

    const [method] = useState(false);

    useEffect(() => {
        if (selectedAddress) {
            return onChange({ target: { name: "profileAddressId", value: selectedAddress?.id, type: "text" } });
        }
        onChange({ target: { name: "profileAddressId", value: "", type: "text" } });
        setSelectedDeliveryMethod(null);
    }, [selectedAddress]);

    useEffect(() => {
        if (selectedDeliveryMethod) {
            return onChange({ target: { name: "deliveryMethodId", value: selectedDeliveryMethod?.id, type: "text" } });
        }
        onChange({ target: { name: "deliveryMethodId", value: "", type: "text" } });
    }, [selectedDeliveryMethod])

    useEffect(() => {
        if (deliveryMethod) {
            getProfileAddress();
            return;
        }
        setSelectedAddress(null);
        setSelectedDeliveryMethod(null);
    }, [deliveryMethod]);

    useEffect(() => {
        if (storeId && selectedAddress && deliveryMethod) {
            getDeliveryMethods({ params: { perPage: 200, addressId: selectedAddress?.id, storeId: storeId } });
        }
    }, [storeId, selectedAddress]);

    return (
        <div className={className}>
            {
                !isShowProducts &&
                <>
                    <h1 className="text-xl text-gray-500 font-bold mb-12 text-center">¿Por favor indique como desea recibir los productos?</h1>
                    <div className="flex items-center justify-around space-x-12">
                        <div onClick={() => { onSelectDeliveryMethod(true) }} className={clsx(["hover:text-main cursor-pointer"], {
                            "text-gray-500": !deliveryMethod,
                            "text-main": deliveryMethod
                        })}>
                            <IoRocketSharp className="m-auto text-4xl" />
                            <p>Quiero que me los envien.</p>
                        </div>
                        <div onClick={() => { onSelectDeliveryMethod(false) }} className={clsx(["hover:text-main cursor-pointer"], {
                            "text-gray-500": deliveryMethod,
                            "text-main": !deliveryMethod
                        })}>
                            <IoStorefrontSharp className="m-auto text-4xl" />
                            <p>Retirar en tienda</p>
                        </div>
                    </div>
                </>
            }


            {
                deliveryMethod && !selectedAddress &&
                <div className="animate__animated animate__fadeInUp mt-6">
                    {
                        loading ?
                            <p className="text-center text-xl my-8">Obteniendo tus direcciones de envio...</p>
                            :
                            profileAddress.length > 0 ?
                                <div>
                                    <h2 className="text-lg text-gray-500 font-bold">¿En cual dirección quieres recibir el envio?</h2>
                                    <div className="text-right my-4">
                                        <Link to={"/my-account/address/new"}>
                                            <Button className="bg-main transition duration-500 hover:bg-white hover:text-main">
                                                Agregar una nueva direccion
                                            </Button>
                                        </Link>
                                    </div>
                                    <div className="flex items-center justify-around flex-wrap">
                                        {
                                            error ?
                                                <div className="text-center w-full text-red-500">
                                                    Ha ocurrido un error.
                                                    <p className="border-b border-red-500 cursor-pointer" onClick={() => { getProfileAddress({ params: { perPage: 200 } }) }}>Reintentar</p>
                                                </div>
                                                :
                                                profileAddress.map((address, i) =>
                                                    <UserAddressCard
                                                        id={address.id}
                                                        key={i}
                                                        className="m-4 min-h-64 cursor-pointer border hover:shadow-xl relative w-64 bg-white rounded text-gray-500 p-8"
                                                        name={address.name}
                                                        address={address.address}
                                                        latLng={{ latitude: address.latitude, longitude: address.longitude }}
                                                        zipCode={address.zipCode}
                                                        onClick={() => { setSelectedAddress(address) }}
                                                    />
                                                )}
                                    </div>
                                </div>
                                :
                                <div className="text-center">
                                    <p>No hay direcciones disponibles.</p>
                                    <a className="text-main hover:text-gray-500" href="/my-account/address/new">¿Deseas registrar una?</a>
                                </div>
                    }
                </div>
            }

            {
                deliveryMethod && selectedAddress &&
                <div className="animate__animated animate__fadeInLeft mt-6">
                    <div className="flex items-center space-x-8">
                        <div>
                            <b>a:</b>
                        </div>
                        <div>
                            <p>Nombre:</p>
                            <b>
                                {selectedAddress?.name}
                            </b>
                        </div>
                        <div>
                            <p>Direccion</p>
                            <b>
                                {selectedAddress?.address}
                            </b>
                        </div>
                        <div>
                            <Button onClick={() => { setSelectedAddress(null) }} className="bg-main transition duration-500 hover:bg-white hover:text-main">
                                Escoger otra dirección.
                            </Button>
                        </div>
                    </div>
                </div>
            }

            {
                deliveryMethod && selectedAddress && storeId && !values.deliveryMethodId &&
                <div className="animate__animated animate__fadeInUp mt-6">
                    {
                        deliveryMethodsError &&
                        <div className="text-center w-full text-red-500">
                            Ha ocurrido un error.
                            <p className="border-b border-red-500 cursor-pointer" onClick={() => { getDeliveryMethods({ params: { perPage: 200, addressId: selectedAddress?.id, storeId: storeId } }) }}>Reintentar</p>
                        </div>

                    }
                    {
                        deliveryMethodsLoading ?
                            <div className="text-main">
                                Cargando Empresas de envio...
                            </div>
                            :
                            deliveryMethods.length > 0 ?
                                <div>
                                    <h3 className="text-gray-500 text-lg font-bold">
                                        Seleccione una empresa de envios
                                    </h3>
                                    <div className="flex space-x-8">
                                        {
                                            deliveryMethods?.map((deliveryMethod, i) => {
                                                return (
                                                    <div key={i} className="flex items-center space-x-2">
                                                        <input
                                                            type="checkbox"
                                                            id={`delivery-method-${deliveryMethod?.id}`}
                                                            value={deliveryMethod?.id}
                                                            name="deliveryMethodId"
                                                            checked={values.deliveryMethodId === deliveryMethod?.id}
                                                            onChange={() => { setSelectedDeliveryMethod(deliveryMethod) }} />
                                                        <label className="text-center cursor-pointer hover:text-main" htmlFor={`delivery-method-${deliveryMethod?.id}`}>
                                                            {
                                                                deliveryMethod?.imgPath ?
                                                                    <img className="w-16 h-16 rounded" src={`${process.env.REACT_APP_API_URL}/${deliveryMethod?.imgPath}`} alt={deliveryMethod.name} />
                                                                    :
                                                                    null
                                                            }
                                                            <p>{deliveryMethod.name}</p>
                                                        </label>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                :
                                <div className="text-center text-red-500">
                                    Esta tienda no tiene metodos de envios disponibles para la dirección seleccionada.
                                    <p>
                                        Por favor seleccione otra dirección o seleccione la opcion de <b>Retirar en tienda</b>.
                                        Ya que quizas la tienda no posee metodos de envio.
                                    </p>
                                </div>
                    }
                </div>
            }
            {
                deliveryMethod && selectedAddress && storeId && selectedDeliveryMethod && values.deliveryMethodId ?
                    <div className="animate__animated animate__fadeInLeft mt-6">
                        <div className="flex items-center space-x-8">
                            <div>
                                <b>con:</b>
                            </div>
                            <div className="text-center">
                                <p>Imagen:</p>
                                {
                                    selectedDeliveryMethod.imgPath ?
                                        <img className="h-12 w-16 rounded" src={`${process.env.REACT_APP_API_URL}/${selectedDeliveryMethod?.imgPath}`} alt={selectedDeliveryMethod?.name} />
                                        :
                                        <p>No poseee</p>
                                }
                            </div>
                            <div>
                                <p>Empresa</p>
                                <b>
                                    {selectedDeliveryMethod?.name}
                                </b>
                            </div>
                            <div>
                                <Button onClick={() => { setSelectedDeliveryMethod(null) }} className="bg-main transition duration-500 hover:bg-white hover:text-main">
                                    Escoger otra empresa de envios.
                                </Button>
                            </div>
                        </div>
                    </div>
                    :
                    null

            }

            {
                !isShowProducts && !deliveryMethod ?
                    <div className="animate__animated animate__fadeInUp text-center my-6 text-xl text-gray-500 font-bold">
                        ¡Perfecto los productos le estaran esperando en la tienda!
                    </div>
                    :
                    null
            }
            {
                isShowProducts &&
                < div className="animate__animated animate__fadeInUp text-center my-6 text-xl text-gray-500 font-bold">
                    Pague y luego retire las entradas con la orden de BeneficioSI en digital o en Fisico.
                </div>
            }
        </div >
    )
}

export default SelectDeliverySection;