import { useEffect, useState } from "react";
import { IoStarOutline } from "react-icons/io5";
import { useAuth } from "../contexts/AuthContext";
import { generateImageUrl } from "../helpers/url";
import useAxios from "../hooks/useAxios";
import CustomSelect from "./CustomSelect";

const ProductRatingRow = ({ isRated, product, orderId }) => {

    const { setCustomAlert, setLoading, user } = useAuth();

    const [rating, setRating] = useState(0);

    const [canRate, setCanRate] = useState(false);

    const [{ data: dataRating, error: errorRating, loading: loadingRating }, createRating] = useAxios({ method: "POST" }, { manual: true, useCache: false });

    useEffect(() => {
        if (dataRating) {
            setCanRate(false);
        }
    }, [dataRating]);

    useEffect(() => {
        setCanRate(!isRated);
    }, [isRated])

    useEffect(() => {
        if (errorRating) {
            setLoading?.({ show: false, message: "" });
            setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${errorRating?.response?.status === 400 ? errorRating?.response?.data.message[0] : errorRating?.response?.data.message}.`, severity: "error" });
        }
    }, [errorRating])

    const handleChange = async (e) => {
        setRating(e.target.value);
        await createRating({
            url: `/product-ratings/${product?.productId}`,
            data: {
                orderId,
                value: Number(e.target.value)
            }
        });
    }

    if (!product || !orderId || !user) {
        return null;
    }

    return (
        <div className="flex justify-between text-gray-500">
            <div className="flex items-center space-x-4">
                <img className="h-12 w-12 rounded" src={generateImageUrl(product?.productImage)} alt="" />
                <p className="font-bold">{product?.productName}</p>
            </div>
            <div className="flex space-x-4 items-center">

                {
                    canRate ?
                        loadingRating ?
                            <div>
                                Cargando...
                            </div>
                            :
                            <>
                                <CustomSelect onChange={handleChange} value={rating}>
                                    {
                                        Array.from(Array(6).keys()).map((n) => {
                                            return (
                                                <option key={n} value={n}>{n}</option>
                                            )
                                        })
                                    }
                                </CustomSelect>
                                <IoStarOutline style={{ fontSize: 70 }} className="text-yellow-500" />
                            </>
                        :
                        <div>
                            Ya has valorado este producto.
                        </div>
                }
            </div>
        </div>
    )
}

export default ProductRatingRow;