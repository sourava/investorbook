import React, { useState } from "react";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import CompanyAutocomplete from "shared/components/investmentForm/CompanyAutocomplete";
import { investmentFormStyles } from "./styles";
import { Typography } from "@material-ui/core";

export const InvestmentFormType = {
  ADD: "ADD",
  EDIT: "EDIT",
  DELETE: "DELETE",
};

const InvestmentForm = ({ type, investorId, investment, formAction }) => {
  const classes = investmentFormStyles();
  const [modalVisible, setModalVisibility] = useState(false);
  const [amount, setAmount] = useState(investment?.amount);
  const [selectedCompany, setSelectedCompany] = useState(investment?.company);

  const onContinue = () => {
    if (type === InvestmentFormType.ADD) {
      formAction({
        variables: {
          companyId: selectedCompany.id,
          amount: amount,
          investorId: investorId,
        },
      });
      setModalVisibility(false);
    } else if (type === InvestmentFormType.EDIT) {
      formAction({
        variables: {
          id: investment?.id,
          companyId: selectedCompany.id,
          amount: amount,
        },
      });
      setModalVisibility(false);
    } else if (type === InvestmentFormType.DELETE) {
      formAction({ variables: { id: investment?.id } });
      setModalVisibility(false);
    }
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const renderDialogButton = () => {
    switch (type) {
      case InvestmentFormType.EDIT:
        return (
          <IconButton onClick={() => setModalVisibility(true)}>
            <EditIcon />
          </IconButton>
        );
      case InvestmentFormType.DELETE:
        return (
          <IconButton onClick={() => setModalVisibility(true)}>
            <DeleteIcon />
          </IconButton>
        );
      case InvestmentFormType.ADD:
      default:
        return (
          <Button
            startIcon={<AddIcon />}
            size="small"
            onClick={() => setModalVisibility(true)}
          >
            Add Investment
          </Button>
        );
    }
  };

  const renderDialogContent = () => {
    switch (type) {
      case InvestmentFormType.DELETE:
        return (
          <DialogTitle>
            Are you sure you want to remove this investment?
          </DialogTitle>
        );
      case InvestmentFormType.ADD:
      case InvestmentFormType.EDIT:
      default:
        return (
          <div className={classes.dialogContainer}>
            <Typography className={classes.title}>
              {type === InvestmentFormType.ADD
                ? "Add Investment"
                : "Edit Investment"}
            </Typography>
            <Typography className={classes.subtitle}>
              Please enter the details of the investment.
            </Typography>
            <CompanyAutocomplete
              selectedCompany={selectedCompany}
              setSelectedCompany={setSelectedCompany}
            />
            <TextField
              className={classes.amountField}
              type="number"
              fullWidth
              onChange={handleAmountChange}
              value={amount}
              placeholder="Investment Amount"
            />
          </div>
        );
    }
  };

  return (
    <>
      {renderDialogButton()}
      <Dialog open={modalVisible} onClose={() => setModalVisibility(false)}>
        {renderDialogContent()}
        <DialogActions>
          <Button onClick={() => setModalVisibility(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={onContinue} color="primary">
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default InvestmentForm;
