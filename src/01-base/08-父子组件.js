import React, { Component } from 'react'

class List extends Component{
    render(){
        // console.log(this.props.mylist)
        let mylist = this.props.mylist
        return <ul>
            { // 渲染数据，遍历出一项生成一个li
                mylist.map((item,index)=>
                    <li key={item}>
                        {item}
                        <button onClick={()=>this.handleDelClick(index)}>del</button>
                    </li>
                )
            }
        </ul>
    }
    handleDelClick= (index) => {
        // 修改mylist属性? 属性不允许修改
        console.log("del",index)
        // 子组件可以访问到父组件调用它时传递过来的回调函数，经过它通知父组件，删除list状态第几个元素
        // 子==>父通信-2 回调函数
        this.props.onKerwinEvent(index) //访问父组件中传来的函数，传递要删除元素的索引给它

    }
}
class Other extends Component{
    render(){
        return <div>
            没有待办事项
        </div>
    }
}



export default class App extends Component {
    state = {
        list: []
    }

    render() {

        return (
            <div>

                <input ref="mytext" />
                <button onClick={this.handleClick}>add</button>
                {/* 如何遍历呢？map */}


                {
                    this.state.list.length ?
                    // 父子通信-1 ，调用子组件时通过属性传递变量给子组件
                    // 子父通信-1，调用子组件时通过属性传递一个回调函数给它作为子组件通知父组件的媒介
                    <List mylist={this.state.list} onKerwinEvent={(index)=>{
                        console.log("父组件中定义的一个回调函数，当成属性传给孩子",index)

                        this.handleDelClick1(index)
                    }} />
                    :
                    <Other/>
                }
            </div>
        )
    }

    handleDelClick1 = (index) => {
        console.log("del1", index)

        // this.state.list.splice() //不能直接修改原状态
        // let newlist = this.state.list //引用赋值不行

        let newlist = [...this.state.list]
        // let newlist = this.state.list.concat()
        newlist.splice(index,1)
        this.setState({
            list:newlist
        })
    }

    handleDelClick2(index){
        console.log("del2",index)
    }

    handleClick = () => {
        this.setState({
            list: [...this.state.list, this.refs.mytext.value]
        })
    }
}

