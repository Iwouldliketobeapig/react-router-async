import React, { Component, lazy, Suspense } from 'react';
import './App.scss';
import { Router, Route, Switch, NavLink } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import asyncComponent from './asyncComponent';
import Program from './Program';
// window.performance.getEntriesByType("resource");

const Program1 = lazy(() => import('./Program1'));
const history = createBrowserHistory();
class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div className="app">
          <header>
            <NavLink to="/">首页</NavLink>
            <NavLink to="/program1">program1</NavLink>
            <NavLink to="/program2">program2</NavLink>
          </header>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route path="/" exact={true} component={Program} />
              <Route path="/program1" component={Program1} />
              <Route path="/program2" component={asyncComponent(() => import("./Program2"))} />
              <Route component={Program} />
            </Switch>
          </Suspense>
        </div>
      </Router>
    );
  }
}

export default App;
