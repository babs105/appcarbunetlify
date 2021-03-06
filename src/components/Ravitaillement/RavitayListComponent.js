import React from "react";
import Button from "@material-ui/core/Button";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";
import { Grid, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { ravitailleService } from "../../service/ravitailleService";
import { history } from "../../routage/ExtBrowserRouter";
import { useState, useEffect } from "react";
import Loader from "../loader/Loader";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});
const style = {
  display: "flex",
  justifyContent: "center",
};
const RavitayListComponent = () => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  useEffect(() => {
    setLoader(true);
    ravitailleService.getAllOperationsCuve().then((res) => {
      setData(res);
      setLoader(false);
      console.log(data);
    });
  }, []);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const onSearchInputChange = (event) => {
    console.log("Search changed ..." + event.target.value);
    if (event.target.value) {
      // this.setState({searchString: event.target.value})
      ravitailleService
        .searchRavitaillementByImmatricule(event.target.value)
        .then((res) => {
          console.log("result", res);
          setData(res);
          setLoader(false);
          console.log("FOUND", data);
        });
    } else {
      setLoader(true);
      ravitailleService.getAllOperationsCuve().then((res) => {
        setData(res);
        setLoader(false);
        console.log(data);
      });
    }
  };

  const addVehicule = () => {
    window.localStorage.removeItem("immatricule");
  };
  const soutirerVehicule = () => {
    window.localStorage.removeItem("immatricule");
  };
  const editRavitaillement = (id) => {
    window.localStorage.setItem("IdRavitay", id);
  };
  let i = 0;

  return (
    <div>
      <Typography variant="h4" style={style}>
        Liste Ravitaillements
      </Typography>
      <Grid container justify="space-between">
        <Grid item>
          <Button
            variant="contained"
            component={Link}
            to="/app/ravitaillement-vehicule"
            color="primary"
            onClick={addVehicule}
          >
            Ravitailler Véhicule
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/app/soutirement-vehicule"
            onClick={soutirerVehicule}
          >
            Soutirer Véhicule
          </Button>
        </Grid>
      </Grid>

      <Grid container alignItems="center" justify="center">
        <Paper>
          <TextField
            style={{ padding: 24 }}
            id="searchInput"
            placeholder="Rechercher"
            onChange={onSearchInputChange}
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Paper>
      </Grid>

      <Paper style={{ marginTop: "20px" }} className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center">N°: </TableCell>
                <TableCell align="center">DATE </TableCell>
                <TableCell align="center">QUANTITE RAVITAILLEE</TableCell>
                <TableCell align="center">QTE CUVE</TableCell>
                <TableCell align="center">IMMATRICULE</TableCell>
                <TableCell align="center">CATEGORIE</TableCell>
                <TableCell align="center">KILOMETRAGE</TableCell>
                <TableCell align="center">DIST.PARCOURUE</TableCell>
                <TableCell align="center">CONDUCTEUR</TableCell>

                <TableCell align="center">ACTIONS </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loader ? (
                <Grid container alignItems="center" justify="center">
                  <Grid item>
                    <Paper className={classes.paper}>
                      <div className={classes.margin}>
                        <Loader />
                      </div>
                    </Paper>
                  </Grid>
                </Grid>
              ) : (
                data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow key={row.id}>
                        <TableCell align="center">{(i = i + 1)}</TableCell>
                        <TableCell align="center" component="th" scope="row">
                          {row.dateRavitaillement}
                        </TableCell>
                        <TableCell align="center">
                          {row.quantityRavitaillement}
                        </TableCell>
                        <TableCell align="center">
                          {row.quantityCurrentCuve}
                        </TableCell>
                        <TableCell align="center">{row.immatricule}</TableCell>
                        <TableCell align="center">{row.categorie}</TableCell>
                        <TableCell align="center">
                          {row.kilometrageCurrent}
                        </TableCell>
                        <TableCell align="center">
                          {row.distanceParcourue}
                        </TableCell>
                        <TableCell align="center">{row.chauffeur}</TableCell>

                        <TableCell
                          align="right"
                          onClick={() => editRavitaillement(row.id)}
                        >
                          <CreateIcon />
                        </TableCell>
                        <TableCell align="right" onClick={() => {}}>
                          <DeleteIcon />
                        </TableCell>
                      </TableRow>
                    );
                  })
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};
export default RavitayListComponent;
