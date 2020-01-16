import React from 'react';
import Typography from '@material-ui/core/Typography';
import {vehiculeService} from '../../service/vehiculeService';
import {cuveService} from '../../service/cuveService'
import { Paper, withStyles, Grid, TextField, Button,Select,MenuItem,InputLabel,FormControl} from '@material-ui/core';

const styles = theme => ({
    margin: {
        margin: theme.spacing(2) ,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
    paper: {
        padding: theme.spacing(1),
        
       
    }
    ,  selectEmpty: {
        marginTop: theme.spacing(2),
      }
});
class VehiculeAddComponent extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            cuves:[],
            cuveName: '',
            immatricule:'',
            kilometrageInitial: '',
            capacityReservoir:'',
            selected:'IN',
            message: null
        }
        
    }
    componentDidMount() {
           this.reloadCuveList();
        // this.setState({cuveName: 'StationMobile'})
    }

    reloadCuveList = () => {
        cuveService.getAllCuves()
            .then((res) => {
                res.map((dt, i) => {
                this.setState({cuveName:dt.cuveName})
                })  
            });
    }
    createVehicule = (e) => {
        e.preventDefault();
        let vehicule = {cuveName:this.state.cuveName,immatricule: this.state.immatricule, capacityReservoir: this.state.capacityReservoir,kilometrageInitial: this.state.kilometrageInitial};
        vehiculeService.createVehicule(vehicule)
            .then(res => {
                this.setState({message : 'Vehicule Ajouté avec succes'});
                this.props.history.push('/app/vehicule');
                
            });
        // console.log("vehicule",vehicule);
       
    }

    
    onChange = (e) =>this.setState({ [e.target.name]: e.target.value });

    render() {
        const { classes } = this.props;
        return (
            <Grid container alignItems="center" justify="center" style={{ marginTop:'30px'}} >
                <Grid item>
               <Paper className={classes.paper }>
                <div className={classes.margin}>
                <form >
                <Typography variant="h4" style={{ display: 'flex',justifyContent:'center' ,marginBottom:'30px'}} >Ajouter Véhicule</Typography>
                    <Grid container spacing={4} alignItems="center">
                       {/* <Grid item md={true} sm={true} xs={12}> */}
                         {/* <TextField id="cuvename" variant="outlined" label="Nom Cuve" type="text" name="cuveName" value={this.state.cuveName} onChange={this.onChange} fullWidth  autoFocus disabled required /> */}
                        {/* <FormControl  className={classes.formControl}>
                        <InputLabel   id='cuveId'>Nom Cuve</InputLabel>
                        <Select  
                        
                            name='cuveName'
                            id='cuveId'  
                            value={this.state.cuveName} 
                            onChange={this.onChange}
                            >

                        {this.state.cuves.map((dt, i) =>  (
                                    <MenuItem
                                        value={dt.cuveName}
                                        key={i} name={dt.cuveName}>{dt.cuveName}
                                    </MenuItem>     
                                ))
                            }
                        </Select>
                        </FormControl> */}
                        {/* </Grid> */}
                        <Grid item md={12} sm={12} xs={12}>
                        <TextField id="immatricule" variant="outlined" label="Immatricule" type="text" name="immatricule" value={this.state.immatricule} onChange={this.onChange} fullWidth required />
                        </Grid>
                        <Grid item md={12} sm={12} xs={12}>
                        <TextField id="kilometrageInitial" variant="outlined" label="Kilometrage " type="number" name="kilometrageInitial" value={this.state.kilometrageInitial} onChange={this.onChange} fullWidth  required />
                        </Grid>
                    
                    
                        <Grid item md={12} sm={12} xs={12}>
                        <TextField id="capacityReservoir" variant="outlined" label="Capacité Réservoir" type="number" name="capacityReservoir" value={this.state.capacityReservoir} onChange={this.onChange} fullWidth  required />
                        </Grid>
                     
                    </Grid>
                    <Grid container style={{ marginTop: '30px' }}>
                    <Grid item md={4} sm={4} xs={4}>
                      
                        </Grid>
                        <Grid item md={4} sm={4} xs={4}>
                        <Button variant="contained"  color="primary" onClick={this.createVehicule} >Ajouter Vehicule</Button>
                        </Grid>
                        <Grid item md={4} sm={4} xs={4}>
                      
                      </Grid>

                    </Grid>
                </form>
                </div>
            </Paper>
            </Grid>
            </Grid>
        );
    }
}
export default withStyles(styles)(VehiculeAddComponent);
