import PasswordForm from "./Info/PasswordForm";
import ProfileForm from "./Info/ProfileForm";

const MyAccountInfo = () => {

  return (
    <div className="px-4 md:px-12">
      <h1 className="text-2xl text-gray-600 font-bold my-5">
        Mis Datos
      </h1>

      <ProfileForm />

      <h1 className="text-2xl text-gray-600 font-bold my-5">
        Cambiar Contraseña
      </h1>

      <PasswordForm />
    </div>
  )
}

export default MyAccountInfo;