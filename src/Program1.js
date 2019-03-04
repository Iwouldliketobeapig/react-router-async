import React, { PureComponent } from 'react';

export default class Pargram1 extends PureComponent {
  componentDidMount () {
    this.props.getResource();
  }

  render () {
    return (
      <div className="gradient level-center">
        <p>胆小鬼连幸福都害怕，碰到棉花都会受伤。</p>
      </div>
    )
  }
}