import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import {Paper,withStyles} from '@material-ui/core'; 
import TableContainer from '@material-ui/core/TableContainer';  
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import {userService} from '../../service/userService'

const styles = theme => ({
    margin: {
        margin: theme.spacing(8) ,
    },
    paper: {
        padding: theme.spacing(1),
        
       
    }
});
const style ={
    display: 'flex',
    justifyContent: 'center'
}
class UserListComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            message: null
        }
       
    }
componentDidMount() {
        this.reloadUserList();
    }


reloadUserList = () => {
        userService.getAllUsers()
            .then((res) => {
                this.setState({users: res})
            });
    }

deleteUser = (userId) =>{
        // ApiService.deleteUser(userId)
        //    .then(res => {
        //        this.setState({message : 'User deleted successfully.'});
        //        this.setState({users: this.state.users.filter(user => user.id !== userId)});
        //    })
    }

editUser = (id) =>{
        window.localStorage.setItem("userId", id);
        this.props.history.push('/app/edit-user');
    }

addUser = () =>{
        window.localStorage.removeItem("userId");
        this.props.history.push('/app/add-user');
    }
render(){
    const { classes } = this.props;
return(

<div>
<Typography variant="h4"  style={style}>Liste Utilisateur</Typography>
<Button variant="contained" style={{marginBottom:'20px'}} color="primary" onClick={() => this.addUser()}>
        Add User
</Button>

<Paper  style={{marginTop:'20px'}}className={classes.root}>  
      <TableContainer className={classes.container}>  
        <Table stickyHeader aria-label="sticky table">  
    <TableHead>
        <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>FirstName</TableCell>
            <TableCell align="center">LastName</TableCell>
            <TableCell align="center">UserName</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Role</TableCell>
            <TableCell align="center">Actions</TableCell>
        </TableRow>
    </TableHead>
    <TableBody>
        {this.state.users.map(row => (
            <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                    {row.id}
                </TableCell>
                <TableCell align="center">{row.firstName}</TableCell>
                <TableCell align="center">{row.lastName}</TableCell>
                <TableCell align="center">{row.username}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{row.role}</TableCell>
                <TableCell align="right" onClick={() => this.editUser(row.id)}><CreateIcon /></TableCell>
                <TableCell align="right" onClick={() => this.deleteUser(row.id)}><DeleteIcon /></TableCell> 

            </TableRow>
        ))}
    </TableBody>
  </Table>
  </TableContainer>
</Paper>
   </div>
        );
    }
}
export default withStyles(styles)(UserListComponent);
