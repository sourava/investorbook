import React, { useState } from 'react';

import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import Zoom from '@material-ui/core/Zoom';

import { searchBoxStyles } from './styles';

const SearchBox = ({ searchText, setSearchText }) => {
    const classes = searchBoxStyles();
    const [checked, setChecked] = React.useState(false);

    const handleChange = (e) => {
        setSearchText(e.target.value);
    }

    const clearSearch = () => {
        setSearchText('')
        setChecked(false)
    }

    return (
        <>
            {checked ? (
                <Zoom in={checked}>
                    <div className={classes.searchBoxContainer}>
                        <TextField className={classes.searchBox} size="small" variant="outlined" value={searchText} onChange={handleChange} />
                        <IconButton size="small" onClick={clearSearch}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                </Zoom>
            ) : (
                    <IconButton onClick={() => setChecked(true)}>
                        <SearchIcon />
                    </IconButton>
                )}
        </>
    );
}

export default SearchBox;
