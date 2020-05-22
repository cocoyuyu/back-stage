import React, { Component } from 'react'
import axios from 'axios'
import echarts from 'echarts'
import _ from 'lodash' // 不需再单独下载，因其他框架中已下过
export default class Home extends Component {
  state = {

  }
  group = []
  componentDidMount() {
    // 所有 dom 创建完后，此生命周期执行，样式可能并未执行完
    // console.log(this.refs.myechart.clientWidth) // 样式执行完成前宽度

    axios.get('http://localhost:5000/articles').then(res => {
      // console.log(res.data)
      // console.log(this.refs.myechart.clientWidth) // 样式执行完成后宽度
      // 后端给的数据并不是前端想要的数据，需要进行数据转换
      // 使用 lodash 进行数据转换 // 第二个参数是分类依据
      // console.log(_.groupBy(res.data,'author'))
      // console.log(_.groupBy(res.data, item => item.category[0]))

      this.group = _.groupBy(res.data, 'author')

      //ES5
      // console.log(Object.keys(this.group)) // 对象中 key 组成的数组
      // console.log(Object.values(this.group).map(item=>item.length))
      // 对象中 value 组成的数组,再映射成同一个 value 的长度

      this.initEChart()
    })

    window.onresize = () => {
      console.log(123)
      // echart 创建的实例对象.resize
      this.myChart.resize()
    }
  }
  componentWillUnmount() {
    // 解绑事件
    window.onresize = null;
  }

  // 实例化 echart 的方法
  initEChart = () => {
    // 基于准备好的dom，初始化echarts实例
    this.myChart = echarts.init(this.refs.myechart);
    // 指定图表的配置项和数据
    var option = {
      minInterval: 1,
      title: {
        text: '用户发表文章统计'
      },
      tooltip: {},
      legend: {
        data: ['文章数']
      },
      xAxis: {
        data: Object.keys(this.group)
      },
      yAxis: {},
      series: [{
        name: '文章数',
        type: 'bar',
        data: Object.values(this.group).map(item => item.length)
      }]
    };
    // 使用刚指定的配置项和数据显示图表。
    this.myChart.setOption(option);
  }
  render() {
    return (
      <div ref="myechart" style={{ width: '100%', height: '400px' }}>
        home
      </div>
    )
  }

}

