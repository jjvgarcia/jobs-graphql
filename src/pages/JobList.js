import React from 'react';
import {useHistory} from 'react-router-dom';

import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import ContentHeader from "../components/layout/ContentHeader";

// import CachedIcon from '@material-ui/icons/Cached';

import {Query} from 'react-apollo';
import {GET_ALL_JOBS} from '../queries';

const columns = [
    {id: 'title', label: 'Title', minWidth: 170},
    {id: 'commitment.title', label: 'Commitment', minWidth: 100},
    {
        id: 'company.name',
        label: 'Company',
        minWidth: 170
    }
];

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 350,
    },
});


const JobList = ({client}) => {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const history = useHistory();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <React.Fragment>
            <ContentHeader title={'Job List'}/>

            <Query query={GET_ALL_JOBS}>
                {({loading, error, data}) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    const {jobs} = data;
                    return <Paper className={classes.root}>
                        <TableContainer className={classes.container}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{minWidth: column.minWidth}}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {jobs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.id}
                                                      onClick={() => history.push(`/${row.company.slug}/${row.slug}`)}
                                            >
                                                <TableCell>
                                                    {row.title}
                                                </TableCell>
                                                <TableCell>
                                                    {row.commitment.title}
                                                </TableCell>
                                                <TableCell>
                                                    {row.company.logoUrl && <img src={row.company.logoUrl} alt='Logo' width={18 } />}
                                                    &nbsp; {row.company.name}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={jobs.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </Paper>
                }}
            </Query>
        </React.Fragment>
    );
};

export default JobList;
