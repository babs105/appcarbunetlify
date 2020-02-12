import React,{ useState, useEffect }  from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types'; 
import { makeStyles } from '@material-ui/core/styles';  
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import LocalGasStationIcon from '@material-ui/icons/LocalGasStation';
import{ dashboardService} from '../../../service/dashboardService'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.warning.main,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
  difference: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  },
  differenceIcon: {
    color: theme.palette.error.dark
  },
  differenceValue: {
    color: theme.palette.error.dark,
    marginRight: theme.spacing(1)
  }
}));

export default function QteTotalRajoutInCurrentMonth (props) {
  const { className, ...rest } = props;

  const classes = useStyles();
  
  const [dataReport, setdataReport] = useState([]);   
    

useEffect(() => {    
  dashboardService.getNumberRajoutAndTotalQteInPreviousMonth()
  .then((res) => {
    setdataReport(res);
  });           

}, []); 
let i=0;
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
        >
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
             Quantité Totale Rajout
            </Typography>
            {dataReport.map(row =>{
             return( 

              <Typography variant="h3"key={row.totalQteRajout}> {row.totalQteRajout}L</Typography>
            
             ) 
            })}
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
            <LocalGasStationIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
QteTotalRajoutInCurrentMonth.propTypes = {
  className: PropTypes.string
};


