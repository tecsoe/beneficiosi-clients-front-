import { useState } from "react";
import { IoLogOut, IoPersonCircleSharp, IoCartSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import NotificationsComponent from "./notifications/NotificationsComponent";
import SelectUserToLogin from "./SelectUserToLogin";

const NavLinks = () => {

    const { user, setAuthInfo } = useAuth();

    const [show, setShow] = useState(false);

    const handleClick = () => {
        setAuthInfo({ isAuthenticated: false, user: null, token: null });
    }

    return (
        <div className="hidden md:flex items-center">
            <nav className="space-x-5 mr-5">
                <Link className="hover:text-main" to="/products">Comprar</Link>
                <a className="hover:text-main" href="/helps">Ayuda</a>
            </nav>
            {
                user ?
                    <div className="flex space-x-6 items-center">
                        <div className="flex items-center space-x-4 relative">
                            <Link className="flex items-center uppercase space-x-1 hover:text-main" to={"/my-account"}>
                                <p>{user.name}</p>
                                <IoPersonCircleSharp className="text-xl" />
                            </Link>
                            <Link title="Mis Carritos" className="hover:text-main" to={"/my-account/carts"}>
                                <IoCartSharp className="text-xl" />
                            </Link>
                            <NotificationsComponent />
                        </div>

                        <button onClick={handleClick} className="flex hover:text-main transition duration-500 focus:outline-none">
                            Cerrar Sesión
                            <IoLogOut className="text-xl ml-2" />
                        </button>

                    </div>

                    :
                    <button onClick={() => { setShow(true) }} className="inline-flex items-center justify-center px-3 py-2 space-x-2 leading-4 border border-white rounded">
                        <IoPersonCircleSharp className="text-xl" />
                        <span>Ingresar</span>
                    </button>
            }
            <SelectUserToLogin show={show} setShow={setShow}></SelectUserToLogin>
        </div>
    )
}

export default NavLinks;