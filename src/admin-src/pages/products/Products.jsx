import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./products.scss";
import { Row, Col, Input, Menu } from "antd";
import { Navigate } from "react-router-dom";
import { fetchProductsListAdmin } from "../../stores/actions/productsAdmin.action";
import { changeTextSearch } from "../../stores/slice/productsAdmin.slice";
import { SHOP_BY_CATEGORY, SHOP_BY_PRICE } from "../../../constants";
import { getItem } from "../../../utils/menu";
import HeaderBar from "./components/header-bar/HeaderBar";
import { v4 } from "uuid";
import common from "../../../utils/common";
import ProductsList from "./components/products-list/ProductsList";
function Products() {
  const dispatch = useDispatch();

  const productsAdminState = useSelector((state) => state.productsAdmin);
  useEffect(() => {
    dispatch(fetchProductsListAdmin({ page: 1, limit: 9 }));
  }, []);
  const { listProducts, filter, textSearch } = productsAdminState;

  console.log(listProducts);

  return (
    <div className="products">
      <div className="products-container">
        <div className="products-header">
          <HeaderBar />
        </div>
        <div className="products-body">
          <div className="products-body__heading">
            <Row
              justify="space-between"
              align="middle"
              gutter={[16, 16]}
              className="center-text"
            >
              <Col span={1}>STT</Col>
              <Col span={2}>Tên sản phẩm</Col>
              <Col span={2}>Giá</Col>
              <Col span={1}>Loại</Col>
              <Col span={1}>Nhập</Col>
              <Col span={1}>Đã bán</Col>
              <Col span={1}>Còn lại</Col>
              <Col span={5}>Chi tiết sản phẩm</Col>
              <Col span={2}>Màu sắc</Col>
              <Col span={2}>Size</Col>
              <Col span={4}>Hình ảnh</Col>
              <Col span={2}>Action</Col>
            </Row>
          </div>
          <ProductsList />
         
        </div>
      </div>
    </div>
  );
}

export default Products;
