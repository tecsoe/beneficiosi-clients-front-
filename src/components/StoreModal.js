import { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import reactDom from "react-dom";


const StoreModal = ({ show, store, cartId, onClose }) => {

    const modalRef = useRef();

    const handleClose = (e) => {
        if (modalRef.current === e.target) {
            onClose();
        }
    }

    if (!show) {
        return null;
    }

    return reactDom.createPortal(
        <div ref={modalRef} onClick={handleClose} className="fixed flex z-50 h-screen w-screen bg-black bg-opacity-50 left-0 top-0 animate__animated animate__fade">
            <div className="w-10/12 overflow-hidden bg-white animate__animated animate__fadeInUp m-auto rounded-xl">
                <div style={{ height: "8%" }} className="p-4 bg-main items-center flex justify-end items-center text-white">
                    <button className="text-2xl" onClick={() => { onClose?.() }}>
                        <IoClose />
                    </button>
                </div>
                <div className="p-4 space-y-4" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                    <p className="text-center text-gray-500 font-bold">¡El producto se ha añadido exitosamente al carrito de la siguiente tienda!</p>
                    <div>
                        {
                            store?.storeProfile?.logo &&
                            <img className="m-auto" style={{ width: 100, height: 100 }} src={`${process.env.REACT_APP_API_URL}/${store?.storeProfile?.logo}`} />
                        }
                        <h2 className="text-center text-gray-500 font-bold text-xl">
                            {store?.name}
                        </h2>
                    </div>
                    <div className="space-y-4">
                        <p className="text-center text-gray-500 text-xl">¿Que deseas hacer?</p>
                        <div className="md:flex md:items-center justify-center md:space-x-6 w-full space-y-2">
                            <a href={`/stores/${store?.slug}`} className="w-full justify-center bg-main text-lg flex items-center space-x-4 rounded px-4 py-2 text-white transition duration-500 hover:shadow-xl hover:bg-white hover:text-main focus:ring-white">
                                Seguir comprando
                            </a>
                            <a href={`/my-account/carts`} className="w-full justify-center bg-main text-lg flex items-center space-x-4 rounded px-4 py-2 text-white transition duration-500 hover:shadow-xl hover:bg-white hover:text-main focus:ring-white">
                                Ver mis carritos
                            </a>
                            <a href={`/checkout?cartId=${cartId}`} className="w-full justify-center bg-main text-lg flex items-center space-x-4 rounded px-4 py-2 text-white transition duration-500 hover:shadow-xl hover:bg-white hover:text-main focus:ring-white">
                                Ir a pagar
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ,
        document.getElementById("portal")
    );
}

export default StoreModal;