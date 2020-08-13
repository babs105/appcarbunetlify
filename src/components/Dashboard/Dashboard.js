import React from 'react';
import { makeStyles } from '@material-ui/core/styles';  
import { Grid } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import ListRavitaillement from './components/ListRavitaillement';
import ListRavitaillementCurrentMonth from './components/ListRavitaillementCurrentMonth';
import ListRavitaillementPreviousMonth from './components/ListRavitaillementPreviousMonth';
import NombreQuantiteRavitaillementByVehiculePreviousMonth from './components/NumberRavitaillementAndTotalQteLastMonth';
import NombreQuantiteRavitaillementByVehiculeCurrentMonth from './components/NumberRavitaillementCurrentMonth';
import TotalVehiculeReportLastMonth from './components/TotalVehiculeReportLastMonth';
import TotalQteFuelReportLastMonth from './components/TotalQteFuelReportLastMonth';
import TotalVehiculeReportCurrentMonth from './components/TotalVehiculeReportCurrentMonth';
import TotalQteFuelReportCurrentMonth from './components/TotalQteFuelReportCurrentMonth';
import TotalRajoutCurrentMonth from './components/NumberRajoutInCurrentMonth';
import TotalQteRajoutCurrentMonth from './components/QteTotalRajoutInCurrentMonth'
import TotalRajoutPreviousMonth from './components/NumberRajoutInPreviousMonth';
import TotalQteRajoutPreviousMonth from './components/QteTotalRajoutInPreviousMonth'


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  }
}));

export default function Dashboard () {
  const classes = useStyles();

  return (
    <div
    //  className={classes.root}
     >
      <Grid container spacing={5}>
  
        <Grid item lg={6} md={6} sm={12} xl={6} xs={12}>
          <Typography variant="h6"style={{ color:'orange'}}>
             Mois Précédent
          </Typography>
          <NombreQuantiteRavitaillementByVehiculePreviousMonth/>
        </Grid>
        <Grid item  lg={6} md={6} sm={12} xl={6} xs={12}>
           <Typography variant="h6"style={{ color:'green'}}>
             Mois en Cours
           </Typography>
           <NombreQuantiteRavitaillementByVehiculeCurrentMonth/>
        </Grid>
        <Grid item lg={3} md={3} sm={6} xl={3} xs={12}>
          <TotalVehiculeReportLastMonth/>
        </Grid>
        <Grid item lg={3} md={3} sm={6} xl={3} xs={12}>
          <TotalQteFuelReportLastMonth/>
        </Grid>
        <Grid item lg={3} md={3} sm={6} xl={3} xs={12}>
          <TotalVehiculeReportCurrentMonth/>
        </Grid>
        <Grid item lg={3} md={3} sm={6} xl={3} xs={12}
        >
          <TotalQteFuelReportCurrentMonth/>
        </Grid>
       
        <Grid item lg={12} md={12}
sm={12}
          xl={3}
          xs={12}
        >
            {/* <ListRavitaillement/>  */}
        </Grid>
        <Grid
          item
          lg={12}
          md={12}
          sm={12}
          xl={3}
          xs={12}
        >
           <ListRavitaillementCurrentMonth/> 
        </Grid>

        <Grid
          item
          lg={12}
          md={12}
          sm={12}
          xl={3}
          xs={12}
        >
           <ListRavitaillementPreviousMonth/> 
        </Grid>
         <Grid item
          lg={6}
          md={6}
          sm={6}
          xl={12}
          xs={12}>
             
            <Grid item
                lg={6}
                md={3}
                sm={6}
                xs={12}
               >
               <Typography variant="h6"style={{ color:'orange'}}>
                Mois Précédent
                </Typography>
               <TotalRajoutPreviousMonth/>
           </Grid>
           <Grid item
            lg={6}
            md={3}
            sm={6}
            xs={12}
            >
            <TotalQteRajoutPreviousMonth/>
           </Grid>
      </Grid>

        <Grid
          item
          lg={6}
          md={6}
          sm={6}
          xl={12}
          xs={12}> 
             
                <Grid item
                lg={6}
                md={3}
                sm={6}
                xs={12}
              >
               <Typography variant="h6"style={{ color:'green'}}>
                   Mois en Cours
                </Typography>     
              <TotalRajoutCurrentMonth/>
              </Grid>
              <Grid item
                lg={6}
                md={3}
                sm={6}
                xs={12}
              >
            <TotalQteRajoutCurrentMonth/>
            </Grid>
        </Grid>
        {/* <Grid
          item
          lg={3}
          md={6}
          xl={3}
          xs={12}
        >
            
        </Grid> */}
      </Grid>
    </div>
  );
}
