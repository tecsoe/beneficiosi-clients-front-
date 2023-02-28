import { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import reactDom from "react-dom";
import { Link } from "react-router-dom";
import DiscountCardRow from "./DiscountCardRow";
import DiscountCardIssuerRow from "./DiscountCardIssuerRow";
import Button from "../Button";

const DiscountModal = ({ discount, onClose, hiddenStoreButton, description }) => {

    const modalRef = useRef();

    const handleCloseModal = (e) => {
        if (modalRef.current === e.target) {
            onClose();
        }
    }

    if (!discount) {
        return null;
    }

    return reactDom.createPortal(
        <div ref={modalRef} onClick={handleCloseModal} className="fixed md:px-0 px-8 flex z-50 h-screen w-screen bg-black bg-opacity-50 left-0 top-0 animate__animated animate__fade">
            <div className="w-full md:w-7/12 overflow-hidden bg-white animate__animated animate__fadeInUp m-auto rounded-xl">
                <div style={{ height: "8%" }} className="p-4 bg-main flex justify-end items-center text-white">
                    <button className="text-2xl" onClick={() => { onClose() }}>
                        <IoClose />
                    </button>
                </div>
                <div className="text-center mt-4 text-2xl text-gray-500 font-bold">
                    {
                        discount?.discountType?.code === "dit-001" &&
                        "Bancos"
                    }

                    {
                        discount?.discountType?.code === "dit-002" &&
                        "Tarjetas"
                    }
                </div>

                {
                    discount?.cards?.length > 0 &&
                    <div style={{ maxHeight: 450, overflowY: "auto" }} className="mt-4 p-8 custom-scrollbar">
                        {
                            discount?.cards?.map((card, i) => {
                                return (
                                    <DiscountCardRow key={i} card={card} />
                                )
                            })
                        }
                    </div>
                }
                {
                    discount?.cardIssuers?.length > 0 &&
                    <div style={{ maxHeight: 450, overflowY: "auto" }} className="mt-4 p-8 custom-scrollbar">
                        {
                            discount?.cardIssuers?.map((cardIssuer, i) => {
                                return (
                                    <DiscountCardIssuerRow key={i} cardIssuer={cardIssuer} />
                                )
                            })
                        }
                    </div>
                }
                <div className="text-center my-8">
                    <p className="text-gray-500 mb-4">
                        {
                            description ?
                                description
                                :
                                "Pasa por la tienda, realiza una compra y selecciona el descuento que quieras al momento de pagar."
                        }
                    </p>
                    {
                        !hiddenStoreButton &&
                        <Link to={`/stores/${discount?.store?.slug}`}>
                            <Button className="bg-main">
                                Visitar la tienda
                            </Button>
                        </Link>
                    }
                </div>
            </div>
        </div>
        ,
        document.getElementById("portal")
    );
}

export default DiscountModal;