import React, { useState } from 'react';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button'

import { investorFormStyles } from './styles';
import { Typography } from '@material-ui/core';

const CompanyForm = ({ formAction }) => {
    const classes = investorFormStyles();
    const [modalVisible, setModalVisibility] = useState(false);
    const [name, setName] = useState('');

    const onContinue = () => {
        formAction({ variables: { name: name } });
        setModalVisibility(false)
    }

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    return (
        <>
            <Button variant="outlined" size="small" color="primary" onClick={() => setModalVisibility(true)}>
                Add Company
            </Button>
            <Dialog open={modalVisible} onClose={() => setModalVisibility(false)}>
                <div className={classes.dialogContainer}>
                    <Typography className={classes.title}>Add Company</Typography>
                    <Typography className={classes.subtitle}>Please enter the details of the company.</Typography>
                    <TextField
                        className={classes.nameField}
                        fullWidth
                        onChange={handleNameChange}
                        placeholder="Company Name"
                    />
                </div>
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
}

export default CompanyForm;
