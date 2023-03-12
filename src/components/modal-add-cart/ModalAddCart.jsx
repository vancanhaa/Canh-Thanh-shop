import { CheckOutlined } from "@ant-design/icons";
import { Col, Modal, notification, Row } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import { ROUTE } from "../../constants";
import {
  fetchAddNewCart,
  fetchChangeCart,
} from "../../stores/actions/cart.action";
import common from "../../utils/common";
import "./modal-add-cart.scss";
function ModalAddCart({
  openAddCartModal,
  setOpenAddCartModal,
  itemAddCart = {
    id: 0,
    name: "",
    price: 0,
    options: [{ color: "", image_url: "" }],
    size: [],
    thumbnail: "",
  },
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(itemAddCart);
  const cart = useSelector((state) => state.cart.cart);

  const userInfo = useSelector((state) => state.user.userInfoState.data);
  const [options, setOptions] = useState({});
  const [valueQuantity, setValueQuantity] = useState(1);

  const handleChangeOptions = (option) => {
    const newOptions = { ...options, ...option };
    setOptions(newOptions);
  };
  const handleResetOption = () => {
    setOpenAddCartModal(false);
    setOptions({});
    setValueQuantity(1);
  };

  const showMessage = ({ itemAddCart, valueQuantity }) => {
    notification.success({
      message: `Đã thêm thành công ${valueQuantity} sản phẩm`,
      description: `${itemAddCart.name}`,
      placement: "topRight",
      style: { border: "2px solid #71be34" },
      duration: 2
    });
  };


  const handleAddItemToCart = ({ itemAddCart, options, valueQuantity }) => {

    const newItemAddCart = {
      id: itemAddCart.id,
      name: itemAddCart.name,
      image_url: options.image_url,
      quantity: valueQuantity,
      price: itemAddCart.price,
      color: options.color,
      size: options.size,
    };

    const isProductAvailabel = cart.products.some((product) => {
      return (
        product.id === newItemAddCart.id &&
        product.color === newItemAddCart.color &&
        product.size === newItemAddCart.size
      );
    });

    let newProductsInCart = [...cart.products];

    if (isProductAvailabel) {
      newProductsInCart = newProductsInCart.map((product) => {
        product = {
          ...product,
          quantity: product.quantity + newItemAddCart.quantity,
          image_url: newItemAddCart.image_url,
        };
        return product;
      });
    } else {
      newProductsInCart = [newItemAddCart, ...newProductsInCart];
    }

    if (cart.id && cart.id !== "") {
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
          data: { products: [newItemAddCart] },
        })
      );
    }
    showMessage({itemAddCart, valueQuantity})
    handleResetOption();
  };

  return (
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
                  <div className="options-color" style={{ minHeight: "20px" }}>
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
                  <div className="options-size" style={{ minHeight: "20px" }}>
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
                        itemAddCart,
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
            </div>
          </Col>
        </Row>
      </div>
    </Modal>
  );
}

export default ModalAddCart;
