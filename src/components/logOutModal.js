import clsx from "clsx";


//ICONS
import { IoIosCloseCircleOutline } from "react-icons/io";

//Imagenes
import BeneficioSiLogo from '../assets/images/logo.jpg';

import { useAuth } from "../contexts/AuthContext";

const LogOutModal = (props) => {

  const { setAuthInfo } = useAuth();

  const { show, setShow } = props;


  const handleContinue = () => {
    setAuthInfo({ isAuthenticated: false, user: null, token: null });
    closeModal();
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
        <IoIosCloseCircleOutline onClick={closeModal} className="absolute -top-4 -right-4 text-4xl cursor-pointer text-main"></IoIosCloseCircleOutline>
        <div className="flex items-center">
          <img src={BeneficioSiLogo} className="w-1/12" alt="" />
          <p className="text-gray-800 text-lg ml-4 font-bold">BeneficioSi</p>
        </div>

        <h1 className="text-center text-gray-700 text-bold text-2xl my-5">¿Deseas Cerrar la sesion?</h1>

        <div className="text-center mt-8">

          <button onClick={handleContinue} className={'bg-main text-white px-10 md:px-24 md:py-4 rounded-full transition duration-500'} >
            <p className="font-bold text-xl">Continuar</p>
          </button>
        </div>
      </div>
    </div >
  )

}

export default LogOutModal;