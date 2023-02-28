import { Route, Switch, Redirect } from "react-router";
import MyAccountLayout from './components/MyAccountLayout';
import MyAccountDashboard from './pages/my-account/Dashboard';
import MyAccountInfo from './pages/my-account/Info';
import MyAccountAddress from './pages/my-account/Address';
import MyAccountOrders from './pages/my-account/Orders';
import MyAccountConversations from './pages/my-account/Conversations';
import MyAccountCarts from './pages/my-account/Carts';
import CreateAddress from "./pages/my-account/CreateAddress";
import ConversationsChat from "./pages/my-account/ConversationsChat";
import EditAddress from "./pages/my-account/EditAddress";
import OrderDetails from "./pages/OrderDetails";
import Favorites from "./pages/my-account/Favorites";
import Cards from "./pages/my-account/Cards";

const MyAccountRoutes = () => {

  return (
    <MyAccountLayout>
      <Switch>
        <Redirect path="/my-account" to="/my-account/dashboard" exact />
        <Route path="/my-account/dashboard" exact component={MyAccountDashboard} />
        <Route path="/my-account/info" exact component={MyAccountInfo} />

        <Route path="/my-account/address" exact component={MyAccountAddress} />
        <Route path="/my-account/address/:id/edit" exact component={EditAddress} />
        <Route path="/my-account/address/new" exact component={CreateAddress} />

        <Route path="/my-account/orders" exact component={MyAccountOrders} />
        <Route path="/my-account/orders/:id" exact component={OrderDetails} />

        <Route path="/my-account/favorites" exact component={Favorites} />

        <Route path="/my-account/cards" exact component={Cards} />

        <Route path="/my-account/conversations" exact component={MyAccountConversations} />
        <Route path="/my-account/conversations/:id" exact component={ConversationsChat} />

        <Route path="/my-account/carts" exact component={MyAccountCarts} />
      </Switch>
    </MyAccountLayout>
  )
};

export default MyAccountRoutes;