import RenderListStoresCategories from "./RenderListStoresCategories";

const CategoryFilter = (props) => {

    const { loading, categoryStoreIds, onChange, name, categoriesStores, ...rest } = props;

    return (
        <div {...rest}>            
            {
                loading ?
                    <div>
                        Cargando Categorias
                    </div>
                    :
                    categoriesStores.length > 0 ?
                        <RenderListStoresCategories
                            name={name}
                            value={categoryStoreIds}
                            onChange={onChange}
                            categories={categoriesStores} className="mt-4 w-full" />
                        :
                        <div className="text-red-500">
                            <p>No se encontraron categorias en esta tienda.</p>
                        </div>
            }
        </div>
    )
}

export default CategoryFilter;