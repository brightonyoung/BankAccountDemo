import React from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import BasicLayout from "./layouts/BasicLayout";
import List from "./pages/list";

import "./App.css";
import "antd/dist/antd.css";

const hist = createBrowserHistory();

function App() {
  return (
    <Router history={hist}>
      <Switch>
        <Route
          path="/list"
          component={(routeProps) => (
            <BasicLayout {...routeProps}>
              <List />
            </BasicLayout>
          )}
        />
        <Redirect from="/" to="/list" />
      </Switch>
    </Router>
  );
}

export default App;
