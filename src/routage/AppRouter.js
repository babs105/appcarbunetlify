import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";
import Login from "../components/Login/LoginForm";
import AuthenticatedRoute from "./AuthenticatedRoute";
// import ExtBrowserRouter from './ExtBrowserRouter';
const authentication = () =>
  localStorage.getItem("token") ? (
    // <Redirect to="/app" />
    <PrivateRoutes />
  ) : (
    <PublicRoutes />
  );
// const getLoggedUser = () => {
//   let token = localStorage.getItem("token");

//   if (token) {
//     userService
//       .loginExistingUser(token)
//       .then((data) => true)
//       .catch((_) => false);
//   }
// };
class AppRouter extends Component {
  render() {
    return (
      <div style={style}>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/login" exact component={Login} />
            <AuthenticatedRoute path="/app" component={PrivateRoutes} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
const style = {
  marginTop: "0px",
};
export default AppRouter;
