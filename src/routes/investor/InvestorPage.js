import React, { useMemo } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useParams, Link } from "react-router-dom";

import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import InvestmentForm, {
  InvestmentFormType,
} from "shared/components/investmentForm/InvestmentForm";
import InvestorForm, {
  InvestorFormType,
} from "shared/components/investorForm/InvestorForm";
import {
  getInvestorById,
  updateInvestorQuery,
  deleteInvestorQuery,
} from "shared/queries/investorQueries";
import {
  updateInvestmentQuery,
  deleteInvestmentQuery,
  addInvestmentQuery,
} from "shared/queries/investmentQueries";
import routePaths from "shared/routePaths";
import { investorPageStyles } from "./styles";

const InvestorPage = () => {
  const classes = investorPageStyles();
  const { id } = useParams();
  const { loading, data } = useQuery(getInvestorById, {
    variables: { id },
  });
  const [
    updateInvestor,
    { loading: updateInvestorRefetchLoading },
  ] = useMutation(updateInvestorQuery, {
    refetchQueries: [{ query: getInvestorById, variables: { id } }],
    awaitRefetchQueries: true,
  });
  const [deleteInvestor] = useMutation(deleteInvestorQuery);
  const [addInvestment, { loading: addInvestmentRefetchLoading }] = useMutation(
    addInvestmentQuery,
    {
      refetchQueries: [{ query: getInvestorById, variables: { id } }],
      awaitRefetchQueries: true,
    }
  );
  const [
    updateInvestment,
    { loading: updateInvestmentRefetchLoading },
  ] = useMutation(updateInvestmentQuery, {
    refetchQueries: [{ query: getInvestorById, variables: { id } }],
    awaitRefetchQueries: true,
  });
  const [
    deleteInvestment,
    { loading: deleteInvestmentRefetchLoading },
  ] = useMutation(deleteInvestmentQuery, {
    refetchQueries: [{ query: getInvestorById, variables: { id } }],
    awaitRefetchQueries: true,
  });

  const rows = useMemo(() => {
    return data?.investor_by_pk?.investments?.map((investment) => ({
      id: investment.id,
      amount: investment.amount,
      company: investment.company,
    }));
  }, [data]);

  const totalAmountInvested = useMemo(() => {
    return data?.investor_by_pk?.investments?.reduce(
      (accumulator, currentInvestment) => {
        return accumulator + currentInvestment.amount;
      },
      0
    );
  }, [data]);

  if (
    loading ||
    updateInvestorRefetchLoading ||
    addInvestmentRefetchLoading ||
    updateInvestmentRefetchLoading ||
    deleteInvestmentRefetchLoading
  ) {
    return (
      <div className={classes.progressContainer}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <div className={classes.headerContainer}>
        <IconButton component={Link} to={routePaths.ROOT}>
          <ArrowBackIosIcon />
        </IconButton>
        <div className={classes.userContainer}>
          <div className={classes.userInfoContainer}>
            <img
              className={classes.avatar}
              src={data?.investor_by_pk?.photo_thumbnail}
              alt={data?.investor_by_pk?.name}
            />
            <div className={classes.userInfo}>
              <Typography className={classes.userName}>
                {data?.investor_by_pk?.name}
              </Typography>
              <Typography
                className={classes.userDetails}
              >{`Total Amount Invested: $${totalAmountInvested?.toLocaleString()}`}</Typography>
            </div>
          </div>
          <div>
            <InvestorForm
              type={InvestorFormType.EDIT}
              investor={data?.investor_by_pk}
              formAction={updateInvestor}
            />
            <InvestorForm
              type={InvestorFormType.DELETE}
              investor={data?.investor_by_pk}
              formAction={deleteInvestor}
            />
          </div>
        </div>
      </div>
      <div className={classes.investmentsContainer}>
        <div className={classes.sectionHeader}>
          <Typography className={classes.sectionTitle}>Investments</Typography>
          <InvestmentForm
            type={InvestmentFormType.ADD}
            investorId={id}
            formAction={addInvestment}
          />
        </div>
        <TableContainer className={classes.tableContainer}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>NAME</TableCell>
                <TableCell>AMOUNT</TableCell>
                <TableCell align="right">ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.company.name}</TableCell>
                  <TableCell>{`$${row.amount.toLocaleString()}`}</TableCell>
                  <TableCell align="right">
                    <InvestmentForm
                      type={InvestmentFormType.EDIT}
                      investorId={id}
                      investment={row}
                      formAction={updateInvestment}
                    />
                    <InvestmentForm
                      type={InvestmentFormType.DELETE}
                      investorId={id}
                      investment={row}
                      formAction={deleteInvestment}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default InvestorPage;
