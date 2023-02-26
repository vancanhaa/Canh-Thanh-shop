import { Col, Row, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { v4 } from "uuid";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import common from "../../../../utils/common";
import { fetchChangeCart } from "../../../../stores/actions/cart.action";
import "./cart-inner.scss";

function CartInner() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const [modal, contextHolder] = Modal.useModal();

  const confirm = (index) => {
    modal.confirm({
      className: "confirm-delete-item",
      title: "Bạn có chắc chắn muốn xoá sản phẩm này khỏi giỏ hàng?",
      icon: <ExclamationCircleOutlined />,
      content: `${cart.products[index].name}`,
      okText: "Đồng ý",
      cancelText: "Không",
      onOk: () => handleDeleteItem(index),
    });
  };
  const handleDeleteItem = (index) => {
    let newProducts = [...cart.products]
    newProducts.splice(index, 1)
    let data = {
      products: newProducts
    }
    dispatch(fetchChangeCart({idUser: cart.id, data}))
  };
  
  
  const handleIncreaseQuantity = (index) => {
    const newProducts = [...cart.products]
    newProducts[index] = {...newProducts[index], quantity: newProducts[index].quantity + 1}
    let data = {
      products: newProducts
    }
    dispatch(fetchChangeCart({idUser: cart.id, data}))
  };

  const handleDecreaseQuantity = (index) => {
    let newProducts = [...cart.products]
    if(newProducts[index].quantity <= 1) {
      confirm(index)
    } else {
      newProducts[index] = {...newProducts[index], quantity: newProducts[index].quantity -1}
      let data = {
        products: newProducts
      }
      dispatch(fetchChangeCart({idUser: cart.id, data}))
    }
    
  };

  return (
    <div className="cart-inner__item-availabel">
      {cart.products?.map((item, index) => {
        return (
          <Row
            justify="space-between"
            className="item-availabel__row"
            key={v4()}
          >
            <Col lg={12} md={12}>
              <Row>
                <Col className="item-availabel__img">
                  <img src={item["image_url"]} alt="" width={90} />
                </Col>
                <Col flex="auto" className="item-availabel__description">
                  <div className="item-availabel__option-wrap">
                    <div className="item-availabel__name">
                      <h4>{item.name}</h4>
                    </div>
                    <div className="item-availabel__option">
                      {!item.color ? `${item.size}`: `${item.color} / ${item.size}`}
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col lg={4} md={4} >
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
