import clsx from "clsx";
import { useEffect, useState } from "react";
import {
  IoDocumentTextOutline,
  IoLogOutOutline,
  IoCartOutline,
  IoLocationSharp,
  IoHeart,
  IoHomeSharp,
  IoChatboxEllipsesOutline,
  IoCard,
  IoPersonCircleSharp
} from "react-icons/io5";
import { Link } from "react-router-dom";
import LogOutModal from './logOutModal.js';


const MyAccountLayout = ({ children }) => {

  const [currentPath, setCurrentPath] = useState("");

  const [show, setShow] = useState(false);

  useEffect(() => {
    setCurrentPath(window?.location?.pathname);
  }, [window?.location?.pathname, setCurrentPath]);


  return (
    <div>

      <div className="flex">
        <div className="w-2/12 md:w-[5vw] bg-white h-screen text-gray-500 text-[2vw]" style={{ height: '100%' }}>
          <div>
            <Link title="Dashboard" to={'/my-account/dashboard'}>
              <IoHomeSharp className={clsx(["mx-auto my-6 cursor-pointer hover:text-main transition duration-500 text-3xl md:text-2xl"], {
                'text-main': currentPath === '/my-account/dashboard'
              })} ></IoHomeSharp>
            </Link>
          </div>
          <div>
            <Link title="Mi perfil" to={'/my-account/info'}>
              <IoPersonCircleSharp className={clsx(["mx-auto my-6 cursor-pointer hover:text-main transition duration-500 text-3xl md:text-2xl"], {
                'text-main': currentPath === '/my-account/info'
              })}></IoPersonCircleSharp>
            </Link>
          </div>
          <div>
            <Link title="Direcciones" to={'/my-account/address'}>
              <IoLocationSharp className={clsx(["mx-auto my-6 cursor-pointer hover:text-main transition duration-500 text-3xl md:text-2xl"], {
                'text-main': currentPath === '/my-account/address'
              })}></IoLocationSharp>
            </Link>
          </div>
          <div>
            <Link title="Ordenes" to={'/my-account/orders'}>
              <IoDocumentTextOutline className={clsx(["mx-auto my-6 cursor-pointer hover:text-main transition duration-500 text-3xl md:text-2xl"], {
                'text-main': currentPath === '/my-account/orders'
              })}></IoDocumentTextOutline>
            </Link>
          </div>
          <div>
            <Link title="Mis tarjetas" to={'/my-account/cards'}>
              <IoCard className={clsx(["mx-auto my-6 cursor-pointer hover:text-main transition duration-500 text-3xl md:text-2xl"], {
                'text-main': currentPath === '/my-account/cards'
              })}></IoCard>
            </Link>
          </div>
          <div>
            <Link title="Mis favoritos" to={'/my-account/favorites'}>
              <IoHeart className={clsx(["mx-auto my-6 cursor-pointer hover:text-main transition duration-500 text-3xl md:text-2xl"], {
                'text-main': currentPath === '/my-account/favorites'
              })}></IoHeart>
            </Link>
          </div>
          <div>
            <Link title="Conversaciones" to={'/my-account/conversations'}>
              <IoChatboxEllipsesOutline className={clsx(["mx-auto my-6 cursor-pointer hover:text-main transition duration-500 text-3xl md:text-2xl"], {
                'text-main': currentPath === '/my-account/conversations'
              })}></IoChatboxEllipsesOutline>
            </Link>
          </div>
          <div>
            <Link title="Carritos" to={'/my-account/carts'}>
              <IoCartOutline className={clsx(["mx-auto my-6 cursor-pointer hover:text-main transition duration-500 text-3xl md:text-2xl"], {
                'text-main': currentPath === '/my-account/carts'
              })}></IoCartOutline>
            </Link>
          </div>
          <div className="text-center">
            <button title="Cerrar sesión" onClick={() => { setShow(true) }} className="my-6 cursor-pointer hover:text-main transition duration-500 text-3xl md:text-2xl">
              <IoLogOutOutline ></IoLogOutOutline>
            </button>
          </div>
        </div>
        <div className="w-full min-w-0">
          {children}
        </div>
      </div>
      <LogOutModal show={show} setShow={setShow}></LogOutModal>
    </div>
  )
};

export default MyAccountLayout;