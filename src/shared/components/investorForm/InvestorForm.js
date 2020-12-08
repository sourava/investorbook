import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

import { investorFormStyles } from "./styles";
import routePaths from "shared/routePaths";

export const InvestorFormType = {
  ADD: "ADD",
  EDIT: "EDIT",
  DELETE: "DELETE",
};

const InvestorForm = ({ type, investor, formAction }) => {
  const classes = investorFormStyles();
  const history = useHistory();
  const [modalVisible, setModalVisibility] = useState(false);
  const [investorName, setInvestorName] = useState(investor?.name || "");

  const onContinue = () => {
    if (type === InvestorFormType.ADD) {
      formAction({
        variables: {
          name: investorName,
          photoLarge: "https://randomuser.me/api/portraits/thumb/women/77.jpg",
          photoThumbnail:
            "https://randomuser.me/api/portraits/thumb/women/77.jpg",
        },
      });
      setModalVisibility(false);
    } else if (type === InvestorFormType.EDIT) {
      formAction({ variables: { name: investorName, id: investor?.id } });
      setModalVisibility(false);
    } else if (type === InvestorFormType.DELETE) {
      formAction({ variables: { id: investor?.id } });
      setModalVisibility(false);
      history.replace(routePaths.ROOT);
    }
  };

  const handleInvestorNameChange = (e) => {
    setInvestorName(e.target.value);
  };

  const renderDialogButton = () => {
    switch (type) {
      case InvestorFormType.EDIT:
        return (
          <Button
            startIcon={<EditIcon />}
            size="small"
            onClick={() => setModalVisibility(true)}
          >
            Edit Name
          </Button>
        );
      case InvestorFormType.DELETE:
        return (
          <Button
            startIcon={<DeleteIcon />}
            size="small"
            onClick={() => setModalVisibility(true)}
          >
            Remove Investor
          </Button>
        );
      case InvestorFormType.ADD:
      default:
        return (
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => setModalVisibility(true)}
          >
            Add Investor
          </Button>
        );
    }
  };

  const renderDialogContent = () => {
    switch (type) {
      case InvestorFormType.DELETE:
        return (
          <DialogTitle>
            Are you sure you want to remove this investor?
          </DialogTitle>
        );
      case InvestorFormType.ADD:
      case InvestorFormType.EDIT:
      default:
        return (
          <div className={classes.dialogContainer}>
            <Typography className={classes.title}>
              {type === InvestorFormType.ADD ? "Add Investor" : "Edit Investor"}
            </Typography>
            <Typography className={classes.subtitle}>
              Please enter the details of the investor.
            </Typography>
            <TextField
              className={classes.nameField}
              fullWidth
              value={investorName}
              onChange={handleInvestorNameChange}
              placeholder="Investor Name"
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

export default InvestorForm;
