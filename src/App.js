import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from 'routes/home/HomePage'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
