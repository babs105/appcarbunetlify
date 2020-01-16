import React from 'react';
import Typography from '@material-ui/core/Typography';
import {cuveService} from '../../service/cuveService';
import { Paper, withStyles, Grid, TextField, Button} from '@material-ui/core';

const styles = theme => ({
    margin: {
        margin: theme.spacing(2) ,
    },
    paper: {
        padding: theme.spacing(1),
        
       
    }
});
class CuveAddComponent extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            cuveName: '',
            capacityCuve: '',
            quantityInitCuve:'',
            message: null
        }
        
    }
    createCuve = (e) => {
        e.preventDefault();
        let cuve = {cuveName: this.state.cuveName, capacityCuve: this.state.capacityCuve,quantityInitCuve: this.state.quantityInitCuve};
       cuveService.createCuve(cuve)
            .then(res => {
                this.setState({message : 'cuve initialisée avec succes'});
                this.props.history.push('/app/cuve');
                
            });
        console.log("cuve",cuve);
       
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
                <Typography variant="h4" style={{ display: 'flex',justifyContent:'center' ,marginBottom:'30px'}} >Initialiser Cuve</Typography>
                    <Grid container spacing={9} alignItems="center">
                       <Grid item md={true} sm={true} xs={true}>
                        <TextField id="cuvename" variant="outlined" label="Nom Cuve" type="email" name="cuveName" value={this.state.cuvName} onChange={this.onChange} fullWidth  autoFocus required />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                        <TextField id="capacity" variant="outlined" label="Capacité" type="number" name="capacityCuve" value={this.state.capacityCuve} onChange={this.onChange} fullWidth  required />
                        </Grid>
                    
                    
                        <Grid item md={true} sm={true} xs={true}>
                        <TextField id="quantityInitCuve" variant="outlined" label="Quantité Initiale" type="number" name="quantityInitCuve" value={this.state.quantityInitCuve} onChange={this.onChange} fullWidth  required />
                        </Grid>
                     
                    </Grid>
                    <Grid container style={{ marginTop: '30px' }}>
                        <Button variant="contained" fullWidth color="primary" onClick={this.createCuve} >Initialiser Cuve</Button>
                    </Grid>
                </form>
                </div>
            </Paper>
            </Grid>
            </Grid>
        );
    }
}
export default withStyles(styles)(CuveAddComponent);
