import Button from "./Button";
import CartsRows from "./CartsRows";
import CustomInput from "./CustomInput";

const MyAccountCartsTable = (props) => {

  const { carts, className, values, onClearFilters, onFiltersChange } = props;

  return (
    <div>
      <div className={className}>
        <div className="hidden md:flex w-full text-center items-center font-bold">
          <div className="w-3/12 p-2">
            <p>ID</p>
            <CustomInput
              placeholder="Id..."
              name="id"
              onChange={onFiltersChange}
              value={values.id}
            />
          </div>
          <div className="w-3/12 p-2">
            <p>Tienda</p>
            <CustomInput
              placeholder="Nombre de la tienda.."
              name="storeName"
              onChange={onFiltersChange}
              value={values.storeName}
            />
          </div>
          <div className="w-3/12 p-2">
            Fecha de Creacion
            <CustomInput
              placeholder="desde..."
              name="from"
              onChange={onFiltersChange}
              value={values.from}
              className="my-2"
            />
            <CustomInput
              placeholder="hasta..."
              name="until"
              onChange={onFiltersChange}
              value={values.until}
              className="my-2"
            />
          </div>
          <div className="w-3/12 p-2">
            <p>Total</p>
            <CustomInput
              placeholder="min"
              name="minTotal"
              onChange={onFiltersChange}
              value={values.minTotal}
              className="my-2"
            />
            <CustomInput
              placeholder="max"
              name="maxTotal"
              onChange={onFiltersChange}
              value={values.maxTotal}
              className="my-2"
            />
          </div>
          <div className="w-3/12 p-2">
            <Button onClick={onClearFilters} className="bg-main transition duration-500 hover:bg-white hover:text-main">
              Limpiar Filtros
            </Button>
          </div>
        </div>
        <div className="w-full text-center">
          {
            carts?.length > 0 ?
              carts?.map((cart) => {
                return (
                  <CartsRows cartValue={cart} key={cart} />
                )
              }

              )
              :
              <div className="text-center text-red-500 text-2xl my-8">
                No se Encontraron carritos.
              </div>
          }
        </div>
      </div>
    </div>
  )
}

export default MyAccountCartsTable;