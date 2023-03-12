import React, { useEffect } from "react";
import { Col, Pagination, Row } from 'antd'

import "./orders.scss";
import OrdersList from "./components/orders-list/OrdersList";
import { useDispatch } from "react-redux";
import { fetchOrdersListAdmin } from "../../stores/actions/ordersAdmin.action";
function Orders() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchOrdersListAdmin({page: 1, limit: 10}))
  })
  return (
    <>
      <div className='orders'>
      <div className="orders-container">
        <div className="orders-body">
          <div className="orders-body__heading">
            <Row justify="space-between"
              align="middle"
              gutter={[16, 16]}
              className="center-text">
              <Col span={2}>STT</Col>
              <Col span={3}>Mã đơn hàng</Col>
              <Col span={3}>Họ Tên</Col>
              <Col span={2}>Số điện thoại</Col>
              <Col span={5}>Địa chỉ giao hàng</Col>
              <Col span={3}>Ngày tạo</Col>
              <Col span={2}>Giá trị đơn hàng</Col>
              <Col span={2}>Trạng thái</Col>
              <Col span={2}>Action</Col>
            </Row>
          </div>
          <OrdersList />
        </div>
        
      </div>
    </div>
    <div className="orders-footer">
        <Pagination
            // onChange={(page, pageSize) => {

              // dispatch(
              //   fetchUsersListAdmin({

              //     page: page,
              //     limit: pageSize,
              //   })
              // );
            // }}
            // current={Number(page)}
            // total={Number(total)}
            // pageSize={Number(limit)}
          />
        </div>
    </>
  );
}

export default Orders;
