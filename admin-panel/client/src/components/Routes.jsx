import React from "react";

import { Route, Switch } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Customers from "../pages/Customers";
import Products from "../pages/Products";
import DetailUser from "../pages/DetailUser";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/customers" component={Customers} />
      <Route path="/products" component={Products} />
      <Route path="/detail-user" component={DetailUser} />
    </Switch>
  );
};

export default Routes;
