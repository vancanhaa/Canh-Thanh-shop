import { Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { fetchCart } from "../../stores/actions/cart.action";
import { localStorageUlti } from "../../utils/localStorage";
import common from "../../utils/common";
import CartInner from "./components/cart-inner/CartInner";
import "./cart.scss";
import MainLayout from "../../layouts/main-layout/MainLayout";
import { ROUTE } from "../../constants";
import { Link, useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const userInfo = localStorageUlti("user_info", null).get();
  const cart = useSelector((state) => state.cart.cart);
  useEffect(() => {
    if (userInfo) dispatch(fetchCart({ idUser: userInfo.id }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function CartEmpty({ userInfo }) {
    return (
      <div className="cart-empty">
        <img
          src="https://bizweb.dktcdn.net/100/438/408/themes/896213/assets/blank_cart.svg?1677058997780"
          alt=""
        />
        <p>Giỏ hàng của bạn trống</p>
        <div className="cart-empty__btn-wrap">
          {!userInfo ? (
            <Link className="cart-empty__btn-login" to={ROUTE.LOGIN}>
              Đăng nhập
            </Link>
          ) : null}
          <Link className="cart-empty__btn-shopping" to={ROUTE.PRODUCT}>
            Mua ngay
          </Link>
        </div>
      </div>
    );
  }

  function UserCart({cart, userInfo}) {

    if(cart.products?.length === 0 || !cart.id) return CartEmpty({userInfo})

    return (
      <Row justify="space-between" gutter={[8, 16]}>
        <Col lg={17} md={24} sm={24} xs={24}>
          <div className="cart-inner">
            <div className="cart-inner__header">
              <p className="cart-inner__title">
                <span className="title">GIỎ HÀNG</span>
                <span className="total-cart">
                  &#40;
                  {cart.products?.reduce(
                    (agr, cur, index) => agr + cur.quantity,
                    0
                  )}
                  &#41; Sản phẩm
                </span>
              </p>
            </div>
            <div className="cart-inner__info-header">
              <Row justify="space-between">
                <Col lg={12} md={0} sm={0} xs={0}>
                  Sản phẩm
                </Col>
                <Col lg={4} md={0} sm={0} xs={0}>
                  Đơn giá
                </Col>
                <Col lg={4} md={0} sm={0} xs={0}>
                  Số lượng
                </Col>
                <Col lg={4} md={0} sm={0} xs={0}>
                  Tổng tiền
                </Col>
              </Row>
            </div>
            {<CartInner />}
          </div>
        </Col>
        <Col lg={7} md={24} sm={24} xs={24}>
          <div className="cart-order-wrap">
            <div className="cart-order__header">
              Dùng mã giảm giá trong bước tiếp theo
            </div>
            <div className="total-order__wrap">
              <span className="total-order__title">
                Tổng đơn &#40;Tạm tính&#41;:
              </span>
              <span className="total-order__money">
                {common.formatPrice(
                  cart.products?.reduce(
                    (arg, cur) => arg + cur.price * cur.quantity,
                    0
                  )
                )}{" "}
                đ
              </span>
              <button onClick={() => {
                navigate(ROUTE.CHECK_OUT)
              }}>Đặt hàng</button>
            </div>
          </div>
        </Col>
      </Row>
    );
  }

  return (
    <MainLayout>
      <div className="cart">
        <div className="cart-container">
          {!userInfo ? CartEmpty({ userInfo }) : UserCart({cart, userInfo})}
        </div>
      </div>
    </MainLayout>
  );
}

export default Cart;
