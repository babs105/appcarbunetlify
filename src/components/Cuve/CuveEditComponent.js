import React, { Component } from 'react';

import Typography from '@material-ui/core/Typography';
import { Paper, withStyles, Grid, TextField, Button} from '@material-ui/core';
import {cuveService} from '../../service/cuveService';


const styles = theme => ({
    margin: {
        margin: theme.spacing(2) ,
    },
    paper: {
        padding: theme.spacing(1),
        width: theme.spacing(75),
       
    }
});

class CuveEditComponent extends Component {
    constructor(props){
        super(props);
        this.state ={
            idCuve:'',
            cuveName: '',
            capacityCuve:'',
            quantityInitCuve: '',
            quantityCurrentCuve:''
        }
        
    }

    componentDidMount() {
        this.loadCuve();
    }

    loadCuve = () => {
        cuveService.getCuveById(window.localStorage.getItem("cuveId"))
            .then((res) => {
                let cuve = res;
                console.log("CUVE",cuve)
                this.setState({
                idCuve: cuve.id,
                cuveName: cuve.cuveName,
                capacityCuve: cuve.capacityCuve,
                quantityInitCuve: cuve.quantityInitCuve,
                quantityCurrentCuve: cuve.quantityCurrentCuve
                })
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    updateCuve = (e) => {
        e.preventDefault();
        let cuve = {id: this.state.idCuve, cuveName: this.state.cuveName,capacityCuve: this.state.capacityCuve, quantityInitCuve: this.state.quantityInitCuve, quantityCurrentCuve: this.state.quantityCurrentCuve};
        cuveService.createCuve(cuve)
            .then(res => {
                this.setState({message : 'Cuve Editied successfully.'});
                this.props.history.push('/app/cuve');
            });
           
    }

    render() {
        const { classes } = this.props;
        return (
            <Grid container alignItems="center" justify="center" style={{ marginTop:'30px'}} >
            <Grid item>
           <Paper className={classes.paper }>
            <div className={classes.margin}>
            <form >
            <Typography variant="h4" style={{ display: 'flex',justifyContent:'center' ,marginBottom:'30px'}} >Editer Cuve</Typography>
                <Grid container spacing={8} alignItems="center">
                   <Grid item md={true} sm={true} xs={true}>
                    <TextField id="cuvename" variant="outlined" label="Nom Cuve" type="text" name="cuveName" value={this.state.cuveName} onChange={this.onChange} fullWidth  autoFocus required />
                    </Grid>
                    <Grid item md={true} sm={true} xs={true}>
                    <TextField id="capacity" variant="outlined" label="Capacité" type="number" name="capacityCuve" value={this.state.capacityCuve} onChange={this.onChange} fullWidth  required />
                    </Grid>
                
                
                    <Grid item md={true} sm={true} xs={true}>
                    <TextField id="quantityInitCuve" variant="outlined" label="Quantité Initiale" type="number" name="quantityInitCuve" value={this.state.quantityInitCuve} onChange={this.onChange} fullWidth  required />
                    </Grid>
                    <Grid item md={true} sm={true} xs={true}>
                    <TextField id="quantityCurrentCuve" variant="outlined" label="Quantité actuelle" type="number" name="quantityCurrentCuve" value={this.state.quantityCurrentCuve} onChange={this.onChange} fullWidth  required  />
                    </Grid>
                </Grid>
                <Grid container style={{ marginTop: '30px' }}>
                    <Button variant="contained" fullWidth color="primary" onClick={this.updateCuve} >Editer </Button>
                </Grid>
            </form>
            </div>
        </Paper>
        </Grid>
        </Grid>
        );
    }
}
export default withStyles(styles)(CuveEditComponent);
