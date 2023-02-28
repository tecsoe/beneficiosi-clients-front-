import { useEffect, useState } from "react";
import { IoCart } from "react-icons/io5";
import MyAccountCartsTable from "../../components/MyAccountCartsTable";
import Pagination from "../../components/Pagination";
import { useAuth } from "../../contexts/AuthContext";
import useCarts from "../../hooks/useCarts"

const MyAccountCarts = () => {

  const { setLoading } = useAuth();

  const [filters, setFilters] = useState({
    page: 1,
    storeName: "",
    from: "",
    until: "",
    minTotal: "",
    maxTotal: "",
    isProcessed: "false",
    isExpired: "false",
    isDirectPurchase: "false"
  });

  const [{ carts, numberOfPages, loading }] = useCarts({ axiosConfig: { params: { ...filters } } });

  useEffect(() => {
    setLoading({ show: loading, message: "Obteniendo tus carritos" })
  }, [loading, setLoading])

  const handleChange = (e) => {
    setFilters((oldFilters) => {
      if (e.target.name !== "page") {
        return {
          ...oldFilters,
          [e.target.name]: e.target.value,
          page: 1
        }
      }
      return {
        ...oldFilters,
        [e.target.name]: e.target.value,
      }
    });
  }

  const handleClearFilters = () => {
    setFilters({
      page: 1,
      storeName: "",
      from: "",
      until: "",
      minTotal: "",
      maxTotal: "",
      isProcessed: "false",
      isExpired: "false",
      isDirectPurchase: "false"
    })
  }

  return (
    <div className="px-8 py-4">
      <h1 className="text-2xl flex items-center text-gray-600 font-bold my-5">
        <IoCart className="text-4xl"></IoCart>
        <span className="ml-4">Mis Carritos</span>
      </h1>

      <MyAccountCartsTable
        onClearFilters={handleClearFilters}
        values={{ ...filters }}
        onFiltersChange={handleChange}
        className="my-12"
        carts={carts} />

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
  )
}

export default MyAccountCarts;