import React from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { vehiculeService } from "../../service/vehiculeService";
import { cuveService } from "../../service/cuveService";
import { photoService } from "../../service/photoService";
import { imageDefault } from "../../static/images/logoSastrans.png";
import {
  Paper,
  withStyles,
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@material-ui/core";

const styles = (theme) => ({
  margin: {
    margin: theme.spacing(2),
  },
  media: {
    height: "150px",
    width: "200px",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
    width: "350px",
  },
  paper: {
    width: "50%",
    padding: theme.spacing(4),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
});
class VehiculeAddComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cuves: [],
      cuveName: "",
      immatricule: "",
      kilometrageInitial: "",
      capacityReservoir: "",
      statut: "",
      categorie: "",
      alertOpen: false,
      selected: "IN",
      imgPreview: null,
      // idVehicule:"",
      message: null,
      formData: new FormData(),
    };
  }

  componentDidMount() {
    this.reloadCuveList();
    // this.setState({cuveName: 'StationMobile'})
  }

  reloadCuveList = () => {
    cuveService.getAllCuves().then((res) => {
      res.map((dt, i) => this.setState({ cuveName: dt.cuveName }));
      console.log("cuve", this.state.cuveName);
    });
  };
  createVehicule = (e) => {
    e.preventDefault();
    let vehicule = {
      cuveName: this.state.cuveName,
      immatricule: this.state.immatricule,
      capacityReservoir: this.state.capacityReservoir,
      statut: this.state.statut,
      categorie: this.state.categorie,
      kilometrageInitial: this.state.kilometrageInitial,
      // ,idVehicule:this.state.idVehicule
    };

    // if (this.state.formData.get("imageFile") === null) {
    //   this.state.formData.append("imageFile", null);
    // }
    // console.log(this.state.formData.get("imageFile"));

    // this.state.formData.append("vehicule", JSON.stringify(vehicule));
    // console.log(this.state.formData.get("vehicule"));
    vehiculeService
      .createVehicule(vehicule)
      .then((res) => {
        if (!res.error) {
          console.log("SUCCESS TO ADD VEHICULE");
          this.setState({ message: "Ajout vehicule reussi" });
          this.setState({ alertOpen: true });
        }
        // if (res.message) {
        //   console.log("SUCCESS TO ADD VEHICULE");
        //   this.setState({ message: "Ajout vehicule reussi" });
        //   this.setState({ alertOpen: true });}
      })
      .catch(() => {
        console.log("ERROR TO ADD VEHICULE");
        this.setState({ message: "Echec Ajout vehicule" });
        this.setState({ alertOpen: true });
        // console.log("ERROR TO ADD VEHICULE");
        // this.setState({ message: "Echec Ajout vehicule" });
        // this.setState({ alertOpen: true });
      });
    console.log("vehicule", vehicule);
  };

  handleClose = () => {
    this.setState({ alertOpen: false });
    this.props.history.push("/app/vehicule");
  };
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  // uploadSingleFile = (e) => {
  //   let file = e.target.files[0];
  //   this.setState({ imgPreview: URL.createObjectURL(file) });
  //   const formData = new FormData();
  //   console.log(file);
  //   formData.append("imageFile", file);
  //   this.setState({ formData: formData });
  //   console.log(formData);};
  render() {
    const { classes } = this.props;

    return (
      <Grid
        container
        alignItems="center"
        justify="center"
        style={{ marginTop: "30px" }}
      >
        <Paper className={classes.paper}>
          <Typography
            variant="h4"
            align="center"
            style={{
              marginBottom: "30px",
            }}
          >
            Ajouter Véhicule
          </Typography>
          <Grid container direction="column" alignItems="center" spacing={3}>
            {/* <Grid item md={12} sm={12} xs={12}>
              <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    component="img"
                    alt="photo vehicule"
                    image={this.state.imgPreview}
                    title="photo vehicule"
                  />
                </CardActionArea>
                <CardActions>
                  <Button
                    variant="contained"
                    component="label"
                    color="secondary"
                    className={classes.button}
                  >
                    <Typography align="center">Charger Image</Typography>

                    <input
                      id={"file-input"}
                      style={{ display: "none" }}
                      type="file"
                      name="imageFile"
                      onChange={this.uploadSingleFile}
                    />
                  </Button>
                </CardActions>
              </Card>
            </Grid>
 */}
            <Grid item md={12} sm={12} xs={12}>
              <TextField
                className={classes.formControl}
                id="immatricule"
                variant="outlined"
                label="Immatricule"
                type="text"
                name="immatricule"
                value={this.state.immatricule}
                onChange={this.onChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item md={12} sm={12} xs={12}>
              <FormControl className={classes.formControl}>
                <InputLabel id="roleId">
                  {""}
                  Statut
                </InputLabel>
                <Select
                  name="statut"
                  id="statut"
                  variant="outlined"
                  value={this.state.statut}
                  onChange={this.onChange}
                >
                  <MenuItem value={"patrouille"}>Patrouille</MenuItem>
                  <MenuItem value={"remorque"}>Remorque</MenuItem>
                  <MenuItem value={"passage"}>Passage</MenuItem>
                  <MenuItem value={"coordination"}>Coordination</MenuItem>
                  <MenuItem value={"staff"}>Staff</MenuItem>
                  <MenuItem value={"viabilite"}>Viabilite</MenuItem>
                  <MenuItem value={"autres"}>Autres</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={12} sm={12} xs={12}>
              <FormControl className={classes.formControl}>
                <InputLabel id="roleId">
                  {""}
                  Categorie
                </InputLabel>
                <Select
                  name="categorie"
                  id="categorie"
                  variant="outlined"
                  value={this.state.categorie}
                  onChange={this.onChange}
                >
                  <MenuItem value="VL">VL</MenuItem>
                  <MenuItem value="PL">PL</MenuItem>
                  <MenuItem value={"autres"}>Autres</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={12} sm={12} xs={12}>
              <TextField
                className={classes.formControl}
                id="kilometrageInitial"
                variant="outlined"
                label="Kilometrage "
                type="number"
                name="kilometrageInitial"
                value={this.state.kilometrageInitial}
                onChange={this.onChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item md={12} sm={12} xs={12}>
              <TextField
                className={classes.formControl}
                id="capacityReservoir"
                variant="outlined"
                label="Capacité Réservoir"
                type="number"
                name="capacityReservoir"
                value={this.state.capacityReservoir}
                onChange={this.onChange}
                fullWidth
                required
              />
            </Grid>
          </Grid>
          <Grid container style={{ marginTop: "30px" }}>
            <Grid item md={4} sm={4} xs={4}></Grid>
            <Grid item md={4} sm={4} xs={4}>
              <Button
                variant="contained"
                fullWidth
                color="primary"
                onClick={this.createVehicule}
              >
                Ajouter Vehicule
              </Button>
            </Grid>
            <Grid item md={4} sm={4} xs={4}></Grid>
          </Grid>
        </Paper>

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
