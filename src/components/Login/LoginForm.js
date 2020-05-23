import React from 'react';
import Typography from '@material-ui/core/Typography';
import {userService} from '../../service/userService'
import { setCookie} from '../../utils/Cookie';
import { Paper, withStyles, Grid, TextField, Button, Card, CardContent, Avatar} from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons';
import Loader from '../loader/Loader';

import LockOpenIcon from '@material-ui/icons/LockOpen';
const styles = theme => ({
    margin: {
        margin: theme.spacing(2) ,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      avatar: {
        backgroundColor: theme.palette.warning.main,
        height: 70,
        width: 70
      },
      icon: {
        height: 40,
        width: 40
      },
    paper: {
        padding: theme.spacing(1),
        
       
    }
    ,  selectEmpty: {
        marginTop: theme.spacing(2),
      }
});
class LoginTab extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            username: '',
            password: '',
            message: null,
            loader:false
        }
        
    }

    loginUser = (e) => {
        e.preventDefault();
        this.setState({loader:true});
        let user = {username: this.state.username, password: this.state.password};
        userService.login(user)
            .then(res => {
                setCookie('APPCARBU_COOKIE',res.sessionCookie);
                this.setState({message : 'logging successfully.'});
                this.setState({loader:false});
                window.localStorage.setItem("idUser", res.user.id);

                this.props.history.push('/app');
            });
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    render() {
        const { classes } = this.props;
      return (
           this.state.loader?
           <Grid container alignItems="center" style={{marginTop:'95px'}} justify="center" >
               
                <Grid item >
               <Paper className={classes.paper }>
                <div className={classes.margin}>
                <Loader/>
               
                </div>
             </Paper>
             </Grid>
            </Grid>
         
            :
          ( 
            <Grid container alignItems="center" style={{marginTop:'95px'}} justify="center" >
               
                <Grid item >
               <Paper className={classes.paper }>
                <div className={classes.margin}>
                  
                <form>
                <Typography variant="h5" style={{color:'blue', display: 'flex',justifyContent:'center' ,marginBottom:'30px'}} >GESTION CARBURANT SASTRANS
                </Typography>
                <Grid container spacing={2} justify="center"  alignItems="center" style={{ marginBottom:'30px'}}>
                <Grid item >
                    <Avatar className={classes.avatar}>
                    <LockOpenIcon className={classes.icon} />
                    </Avatar>
                </Grid>
                </Grid>
              
                    <Grid container spacing={2} alignItems="center">
                        <Grid item md={1} sm={1} xs={1}>
                            <Face />
                        </Grid>
                        <Grid item md={11} sm={11} xs={11}>
                            <TextField id="username" variant="outlined" label="Username" type="email" name="username" value={this.state.username} onChange={this.onChange} fullWidth  autoFocus required />
                        </Grid>
                        <Grid  item md={1} sm={1} xs={1}>
                            <Fingerprint />
                        </Grid>
                        <Grid  item md={11} sm={11} xs={11}>
                            <TextField id="password"   variant="outlined" label="Password" type="password" name="password" value={this.state.password} onChange={this.onChange} fullWidth required />
                        </Grid>
                    </Grid>
                   
                    <Grid container style={{ marginTop: '30px',marginBottom:'70px' }}>
                        <Button variant="contained" fullWidth color="primary" onClick={this.loginUser} >Connexion</Button>
                    </Grid>
                </form>
                </div>
            </Paper>
            </Grid>
            </Grid>
        )
        )
 }
}
export default withStyles(styles)(LoginTab);