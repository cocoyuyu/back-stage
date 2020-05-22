import React, { Component } from 'react'
import axios from 'axios'
import { Button, Table } from 'antd'
import { FormOutlined, DeleteOutlined } from '@ant-design/icons';

export default class List extends Component {
  state = {
    dateList: ["111", "222", "333"]
  }
  // 几列
  columns = [
    {
      title: '文章标题',
      dataIndex: 'title', //映射原数据的属性
      key: 'title'
    },
    {
      title: '文章作者',
      dataIndex: 'author',
      key: 'author',

    },
    {
      title: '文章类别',
      dataIndex: 'category',
      key: 'category',
      render: category => category.join('/')
    },
    {
      title: '操作',
      key: 'action',
      render: (obj) => { // obj 接收到的是当前点击到的数据对象
        return <div>
          <Button shape="circle" icon={<FormOutlined />} onClick={() => { this.handlePreview(obj.id) }} />
          <Button type="primary" shape="circle" icon={<FormOutlined />} onClick={() => { this.handleUpdateClick(obj.id) }} />
          <Button type="danger" shape="circle" icon={<DeleteOutlined />} onClick={() => { this.handleDelClick(obj.id) }} />
        </div>
      }
    }
  ]
  // 生命周期函数中请求数据
  componentDidMount() {
    axios.get('http://localhost:5000/articles').then(res => {
      // console.log(res.data)
      this.setState({
        datalist: res.data
      })
    })
  }

  // 删除按钮的方法
  handleDelClick = (id) => {
    axios.delete(`http://localhost:5000/articles/${id}`).then(res => {
      // 过滤掉要删除id的数据
      this.setState({
        datalist: this.state.datalist.filter(item => item.id !== id)
      })
    })
  }

  // 更新按钮的方法
  handleUpdateClick = (id) => {
    this.props.history.push(`/article-manage/update/${id}`) // 必须带id
  }

   // 预览按钮方法
   handlePreview = (id)=>{
    this.props.history.push(`/article-manage/preview/${id}`) //必须带id
  }
  render() {
    return (
      <div>
        <Button type="primary" onClick={() => this.props.history.push('/article-manage/create')}>添加文章</Button>
        <Table columns={this.columns} dataSource={this.state.datalist}
          //rowKey 接受回调函数， 返回值将作为key,理想的key值是item.id
          rowKey={item => item.id} pagination={{ pageSize: 5 }} />
      </div>
    )
  }
}
