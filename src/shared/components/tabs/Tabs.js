import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MaterialUITabs from '@material-ui/core/Tabs';
import MaterialUITab from '@material-ui/core/Tab';

export const Tabs = withStyles({
    root: {
        borderBottom: '1px solid #000000',
    },
    indicator: {
        backgroundColor: '#000000',
        height: '3px',
    },
})(MaterialUITabs);

export const Tab = withStyles({
    root: {
        textTransform: 'none',
        minWidth: 72,
        fontSize: '15px',
        color: '#A0A0A0',
        marginRight: '32px',
        '&$selected': {
            color: '#000000',
        },
    },
    selected: {},
})((props) => <MaterialUITab disableRipple {...props} />);

export const TabPane = ({ children, value, index }) => {
    if (value === index) {
        return (
            <>
                {children}
            </>
        );
    }

    return null;
}
