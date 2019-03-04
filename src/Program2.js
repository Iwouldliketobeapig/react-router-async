import React, { PureComponent } from 'react';

export default class Pargram1 extends PureComponent {
  componentDidMount () {
    this.props.getResource();
  }

  render () {
    return (
      <div className="gradient level-center">
        <p>曾经拥有的东西被夺走，并不代表就会回到原来没有的那种东西的时候。</p>
      </div>
    )
  }
}