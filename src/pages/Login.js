import React, { useState, useEffect } from "react";

import { Form, Input, Button, message, Col, Row } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { setToken } from "../utils/auth";
import { loginApi, captchas } from "../services/auth";
import "./login.less";

function Login(props) {
  const [codeImg, setCode] = useState();
  const [key, setKey] = useState();
  useEffect(() => {
    getCheckCode();
  }, []);
  const onFinish = async values => {
    console.log("Received values of form: ", values);
    // setToken(values.username);
    // props.history.replace("/admin");
    try {
      const res = await loginApi({
        mobile: values.username,
        password: values.password,
        key: key,
        code: values.captcha
      });
      console.log(res, "res");
      setToken(res.data.token);
      props.history.replace("/admin");
      message.success("登陆成功");
    } catch (err) {
      console.log(err, "err");
      message.error(err.message);
    }
  };
  // 获取图片验证码信息
  const getCheckCode = async () => {
    try {
      const resCodes = await captchas();
      console.log(resCodes.data,'resCodes')

      if (resCodes.data) {
        console.log(resCodes.data)
        setCode(resCodes.data[0].attributes.img);
        setKey(resCodes.data[0].attributes.key);
      }
    } catch (err) {
      console.log(err,'err')
    }
  };
  return (
    <div className="login">
      <div className="login-content">
        <div className="title">
          怪物猎人-冰原 <br /> 登录系统
        </div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="名称"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="密码"
            />
          </Form.Item>
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item
                name="captcha"
                noStyle
                rules={[
                  {
                    required: true,
                    message: "Please input the captcha you got!"
                  }
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <div onClick={getCheckCode} className="code-area">
                <img src={codeImg} alt="" />
              </div>
            </Col>
          </Row>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
