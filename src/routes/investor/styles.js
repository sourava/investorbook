import { makeStyles } from "@material-ui/core/styles";

export const investorPageStyles = makeStyles({
  progressContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  root: {
    display: "flex",
    flexDirection: "column",
  },
  headerContainer: {
    display: "flex",
    marginBottom: "40px",
  },
  userContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userInfoContainer: {
    display: "flex",
    alignItems: "center",
  },
  userInfo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  avatar: {
    width: "52px",
    height: "52px",
    borderRadius: "100%",
    padding: "0 22px",
  },
  userName: {
    fontWeight: 500,
    fontSize: "24px",
    lineHeight: "22px",
    marginBottom: "8px",
  },
  userDetails: {
    fontWeight: 500,
    fontSize: "15px",
    lineHeight: "14px",
  },
  investmentsContainer: {
    paddingLeft: "115px",
    width: "100%",
    boxSizing: "border-box",
  },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
  },
  sectionTitle: {
    fontWeight: 500,
    fontSize: "15px",
    lineHeight: "14px",
    marginRight: "20px",
  },
  tableContainer: {
    maxHeight: 440,
  },
  tableCell: {
    fontWeight: 500,
    fontSize: "12px",
    lineHeight: "113.7%",
    color: "#6C6C6C",
  },
});
