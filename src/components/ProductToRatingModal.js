import { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import reactDom from "react-dom";
import { useAuth } from "../contexts/AuthContext";
import ProductRatingRow from "./ProductRatingRow";

const ProductToRatingModal = ({ products, ratedProducts, orderId, onClose }) => {



  const { user } = useAuth();

  const modalRef = useRef();

  const handleCloseModal = (e) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  }

  if (!products || !user || !orderId) {
    return null;
  }



  return reactDom.createPortal(
    <div ref={modalRef} onClick={handleCloseModal} className="fixed flex z-50 h-screen w-screen bg-black bg-opacity-50 left-0 top-0 animate__animated animate__fade">
      <div className="md:w-7/12 overflow-hidden bg-white animate__animated animate__fadeInUp m-auto rounded-xl">
        <div style={{ height: "8%" }} className="p-4 bg-main flex justify-end items-center text-white">
          <button className="text-2xl" onClick={() => { onClose() }}>
            <IoClose />
          </button>
        </div>
        <div className="p-8 space-y-4 overflow-y-auto custom-scrollbar" style={{ maxHeight: "60vh" }}>
          <div className="text-center text-gray-500">
            Por favor agregue el rating a cada producto :)
          </div>
          {
            products?.map((product, i) => {
              return (
                <ProductRatingRow
                  key={i}
                  orderId={orderId}
                  product={product}
                  isRated={ratedProducts?.includes(product?.productId)} />
              )
            })
          }
        </div>
      </div>
    </div>
    ,
    document.getElementById("portal")
  );
}

export default ProductToRatingModal;