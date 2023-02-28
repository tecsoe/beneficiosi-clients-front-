import { Route, Switch } from "react-router";
import Home from "./pages/Home";
import Store from "./pages/Store";
import Products from "./pages/Products";
import Stores from "./pages/Stores";
import Product from "./pages/Product";
import Benefits from "./pages/Benefits";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyAccountRoutes from './MyAccountRoutes';
import Checkout from "./pages/Checkout";
import PrivateRoute from "./components/PrivateRoute";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import SearchResults from "./pages/SearchResults";
import RenewPassword from "./pages/RenewPassword";
import Helps from "./pages/Helps";
import HelpsDetails from "./pages/HelpsDetails";
import ForgotPassword from "./pages/ForgotPassword";
import StoresInMap from "./pages/StoresInMap";

const Routes = () => {

  const history = useHistory();

  useEffect(() => {
    history?.listen((location, action) => {
      window.scrollTo({ top: 0 });
    });
  }, [history]);

  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/stores" exact component={Stores} />
      <Route path="/stores/:slug" exact component={Store} />
      <Route path="/products" exact component={Products} />
      <Route path="/products/:slug" exact component={Product} />
      <Route path="/benefits" exact component={Benefits} />
      <Route path="/login" exact component={Login} />
      <Route path="/forgot-password" exact component={ForgotPassword} />
      <Route path="/renew-password" exact component={RenewPassword} />
      <Route path="/helps" exact component={Helps} />
      <Route path="/helps/:id" exact component={HelpsDetails} />
      <Route path="/register" exact component={Register} />
      <Route path="/search" exact component={SearchResults} />
      <Route path="/map" exact component={StoresInMap} />

      <PrivateRoute>
        <Route path="/my-account" component={MyAccountRoutes} />
        <Route path="/checkout" component={Checkout} exact />
        <Route path="/checkout/:id" component={CheckoutSuccess} exact />
      </PrivateRoute>
    </Switch>
  )
};

export default Routes;