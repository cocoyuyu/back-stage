import React, { Component } from 'react'
import axios from 'axios'
import {PageHeader} from 'antd'
export default class Preview extends Component {
  state = {
    content: ''
  }
  // 获取传来的id, 利用id 进行 axios请求后端数据，渲染页面
  componentDidMount() {
    // console.log('list传来的id',this.props.match.params.myid)
    let id = this.props.match.params.myid
    axios.get(`http://localhost:5000/articles/${id}`).then(res => {
      console.log(res.data)
      this.setState({
        content: res.data.content
      })
    })
  }
  render() {
    return (
      <div>
        <PageHeader
          className="site-page-header"
          onBack={() => {
            // console.log(this.props)
            this.props.history.goBack() //返回
          }}
          title="更新文章"
          subTitle="This is a subtitle"
        />
        {/* 固定写法，解析html代码到页面 */}
        <div dangerouslySetInnerHTML={{ __html: this.state.content }} ></div>
        {/* {this.state.content} */}
      </div>
    )
  }
}

/*
    dangerouslySetInnerHTML={{ __html: this.state.content }}
    等价于
    data:{
        html:"<p>11111111<alert>攻击</alert></p>"
    }

    {{html}}

    v-html=  "html"
*/
