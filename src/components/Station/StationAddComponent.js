import React from 'react';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {stationService} from '../../service/stationService';
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
class StationAddComponent extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            stationName:'',
            adresse: '',
            tel:'',
            alertOpen:false,
            message: null
        }
        
    }
    // componentDidMount() {
    //        this.reloadStationList();
    // }

    // reloadStationList = () => {
    //     stationService.getAllStation()
    //         .then(res => {
    //             this.setState({stations:res});
    //             console.log("data",this.state.stations);
    //         })  
         
            
    // }
    ajouterStation = (e) => {
        e.preventDefault();
        let station = {stationName: this.state.stationName,adresse: this.state.adresse, tel: this.state.tel};
        stationService.createStation(station)
            .then(res => {
                if(res.id){
                this.setState({message : 'Station Ajoutée  avec succes'});
                this.setState({alertOpen : true});
            }else {
                    this.setState({message : 'Ajout échoué'});
                    this.setState({alertOpen : true});
            }
                // 
                
            });
        console.log("station",station);
       
    }
    handleClose= () => {
            this.setState({ alertOpen:false})
            this.props.history.push('/app/station');
        
      };

    onChange = (e) =>this.setState({ [e.target.name]: e.target.value });

    render() {
        const { classes } = this.props;
        return (
            <Grid container alignItems="center" justify="center" style={{ marginTop:'30px'}} >
                <Grid item>
               <Paper className={classes.paper }>
                <div className={classes.margin}>
                <form >
                <Typography variant="h4" style={{ display: 'flex',justifyContent:'center' ,marginBottom:'30px'}} >Ajouter Station</Typography>
                    <Grid container spacing={4} alignItems="center">
                       <Grid item md={12} sm={12} xs={12}> 
                          <TextField id="stationName" variant="outlined" label="Nom Station" type="text" name="stationName" value={this.state.stationName} onChange={this.onChange} fullWidth  autoFocus required /> 
                    
                        </Grid> 
                        <Grid item md={true} sm={true} xs={true}>
                        <TextField id="adresse" variant="outlined" label="Adresse" type="text" name="adresse" value={this.state.adresse} onChange={this.onChange} fullWidth required />
                        </Grid> 
                        <Grid item md={12} sm={12} xs={12}>
                        <TextField id="tel" variant="outlined" label="Telephone " type="number" name="tel" value={this.state.tel} onChange={this.onChange} fullWidth  required />
                        </Grid>
                    
                    <Grid container style={{ marginTop: '30px' }}>
                    <Grid item md={4} sm={4} xs={4}>
                      
                        </Grid>
                        <Grid item md={4} sm={4} xs={4}>
                        <Button variant="contained"  color="primary" onClick={this.ajouterStation} >Valider</Button>
                        </Grid>
                        <Grid item md={4} sm={4} xs={4}>
                      
                      </Grid>

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
                <Button onClick={this.handleClose} color="primary" fullWidth autoFocus>
                   FERMER
                </Button>
        </DialogActions>
      </Dialog>
            </Grid>
            
        );
    }
}
export default withStyles(styles)(StationAddComponent);
