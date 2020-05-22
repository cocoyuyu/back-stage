import React, { Component } from 'react'
//---------------------------------
// 自定义的bus
const bus = {
    list:[],
    //订阅方法
    subscribe(callback){
        // console.log(callback)
        // 收集callback
        this.list.push(callback)
    },

    // 发布方法
    dispatch(data){
        // 遍历list ，讲list里面的每一个函数 进行回调调用
        console.log(this.list[0])

        this.list[0](data) //执行接收到的回调函数
    }
}


//左侧边栏定义
class Sidebar extends Component{
    render(){
        return <aside style={{width:'200px',height:'480px',border:"1px solid red"}}>
            侧边栏组件
        </aside>
    }
}

// 右侧头部组件定义
class Header extends Component{
    render(){
        return <div style={{height:"100px",border:"1px solid #14c145"}}>
            <button onClick={()=>{
                //发布
                bus.dispatch("来自侄儿的问候") //
            }}>切换</button>
        </div>
    }
}

// 右侧内容组件定义
class Content extends Component{
    render(){
        return <div style={{width:'300px',height:'480px',border:"1px solid blue"}}>
            内容区组件
            <Header />
        </div>
    }
}


export default class App extends Component {
    state = {
        isCreated:true
    }

    // 订阅者订阅方法调用
    // dom渲染完触发的生命周期钩子函数
    componentDidMount(){
        console.log("dom渲染完的生命周期-订阅作用,axios")
        // 在回调函数内更改状态
        bus.subscribe((data)=>{  // subscribe 订阅
            console.log("app组件中定义的回调函数",data)
            this.setState({
                isCreated:!this.state.isCreated
            })
        })
    }

    render() {
        //多次被执行
        return (
            <div style={{width:'510px',height:'500px',border:'1px solid black',display:'flex'}}>
                {
                    this.state.isCreated?
                    <Sidebar/>
                    :null
                }
                <Content></Content>
            </div>
        )
    }
}
