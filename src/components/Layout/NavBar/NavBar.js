import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import MenuIcon from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden';
import {withStyles} from '@material-ui/core';
import {getCookie,setCookie,delCookies } from '../../../utils/Cookie';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import LocalGasStationIcon from '@material-ui/icons/LocalGasStation';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EvStationIcon from '@material-ui/icons/EvStation';
import DashboardIcon from '@material-ui/icons/Dashboard';
import {history} from '../../../routage/ExtBrowserRouter';
import {userService} from '../../../service/userService';
import logo from '../../../../src/static/images/route.png';
import Drawer from '@material-ui/core/Drawer';

const drawerWidth = 200;
const styles = theme => ({
  root: {
  
    display: 'flex',
    // width: '100%',
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
 
  
});

class NavBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            user:'',
            mobileOpen: false,
        }
        
    }
    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
      };

      

    componentDidMount(){
    this.getLoggedUser();

    }
     getLoggedUser = () =>{
        let cookie =  getCookie('APPCARBU_COOKIE');
        
         if(cookie) {
            userService.loginExistingUser(cookie)
                .then(data =>{
                    this.setState({user:data.user},
                        window.localStorage.setItem("role", data.user.role)
                        );
            });
         }
      }
      
    goToUsers = () => {
       
            history.push('/app/users');
      }
    goToCuve = () => {
       
        history.push('/app/cuve');
    }
    goToStation = () => {
       
        history.push('/app/station');
    }
    goToRajoutCuve = () => {
       
        history.push('/app/rajout');
    }
    goToDashboard = () => {
       
    history.push('/app/dashboard');
   }
   goToRavi = () => {
       
    history.push('/app/ravitaillement');
}

 goToVehecule = () => {
       
    history.push('/app/vehicule');
}
goToLogout = () => {

//    deleteAllCookies();
//    setCookie('APPCARBU_COOKIE','');
   delCookies();
   setCookie('APPCARBU_COOKIE','');
   this.setState({user:''});
   console.log('DECONNEXION');
  history.push('/');

}
  
    render(){

    const { classes, theme } = this.props;
    const admin = (
        <div>
        <Button color="inherit" onClick={this.goToDashboard}>
            <DashboardIcon/>Tableau de bord
        </Button>
        <Button color="inherit"  onClick={this.goToUsers}>
             <PeopleAltIcon/>Utilisateurs
        </Button>
        <Button color="inherit" onClick={this.goToStation}> 
            <EvStationIcon/>Station
        </Button>
        <Button color="inherit" onClick={this.goToCuve}>
            <LocalShippingIcon/>Cuve
        </Button>

        <Button color="inherit" onClick={this.goToRajoutCuve}>
            <AddCircleIcon/>Rajout Cuve
        </Button>
        <Button color="inherit" onClick={this.goToVehecule}>
             <DriveEtaIcon/> Vehicule
       </Button> 
        <Button color="inherit" onClick={this.goToRavi}>
            <LocalGasStationIcon/>Ravitaillement
        </Button>
        <Button color="inherit" onClick={this.goToLogout}>
             <ExitToAppIcon/>
             Logout
             </Button>
    </div>
    

    );

    const agent =(
        <div>
                                  <Button color="inherit" href="/app/dashboard">
                                      <DashboardIcon/>Dashboard
                                  </Button>
                                  
                                  <Button color="inherit"  href="/app/cuve">
                                      <LocalShippingIcon/>Cuve
                                  </Button>

                                  <Button color="inherit" href="/app/rajout">
                                      <LocalGasStationIcon/>Rajout Cuve
                                  </Button>
                                  
                                  <Button color="inherit" href="/app/ravitaillement">
                                      <LocalGasStationIcon/>Ravitaillement
                                  </Button>
                                  <Button color="inherit" onClick={this.goToLogout}>
                                      <ExitToAppIcon/>
                                      Logout
                              </Button>
                       </div>

    );

    return (
        <div >
        <AppBar  position="static" style={{marginBottom:'30px'}}>
                <Toolbar>
                <IconButton
                    color="inherit"
                    edge="start"
                    aria-label="Open drawer"
                    onClick={this.handleDrawerToggle}
                    className={classes.navIconHide}
                    >
                  <MenuIcon />
                </IconButton>
                    <Avatar src={logo}/>
                    <Typography variant="h6"  style={{paddingRight:'60px'}}>
                        SASTRANS
                    </Typography>
                    <Hidden smDown implementation="css">
        
         {this.state.user.role === "Admin"
                     ?(
                    <div>
                     {admin}
                    </div>
                      )
                      :this.state.user.role === "Agent"
                      ?(
                        <div>
                         {agent}
                       </div>
                          
                       ):null
                  }
       
          </Hidden>
                </Toolbar>
            </AppBar>
            <Hidden mdUp>
            <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <div className={classes.toolbar} >
               {this.state.user.role === "Admin"
                           ?(
                            <div>
                            <Button color="primary" onClick={this.goToDashboard}>
                                <DashboardIcon/>Tableau de bord
                            </Button>
                            <Button color="primary"  onClick={this.goToUsers}>
                                 <PeopleAltIcon/>Utilisateurs
                            </Button>
                            <Button color="primary" onClick={this.goToStation}> 
                                <EvStationIcon/>Station
                            </Button><br/>
                            <Button color="primary" onClick={this.goToCuve}>
                                <LocalShippingIcon/>Cuve
                            </Button>
                    
                            <Button color="primary" onClick={this.goToRajoutCuve}>
                                <AddCircleIcon/>Rajout Cuve
                            </Button>
                            <Button color="primary" onClick={this.goToVehecule}>
                                 <DriveEtaIcon/> Vehicule
                           </Button> 
                            <Button color="primary" onClick={this.goToRavi}>
                                <LocalGasStationIcon/>Ravitaillement
                            </Button>
                            <Button color="primary" onClick={this.goToLogout}>
                                 <ExitToAppIcon/>
                                 Logout
                                 </Button>
                             </div>
                            )
                            :this.state.user.role === "Agent"?
                               (
                                <div>
                                  <Button color="primary" href="/app/dashboard">
                                      <DashboardIcon/>Tableau de Bord
                                  </Button>
                                  
                                  <Button color="primary"  href="/app/cuve">
                                      <LocalShippingIcon/>Cuve
                                  </Button>

                                  <Button color="primary" href="/app/rajout">
                                      <LocalGasStationIcon/>Rajout Cuve
                                  </Button>
                                  
                                  <Button color="primary" href="/app/ravitaillement">
                                      <LocalGasStationIcon/>Ravitaillement
                                  </Button>
                                  <Button color="primary" onClick={this.goToLogout}>
                                      <ExitToAppIcon/>
                                      Logout
                              </Button>
                       </div>
                             
                               )
                               :null
                         
                }
            </div>
                 </Drawer>
         </Hidden>
        </div>
    );
}
}
  NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};
  
export default withStyles(styles, { withTheme: true })(NavBar);
