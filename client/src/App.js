import React from "react";

//React Router
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Main Menu Components
import Header from "./components/Header";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Login from "./components/Login";

//Authenticated User Components
import Pollution from "./components/AuthenticatedUser/Pollution";
import JourneyPlanner from "./components/AuthenticatedUser/JourneyPlanner";
import TaxiMap from "./components/AuthenticatedUser/TaxiMap";

//Helper Components
import PrivateRoute from "./auth/PrivateRoute";

function App() {
  return (
    <div>
      <Router>
        <Header />

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/login" exact component={Login} />
          <PrivateRoute path="/pollution" exact component={Pollution} />
          <PrivateRoute
            path="/journey_planner"
            exact
            component={JourneyPlanner}
          />
          <PrivateRoute path="/taxis" exact component={TaxiMap} />
        </Switch>
      </Router>
    </div>
  );
}
export default App;
