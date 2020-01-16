import React, { Component } from 'react';
import {Paper,withStyles} from '@material-ui/core';  
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';  
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import {cuveService} from '../../service/cuveService'

const styles = theme => ({
    margin: {
        margin: theme.spacing(8) ,
    },
    paper: {
        padding: theme.spacing(1),
        
       
    }
});

class CuveListComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            cuves: [],
            message: null
        }
       
    }
    componentDidMount() {
        this.reloadCuveList();
    }


    reloadCuveList = () => {
        cuveService.getAllCuves()
            .then((res) => {
                this.setState({cuves: res})
            });
    }

    deleteCuve=(cuveName) =>{
        cuveService.deleteCuveByCuveName(cuveName)
           .then(res => {
               this.setState({message : 'Cuve deleted successfully.'});
               this.setState({cuves: this.state.cuves.filter(cuve => cuve.cuveName !== cuveName)});
           })
    }

    editCuve=(cuveName) =>{
        window.localStorage.setItem("cuveName", cuveName);
        this.props.history.push('/app/edit-cuve');
    }

    addCuve=() =>{
        window.localStorage.removeItem("cuveName");
        this.props.history.push('/app/add-cuve');
    }
render(){
    const { classes } = this.props;
return(
<div>
<Typography variant="h4"  style={style}>Cuve List</Typography>
<Button variant="contained" color="primary" onClick={() => this.addCuve()}>
      Créer Cuve
</Button>
<Paper  style={{marginTop:'20px'}}className={classes.root}>  
      <TableContainer className={classes.container}>  
        <Table stickyHeader aria-label="sticky table">  
    <TableHead>
        <TableRow>
            <TableCell align="center">Cuve </TableCell>
            <TableCell align="center">Capacité Cuve</TableCell>
            <TableCell align="center">Quantité initiale</TableCell>
            <TableCell align="center">Quantité actuelle</TableCell>
            <TableCell align="center">Date</TableCell>
        </TableRow>
    </TableHead>
    <TableBody>
        {this.state.cuves.map(row => (
            <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                    {row.cuveName}
                </TableCell>
                <TableCell align="center">{row.capacityCuve}</TableCell>
                <TableCell align="center">{row.quantityInitCuve}</TableCell>
                <TableCell align="center">{row.quantityCurrentCuve}</TableCell>
                <TableCell align="center">{row.dateCurrentCuve}</TableCell>
                <TableCell align="right" onClick={() => this.editCuve(row.cuveName)}><CreateIcon /></TableCell>
                <TableCell align="right" onClick={() => this.deleteCuve(row.cuveName)}><DeleteIcon /></TableCell> 
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
const style ={
    display: 'flex',
    justifyContent: 'center'
}
export default withStyles(styles)(CuveListComponent);
