import { Col, Row } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
import { fetchProductList } from "../../../../stores/actions/product.action";
import common from "../../../../utils/common";

export default function ProductSuggestion() {
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.product);
  let { products, textSearch } = productState;
  useEffect(() => {
    dispatch(fetchProductList({ page: 1, limit: 4, textSearch }));
  }, [textSearch]);
  return (
    <div>
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
                            {common.formatPrice(item.sold)}
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
                          <ins>{common.formatPrice(item.price)}đ</ins>
                          <del>{common.formatPrice(item.price)}đ</del>
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
  );
}
