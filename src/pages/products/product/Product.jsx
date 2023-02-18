import React, { useEffect } from "react";
import MainLayout from "../../../layouts/main-layout/MainLayout";
import "./product.scss";
import { Col, Pagination, Row } from "antd";
import Menubar from "./components/Menubar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProductList,
  fetchCategoryProductList,
} from "../../../stores/actions/product.action";
import { changePagination } from "../../../stores/slice/product.slice";
import { v4 } from "uuid";

function Product() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.product.products);
  const productPagination = useSelector((state) => state.product.pagination);
  const category = useSelector((state) => state.product.category);

  useEffect(() => {
    dispatch(fetchAllProductList({ page: 1, limit: 12 }));
  }, []);

  return (
    <MainLayout>
      <div className="product">
        <div className="product-container">
          <Row justify="space-between" gutter={[16, 0]}>
            <Col lg={4} md={6}>
              <Menubar />
            </Col>
            <Col lg={20} md={18}>
              <div className="product-filter"></div>
              <div className="product-list">
                <Row justify="start" gutter={[16, 16]}>
                  {productList.map((item, index) => (
                    <Col key={v4()} lg={6} md={8} sm={12} xs={12}>
                      <div data-id={item.id} className="product-item">
                        <Link to={`/product-detail/${item.id}`}>
                          <div className="product-item__raiting-sold">
                            <div className="product-item__raiting">
                              <img
                                width="10"
                                height="10"
                                src="https://bizweb.dktcdn.net/100/438/408/themes/894085/assets/icon_start.svg?1676625752773"
                                alt=""
                              />
                              <span>{item.rating}</span>
                            </div>
                            <div className="product-item__sold">
                              <div className="y-line"></div>
                              Đã bán
                              <span className="product-item__sold-number">
                                {item.sold}
                              </span>
                            </div>
                          </div>
                          <div className="product-item__images">
                            <img
                              className="product-thumbnail"
                              src={item.thumbnail}
                              alt=""
                            />
                            <img
                              className="product-thumbnail--hover"
                              src={item.options[1]["image_url"]}
                              alt=""
                            />
                          </div>

                          <div className="product-item__info">
                            <h3 className="product-item__name">{item.name}</h3>
                            <div className="product-item__prices">
                              <ins>{item.price}đ</ins>
                              <del>{item.price}đ</del>
                              <span>-{item.discountPercentage}%</span>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </Col>
                  ))}
                </Row>
                <Row justify="center" className="product-list__pagination">
                  <Pagination
                    onChange={(page, pageSize) => {
                      if (category === "all") {
                        dispatch(
                          fetchAllProductList({ page: page, limit: pageSize })
                        );
                      } else {
                        dispatch(
                          fetchCategoryProductList({
                            page,
                            limit: pageSize,
                            category,
                          })
                        );
                      }
                      dispatch(changePagination({ page, limit: pageSize }));
                    }}
                    current={Number(productPagination.page)}
                    total={Number(productPagination.total)}
                    pageSize={Number(productPagination.limit)}
                  />
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </MainLayout>
  );
}

export default Product;
