import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import StoreProvider from "components/Store/Provider";
import RoutesPrivate from "components/Routes/Private/Private";
import Home from "./Home/Home";
import Login from "./Login/Login";
import { ToastContainer } from "react-toastify";
import Header from "components/General/Header";

const PagesRoot = () => (
  <Router>
    <Header />
    <StoreProvider>
      <ToastContainer />
      <Switch>
        <Route path="/login" component={Login} />
        <RoutesPrivate path="/" component={Home} />
      </Switch>
    </StoreProvider>
  </Router>
);

export default PagesRoot;
