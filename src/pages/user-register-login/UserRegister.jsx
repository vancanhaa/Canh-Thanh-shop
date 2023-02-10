import { Button, Col, Form, Input, Row } from "antd";
import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";


import "./user-register-login.scss"
import { registerAction } from "../../stores/actions/auth.action";

function UserRegister() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
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
    dispatch(registerAction(payload));
  };

  if (localStorage.getItem("REGISTER") === "register") {
    return <Navigate to={"/login"} />;
  }
  
  console.log("hello")


  return (
    <div className="register-login-container">
      <div className="register-login-center">
        <div className="register-login">
          <div className="user-form">
            <Form
              name="complex-form"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              initialValues={{
                remember: true,
              }}
              autoComplete="off"
              onFinish={onRegister}
            >
              <legend>
                <h2>Register</h2>
              </legend>
              <Row>
                <Col xs={24} sm={24} md={12} xl={12}>
                  <Form.Item
                    name="firstName"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input size="large" placeholder="First name" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} xl={12}>
                  <Form.Item
                    name="lastName"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input size="large" placeholder="Last name" />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col xs={24} sm={24} md={12} xl={12}>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input.Password size="large" placeholder="Password" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} xl={12}>
                  <Form.Item
                    name="confirm"
                    dependencies={["password"]}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        // type: "regexp",
                        // pattern: new RegExp(/\d+/g),
                        // message: "Wrong format!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }

                          return Promise.reject(
                            new Error("The two passwords do not match!")
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      size="large"
                      placeholder="Confirm password"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col xs={24} sm={24} md={12} xl={12}>
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        type: "email",
                        required: true,
                        message: "This is not a valid email!",
                      },
                    ]}
                  >
                    <Input size="large" placeholder="Email" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} xl={12}>
                  <Form.Item
                    name="phone"
                    rules={[
                      {
                        type: "tel",
                        required: true,
                        message: "This is not a valid phone!",
                      },
                    ]}
                  >
                    <Input size="large" placeholder="Phone" />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                >
                  Register
                </Button>
              </Form.Item>
              <Row justify="center">
                <span>
                  Already have account? <Link to="/login"> Login</Link>
                </span>
              </Row>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserRegister