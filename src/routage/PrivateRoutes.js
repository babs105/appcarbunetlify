import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import UserList from "../components/User/UserListComponent";
import AddUser from "../components/User/UserAddComponent";
import EditUser from "../components/User/UserEditComponent";
import Dashboard from "../components/Dashboard/Dashboard";
import NotFound from "../components/NotFound/NotFound";
import NavBar from "../components/Layout/NavBar/NavBar";
import Container from "@material-ui/core/Container";

import CuveList from "../components/Cuve/CuveListComponent";
import AddCuve from "../components/Cuve/CuveAddComponent";
import EditCuve from "../components/Cuve/CuveEditComponent";

import VehiculeList from "../components/Vehicule/VehiculeListComponent";
import AddVehicule from "../components/Vehicule/VehiculeAddComponent";
import Ravitaillements from "../components/Ravitaillement/RavitayListComponent";
import Soutirement from "../components/Ravitaillement/SoutirementComponent";

import AddRavitaillement from "../components/Ravitaillement/RavitaillementAddComponent";
import EditRavitaillement from "../components/Ravitaillement/RavitaillementEditComponent";

import StationList from "../components/Station/StationListComponent";
import AddStaton from "../components/Station/StationAddComponent";

import AddRajout from "../components/Rajout/RajoutAddComponent";
import ListRajout from "../components/Rajout/RajoutListComponent";

const PrivateRoutes = () => (
  <Fragment>
    <NavBar />
    <Container>
      <Switch>
        <Route path="/app" exact component={Dashboard} />
        <Route path="/app/users" exact component={UserList} />
        <Route path="/app/dashboard" exact component={Dashboard} />
        <Route path="/app/add-user" exact component={AddUser} />
        <Route path="/app/edit-user" exact component={EditUser} />

        <Route path="/app/cuve" exact component={CuveList} />
        <Route path="/app/add-cuve" exact component={AddCuve} />
        <Route path="/app/edit-cuve" exact component={EditCuve} />

        <Route path="/app/vehicule" exact component={VehiculeList} />
        <Route path="/app/add-vehicule" exact component={AddVehicule} />

        <Route path="/app/ravitaillement" exact component={Ravitaillements} />
        <Route
          path="/app/ravitaillement-vehicule"
          exact
          component={AddRavitaillement}
        />
        <Route
          path="/app/edit-ravitaillement"
          exact
          component={EditRavitaillement}
        />
        <Route path="/app/soutirement-vehicule" exact component={Soutirement} />

        <Route path="/app/station" exact component={StationList} />
        <Route path="/app/add-station" exact component={AddStaton} />

        <Route path="/app/add-rajout" exact component={AddRajout} />
        <Route path="/app/rajout" exact component={ListRajout} />
        <Route component={NotFound} />
      </Switch>
    </Container>
  </Fragment>
);
export default PrivateRoutes;
