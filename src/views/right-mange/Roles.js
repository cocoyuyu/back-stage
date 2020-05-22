import React, { Component } from 'react'
import { Table, Button, Tag } from 'antd'
import axios from 'axios'
import { connect } from 'react-redux'
class Roles extends Component {
  state = {
    datalist: []
  }

  columns = [
    {
      title: '角色名称',
      dataIndex: 'roleName', //映射原数据的属性
      key: 'roleName'
    },
    {
      title: '操作',
      // dataIndex
      key: 'action',
      // 未指定 dataIndex 时，形参接收到的是当前点击id所在的大对象，包含各种数据
      render: (obj) => <Button type="danger" onClick={() => {
        // console.log(obj.id)
        this.handleDelClick(obj.id)
      }}>delete</Button>
    }
  ]

  handleDelClick = (id) => {
    console.log('click', id)
    // 1. setState ,列表重新渲染
    // 2. axios.delete

    // 对原数组进行过滤操作，过滤掉要删除掉的元素,不会影响原状态
    let newlist = this.state.datalist.filter(item => item.id !== id)
    this.setState({
      datalist: newlist
    })
    // restful 接口
    // axios.delete(`http://localhost:5000/roles/${id}`).then(res => console.log('delete ok'))
  }

  // 抽离出action，返回一个符和要求的promise对象

  // 1-2 async风格 依赖于 redux-promise中间件
  // actionAsyncPromise = async ()=>{
  //     let res = await axios.get("http://localhost:5000/roles")

  //     return {
  //         type:"coco_save_rolelist",
  //         payload:res.data
  //     }
  // }

  // this.actionPromise().then(() => {}) // 中间件帮完成这个过程传给store
  componentDidMount() {
    //权限的后端接口
    if (this.props.myRoleList.length === 0) {
      this.props.getRoleList()
    }

  }

  render() {
    return (
      <div>
        <Table columns={this.columns} dataSource={this.props.myRoleList}
          //rowKey 接受回调函数， 返回值将作为key,理想的key值是item.id
          rowKey={item => item.id} pagination={{ pageSize: 5 }}
          //控制表格展开以及展开的内容
          expandable={{
            // data:此接口的数据对象  data.roleRight 所有角色的数组对象
            expandedRowRender: (data) => {
              // console.log(data.roleRight)
              return data.roleRight.map((item, index) =>
                <div key={index}>
                  {/* <b>{item.category}</b> */}
                  {
                    item.list.map(childitem =>
                      <Tag color="green" key={childitem}>{childitem}</Tag>
                    )
                  }
                </div>
              )
            }
          }}

        />
      </div>
    )
  }
}

// 1. 为了给 roles 传 redux 状态
const mapStateToProps = (state) => {
  return {
    myRoleList: state.roleList
  }
}

// 2. 为了给 roles 传递 方法
const mapDispatchToProps = {
  async getRoleList() {
    let res = await axios.get("http://localhost:5000/roles")
    return {
      type: "coco_save_rolelist",
      payload: res.data
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Roles)
