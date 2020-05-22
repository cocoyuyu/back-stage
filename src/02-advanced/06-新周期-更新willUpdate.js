import React, { Component } from 'react'

export default class App extends Component {
    state = {
        text:"1111"
    }
    render() {
        console.log("render")
        return (
            <div>
                hello-{this.state.text}

                <button onClick={()=>{
                    this.setState({
                        text:'22222'
                    })
                }}>click</button>
            </div>
        )
    }

    // UNSAFE_componentWillUpdate(){
    //     console.log("componentWillUpdate")
    // }

    // 旧生命周期，更新的执行顺序： componentWillUpdate -> render-> componentDidUpdate
    // 使用了新的生命周期，更新的执行顺序： render -> getSnapshotBeforeUpdate -> componentDidUpdate
    getSnapshotBeforeUpdate(){
        console.log("getSnapshotBeforeUpdate")
        return 100 //老的scrollHeight
    }

    // 第三个参数是 getSnapshotBeforeUpdate() 的返回值
    componentDidUpdate(prevProps, prevState,oldHeight) {
        console.log("componentDidUpdate",oldHeight)
        //scrollTOP+= 新的scorllHeight- oldHeight
    }

}
