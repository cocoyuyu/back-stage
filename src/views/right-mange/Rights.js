import React, { Component } from 'react'
import { Table, Tag } from 'antd'
import axios from 'axios'
export default class Rights extends Component {
    state = {
        datalist: []
    }
    columns = [
        {
            title: '#',
            dataIndex: 'id', //映射原数据的属性
            key: 'id', // React 需要的 key，如果已经设置了唯一的 dataIndex，可以忽略这个属性
            render: id => <b>{id}</b> //定制td 的样式，函数接收的参数是映射原数据的属性对应的值
        },
        {
            title: '权限名称',
            dataIndex: 'title', //映射原数据的属性
            key: 'title',
        },
        {
            title: '权限等级',
            dataIndex: 'grade', //映射原数据的属性
            key: 'grade',
            render: grade => { // grade形参接收的 是映射元数据的属性的值
                console.log(grade);
                let arr = ['green','orange','red'];
                return <Tag color={arr[grade-1]}>{grade}</Tag>
            }
        }

    ]
    componentDidMount() {
        axios.get('http://localhost:5000/rights').then(res => {
            // console.log(res.data)
            this.setState({
                datalist: res.data
            })
        })
    }
    render() {
        return (
            <div>
                <Table columns={this.columns} dataSource={this.state.datalist}
                    //rowKey 接受回调函数， 返回值将作为key,理想的key值是item.id
                    rowKey={item => item.id} pagination={{ pageSize: 5 }} />
            </div>
        )
    }
}
