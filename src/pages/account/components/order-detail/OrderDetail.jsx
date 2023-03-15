import { Col, Row } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { v4 } from "uuid";
import { ROUTE } from "../../../../constants";
import { PAYMENTS_METHOD } from "../../../../constants/checkout.const";
import { STATUS_ORDER } from "../../../../constants/order.const";
import { fetchOrderDetail } from "../../../../stores/actions/order.action";
import common from "../../../../utils/common";
import "./order-detail.scss";

function OrderDetail() {
  const { idOrder } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const orderDetail = useSelector((state) => state.order.orderDetail);
  useEffect(() => {
    dispatch(fetchOrderDetail(idOrder));
  }, []);
  console.log(orderDetail)
  if (orderDetail) {
    const statusOrderLabel = STATUS_ORDER.find(
      (status, index) => status.status === orderDetail.status_order
    )?.label;

    return (
      <div className="order-detail">
        <div className="order-detail-container">
          <div className="order-detail-header">
            <div className="order-detail-header__title">
              Chi tiết đơn hàng #{idOrder.slice(0, 5)}
            </div>
            <div className="order-detail-header__time_create">
              Ngày đặt hàng: {orderDetail.time_create}
            </div>
          </div>
          <div className="order-detail-content">
            <Row className="order-detail__status">
              <Col lg={12} md={12} sm={24} xs={24}>
                Trạng thái thanh toán:{" "}
                <span>
                  {orderDetail.status_payment
                    ? "Đã thanh toán"
                    : "Chưa thanh toán"}
                </span>
              </Col>
              <Col lg={12} md={12} sm={24} xs={24}>
                Trạng thái đơn hàng: <span className={orderDetail.status_order}>{statusOrderLabel}</span>
              </Col>
              <Col span={24}>
                Mã vận đơn:{" "}
                <span>
                  {orderDetail.lading_code
                    ? orderDetail.lading_code
                    : "Chưa có"}
                </span>
              </Col>
            </Row>
            <Row className="order-detail__address-payment" gutter={[8, 8]}>
              <Col lg={12} md={24} sm={24} xs={24}>
                <div className="address-payment__header">Địa chỉ giao hàng</div>
                <div className="address-payment__body">
                  <p>Họ tên: {orderDetail.checkout_address.full_name}</p>
                  <p>Địa chỉ: {orderDetail.checkout_address.address}</p>
                  <p>
                    Số điện thoại: {orderDetail.checkout_address.phone_number}
                  </p>
                </div>
              </Col>
              <Col lg={6} md={12} sm={12} xs={12}>
                <div className="address-payment__header">Thanh toán</div>
                <div className="address-payment__body">
                  <p>
                    {
                      PAYMENTS_METHOD.find(
                        (payment, index) =>
                          payment.value === orderDetail.payment_method
                      ).label
                    }
                  </p>
                </div>
              </Col>
              <Col lg={6} md={12} sm={12} xs={12}>
                <div className="address-payment__header">Ghi chú</div>
                <div className="address-payment__body">
                  {orderDetail.note_shipping
                    ? orderDetail.note_shipping
                    : "Không có"}
                </div>
              </Col>
            </Row>
            <div className="order-detail__cart">
              <Row className="cart-header" gutter={[8, 8]}>
                <Col lg={15} md={15} sm={0} xs={0}>
                  Sản phẩm
                </Col>
                <Col lg={3} md={3} sm={0} xs={0}>
                  Đơn giá
                </Col>
                <Col lg={3} md={3} sm={0} xs={0}>
                  SL
                </Col>
                <Col lg={3} md={3} sm={0} xs={0}>
                  Tổng
                </Col>
              </Row>
              <div className="cart-body">
                {orderDetail.cart.map((item, index) => {
                  const { id, color, image_url, name, quantity, size, price } =
                    item;
                  return (
                    <Row key={v4()} gutter={[8, 8]} className="cart-item">
                      <Col lg={15} md={15} sm={24} xs={24}>
                        <div className="cart-item__wrap">
                          <div style={{width: "90px"}}>
                            <Link to={`/product-detail/${id}`}>
                              <img src={image_url} alt="" width="90px" />
                            </Link>
                          </div>
                          <div style={{flex: 1, marginLeft: "10px"}}>
                            <Row justify="space-between" align="middle" gutter={[8, 24]}>
                              <Col lg={24} md={24} sm={24} xs={24}>
                                <div className="cart-item__description">
                                  <Link
                                    to={`/product-detail/${id}`}
                                    className="cart-item__name"
                                  >
                                    {name}
                                  </Link>
                                  <p>{color ? `${color}/${size}` : size}</p>
                                </div>
                              </Col>
                              <Col lg={0} md={0} sm={10} xs={10} className="cart-item__price">
                                {common.formatPrice(price)}đ
                              </Col>
                              <Col lg={0} md={0} sm={4} xs={4}>
                                x{quantity}
                              </Col>
                              <Col lg={0} md={0} sm={10} xs={10} className="cart-item__total_price">
                                {common.formatPrice(price * quantity)}đ
                              </Col>
                            </Row>
                          </div>
                        </div>
                      </Col>
                      <Col lg={3} md={3} sm={0} xs={0} className="cart-item__price">
                        {common.formatPrice(price)}đ
                      </Col>
                      <Col lg={3} md={3} sm={0} xs={0}>
                        {quantity}
                      </Col>
                      <Col lg={3} md={3} sm={0} xs={0} className="cart-item__total_price">
                        {common.formatPrice(price * quantity)}đ
                      </Col>
                    </Row>
                  );
                })}
              </div>
              <div className="cart-footer">
                <div className="total-order-not-shipping"><span>Tổng tiền &#40;Tạm tính&#41;</span>{common.formatPrice(orderDetail.total_order_not_shipping)}đ</div>
                <div className="shipping-price"><span>Phí vận chuyển:</span>{orderDetail.shipping_price ? common.formatPrice(orderDetail.shipping_price)+"đ" : "Miễn phí"}</div>
                <div className="total-order"><span>Tổng đơn hàng:</span>{common.formatPrice(orderDetail.total_order)}đ</div>
                <Row justify="space-between" align="middle" gutter={[16, 16]}>
                  <Col span={12}><button onClick={() => {navigate(-1)}}>Quay lại</button></Col>
                  <Col span={12}></Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default OrderDetail;
