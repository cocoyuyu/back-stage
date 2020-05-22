import React, { Component } from 'react'

class Child extends Component {
  render() {
    return (
      <div>
        child
        {/* this.props.children 拿到的是有所有插槽内容的数组 */}
        {/* {this.props.children } 可直接按索引访问取数据 */}
        {this.props.children[2] }
        {this.props.children[0] }
      </div>
    )
  }
}

export default class App extends Component {
  render() {
    return (
      <div>
          <Child>
            <div>111</div>
            <div>222</div>
            <div>333</div>
          </Child>
      </div>
    )
  }
}
