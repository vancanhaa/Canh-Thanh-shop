import "./cart.scss";
import MainLayout from "../../layouts/main-layout/MainLayout";
import { Row, Col } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

function Cart() {
  return (
    <MainLayout>
      <div className="cart">
        <div className="cart-container">
          <Row justify="space-between" gutter={[8, 16]}>
            <Col lg={17} md={24} sm={24} xs={24}>
              <div className="cart-inner">
                <div className="cart-inner__header">
                  <p className="cart-inner__title">
                    <span className="title">GIỎ HÀNG</span>
                    <span className="total-cart">&#40;10&#41; Sản phẩm</span>
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
                <div className="cart-inner__item-availabel">
                  <Row justify="space-between" className="item-availabel__row">
                    <Col lg={12}>
                      <Row>
                        <Col flex="90px">
                          <img
                            src="https://bizweb.dktcdn.net/100/438/408/products/apm3299-xxm-7.jpg?v=1673602563443"
                            alt=""
                            width={90}
                          />
                        </Col>
                        <Col flex="auto" style={{ marginLeft: "12px" }}>
                          <div className="item-availabel__option-wrap">
                            <div className="item-availabel__name">
                              <h4>
                                Quần Jeans Nam Ống Suông Co Giãn Thoáng Mát
                              </h4>
                            </div>
                            <div className="item-availabel__option">
                              Xanh / M
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                    <Col lg={4}>1.000.000đ</Col>
                    <Col lg={4}>
                      <div className="item-availabel__quantity">
                        <button className="item-quantity__btn--minus">-</button>
                        <input
                          type="number"
                          defaultValue={1}
                          min="1"
                          className="item-quantity__input"
                        />
                        <button className="item-quantity__btn--plus">+</button>
                      </div>
                    </Col>
                    <Col lg={4}>
                      <div className="item-availabel__total-wrap">
                        <div className="total">10.000.000đ</div>
                        <div className="delete-item__icon">
                          <DeleteOutlined />
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
            <Col lg={7} md={24} sm={24} xs={24}>
              <div className="cart-order-wrap">
                <div className="cart-order__header">
                  Dùng mã giảm giá trong bước tiếp theo
                </div>
                <div className="total-order__wrap">
                  <span className="total-order__title">Tổng đơn &#40;Tạm tính&#41;:</span>
                  <span className="total-order__money">4.000.000đ</span>
                  <button>Đặt hàng</button>
                </div>
                
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </MainLayout>
  );
}

export default Cart;
