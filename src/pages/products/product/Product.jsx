/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import MainLayout from "../../../layouts/main-layout/MainLayout";
import "./product.scss";
import { Col, notification, Pagination, Row, Select } from "antd";
import Menubar from "./components/menu-bar/Menubar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductList } from "../../../stores/actions/product.action";
import { v4 } from "uuid";
import common from "../../../utils/common";
import ModalAddCart from "./components/modal-add-cart/ModalAddCart";
import { ROUTE } from "../../../constants";
import ProductItem from "../../../components/product-item/ProductItem";
function Product() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.userInfoState.data);
  const productState = useSelector((state) => state.product);
  let { products, textSearch, filter, pagination } = productState;
  let { page, limit, total } = pagination;
  let sortValueSelect = filter?._order ? filter?._order : "default";
  useEffect(() => {
    dispatch(fetchProductList({ page: 1, limit: 12, textSearch }));
  }, [textSearch]);

  const handleSort = (value) => {
    if (value === "default") {
      dispatch(
        fetchProductList({
          page: 1,
          limit: 12,
          filter: { ...filter, _sort: null, _order: null },
          textSearch,
        })
      );
    } else {
      dispatch(
        fetchProductList({
          page: 1,
          limit: 12,
          filter: { ...filter, _sort: "price", _order: value },
          textSearch,
        })
      );
    }
  };

  const [openAddCartModal, setOpenAddCartModal] = useState(false);
  const [indexProduct, setIndexProduct] = useState(null);

  const handleOpenAddCartModal = (index) => {
    if (!userInfo) {
      notification.warning({
        message: "Bạn cần đăng nhập trước khi mua hàng!",
        style: { border: "3px solid #fcaf17" },
        duration: 2,
      });
      navigate(ROUTE.LOGIN);
      return;
    }
    setIndexProduct(index);
    setOpenAddCartModal(true);
  };

  return (
    <MainLayout>
      <div className="product">
        <div className="product-container">
          <Row justify="space-between" gutter={[8, 0]}>
            <Col lg={5} md={6} sm={0} xs={0}>
              <Menubar />
            </Col>
            <Col lg={19} md={18} sm={24} xs={24}>
              <div className="product-topbar">
                <div className="product-label">Sắp xếp theo</div>
                <Select
                  defaultValue="default"
                  value={sortValueSelect}
                  style={{
                    minWidth: 180,
                    marginLeft: 8,
                    marginRight: 10,
                  }}
                  onChange={handleSort}
                  options={[
                    {
                      value: "default",
                      label: "Mặc định",
                    },
                    {
                      value: "asc",
                      label: "Giá từ thấp đến cao",
                    },
                    {
                      value: "desc",
                      label: "Giá từ cao đến thấp",
                    },
                  ]}
                />
              </div>
              <div className="product-list">
                <Row justify="start" gutter={[16, 24]}>
                  {products.map((item, index) => (
                    <Col key={v4()} lg={6} md={8} sm={12} xs={12}>
                      <ProductItem item={item} index={index} handleOpenAddCartModal={handleOpenAddCartModal}/>
                    </Col>
                  ))}
                </Row>
                <Row justify="center" className="product-list__pagination">
                  <Pagination
                    onChange={(page, pageSize) => {
                      console.log(page, pageSize);
                      dispatch(
                        fetchProductList({
                          textSearch,
                          filter,
                          page: page,
                          limit: pageSize,
                        })
                      );
                    }}
                    current={Number(page)}
                    total={Number(total)}
                    pageSize={Number(limit)}
                  />
                </Row>
              </div>
            </Col>
          </Row>
        </div>
        {openAddCartModal && (
          <ModalAddCart
            openAddCartModal={openAddCartModal}
            setOpenAddCartModal={setOpenAddCartModal}
            itemAddCart={products[indexProduct]}
          />
        )}
      </div>
    </MainLayout>
  );
}

export default Product;
