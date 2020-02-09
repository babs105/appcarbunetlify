import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Paper, Grid,withStyles} from '@material-ui/core';
import {ravitailleService} from '../../service/ravitailleService';
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
class RavitaillementEditComponent extends Component {

    constructor(props){
        super(props);
        this.state ={
            id: '',
            immatricule:'',
            dateRavitaillement:'',
            kilometrageCurrent: '',
            quantityRavitaillement:'',
            quantityCurrentCuve:'',
            alertOpen:false,
            message: null
        }
        
    }

    componentDidMount() {
        this.loadRavitaillement();
    }

    loadRavitaillement = () => {
        ravitailleService.getRavitaillementById(window.localStorage.getItem("IdRavitay"))
            .then((res) => {
                let ravitaillement = res;
                this.setState({
                id: ravitaillement.id,
                immatricule: ravitaillement.immatricule,
                dateRavitaillement: ravitaillement.dateRavitaillement,
                kilometrageCurrent: ravitaillement.kilometrageCurrent,
                quantityRavitaillement: ravitaillement.quantityRavitaillement,
                quantityCurrentCuve: ravitaillement.quantityCurrentCuve

                })
            });
    }
    handleClose= () => {
        this.setState({ alertOpen:false})
        this.props.history.push('/app/ravitaillement');
    
  };

    onChange = (e) =>
    this.setState({ [e.target.name]: e.target.value });

saveRavitaillement = (e) => {
    e.preventDefault();
    let ravitaillement = {dateRavitaillement: this.state.dateRavitaillement,id: this.state.id, immatricule: this.state.immatricule,kilometrageCurrent: this.state.kilometrageCurrent,quantityRavitaillement:this.state.quantityRavitaillement, quantityCurrentCuve: this.state.quantityCurrentCuve};
    ravitailleService.createOperation(ravitaillement)
        .then(res => {
            this.setState({message :' Ravitaillement modifié'});
            this.setState({alertOpen : true});
            
        });
    
}

    render() {
        const { classes } = this.props;
        return (
            <Grid container justify="center" spacing={4} alignItems="center">
            <Grid item md={6} sm={12} xs={12}>
            <Paper className={classes.paper }>
                <div className={classes.margin}>
                <form >
                <Typography variant="h4" style={{ display: 'flex',justifyContent:'center' ,marginBottom:'30px'}} >Modification Operation</Typography>
                    <Grid container spacing={4} alignItems="center">
                       <Grid item md={12} sm={12} xs={12}> 
                          <TextField id="immatricule" variant="outlined" label="immatricule" type="text" name="immatricule" value={this.state.immatricule} onChange={this.onChange} fullWidth  disabled required />
                            {/* <FormControl  className={classes.formControl}>
                                <InputLabel   id='immatriculeId'>Immatricule</InputLabel>
                                <Select  
                                    name='immatricule'
                                    id='immatriculeId'  
                                    value={this.state.immatricule} 
                                    onChange={this.onChange}
                                    >
                                {this.state.vehicules.map((dt, i) =>  (
                                    <MenuItem
                                        value={dt.immatricule}
                                        key={i} name={dt.immatricule}>{dt.immatricule}
                                    </MenuItem>     
                                ))
                            }
                            </Select>
                        </FormControl>  */}
                    </Grid> 
                        <Grid item md={12} sm={12} xs={12}>
                        <TextField id="kilometrage" variant="outlined" label="Kilometrage " type="number" name="kilometrageCurrent" value={this.state.kilometrageCurrent} onChange={this.onChange} fullWidth  required />
                        </Grid>
                    
                        <Grid item md={12} sm={12} xs={12}>
                        <TextField id="quantityRavitay" variant="outlined" label="Quantité Ravitaillée" type="number" name="quantityRavitaillement" value={this.state.quantityRavitaillement} onChange={this.onChange} fullWidth  required />
                        </Grid>
                        <Grid item md={12} sm={12} xs={12}>
                        <TextField id="quantityCurrentCuve" variant="outlined" label="Quantité Cuve " type="number" name="quantityCurrentCuve" value={this.state.quantityCurrentCuve} onChange={this.onChange} fullWidth disabled required />
                        </Grid>
                        <Grid item md={12} sm={12} xs={12}>
                        {/* <TextField
                                id="dateRavitay"
                                variant="outlined"
                                label="Date Ravitaillement"
                                name="dateRavitaillement"
                                type="datetime-local"
                                value={this.state.dateRavitaillement}
                                onChange={this.onChange}
                                className={classes.textField}
                                InputLabelProps={{
                                shrink: true,
                                }}
                                disabled
                            /> */}
                    </Grid>
                    </Grid> 
                    <Grid container justify="center" spacing={3} alignItems="center">
                        <Grid item md={6} sm={4} xs={12}>
                          <Button variant="contained"  color="primary" fullWidth onClick={this.saveRavitaillement} >Valider</Button>
                       </Grid>
                    </Grid>
                  
                

                </form>
                </div>
            </Paper>
            </Grid>
            <Dialog
                    open={this.state.alertOpen}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                <DialogTitle id="alert-dialog-title">{"INFORMATION"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                {this.state.message}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={this.handleClose} color="primary" autoFocus>
                   FERMER
                </Button>
        </DialogActions>
      </Dialog>
            </Grid>
        );
    }
}

const style ={
    display: 'flex',
    justifyContent: 'center'
}

export default withStyles(styles) (RavitaillementEditComponent);