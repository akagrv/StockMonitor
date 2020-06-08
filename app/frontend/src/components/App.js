import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store";

import Header from "./layout/header";
import Login from "./accounts/login";
import Register from "./accounts/register";
import Dashboard from "./dashboard/dashboard";
import PrivateRoute from "./common/PrivateRoute";

import { loadUser } from "../actions/auth";

class App extends Component {
  // this will run everytime this component is loaded
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Fragment>
            <Header />
            <div className="container">
              <Switch>
                <PrivateRoute exact path="/" component={Dashboard} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
              </Switch>
            </div>
          </Fragment>
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
