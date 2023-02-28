import useStoreFeatures from "../hooks/useStoresFeatures";
import Checkbox from "./Checkbox";

const StoreFeatureFilter = ({ onChange, name, values, filters }) => {

    const [{ storeFeatures, loading: featuresStoresLoading, error: featuresStoresError }, getFeatures] = useStoreFeatures({ params: { storeCategoryIds: filters?.storeCategoryIds.join(","), } });

    return (
        <div>
            {
                featuresStoresLoading ?
                    <div className="text-center">
                        Cargando preferencias...
                    </div>
                    :
                    featuresStoresError ?
                        <div className="text-red-500 text-center">
                            <p>Ha ocurrido un error</p>
                            <button onClick={() => { getFeatures() }}>Reintentar</button>
                        </div>
                        :
                        storeFeatures?.length > 0 && <div>
                            <h4 className="text-xl font-semibold mb-2">Preferencia</h4>

                            <ul className="max-h-72 custom-scrollbar overflow-y-auto text-gray-800 space-y-2">
                                {storeFeatures?.map((storeFeature) => <li key={storeFeature.id}>
                                    <Checkbox
                                        onChange={onChange}
                                        name={name}
                                        value={storeFeature.id}
                                        checked={values.includes(storeFeature.id)}
                                        id={`${storeFeature.name}-${storeFeature.id}`}
                                        label={storeFeature.name}
                                    />
                                </li>)}
                            </ul>
                        </div>
            }

        </div>
    )
}

export default StoreFeatureFilter;