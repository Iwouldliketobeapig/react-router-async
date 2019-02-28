import React, { Component, lazy, Suspense } from 'react';
import './App.css';
import { Router, Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import asyncComponent from './asyncComponent';
import Program from './Program';

const Program1 = lazy(() => import('./Program1'));
const history = createBrowserHistory();
class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div className="App">
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route path='/' exact={true} component={Program} />
              <Route path='/program1' component={Program1} />
              <Route path='/program2' component={asyncComponent(() => import('./Program2'))} />
              <Route component={Program} />
            </Switch>
          </Suspense>
        </div>
      </Router>
    );
  }
}

export default App;
