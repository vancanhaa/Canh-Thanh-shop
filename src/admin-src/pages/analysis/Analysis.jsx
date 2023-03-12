import { Col, Row } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAllOrdersAdmin } from "../../stores/actions/ordersAdmin.action";
import { fetchAllProductsAdmin } from "../../stores/actions/productsAdmin.action";
import { fetchAllUsersAdmin } from "../../stores/actions/usersAdmin.action";
import "./analysis.scss";
import OrdersAnalysis from "./components/orders-analysis/OrdersAnalysis";
import ProductsAnalysis from "./components/products-analysis/ProductsAnalysis";
import RevenueAnalysis from "./components/revenue-analysis/RevenueAnalysis";
import UsersAnalysis from "./components/users-analysis/UsersAnalysis";
function Analysis() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAllOrdersAdmin())
    dispatch(fetchAllUsersAdmin())
    dispatch(fetchAllProductsAdmin())
  }, [])
  return (
    <div className="analysis">
      <Row justify="center" align="middle" gutter={[48, 48]}>
        <Col lg={12} md={12} sm={20} xs={20}>
          <RevenueAnalysis />
        </Col>
        <Col lg={12} md={12} sm={20} xs={20}>
          <ProductsAnalysis />
        </Col>
        <Col lg={12} md={12} sm={20} xs={20}>
          <UsersAnalysis />
        </Col>
        <Col lg={12} md={12} sm={20} xs={20}>
          <OrdersAnalysis />
        </Col>
      </Row>
    </div>
  );
}

export default Analysis;
