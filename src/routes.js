import React from "react";

import Login from "./Views/Login";
import Register from "./Views/Register";
import Home from "./Views/Home";
import Pending from "./Views/Pending";
import Settings from "./Views/Settings";
import Administered from "./Views/Administered";

import { BrowserRouter, Route, Switch /*, Redirect*/ } from "react-router-dom";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/Register" component={Register} />
      <Route path="/home" component={Home} />
      <Route path="/pending" component={Pending} />
      <Route path="/administered" component={Administered} />
      <Route path="/settings" component={Settings} />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;