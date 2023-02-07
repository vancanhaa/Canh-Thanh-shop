import { Button, Checkbox, Col, Form, Input, Row } from "antd";
import {
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React, { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./user-register-login.scss";
import { loginAction } from "../../stores/slice/user.slice";

function UserLogin() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfoState);

  useEffect(() => {
    localStorage.removeItem("REGISTER")
  }, [])

  const onLogin = (values) => {
    console.log(values)
    dispatch(loginAction(values));
  };

  if (userInfo.data) return <Navigate to={"/"} />;

  return (
    <div className="register-login-container">
      <div className="register-login-header">
        <Row>
          <Col push="6">
            <Link to="/">
              <p>CTshop</p>
            </Link>
          </Col>
        </Row>
      </div>
      <div className="register-login-center">
        <div className="register-login">
          <div className="user-form">
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
              onFinish={onLogin}
            >
              <legend>
                <h2>Login</h2>
              </legend>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "This is not a valid email!",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Email"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  size="large"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="">
                  Forgot password
                </a>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                >
                  Log in
                </Button>
              </Form.Item>
              <Row justify="center">
                Didn't have account?<Link to={"/register"}> Register now!</Link>
              </Row>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
