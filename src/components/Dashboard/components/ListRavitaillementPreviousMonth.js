import React from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Grid, TextField } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import { ravitailleService } from "../../../service/ravitailleService";
import { ExportXlsx } from "../../Ravitaillement/ExportXlsx";
import Loader from "../../loader/Loader";
import { useState, useEffect } from "react";

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
export default function MatPaginationTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  useEffect(() => {
    ravitailleService.getAllOperationsCuveInPreviousMonth().then((res) => {
      setData(res);
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
      ravitailleService.getAllOperationsCuveInPreviousMonth().then((res) => {
        setData(res);
        setLoader(false);
        console.log(data);
      });
    }
  };
  let i = 0;

  return (
    <div>
      <Paper style={{ marginTop: "20px" }} className={classes.root}>
        <Typography
          variant="h5"
          style={{
            color: "orange",
            display: "flex",
            justifyContent: "center",
            paddingTop: "30px",
            marginBottom: "30px",
          }}
        >
          Ravitaillements du mois précédent
        </Typography>
        <Grid container alignItems="center" justify="center">
          <TextField
            style={{ padding: 24 }}
            id="searchInputPast"
            placeholder="Rechercher"
            margin="normal"
            onChange={onSearchInputChange}
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <ExportXlsx csvData={data} fileName={"RapportRavitaillement"} />
        </Grid>

        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center">N°: </TableCell>
                <TableCell align="center">DATE </TableCell>
                <TableCell align="center">QUANTITE RAVITAILLEE</TableCell>
                {/* <TableCell align="center">ETAT CUVE </TableCell> */}
                <TableCell align="center">IMMATRICULE</TableCell>
                <TableCell align="center">KILOMETRAGE </TableCell>
                <TableCell align="center">DIST.PARCOURUE</TableCell>
                <TableCell align="center">STATUT</TableCell>
                <TableCell align="center">CONDUCTEUR</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
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
                      {/* <TableCell align="center">{row.quantityCurrentCuve}</TableCell> */}
                      <TableCell align="center">{row.immatricule}</TableCell>
                      <TableCell align="center">
                        {row.kilometrageCurrent}
                      </TableCell>
                      <TableCell align="center">
                        {row.distanceParcourue}
                      </TableCell>
                      <TableCell align="center">
                        {row.vehicule.statut}
                      </TableCell>
                      <TableCell align="center">{row.chauffeur}</TableCell>
                    </TableRow>
                  );
                })}
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
}
