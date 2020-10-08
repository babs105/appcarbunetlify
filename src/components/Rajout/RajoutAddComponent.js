import React from "react";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { stationService } from "../../service/stationService";
import { cuveService } from "../../service/cuveService";
import { rajoutService } from "../../service/rajoutService";
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  paper: {
    padding: theme.spacing(1),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
});
class RajoutAddComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cuves: [],
      cuveName: "",
      stations: [],
      stationServiceName: "",
      dateRajout: "",
      qteRajout: "",
      alertOpen: false,
      message: null,
    };
  }
  componentDidMount() {
    this.reloadCuveList();
    this.reloadStationList();
  }

  reloadCuveList = () => {
    cuveService.getAllCuves().then((res) => {
      this.setState({ cuves: res });
      console.log("data", this.state.cuves);
    });
  };
  reloadStationList = () => {
    stationService.getAllStation().then((res) => {
      this.setState({ stations: res });
      console.log("data", this.state.stations);
    });
  };
  rajouterCuve = (e) => {
    e.preventDefault();
    let rajout = {
      dateRajout: this.state.dateRajout,
      qteRajout: this.state.qteRajout,
      cuveName: this.state.cuveName,
      stationServiceName: this.state.stationServiceName,
    };
    rajoutService.rajouterCuve(rajout).then((res) => {
      if (res.id) {
        this.setState({ message: "Rajout effectué avec succes" });
        this.setState({ alertOpen: true });
      } else {
        this.setState({ message: "Rajout échoué" });
        this.setState({ alertOpen: true });
      }
      //
    });
    // console.log("rajout",rajout);
  };
  handleClose = () => {
    this.setState({ alertOpen: false });
    this.props.history.push("/app/rajout");
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { classes } = this.props;
    return (
      <Grid container justify="center" spacing={4} alignItems="center">
        <Grid item md={6} sm={12} xs={12}>
          <Paper className={classes.paper}>
            <div className={classes.margin}>
              <Typography
                variant="h4"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "30px",
                }}
              >
                Rajout cuve
              </Typography>
              <form>
                <Grid container spacing={4} alignItems="center">
                  <Grid item md={6} sm={12} xs={12}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="cuveId">Nom Cuve</InputLabel>
                      <Select
                        name="cuveName"
                        id="cuveId"
                        value={this.state.cuveName}
                        onChange={this.onChange}
                      >
                        {this.state.cuves.map((dt, i) => (
                          <MenuItem
                            value={dt.cuveName}
                            key={i}
                            name={dt.cuveName}
                          >
                            {dt.cuveName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item md={6} sm={12} xs={12}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="stationId">Nom Station</InputLabel>
                      <Select
                        name="stationServiceName"
                        id="stationId"
                        value={this.state.stationServiceName}
                        onChange={this.onChange}
                      >
                        {this.state.stations.map((dt, i) => (
                          <MenuItem
                            value={dt.stationName}
                            key={i}
                            name={dt.stationName}
                          >
                            {dt.stationName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item md={6} sm={12} xs={12}>
                    <TextField
                      id="qteId"
                      variant="outlined"
                      label="Quantité Rajoutée"
                      type="number"
                      name="qteRajout"
                      value={this.state.qteRajout}
                      onChange={this.onChange}
                      required
                    />
                  </Grid>
                  <Grid item md={6} sm={12} xs={12}>
                    <TextField
                      id="dateId"
                      variant="outlined"
                      label="Date du Rajout"
                      name="dateRajout"
                      type="datetime-local"
                      value={this.state.dateRajout}
                      onChange={this.onChange}
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  justify="center"
                  alignItems="center"
                  style={{ marginTop: "30px" }}
                >
                  <Grid item md={6} sm={4} xs={4}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={this.rajouterCuve}
                    >
                      Valider
                    </Button>
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
            <Button onClick={this.handleClose} color="primary">
              FERMER
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    );
  }
}
export default withStyles(styles)(RajoutAddComponent);
