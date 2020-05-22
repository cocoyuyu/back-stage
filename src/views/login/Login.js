import React, { Component } from 'react'
import axios from 'axios'
import Particles from 'react-particles-js';

// antd
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import style from './login.module.css'
export default class Login extends Component {

  render() {
    return (
      <div style={{ background: 'rgb(35,39,65)' }}>
        <Particles height={window.innerHeight - 5} />
        <div className={style.container}>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              // remember: true, // 设定默认值
              // username: "admin"
            }}
            // 可查看文档看细节
            onFinish={this.onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your Username!',
                },
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            {/* <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="">
                Forgot password
        ``````</a>
            </Form.Item> */}

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
        </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
  onFinish = (values) => {
    // console.log('提交后台校验', values);
    // 后端提供用户名密码验证接口，登录验证成功后，才能跳转页面
    // 如果失败，弹出提示，用户名密码不匹配

    // 真实的接口
    // axios.post("http://localhost:5000/usersvalidate",{username:"",password:"",roleState:true})

    // mock 模拟
    axios.get(`http://localhost:5000/users?username=${values.username}&password=${values.password}&roleState=${true}`).then(res => {
      console.log(res.data)
      if (res.data.length === 0) {
        // console.log('用户名或密码不匹配') // 匹配失败触发
        message.error('用户名或密码不匹配')
      } else {
        // todo - ajax 请求
        // localStorage 只能存字符串，要注意json字符串转换
        localStorage.setItem('token', JSON.stringify(res.data[0]))
        // 跳转页面
        // console.log(this.props)
        this.props.history.push(`/home`)
      }
    })
  }
}
