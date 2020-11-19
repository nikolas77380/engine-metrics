import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const columns = [
    { id: 'id', label: 'ID', minWidth: 10, maxWidth:10, align: 'center', width:10 },
    { id: 'count', label: 'Count', minWidth: 15, maxWidth:15, width:20, align: 'left' },
    {
        id: 'data',
        label: 'Data',
        maxWidth:20,
        minWidth: 20,
        width: 20,
        align: 'left',
    },
    {
        id: 'time',
        label: 'Time',
        maxWidth:10,
        minWidth: 10,
        width: 10,
        align: 'left',
    },
];

function createData(id, count, data, time) {
    return { id, count, data, time };
}

const rows = [
    createData(612, 8, '02 10 03 00 00 00 00 00', 0),
];

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 500,
    },
});

export default function DataTable() {
    const classes = useStyles();
    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    size={'small'}
                                    key={column.id}
                                    align={column.align}
                                    style={{ marginRight: 0, minWidth: column.minWidth, maxWidth: column.maxWidth, width:column.width }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell
                                                key={column.id+row.time}
                                                align={column.align}
                                                size={'small'}
                                            >
                                                {value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}
