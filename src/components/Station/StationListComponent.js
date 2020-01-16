import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';

import React from 'react';  
import { makeStyles } from '@material-ui/core/styles';  
import Paper from '@material-ui/core/Paper';  
import Table from '@material-ui/core/Table';  
import TableBody from '@material-ui/core/TableBody';  
import TableCell from '@material-ui/core/TableCell';  
import TableContainer from '@material-ui/core/TableContainer';  
import TableHead from '@material-ui/core/TableHead';  
import TablePagination from '@material-ui/core/TablePagination';  
import TableRow from '@material-ui/core/TableRow';    
import {stationService} from '../../service/stationService';
import { history } from '../../routage/ExtBrowserRouter';
import { useState, useEffect } from 'react';
  
const useStyles = makeStyles({  
  root: {  
    width: '100%',  
  },  
  container: {  
    maxHeight: 440,  
  },  
});  
const style ={
    display: 'flex',
    justifyContent: 'center'
}
export default function MatPaginationTable() {  
  const classes = useStyles();  
  const [page, setPage] = React.useState(0);  
  const [data, setData] = useState([]);   
  const [rowsPerPage, setRowsPerPage] = React.useState(5);  

  useEffect(() => {    
            stationService.getAllStation()
            .then((res) => {
                setData(res);  
            });           
        
}, []);   
  const handleChangePage = (event, newPage) => {  
    setPage(newPage);  
  };  
  
  const handleChangeRowsPerPage = event => {  
    setRowsPerPage(+event.target.value);  
    setPage(0);  
  };
  const addStation=() =>{
    window.localStorage.removeItem("stationName");
    history.push('/app/add-station');
}
let i=0;
  
  return (  
      <div>
    <Typography variant="h4"  style={style}>Liste Stations</Typography>
    <Button variant="contained" color="primary" onClick={addStation}>
         Ajouter Station
   </Button>
    <Paper  style={{marginTop:'20px'}}className={classes.root}>  
      <TableContainer className={classes.container}>  
        <Table stickyHeader aria-label="sticky table">  
        <TableHead>  
        <TableRow>
        <TableCell align="center">N°: </TableCell>
            <TableCell align="center">STATION</TableCell>
            <TableCell align="center">ADRESSE</TableCell>
            <TableCell align="center">TELEPHONE </TableCell>
            <TableCell align="center">ACTIONS </TableCell>
        </TableRow>
          </TableHead>  
          <TableBody>  
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {  
              return (  
                <TableRow key={row.id}>
                  <TableCell align="center">{i=i+1}</TableCell>
                <TableCell align="center" component="th" scope="row">
                {row.stationName}
                </TableCell>
                <TableCell align="center">{row.adresse}</TableCell>
                <TableCell align="center">{row.tel}</TableCell>
                <TableCell align="right" onClick={() => this.editVehicule(row.immatricule)}><CreateIcon /></TableCell>
                <TableCell align="right" onClick={() => this.deleteVehicule(row.immatricule)}><DeleteIcon /></TableCell> 
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


    