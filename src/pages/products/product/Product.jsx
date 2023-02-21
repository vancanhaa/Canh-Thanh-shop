/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import MainLayout from "../../../layouts/main-layout/MainLayout";
import "./product.scss";
import { Col, Pagination, Row, Select } from "antd";
import Menubar from "./components/Menubar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductList } from "../../../stores/actions/product.action";
import { v4 } from "uuid";

function Product() {
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.product);
  let { products, textSearch, filter, pagination } = productState;
  let { page, limit, total } = pagination;
  let sortValueSelect = filter?._order ? filter?._order : "default"
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
                <Row justify="start" gutter={[16, 16]}>
                  {products.map((item, index) => (
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
      </div>
    </MainLayout>
  );
}

export default Product;
