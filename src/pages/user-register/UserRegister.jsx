import { Button, Col, Form, Input, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, Route } from "react-router-dom";
import { v4 } from "uuid";
import FullLayout from "../../layouts/full-layout/FullLayout";
import { registerAction } from "../../stores/actions/auth.action";
import "./user-register.scss";
import { ROUTE } from "../../constants/index";


function UserRegister() {

const dispatch = useDispatch()
const userInfo = useSelector((state) => state.user.userInfoState.data);

  const isRegisterSuccess = useSelector((state)=> state.user.userInfoState.isRegisterSuccess)
  const onRegister = (values) => {
    const payload = {
      id: v4(),
      role: "user",
      email: values.email,
      password: values.password,
      "first_name": values.firstName,
      "last_name": values.lastName,
      phone: values.phone
    }
    dispatch(registerAction(payload))
  };

  if (isRegisterSuccess) {
    return <Navigate to={ROUTE.LOGIN} />;
  };

  if (userInfo) return <Navigate to={ROUTE.HOME_PAGE} />;

  return (
    <FullLayout>
      <div className="user-register-container">
        <Row align="middle" justify="center"> 
          <Col xs={24} sm={24} md={24} lg={24}>
            <div className="user-register-center">
              <div className="user-register-logo">
                <Row justify="center">
                <Link to="/">CT-shop</Link>
                </Row>
              </div>

              <div className="user-register-form">
                <Form
                  name="complex-form"
                  initialValues={{
                    remember: true,
                  }}
                  autoComplete="off"
                  onFinish={onRegister}
                >
                  <legend>
                    <h2>Đăng ký</h2>
                  </legend>
                  <Row justify="center" gutter={16}>
                    <Col xs={22} sm={20} md={12} xl={12}>
                      <Form.Item
                        name="lastName"
                        rules={[
                          {
                            required: true,
                            message: "Họ của bạn là gì?"
                          },
                        ]}
                      >
                        <Input size="large" placeholder="Họ" prefix />
                      </Form.Item>
                    </Col>
                    <Col xs={22} sm={20} md={12} xl={12}>
                      <Form.Item
                        name="firstName"
                        rules={[
                          {
                            required: true,
                            message: "Tên của bạn là gì?"
                          },
                        ]}
                      >
                        <Input size="large" placeholder="Tên" prefix/>
                      </Form.Item>
                    </Col>
                  </Row>
                  
                  <Row justify="center" gutter={16}>
                    <Col xs={22} sm={20} md={12} xl={12}>
                      <Form.Item
                        name="email"
                        rules={[
                          {
                            type: "email",
                            required: true,
                            message: "Email không hợp lệ!",
                          },
                        ]}
                      >
                        <Input size="large" placeholder="Email" prefix/>
                      </Form.Item>
                    </Col>
                    <Col xs={22} sm={20} md={12} xl={12}>
                      <Form.Item
                        name="phone"
                        rules={[
                          {
                            type: "tel",
                            required: true,
                            message: "Số điện thoại không hợp lệ!",
                          },
                        ]}
                      >
                        <Input size="large" placeholder="SĐT" type="tel"  prefix/>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row justify="center" gutter={16}>
                    <Col xs={22} sm={20} md={12} xl={12}>
                      <Form.Item
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập mật khẩu!"

                          },
                        ]}
                      >
                        <Input.Password size="large" placeholder="Mật khẩu" />
                      </Form.Item>
                    </Col>
                    <Col xs={22} sm={20} md={12} xl={12}>
                      <Form.Item
                        name="confirm"
                        dependencies={["password"]}
                        hasFeedback
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập lại mật khẩu!"

                          },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (
                                !value ||
                                getFieldValue("password") === value
                              ) {
                                return Promise.resolve();
                              }

                              return Promise.reject(
                                new Error("Xác nhận mật khẩu không đúng!")
                              );
                            },
                          }),
                        ]}
                      >
                        <Input.Password
                          size="large"
                          placeholder="Xác nhận mật khẩu"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row justify="center" align="center">
                    <Col xs={22} sm={20} md={24} xl={24}>
                      <Form.Item className="form-item__submit">
                        <Button
                          type="primary"
                          htmlType="submit"
                          className="register-form-button"
                        >
                          Đăng ký
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row justify="center">
                    <span>
                      Bạn đã có tài khoản? <Link to="/login"> Đăng nhập ngay!</Link>
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

export default UserRegister;
