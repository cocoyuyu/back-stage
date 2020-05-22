import React, { Component } from 'react'
import { Layout, Menu } from 'antd';
import MenuArr from '../../router/menu.js'
import { withRouter } from 'react-router'
// 引入 connect 高阶函数
import { connect } from 'react-redux'
const { Sider } = Layout;
const { SubMenu } = Menu;

class SideMenu extends Component {
  state = {
    collapsed: false,
  };
  renderMenu = (menus) => {
    // roleType 当前登录用户的roleType
    let { roleType } = JSON.parse(localStorage.getItem("token"))
    return menus.map(item => {
      //提示：判断当前登录的用户的角色值（roleType），跟当前要渲染的侧边栏项需要的角色值进行对比
      if (item.children && roleType >= item.permission) {
        // 有二级菜单
        return <SubMenu
          key={item.path}
          title={
            <span>
              <item.icon />
              <span>{item.title}</span>
            </span>
          }
        >
          { // 递归调用
            this.renderMenu(item.children)
          }
        </SubMenu>

      } else {
        // 无二级菜单
        if (roleType < item.permission) {
          return null
        }
        return <Menu.Item key={item.path} icon={<item.icon />}>
          {item.title}
        </Menu.Item>
      }
    }
    )
  }
  // 切换视图
  handleChangeView = (obj) => {
    // console.log(obj)
    this.props.history.push(obj.key) // obj.key 拿到对应的路径
  }

  componentDidMount() {
    // 订阅方法，离开组件，一定要取消订阅
    // this.unscribe = store.subscribe(() => {
    //   console.log('我是SideMenu中的订阅者', store.getState())
    //   // store.getState() 固定写法，获取最新状态，是个对象
    //   this.setState({
    //     collapsed: store.getState().isCollapsed
    //   })
    // })
    // // console.log(this.unscribe) 是个函数
  }

  componentWillUnmount() {
    //销毁
    // this.unscribe() //取消订阅方法
    //clearInterval(this.id)
  }
  render() {
    // console.log(this.props)
    // 拿到路径
    // console.log(this.props.location)
    let selectedKey = this.props.location.pathname
    let openKey = "/" + selectedKey.split("/")[1] //截取二级路由的一级路径
    // console.log(openKey)
    return (
      <Sider trigger={null} collapsible collapsed={this.props.isCollapsed}>
        {/* <div className="logo" /> */}
        {/*
          defaultSelectedKeys 默认高亮谁
          defaultOpenKeys	初始展开的 SubMenu 菜单项 key 数组
         */}
        <Menu theme="dark" mode="inline"
          defaultSelectedKeys={[selectedKey]}
          defaultOpenKeys={[openKey]}
          onClick={this.handleChangeView} // 	点击 MenuItem 调用此函数
        >
          {
            this.renderMenu(MenuArr)
          }
        </Menu>
      </Sider>
    )
  }
}

// connect 拿到了store, store.getState()
const mapStateToProps = state => {

  // console.log(state)
  return {
      name:"Coco",
      isCollapsed:state.isCollapsed
  } //函数返回值 ，就是将来往sideMenu 组件传来的属性
}// 映射redux 状态==>当前组件属性

// 高阶组件
export default connect(mapStateToProps)(withRouter(SideMenu))

// connect 高阶组件， connect(配置信息)(当前组件)
