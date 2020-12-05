import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import logoPath from 'shared/assets/images/logo.png';

const useStyles = makeStyles({
    root: {
        padding: '35px 42px',
    },
    logo: {
        height: '20px',
    }
});

const Header = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <img className={classes.logo} src={logoPath} alt="INVESTOR BOOK" />
        </div>
    );
}

export default Header;