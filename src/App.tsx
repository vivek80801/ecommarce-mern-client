import React from "react";
import { useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { IState } from "./store";
import Navbar from "./components/layouts/Navbar";
import Home from "./components/pages/Home";
import LogIn from "./components/pages/Login";
import Default from "./components/pages/Default";
import Dashboard from "./components/pages/Dashboard";
import AdminDashboard from "./components/pages/AdminDashboard";
import Cart from "./components/pages/Cart";
import "./App.scss";

const App: React.FC = (): JSX.Element => {
  const state = useSelector((state: IState) => state);
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path={"/"} component={Home} />
        <Route exact path={"/login"} component={LogIn} />
        <Route exact path={"/cart"} component={Cart} />
        <Route
          exact
          path={"/dashboard"}
          component={
            state.auth.isAdmin === undefined
              ? Dashboard
              : state.auth.isAdmin !== undefined && state.auth.isAdmin === true
              ? AdminDashboard
              : Dashboard
          }
        />
        <Route exact component={Default} />
      </Switch>
    </div>
  );
};

export default App;
