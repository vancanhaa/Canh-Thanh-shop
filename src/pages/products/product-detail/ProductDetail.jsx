import "./product-detail.scss";
import {
  addProductRiviewId,
  fetchProductById,
  fetchProductList,
} from "../../../stores/actions/product.action";
import { v4 } from "uuid";
import "../product/product.scss";
import common from "../../../utils/common";
import {
  fetchAddNewCart,
  fetchChangeCart,
} from "../../../stores/actions/cart.action";
import { Avatar, Col, notification, Row } from "antd";
import StarsRating from "react-star-rate";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import MainLayout from "../../../layouts/main-layout/MainLayout";
import { CheckOutlined, UserOutlined } from "@ant-design/icons";
import { ROUTE } from "../../../constants";
import ProductItem from "../../../components/product-item/ProductItem";
import ModalAddCart from "../../../components/modal-add-cart/ModalAddCart";

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [valueQuantity, setValueQuantity] = useState(1);

  const [rate, setRate] = useState(0);
  const [riview, setRiview] = useState("");

  const resetRiview = () => {
    setRate(0);
    setRiview("");
  };

  const product = useSelector((state) => state.product.product);
  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [id, riview]);

  const productState = useSelector((state) => state.product);
  let { products } = productState;

  useEffect(() => {
    dispatch(
      fetchProductList({
        filter: { category: products.category },
        page: 1,
        limit: 4,
      })
    );
  }, []);

  const cart = useSelector((state) => state.cart.cart);
  const userInfo = useSelector((state) => state.user.userInfoState.data);

  const [options, setOptions] = useState({});

  const handleChangeOptions = (option) => {
    const newOptions = { ...options, ...option };
    setOptions(newOptions);
  };

  const handleResetOption = () => {
    setOptions({});
    setValueQuantity(1);
  };

  // add cart
  const handleAddItemToCart = ({ product, options, valueQuantity }) => {
    if (!userInfo) {
      notification.warning({
        message: "Bạn cần đăng nhập trước khi mua hàng!",
        style: { border: "3px solid #fcaf17" },
        duration: 2,
      });
      navigate(ROUTE.LOGIN);
      return;
    }
    const newproduct = {
      id: product.id,
      name: product.name,
      image_url: options.image_url,
      quantity: valueQuantity,
      price: product.price,
      color: options.color,
      size: options.size,
    };
    const isProductAvailabel = cart.products.some((product) => {
      return (
        product.id === newproduct.id &&
        product.color === newproduct.color &&
        product.size === newproduct.size
      );
    });
    let newProductsInCart = [...cart.products];
    if (isProductAvailabel) {
      newProductsInCart = newProductsInCart.map((product) => {
        product = {
          ...product,
          quantity: product.quantity + newproduct.quantity,
          image_url: newproduct.image_url,
        };
        return product;
      });
    } else {
      newProductsInCart = [newproduct, ...newProductsInCart];
    }

    if (cart.id && cart.id !== "") {
      console.log("availabel");
      dispatch(
        fetchChangeCart({
          idUser: cart.id,
          data: { products: newProductsInCart },
        })
      );
    } else {
      dispatch(
        fetchAddNewCart({
          idUser: userInfo.id,
          data: { products: [newproduct] },
        })
      );
    }
    handleResetOption();
    notification.info({
      message: `Đã thêm thành công ${valueQuantity} sản phẩm`,
      description: `${product.name}`,
      placement: "topRight",
      icon: <CheckOutlined />,
    });
  };

  const currentReviews = useMemo(
    () => (product ? product.riviews : []),
    [product]
  );
  const handleRiview = ({ rate, riview }) => {
    if (!userInfo) {
      notification.warning({
        message: "Bạn cần đăng nhập trước khi đánh giá!",
        style: { border: "3px solid #fcaf17" },
        duration: 2,
      });
      navigate(ROUTE.LOGIN);
      return;
    }
    const newComment = {
      idUser: userInfo.id,
      first_name: userInfo.first_name,
      last_name: userInfo.last_name,
      idProduct: id,
      rate: rate,
      riview: riview,
    };
    dispatch(
      addProductRiviewId({
        id: id,
        data: { riviews: [...currentReviews, newComment] },
      })
    );
    console.log("id", id);
    console.log("data", newComment);
    resetRiview();
    notification.info({
      message: `Đánh giá thành công ${riview} sản phẩm`,
      description: `${product.name}`,
      placement: "topRight",
      icon: <CheckOutlined />,
    });
  };

  const [openAddCartModal, setOpenAddCartModal] = useState(false);
  const [idProduct, setIdProduct] = useState(null);
  const handleOpenAddCartModal = (id) => {
    if (!userInfo) {
      notification.warning({
        message: "Bạn cần đăng nhập trước khi mua hàng!",
        style: { border: "3px solid #fcaf17" },
        duration: 2,
      });
      navigate(ROUTE.LOGIN);
      return;
    }
    setIdProduct(id);
    setOpenAddCartModal(true);
  };

  return (
    <MainLayout>
      <div className="product--detail--container">
        <div className="product--grid ">
          <div className="breadcrumb-bar">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <Link to={"/"}> Home / </Link>
              </li>
              <li class="breadcrumb-item">
                <Link to={"/product"}>Products / </Link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Product Single
              </li>
            </ol>
          </div>
          <Row>
            <Col lg={12} md={14} sm={24} xs={24}>
              <div className="product--grid__img">
                <img
                  src={`${options.image_url}`}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = `${product.thumbnail}`;
                  }}
                  alt=""
                />
              </div>

              <div className="riview-product">
                <div className="form-riview">
                  <h1 className="title-riview">Đánh giá sản phẩm </h1>
                  <div className="raiting">
                    <StarsRating
                      value={rate}
                      onChange={(e) => {
                        setRate(e);
                      }}
                    />
                  </div>
                  <input
                    className="input-riview"
                    type="text"
                    value={riview}
                    onChange={(e) => setRiview(e.target.value)}
                    placeholder="Viết đánh giá sản phẩm"
                  />
                  <button
                    className="btn-riview"
                    onClick={() =>
                      handleRiview({
                        rate,
                        riview,
                      })
                    }
                  >
                    Đánh giá
                  </button>
                </div>
                <hr />
                <div className="users-riview">
                  {product.riviews?.map((item, index) => (
                    <Col key={v4()}>
                      <div className="info-user">
                        <Avatar icon={<UserOutlined />} />
                        <div className="name-user">
                          {`${item.first_name} ${item.last_name}`}
                        </div>
                      </div>

                      <div className="users-rat">
                        <input
                          className="user-comment"
                          type="text"
                          value={item.riview}
                          disabled
                        />
                        <div className="raiting">
                          <StarsRating value={item.rate} disabled />
                        </div>
                      </div>
                    </Col>
                  ))}
                </div>
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
                  <div className="product-price">
                    {common.formatPrice(product.price)}đ
                  </div>
                  <div className="product-color">
                    <div className="option-title">
                      Màu sắc :<span>{options.color}</span>
                    </div>
                    <div
                      className="options-color"
                      style={{ minHeight: "20px" }}
                    >
                      <Row align="middle" justify="start" gutter={[16, 8]}>
                        {product.options?.map((item, index) => (
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
                  <div className="swacth-size">
                    <div className="options-title">
                      Kích thước: <span> {options.size} </span>
                    </div>
                    <Row align="middle" justify="start" gutter={[16, 8]}>
                      {product.size?.map((item, index) => (
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
                            <label className="option-label">{item}</label>
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </div>
                  <div className="submit-cart">
                    <div className="item-quantity">
                      <button
                        className="item-quantity__btn--minus"
                        onClick={() => setValueQuantity(valueQuantity - 1)}
                        disabled={valueQuantity === 1}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={valueQuantity}
                        min="1"
                        className="item-quantity__input"
                        disabled
                      />
                      <button
                        className="item-quantity__btn--plus"
                        onClick={() => setValueQuantity(valueQuantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <div className="submit-cart__btn-wrap">
                      <button
                        className="btn-submit-cart"
                        onClick={() =>
                          handleAddItemToCart({
                            product,
                            options,
                            valueQuantity,
                          })
                        }
                        disabled={!options.color || !options.size}
                      >
                        Thêm vào giỏ hàng
                      </button>
                    </div>
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
                      <ProductItem
                        item={item}
                        handleOpenAddCartModal={handleOpenAddCartModal}
                      />
                    </Col>
                  ))}
                  {/* {products.map((item, index) => (
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
                              src={item.options[1]?.["image_url"]}
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
                  ))} */}
                </Row>
              </div>
            </div>
          </Row>
          {
            //goi y\
            // products da useEffect theo category
            // products.map()
            // newProductCategory = products.splice(0, 4)
            // newProductCategory.map() => ui
          }
        </div>
        {openAddCartModal && (
          <ModalAddCart
            openAddCartModal={openAddCartModal}
            setOpenAddCartModal={setOpenAddCartModal}
            itemAddCart={products.find((item) => item.id === idProduct)}
          />
        )}
      </div>
    </MainLayout>
  );
}
export default ProductDetail;
