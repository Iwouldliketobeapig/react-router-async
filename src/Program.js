import React, { PureComponent } from 'react';

export default class Pargram1 extends PureComponent {
  componentDidMount () {
    this.props.getResource();
  }

  render () {
    return (
      <div class="input level-center">
        <span>hello,world!</span>
      </div>
    )
  }
}