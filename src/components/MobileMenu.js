import reactDom from "react-dom";
import { IoCart, IoClose, IoHelp, IoHome, IoLogIn, IoLogOut, IoPerson, IoPersonAddSharp } from "react-icons/io5";
import { a } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import SystemInfo from "../util/SystemInfo";

const MobileMenu = ({ show, onClose }) => {

    const { user, setAuthInfo } = useAuth();

    const handleClick = () => {
        setAuthInfo({ isAuthenticated: false, user: null, token: null });
        onClose?.();
    }

    if (!show) {
        return null;
    }

    return reactDom.createPortal(
        <div className="bg-black bg-opacity-50 fixed left-0 top-0 h-screen w-screen z-50 p-4">
            <div className="h-full w-full rounded bg-white p-2">
                <div className="flex items-center">
                    <div className="flex items-center space-x-2">
                        <img className="w-12" src={SystemInfo.logo} alt={SystemInfo.name} />
                        <span className="font-bold text-gray-500">{SystemInfo.name}</span>
                    </div>
                    <IoClose onClick={onClose} className="ml-auto text-3xl" />
                </div>
                <ul className="p-4 space-y-4 text-gray-500">
                    <li className="border-b hover:border-main">
                        <a href={'/'} className="flex items-center space-x-2 text-xl">
                            <IoHome />
                            <span>Inicio</span>
                        </a>
                    </li>
                    {
                        user ?
                            <li className="border-b">
                                <a href={"/my-account"} className="flex items-center space-x-2 text-xl">
                                    <IoPerson />
                                    <span>Mi cuenta</span>
                                </a>
                            </li>
                            :
                            <>
                                <li className="border-b">
                                    <a href="/login" className="flex items-center space-x-2 text-xl">
                                        <IoLogIn />
                                        <span>Iniciar sesión</span>
                                    </a>
                                </li>
                                <li className="border-b">
                                    <a href="/register" className="flex items-center space-x-2 text-xl">
                                        <IoPersonAddSharp />
                                        <span>Registarse</span>
                                    </a>
                                </li>
                            </>

                    }
                    <li className="border-b">
                        <a href={'/products'} className="flex items-center space-x-2 text-xl">
                            <IoCart />
                            <span>Comprar</span>
                        </a>
                    </li>
                    <li className="border-b">
                        <a href={'/helps'} className="flex items-center space-x-2 text-xl">
                            <IoHelp />
                            <span>Ayuda</span>
                        </a>
                    </li>
                    {
                        user &&
                        <li onClick={handleClick} className="border-b flex items-center space-x-2 text-xl">
                            <IoLogOut />
                            <span>Cerrar sesión</span>
                        </li>
                    }
                </ul>
            </div>
        </div>
        ,
        document.getElementById("portal")
    )
}

export default MobileMenu;