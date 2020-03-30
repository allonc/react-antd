import React from "react";
import { withRouter } from "react-router-dom";
import logo from "./logo.jpg";
import { adminRoutes } from "../../routes";
import { removeToken } from "../../utils/auth";
import "./index.scss";
import { Layout, Menu, Dropdown } from "antd";
import { AreaChartOutlined, ShopOutlined } from "@ant-design/icons";
const map = {};

map["AreaChartOutlined"] = <AreaChartOutlined />;
map["ShopOutlined"] = <ShopOutlined />;
// const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const routes = adminRoutes.filter(route => route.isShow);

function index(props) {
  const onClick = ({ key }) => {
    if (key === "loginOut") {
      removeToken();
      props.history.push("/login");
    } else {
      // message.info(`Click on item ${key}`);
    }
  };
  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key="set">商家设置</Menu.Item>
      <Menu.Item key="pay">充值</Menu.Item>
      <Menu.Item key="loginOut">推出登录</Menu.Item>
    </Menu>
  );

  return (
    <Layout>
      <Header className="header">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <Dropdown overlay={menu}>
          <div className="menu" onClick={onClick}>管理员</div>
        </Dropdown>
      </Header>

      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            {routes.map(route => {
              return (
                <Menu.Item
                  key={route.path}
                  onClick={p => props.history.push(p.key)}
                >
                  {map[route.icon]}
                  {route.title}
                </Menu.Item>
              );
            })}
          </Menu>
        </Sider>
        <Layout style={{ padding: "24px 24px" }}>
          {/* <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb> */}
          <Content
            className="site-layout-background content"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280
            }}
          >
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default withRouter(index);
