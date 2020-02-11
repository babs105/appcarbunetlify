import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import MenuIcon from '@material-ui/icons/Menu';
import {getCookie,setCookie,delCookies } from '../../../utils/Cookie';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import LocalGasStationIcon from '@material-ui/icons/LocalGasStation';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EvStationIcon from '@material-ui/icons/EvStation';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { history } from '../../../routage/ExtBrowserRouter';
import {userService} from '../../../service/userService';
import logo from '../../../../src/static/images/route.png';


const style = {
    flexGrow: 1

}

  
class NavBar extends Component{
    constructor(props){
        super(props);

        this.state = {
            user:''
        }
        
    }


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
    return (
        <div>
            <AppBar position="static" style={{marginBottom:'30px'}}>
                <Toolbar>
                    <Avatar src={logo}/>
                    <Typography variant="h6"  style={style}>
                        SASTRANS
                    </Typography>
                        {this.state.user.role === "Admin"
                           ? (
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
                            )
                            :this.state.user.role === "Agent"?(
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
                             </div>):null
                             

                         
                            
                        }
                        
    
                        
                           
                            
                            
                        
                     
                </Toolbar>
            </AppBar>
        </div>
    );
}
}
export default NavBar;