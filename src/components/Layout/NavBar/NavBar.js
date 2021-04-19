import React, { Component } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import MenuIcon from "@material-ui/icons/Menu";
import Hidden from "@material-ui/core/Hidden";
import {
  withStyles,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
// import { getCookie, setCookie, delCookies } from "../../../utils/Cookie";

import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import LocalGasStationIcon from "@material-ui/icons/LocalGasStation";
import DriveEtaIcon from "@material-ui/icons/DriveEta";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import EvStationIcon from "@material-ui/icons/EvStation";
import DashboardIcon from "@material-ui/icons/Dashboard";
import { userService } from "../../../service/userService";
import logo from "../../../../src/static/images/logoSastrans.png";
import Drawer from "@material-ui/core/Drawer";
import { Link } from "react-router-dom";
const drawerWidth = 225;
const styles = (theme) => ({
  root: {
    display: "flex",
    // width: '100%',
  },
  appBar: {
    position: "absolute",
    marginLeft: drawerWidth,
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up("md")]: {
      position: "relative",
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  avatar: {
    height: "5rem",
    width: "8rem",
  },
  menu: {
    marginLeft: "auto",
    marginRight: "3rem",
  },
  drawercontainer: {
    fontSize: "1,4rem",
    fontWeight: 700,
  },
});

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      mobileOpen: false,
      adminRole: false,
      agentRole: false,
    };
  }
  handleDrawerToggle = () => {
    this.setState((state) => ({ mobileOpen: !state.mobileOpen }));
  };
  closeDrawer = () => {
    this.setState((state) => ({ mobileOpen: false }));
  };
  componentDidMount() {
    this.getLoggedUser();
  }
  getLoggedUser = () => {
    let token = sessionStorage.getItem("token");

    if (token) {
      userService.loginExistingUser(token).then((data) => {
        console.log(data);
        this.setState({ user: data.user });

        if (this.state.user) {
          this.setState({ adminRole: this.state.user.role.includes("Admin") });
          this.setState({ agentRole: this.state.user.role.includes("Agent") });
        }
      });
    }
  };

  // goToUsers = () => {
  //   history.push("/app/users");
  // };

  // goToCuve = () => {
  //   history.push("/app/cuve");
  // };
  // goToStation = () => {
  //   history.push("/app/station");
  // };
  // goToRajoutCuve = () => {
  //   history.push("/app/rajout");
  // };
  // goToDashboard = () => {
  //   history.push("/app/dashboard");
  // };
  // goToRavi = () => {
  //   history.push("/app/ravitaillement");
  // };

  // goToVehecule = () => {
  //   history.push("/app/vehicule");
  // };
  goToLogout = () => {
    this.setState({ user: "" });
    userService.logout();
    console.log("DECONNEXION");
  };

  render() {
    const { classes, theme } = this.props;
    const admin = (
      <div>
        {/* <Button color="inherit" onClick={this.goToDashboard}>
            <DashboardIcon/>Tableau de bord
        </Button> */}
        <Button color="inherit" component={Link} to="/app/dashboard">
          <DashboardIcon />
          Tableau de bord
        </Button>
        <Button color="inherit" component={Link} to="/app/users">
          <PeopleAltIcon />
          Utilisateurs
        </Button>
        <Button color="inherit" component={Link} to="/app/station">
          <EvStationIcon />
          Station
        </Button>
        <Button color="inherit" component={Link} to="/app/cuve">
          <LocalShippingIcon />
          Cuve
        </Button>

        <Button color="inherit" component={Link} to="/app/rajout">
          <AddCircleIcon />
          Rajout Cuve
        </Button>
        <Button color="inherit" component={Link} to="/app/vehicule">
          <DriveEtaIcon /> Vehicule
        </Button>
        <Button color="inherit" component={Link} to="/app/ravitaillement">
          <LocalGasStationIcon />
          Ravitaillement
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/"
          onClick={this.goToLogout}
        >
          <ExitToAppIcon />
          Logout
        </Button>
      </div>
    );

    const agent = (
      <div>
        <Button color="inherit" component={Link} to="/app/dashboard">
          <DashboardIcon />
          Tableau de bord
        </Button>
        <Button color="inherit" component={Link} to="/app/cuve">
          <LocalShippingIcon />
          Cuve
        </Button>

        <Button color="inherit" component={Link} to="/app/rajout">
          <AddCircleIcon />
          Rajout Cuve
        </Button>

        <Button color="inherit" component={Link} to="/app/ravitaillement">
          <LocalGasStationIcon />
          Ravitaillement
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/"
          onClick={this.goToLogout}
        >
          <ExitToAppIcon />
          Logout
        </Button>
      </div>
    );

    return (
      <React.Fragment>
        <AppBar position="fixed">
          <Toolbar disableGutters>
            <img alt="logo company" src={logo} className={classes.avatar} />
            <div className={classes.menu}>
              <Hidden smDown implementation="css">
                {this.state.adminRole ? (
                  <div>{admin}</div>
                ) : this.state.agentRole ? (
                  <div className={classes.menu}>{agent}</div>
                ) : null}
              </Hidden>
              <Hidden mdUp className={classes.menu}>
                <Drawer
                  variant="temporary"
                  anchor={theme.direction === "rtl" ? "right" : "left"}
                  open={this.state.mobileOpen}
                  onClose={this.handleDrawerToggle}
                  classes={{
                    paper: classes.drawerPaper,
                  }}
                  ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                  }}
                >
                  <div className={classes.toolbar}>
                    {this.state.adminRole ? (
                      <div className={classes.drawercontainer}>
                        {/* <Button color="inherit" onClick={this.goToDashboard}>
                            <DashboardIcon/>Tableau de bord
                        </Button> */}
                        <List>
                          <ListItem
                            color="inherit"
                            component={Link}
                            to="/app/dashboard"
                            onClick={this.closeDrawer}
                          >
                            <ListItemIcon>
                              {" "}
                              <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText>Tableau de bord</ListItemText>
                          </ListItem>

                          <ListItem
                            color="inherit"
                            component={Link}
                            to="/app/users"
                            onClick={this.closeDrawer}
                          >
                            <ListItemIcon>
                              {" "}
                              <PeopleAltIcon />
                            </ListItemIcon>
                            <ListItemText> Utilisateurs</ListItemText>
                          </ListItem>
                          <ListItem
                            color="inherit"
                            component={Link}
                            to="/app/station"
                            onClick={this.closeDrawer}
                          >
                            <ListItemIcon>
                              {" "}
                              <EvStationIcon />
                            </ListItemIcon>
                            <ListItemText> Station</ListItemText>
                          </ListItem>

                          <ListItem
                            color="inherit"
                            component={Link}
                            to="/app/cuve"
                            onClick={this.closeDrawer}
                          >
                            <ListItemIcon>
                              {" "}
                              <LocalShippingIcon />
                            </ListItemIcon>
                            <ListItemText> Cuve</ListItemText>
                          </ListItem>
                          <ListItem
                            color="inherit"
                            component={Link}
                            to="/app/rajout"
                            onClick={this.closeDrawer}
                          >
                            <ListItemIcon>
                              {" "}
                              <AddCircleIcon />
                            </ListItemIcon>
                            <ListItemText> Rajout Cuve</ListItemText>
                          </ListItem>

                          <ListItem
                            color="inherit"
                            component={Link}
                            to="/app/vehicule"
                            onClick={this.closeDrawer}
                          >
                            <ListItemIcon>
                              {" "}
                              <DriveEtaIcon />
                            </ListItemIcon>
                            <ListItemText> Vehicule</ListItemText>
                          </ListItem>
                          <ListItem
                            color="inherit"
                            component={Link}
                            to="/app/ravitaillement"
                            onClick={this.closeDrawer}
                          >
                            <ListItemIcon>
                              {" "}
                              <LocalGasStationIcon />
                            </ListItemIcon>
                            <ListItemText> Ravitaillement</ListItemText>
                          </ListItem>
                          <ListItem
                            color="inherit"
                            component={Link}
                            to="/"
                            onClick={() => {
                              this.closeDrawer();
                              this.goToLogout();
                            }}
                            style={{ backgroundColor: "orange" }}
                          >
                            <ListItemIcon>
                              {" "}
                              <ExitToAppIcon />
                            </ListItemIcon>
                            <ListItemText> Logout</ListItemText>
                          </ListItem>
                        </List>
                      </div>
                    ) : this.state.agentRole ? (
                      <div>
                        <List>
                          <ListItem
                            color="inherit"
                            component={Link}
                            to="/app/dashboard"
                            onClick={this.closeDrawer}
                          >
                            <ListItemIcon>
                              {" "}
                              <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText>Tableau de bord</ListItemText>
                          </ListItem>
                          <ListItem
                            color="inherit"
                            component={Link}
                            to="/app/cuve"
                            onClick={this.closeDrawer}
                          >
                            <ListItemIcon color="primary">
                              {" "}
                              <LocalShippingIcon />
                            </ListItemIcon>
                            <ListItemText> Cuve</ListItemText>
                          </ListItem>
                          <ListItem
                            color="inherit"
                            component={Link}
                            to="/app/rajout"
                            onClick={this.closeDrawer}
                          >
                            <ListItemIcon>
                              {" "}
                              <AddCircleIcon />
                            </ListItemIcon>
                            <ListItemText> Rajout Cuve</ListItemText>
                          </ListItem>

                          <ListItem
                            color="inherit"
                            component={Link}
                            to="/app/ravitaillement"
                            onClick={this.closeDrawer}
                          >
                            <ListItemIcon>
                              {" "}
                              <LocalGasStationIcon />
                            </ListItemIcon>
                            <ListItemText> Ravitaillement</ListItemText>
                          </ListItem>
                          <ListItem
                            color="inherit"
                            component={Link}
                            to="/"
                            onClick={() => {
                              this.closeDrawer();
                              this.goToLogout();
                            }}
                          >
                            <ListItemIcon>
                              {" "}
                              <ExitToAppIcon />
                            </ListItemIcon>
                            <ListItemText> Logout</ListItemText>
                          </ListItem>
                        </List>
                      </div>
                    ) : null}
                  </div>
                </Drawer>
              </Hidden>
            </div>
            <IconButton
              color="inherit"
              edge="start"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.navIconHide}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div style={{ marginBottom: "130px" }}></div>
      </React.Fragment>
    );
  }
}
NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(NavBar);
