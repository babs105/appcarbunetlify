import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {vehiculeService} from '../../service/vehiculeService';
import {cuveService} from '../../service/cuveService'
import {photoService}  from '../../service/photoService'
import { Paper, withStyles, Grid ,TextField, Button,Select,MenuItem,InputLabel,FormControl} from '@material-ui/core';

const styles = theme => ({
    root: {
        maxWidth:200,
      },
      media: {
      
      },
    
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
            alertOpen:false,
            selected:'IN',
            // file:null,
            // idVehicule:"",
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
                console.log("cuve",this.state.cuveName);
            });
    }
    createVehicule = (e) => {
        e.preventDefault();
        let vehicule = {cuveName:this.state.cuveName,immatricule: this.state.immatricule, capacityReservoir: this.state.capacityReservoir,kilometrageInitial: this.state.kilometrageInitial
            // ,idVehicule:this.state.idVehicule
        };
        vehiculeService.createVehicule(vehicule)
            .then(res => {
                if(res.vehicule){

                console.log("SUCCESS TO ADD VEHICULE");
                this.setState({message : 'Ajout vehicule reussi'});
                this.setState({alertOpen : true});
               }else{
                console.log("ERROR TO ADD VEHICULE");
                this.setState({message : 'Echec Ajout vehicule'});
                this.setState({alertOpen : true});
            
               }
            });
       //  console.log("vehicule",vehicule);
       
    }

    handleClose = () => {
        this.setState({ alertOpen:false})
        this.props.history.push('/app/vehicule');
    
  };
    onChange = (e) =>this.setState({ [e.target.name]: e.target.value });

    // uploadSingleFile = (e) => {
    //     this.setState({file: URL.createObjectURL(e.target.files[0])
    //     })
    //     const formData = new FormData();
    //     formData.append('imageFile', e.target.files[0]);
    //     vehiculeService.upload(formData)
    //        .then(res => {
    //         this.setState({idVehicule:res})   
    //         console.log(this.state.idVehicule);
    //         alert("File uploaded successfully.")
    // })
    // }
    render() {
        const { classes } = this.props;
        let imgPreview;
        if (this.state.file) {
            imgPreview = this.state.file;
        }
        return (
            <Grid container alignItems="center" justify="center" style={{ marginTop:'30px'}} >
                <Grid item>
               <Paper className={classes.paper }>
                <div className={classes.margin}>
                <form >
                <Typography variant="h4" style={{ display: 'flex',justifyContent:'center' ,marginBottom:'30px'}} >Ajouter Véhicule</Typography>
                    <Grid container spacing={4} >
                    {/* <Grid item md={12} sm={12} xs={12} style={{ display: 'flex',justifyContent:'center'}}>

                         <Card className={classes.root}>
                                    <CardActionArea>
                                    <CardMedia
                                    className={classes.media}
                                        component="img"
                                        alt="photo vehicule"
                                        height="150"
                                        image={imgPreview}
                                        title="photo vehicule"
                                        />
                                        <CardContent>
                                        {/* <Typography gutterBottom variant="h5" component="h2">
                                            Lizard
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                            across all continents except Antarctica
                                        </Typography> 
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                    <Button
                                            variant="contained"
                                            component="label"
                                            className={classes.button}>
                                            <Typography>Select image</Typography>

                                            <input id={"file-input"} style={{ display: 'none' }} type="file" name="imageFile"
                                                onChange={this.uploadSingleFile} />
                                     </Button>
                                    
                                    </CardActions>
                     </Card>
                    </Grid> */}
                    <Grid  item md={12} sm={12} xs={12} style={{ display: 'flex',justifyContent:'center'}} >
                        
                        

                        </Grid>
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
                        <Button variant="contained" fullWidth  color="primary" onClick={this.createVehicule} >Ajouter Vehicule</Button>
                        </Grid>
                        <Grid item md={4} sm={4} xs={4}>
                      
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
export default withStyles(styles)(VehiculeAddComponent);
