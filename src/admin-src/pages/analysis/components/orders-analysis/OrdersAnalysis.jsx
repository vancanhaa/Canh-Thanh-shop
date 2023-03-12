import React from 'react'
import "./orders-analysis.scss"
import {  CheckSquareOutlined } from "@ant-design/icons";
import { useSelector } from 'react-redux';

function OrdersAnalysis() {
  const ordersAdminState = useSelector(state => state.ordersAdmin)
  const { allOrders, fetchingOrdersAdmin } = ordersAdminState
  const receivedOrder = allOrders.filter((order, index) => order.status_order === "received").length
  // const unconfirmedOrder = allOrders.filter((order) => order.status_order === "unconfirmed").length
  return (
    <div className="analysis__orders analysis__item"><div className="analysis__title">
    <p>Đơn hàng</p>
    <div className="icon">
    <CheckSquareOutlined />
    </div>
  </div>
  <div className="analysis__content">
    <p>
      <span>Tổng: </span>{allOrders.length}
    </p>

    <p>
      <span>Đã nhận hàng: </span>
      {receivedOrder}
    </p>
  </div></div>

  )
}

export default OrdersAnalysis