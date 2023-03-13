import { FileDoneOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import React, { useRef } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { RiLogoutBoxLine } from "react-icons/ri";
import { FaBars, FaTimes } from "react-icons/fa";
import { ImLocation } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { ROUTE } from "../../../constants";
import "./header-mobile.scss";
import { logOut } from "../../../stores/slice/auth.slice";
import { BsHandbag } from "react-icons/bs";
function HeaderMobile() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfoState.data);
  const cart = useSelector((state) => state.cart.cart);
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
              <div className="nav-menu__header">
                <button className="nav-btn nav-close-btn" onClick={showNavbar}>
                  <FaTimes />
                </button>
              </div>
              <div className="nav-menu__navbar">
                <ul>
                  <li>
                    <Link to={ROUTE.HOME_PAGE}>TRANG CHỦ</Link>
                  </li>
                  <li>
                    <Link to={ROUTE.PRODUCT}>CỬA HÀNG</Link>
                  </li>
                  <li>
                    <Link to={"/#"}>LIÊN HỆ</Link>
                  </li>
                  <li>
                    <Link to={"/#"}>VỀ CHÚNG TÔI</Link>
                  </li>
                </ul>
              </div>
              <div className="nav-menu__footer">
                <ul>
                  <li>
                    {userInfo ? (
                      <Link to={ROUTE.ACCOUNT}>
                        <span>
                          <AiOutlineUser />
                        </span>
                        <span className="name">{`${userInfo["last_name"]} ${userInfo["first_name"]}`}</span>
                      </Link>
                    ) : (
                      <Link to={ROUTE.LOGIN}>
                        <span>
                          <AiOutlineUser />
                        </span>
                        Đăng nhập
                      </Link>
                    )}
                  </li>
                  <li>
                    <Link to={ROUTE.PROFILE}>
                      <span>
                        <AiOutlineUser />
                      </span>
                      Tài khoản của tôi
                    </Link>
                  </li>
                  <li>
                    <Link to={ROUTE.ORDER}>
                      <span>
                        <FileDoneOutlined />
                      </span>
                      Đơn hàng của tôi
                    </Link>
                  </li>
                  <li>
                    <Link to={ROUTE.ADDRESS}>
                      <span>
                        <ImLocation />
                      </span>
                      Sổ địa chỉ
                    </Link>
                  </li>
                  {userInfo ? (
                    <li
                      className="logout"
                      onClick={() => {
                        dispatch(logOut());
                        showNavbar();
                      }}
                    >
                      <span>
                        <RiLogoutBoxLine />
                      </span>
                      Đăng xuất
                    </li>
                  ) : null}
                </ul>
              </div>
            </nav>
            <button className="nav-btn" onClick={showNavbar}>
              <FaBars />
            </button>
          </div>
        </Col>
        <Col lg={0} md={0} sm={8} xs={8}>
          <div className="header-mobile__logo">
            <Link to={"/"}>CT-shop</Link>
          </div>
        </Col>
        <Col lg={0} md={0} sm={8} xs={8}>
          <div className="header-mobile__cart">
            <Link to={ROUTE.CART}>
              <div className="header-mobile__cart-icon">
                <BsHandbag />
                <div
                  className={
                    cart.products?.length > 0 && cart.products[0].id !== ""
                      ? "header-cart__number-item is-cart"
                      : "header-cart__number-item"
                  }
                >
                  {cart.products?.reduce(
                    (agr, cur, index) => agr + cur.quantity,
                    0
                  )}
                </div>
              </div>
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default HeaderMobile;
