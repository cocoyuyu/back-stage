// 1. 从 redux 中解构并引入创建仓库的方法/应用中间件的方法
import { createStore, applyMiddleware,compose,combineReducers } from 'redux'
// 引入插件
import reduxPromise from 'redux-promise'
import reduxThunk from 'redux-thunk'
// 引入子reducer
import collapseReducer from './reducers/collapseReducer'
import roleListReducer from './reducers/roleListReducer'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/*
    reducer 拆成几个子reducer
    combineReducer(合并子reducer为一个大的reducer)
*/
const reducer = combineReducers({
  isCollapsed:collapseReducer,
  roleList:roleListReducer
})
// 2. 调用方法返回值即是store对象(实例化仓库)
const store = createStore(reducer, composeEnhancers(applyMiddleware(reduxPromise,reduxThunk)))//第二参数， 可以设置中间件 || 初始状态  //应用中间件，让redux dispatch 方法支持promise对象
// 3. 导出仓库
export default store

// 发布者发布的这个对象就是reducer 中的action值
// store.dispatch({
  //  可能要发布好多的action ,用 type 来区分
// })
// store.subscribe(()=>{}) //订阅者更新

/*
    reducer 必须是纯函数设计

        1. 对外界没有副作用的函数
        2. 同样的输入得到同样的输出
    */
    // var myname = "111111"
    // function test(){
    //     myname = "22222"

    // }
    // test( ) //不纯

    // var myname = "11111"

    // function test(a){
    //     a = "222222"
    // }
    // test(myname) //纯

    // var obj={
    //     name:"kerwin",
    //     age:100
    // }

    // function test(prevState){
    //     prevState.name="xiaoming"
    // }
    // test(obj) //不纯

    // var obj={
    //     name:"kerwin",
    //     age:100
    // }

    // function test(prevState){
    //     var newstate = {...prevState}
    //     newstate.name="xiaoming"
    //     return newstate
    // }
    // test(obj) //纯

    // var obj={
    //     name:"kerwin",
    //     age:100
    // }

    // function test(prevState){
    //     var newstate = {...prevState}
    //     newstate.name="xiaoming"+Math.random()
    //     return newstate
    // }
    // test(obj) //不纯


