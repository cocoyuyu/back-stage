import React, { Component } from 'react'
import {
  HashRouter, // 构建 hash 路由
  // BrowserRouter, // 构建 history 路由
  Redirect,
  Route,
  Switch
} from 'react-router-dom'

// ----------blog自定义组件------------------
import DashBoard from '../views/dashBoard/DashBoard'
import Login from '../views/login/Login'

export default class App extends Component {
  render() {
    return (
      <HashRouter>
        {/* <Switch></Switch> 只会渲染匹配到的第一项 */}
        <Switch>
          {/* 路径匹配则使用指定组件  */} {/* DashBoard 面板---模糊匹配 */}
          {/* <Route path="/" component={DashBoard} exact></Route> */}
          <Route path="/login" component={Login}></Route>
          <Route path="/" render={() =>
            localStorage.getItem("token") ? <DashBoard /> : <Redirect to="/login" />
          } />
        </Switch>
      </HashRouter>
    )
  }
}
