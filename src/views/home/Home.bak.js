import React, { Component } from 'react'
// import axios from 'axios'

import { Button } from 'antd';
// class Child extends Component {

//   componentDidMount() {
//     console.log("子组件得到", this.props.content)
//   }

//   componentWillUnmount() {
//     console.log("子组件销毁")
//   }


//   render() {
//     return <div>
//       child
//       </div>
//   }
// }
export default class Home extends Component {
  state = {
    content: "",
    key: 1
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        content: "<p>1111111111111</p>",
        key: 2
      })
    }, 5000)
    // 请求 魅力惠 数据
    // axios.get('http://www.mei.com/appapi/home/mktBannerApp/v3?silo_id=2013000100000000008&platform_code=PLATEFORM_H5').then(res => {console.log(res.data)})

    // 请求猫眼数据，地址除去主机是以 /ajax 开头的
    // axios.get('/ajax/mostExpected?ci=1&limit=10&offset=0&token=&optimus_uuid=1504D430703F11EA977D9D5C9BD1F62EF0B14572A7EB4D3DA7C66BC713E4BDF9&optimus_risk_level=71&optimus_code=10').then(res => {console.log(res.data)})

    // get请求 - 查
    // axios.get('http://localhost:5000/list?author=tiechui').then(res => {console.log(res.data)})

    // post ->增
    // axios.post("http://localhost:5000/list",{
    //     title:"文章-1",
    //     author:"tiechui",
    //     content:"11111111111111"
    // }).then(res=>{
    //     console.log(res.data)
    // })

    // put -->更新
    // axios.put("http://localhost:5000/list/2",{
    //   "title": "文章-1-update",
    //   "author": "kerwin-update",
    //   "content": "1111111111-update",
    // }).then(res=>{
    //     console.log(res.data)
    // })

    // delete --->删除
    // axios.delete("http://localhost:5000/list/2").then(res=>{
    //     console.log(res.data)
    // })
  }
  render() {
    return (
      <div>
        <div className="kerwinactive">home</div>
        <Button type="primary">Primary</Button>
        {/* <Child content={this.state.content} key={this.state.key}/> */}
      </div>
    )
  }

}

/*
  diff 应用？？？？

  老的vdom : child key=1 content=""

  新的vdom : child key=2 conetnt="<p>1111111111111111</p>"
  key值不同，不会被复用
*/
