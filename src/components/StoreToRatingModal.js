import { useEffect, useRef, useState } from "react";
import { IoClose, IoStarOutline } from "react-icons/io5";
import reactDom from "react-dom";
import { useAuth } from "../contexts/AuthContext";

import CustomSelect from "./CustomSelect";
import useAxios from '../hooks/useAxios';
const StoreToRatingModal = ({ store, orderId, onClose }) => {

  const { user, setLoading, setCustomAlert } = useAuth();

  const modalRef = useRef();

  const [rating, setRating] = useState(0);

  const [{ data: dataRating, error: errorRating, loading: loadingRating }, createRating] = useAxios({ method: "POST" }, { manual: true, useCache: false });

  const handleCloseModal = (e) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  }

  useEffect(() => {
    if (errorRating) {
      setLoading?.({ show: false, message: "" });
      setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${errorRating?.response?.status === 400 ? errorRating?.response?.data.message[0] : errorRating?.response?.data.message}.`, severity: "error" });
    }
  }, [errorRating])

  useEffect(() => {
    if (dataRating) {
      setCustomAlert?.({ show: true, message: `La calificación ha sido añadida exitosamente.`, severity: "success" })
      onClose();
    }
  }, [dataRating])

  const handleChange = async (e) => {
    setRating(e.target.value);
    await createRating({
      url: `/store-ratings/${store?.storeId}`,
      data: {
        orderId,
        value: Number(e.target.value)
      }
    });
  }

  if (!store || !user || !orderId) {
    return null;
  }



  return reactDom.createPortal(
    <div ref={modalRef} onClick={handleCloseModal} className="fixed flex z-50 h-screen w-screen bg-black bg-opacity-50 left-0 top-0 animate__animated animate__fade">
      <div className="w-7/12 overflow-hidden bg-white animate__animated animate__fadeInUp m-auto rounded-xl">
        <div style={{ height: "8%" }} className="p-4 bg-main flex justify-end items-center text-white">
          <button className="text-2xl" onClick={() => { onClose() }}>
            <IoClose />
          </button>
        </div>
        <div className="p-8 space-y-4 overflow-y-auto custom-scrollbar" style={{ maxHeight: "60vh" }}>
          <div className="text-center text-gray-500 mb-4">
            Por favor la califica a la tienda:
          </div>
          <img className="w-1/5 rounded-xl m-auto" src={`${process.env.REACT_APP_API_URL}/${store?.storeProfile?.logo}`} alt="" />

          <h1 className="text-gray-500 font-bold text-xl text-center">{store?.name}</h1>
          {
            loadingRating ?
              <div className="text-center text-gray-500 font-bold text-xl">
                Cargando...
              </div>
              :
              <div className="flex items-center justify-center">
                <CustomSelect className="w-20" onChange={handleChange} value={rating}>
                  {
                    Array.from(Array(6).keys()).map((n) => {
                      return (
                        <option key={n} value={n}>{n}</option>
                      )
                    })
                  }
                </CustomSelect>
                <IoStarOutline style={{ fontSize: 30 }} className="text-yellow-500" />
              </div>
          }
        </div>
      </div>
    </div>
    ,
    document.getElementById("portal")
  );
}

export default StoreToRatingModal;