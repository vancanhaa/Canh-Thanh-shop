import { FileDoneOutlined, UserOutlined } from "@ant-design/icons";
import { Col, Menu, Row } from "antd";
import React, { useEffect, useState } from "react";
import { ImLocation } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ROUTE } from "../../constants";
import MainLayout from "../../layouts/main-layout/MainLayout";
import { logOut } from "../../stores/slice/auth.slice";
import { getItem } from "../../utils/menu";
import "./account.scss";
function Account() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("TÀI KHOẢN");
  const location = useLocation();
  const userInfo = useSelector((state) => state.user.userInfoState.data);
  useEffect(() => {
    if (location.pathname === "/account/address") {
      setTitle("ĐỊA CHỈ");
    } else if (location.pathname === "/account/order") {
      setTitle("ĐƠN HÀNG");
    } else if (location.pathname.includes("/account/order-detail")) {
      setTitle("CHI TIẾT ĐƠN HÀNG");
    } else {
      setTitle("TÀI KHOẢN");
    }
  }, [location.pathname]);
  const navigate = useNavigate();
  const items = [
    getItem("Tài khoản của tôi", ROUTE.PROFILE, <UserOutlined />),
    getItem("Đơn hàng của tôi", ROUTE.ORDER, <FileDoneOutlined />),
    getItem("Sổ địa chỉ", ROUTE.ADDRESS, <ImLocation />),
  ];
  const handleSelect = (value) => {
    navigate(value.key);
  };
  console.log(location.pathname);
  return (
    <MainLayout>
      <div className="account">
        <div className="account-container">
          <div className="account-header">{title}</div>
          <Row justify="space-between" align="top" gutter={[16, 16]}>
            <Col lg={6} md={6} sm={0} xs={0}>
              <div className="account-menu_bar">
                <div className="menu_bar-header">
                  <div className="menu_bar-avatar">
                    <UserOutlined />
                  </div>
                  <p className="menu_bar-user_name">{`${userInfo.last_name} ${userInfo.first_name}`}</p>
                  <button
                    className="btn-logout"
                    onClick={() => {
                      navigate("/");
                      dispatch(logOut());
                    }}
                  >
                    Đăng xuất
                  </button>
                </div>
                <div className="menu_bar-body">
                  <Menu
                    defaultSelectedKeys={[ROUTE.PROFILE]}
                    selectedKeys={[
                      location.pathname === "/account"
                        ? ROUTE.PROFILE
                        : location.pathname,
                    ]}
                    mode="inline"
                    items={items}
                    onSelect={handleSelect}
                  />
                </div>
              </div>
            </Col>
            <Col lg={18} md={18} sm={24}>
              <Outlet />
            </Col>
          </Row>
        </div>
      </div>
    </MainLayout>
  );
}

export default Account;
