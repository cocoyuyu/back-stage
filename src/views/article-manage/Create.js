import React, { Component } from 'react'
import axios from 'axios'  // Cascader级联选择
import { PageHeader, Steps, Button, message, Form, Input, Cascader } from 'antd';
import ArticleEditor from './ArticleEditor'

const { Step } = Steps
export default class Create extends Component {
  state = {
    current: 0,
    formdata: null,
    content: '',
    options: [
      //默认 ： label： 级联菜单的显示内容， value：对应value值， children,
    ]
  }

  componentDidMount() {
    // 请求到数据后，调整配置为符合antd组件自身的属性，即应用组件及数据成功
    axios.get('http://localhost:5000/categories').then(res => {
      // console.log(res.data)  //for 每个title==>label
      this.setState({
        options: res.data
      })
    })
  }
  render() {
    const layout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };
    return (
      <div>
        <PageHeader
          className="site-page-header"
          onBack={() => {
            this.props.history.goBack();
          }}
          title="添加文章"
          subTitle="Believe yourself."
        />
        <Steps current={this.state.current}>
          <Step key="111111" title="基本信息" />
          <Step key="222222" title="文章内容" />
          <Step key="333333" title="提交内容" />
        </Steps>

        {/* 相应进度条显示相应内容 */}
        <div style={{ marginTop: '50px', display: this.state.current === 0 ? 'block' : 'none' }}>
          <Form
            {...layout}
            name="form_in_modal"
            initialValues={{}}
            ref="form" //拿到组件对象
          >
            <Form.Item
              name="title"
              label="文章标题"
              rules={[{ required: true, message: 'Please input the username of collection!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="category"
              label="文章分类"
              rules={[{ required: true, message: 'Please input the password of collection!' }]}
            >
              <Cascader
                options={this.state.options}
                placeholder="Please select"
                fieldNames={ // 一层花括号把里面代码当做js代码
                  { // 二层花括号代表是一个对象
                    label: 'title'
                  }
                }
              />
            </Form.Item>
          </Form>
        </div>

        <div style={{ marginTop: "50px", display: this.state.current === 1 ? 'block' : 'none', height: '500px', overflow: 'auto' }}>
          {/* 富文本编辑器 */}
          <ArticleEditor onEvent={(content) => {
            // console.log(content)
            this.setState({
              content
            })
          }} />
        </div>

        <div style={{ marginTop: "50px", display: this.state.current === 2 ? 'block' : 'none' }}></div>

        <div className="steps-action">
          {this.state.current < 2 && (
            <Button type="primary" onClick={() => this.next()}>
              下一步
            </Button>
          )}
          {this.state.current === 2 && (
            <Button type="primary" onClick={this.submit}>
              提交
            </Button>
          )}
          {this.state.current > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={() => this.prev()}>
              上一步
            </Button>
          )}
        </div>
      </div>
    )
  }

  // 提交按钮触发的方法
  submit = () => {
    let { username } = JSON.parse(localStorage.getItem("token"))
    // 提交给后端，存数据到数据库
    console.log(this.state.formdata, this.state.content)
    axios.post("http://localhost:5000/articles", {
      ...this.state.formdata,
      content: this.state.content,
      author: username
    }).then(res => {
      message.success("你成功了，你知道嘛？")
      this.props.history.push(`/article-manage/list`)
    })
  }

  // 上一步按钮触发的方法
  prev = () => {
    this.setState({
      current: this.state.current - 1
    })
  }

  // 下一步按钮触发的方法
  next = () => {
    if (this.state.current === 0) {
      //此时表示第一步
      this.refs.form.validateFields().then(values => {
        // console.log(values)
        this.setState({
          current: this.state.current + 1,
          formdata: values // 收集表单信息，在最后一步提交给后端
        })
      }).catch(err => { })
    } else {
      this.setState({
        current: this.state.current + 1
      })
    }
  }
}
