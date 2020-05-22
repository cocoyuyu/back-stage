import React, { Component } from 'react'
import { Button, Table, Switch, Modal, Form, Input, Select } from 'antd'
import { FormOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios'
// 从 Select 中解构出 Option
const { Option } = Select;
export default class Uses extends Component {
  state = {
    datalist: [],
    isCreated: false,
    isUpdated: false
  }

  // 几列
  columns = [
    {
      title: '角色名称',
      dataIndex: 'roleName', //映射原数据的属性
      key: 'roleName'
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',

    },
    {
      title: '用户状态',
      dataIndex: 'roleState',
      key: 'roleState',
      //定制td 的样式，render函数接收的第一个参数是映射原数据的属性对应的值，第二个形参接收的是接口数据大对象
      // 非受控组件
      render: (roleState, item) => {
        // console.log(roleState, item)
        return <Switch defaultChecked={roleState} disabled={item.default} onChange={() => this.handleSwitch(item)}></Switch>
      }
      /*
        如果组件的行为，完全受到[状态]的控制， 受控组件
        如果组件的行为， 不受到[状态]的控制， 非受控组件
      */
    },
    {
      title: '操作',
      key: 'action',
      render: (obj) => { // obj 接收到的是当前点击到的数据对象
        return <div>
          <Button type="primary" shape="circle" icon={<FormOutlined />} disabled={obj.default}
            onClick={() => this.handleUpdate(obj)}
          />
          <Button type="danger" shape="circle" icon={<DeleteOutlined />} disabled={obj.default}
            onClick={() => this.handleDelClick(obj.id)} />
        </div>
      }
    }
  ]
  // 生命周期函数中请求数据
  componentDidMount() {
    axios.get('http://localhost:5000/users').then(res => {
      // console.log(res.data)
      this.setState({
        datalist: res.data
      })
    })
  }

  // 状态打开或关闭
  handleSwitch = (item) => {
    // console.log(item)
    // let {roleState} = item
    //同步后端
    this.state.datalist.forEach(useritem => {
      if (useritem.id === item.id) {
        // useritem.roleState = ! useritem.roleState // 同下
        useritem["roleState"] = !useritem["roleState"]
        axios.put(`http://localhost:5000/users/${item.id}`, {
          ...useritem
        }).then(res => { console.log("update-ok") })
      }
    })
  }
  //删除方法
  handleDelClick = (id) => {
    // console.log("del",id)
    //1.同步后端
    //2.同步页面

    axios.delete(`http://localhost:5000/users/${id}`).then(res => {
      //删除成功
    })

    this.setState({
      datalist: this.state.datalist.filter(item => item.id !== id)
    })
  }

  // 添加成功方法 (模态框确认按钮触发的方法)
  handleAddOk = () => {
    // 1. 校验表单内容，2. 获取表单value 3.隐藏modal
    this.refs.form
      .validateFields()
      .then(values => {
        // console.log(values)
        this.refs.form.resetFields(); //重置表单
        this.renderTable(values)
        this.setState({
          isCreated: false
        })
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  }

  // 显示更新模态框的方法
  handleUpdate = (item) => {
    // console.log(item)
    // Modal 组件 visible => false, true
    // 第一次是创建 ，之后才是隐藏和显示
    // setState 同步？？？

    //  使setState()变成同步代码，所有dom节点渲染完成再去找它拿值
    setTimeout(() => {
      this.setState({
        isUpdated: true,
        currentId: item.id //记录id-触发模态框时记录此时要更新哪个user
      })
      // 预设数据
      // console.log( this.refs.updateForm)
      this.refs.updateForm.setFieldsValue({ // setFieldsValue 给表单元素提前设置数据
        username: item.username, // key值由当年 name 属性的值决定
        password: item.password,
        roleType: item.roleType
      })
    }, 0)

  }
  // 更新成功的方法(模态框更新按钮触发的方法)
  handleUpdateOk = () => {
    // 获取新的表单值
    this.refs.updateForm.validateFields().then(values => {
      // console.log(values)
      this.updateTable(values) // 更新表格的方法
    }).catch(err => {

    })
  }

  // // 更新表格的方法
  updateTable = (values) => {
    let oldItems = this.state.datalist.filter(item => item.id === this.state.currentId)
    let roleArr = ["小编", "管理员", "超级管理员"]
    //同步后端
    axios.put(`http://localhost:5000/users/${this.state.currentId}`, {
      // ...旧状态，...新状态
      ...oldItems[0],
      ...values,
      roleName: roleArr[values.roleType - 1] // roleType :1(小编),2（管理员）,3（超级管理员）
    }).then(res => {
      // console.log("update-ok",res.data)  // res.data 是请求成功后后端返回的新状态
      // 同步页面
      //同步当前页面 方案一
      let newlist = [...this.state.datalist] // 展开老状态放在一个数组中
      newlist.forEach((item, index) => {
        if (item.id === res.data.id) {
          newlist[index] = res.data
        }
      })
      // location.reload(); // 此法太暴力 不合适
      //同步当前页面 方案二
      // let newlist = this.state.datalist.map(item => {
      //   if (item.id === res.data.id) {
      //     return res.data
      //   } else {
      //     return item
      //   }
      // })

      this.setState({
        datalist: newlist,
        isUpdated: false
      })
    })
  }
  // 重新渲染表单的方法
  renderTable = (values) => {
    // 1- table更新
    // 2- 数据库
    let { username, password, roleType } = values //解构 取出表单中相应的值
    let roleArr = ["小编", "管理员", "超级管理员"]
    //restful 增===post
    axios.post("http://localhost:5000/users", {
      username,
      password,
      roleType,
      roleState: false,
      roleName: roleArr[roleType - 1] // roleType：1(小编),2（管理员）,3（超级管理员）
    }).then(res => {
      // console.log(res.data)
      // 模态框消失
      // table更新
      this.setState({
        isCreate: false, //模态框消失
        datalist: [...this.state.datalist, res.data]
      })
    })
  }

  render() {
    return (
      <div>
        <Button type="primary" onClick={() => {
          this.setState({
            isCreated: true
          })
        }}>添加用户</Button>
        <Table columns={this.columns} dataSource={this.state.datalist}
          //rowKey 接受回调函数， 返回值将作为key,理想的key值是item.id
          rowKey={item => item.id} pagination={{ pageSize: 5 }} />

        {/* 创建的弹出层 */}
        <Modal
          visible={this.state.isCreated}
          title="添加用户"
          okText="确认"
          cancelText="取消"
          onCancel={() => {
            this.setState({
              isCreated: false
            })
          }}
          onOk={() => {
            this.handleAddOk()
          }}
        >
          <Form
            layout="vertical"
            name="form_in_modal"
            initialValues={{}}
            ref="form"
          >
            <Form.Item
              name="username"
              label="用户名"
              rules={[{ required: true, message: 'Please input the username of collection!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              label="密码"
              rules={[{ required: true, message: 'Please input the password of collection!' }]}
            >
              <Input type="password" />
            </Form.Item>

            <Form.Item
              name="roleType"  // 重新渲染表单时要解构的那个roleType指的是它！！！
              label="角色"
              rules={[{ required: true, message: 'Please input the roleType of collection!' }]}
            >
              <Select
                showSearch
                placeholder="选择一个角色"
              >
                <Option value={3}>超级管理员</Option>
                <Option value={2}>管理员</Option>
                <Option value={1}>小编</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
        {/* 更新的弹出层 */}
        <Modal
          visible={this.state.isUpdated} // 是否更新
          title="更新用户"
          okText="更新"
          cancelText="取消"
          onCancel={() => {
            this.setState({
              isUpdated: false
            })
          }}
          // 右下角更新按钮会触发的方法
          onOk={() => {
            this.handleUpdateOk()
          }}
        >
          <Form
            layout="vertical"
            name="form_in_modal"
            initialValues={{}}
            ref="updateForm"
          >
            <Form.Item
              name="username"
              label="用户名"
              rules={[{ required: true, message: 'Please input the username of collection!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              label="密码"
              rules={[{ required: true, message: 'Please input the password of collection!' }]}
            >
              <Input type="password" />
            </Form.Item>

            <Form.Item
              name="roleType"  // 重新渲染表单时要解构的那个roleType指的是它！！！
              label="角色"
              rules={[{ required: true, message: 'Please input the roleType of collection!' }]}
            >
              <Select
                showSearch
                placeholder="选择一个角色"
              >
                <Option value={3}>超级管理员</Option>
                <Option value={2}>管理员</Option>
                <Option value={1}>小编</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}
