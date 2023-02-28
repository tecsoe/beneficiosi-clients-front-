import CustomInput from "./CustomInput";
import Button from "./Button";
import OrdersRows from "./OrdersRows";

const OrdersTable = (props) => {

  const { orders, className, values, onFiltersChange, options, onClearFilters } = props;

  return (
    <div className={className}>
      <div className="hidden md:flex w-full items-center font-bold">
        <div className="w-1/12 p-2">
          Referencia
          <CustomInput name="orderNumber" value={values.orderNumber} onChange={onFiltersChange} placeholder="Referencia..." />
        </div>
        <div className="w-2/12 p-2">
          Direccion
          <CustomInput name="address" value={values.address} onChange={onFiltersChange} placeholder="direccion..." />
        </div>
        <div className="w-2/12 p-2">
          Tienda
          <CustomInput name="storeName" value={values.storeName} onChange={onFiltersChange} placeholder="nombre de la tienda" />
        </div>
        <div className="w-1/12 p-2">
          Total
          <CustomInput name="minTotal" value={values.minTotal} onChange={onFiltersChange} placeholder="min" className="my-2" />
          <CustomInput name="maxTotal" value={values.maxTotal} onChange={onFiltersChange} placeholder="max" className="my-2" />
        </div>
        <div className="w-2/12 p-2">
          Fecha
          <CustomInput name="minDate" value={values.minDate} onChange={onFiltersChange} placeholder="desde" className="my-2" />
          <CustomInput name="maxDate" value={values.maxDate} onChange={onFiltersChange} placeholder="hasta" className="my-2" />
        </div>
        <div className="w-1/12 p-2">
          <p>Estado</p>
          <select name="orderStatusCode" value={values.orderStatusCode} onChange={onFiltersChange} type="text" className="max-w-full border-gray-200 mt-2 rounded p-1">
            {
              options.orderStatuses.map((orderStatus, i) => {
                return (
                  <option key={i} value={orderStatus.code}>{orderStatus.name}</option>
                )
              })
            }
          </select>
        </div>
        <div className="w-2/12 p-2">
          Pago
          <select name="paymentMethodCode" value={values.paymentMethodCode} onChange={onFiltersChange} type="text" className="max-w-full border-gray-200 mt-2 rounded p-1">
            {
              options.payMethods.map((payMethod, i) => {
                return (
                  <option key={i} value={payMethod.code}>{payMethod.name}</option>
                )
              })
            }
          </select>
        </div>
        <div className="w-1/12 p-2">
          <Button onClick={onClearFilters} className="bg-main transition duration-500 hover:bg-white hover:text-main">
            Limpiar Filtros
          </Button>
        </div>
      </div>
      <div className="w-full text-center">
        {
          orders?.length > 0 ?
            orders.map((order, i) => {
              return (
                <OrdersRows key={i} orderValue={order} />
              )
            }
            )
            :
            <div className="text-center text-red-500 text-2xl my-8">
              No se Encontraron Pedidos.
            </div>
        }
      </div>
    </div>
  )
}

export default OrdersTable;