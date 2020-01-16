import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { Paper, withStyles, Grid, TextField, Button,Select,MenuItem,InputLabel,FormControl} from '@material-ui/core';
import {userService} from '../../service/userService';
const styles = theme => ({
    margin: {
        margin: theme.spacing(2) ,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 250,
      },
    paper: {
        padding: theme.spacing(1),
        
    }
    ,  selectEmpty: {
        marginTop: theme.spacing(2),
      }
});
class UserAddComponent extends Component {
    constructor(props){
        super(props);
        this.state ={
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            email: '',
            confirmPassword: '',
            role:'',
            message: null
        }
        
    }

    createUser = (e) => {
        e.preventDefault();
        let user = {username: this.state.username, 
            password: this.state.password, 
            firstName: this.state.firstName, 
            lastName: this.state.lastName, 
            email: this.state.email, 
            confirmPassword: this.state.confirmPassword,
            role:this.state.role
        };
        userService.register(user)
            .then(res => {
                this.setState({message : 'User added successfully.'});
                this.props.history.push('/app/users');
            });
            console.log("USER",user);
    }

    onChange = (e) =>this.setState({ [e.target.name]: e.target.value });

    render() {
        const { classes } = this.props;
        return(
            <Grid container justify="center" spacing={4} alignItems="center">
            <Grid item md={6} sm={12} xs={12}>
            <Paper className={classes.paper }>
            <div className={classes.margin}>
            <Typography variant="h4" style={{ display: 'flex',justifyContent:'center' ,marginBottom:'30px'}} >Ajout Utilisateur</Typography>
          
                <form>
                <Grid container  spacing={4} alignItems="center">
                  
                   <Grid item md={6}  sm={12} xs={12}>
                    <TextField type="text" label="username" variant="outlined" margin="normal" name="username" value={this.state.username} onChange={this.onChange} fullWidth required />
                    </Grid> 
                    <Grid item md={6} sm={12} xs={12}>
                    <TextField label="First Name" variant="outlined" margin="normal" name="firstName" value={this.state.firstName} onChange={this.onChange} fullWidth required/>
                    </Grid> 
                    <Grid item md={6} sm={12} xs={12}>
                    <TextField label="Last name" variant="outlined" margin="normal" name="lastName" value={this.state.lastName} onChange={this.onChange} fullWidth  required/>
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                    <TextField type="email" label="E-mail" variant="outlined" margin="normal" name="email" value={this.state.email} onChange={this.onChange} fullWidth required/>
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                    <TextField type="password" label="password" variant="outlined" margin="normal" name="password" value={this.state.password} onChange={this.onChange} fullWidth required/>
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                    <TextField type="password" label="Confirm Password" variant="outlined" margin="normal" name="confirmPassword" value={this.state.confirmPassword} onChange={this.onChange} fullWidth required/>
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                        <FormControl  className={classes.formControl}>
                                <InputLabel  id='roleId'>Role</InputLabel>
                                <Select   
                                    name='role'
                                    id='roleId'  
                                    value={this.state.role} 
                                    onChange={this.onChange}
                                    >
                                            <MenuItem
                                                value={"Agent"}>Agent
                                            </MenuItem>
                                            <MenuItem
                                                value={"Admin"}>Admin
                                            </MenuItem>
                            </Select>
                        </FormControl> 
                        </Grid>
                </Grid> 
               
                <Grid container justify="center" spacing={3} alignItems="center">
                <Grid item md={6} sm={4} xs={12}>
                                <Button variant="contained" style={{ marginTop:'30px'}} fullWidth color="primary" onClick={this.createUser}>Valider</Button>
                    </Grid>
                </Grid> 
            
         
            
              </form>
        </div >
        </Paper>
        </Grid> 
               </Grid>
             
          
               
          
        );
    }
}
// const formContainer = {
//     display: 'flex',
//     flexFlow: 'row wrap'
// };

// const style ={
//     display: 'flex',
//     justifyContent: 'center'

//}
export default withStyles(styles)(UserAddComponent);
