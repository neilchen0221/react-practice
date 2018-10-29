import React from "react";
import { Switch, Redirect, Route, BrowserRouter as Router } from "react-router-dom";
import CdnjsSearch from "./Components/CdnjsSearch";
import PlanSelector from "./Components/PlanSelector";
import ToDoApp from "./Components/ToDoApp";
import WorldClock from "./Components/WorldClock";

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Redirect exact path="/" to="/cdnjssearch" />
          <Route exact path="/cdnjssearch" component={CdnjsSearch} />
          <Route exact path="/planselector" component={PlanSelector} />
          <Route exact path="/todoapp" component={ToDoApp} />
          <Route exact path="/worldclock" component={WorldClock} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

function NotFound() {
  return (
    <div>
      <h1>
        404 <br />
        Page Not Found :(
      </h1>
    </div>
  );
}
