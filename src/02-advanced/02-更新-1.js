import React, { Component } from 'react'

export default class App extends Component {
    state = {
        myname: "111"
    }
    render() {
        console.log("render")
        return <div>
            {this.state.myname}
            <button onClick={()=>
                this.setState({
                    myname: "222"
                }
            )}>click</button>
        </div>
    }
    // 性能优化生命周期，默认返回true
    shouldComponentUpdate(nextProps,nextState){
        console.log("shouldComponentUpdate")
        console.log("老的状态",this.state)
        console.log("新的状态",nextState)
        // return true
        if(JSON.stringify(this.state)===JSON.stringify(nextState)){
            return false // 满足此条件，就不会再走更新阶段的生命周期函数
        }
        return  true
    }

    componentWillUpdate(){
        console.log("componentWillUpdate")
    }
    componentDidUpdate(){
        console.log("componentDidUpdate","dom更新完了")
    }
}
