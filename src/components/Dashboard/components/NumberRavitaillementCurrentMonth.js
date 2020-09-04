import React, { useState, useEffect } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Grid, Typography, Avatar } from "@material-ui/core";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import { dashboardService } from "../../../service/dashboardService";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  content: {
    alignItems: "center",
    display: "flex",
  },
  title: {
    fontWeight: 700,
  },
  avatar: {
    backgroundColor: theme.palette.success.main,
    height: 56,
    width: 56,
  },
  icon: {
    height: 32,
    width: 32,
  },
  difference: {
    marginTop: theme.spacing(2),
    display: "flex",
    alignItems: "center",
  },
  differenceIcon: {
    color: theme.palette.error.dark,
  },
  differenceValue: {
    color: theme.palette.error.dark,
    marginRight: theme.spacing(1),
  },
}));

export default function NumberRavitaillementAndTotalQteCurrentMonth(props) {
  const { className, ...rest } = props;

  const classes = useStyles();
  const [data, setData] = useState([]);
  useEffect(() => {
    dashboardService.getRavitaillementByVehiculeInCurrentMonth().then((res) => {
      setData(res);
    });
  }, []);

  let i = 0;
  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <Grid container justify="space-between">
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              Nombre de Ravitaillement/Quantité Totale par Véhicule du mois
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <EqualizerIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>

        <TableContainer className={classes.container}>
          <Table>
            <TableHead>
              <TableRow>
                {/* <TableCell align="center">N°: </TableCell> */}
                <TableCell align="center">IMMATRICULE </TableCell>
                <TableCell align="center">
                  QUANTITE TOTALE RAVITAILLEE
                </TableCell>
                <TableCell align="center">NOMBRE DE RAVITAILLEMENT</TableCell>
                {/* <TableCell align="center">DISTANCE PARCOURUE</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => {
                return (
                  <TableRow key={(i = i + 1)}>
                    {/* <TableCell align="center">{i=i+1}</TableCell> */}
                    <TableCell align="center" component="th" scope="row">
                      {row.immatricule}
                    </TableCell>
                    <TableCell align="center">
                      {row.totalQteRavitaillement}
                    </TableCell>
                    <TableCell align="center">
                      {row.nombreRavitaillement}
                    </TableCell>
                    {/* <TableCell align="center">{row.maxKilometrage - row.minKilometrage}</TableCell> */}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}

NumberRavitaillementAndTotalQteCurrentMonth.propTypes = {
  className: PropTypes.string,
};
