import ProductCard from "./ProductCard";
import ProductHorizontalCard from "./ProductHorizontalCard";
import ProductModal from "./ProductModal";
import ProductsGrid from "./ProductsGrid";
import { useEffect, useState } from 'react';
import { generateImageUrl } from "../helpers/url";
import useAxios from "../hooks/useAxios";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import StoreDiscountsModal from "./dicounts/StoreDiscountsModal";
import findShowsQuantity from "../helpers/findShowsQuantity";
import StoreModal from "./StoreModal";

const ProductsCollection = ({ products, isInGridView, isStore, onAddToCard }) => {

  const history = useHistory();

  const { setLoading, setCustomAlert } = useAuth();

  const [{ loading, error, data }, addToCart] = useAxios({ url: `/carts/add-to-cart`, method: "POST" }, { manual: true, useCache: false });

  const [productOnModal, setProductOnModal] = useState(null);

  const [storeAndProduct, setStoreAndProduct] = useState(null);

  const [isAddToCart, setIsAddToCart] = useState(false);

  const [storeToModal, setStoreToModal] = useState(null);

  const [showStoreModal, setShowStoreModal] = useState(false);

  useEffect(() => {
    setLoading({ show: loading, message: "Añadiendo al carrito." })
  }, [loading, setLoading])

  useEffect(() => {
    if (error) {
      setLoading?.({ show: false, message: "" });
      setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${error?.response?.status === 400 ? error?.response?.data.message[0] : error?.response?.data.message}.`, severity: "error" });
    }
  }, [error])

  useEffect(() => {
    if (data) {
      if (!isStore && !isAddToCart) {
        history.push(`/checkout?cartId=${data?.id}`);
        return;
      } else {
        if (isStore) {
          onAddToCard?.(data);
          setCustomAlert?.({ show: true, message: `El producto ha sido añadido al carrito exitosamente.`, severity: "success" })
        } else {
          setIsAddToCart(false);
          setShowStoreModal(true);
        }
      }
    }
  }, [data])

  const handleCloseModal = async (e) => {
    setProductOnModal(null);
    if (e) {
      if (e.discount && !isStore) {
        setStoreAndProduct(e);
        return;
      }

      if (e?.addTocart) {
        setIsAddToCart(e?.addTocart);
        const { addTocart, store, ...rest } = e;
        setStoreToModal(store);
        await addToCart({ data: rest });
        return;
      }
      await addToCart({ data: e });
    }
  }

  const handleClose = async (e) => {
    setStoreAndProduct(null);
    if (e) {
      await addToCart({ data: e });
    }
  }

  const handleCloseStoreModal = () => {
    setShowStoreModal(false);
    setStoreToModal(null);
  }

  return (
    <div>
      {isInGridView
        ?
        <ProductsGrid>
          {products.map((product) => <div
            key={product.id}
            className="justify-center"
          >
            <ProductCard
              name={product.name}
              slug={product.slug}
              description={product?.productDetails?.shortDescription ? product?.productDetails?.shortDescription : product?.description ? product?.description : 'Sin descripción'}
              quantity={product?.productDetails ? product?.productDetails?.quantity : findShowsQuantity(product?.shows)}
              imgSrc={generateImageUrl(product.productImages?.[0]?.path)}
              imgAlt={product.name}
              price={product?.productDetails ? product.productDetails?.price > 0 ? `$${product.productDetails?.price}` : 'Gratis' : ''}
              rating={product?.rating}
              onBuy={() => { product?.productDetails ? setProductOnModal(product) : history?.push(`/products/${product?.slug}`) }}
              buttonText={isStore ? "Añadir al carrito" : "Comprar"}
            />
          </div>)}
        </ProductsGrid>
        : <div className="space-y-4">
          {products.map((product) => <ProductHorizontalCard
            key={product.id}
            name={product.name}
            rating={product?.rating}
            slug={product.slug}
            description={product.shortDescription}
            quantity={product?.productDetails ? product?.productDetails?.quantity : findShowsQuantity(product?.shows)}
            imgSrc={generateImageUrl(product.productImages?.[0]?.path)}
            imgAlt={product.name}
            price={product?.productDetails ? product.productDetails?.price > 0 ? `$${product.productDetails?.price}` : 'Gratis' : 'Ver Funciones'}
            onBuy={() => { product?.productDetails ? setProductOnModal(product) : history?.push(`/products/${product?.slug}`) }}
            storeName={product.store.name}
            storeImageSrc={generateImageUrl(product.store?.storeProfile?.logo)}
            storeImageAlt={product.store.name}
            storeSlug={product?.store?.slug}
            deliveryMethodTypes={product.deliveryMethodTypes.map(item => item.name)}

          />)}
        </div>
      }
      <ProductModal isStore={isStore} product={productOnModal} closeModal={handleCloseModal} />
      <StoreDiscountsModal onClose={handleClose} storeAndProduct={storeAndProduct} />
      <StoreModal show={storeToModal && showStoreModal ? true : false} store={storeToModal} onClose={handleCloseStoreModal} cartId={data?.id} />
    </div>
  )
};

export default ProductsCollection;