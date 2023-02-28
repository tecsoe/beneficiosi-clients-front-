import { useEffect, useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { useHistory, useParams } from "react-router-dom";
import Map from "../../components/googlemaps/Map";
import { useAuth } from "../../contexts/AuthContext";
import { isRequired, validate } from "../../helpers/formsValidations";
import useAxios from "../../hooks/useAxios";

const EditAddress = () => {

    const params = useParams();

    const history = useHistory();

    const { setLoading, setCustomAlert } = useAuth();

    const [addressData, setAddressData] = useState({
        name: "",
        zipCode: "",
        address: "",
        latitude: -34.6036844,
        longitude: -58.3815591
    });

    const [errorsForm, setErrorsForm] = useState({
        name: null,
        zipCode: null,
        address: null,
        latitude: null,
        longitude: null
    });

    const [{ data: address, error: addressError, loading: addressLoading }] = useAxios({ url: `/profile/addresses/${params?.id}` }, { useCache: false });

    const [googleMapsMarkers, setGoogleMapsMarkers] = useState([{ lat: addressData.latitude, lng: addressData.longitude }]);

    const [googleMapsOptions, setGoogleMapsOptions] = useState({ center: { lat: addressData.latitude, lng: addressData.longitude }, zoom: 8 })

    const [{ data: updateData, error: updateError }, updateAddress] = useAxios({ url: `/profile/addresses/${params?.id}`, method: "PUT" }, { useCache: false, manual: true });

    useEffect(() => {
        if (address) {
            const { id, latitude, longitude, ...rest } = address;
            setAddressData((oldAddressData) => {
                return {
                    ...oldAddressData,
                    ...rest,
                    longitude: Number(longitude),
                    latitude: Number(latitude)
                }
            })
            console.log(address);
        }
    }, [address]);

    useEffect(() => {
        setLoading({ show: addressLoading, message: "Obteniendo Datos" })
    }, [addressLoading, setLoading])

    useEffect(() => {
        if (updateData) {
            setLoading?.({ show: false, message: "" });
            setCustomAlert?.({ show: true, message: `La dirección ha sido creada exitosamente.`, severity: "success" });
            history.push("/my-account/address");
        }
    }, [updateData, setLoading, setCustomAlert, history]);

    useEffect(() => {
        if (addressError) {
            setLoading?.({ show: false, message: "" });
            setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${addressError?.response?.status === 400 ? addressError?.response?.data.message[0] : addressError?.response?.data.message}.`, severity: "error" });
        }
        if (updateError) {
            setLoading?.({ show: false, message: "" });
            setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${updateError?.response?.status === 400 ? updateError?.response?.data.message[0] : updateError?.response?.data.message}.`, severity: "error" });
        }
    }, [updateError, addressError, setLoading, setCustomAlert]);

    useEffect(() => {
        setErrorsForm({
            name: validate(addressData.name, [
                { validator: isRequired, errorMessage: "El nombre es obligatorio." },
            ]),
            zipCode: validate(addressData.zipCode, [
                { validator: isRequired, errorMessage: "El codigo zip es obligatorio." },
            ]),
            address: validate(addressData.address, [
                { validator: isRequired, errorMessage: "La dirección es obligatoria." },
            ]),
            latitude: validate(addressData.latitude, [
                { validator: isRequired, errorMessage: "La latitud es obligatoria." },
            ]),
            longitude: validate(addressData.longitude, [
                { validator: isRequired, errorMessage: "La longitud es obligatoria." },
            ]),
        })
    }, [addressData]);

    const handleChange = (e) => {
        setAddressData((oldAddressData) => {
            return {
                ...oldAddressData,
                [e.target.name]: e.target.value
            }
        })
    }

    const hanleMapClick = (e) => {
        setGoogleMapsMarkers([e]);
        setGoogleMapsOptions({ ...googleMapsOptions, center: e });
        setAddressData((oldAddressData) => ({
            ...oldAddressData,
            latitude: e.lat,
            longitude: e.lng
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        for (let errors in errorsForm) {
            if (errorsForm[errors] != null) {
                alert(errorsForm[errors]);
                return;
            }
        }

        setLoading({ show: true, message: "Actualizando dirección" });
        await updateAddress({ data: addressData });
        setLoading({ show: false, message: "" });
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl flex items-center text-gray-600 font-bold my-5">
                <IoLocationSharp className="text-4xl" />
                <span className="ml-4">Añadir dirección</span>
            </h1>

            <div className="bg-white rounded px-8 py-2">
                <form className="mt-5" onSubmit={handleSubmit}>
                    <div className="flex items-center space-between space-x-12 mb-12">
                        <div className="w-full">
                            <h2 className="text-gray-600 font-bold text-xl mb-2">
                                Nombre
                            </h2>
                            <input
                                name="name"
                                onChange={handleChange}
                                value={addressData.name}
                                className="rounded mt-1 w-full"
                                type="text"
                                placeholder="Nombre" />
                            {
                                errorsForm.name &&
                                <div className="text-red-500">
                                    {errorsForm.name}
                                </div>
                            }
                        </div>

                        <div className="w-full">
                            <h2 className="text-gray-600 font-bold text-xl mb-2">
                                Codigo ZIP
                            </h2>
                            <input
                                name="zipCode"
                                onChange={handleChange}
                                value={addressData.zipCode}
                                className="rounded mt-1 w-full"
                                type="text"
                                placeholder="Codigo ZIP" />
                            {
                                errorsForm.zipCode &&
                                <div className="text-red-500">
                                    {errorsForm.zipCode}
                                </div>
                            }
                        </div>
                    </div>

                    <Map
                        searchBox={
                            {
                                label: "Direccion:",
                                onChange: handleChange,
                                value: addressData.address,
                                name: "address"
                            }
                        }
                        options={googleMapsOptions}
                        onClick={hanleMapClick}
                        markers={googleMapsMarkers} />
                    {
                        errorsForm.address &&
                        <div className="text-red-500">
                            {errorsForm.address}
                        </div>
                    }

                    <div className="text-right mt-4">
                        <button type="submit" className="bg-main px-4 py-2 rounded text-white">
                            Guardar Cambios
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditAddress;