export const createStore = (reducer) => {
  const defaultState = reducer(undefined, {})
  const store = new Store(defaultState, reducer);
  return store;
}

function Store (state, reducer) {
  this.state = state;
  this.reducer = reducer;
  this.observers = [];
}

Store.prototype = {
  getState () {
    return this.state;
  },

  dispatch (action) {
    this.state = this.reducer(this.state, action);
    console.log(this.observers, 'observers')
    this.observers.forEach(ele => ele())
  },

  subscribe (observer) {
    this.observers.push(observer)
  }
}
