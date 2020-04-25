import React, { useRef, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import logo from "./logo.jpg";
import { adminRoutes } from "../../routes";
import { removeToken } from "../../utils/auth";
import "./index.scss";
import { Layout, Menu, Dropdown, Badge } from "antd";
import { AreaChartOutlined, ShopOutlined } from "@ant-design/icons";
import { infoApi } from "../../services/frame";

const map = {};

map["AreaChartOutlined"] = <AreaChartOutlined />;
map["ShopOutlined"] = <ShopOutlined />;
// const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const routes = adminRoutes.filter((route) => route.isShow);

function Index(props) {
  const onClick = ({ key }) => {
    if (key === "loginOut") {
      removeToken();
      props.history.push("/login");
    } else {
      if (key === "notice") {
        props.history.push("/admin/notices");
      }
    }
  };

  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key="notice">通知中心</Menu.Item>
      <Menu.Item key="pay">充值</Menu.Item>
      <Menu.Item key="loginOut">推出登录</Menu.Item>
    </Menu>
  );
  const [adminInfo, setInfo] = useState({
    login_realname: "",
  });
  const content = useRef();
  const showHigh = () => {
    console.log(content, "content");
    content.current.scrollTop = 0;
  };
  const getInfo = async () => {
    try {
      const res = await infoApi();
      const info = res.data;
      setInfo(info);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // (async () => {
    //   try {
    //     const res = await infoApi();
    //     const info = res.data;
    //     setInfo(info);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // })();
    getInfo();
    props.dispatch({ type: "GET_HIGH", showHigh });
    props.dispatch({ type: "GET_INFO", getInfo });
  }, []);
  return (
    <Layout>
      <Header className="header">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <Dropdown overlay={menu}>
          <Badge dot={!props.isAllRead}>
            <div className="menu" onClick={onClick}>
              {adminInfo.login_realname}
            </div>
          </Badge>
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
            {routes.map((route) => {
              return (
                <Menu.Item
                  key={route.path}
                  onClick={(p) => props.history.push(p.key)}
                >
                  {map[route.icon]}
                  {route.title}
                </Menu.Item>
              );
            })}
          </Menu>
        </Sider>
        <div ref={content} style={{ width: "100%", overflowX: "hidden" }}>
          <Content
            className="site-layout-background content"
            style={{
              padding: 24,
              margin: 0,
              background: "#f0f2f5",
            }}
          >
            {props.children}
          </Content>
        </div>
      </Layout>
    </Layout>
  );
}

export default connect((state) => state.notice)(withRouter(Index));
