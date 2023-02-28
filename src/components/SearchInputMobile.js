import { useRef } from "react";
import reactDom from "react-dom";


const SearchInputMobile = ({ show, onClose, children }) => {

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
                <div className="p-4" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                    {children}
                </div>
            </div>
        </div>
        ,
        document.getElementById("portal")
    );
}

export default SearchInputMobile;