import StatCard from '../../components/statCard.js';
import { IoDocumentTextSharp } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { IoBarChartSharp } from "react-icons/io5";

import LineChart from '../../components/LineChart.js';
import useCarts from '../../hooks/useCarts.js';
import useOrders from '../../hooks/useOrders.js';
import useProfileAddress from '../../hooks/useProfileAddress.js';
import { useAuth } from '../../contexts/AuthContext.js';
import useQuestions from '../../hooks/useQuestions.js';

var values = [10, 41, 35, 51, 49, 62, 69, 91, 148, 54, 71, 63, 42, 85, 16, 12, 45, 75, 63, 52, 78, 95, 52, 24, 35, 45, 54, 74, 63, 12, 0];

const MyAccountDashboard = () => {

  const { user } = useAuth();

  const [{ total: cartsTotal, loading: cartsLoading }] = useCarts({
    axiosConfig: {
      params: {
        isProcessed: "false",
        isExpired: "false",
        isDirectPurchase: "false"
      }
    }
  });

  const [{ loading: ordersLoading, total: ordersTotal }] = useOrders();

  const [{ total: addressTotal, loading: addressLoading }] = useProfileAddress();

  const [{ loading: questionsLoading, total: questionsTotal }] = useQuestions({
    axiosConfig: {
      params: {
        askedById: user?.id
      }
    }
  });

  return (
    <div className="px-12">
      <h1 className="text-2xl flex items-center text-gray-600 font-bold my-5">
        <IoBarChartSharp className="text-4xl"></IoBarChartSharp>
        <span className="ml-4">Resumen</span>
      </h1>

      <div className="md:flex md:justify-between">
        <StatCard
          link="/my-account/orders"
          icon={IoDocumentTextSharp}
          value={ordersTotal}
          iconColor="info"
          title={'Mis Pedidos'}
          loading={ordersLoading}
          className="mb-4 md:mb-0"
        ></StatCard>

        <StatCard
          link="/my-account/carts"
          icon={IoCartOutline}
          value={cartsTotal}
          iconColor="primary"
          title={'Carritos'}
          loading={cartsLoading}
          className="mb-4 md:mb-0"
        ></StatCard>

        <StatCard
          link="/my-account/address"
          icon={IoLocationOutline}
          value={addressTotal}
          iconColor="success"
          title={'Direcciones'}
          loading={addressLoading}
          className="mb-4 md:mb-0"
        ></StatCard>

        <StatCard
          link="/my-account/conversations"
          icon={IoChatboxEllipsesOutline}
          value={questionsTotal}
          iconColor="purple"
          title={'Conversaciones'}
          loading={questionsLoading}
          className="mb-4 md:mb-0"
        ></StatCard>
      </div>

      <div className="hidden md:block my-24">
        <LineChart title={'Dinero gastado en ARS mes de Mayo, TOTAL: ' + values.reduce((total, n) => total + n, 0)} values={values}></LineChart>
      </div>
    </div>
  )
}

export default MyAccountDashboard;