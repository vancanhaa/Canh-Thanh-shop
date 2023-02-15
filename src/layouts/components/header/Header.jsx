import { Col, Row, Input } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./header.scss";
import { ImLocation } from "react-icons/im";
import { AiTwotonePhone, AiOutlineUser } from "react-icons/ai";
import { BsHandbag } from "react-icons/bs";
import { ROUTE } from "../../../constants";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../../stores/slice/auth.slice";
function Header() {
  const dispatch = useDispatch();
  const { Search } = Input;
  const userInfo = useSelector((state) => state.user.userInfoState.data);
  const onSearch = () => {};

  function AccountComponent({userInfo}) {
    const handleLogOut = () => {
      dispatch(logOut());
    };
    if (userInfo)
      return (
        <div className="header-account user">
          <div className="header-account__icon">
            <AiOutlineUser />
          </div>
          <div className="header-account__body">
            <p>{`${userInfo["last_name"]} ${userInfo["first_name"]}`}</p>
          </div>
          <div class="header-account__menu">
            <ul>
              <li>
                <a href="#!">Tài khoản của tôi</a>
              </li>
              <li>
                <a href="#!">Đổi mật khẩu</a>
              </li>
              <li>
                <a href="#!">Sổ địa chỉ</a>
              </li>
              <li>
                <a href="#!">Đã xem gần đây</a>
              </li>
              <li>
                <a href="#!">Sản phẩm yêu thích</a>
              </li>
              <li class="logout" onClick={handleLogOut}>
                <a href="/">Đăng xuất</a>
              </li>
            </ul>
          </div>
        </div>
      );
    return (
      <div className="header-account">
        <div className="header-account__icon">
          <AiOutlineUser />
        </div>
        <div className="header-account__body">
          <Link to={ROUTE.REGISTER}>ĐĂNG KÝ</Link>/
          <Link to={ROUTE.LOGIN}> ĐĂNG NHẬP</Link>
        </div>
      </div>
    );
  }

  function HeaderCartComponent () {
    return (
      <div className="header-cart">
        <Link to={ROUTE.CART}>
        <div className="header-cart__icon">
                    <BsHandbag />
                    {/* <div className="header-cart__number-item">0</div> */}
                  </div>
                  <p>GIỎ HÀNG</p>
        </Link>
        <div className="header-cart__body">
        <div className="header-cart__empty">
          <img src="https://bizweb.dktcdn.net/100/438/408/themes/894085/assets/blank_cart.svg?1676350489702" alt="" />
          <p>Giỏ hàng của bạn trống</p>
          <Link to={ROUTE.SHOP}>Mua ngay</Link>
        </div>
        </div>
                </div>
                  
    )
  }

  return (
    <div className="header">
      <div className="header-container">
        <div className="header-topbar">
          <Row
            justify="space-between"
            style={{ marginLeft: "10px", marginRight: "10px" }}
          >
            <Col lg={12} md={14}>
              <Row justify={"space-between"} gutter={8}>
                <Col flex="140px">
                  <div className="header-logo">
                    <Link to={"/"}>CT-shop</Link>
                  </div>
                </Col>
                <Col flex="auto">
                  <div className="header-search_bar">
                    <Search
                      placeholder="Tìm kiếm"
                      onSearch={onSearch}
                      enterButton
                    />
                  </div>
                </Col>
              </Row>
            </Col>
            <Col lg={6} md={8}>
              <div className="header-contact">
                <div className="header-location">
                  <Link to={"#!"}>
                    <div className="header-location__icon">
                      <ImLocation />
                    </div>
                    <p>Tìm cửa hàng</p>
                  </Link>
                </div>
                <div className="header-phone_number">
                  <Link to={"#!"}>
                    <div className="header-phone_number__icon">
                      <AiTwotonePhone />
                    </div>
                    <p>1800 1010</p>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className="header-bottombar">
          <Row justify="space-between" style={{ margin: "0 10px 0 10px" }}>
            <Col lg={16} md={16}>
              <nav className="header-nav">
                <ul className="list-item-big">
                  <li className="nav-item">
                    <a href="#!">SALE UP TO 50%</a>
                  </li>
                  <li className="nav-item">
                    <a href="#!">NỮ</a>
                  </li>
                  <li className="nav-item">
                    <a href="#!">NAM</a>
                  </li>
                  <li className="nav-item">
                    <a href="#!">TRẺ EM</a>
                  </li>
                  <li className="nav-item">
                    <a href="#!">BỘ SƯU TẬP</a>
                  </li>
                </ul>
              </nav>
            </Col>
            <Col lg={8} md={0}>
              <div className="bottombar-right">
                {HeaderCartComponent()}

                {AccountComponent({userInfo})}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default Header;
