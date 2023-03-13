import { Col, Row } from "antd";
import React, { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

import { Link } from "react-router-dom";
import "./header-mobile.scss";
function HeaderMobile() {
  const navRef = useRef();
  const showNavbar = () => {
    navRef.current.classList.toggle("responsive");
  };
  return (
    <div className="header-mobile">
      <Row justify="space-between" align="middle">
        <Col lg={0} md={0} sm={8} xs={8}>
          <div className="header-menu">
            <nav ref={navRef}>
              <a href="/#">Trang chủ</a>
              <a href="/#">Cửa hàng</a>
              <a href="/#">Liên hệ</a>
              <a href="/#">Về chúng tôi</a>
              <button className="nav-btn nav-close-btn" onClick={showNavbar}>
                <FaTimes />
              </button>
            </nav>
            <button className="nav-btn" onClick={showNavbar}>
              <FaBars />
            </button>
          </div>
        </Col>
        <Col lg={0} md={0} sm={8} xs={8}>
          <div className="header-logo">
            <Link to={"/"}>CT-shop</Link>
          </div>
        </Col>
        <Col lg={0} md={0} sm={8} xs={8}></Col>
      </Row>
    </div>
  );
}

export default HeaderMobile;
