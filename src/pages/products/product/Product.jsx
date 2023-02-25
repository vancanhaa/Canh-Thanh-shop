/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import MainLayout from "../../../layouts/main-layout/MainLayout";
import "./product.scss";
import { Col, Modal, Pagination, Row, Select } from "antd";
import Menubar from "./components/Menubar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductList } from "../../../stores/actions/product.action";
import { v4 } from "uuid";
import common from "../../../utils/common";

function Product() {
  const dispatch = useDispatch();
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
  const [itemAddCart, setItemAddCart] = useState({});
  const [options, setOptions] = useState({
    color: "",
    size: "",
  });

  const handleChangeOptions = (option) => {
    const newOptions = { ...options, ...option };
    setOptions(newOptions);
  };
  console.log(options);
  const handleOpenAddCartModal = (index) => {
    setOpenAddCartModal(true);
    const newItemAddCart = { ...products[index] };
    setItemAddCart(newItemAddCart);
  };
  console.log(itemAddCart);

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
                      <div data-id={item.id} className="product-item">
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
                          <Link to={`/product-detail/${item.id}`}>
                            <img
                              className="product-thumbnail"
                              src={item.thumbnail}
                              alt=""
                            />
                          </Link>
                          <button
                            className="btn-add-cart"
                            onClick={() => handleOpenAddCartModal(index)}
                          >
                            Thêm vào giỏ hàng
                          </button>
                        </div>

                        <div className="product-item__info">
                          <h3 className="product-item__name">
                            <Link to={`/product-detail/${item.id}`}>
                              {item.name}
                            </Link>
                          </h3>

                          <div className="product-item__prices">
                            <ins>{common.formatPrice(item.price)}đ</ins>
                            <del>{common.formatPrice(item.price)}đ</del>
                            <span>-{item.discountPercentage}%</span>
                          </div>
                        </div>
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
        <Modal
          open={openAddCartModal}
          title="Thêm vào giỏ hàng"
          onCancel={() => setOpenAddCartModal(false)}
          wrapClassName="modal__add-cart"
          width={860}
        >
          <div className="add-cart-wrap">
            <Row gutter={[16, 0]}>
              <Col span={10}>
                <div className="add-cart__image">
                  <img
                    src={`${options.image_url}`}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src = `${itemAddCart.thumbnail}`;
                    }}
                    alt=""
                  />
                </div>
              </Col>
              <Col span={14}>
                <div className="detail-item">
                  <h4 className="detail-item__name">{itemAddCart.name}</h4>
                  <p className="detail-item__sold-raiting">
                    Mã sản phẩm: <span>{itemAddCart.id}</span>
                  </p>
                  <p className="detail-item__price">
                    {common.formatPrice(itemAddCart.price)} đ
                  </p>
                  <div className="detail-item__options">
                    <div className="detail-item__options-color">
                      <p>
                        Màu sắc: <span>{options.color}</span>
                      </p>
                      <div
                        className="options-color"
                        style={{ minHeight: "20px" }}
                      >
                        <Row align="middle" justify="start" gutter={[16, 8]}>
                          {itemAddCart.options?.map((item, index) => (
                            <Col span={4} key={v4()}>
                              <div className="option-color__label">
                                <input
                                  type="radio"
                                  onChange={() =>
                                    handleChangeOptions({
                                      color: item.color,
                                      image_url: item.image_url,
                                    })
                                  }
                                  value={item.color}
                                  checked={item.color === options.color}
                                />
                                <label>
                                  <span
                                    style={{
                                      backgroundImage: `url(${item.image_url})`,
                                      backgroundSize: "50px",
                                      backgroundRepeat: "no-repeat",
                                      backgroundPosition: "bottom",
                                    }}
                                  ></span>
                                </label>
                              </div>
                            </Col>
                          ))}
                        </Row>
                      </div>
                    </div>
                    <div className="detail-item__options-size">
                      <p>
                        Kích thước: <span>{options.size}</span>
                      </p>
                      <div
                        className="options-size"
                        style={{ minHeight: "20px" }}
                      >
                        <Row align="middle" justify="start" gutter={[16, 8]}>
                          {itemAddCart.size?.map((item, index) => (
                            <Col span={4} key={v4()}>
                              <div className="option-size__label">
                                <input
                                  type="radio"
                                  onChange={() =>
                                    handleChangeOptions({ size: item })
                                  }
                                  value={item}
                                  checked={item === options.size}
                                />
                                <label>{item}</label>
                              </div>
                            </Col>
                          ))}
                        </Row>
                      </div>
                    </div>
                  </div>

                  <div className="submit-cart">
                    <div className="item-quantity">
                      <button
                        className="item-quantity__btn--minus"
                        // onClick={() => handleDecreaseQuantity(index)}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={1}
                        min="1"
                        className="item-quantity__input"
                        disabled
                      />
                      <button
                        className="item-quantity__btn--plus"
                        // onClick={() => handleIncreaseQuantity(index)}
                      >
                        +
                      </button>
                    </div>
                    <div className="submit-cart__btn-wrap">
                      <button className="btn-submit-cart">
                        Thêm vào giỏ hàng
                      </button>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Modal>
      </div>
    </MainLayout>
  );
}

export default Product;
