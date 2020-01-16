import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {userService} from '../../service/userService';

class UserEditComponent extends Component {

    constructor(props){
        super(props);
        this.state ={
            id: '',
            username:'',
            firstName: '',
            lastName: '',
            email:'',
            password: '',
            confirmPassword: '',
        }
        
    }

    componentDidMount() {
        this.loadUser();
    }

    loadUser = () => {
        userService.getUserById(window.localStorage.getItem("userId"))
            .then((res) => {
                let user = res;
                this.setState({
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: user.confirmPassword,
                confirmPassword: user.confirmPassword,
                })
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    saveUser = (e) => {
        e.preventDefault();
        let user = {id: this.state.id, password: this.state.password,confirmPassword: this.state.confirmPassword, firstName: this.state.firstName, lastName: this.state.lastName, username: this.state.username, email: this.state.email};
        userService.register(user)
            .then(res => {
                this.setState({message : 'User added successfully.'});
                this.props.history.push('/app/users');
            });
    }

    render() {
        return (
            <div>
                <Typography variant="h4" style={style}>Edit User</Typography>
                <form>

                <TextField type="text" placeholder="username" fullWidth margin="normal" name="username" value={this.state.username} onChange={this.onChange}/>
                    <TextField placeholder="First Name" fullWidth margin="normal" name="firstName" value={this.state.firstName} onChange={this.onChange}/>
                    <TextField placeholder="Last name" fullWidth margin="normal" name="lastName" value={this.state.lastName} onChange={this.onChange}/>
                    <TextField type="email" placeholder="E-mail" fullWidth margin="normal" name="email" value={this.state.email} onChange={this.onChange}/>
                    <TextField type="password" placeholder="password" fullWidth margin="normal" name="password" value={this.state.password} onChange={this.onChange}/>
                    <TextField type="password" placeholder="Confirm Password" fullWidth margin="normal" name="confirmPassword" value={this.state.confirmPassword} onChange={this.onChange}/>

                        <Button variant="contained" color="primary" onClick={this.saveUser}>Save</Button>

                </form>
            </div>
        );
    }
}

const style ={
    display: 'flex',
    justifyContent: 'center'
}

export default UserEditComponent;