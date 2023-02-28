import clsx from "clsx";
import { useEffect, useState } from "react";

//ICONS
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoStorefrontSharp } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { IoCheckmarkCircleSharp } from "react-icons/io5";

//
import { useHistory } from 'react-router-dom';
import SystemInfo from "../util/SystemInfo";

const SelectUserToLogin = (props) => {

  const { show, setShow } = props;
  const [userType, setUserType] = useState(null);
  const history = useHistory();

  const handleContinue = () => {
    console.log(userType);
    if (userType === 'client') {
      history.push('/login');
    } else {
      window.location = 'http://stores.tubeneficiosi.com/';
    }
    closeModal();
  }

  const handleClick = (e) => {
    setUserType(e)
  }

  const closeModal = () => {
    setShow(false);
  }

  return (
    <div
      className={clsx('h-full w-full bg-black bg-opacity-50 fixed top-0 left-0 z-[9999999999999999999] flex animate__animated animate__fadeIn', {
        'hidden': !show
      })}>
      <div
        className={clsx('m-auto w-1/2 bg-white rounded relative p-4 animate__animated animate__fadeInUp', {
          'hidden': !show
        })}>
        <IoIosCloseCircleOutline onClick={closeModal} className="absolute -top-4 -right-4 text-4xl cursor-pointer text-main" />
        <div className="flex items-center">
          <img src={SystemInfo.logo} className="w-1/12" alt="" />
          <p className="text-gray-800 text-lg ml-4 font-bold">{SystemInfo.name}</p>
        </div>

        <h1 className="text-center text-gray-700 text-bold text-2xl my-5">Por favor selecciona el tipo de usuario:</h1>

        <div className="flex mt-12 justify-between items-center text-gray-600">
          <div className="w-1/2 border-r border-gray-500">
            <div className="p-4">
              <div onClick={() => { handleClick('client') }} className="hover:shadow-2xl py-4 hover:text-main cursor-pointer transition duration-500 relative">
                {
                  userType === 'client' ?
                    <IoCheckmarkCircleSharp className="absolute top-0 right-0 text-green-500 text-[40px]"></IoCheckmarkCircleSharp>
                    :
                    null
                }
                <IoPersonOutline className="m-auto text-[120px]"></IoPersonOutline>
                <h1 className="text-center text-3xl">
                  Cliente
                </h1>
              </div>
            </div>
          </div>
          <div className="w-1/2">
            <div className="p-4">
              <div onClick={() => { handleClick('store') }} className="hover:shadow-2xl py-4 hover:text-main cursor-pointer transition duration-500 hover:shadow-2xl relative">
                {
                  userType === 'store' ?
                    <IoCheckmarkCircleSharp className="absolute top-0 right-0 text-green-500 text-[40px]"></IoCheckmarkCircleSharp>
                    :
                    null
                }
                <IoStorefrontSharp className="m-auto text-[120px]"></IoStorefrontSharp>
                <h1 className="text-center text-3xl">
                  Tienda
                </h1>
              </div>
            </div>
          </div>
        </div>
        <p className="p-4 text-center text-xs mt-4">
          Por favor indique el tipo de usuario con el que desea iniciar sesion o registrarse en nuestra plataforma.
        </p>

        <div className="text-center mt-8">

          <button onClick={handleContinue} disabled={!userType} className={clsx('px-24 py-4 rounded-full transition duration-500', {
            'bg-gray-100 text-gray-500': !userType,
            'bg-main text-white': userType,
          })}>
            <p className="font-bold text-xl">Continuar</p>
          </button>
        </div>
      </div>
    </div >
  )

}

export default SelectUserToLogin;