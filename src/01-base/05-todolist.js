import React, { Component } from 'react'

export default class App extends Component {
    state ={
        list:[],
        isCreated: true
    }

    render() {
        return (
            <div>
                <input ref="mytext"/>
                <button onClick={this.handleClick}>add</button>
                {/* 如何遍历呢？map */}
                {
                    this.state.list.length?
                    <ul>
                    { // 标签内写在大括号中里面的代码才会被当做变量(js代码)执行
                        this.state.list.map((item,index)=>
                            // 使用循环遍历后的数据，每一项上必须要有唯一的key
                            <li key={item}>
                                {item}--{index}
                                {/* 传参方式一 */}
                                <button onClick={()=>{
                                    this.handleDelClick(index)
                                }}>del</button>
                                {/* 传参方式二 */}
                                <button onClick={this.handleDelClick2.bind(this,index)}>del2</button>
                            </li>
                        )
                    }
                    </ul>
                    :
                    <div>没有待办事项</div>
                }
            </div>
        )
    }

    handleDelClick = (index)=>{
        console.log("del",index)
        // 方式一(深复制原状态)
        let newlist = [...this.state.list]
        // 方式二(深复制原状态)
        // let newlist = this.state.list.concat()
        // 删除相应索引项
        newlist.splice(index,1)
        // 把操作好的数组赋给list
        this.setState({
            list:newlist
        })
    }
    handleDelClick2(index){
        console.log("del2",index)
    }

    handleClick = ()=>{
        // console.log(this.refs.mytext.value)
        // this.state.list.push(this.refs.mytext.value) //不能直接修改原状态

        this.setState({
            // 使用扩展运算符先展开旧状态，再把新状态与之合并
            list:[...this.state.list,this.refs.mytext.value]
        })
    }
}

//原生map
