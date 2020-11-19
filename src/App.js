import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Navigation from "./components/Navigation";
import { AuthContext } from "./services/AuthContext";

const App = () => (
  <AuthContext>
    <Router>
      <Navigation />
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route path="*">
          <div>Error</div>
        </Route>
      </Switch>
    </Router>
  </AuthContext>
);

export default App;
