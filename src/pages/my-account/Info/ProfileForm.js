import { useEffect, useState } from "react";
import { IoPersonCircle } from "react-icons/io5";
import { useAuth } from "../../../contexts/AuthContext";
import { isRequired, validate } from "../../../helpers/formsValidations";
import { generateBackendUrl } from "../../../helpers/url";
import useAxios from "../../../hooks/useAxios";

const ProfileForm = () => {
  const { setLoading, setCustomAlert } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    img: null,
  });

  const [previewImage, setPreviewImage] = useState(null);

  const [formErros, setFormErros] = useState({
    name: null,
    phoneNumber: null,
    img: null,
  });

  const [{ data: clientData, loading: clientLoading }] = useAxios('/profile', { useCache: false });

  const [{ error: updateProfileError }, updateProfile] = useAxios({ url: '/profile', method: 'PUT' }, { manual: true });

  useEffect(() => {
    setLoading({ show: clientLoading, message: "Obteniendo datos" });
  }, [clientLoading, setLoading]);



  useEffect(() => {
    if (clientData) {
      console.log(clientData);
      setFormData(currentFormData => ({
        ...currentFormData,
        name: clientData.name,
        phoneNumber: clientData.phoneNumber,
      }));

      if (clientData?.imgPath) {
        setPreviewImage(generateBackendUrl(clientData.imgPath));
      }
    }
  }, [clientData]);

  useEffect(() => {
    setFormErros({
      name: validate(formData.name, [
        { validator: isRequired, errorMessage: "El nombre es obligatorio" },
      ]),
      phoneNumber: validate(formData.phoneNumber, [
        { validator: isRequired, errorMessage: "El teléfono es obligatorio" },
      ]),
    });
  }, [formData]);

  useEffect(() => {
    if (updateProfileError) {
      setCustomAlert({
        show: true,
        message: `${updateProfileError.response?.status === 400 ? updateProfileError.response?.data.message[0] : updateProfileError.response?.data.message}.`,
        severity: "error"
      });
    }
  }, [updateProfileError, setCustomAlert]);

  const handleChange = (e) => {
    setFormData(currentFormData => ({
      ...currentFormData,
      [e.target.name]: e.target.type === "file" ? e.target.files[0] : e.target.value,
    }));

    if (e.target.name === 'img') {
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
    }
  }

  const handleDataSubmit = async (e) => {
    e.preventDefault();

    for (let errorName in formErros) {
      if (formErros[errorName] !== null) {
        setCustomAlert({ show: true, message: formErros[errorName], severity: "error" });
        return;
      }
    }

    const localFormData = new FormData();

    Object.keys(formData).forEach(key => localFormData.append(key, formData[key]));

    setLoading({ show: true, message: "Guardando perfil" });

    try {
      await updateProfile({ data: localFormData });
      setCustomAlert({ show: true, message: "Perfil actualizado", severity: "success" });
    } finally {
      setLoading({ show: false, message: "" });
    }
  }

  return <form
    className="bg-white p-2 rounded md:p-5 mb-12"
    onSubmit={handleDataSubmit}
  >
    <div className="md:flex md:items-center md:justify-between">
      <div className="md:flex md:items-center md:w-1/2">
        {
          previewImage
            ? <img src={previewImage} className="m-auto md:m-0 w-[80px] shadow-2xl rounded-full h-[80px] md:mr-3" alt="logo" />
            : <IoPersonCircle className="text-[100px] text-gray-500"></IoPersonCircle>
        }
        <br className="md:hidden" />
        <div className="text-right">
          <label
            htmlFor="img"
            className=" bg-main text-white h-[fit-content] px-4 py-2 rounded hover:bg-gray-200 hover:text-main transition duration-500 font-bold cursor-pointer"
          >
            <span>Añadir Imagen</span>
          </label>
          <input
            className="hidden"
            type="file"
            id="img"
            name="img"
            onChange={handleChange}
            accept="image/png, image/gif, image/jpeg"
          />
        </div>
      </div>
      <div className="md:w-1/2">
        <h2 className="text-gray-600 font-bold text-xl">
          Nombre:
        </h2>
        <input
          placeholder="Nombre"
          className="rounded w-full mt-1 focus:border-main focus:ring-main"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {formErros.name && <span className="block text-red-500 text-xs mt-1">{formErros.name}</span>}
      </div>
    </div>
    <div className="md:flex justify-between my-12">
      <div className="md:w-1/2">
        <h2 className="text-gray-600 font-bold text-xl">
          Telefono:
        </h2>
        <input
          className="rounded w-full mt-1 focus:border-main focus:ring-main"
          type="text"
          placeholder="Telefono"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        {formErros.phoneNumber && <span className="block text-red-500 text-xs mt-1">{formErros.phoneNumber}</span>}
      </div>
    </div>

    <div className="text-right">
      <button className="bg-main text-white h-[fit-content] px-4 py-2 rounded hover:bg-gray-200 hover:text-main transition duration-500 font-bold">
        <span>Guardar</span>
      </button>
    </div>
  </form>;
};

export default ProfileForm;