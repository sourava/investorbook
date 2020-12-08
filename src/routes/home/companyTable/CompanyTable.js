import React, { useState } from 'react';
import { useQuery } from '@apollo/client';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import CircularProgress from '@material-ui/core/CircularProgress';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import SearchBox from 'shared/components/searchBox/SearchBox'
import { getCompaniesWithInvestmentsQuery } from 'shared/queries/companyQueries'
import { investorTableStyles } from './styles'

const CompanyTable = () => {
    const classes = investorTableStyles();
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchText, setSearchText] = useState('');
    const { loading, data } = useQuery(getCompaniesWithInvestmentsQuery, {
        variables: { searchQuery: `${searchText}%`, limit: rowsPerPage, offset: rowsPerPage * currentPage },
    });

    const rows = data?.company?.map((company) => ({
        name: company.name,
        investors: company.investments.map((investment) => investment.investor.name).join(", "),
    }))

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setCurrentPage(0);
    };

    const renderDataTable = () => {
        return (
            <>
                <TableContainer className={classes.tableContainer} component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ width: '200px' }}>NAME</TableCell>
                                <TableCell>INVESTMENTS</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? <CircularProgress /> : rows?.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell className={classes.tableCell}>{row.name}</TableCell>
                                    <TableCell className={classes.tableCell}>{row.investors}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={data?.company_aggregate?.aggregate?.totalCount || 0}
                    rowsPerPage={rowsPerPage}
                    page={currentPage}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </>
        );
    }

    return (
        <div>
            <div className={classes.tableHeaderContainer}>
                <div className={classes.tableHeader}>
                    <Typography className={classes.tableTitle}>Companies</Typography>
                </div>
                <SearchBox searchText={searchText} setSearchText={setSearchText} />
            </div>
            {
                loading ? <div className={classes.progressContainer}><CircularProgress /></div> : renderDataTable()
            }

        </div>
    );
}

export default CompanyTable;
