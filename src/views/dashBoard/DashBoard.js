import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import Home from '../home/Home'
import Users from '../userMange/Users'
import Error from '../error/Error'
import Manage from '../right-mange'
import SideMenu from './SideMenu'
import TopHeader from './TopHeader'
import List from '../article-manage/List'
import Preview from '../article-manage/Preview'
import Create from '../article-manage/Create'
import Update from '../article-manage/Update'
import './index.css'
import { Layout } from 'antd';
const { Content } = Layout;
// console.log(menuArr)
export default class DashBoard extends Component {
  render() {
    let {roleType} = JSON.parse(localStorage.getItem("token"))
    return (

      <Layout>
        {/* 自定义的 */}
        <SideMenu></SideMenu>
        <Layout className="site-layout">
          <TopHeader></TopHeader>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 'auto',
            }}
          >
            {/* 内容区标签内是根据路径匹配的组件 */}
            <Switch>
              {/* home 路由 */}
              <Route path="/home" component={Home} />

              {/* 用户权限-用户列表 */}
              {
                roleType >=3 ?
                <Route path="/user-manage/users" component={Users} /> : null
              }

              {/* 权限管理-角色列表，权限列表 */}
              {
                roleType >=3 ?
                <Route path="/right-manage" component={Manage} /> : null
              }

              {/* 文章管理-文章列表 文章分类 */}
              <Route path="/article-manage/list" component={List} />
              <Route path="/article-manage/create" component={Create} />
              <Route path="/article-manage/update/:id" component={Update} />
              {/* n篇文章对应一个路由页面，故采用动态路由,优化加精确匹配 */}
              <Route path="/article-manage/preview/:myid" component={Preview} exact />
              <Redirect from="/" to="/home" exact />
              {/*  exact-如果想有错误页面，重定向要精准匹配 */}
              <Route path="*" component={Error} />
            </Switch>

          </Content>
        </Layout>
      </Layout>

    )
  }
}
