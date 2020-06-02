import React from 'react';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {vehiculeService} from '../../service/vehiculeService';
import {ravitailleService} from '../../service/ravitailleService';
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
class RavitaillementAddComponent extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            vehicules:[],
            immatricules:'',
            dateRavitay:"",
            kilometrage: '',
            chauffeur:'',
            quantityRavitay:'',
            alertOpen:false,
            message: null,
            idUser:''
        }
        
    }
    componentDidMount() {
           this.reloadVehiculeList();
           this.setState(
               {idUser : window.localStorage.getItem('idUser')}
               );
           

    }

    reloadVehiculeList = () => {
        vehiculeService.getAllVehicules()
            .then(res => {
                this.setState({vehicules:res});
                console.log("data",this.state.vehicules);
            })  
         
            
    }
    ravitaillerVehicule = (e) => {
        e.preventDefault();
        let ravitaille = 
           {
            dateRavitay: this.state.dateRavitay,
            immatricule: this.state.immatricule,
            quantityRavitay: this.state.quantityRavitay,
            kilometrage: this.state.kilometrage,
            chauffeur: this.state.chauffeur,
            idUser:this.state.idUser
            };
        ravitailleService.ravitaillerVehicule(ravitaille)
            .then(res => {
                if(res.error){
                this.setState({message : 'Ravitaillement reussi'});
                this.setState({alertOpen : true});
            }else {
                    this.setState({message : 'Ravitaillement échoué'});
                    this.setState({alertOpen : true});
            }
                // 
                
            });
      //  console.log("ravitaille",ravitaille);
       
    }
    handleClose= () => {
            this.setState({ alertOpen:false})
            this.props.history.push('/app/ravitaillement');
        
      };

    onChange = (e) =>this.setState({ [e.target.name]: e.target.value });

    render() {
        const { classes } = this.props;
        return (
            <Grid container justify="center" spacing={4} alignItems="center">
            <Grid item md={6} sm={12} xs={12}>
            <Paper className={classes.paper }>
                <div className={classes.margin}>
                <form >
                <Typography variant="h4" style={{ display: 'flex',justifyContent:'center' ,marginBottom:'30px'}} >Ravitailler Véhicule</Typography>
                    <Grid container spacing={4} alignItems="center">
                       <Grid item md={12} sm={12} xs={12}> 
                         {/* <TextField id="cuvename" variant="outlined" label="Imma" type="text" name="cuveName" value={this.state.cuveName} onChange={this.onChange} fullWidth  autoFocus disabled required /> */}
                            <FormControl  className={classes.formControl}>
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
                        </FormControl> 
                    </Grid> 
                        <Grid item md={12} sm={12} xs={12}>
                        <TextField id="kilometrage" variant="outlined" label="Kilometrage " type="number" name="kilometrage" value={this.state.kilometrage} onChange={this.onChange} fullWidth  required />
                        </Grid>
                    
                        <Grid item md={12} sm={12} xs={12}>
                        <TextField id="quantityRavitay" 
                                     variant="outlined"
                                     label="Quantité Ravitaillée" 
                                     type="number"
                                    name="quantityRavitay" 
                                    value={this.state.quantityRavitay} 
                                    onChange={this.onChange} 
                                    fullWidth required />
                        </Grid>
                        <Grid item md={12} sm={12} xs={12}>
                        <TextField id="chauffeur" 
                                    variant="outlined"
                                    label="Prenom Nom Chauffeur" 
                                    type="text"
                                    name="chauffeur" 
                                    value={this.state.chauffeur} 
                                    onChange={this.onChange} 
                                    fullWidth required />
                        </Grid>
                        <Grid item md={12} sm={12} xs={12}>
                        <TextField
                                id="dateRavitay"
                                variant="outlined"
                                label="Date Ravitaillement"
                                name="dateRavitay"
                                 type="datetime-local"
                                value={this.state.dateRavitay}
                                onChange={this.onChange}
                                className={classes.textField}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                    </Grid>
                    </Grid> 
                    <Grid container justify="center" spacing={3} alignItems="center">
                        <Grid item md={6} sm={4} xs={12}>
                          <Button variant="contained"  color="primary" fullWidth onClick={this.ravitaillerVehicule} >Valider</Button>
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
export default withStyles(styles)(RavitaillementAddComponent);
