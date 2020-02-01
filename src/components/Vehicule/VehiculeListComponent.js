import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Paper,withStyles,Grid} from '@material-ui/core'; 
import TableContainer from '@material-ui/core/TableContainer'; 
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import {vehiculeService} from '../../service/vehiculeService';
import Loader from '../loader/Loader';
const styles = theme => ({
    margin: {
        margin: theme.spacing(8) ,
    },
    paper: {
        padding: theme.spacing(1),
        
       
    }
});
class VehiculeListComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            vehicules: [],
            message: null,
            loader:false
        }
       
    }
    componentDidMount() {
        this.reloadVehiculeList();
    }


    reloadVehiculeList = () => {
        this.setState({loader:true});
        vehiculeService.getAllVehicules()
            .then((res) => {
                this.setState({vehicules: res})
                this.setState({loader:false});
            });
    }

    deleteVehicule=(immatricule) =>{
        vehiculeService.deleteVehiculeByImmmatricule(immatricule)
           .then(res => {
               this.setState({message : 'Vehicule deleted successfully.'});
               this.setState({cuves: this.state.vehicules.filter(vehicule => vehicule.immatricule !== immatricule)});
           })
    }

    editVehicule=(immatricule) =>{
        window.localStorage.setItem("immatricule", immatricule);
        this.props.history.push('/app/edit-vehicule');
    }

    addVehicule=() =>{
        window.localStorage.removeItem("immatricule");
        this.props.history.push('/app/add-vehicule');
    }
render(){
    const { classes } = this.props;
return(
    
<div>
<Typography variant="h4"  style={style}>Liste des Véhicules</Typography>
<Button variant="contained" color="primary" onClick={() => this.addVehicule()}>
      Ajouter Véhicule
</Button>

<Paper  style={{marginTop:'20px'}}className={classes.root}>  
      <TableContainer className={classes.container}>  
        <Table stickyHeader aria-label="sticky table">  
    <TableHead>
        <TableRow>
            <TableCell align="center">Immatricule </TableCell>
            <TableCell align="center">kilometrage</TableCell>
            <TableCell align="center">Capacité Réservoir</TableCell>
            <TableCell align="center">Date</TableCell>
        </TableRow>
    </TableHead>
    <TableBody>
    {this.state.loader?
       <Grid container alignItems="center" justify="center" >
               
       <Grid item >
      <Paper >
       <div className={classes.margin}>
       <Loader/>
      
       </div>
    </Paper>
    </Grid>
   </Grid>

    :
        this.state.vehicules.map(row => (
            <TableRow key={row.id}>
                <TableCell align="center" component="th" scope="row">
                    {row.immatricule}
                </TableCell>
                <TableCell align="center">{row.kilometrageCurrent}</TableCell>
                <TableCell align="center">{row.capacityReservoir}</TableCell>
                <TableCell align="center">{row.dateCreated}</TableCell>
                <TableCell align="right" onClick={() => this.editVehicule(row.immatricule)}><CreateIcon /></TableCell>
                <TableCell align="right" onClick={() => this.deleteVehicule(row.immatricule)}><DeleteIcon /></TableCell> 
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
export default withStyles(styles)(VehiculeListComponent);
