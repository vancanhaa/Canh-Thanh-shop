import { Col, Row } from "antd";
import React from "react";
import "./analysis.scss";
function Analysis() {
  return (
    <div className="analysis">
      <Row justify="center" align="middle" gutter={[48, 48]}>
        <Col span={12}>
          <div className="analysis__revenue analysis__item">Revenue</div>
        </Col>
        <Col span={12}>
          <div className="analysis__products analysis__item">products</div>
        </Col>
        <Col span={12}>
          <div className="analysis__users analysis__item">users</div>
        </Col>
        <Col span={12}>
          <div className="analysis__orders analysis__item">orders</div>
        </Col>
      </Row>
    </div>
  );
}

export default Analysis;
