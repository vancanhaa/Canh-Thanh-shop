import FullLayout from "../../layouts/full-layout/FullLayout";
import { Button, Checkbox, Col, Form, Input, Row } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link, Navigate } from "react-router-dom";

import "./user-login.scss";
import { ROUTE } from "../../constants/index";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../stores/actions/auth.action";
import { useEffect } from "react";

function UserLogin() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfoState.data);
  const onLogin = (values) => {
    const payload = {
      email: values.email,
      password: values.password,
    };
    dispatch(loginAction(payload));
  };

  if (userInfo) return <Navigate to={ROUTE.HOME_PAGE} />;

  return (
    <FullLayout>
      <div className="user-login-container">
        <Row align="middle" justify="center">
          <Col xs={24} sm={24} md={24} lg={24}>
            <div className="user-login-center">
              <div className="user-login-logo">
                <Row justify="center">
                <Link to="/">CT-shop</Link>
                </Row>
              </div>

              <div className="user-login-form">
                <Form
                  name="complex-form"
                  className="login-form"
                  initialValues={{
                    remember: true,
                  }}
                  autoComplete="off"
                  onFinish={onLogin}
                >
                  <legend>
                    <h2>Đăng nhập</h2>
                  </legend>
                  <Row justify="center">
                    <Col xs={22} sm={20} md={18} xl={18}>
                      <Form.Item
                        name="email"
                        rules={[
                          {
                            type: "email",
                            required: true,
                            message: "Vui lòng nhập địa chỉ email!",
                          },
                        ]}
                      >
                        <Input
                          prefix={
                            <UserOutlined className="site-form-item-icon" />
                          }
                          placeholder="Email"
                          size="large"
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row justify={"center"}>
                    <Col xs={22} sm={20} md={18} xl={18}>
                      <Form.Item
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập mật khẩu!",
                          },
                        ]}
                      >
                        <Input.Password
                          prefix={
                            <LockOutlined className="site-form-item-icon" />
                          }
                          size="large"
                          placeholder="Mật khẩu"
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row justify={"center"}>
                    <Col xs={22} sm={20} md={18} xl={18}>
                      <Form.Item>
                        <Row align="center" justify="space-between">
                          <Form.Item name="remember" valuePropName="checked">
                            <Checkbox>Remember me</Checkbox>
                          </Form.Item>
                          <Form.Item>
                            <a className="login-form-forgot" href="#">
                              Quên mật khẩu?
                            </a>
                          </Form.Item>
                        </Row>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row justify="center" align="center">
                    <Col xs={22} sm={20} md={24} xl={24}>
                      <Form.Item className="form-item__submit">
                        <Button
                          type="primary"
                          htmlType="submit"
                          className="login-form-button"
                        >
                          Đăng nhập
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row justify="center">
                    <span>
                      Bạn chưa có tài khoản?<Link to="/register"> Đăng ký ngay</Link>
                    </span>
                  </Row>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </FullLayout>
  );
}

export default UserLogin;
