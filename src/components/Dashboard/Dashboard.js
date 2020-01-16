import React from 'react';
import { makeStyles } from '@material-ui/core/styles';  
import { Grid } from '@material-ui/core';

import ListRavitaillement from './components/ListRavitaillement';
import NombreQuantiteRavitaillementByVehiculePreviousMonth from './components/NumberRavitaillementAndTotalQteLastMonth';
import NombreQuantiteRavitaillementByVehiculeCurrentMonth from './components/NumberRavitaillementCurrentMonth';
import TotalVehiculeReportLastMonth from './components/TotalVehiculeReportLastMonth';
import TotalQteFuelReportLastMonth from './components/TotalQteFuelReportLastMonth';
import TotalVehiculeReportCurrentMonth from './components/TotalVehiculeReportCurrentMonth';
import TotalQteFuelReportCurrentMonth from './components/TotalQteFuelReportCurrentMonth';
import TotalRajoutCurrentMonth from './components/NumberRajoutInCurrentMonth';
import TotalQteRajoutCurrentMonth from './components/QteTotalRajoutInCurrentMonth'
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

export default function Dashboard () {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
         <Grid
          item
          lg={12}
          md={12}
          sm={6}
          xl={3}
          xs={12}
        >
          RAVITAILLEMENTS
        </Grid>
          <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <TotalVehiculeReportLastMonth/>
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <TotalQteFuelReportLastMonth/>
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <TotalVehiculeReportCurrentMonth/>
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <TotalQteFuelReportCurrentMonth/>
        </Grid>
        <Grid
          item
          lg={6}
          md={6}
          sm={6}
          xl={3}
          xs={12}
        >
          <NombreQuantiteRavitaillementByVehiculePreviousMonth/>
        </Grid>
        <Grid
          item
          lg={6}
          md={6}
          sm={6}
          xl={3}
          xs={12}
        >
         <NombreQuantiteRavitaillementByVehiculeCurrentMonth/>
        </Grid>
        <Grid
          item
          lg={12}
          md={6}
          sm={6}
          xl={3}
          xs={12}
        >
            <ListRavitaillement/> 
        </Grid>

        <Grid
          item
          lg={12}
          md={12}
          sm={6}
          xl={3}
          xs={12}
        >
         DONNEES CUVE
        </Grid>
        <Grid
          item
          lg={3}
          md={6}
          sm={6}
          xl={3}
          xs={12}
        >
           
        </Grid>
        <Grid
          item
          lg={3}
          md={12}
          xl={9}
          xs={12}
        >
         
        </Grid>
        <Grid
          item
          lg={3}
          md={6}
          xl={3}
          xs={12}
        >
           <TotalRajoutCurrentMonth/>
        </Grid>
        <Grid
          item
          lg={3}
          md={6}
          xl={3}
          xs={12}
        >
       <TotalQteRajoutCurrentMonth/>
        </Grid>
        <Grid
          item
          lg={8}
          md={12}
          xl={9}
          xs={12}
        >
            
        </Grid>
      </Grid>
    </div>
  );
}
