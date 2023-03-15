import { Col, Row } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrder } from "../../../../stores/actions/order.action";
import common from "../../../../utils/common";
import "./order.scss";
import { ROUTE } from "../../../../constants";
import { Link } from "react-router-dom";
import { STATUS_ORDER } from "../../../../constants/order.const";

function Order() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfoState.data);
  const listOrder = useSelector((state) => state.order.listOrder);

  useEffect(() => {
    dispatch(fetchOrder(userInfo.id));
  }, []);

  console.log(listOrder);

  return (
    <div className="order">
      <div className="order-container">
        <div className="order-header">
          <div className="order-header__title">Đơn hàng của tôi</div>
          <div className="order-header__quantity">
            &#40;{listOrder ? listOrder.length : "0"}&#41; đơn hàng
          </div>
        </div>
        <div className="order-content">
          {listOrder && listOrder.length !== 0 ? (
            <Row className="order-content__header">
              <Col lg={24} md={24} sm={24} xs={24}>
                <Row gutter={[16, 16]}>
                  <Col span={3}>Mã đơn hàng</Col>
                  <Col span={3}>Ngày mua</Col>
                  <Col span={7}>Địa chỉ giao hàng</Col>
                  <Col span={3}>Giá trị đơn hàng</Col>
                  <Col span={4}>Trạng thái thanh toán</Col>
                  <Col span={4}>Trạng thái đơn hàng</Col>
                </Row>
              </Col>
            </Row>
          ) : null}
          <div className="order-content__body">
            {listOrder?.map((order, index) => {
              const {
                id,
                time_create,
                checkout_address,
                cart,
                status_payment,
                status_order,
                total_order,
              } = order;
              const statusOrderLabel = STATUS_ORDER.find(
                (status, index) => status.status === status_order
              )?.label;
              return (
                <Row key={id} className="order-item">
                  <Col lg={24} md={24} sm={24} xs={24}>
                    <Row gutter={[16, 16]}>
                      <Col span={3}>
                        <Link to={`/account/order/${id}`}>
                          #{id.slice(0, 5)}
                        </Link>
                      </Col>
                      <Col span={3}>{time_create}</Col>
                      <Col span={7}>{checkout_address.address}</Col>
                      <Col span={3} className="order-item__price">
                        {common.formatPrice(total_order)}đ
                      </Col>
                      <Col span={4}>
                        {status_payment ? "Đã thanh toán" : "Chưa thanh toán"}
                      </Col>
                      <Col span={4} className={status_order}>
                        {statusOrderLabel}
                      </Col>
                    </Row>
                  </Col>
                </Row>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
