import clsx from "clsx";
import { useEffect, useState } from "react";
import ErrorMsg from "../../components/ErrorMsg";
import ProductsCollection from "../../components/ProductsCollection";
import StoresCollection from "../../components/StoresCollection";
import { useAuth } from "../../contexts/AuthContext";
import useProducts from "../../hooks/useProducts";
import useStores from "../../hooks/useStores";

const Favorites = () => {

    const { user, setLoading, setCustomAlert } = useAuth();

    const [show, setShow] = useState('products');

    const [{ products, error, loading: productsLoading }, getProducts] = useProducts({
        axiosConfig: {
            params: {
                isFavoriteFor: user?.id
            }
        },
        options: {
            useCache: false
        }
    });

    const [{ stores, error: errorStores, loading: loadingStores }, getStores] = useStores({
        params: {
            isFavoriteFor: user?.id,
            withCheapestProduct: true
        }
    });

    useEffect(() => {
        console.log(products);
    }, [products])

    useEffect(() => {
        setLoading({ show: productsLoading, message: "Cargando" });
    }, [productsLoading]);



    return (
        <div className="p-8">
            <div className="flex space-x-4">
                <h1 onClick={() => { setShow('products') }} className={clsx(["cursor-pointer hover:text-main text-xl mb-4"], {
                    'text-main': show === 'products',
                    'text-gray-500': show !== 'products'
                })} >
                    Mis productos favoritos
                </h1>
                <h1 onClick={() => { setShow('stores') }} className={clsx(["cursor-pointer hover:text-main text-xl mb-4"], {
                    'text-main': show === 'stores',
                    'text-gray-500': show !== 'stores'
                })} >
                    Mis tiendas favoritas
                </h1>
            </div>

            {
                show === 'products' &&
                <div>
                    {error
                        ? <ErrorMsg message="Error al cargar los productos. Nuestro equipo ha sido notificado, intente más tarde." />
                        : products.length > 0
                            ? <ProductsCollection
                                products={products}
                                isInGridView={window.innerWidth > 768 ? false : true}
                            />
                            : <div className="text-center text-red-500 text-xl">
                                No se encontraron productos.
                            </div>
                    }
                </div>
            }

            {
                show === 'stores' &&
                <div>
                    {errorStores ?
                        <ErrorMsg message="Error al cargar las tiendas. Nuestro equipo ha sido notificado, intente más tarde." />
                        :
                        stores.length > 0 ?
                            <StoresCollection
                                stores={stores}
                                isInGridView={window.innerWidth > 768 ? false : true} />
                            :
                            <div className="text-center text-red-500 text-xl">
                                No se encontraron Tiendas favoritas.
                            </div>
                    }
                </div>
            }
        </div>
    )
}

export default Favorites;