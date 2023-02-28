import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import useHelpsCategories from "../hooks/useHelpCategories";
import useHelps from "../hooks/useHelps";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import Pagination from '../components/Pagination';
import { Link } from "react-router-dom";

const Helps = () => {

    const { setLoading, setCustomAlert } = useAuth();

    const [helpCategorySelected, setHelpCategorySelected] = useState(null);

    const [filters, setFilters] = useState({ page: 1, categoryId: "" });

    const [{ helpsCategories, error: helpsCategoriesError, loading: helpsCategoriesLoading }, getHelpsCategories] = useHelpsCategories({ axiosConfig: { params: { perPage: 200 } } });

    const [{ helps, error: helpsError, numberOfPages, loading: helpsLoading }, getHelps] = useHelps({ options: { manual: true, useCache: false } });

    useEffect(() => {
        setLoading({ show: helpsCategoriesLoading, message: "Cargando" });
    }, [helpsCategoriesLoading])

    useEffect(() => {
        if (helpsCategoriesError) {
            setLoading?.({ show: false, message: "" });
            setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${helpsCategoriesError?.response?.status === 400 ? helpsCategoriesError?.response?.data.message[0] : helpsCategoriesError?.response?.data.message}.`, severity: "error" });
        }
        if (helpsError) {
            setLoading?.({ show: false, message: "" });
            setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${helpsError?.response?.status === 400 ? helpsError?.response?.data.message[0] : helpsError?.response?.data.message}.`, severity: "error" });
        }
    }, [helpsCategoriesError, helpsError])

    useEffect(() => {
        console.log(helps);
    }, [helps])

    useEffect(() => {
        if (filters.categoryId) {
            getHelps({
                params: {
                    ...filters
                }
            });
        }
    }, [filters])

    useEffect(() => {
        if (helpCategorySelected) {
            setFilters((oldFilters) => {
                return {
                    page: 1,
                    categoryId: helpCategorySelected?.id
                }
            })
        }
    }, [helpCategorySelected])

    const handleHelpCategory = (category) => {
        setHelpCategorySelected(category);
    }

    const handleChange = (e) => {
        setFilters((oldFilters) => {
            return {
                ...oldFilters,
                [e.target.name]: e.target.value
            }
        })
    }

    return (
        <div className="p-8 space-y-4">
            <div className="text-center text-gray-500 font-bold text-xl">
                Seleccione el tema que le interesa.
            </div>
            <div className="md:flex w-full md:space-x-8 space-y-4 md:space-y-4">
                <div className="md:w-1/4 space-y-4">
                    <div className="text-center font-bold text-xl">
                        Topicos
                    </div>
                    {
                        helpsCategories?.map((helpsCategory, i) => {
                            return (
                                <div
                                    key={i}
                                    onClick={() => { handleHelpCategory(helpsCategory) }}
                                    className={"text-center flex items-center space-x-4 bg-white text-main relative transition duration-500 p-4 hover:shadow-xl hover:text-main rounded cursor-pointer"}>
                                    <p>{helpsCategory?.name}</p>
                                    {
                                        helpCategorySelected?.id === helpsCategory?.id &&
                                        <IoCheckmarkCircleSharp className="text-green-500 top-0 right-0" />
                                    }
                                </div>
                            )
                        })
                    }
                </div>
                <div className="w-full md:flex" style={{ minHeight: "50vh" }}>
                    {
                        helpCategorySelected ?
                            helpsLoading ?
                                <div className="m-auto text-xl text-gray-500 text-center w-full">
                                    Obteniendo Ayudas...
                                </div>
                                :
                                helps?.length > 0 ?
                                    <div className="space-y-4 w-full">
                                        {
                                            helps?.map((help, i) => {
                                                return (
                                                    <Link className="mb-4 block" to={`/helps/${help?.id}`} key={i}>
                                                        <div className="bg-white rounded p-6 text-gray-500 transition duration-500 hover:shadow-xl hover:text-main">
                                                            {help?.title}
                                                        </div>
                                                    </Link>
                                                )
                                            })
                                        }

                                        <div className="flex justify-center items-center mt-10">
                                            {
                                                numberOfPages > 0 ?
                                                    <Pagination
                                                        pages={numberOfPages}
                                                        activePage={filters.page}
                                                        onChange={e => { handleChange({ target: { name: "page", value: e } }) }}
                                                    />
                                                    :
                                                    null
                                            }
                                        </div>
                                    </div>
                                    :
                                    <div className="m-auto text-xl text-red-500 text-center w-full">
                                        No hay ayudas relacionadas a este tema...
                                    </div>
                            :
                            <div className="m-auto text-xl text-gray-500 text-center w-full">
                                Debe seleccionar un topico
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Helps;