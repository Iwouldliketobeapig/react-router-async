import React, { Component, lazy, Suspense } from 'react';
import './App.scss';
import { Router, Route, Switch, NavLink } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import asyncComponent from './asyncComponent';
import Program from './Program';
// window.performance.getEntriesByType("resource");

const Program1 = lazy(() => import('./Program1'));
const Progran2 = asyncComponent(() => import("./Program2"));
const history = createBrowserHistory();
class App extends Component {
  constructor () {
    super();
    this.state = {
      resourceList: [],
    }
  }

  componentDidMount () {
    this.getResource();
  }

  render() {
    return (
      <Router history={history}>
        <div className="app">
          { this.header() }
          { this.resource() }
          <Suspense fallback={<div>Loading...</div>}>
            { this.router() }
          </Suspense>
        </div>
      </Router>
    );
  }

  router = () => {
    return (
      <Switch>
        <Route path="/" exact={true} render={() => <Program getResource={this.getResource} />} />
        <Route path="/program1" render={() => <Program1 getResource={this.getResource} />} />
        <Route path="/program2" render={() => <Progran2 getResource={this.getResource} />} />
        <Route render={() => <Program getResource={this.getResource} />} />
      </Switch>
    );
  }

  // 获取资源列表
  getResource = () => {
    let resourceList = window.performance.getEntriesByType("resource");
    resourceList = this.dealWithResource(resourceList);
    this.setState({
      resourceList
    });
  }

  header = () => {
    const linkList = [
      { to: '/', name: '首页' },
      { to: '/program1', name: 'program1' },
      { to: '/program2', name: 'program2' },
    ];
    return (
      <header>
        {
          linkList.map(ele => {
            return <NavLink to={ele.to} key={ele.to}>{ele.name}</NavLink>
          })
        }
      </header>
    );
  }

  // 显示资源列表
  resource = () => {
    const { resourceList } = this.state;
    return (
      <div className='app-resource'>
          {
            resourceList.map((ele, index) => {
              return (
                <p>{ele.name}</p>
              );
            })
          }
      </div>
    );
  }

  // 处理资源，只返回js资源
  dealWithResource = (resourceList) => {
    const reg = /.js$/;
    const newResrouceList = resourceList.filter(ele => {
      return reg.test(ele.name);
    });
    return newResrouceList;
  }
}

export default App;
