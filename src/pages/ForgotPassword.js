import useAxios from "../hooks/useAxios";
import { useEffect, useState } from "react";
import SystemInfo from "../util/SystemInfo";
import { useAuth } from "../contexts/AuthContext";

const ForgotPassword = () => {

    const { setLoading, setCustomAlert } = useAuth();

    const [email, setEmail] = useState("");

    const [{ data, loading, error }, renewPassword] = useAxios({ url: `/auth/forgot-client-password`, method: 'POST' }, { manual: true, useCache: false });

    useEffect(() => {
        if (data !== undefined) {
            setCustomAlert?.({ show: true, message: `Se ha enviado la solicitud exitosamente.`, severity: "success" });
        }
    }, [data]);

    useEffect(() => {
        setLoading?.({ show: loading, message: 'Enviando solicitud' });
    }, [loading]);

    useEffect(() => {
        if (error) {
            setLoading?.({ show: false, message: "" });
            setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${error?.response?.status === 400 ? error?.response?.data.message[0] : error?.response?.data.message}.`, severity: "error" });
        }
    }, [error]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email) {
            alert("El email debe de ser obligatorio");
            return;
        }
        renewPassword({ data: { email } });
    }


    return (
        <div className="p-8">
            <form onSubmit={handleSubmit}>
                <div className="text-center space-y-8 text-gray-500">
                    <img src={SystemInfo.logo} className="h-16 w-16 m-auto" alt="" />

                    <h1 className="text-xl font-bold">
                        Por favor ingrese su correo electronico.
                    </h1>

                    <input
                        placeholder="Email..."
                        type="text"
                        name="email"
                        className="rounded p-2 w-1/3 focus:ring-main focus:border-main"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                    />

                    <p>
                        Se le enviara un correo electronico con un enlace el cual le permitira cambiar su contraseña.
                    </p>

                    <button type="submit" className="px-8 py-2 bg-main text-white rounded">
                        Aceptar
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ForgotPassword;