import UserAddressCard from '../../components/UserAddressCard';
import { IoAdd } from "react-icons/io5";
import { IoLocationSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';
import useProfileAddress from '../../hooks/useProfileAddress';
import { useAuth } from '../../contexts/AuthContext';
import { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import CustomModal from '../../components/CustomModal';

const MyAccountAddress = () => {

  const [addressToDelete, setAddressToDelete] = useState(null);

  const [open, setOpen] = useState(false);

  const { setLoading, setCustomAlert } = useAuth();

  const [{ profileAddress, total, error, loading }, getProfileAddress] = useProfileAddress({ axiosConfig: { params: { perPage: 200 } }, options: { useCache: false } });

  const [{ error: deleteError }, deleteAddress] = useAxios({ url: `/profile/addresses/${addressToDelete?.id}`, method: "DELETE" }, { useCache: false, manual: true });

  useEffect(() => {
    console.log(profileAddress);
  }, [profileAddress])

  useEffect(() => {
    setLoading({ show: loading, message: "Obteniendo direcciones" })
  }, [loading])

  useEffect(() => {
    if (error) {
      setLoading?.({ show: false, message: "" });
      setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${error?.response?.status === 400 ? error?.response?.data.message[0] : error?.response?.data.message}.`, severity: "error" });
    }

    if (deleteError) {
      setLoading?.({ show: false, message: "" });
      setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${deleteError?.response?.status === 400 ? deleteError?.response?.data.message[0] : deleteError?.response?.data.message}.`, severity: "error" });
    }
  }, [error, deleteError]);

  const handleDelete = (address) => {
    setAddressToDelete(address);
    setOpen(true);
  }

  const handleConfirmDelete = async (e) => {
    setOpen(false);

    if (e) {
      setLoading({ show: true, message: "Eliminando dirección" });
      await deleteAddress().then(async () => {
        await getProfileAddress().then(() => {
          setCustomAlert?.({ show: true, message: `Se ha eliminado la dirección`, severity: "success" });
        })
      });
      setLoading({ show: false, message: "" });
    }
  }

  return (
    <div className="px-4 md:px-12">
      <h1 className="text-2xl flex items-center text-gray-600 font-bold my-5">
        <IoLocationSharp className="text-4xl"></IoLocationSharp>
        <span className="ml-4">Mis Direcciones {total ? `- ${total}` : null}</span>
      </h1>
      <div className="my-6 text-right">
        <Link to={'/my-account/address/new'} className="items-center font-bold inline-flex bg-main px-12 py-2 rounded text-white">
          <IoAdd className="font-bold text-xl"></IoAdd>
          Añadir Nueva
        </Link>
      </div>
      <div className="flex flex-wrap">
        {
          profileAddress.length > 0 ?
            profileAddress.map((address, i) =>
              <UserAddressCard
                id={address.id}
                key={i}
                className="m-4 min-h-64 hover:shadow-xl relative w-64 bg-white rounded text-gray-500 p-8"
                name={address.name}
                address={address.address}
                latLng={{ latitude: address.latitude, longitude: address.longitude }}
                zipCode={address.zipCode}
                onDelete={() => { handleDelete(address) }}
              />
            )
            :
            <div className="text-xl text-center text-gray-700 font-bold">
              No se encontraron direcciones, por favor añada una...
            </div>
        }
      </div>

      <CustomModal className="p-18" message={`Desea eliminar la dirección: ${addressToDelete?.name}`} open={open} onClose={handleConfirmDelete} />
    </div>
  )
}

export default MyAccountAddress;