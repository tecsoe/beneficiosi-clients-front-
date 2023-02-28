import useCategories from "../hooks/useCategories";

const StoreCategoryFilter = ({ onChange, name, values }) => {

    const [{ categories, error: errorCategories, loading: loadingCategories }, getCategories] = useCategories();

    return (
        <div>
            <h4 className="text-xl font-semibold mb-2">Categorias</h4>
            <ul className="text-gray-800 space-y-2 max-h-56 overflow-y-auto">
                {
                    loadingCategories ?
                        <div className="text-center text-gray-500">Obteniendo categorias...</div>
                        :
                        errorCategories ?
                            <div className="text-red-500 text-center">
                                <p>Ha ocurrido un error</p>
                                <button className="bg-red-500" onClick={() => { getCategories() }}>
                                    Reintentar
                                </button>
                            </div>
                            :
                            categories.map((category, i) =>
                                <div key={i} className="flex items-center space-x-4 cursor-pointer">
                                    <input
                                        onChange={onChange}
                                        name={name}
                                        value={category.id}
                                        checked={values?.includes(category.id)}
                                        className="text-main focus:ring-white"
                                        id={`${category.name}-${i}`}
                                        type="checkbox" />
                                    <label className="cursor-pointer capitalize" htmlFor={`${category.name}-${i}`}>
                                        <p>{category.name}</p>
                                    </label>
                                </div>
                            )}
            </ul>
        </div>
    )
}

export default StoreCategoryFilter;