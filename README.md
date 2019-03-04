---
title: webpack+react按需加载
date: 2019-02-14
tag: 
  - react
categories:
  - 前端
---
![](/imgs/react/theme/load.jpg)

## 原理：CommonJS与import()
### 方法一：CommonJS模块语法
**利用require.ensure,require.ensure()是webpack特有的，已经被import()取代。**

`方法`

```javascript
require.ensure(
  dependencies: String[],
  callback: function(require),
  errorCallback: function(error),
  chunkName: String
)
```

### 方法二：import()
**ES2015 loader规范定义了import()方法，可以在运行时动态地加载ES2015模块**

`方法`

```javascript
import('Component').then()
// or 在 async中使用
await import('Component')
```

`demo`

```jsx
import React, { Component } from 'react';

class App extends Component {
  handleClick = () => {
    import('./moduleA')
      .then(({ moduleA }) => {
        // Use moduleA
      })
      .catch(err => {
        // Handle failure
      });
  };

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Load</button>
      </div>
    );
  }
}

export default App;
```
## react-router中使用按需加载
### 方法一：使用react.lazy

```jsx
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';

const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
      </Switch>
    </Suspense>
  </Router>
);
```
### 方法二：利用高阶组件

* 写一个高阶组件用于动态加载组件

```jsx
// async Component
import React, { Component } from "react";

export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        component: null
      };
    }

    async componentDidMount() {
      const { default: component } = await importComponent();

      this.setState({
        component: component
      });
    }

    render() {
      const C = this.state.component;

      return C ? <C {...this.props} /> : null;
    }
  }

  return AsyncComponent;
}
```
* 引用并使用该高阶组件做按需加载

```jsx
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import asyncComponent from './asyncComponent';
import React, { Suspense, lazy } from 'react';

const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={() => asyncComponent(import('./routes/Home'))}/>
        <Route path="/about" component={() => asyncComponent(import('./routes/About'))}/>
      </Switch>
    </Suspense>
  </Router>
);
```

`以上两种方法都是react官方推荐`[code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)