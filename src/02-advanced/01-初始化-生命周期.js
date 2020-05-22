import React, { Component } from 'react'
import axios from 'axios'
export default class App extends Component {

    state = {
        myname: "coco",
        list: []
    }

    componentWillMount() {
        console.log("componentWillMount", "初始化状态")
        // new Swiper // render之前最后一次修改状态的机会
        this.setState({
            myname: "coco-111"
        })
    }
    render() {
        console.log("render")
        // this.setState //多次
        // this.setState({
        //     myname:"kerwin-2222"
        // })
        return (
            <div>
                hello-{this.state.myname}

                <ul>
                    {
                        // arr.map(item =>{return xxx}) 把遍历到的每一项都映射成xxx返回
                        this.state.list.map(item =>
                            <li key={item.id}>{item.title}</li>
                        )
                    }
                </ul>
            </div>
        )
    }
    componentDidMount() {
        console.log("componentDidMount", "事件监听，数据请求","setInterval")

        //fetch(w3c 标准), axios（第三方库） ,xhr

        axios.get("/test.json").then(res => {
            console.log(res.data)
            this.setState({
                list:res.data.list
            })
        }).catch(err => {
            console.log(err)
        })
    }
}
