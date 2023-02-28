import useAxios from "../hooks/useAxios";
import { useParams } from "react-router";
import useHelps from "../hooks/useHelps";
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

const HelpsDetails = () => {

    const params = useParams();

    const { setLoading, setCustomAlert } = useAuth()

    const [{ data: help, errorHelp, loadingHelp }] = useAxios({ url: `helps/${params?.id}` }, { useCache: false });

    useEffect(() => {
        if (help) {
            console.log(help)
        }
    }, [help])

    useEffect(() => {
        if (errorHelp) {
            setLoading?.({ show: false, message: "" });
            setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${errorHelp?.response?.status === 400 ? errorHelp?.response?.data.message[0] : errorHelp?.response?.data.message}.`, severity: "error" });
        }
    }, [errorHelp])

    useEffect(() => {
        setLoading({ show: loadingHelp, message: "Cargando" })
    }, [loadingHelp]);

    return (
        <div className="p-8 space-y-8" style={{ minHeight: "40vh" }}>
            <h1 className="text-center text-2xl uppercase text-gray-500 font-bold">
                {
                    help?.title
                }
            </h1>


            <div className="bg-gray-100 p-8 shadow-xl rounded-xl" dangerouslySetInnerHTML={{ __html: help?.description }} />
        </div>
    )
}

export default HelpsDetails;