import React from "react";

import { Route, Switch } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Customers from "../pages/Customers";
import Products from "../pages/Products";
import DetailUser from "../pages/DetailUser";
import DetailProduct from "../pages/DetailProduct";
import CreateUser from "../pages/CreateUser";
const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/customers" component={Customers} />
      <Route path="/products" component={Products} />
      <Route path="/detail-user" component={DetailUser} />
      <Route path="/detail-product" component={DetailProduct} />
      <Route path="/create-user" component={CreateUser} />
    </Switch>
  );
};

export default Routes;
