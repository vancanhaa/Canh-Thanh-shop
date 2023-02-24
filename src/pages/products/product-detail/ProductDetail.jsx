import { Col, Pagination, Row, Select } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./product-detail.scss";
import { Link, useParams } from "react-router-dom";
import MainLayout from "../../../layouts/main-layout/MainLayout";
import {
  fetchProductById,
  fetchProductList,
} from "../../../stores/actions/product.action";
import { v4 } from "uuid";
import "../product/product.scss";

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.product);
  useEffect(() => {
    dispatch(fetchProductById(id));
  }, []);

  const productState = useSelector((state) => state.product);
  let { products, textSearch, filter, pagination } = productState;
  let { page, limit, total } = pagination;
  useEffect(() => {
    dispatch(fetchProductList({ page: 1, limit: 4, textSearch }));
  }, [textSearch]);
  return (
    <MainLayout>
      <div className="product--detail--container">
        <div className="product--grid ">
          <Row>
            <Col lg={12} md={14} sm={24} xs={24}>
              <div className="product--grid__img">
                <img src={product.thumbnail} alt="" />
              </div>
            </Col>

            <Col lg={12} md={14} sm={24} xs={24}>
              <div className="product-grid-item-info">
                <div className="box-divider">
                  <h1 className="title-head">{product.name}</h1>
                  <div className="product-top">
                    <h2 className="product-id">Mã sản phẩm : {product.id}</h2>
                    <div className="product-raiting">
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-solid fa-star"></i>
                    </div>
                  </div>
                  <div className="product-price">{product.price}đ</div>
                  <div className="product-color">
                    <div className="option-title">
                      Màu sắc : <span>Xanh nhạt</span>
                    </div>
                    <div className="swacth-img">
                      <span className="img-color"></span>
                    </div>
                  </div>
                  <div className="swacth-size">
                    <div className="options-title">
                      Kích thước: <span>S</span>
                    </div>
                    {product.size?.map((item, index) => (
                      <button value={item[0]} key={v4()}>{item}</button>
                    ))}
                  </div>
                  <div className="from-action-addcart">
                    <div className="qty-ant">
                      <button>-</button>
                      <input
                        className="qty-input"
                        type="text"
                        value={1}
                        disabled
                      />
                      <button>+</button>
                    </div>
                    <button className="btn-add__cart">Thêm vào giỏ hàng</button>
                  </div>

                  {/* decription ship*/}
                  <div className="product-policy">
                    <div className="product-policy__item">
                      <div className="icon">
                        <img
                          src="https://bizweb.dktcdn.net/100/438/408/themes/896213/assets/ic_payment_freeship.svg?1677143561068"
                          alt=""
                        />
                      </div>
                      <div className="title">
                        Miễn phí vận chuyển
                        <br />
                        với mọi đơn hàng từ 499k
                      </div>
                      <div className="icon">
                        <img
                          src="https://bizweb.dktcdn.net/100/438/408/themes/896213/assets/ic_payment_cod.svg?1677143561068"
                          alt=""
                        />
                      </div>
                      <div className="title">
                        Thanh toán khi
                        <br />
                        nhận hàng
                      </div>
                    </div>
                    <div className="product-policy__item">
                      <div className="icon">
                        <img
                          src="https://bizweb.dktcdn.net/100/438/408/themes/896213/assets/ic_payment_freechange.svg?1677143561068"
                          alt=""
                        />
                      </div>
                      <div className="title">
                        Miễn phí đổi trả
                        <br />
                        trong 15 ngày
                      </div>
                      <div className="icon">
                        <img
                          src="https://bizweb.dktcdn.net/100/438/408/themes/896213/assets/ic_payment_fastship.svg?1677143561068"
                          alt=""
                        />
                      </div>
                      <div className="title">
                        Vận chuyển siêu tốc
                        <br />
                        từ 1 đến 3 ngày
                      </div>
                    </div>
                  </div>
                  <div className="accordion-toggle">Chi tiết sản phẩm</div>
                  {/* decription */}
                  <ul className="box-promotion">
                    {product.description?.map((item, index) => (
                      <li key={v4()}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Col>
          </Row>
          <div className="hr"></div>
          <Row>
            <div className="product--suggestion">
              <h2 className="title-block">Gợi ý cho bạn</h2>
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
              </div>
            </div>
          </Row>
        </div>
      </div>
    </MainLayout>
  );
}
export default ProductDetail;
