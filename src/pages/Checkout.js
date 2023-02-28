import { useEffect, useState } from "react";

import { useHistory, useLocation } from "react-router-dom";
import PayMethodSection from "../components/PayMethodSection";
import CheckoutDetailsCard from "../components/CheckoutDetailsCard";
import SelectDeliverySection from '../components/SelectDeliverySection';
import { isRequired, validate } from "../helpers/formsValidations";
import useAxios from "../hooks/useAxios";
import { useAuth } from "../contexts/AuthContext";

const Checkout = (props) => {

  const { setLoading, setCustomAlert } = useAuth();

  const { className } = props;
  const history = useHistory();
  const location = useLocation();

  const [deliveryMethod, setDeliveryMethod] = useState(true);

  const [showPayments, setShowPayments] = useState(false);

  const [discountType, setDiscountType] = useState(null);

  const [checkoutData, setCheckoutData] = useState({
    cartId: "",
    paymentMethodCode: "",
    deliveryMethodId: "",
    profileAddressId: "",
    bankTransfers: []
  });

  const [deliveryCost, setDeliveryCost] = useState(0);

  const [errorsForm, setErrorsForm] = useState({
    cartId: null,
    paymentMethodCode: null,
    deliveryMethodId: null,
    profileAddressId: null,
    totalTransfer: null
  });

  const [showProduct, setShowProduct] = useState(false);

  const [canBuy, setCanBuy] = useState(false);

  const [storeId, setStoreId] = useState("");

  const [cartSubTotal, setCartSubTotal] = useState(0);

  const [{ data: deliveryCostData, error: deliveryCostError, loading: deliveryCostLoading }, getDeliveryCost] = useAxios({ url: "/delivery-methods/calculate-cost", method: "POST" }, { manual: true, useCache: false });

  const [{ data: createCheckoutData, error: createCheckoutError }, createCheckout] = useAxios({ url: "/orders", method: "POST" }, { manual: true, useCache: false });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get('cartId');
    if (id) {
      setCheckoutData((oldCheckoutData) => {
        return {
          ...oldCheckoutData,
          cartId: id
        }
      })
    }
  }, [location]);

  useEffect(() => {
    if (canBuy && window.innerWidth < 768) {
      document.getElementById('buy-button').scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [canBuy]);

  useEffect(() => {
    if (deliveryCostError) {
      setLoading?.({ show: false, message: "" });
      setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${deliveryCostError?.response?.status === 400 ? deliveryCostError?.response?.data.message[0] : deliveryCostError?.response?.data.message}.`, severity: "error" });
    }

    if (createCheckoutError) {
      setLoading?.({ show: false, message: "" });
      setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${createCheckoutError?.response?.status === 400 ? createCheckoutError?.response?.data.message[0] : createCheckoutError?.response?.data.message}.`, severity: "error" });
    }
  }, [deliveryCostError, createCheckoutError, setLoading, setCustomAlert]);

  useEffect(() => {
    if (deliveryCostData) {

      const { deliveryMethodId, profileAddressId } = checkoutData;

      setDeliveryCost(deliveryMethod && deliveryMethodId && profileAddressId ? deliveryCostData.cost : 0);
    }
  }, [deliveryCostData, checkoutData]);

  useEffect(() => {
    if (
      !errorsForm.deliveryMethodId &&
      !errorsForm.profileAddressId &&
      !errorsForm.cartId
    ) {
      const { bankTransfers, paymentMethodCode, bankAccountId, ...rest } = checkoutData;
      if (
        checkoutData.deliveryMethodId &&
        checkoutData.profileAddressId &&
        checkoutData.cartId
      ) {
        getDeliveryCost({ data: { ...rest } });
      }
    }
  }, [errorsForm.deliveryMethodId, errorsForm.profileAddressId, checkoutData.profileAddressId, checkoutData.deliveryMethodId, deliveryMethod]);

  useEffect(() => {
    setErrorsForm((oldErrorsForm) => {
      return {
        ...oldErrorsForm,
        cartId: validate(checkoutData.cartId, [
          { validator: isRequired, errorMessage: "El carrito es obligatorio." },
        ]),
        paymentMethodCode: validate(checkoutData.paymentMethodCode, [
          { validator: isRequired, errorMessage: "El metodo de pago es obligatorio." }
        ]),
        deliveryMethodId: deliveryMethod ?
          validate(checkoutData.deliveryMethodId, [
            { validator: isRequired, errorMessage: "Por favor seleccione una empresa de envios." },
          ])
          :
          null
        ,
        profileAddressId: deliveryMethod ?
          validate(checkoutData.profileAddressId, [
            { validator: isRequired, errorMessage: "Por favor seleccione una dirección de envio." },
          ])
          :
          null,
        totalTransfer: checkoutData.paymentMethodCode === "pym-001" || checkoutData.paymentMethodCode === "pym-004" || checkoutData.paymentMethodCode === "pym-003" ? null : checkoutData?.bankTransfers.length > 0 && (cartSubTotal + Number(deliveryCost)) === checkoutData?.bankTransfers?.reduce((acum, transfer) => acum + Number(transfer.amount), 0) ? null : "El monto de las transferencias no puede estar por encima ni por debajo del total de la orden. Por favor verifique."
      }
    });
  }, [checkoutData, deliveryMethod]);

  useEffect(() => {
    if (!checkoutData.deliveryMethodId || !checkoutData.profileAddressId) {
      setCheckoutData((oldCheckoutData) => {
        return {
          ...oldCheckoutData,
          paymentMethodCode: "",
          bankTransfers: [],
        }
      })
    }
  }, [checkoutData.deliveryMethodId, checkoutData.profileAddressId])

  useEffect(() => {
    setCheckoutData((oldCheckoutData) => {
      return {
        ...oldCheckoutData,
        paymentMethodCode: "",
        deliveryMethodId: "",
        profileAddressId: "",
        bankTransfers: []
      }
    })
  }, [deliveryMethod])

  useEffect(() => {
    if (!errorsForm.deliveryMethodId && !errorsForm.profileAddressId) {
      setShowPayments(true);
      return;
    }
    setShowPayments(false);
  }, [errorsForm]);

  useEffect(() => {
    for (let errors in errorsForm) {
      if (errorsForm[errors] !== null) {
        setCanBuy(false);
        return;
      }
    }
    setCanBuy(true);
  }, [errorsForm, checkoutData]);

  useEffect(() => {
    if (createCheckoutData) {
      if (createCheckoutData?.url) {
        window.open(createCheckoutData?.url, '_blank').focus();

      }
      history.push(`/checkout/${createCheckoutData?.order?.id}`);
    }
  }, [createCheckoutData]);

  const handleChange = (e) => {
    setCheckoutData((oldChackoutData) => {
      return {
        ...oldChackoutData,
        [e.target.name]: e.target.type === "checkbox" && e.target.name === "deliveryMethodId" ? Number(e.target.value) : e.target.value
      }
    })
  }

  const handleCart = (cart) => {

    setStoreId(cart?.storeId);

    cart?.cartItems?.forEach(product => {
      if (product?.cartItemShowDetails) {
        setDeliveryMethod(false);
        setShowProduct(true);
      }

    });

    if (!cart?.discount) {
      setCartSubTotal(cart.subTotal);
      return;
    }

    setDiscountType(cart?.discount?.discountType?.code);
    setCartSubTotal(cart?.subTotalWithDiscount);

  }

  const handleBuy = async () => {
    setLoading?.({ show: true, message: "Creando orden" });
    const data = new FormData();
    const { bankAccountId, ...rest } = checkoutData;
    if (rest.cartId) {
      data.append('cartId', rest.cartId);
    }
    if (rest.deliveryMethodId) {
      data.append('deliveryMethodId', rest.deliveryMethodId);
    }
    if (rest.paymentMethodCode) {
      data.append('paymentMethodCode', rest.paymentMethodCode);
    }
    if (rest.profileAddressId) {
      data.append('profileAddressId', rest.profileAddressId);
    }
    if (rest.bankTransfers && rest.bankTransfers.length > 0) {
      rest.bankTransfers.forEach((banktransfer, i) => {
        data.append(`bankTransfers[${i}][reference]`, banktransfer.reference);
        data.append(`bankTransfers[${i}][amount]`, banktransfer.amount);
        data.append(`bankTransfers[${i}][bankAccountId]`, banktransfer.bankAccountId);
        data.append(`images`, banktransfer.image, banktransfer.image.name);
      })
    }

    await createCheckout({ data });
    setLoading?.({ show: false, message: "" });
  }

  return (
    <div className={className}>
      <div className="md:flex items-center p-4 justify-between">
        <div className="bg-white p-6 rounded md:w-7/12">
          <h1 className="text-4xl text-gray-600 font-bold">
            Realizar Pago
          </h1>

          <SelectDeliverySection
            isShowProducts={showProduct}
            onChange={handleChange}
            storeId={storeId}
            deliveryMethod={deliveryMethod}
            onSelectDeliveryMethod={(e) => { setDeliveryMethod(e) }}
            values={{ deliveryMethodId: checkoutData.deliveryMethodId, profileAddressId: checkoutData.profileAddressId }}
            className="mt-8 border-b pb-2 animate__animated animate__fadeInUp" />

          {
            showPayments &&
            <PayMethodSection
              values={{
                paymentMethodCode: checkoutData.paymentMethodCode,
                bankAccountId: checkoutData.bankAccountId,
                bankTransfers: checkoutData.bankTransfers,
                discountType: discountType,
                total: cartSubTotal + Number(deliveryCost)
              }}
              onChange={handleChange} />
          }
        </div>
        <div className="md:w-5/12 p-8">
          <CheckoutDetailsCard
            onBuy={handleBuy}
            deliveryCost={deliveryCost}
            loadingDeliveryCost={deliveryCostLoading}
            canBuy={canBuy}
            emitCart={handleCart}
            cartId={checkoutData.cartId} />
        </div>
      </div>
    </div >
  )
}

export default Checkout;