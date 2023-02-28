import { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { isRequired, minLength, validate } from "../../../helpers/formsValidations";
import useAxios from "../../../hooks/useAxios";

const INITIAL_FORM_STATE = {
  currentPassword: '',
  password: '',
  passwordConfirmation: '',
};

const PasswordForm = () => {
  const { setLoading, setCustomAlert } = useAuth();

  const [formData, setFormData] = useState(INITIAL_FORM_STATE);

  const [formErros, setFormErros] = useState({
    currentPassword: null,
    password: null,
    passwordConfirmation: null,
  });

  const [{ error: updatePasswordError }, updatePassword] = useAxios({ url: '/profile/password', method: 'PUT' }, { manual: true });

  useEffect(() => {
    if (updatePasswordError) {
      setCustomAlert({
        show: true,
        message: `${updatePasswordError.response?.status === 400 ? updatePasswordError.response?.data.message : updatePasswordError.response?.data.message}.`,
        severity: "error"
      });
    }
  }, [updatePasswordError, setCustomAlert]);

  useEffect(() => {
    setFormErros({
      currentPassword: validate(formData.currentPassword, [
        { validator: isRequired, errorMessage: "La contraseña actual es obligatoria" },
      ]),
      password: validate(formData.password, [
        { validator: isRequired, errorMessage: "La contraseña nueva es obligatoria" },
        { validator: minLength(8), errorMessage: "La contraseña nueva debe tener al menos 8 caracteres" },
      ]),
      passwordConfirmation: validate(formData.passwordConfirmation, [
        { validator: isRequired, errorMessage: "Debe confirmar la contraseña" },
        { validator: (value) => value === formData.password, errorMessage: "Las contaseñas no coinciden" },
      ]),
    });
  }, [formData]);

  const handleChange = (e) => {
    setFormData(currentFormData => ({
      ...currentFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (let errorName in formErros) {
      if (formErros[errorName] !== null) {
        setCustomAlert({ show: true, message: formErros[errorName], severity: "error" });
        return;
      }
    }

    setLoading({ show: true, message: 'Guardando datos' });

    try {
      await updatePassword({ data: formData });
      setCustomAlert({ show: true, message: 'Contraseña actualizada', severity: "success" });
      setFormData(INITIAL_FORM_STATE);
    } finally {
      setLoading({ show: false, message: '' });
    }
  }

  return <form onSubmit={handleSubmit} className="bg-white rounded p-5 mb-3">
    <div className="md:flex space-y-4 md:space-y-0">
      <div className="md:w-4/12 px-2">
        <h2 className="text-gray-600 font-bold text-xl">
          Constraseña actual:
        </h2>
        <input
          className="rounded w-full mt-1 focus:border-main focus:ring-main"
          type="password"
          placeholder="Contraseña actual"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
        />
        {formErros.currentPassword && <span className="block text-red-500 text-xs mt-1">{formErros.currentPassword}</span>}
      </div>
      <div className="md:w-4/12 px-2">
        <h2 className="text-gray-600 font-bold text-xl">
          Constraseña nueva:
        </h2>
        <input
          className="rounded w-full mt-1 focus:border-main focus:ring-main"
          type="password"
          placeholder="Contraseña nueva"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {formErros.password && <span className="block text-red-500 text-xs mt-1">{formErros.password}</span>}
      </div>
      <div className="md:w-4/12 px-2">
        <h2 className="text-gray-600 font-bold text-xl">
          Confirmar Contraseña:
        </h2>
        <input
          className="rounded w-full mt-1 focus:border-main focus:ring-main"
          type="password"
          placeholder="Confirmar Contraseña"
          name="passwordConfirmation"
          value={formData.passwordConfirmation}
          onChange={handleChange}
        />
        {formErros.passwordConfirmation && <span className="block text-red-500 text-xs mt-1">{formErros.passwordConfirmation}</span>}
      </div>

    </div>

    <div className="text-right my-5">
      <button className="bg-main text-white h-[fit-content] px-4 py-2 rounded hover:bg-gray-200 hover:text-main transition duration-500 font-bold">
        <span>Guardar</span>
      </button>
    </div>
  </form>;
};

export default PasswordForm;