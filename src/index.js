import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'normalize.css';
import { createStore } from './utils/redux';

function counterReducer(state = { value: 0 }, action) {
  switch (action.type) {
    case 'counter/incremented':
      return { value: state.value + 1 }
    case 'counter/decremented':
      return { value: state.value - 1 }
    default:
      return state
  }
}

let store = createStore(counterReducer)

store.subscribe(test);

console.log(store.getState(), 1111)

function test () {
  console.log(store.getState(), 33333);
  ReactDOM.render(<App storeState={store.getState()} />, document.getElementById('root'));
}

test();

store.dispatch({ type: 'counter/incremented' })

console.log(store.getState(), 22222)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
