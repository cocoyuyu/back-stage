import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Roles from './Roles'
import Rights from './Rights'
import { Tabs } from 'antd';
const { TabPane } = Tabs;

export default class Manage extends Component {
  // state = {
  //   tabKey:"/roles"
  // }
  tabChange = (key) => {
    console.log(key);
    this.props.history.push({ // 编程式导航
      pathname: '/right-manage'+ key
    });
    // this.setState({
    //   tabKey: key
    // })
  }
  render() {
    return (
      <div>
        <div>
          <Tabs defaultActiveKey="/right-manage/roles" onChange={this.tabChange}>
            <TabPane tab="角色列表" key="/roles">
              {/* <Roles /> */}
            </TabPane>
            <TabPane tab="权限列表" key="/rights">
              {/* <Rights /> */}
            </TabPane>
          </Tabs>,
        </div>
        <Switch>
          <Route path="/right-manage/roles" component={Roles} />
          <Route path="/right-manage/rights" component={Rights} />
          <Redirect from="/right-manage" to="/right-manage/roles" />
        </Switch>
      </div>
    )
  }
}
