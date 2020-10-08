import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

import { authenticationHelper } from "../utils/AuthenticationHelper";

class AuthenticatedRoute extends Component {
  render() {
    if (authenticationHelper.isUserLoggedIn()) {
      return <Route {...this.props} />;
    } else {
      return <Redirect to="/login" />;
    }
  }
}
export default AuthenticatedRoute;
