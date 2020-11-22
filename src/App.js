import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Inventario from "./components/Inventarios";
import Navigation from "./components/Navigation";
import Apartado from "./components/Apartados";
import Historicos from "./components/Historicos";
import { AuthContext } from "./services/AuthContext";

const App = () => (
  <AuthContext>
    <Router>
      <Navigation />
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/">
          <Inventario />
        </Route>
        <Route exact path="/apartados">
          <Apartado />
        </Route>
        <Route exact path="/historicos">
          <Historicos />
        </Route>
        <Route path="*">
          <div>Error</div>
        </Route>
      </Switch>
    </Router>
  </AuthContext>
);

export default App;
