import React, { Component } from 'react'
// context通信 ,跨级通信方式(1-从 React 这个大对象中找到对应方法并调用再创建一个上下文大对象)
const GlobalContext = React.createContext()

//左侧边栏定义
class Sidebar extends Component{
    render(){
        return <GlobalContext.Consumer>
           { // context 接收的是 供应商提供的服务的大对象,成为消费者后可使用供应商的服务
               context => <aside style={{width:'200px',height:'480px',border:"1px solid red"}}>
                侧边栏组件 - {context.msg}
            </aside>
           }
        </GlobalContext.Consumer>
    }
}

// 右侧头部组件定义
class Header extends Component{
    render(){
        return <GlobalContext.Consumer>{
            context => (
                <div style={{height:"100px",border:"1px solid #14c145"}}>
                    <button onClick={()=>{ // 点击按钮只是触发了服务商提供的更改套餐的方法
                        context.changeMsg("来自header组件的问候")
                        context.changeCreated()
                    }}>切换</button>{context.call}
                </div>
            )
        }
        </GlobalContext.Consumer>
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
        isCreated:true,
        service:'发短信-付费！'
    }

    render() {
        //多次被执行
        return (
            // 2. 建立基站，标签内的在服务范围内
            <GlobalContext.Provider
                value={ // 此层大括号是为了把里面的代码当做js代码处理
                    { // 此层大括号是为了能提供多个服务
                        call: '打电话',
                        msg: this.state.service, // 使用定义好的状态
                        changeMsg:(data)=>{// 自定义一个方法，触发即更改状态
                            console.log('更改套餐为亲情号');
                            this.setState({
                                service: '发短信-免费！' + data
                            })
                        },
                        // 提供一个方法，触发即更改状态
                        changeCreated: () => {
                            this.setState({
                                isCreated:!this.state.isCreated
                            })
                        }
                    }

                }
            >
                <div style={{width:'510px',height:'500px',border:'1px solid black',display:'flex',marginLeft:'20px'}}>
                    {
                        this.state.isCreated?
                        <Sidebar/>
                        :null
                    }
                    <Content></Content>
                </div>
            </GlobalContext.Provider>
        )
    }
}
