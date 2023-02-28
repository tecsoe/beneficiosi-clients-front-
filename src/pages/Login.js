//Imagenes
import DeliveryMotion from '../assets/images/delivery-motion.gif';
import { Link, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import useAxios from "../hooks/useAxios";
import { isEmail, isRequired, validate } from '../helpers/formsValidations';
import SystemInfo from '../util/SystemInfo';

const Login = () => {

  const history = useHistory();

  const [loginInfo, setLoginInfo] = useState({ password: "", email: "" });

  const [errorsForm, setErrorsForm] = useState({
    email: null,
    password: null,
  });

  const [{ data, loading, error }, login] = useAxios({ url: "/auth/login", method: "POST" }, { manual: true, useCache: false });

  const { setAuthInfo, setLoading, setCustomAlert } = useAuth();

  useEffect(() => {
    setLoading({ show: loading, message: "Iniciando Sesión" });
  }, [loading, setLoading]);


  useEffect(() => {
    if (error) {
      setCustomAlert({ show: true, message: `${error.response?.status === 400 ? error.response?.data.message[0] : error.response?.data.message}.`, severity: "error" });
    }
  }, [error, setCustomAlert]);

  useEffect(() => {
    if (data) {
      setAuthInfo({ isAuthenticated: true, user: data.user, token: data.accessToken });
      history.push('/my-account');
    }
  }, [data, setAuthInfo, history]);

  useEffect(() => {
    setErrorsForm({
      email: validate(loginInfo.email, [
        { validator: isRequired, errorMessage: "El email es obligatorio." },
        { validator: isEmail, errorMessage: "el email debe ser valido." }
      ]),
      password: validate(loginInfo.password, [
        { validator: isRequired, errorMessage: "la contraseña es Obligatoria." },
      ])
    })
  }, [loginInfo, setErrorsForm])

  const handleSubmit = (e) => {
    e.preventDefault();

    login({ data: loginInfo });
  }

  const handleChange = (e) => {
    setLoginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value
    });
  }

  return (
    <div>
      <div className="md:flex md:justify-between">
        <div className="md:w-1/2 bg-gray-50 text-center py-8">
          <img className="m-auto w-1/3 text-gray-700" src={SystemInfo.logo} alt="" />
          <h1 className="my-8 font-bold text-[70px]">
            {SystemInfo.name}
          </h1>
          <p className="text-lg text-gray-500">{SystemInfo.description}</p>
          <img src={DeliveryMotion} alt="" />
        </div>
        <div className="md:w-1/2 bg-white p-6 relative">
          <div className="flex justify-right items-center">
            <img className="ml-auto w-1/12 text-gray-700" src={SystemInfo.logo} alt="" />
            <h1 className="ml-2 font-bold text-[40px]">
              {SystemInfo.name}
            </h1>
          </div>
          <div className="border-b border-main mt-24">
            <h2 className="text-center text-2xl">
              Inicio de sesión
            </h2>
          </div>

          <form className="text-2xl mt-5" onSubmit={handleSubmit}>
            <div className="my-12">
              <h2 className="text-gray-600 font-bold">
                Email
              </h2>
              <input name="email" autoComplete="email" onChange={handleChange} className="rounded w-full mt-1" type="text" placeholder="Correo Electronico" />
              {
                errorsForm.email ?
                  <p className="text-sm mt-2 text-red-500">{errorsForm.email}</p>
                  :
                  null
              }
            </div>

            <div className="my-12">
              <h2 className="text-gray-600 font-bold">
                Contraseña
              </h2>
              <input
                name="password"
                autoComplete="current-password"
                onChange={handleChange}
                className="rounded w-full mt-1"
                type="password"
                placeholder="Contraseña" />

              {
                errorsForm.password ?
                  <p className="text-sm mt-2 text-red-500">{errorsForm.password}</p>
                  :
                  null
              }
            </div>

            <div className="text-center">
              <button type="submit" className="bg-main px-4 py-2 rounded text-white">
                Iniciar sesion
              </button>
            </div>

            <Link to={`/forgot-password`}>
              <p className="text-center mt-4 text-lg text-main hover:text-gray-800 transition duration-500">
                ¿He olvidado mi contraseña?
              </p>
            </Link>


            <p className="text-center mt-4 text-lg">
              ¿No tienes una cuenta? <Link to="/register" className="text-main hover:text-gray-800 transition duration-500"> Registrate </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )

}


export default Login;