import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import Header from "./shared/components/header/Header";
import HomePage from "routes/home/HomePage";
import InvestorPage from "routes/investor/InvestorPage";

const useStyles = makeStyles({
  routeContainer: {
    padding: "16px 42px",
    maxWidth: "1080px",
    margin: "0 auto",
  },
});

const App = () => {
  const classes = useStyles();
  return (
    <>
      <Header />
      <div className={classes.routeContainer}>
        <Router>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/investor/:id" component={InvestorPage} />
          </Switch>
        </Router>
      </div>
    </>
  );
};

export default App;
