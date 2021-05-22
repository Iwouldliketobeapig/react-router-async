import React, { PureComponent } from 'react';

export default class Pargram1 extends PureComponent {

  constructor () {
    super();
    this.divRef = React.createRef();
    this.state = {
      testComponentWillMount: '未更新'
    }
  }

  componentWillMount () {
    setTimeout(this.updateState, 1000);
  }

  componentDidMount () {
    this.props.getResource();
    document.domain="localhost";
  }

  render () {
    console.log('渲染了几次');
    return (
      <div>
        <div class="input level-center">
          <span>hello,world!</span>
        </div>
        <span>{this.state.testComponentWillMount}</span>
        <iframe 
          src="http://localhost:3000/"
          width="800px"
          height="400px"
          title="test"
          allow-script={true}
        />
      </div>
    )
  }

  updateState = () => {
    console.log('我执行了');
    this.setState({
      testComponentWillMount: '更新了'
    })
  }
}