import React, { Component } from 'react'
import { Table, Button, Tag } from 'antd'
import axios from 'axios'
import store from '../../redux/store'
export default class Roles extends Component {
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
  // 1-1 promise风格 依赖于 redux-promise中间件
  // actionPromise = ()=>{
  //     return  axios.get("http://localhost:5000/roles").then(res => {
  //         return {
  //             type:"coco_save_rolelist",
  //             payload:res.data
  //         }// action必须有type属性
  //     })
  // }

  // 1-2 async风格 依赖于 redux-promise中间件
  // actionAsyncPromise = async ()=>{
  //     let res = await axios.get("http://localhost:5000/roles")

  //     return {
  //         type:"coco_save_rolelist",
  //         payload:res.data
  //     }
  // }

  // 2 dispatch传入的是一个函数 依赖于redux-thunk 中间件

  actionThunk = ()=>{
      return (dispatch)=>{ // 形参接收的是dispatch方法
          // console.log(dispatch)
          axios.get("http://localhost:5000/roles").then(res=>{
              dispatch({
                  type:"coco_save_rolelist",
                  payload:res.data
              })
          })
      }
  }

  // this.actionPromise().then(() => {}) // 中间件帮完成这个过程传给store
  componentDidMount() {
    //权限的后端接口

    let roleList = store.getState().roleList
    if (roleList.length === 0) {
      // 走一遍逻辑，把数据存储到 store 中
      store.dispatch(this.actionThunk()) //dispatch 传入一个promise/函数对象，不支持，只支持最简单的对象，需要借助中间件（middleware）
    } else {
      // 使用缓存数据，存在于内存中，页面一刷新数据就消失
      this.setState({
        datalist: roleList
      })
    }
    this.unscribe = store.subscribe(() => {
      // console.log('role组件数据', store.getState().roleList)
      this.setState({
        datalist: store.getState().roleList
      })
    }) // 右侧返回值就是取消订阅的方法，把它挂载到this上
  }

  componentWillUnmount(){
    this.unscribe()
  }
  render() {
    return (
      <div>
        <Table columns={this.columns} dataSource={this.state.datalist}
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
