// 1. 从 redux 中解构并引入创建仓库的方法/应用中间件的方法
import { createStore, applyMiddleware,compose } from 'redux'
// 引入插件
import reduxPromise from 'redux-promise'
import reduxThunk from 'redux-thunk'
// 唯一修改状态的地方，是个函数 //普通函数=> (接收参数==>返回新状态)
//prevState 老状态
const reducer = (prevState = {
  isCollapsed: false, //初始状态
  roleList: [],
  rightList: []
}, action) => {
  console.log(action)
  // 深复制prevState, 返回修改后的新状态
  // action是发布者自动传来要修改成什么值
  // prevState.isCollapsed = payload
  let { type, payload } = action // 从 action 中解构出 type,payload 值
  let newState = { ...prevState } // 深复制老状态
  switch (type) { // 根据 type 属性值进行修改等系列操作
    // 处理折叠
    case 'coco_change_collapse':
      newState.isCollapsed = payload  // 修改值
      return newState;
    case 'coco_save_rolelist':
      // 处理 roleList
      // console.log(payload)
      newState.roleList = payload  // 修改值
      return newState;
    default:
      return prevState; // 匹配不存在时返回老状态
  }
}

// redux 扩展工具配置
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// 2. 调用方法返回值即是store对象(实例化仓库)
const store = createStore(reducer, composeEnhancers(applyMiddleware(reduxPromise,reduxThunk)))//第二参数， 可以设置中间件 || 初始状态  //应用中间件，让redux dispatch 方法支持promise对象
// 3. 导出仓库
export default store

// 发布者发布的这个对象就是reducer 中的action值
// store.dispatch({
  //  可能要发布好多的action ,用 type 来区分
// })
// store.subscribe(()=>{}) //订阅者更新
