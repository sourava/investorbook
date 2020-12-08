import React, { useState, useMemo } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Link, useLocation } from "react-router-dom";

import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Typography from "@material-ui/core/Typography";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import CircularProgress from "@material-ui/core/CircularProgress";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import SearchBox from "shared/components/searchBox/SearchBox";
import {
  getInvestorsQuery,
  addInvestorQuery,
} from "shared/queries/investorQueries";
import InvestorForm, {
  InvestorFormType,
} from "shared/components/investorForm/InvestorForm";
import { investorTableStyles } from "./styles";

const InvestorTable = () => {
  const classes = investorTableStyles();
  const location = useLocation();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchText, setSearchText] = useState("");
  const { loading, data } = useQuery(getInvestorsQuery, {
    variables: {
      searchQuery: `${searchText}%`,
      limit: rowsPerPage,
      offset: rowsPerPage * currentPage,
    },
  });
  const [addInvestor, { loading: addInvestorRefetchLoading }] = useMutation(
    addInvestorQuery,
    {
      refetchQueries: [
        {
          query: getInvestorsQuery,
          variables: {
            searchQuery: `${searchText}%`,
            limit: rowsPerPage,
            offset: rowsPerPage * currentPage,
          },
        },
      ],
      awaitRefetchQueries: true,
    }
  );

  const rows = useMemo(() => {
    return data?.investor?.map((investor) => ({
      id: investor.id,
      name: investor.name,
      investments: investor.investments
        .map((investment) => investment.company.name)
        .join(", "),
      avatar: investor.photo_thumbnail,
    }));
  }, [data]);

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
                <TableCell style={{ width: "200px" }}>NAME</TableCell>
                <TableCell>INVESTMENTS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.map((row) => (
                <TableRow
                  className={classes.tableRow}
                  key={row.name}
                  component={Link}
                  to={`/investor/${row.id}`}
                >
                  <TableCell>
                    {
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                          src={row.avatar}
                          alt={row.name}
                          style={{
                            width: "38px",
                            borderRadius: "100%",
                            marginRight: "14px",
                          }}
                        />
                        <Typography>{row.name}</Typography>
                      </div>
                    }
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {row.investments}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data?.investor_aggregate?.aggregate?.totalCount || 0}
          rowsPerPage={rowsPerPage}
          page={currentPage}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </>
    );
  };

  // @TODO: Fix this. this is a hack to reload the page after an investor is removed
  if (location.state?.reload) {
    window.location.reload();
  }

  return (
    <div>
      <div className={classes.tableHeaderContainer}>
        <div className={classes.tableHeader}>
          <Typography className={classes.tableTitle}>Investors</Typography>
          <InvestorForm type={InvestorFormType.ADD} formAction={addInvestor} />
        </div>
        <SearchBox searchText={searchText} setSearchText={setSearchText} />
      </div>
      {loading || addInvestorRefetchLoading ? (
        <div className={classes.progressContainer}>
          <CircularProgress />
        </div>
      ) : (
        renderDataTable()
      )}
    </div>
  );
};

export default InvestorTable;
