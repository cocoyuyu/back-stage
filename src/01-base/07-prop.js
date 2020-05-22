import React, { Component } from 'react'
import myPropTypes from 'prop-types' // 引入包含数据类型验证方法（的包）
// console.log(myPropTypes)
// props 用在父子通信， 让组件的复用性大大提高了
// state 自己内部

// 铁锤封装的NavBar 组件
// 属性验证 ：验证每一个属性类型
// 默认属性 ：不传属性时候的默认值。
class Navbar extends Component {
    // props:["mytext"] vue写法
    /*
       vue 属性验证
       props: {
           myshow:Boolean,
           mytext:String
       }
    */
    // react中 通过 * this.props.属性名 * 获取父组件调用子组件时传递过来的属性值

    // 关键字 属性验证
    static propTypes = { // 固定写法
        mytext:myPropTypes.string, // 通过引入的方法指定属性类型
        myshow:myPropTypes.bool
    }

    // 默认属性
    static defaultProps = { // 固定写法
        myshow:true
    }


    render() {
        return <div>
            {
                this.props.myshow?
                <button>返回</button>
                :null
            }
            <span>{this.props.mytext}--导航栏</span>
            {
                this.props.myshow?
                <button>主页</button>
                :null
            }
        </div>
    }
}

export default class App extends Component {
    render() {

        let obj = {
            mytext:"home",
            myshow:false
        }

        return (
            <div>
                <div style={{ background: "yellow" }}>
                    home页面中使用navabar组件
                    {/* 每个组件调用时显示不同内容，通过属性传递 */}
                    {/* <Navbar mytext={obj.mytext}  myshow={obj.myshow}/> */}
                    {/* 以上代码属性名=obj.属性名，可简写为以下一行代码 */}
                    <Navbar {...obj}/>
                </div>
                <div style={{ background: "skyblue" }}>
                    list页面中使用
                    <Navbar mytext="list" />
                </div>
                <div style={{ background: "red" }}>
                    center页面中使用
                    <Navbar mytext="center"/>
                </div>
            </div>
        )
    }
}
