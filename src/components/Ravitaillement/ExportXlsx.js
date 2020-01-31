import React from 'react'
import {Button} from '@material-ui/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

export const ExportXlsx = ({csvData, fileName}) => {

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToXlsx = (csvData, fileName) => {
        const ws = XLSX.utils.json_to_sheet(csvData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    }

    return (
        <Button variant="outlined" color="primary" onClick={(e) => exportToXlsx(csvData,fileName)}>Exporter Excel</Button>
    )
}