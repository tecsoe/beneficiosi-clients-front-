import { useRef } from "react";
import { IoClose, IoCart } from "react-icons/io5";
import reactDom from "react-dom";


const ProductFeatureModal = ({ product, closeModal }) => {

    const modalRef = useRef();



    const handleCloseModal = (e) => {
        if (modalRef.current === e.target) {
            closeModal();
        }
    }

    if (!product) {
        return null;
    }

    return reactDom.createPortal(
        <div ref={modalRef} onClick={handleCloseModal} className="fixed flex z-50 h-screen w-screen bg-black bg-opacity-50 left-0 top-0 animate__animated animate__fade">
            <div className="overflow-hidden bg-white animate__animated animate__fadeInUp m-auto rounded-xl">
                <div style={{ height: "8%" }} className="p-4 bg-main flex justify-end items-center text-white">
                    <button className="text-2xl" onClick={() => { closeModal() }}>
                        <IoClose />
                    </button>
                </div>
                <div className="p-6 text-gray-500">
                    {
                        product?.cartItemFeatures?.length > 0 &&
                        product?.cartItemFeatures?.map((feature, i) => {
                            return (
                                <div>
                                    {feature?.name}
                                    {
                                        feature.value &&
                                        <span> - {feature.value}.</span>
                                    }
                                    <b>
                                        {
                                            feature.price > 0 ?
                                                ` - $${feature.price}`
                                                :
                                                feature.isSelectable ? " - Gratis." : " - Incluido en el producto."
                                        }
                                    </b>
                                </div>
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

export default ProductFeatureModal;