import { Col, Row, Input, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { ImLocation } from "react-icons/im";
import { AiTwotonePhone, AiOutlineUser } from "react-icons/ai";
import { BsHandbag } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { GrUserAdmin } from "react-icons/gr"
import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { v4 } from "uuid";

import "./header.scss";
import { ROUTE } from "../../constants";
import { logOut } from "../../stores/slice/auth.slice";
import { fetchProductList } from "../../stores/actions/product.action";
import { changeTextSearch } from "../../stores/slice/product.slice";
import common from "../../utils/common";
import { fetchCart, fetchChangeCart } from "../../stores/actions/cart.action";
import HeaderMobile from "./header-mobile/HeaderMobile";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchRef = useRef();
  const { Search } = Input;
  const userInfo = useSelector((state) => state.user.userInfoState.data);
  const cart = useSelector((state) => state.cart.cart);
  useEffect(() => {
    if (userInfo) dispatch(fetchCart({ idUser: userInfo.id }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [modal, contextHolder] = Modal.useModal();
  const [valueSearch, setValueSearch] = useState("");

  function AccountComponent({ userInfo }) {
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
          <div className="header-account__menu">
            <ul>
            <li>
                <Link to={ROUTE.PROFILE}>Tài khoản của tôi</Link>
              </li>
              <li>
                <Link to={"#!"}>Đổi mật khẩu</Link>
              </li>
              <li>
                <Link to={ROUTE.ADDRESS}>Sổ địa chỉ</Link>
              </li>
              <li>
                <Link to={"#!"}>Đã xem gần đây</Link>
              </li>
              <li>
                <Link to={"#!"}>Sản phẩm yêu thích</Link>
              </li>
              <li className="logout" onClick={handleLogOut}>
                <Link to={"/"}>Đăng xuất</Link>
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
          <Link to={ROUTE.REGISTER} className="register">ĐĂNG KÝ</Link><span className="register">/</span>
          <Link to={ROUTE.LOGIN}> ĐĂNG NHẬP</Link>
        </div>
      </div>
    );
  }

  function HeaderCartComponent() {
    return (
      <div className="header-cart">
        <Link to={ROUTE.CART}>
          <div className="header-cart__icon">
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
          <p>GIỎ HÀNG</p>
        </Link>
        <div className="header-cart__body">
          {cart.products[0]?.id ? (
            <div className="header-cart__availabel">
              <div className="header-cart__inner">
                {cart.products?.map((item, index) => {
                  return (
                    <div className="header-cart__item" key={v4()}>
                      <Link
                        to={`/product-detail/${item.id}`}
                        className="header-cart__image"
                      >
                        <img src={`${item["image_url"]}`} alt="" width={80} />
                      </Link>
                      <div className="header-cart__item-body">
                        <div className="description-item-wrap">
                          <div className="cart-item">
                            <Link to={`/product-detail/${item.id}`}>
                              {item.name}
                            </Link>
                            <div className="cart-item__price">
                              {common.formatPrice(item.price)}đ
                            </div>
                            <div className="cart-item__options">
                              {item.color
                                ? `${item.color} / ${item.size}`
                                : `${item.size}`}
                            </div>
                          </div>
                          <div
                            className="btn--delete-item"
                            onClick={() => confirm(index)}
                          >
                            <DeleteOutlined />
                          </div>
                        </div>
                        <div className="header-cart__item-bottom">
                          <div className="cart-item__quantity">
                            <button
                              className="item-quantity__btn--minus"
                              onClick={() => handleDecreaseQuantity(index)}
                            >
                              -
                            </button>
                            <input
                              type="number"
                              value={item.quantity}
                              min="1"
                              className="item-quantity__input"
                              disabled
                            />
                            <button
                              className="item-quantity__btn--plus"
                              onClick={() => handleIncreaseQuantity(index)}
                            >
                              +
                            </button>
                          </div>
                          <div className="cart-item__total-price">
                            Tổng cộng:{" "}
                            <span>
                              {common.formatPrice(item.price * item.quantity)}đ
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="header-cart__bottom">
                <p className="header-cart__total-price">
                  Tổng đơn hàng:{" "}
                  <span>
                    {common.formatPrice(
                      cart.products?.reduce(
                        (arg, cur) => arg + cur.price * cur.quantity,
                        0
                      )
                    )}
                    đ
                  </span>
                </p>
                <Link className="header-cart__btn" to={ROUTE.CART}>
                  Xem giỏ hàng
                </Link>
              </div>
            </div>
          ) : (
            <div className="header-cart__empty">
              <img
                src="https://bizweb.dktcdn.net/100/438/408/themes/894085/assets/blank_cart.svg?1676350489702"
                alt=""
              />
              <p>Giỏ hàng của bạn trống</p>
              <Link to={ROUTE.PRODUCT}>Mua ngay</Link>
            </div>
          )}
        </div>
        {contextHolder}
      </div>
    );
  }

  function HeaderAdminComponent ({userInfo}) {
    if(userInfo && userInfo.role === "admin") {
      return (
        <div className="header-admin">
          <Link to={ROUTE.ADMIN}>
            <div className="header-admin__icon">
            <GrUserAdmin />
            </div>
            <p>ADMIN</p>
          </Link>
        </div>
      )
    }
    return null
  }

  const confirm = (index) => {
    modal.confirm({
      className: "confirm-delete-item",
      title: "Bạn có chắc chắn muốn xoá sản phẩm này khỏi giỏ hàng?",
      icon: <ExclamationCircleOutlined />,
      content: `${cart.products[index].name}`,
      okText: "Đồng ý",
      cancelText: "Không",
      onOk: () => handleDeleteItem(index),
    });
  };

  const handleSearch = (value) => {
    let textSearch = value.trim();
    if (textSearch) {
      dispatch(fetchProductList({ page: 1, limit: 12, textSearch }));
      dispatch(changeTextSearch(textSearch));
    }
    setValueSearch("");
    searchRef.current.blur();
    if (textSearch) navigate(ROUTE.PRODUCT);
  };

 

  const handleDeleteItem = (index) => {
    let newProducts = [...cart.products];
    newProducts.splice(index, 1);
    let data = {
      products: newProducts,
    };
    dispatch(fetchChangeCart({ idUser: cart.id, data }));
  };

  const handleIncreaseQuantity = (index) => {
    const newProducts = [...cart.products];
    newProducts[index] = {
      ...newProducts[index],
      quantity: newProducts[index].quantity + 1,
    };
    let data = {
      products: newProducts,
    };
    dispatch(fetchChangeCart({ idUser: cart.id, data }));
  };

  const handleDecreaseQuantity = (index) => {
    let newProducts = [...cart.products];
    if (newProducts[index].quantity <= 1) {
      confirm(index);
    } else {
      newProducts[index] = {
        ...newProducts[index],
        quantity: newProducts[index].quantity - 1,
      };
      let data = {
        products: newProducts,
      };
      dispatch(fetchChangeCart({ idUser: cart.id, data }));
    }
  };

 

 


  return (
    <div className="header">
      <div className="header-container">
        <HeaderMobile/>
        <div className="header-topbar">
          <Row
            justify="space-between"
            style={{ marginLeft: "10px", marginRight: "10px" }}
          >
            <Col lg={12} md={14} xs={0} sm={0}>
              <Row justify={"space-between"} gutter={8}>
                <Col flex="140px">
                  <div className="header-logo">
                    <Link to={"/"}>CT-shop</Link>
                  </div>
                </Col>
                <Col flex="auto" >
                  <div className="header-search_bar">
                    <Search
                      ref={searchRef}
                      placeholder="Tìm kiếm"
                      onSearch={handleSearch}
                      enterButton
                      value={valueSearch}
                      onChange={(e) => setValueSearch(e.target.value)}
                    />
                  </div>
                </Col>
              </Row>
            </Col>
            <Col lg={6} md={8} sm={0} xs={0}>
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
            <Col lg={16} md={16} sm={0} xs={0}>
              <nav className="header-nav">
                <ul className="list-item-big">
                <li className="nav-item">
                <Link to={ROUTE.HOME_PAGE}>TRANG CHỦ</Link>
                  </li>
                  <li className="nav-item">
                  <Link to={ROUTE.PRODUCT}>CỬA HÀNG</Link>
                  </li>
                  <li className="nav-item">
                  <Link to={"/#"}>LIÊN HỆ</Link>
                  </li>
                  <li className="nav-item">
                  <Link to={"/#"}>VỀ CHÚNG TÔI</Link>
                  </li>
                </ul>
              </nav>
            </Col>
            <Col lg={8} md={8} sm={0} xs={0}>
              <div className="bottombar-right">
                {HeaderAdminComponent({userInfo})}
                {HeaderCartComponent()}
                {AccountComponent({ userInfo })}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default Header;
