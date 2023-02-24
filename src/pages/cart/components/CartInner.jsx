import { Col, Row, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { v4 } from "uuid";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect } from "react";

import common from "../../../utils/common";
import { fetchChangeCart } from "../../../stores/actions/cart.action";
import { CustomerContext } from "../../../providers/CustomerContext";
import "./cart-inner.scss";

function CartInner() {
  const [modal, contextHolder] = Modal.useModal();
  const handleDeleteItem = (index) => {
    const newProductsToCart = {
      products: listItem.map((item, index) => {
        return {
          id: item.id,
          size: item.size,
          quantity: item.quantity,
          color: item.color,
        };
      }),
    };
    newProductsToCart.products.splice(index, 1);
    dispatch(fetchChangeCart({ idUser: cart.id, data: newProductsToCart }));
  };
  const confirm = (index) => {
    modal.confirm({
      className: "confirm-delete-item",
      title: "Bạn có chắc chắn muốn xoá sản phẩm này?",
      icon: <ExclamationCircleOutlined />,
      content: `${listItem[index].name}`,
      okText: "Đồng ý",
      cancelText: "Không",
      onOk: () => handleDeleteItem(index),
    });
  };
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const { allProductList, listItem, setListItem } = useContext(CustomerContext);
  useEffect(() => {
    let newListItem = cart.products?.map((item, index) => {
      let newItem = allProductList.find(
        (product, index) => product.id === item.id
      );

      return {
        id: newItem.id,
        imageUrl: newItem.thumbnail,
        price: newItem.price,
        name: newItem.name,
        size: item.size,
        color: item.color,
        quantity: item.quantity,
      };
    });
    setListItem(newListItem);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  const handleIncreaseQuantity = (index) => {
    let newListItem = [...listItem];
    newListItem[index].quantity = Number(newListItem[index].quantity) + 1;
    setListItem(newListItem);
    let newProductsToCart = {
      products: newListItem.map((item, index) => {
        return {
          id: item.id,
          size: item.size,
          quantity: item.quantity,
          color: item.color,
        };
      }),
    };
    dispatch(fetchChangeCart({ idUser: cart.id, data: newProductsToCart }));
  };

  const handleDecreaseQuantity = (index) => {
    let newListItem = [...listItem];
    if (newListItem[index].quantity === 1) {
      confirm(index);
    } else {
      newListItem[index].quantity = Number(newListItem[index].quantity) - 1;
      setListItem(newListItem);
      let newProductsToCart = {
        products: newListItem.map((item, index) => {
          return {
            id: item.id,
            size: item.size,
            quantity: item.quantity,
            color: item.color,
          };
        }),
      };
      dispatch(fetchChangeCart({ idUser: cart.id, data: newProductsToCart }));
    }
  };

  return (
    <div className="cart-inner__item-availabel">
      {listItem?.map((item, index) => {
        return (
          <Row
            justify="space-between"
            className="item-availabel__row"
            key={v4()}
          >
            <Col lg={12} md={12}>
              <Row>
                <Col className="item-availabel__img">
                  <img src={item.imageUrl} alt="" width={90} />
                </Col>
                <Col flex="auto" className="item-availabel__description">
                  <div className="item-availabel__option-wrap">
                    <div className="item-availabel__name">
                      <h4>{item.name}</h4>
                    </div>
                    <div className="item-availabel__option">
                      {`${item.color} / ${item.size}`}
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col lg={4} md={4}>
              {common.formatPrice(item.price)}đ
            </Col>
            <Col lg={4} md={4}>
              <div className="item-availabel__quantity">
                <button
                  className="item-quantity__btn--minus"
                  onClick={() => handleDecreaseQuantity(index)}
                >
                  -
                </button>
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  className="item-quantity__input"
                  disabled
                />
                <button
                  className="item-quantity__btn--plus"
                  onClick={() => handleIncreaseQuantity(index)}
                >
                  +
                </button>
              </div>
            </Col>
            <Col lg={4} md={4}>
              <div className="item-availabel__total-wrap">
                <div className="total">
                  {common.formatPrice(item.price * item.quantity)}đ
                </div>
                <div
                  className="delete-item__icon"
                  onClick={() => confirm(index)}
                >
                  <DeleteOutlined />
                </div>
              </div>
            </Col>
            {contextHolder}
          </Row>
        );
      })}
    </div>
  );
}

export default CartInner;
