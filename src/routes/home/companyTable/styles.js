import { makeStyles } from '@material-ui/core/styles'

export const investorTableStyles = makeStyles({
    tableHeaderContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '20px 0',
        alignItems: 'center',
        height: '50px',
    },
    tableHeader: {
        display: 'flex',
        alignItems: 'center',
    },
    tableTitle: {
        fontWeight: 500,
        fontSize: '28px',
        lineHeight: '26px',
        marginRight: '20px',
    },
    tableContainer: {
        boxShadow: 'none',
    },
    table: {
        minWidth: 650,
    },
    tableCell: {
        fontWeight: 500,
        fontSize: '12px',
        lineHeight: '113.7%',
        color: '#6C6C6C',
    },
    progressContainer: {
        display: 'flex',
        width: '100%',
        height: '300px',
        justifyContent: 'center',
        alignItems: 'center'
    }
});