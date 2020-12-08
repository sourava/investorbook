import { makeStyles } from '@material-ui/core/styles'

export const investorFormStyles = makeStyles({
    dialogContainer: {
        width: '500px',
        padding: '28px 32px',
        display: 'flex',
        flexDirection: 'column',
    },
    title: {
        fontWeight: 500,
        fontSize: '18px',
        lineHeight: '17px',
        marginBottom: '10px',
    },
    subtitle: {
        fontWeight: 500,
        fontSize: '14px',
        lineHeight: '13px',
        color: '#616161',
        marginBottom: '30px',
    },
    amountField: {
        marginTop: '30px',
    }
});