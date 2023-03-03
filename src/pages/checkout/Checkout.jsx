import { Checkbox, Col, Form, Input, notification, Row, Select } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import { ROUTE } from "../../constants";
import {
  PAYMENTS_METHOD,
  SHIPPING_PRICE,
} from "../../constants/checkout.const";
import FullLayout from "../../layouts/full-layout/FullLayout";
import {
  fetchAddress,
  fetchListDistricts,
  fetchListProvinces,
  fetchListWards,
} from "../../stores/actions/address.action";
import { fetchCart, fetchChangeCart } from "../../stores/actions/cart.action";
import { fetchAddOrder } from "../../stores/actions/order.action";
import common from "../../utils/common";
import "./checkout.scss";
function Checkout() {
  const navigate = useNavigate()
  const userInfo = useSelector((state) => state.user.userInfoState.data);
  const { TextArea } = Input;
  const dispatch = useDispatch();
  const provinceUref = useRef();
  const districtUref = useRef();
  const wardUref = useRef();
  const [form] = Form.useForm();
  const addressState = useSelector((state) => state.address);
  const cart = useSelector((state) => state.cart.cart);
  const [newAddress, setNewAddress] = useState({
    province: {},
    district: {},
    ward: {},
  });
  const totalOrderNotShipping = cart.products.reduce(
    (agr, cur, index) => agr + cur.price * cur.quantity,
    0
  );
  useEffect(() => {
    if (userInfo) dispatch(fetchCart({ idUser: userInfo.id }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(fetchListProvinces());
  }, []);

  const { address, provinces, districts, wards } = addressState;
  useEffect(() => {
    dispatch(fetchAddress({ id: userInfo.id }));
  }, []);
  let listAddressOptions = [];
  if (address.id && address.id !== "" && address.list_address[0]) {
    listAddressOptions = address.list_address.map((address, index) => {
      return {
        value: index,
        label: `${address.specific_address}, ${address.ward.name}, ${address.district.name}, ${address.province.name}, Việt Nam`,
      };
    });
  }
  const fetchProvincesVietNam = (provinceCode, districtCode) => {
    dispatch(fetchListProvinces());
    dispatch(fetchListDistricts(provinceCode));
    dispatch(fetchListWards(districtCode));
  };
  const handleSetInitValue = (value) => {
    const addressSelector = address.list_address[value];
    fetchProvincesVietNam(
      addressSelector.province.code,
      addressSelector.district.code
    );
    form.setFieldsValue({
      full_name: addressSelector.full_name,
      phone_number: addressSelector.phone_number,
      specific_address: addressSelector.specific_address,
      provinces: addressSelector.province.code,
      districts: addressSelector.district.code,
      wards: addressSelector.ward.code,
    });
    setNewAddress({
      province: { ...addressSelector.province },
      district: { ...addressSelector.district },
      ward: { ...addressSelector.ward },
    });
  };

  const handleSelectProvice = (value) => {
    const provinceSelect = provinces.find((item) => item.code === value);
    setNewAddress({
      ...newAddress,
      province: { name: provinceSelect.name, code: provinceSelect.code },
    });
    dispatch(fetchListDistricts(value));
    provinceUref.current.blur();
  };

  const handleSelectDistrict = (value) => {
    const districtSelect = districts.find((item) => item.code === value);
    setNewAddress({
      ...newAddress,
      district: { name: districtSelect.name, code: districtSelect.code },
    });
    dispatch(fetchListWards(value));
    districtUref.current.blur();
  };

  const handleSelectWard = (value) => {
    const wardSelect = wards.find((item) => item.code === value);
    setNewAddress({
      ...newAddress,
      ward: { name: wardSelect.name, code: wardSelect.code },
    });
    wardUref.current.blur();
  };

  const onSearch = (value) => {};
  const handleSave = (value) => {
    console.log(value);
  };

  const handleCancel = (e) => {
    form.resetFields();
  };

  const handleOrder = () => {
    form.validateFields();
    const valueForm = form.getFieldsValue();
    const {
      full_name,
      note_shipping,
      phone_number,
      provinces,
      districts,
      wards,
      specific_address,
    } = valueForm;
    if (
      !full_name ||
      !phone_number ||
      !provinces ||
      !districts ||
      !wards ||
      !specific_address
    )
      return;
    if (!paymentMethod) {
      notification.error({
        message: "Vui lòng chọn phương thức thanh toán!",
        style: { border: "2px solid #ff623d" },
        duration: 2,
      });
      return;
    }
    const address_shipping = `${specific_address}, ${newAddress.ward.name}, ${newAddress.district.name}, ${newAddress.province.name}`;
    const paymentOrder = PAYMENTS_METHOD.find(
      (method, index) => method.value === paymentMethod
    );
    const payload = {
      id: v4(),
      id_user: userInfo.id,
      time_create: new Date().toLocaleString(),
      cart: cart.products,
      checkout_address: {
        full_name,
        address: address_shipping,
        phone_number,
        note_shipping,
      },
      payment_method: paymentMethod,
      status_order: "Chưa vận chuyển",
      status_payment: false
    };
    dispatch(fetchAddOrder(payload))
    const data = {
      products: []
    }
    dispatch(fetchChangeCart({idUser: userInfo.id, data}))
    navigate(ROUTE.ADDRESS)
  };
  const [paymentMethod, setPaymentMethod] = useState();
  const [shippingPrice, setShippingPrice] = useState(30000);
  useEffect(() => {
    if (totalOrderNotShipping > 499000) {
      setShippingPrice(0);
    } else {
      setShippingPrice(30000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);
  return (
    <FullLayout>
      <div className="checkout">
        <div className="checkout-container">
          <div className="checkout__header">
            <Row justify="center">
              <Link to={ROUTE.HOME_PAGE}>CT-shop</Link>
            </Row>
          </div>
          <div className="checkout__body">
            <Row justify="center" align="top" gutter={[16, 16]}>
              <Col lg={14} md={20} sm={24} xs={24}>
                <Row>
                  <Col span={24} className="checkout-info-container">
                    <h3>Thông tin giao hàng</h3>
                    <Form
                      form={form}
                      onFinish={handleSave}
                      className="checkout-info-form"
                    >
                      <Row
                        align="top"
                        justify="space-between"
                        gutter={[16, 16]}
                      >
                        <Col span={24}>
                          <Form.Item name="default_address">
                            <Select
                              onChange={handleSetInitValue}
                              placeholder="Chọn địa chỉ từ sổ địa chỉ của bạn"
                              optionFilterProp="children"
                              filterOption={(input, option) =>
                                (option?.label ?? "")
                                  .toLowerCase()
                                  .includes(input.toLowerCase())
                              }
                              options={listAddressOptions}
                            />
                          </Form.Item>
                        </Col>
                        <Col lg={12} md={12} sm={24} xs={24}>
                          <Form.Item
                            name="full_name"
                            rules={[
                              {
                                required: true,
                                message: "Họ tên của bạn là gì?",
                              },
                            ]}
                          >
                            <Input placeholder="Họ tên" size="middle" />
                          </Form.Item>
                        </Col>
                        <Col lg={12} md={12} sm={24} xs={24}>
                          <Form.Item
                            name="phone_number"
                            rules={[
                              {
                                required: true,
                                message: "Nhập số điện thoại của bạn!",
                              },
                              {
                                validator: (_, value) => {
                                  if (
                                    !value ||
                                    /(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(
                                      value
                                    )
                                  ) {
                                    return Promise.resolve();
                                  }
                                  return Promise.reject(
                                    new Error("Số điện thoại không hợp lệ")
                                  );
                                },
                              },
                            ]}
                          >
                            <Input size="middle" placeholder="Số điện thoại" />
                          </Form.Item>
                        </Col>

                        <Col lg={24} md={24} sm={24} xs={24}>
                          <Row
                            justify="space-between"
                            align="top"
                            gutter={[8, 16]}
                          >
                            <Col lg={8} md={8} sm={24} xs={24}>
                              <Form.Item
                                name="provinces"
                                rules={[
                                  {
                                    required: true,
                                    message: "Chọn tỉnh, thành phố!",
                                  },
                                ]}
                              >
                                <Select
                                  ref={provinceUref}
                                  placeholder="Tỉnh, thành phố"
                                  showSearch
                                  optionFilterProp="children"
                                  onChange={handleSelectProvice}
                                  onSearch={onSearch}
                                  filterOption={(input, option) =>
                                    (option?.label ?? "")
                                      .toLowerCase()
                                      .includes(input.toLowerCase())
                                  }
                                  options={provinces.map((item) => {
                                    return {
                                      value: item.code,
                                      label: item.name,
                                    };
                                  })}
                                />
                              </Form.Item>
                            </Col>
                            <Col lg={8} md={8} sm={24} xs={24}>
                              <Form.Item
                                name="districts"
                                dependencies={["province"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Chọn quận, huyện, thị xã!",
                                  },
                                ]}
                              >
                                <Select
                                  ref={districtUref}
                                  placeholder="Quận, huyện"
                                  showSearch
                                  optionFilterProp="children"
                                  onChange={handleSelectDistrict}
                                  onSearch={onSearch}
                                  disabled={!form.getFieldValue().provinces}
                                  filterOption={(input, option) =>
                                    (option?.label ?? "")
                                      .toLowerCase()
                                      .includes(input.toLowerCase())
                                  }
                                  options={districts.map((item) => {
                                    return {
                                      value: item.code,
                                      label: item.name,
                                    };
                                  })}
                                />
                              </Form.Item>
                            </Col>
                            <Col lg={8} md={8} sm={24} xs={24}>
                              <Form.Item
                                name="wards"
                                rules={[
                                  {
                                    required: true,
                                    message: "Chọn xã, phường, thị trấn!",
                                  },
                                ]}
                              >
                                <Select
                                  ref={wardUref}
                                  placeholder="Phường, xã"
                                  showSearch
                                  optionFilterProp="children"
                                  onChange={handleSelectWard}
                                  onSearch={onSearch}
                                  disabled={!form.getFieldValue().districts}
                                  filterOption={(input, option) =>
                                    (option?.label ?? "")
                                      .toLowerCase()
                                      .includes(input.toLowerCase())
                                  }
                                  options={wards.map((item) => {
                                    return {
                                      value: item.code,
                                      label: item.name,
                                    };
                                  })}
                                />
                              </Form.Item>
                            </Col>
                          </Row>
                        </Col>
                        <Col lg={24} md={24} sm={24} xs={24}>
                          <Form.Item
                            name="specific_address"
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng nhập đầy đủ địa chỉ cụ thể?",
                              },
                            ]}
                          >
                            <Input size="middle" placeholder="Địa chỉ cụ thể" />
                          </Form.Item>
                        </Col>
                        <Col lg={24} md={24} sm={24} xs={24}>
                          <Form.Item name="note_shipping">
                            <TextArea placeholder="Ghi chú (Tùy chọn)" />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Form>
                  </Col>
                </Row>
                <Row>
                  <Col span={24} className="checkout-payments-container">
                    <Row
                      justify="space-between"
                      align="top"
                      gutter={[8, 16]}
                      type="flex"
                    >
                      <Col lg={24} md={24} sm={24} xs={24}>
                        <div className="checkout-payments">
                          <h3>Thanh toán</h3>
                          <div className={`payments-wrap`}>
                            {PAYMENTS_METHOD.map((payment, index) => {
                              return (
                                <div className="payments" key={v4()}>
                                  <div className="radio-wrap">
                                    <div className="radio-input">
                                      <input
                                        type="radio"
                                        className="input-radio"
                                        onChange={() => {
                                          setPaymentMethod(payment.value);
                                        }}
                                        value={payment.value}
                                        checked={
                                          payment.value === paymentMethod
                                        }
                                        id={`payment-${payment.value}`}
                                      />
                                    </div>
                                  </div>
                                  <label
                                    className="radio-label"
                                    htmlFor={`payment-${payment.value}`}
                                  >
                                    <span className="radio-label__title">
                                      {payment.label}
                                    </span>
                                    <span className="radio-label__accessory">
                                      <i
                                        className="payment-icon"
                                        style={{
                                          backgroundImage: `url(${payment.url_icon})`,
                                        }}
                                      ></i>
                                    </span>
                                  </label>
                                </div>
                              );
                            })}
                            <p>Vui lòng chọn phương thức thanh toán</p>
                          </div>
                        </div>
                      </Col>
                      <Col lg={24} md={24} sm={24} xs={24}>
                        <div className="checkout-transportation_cost">
                          <h3>Vận chuyển</h3>
                          {SHIPPING_PRICE.map((shipping, index) => {
                            return (
                              <div
                              key={v4()}
                                className={
                                  "transportation_cost " +
                                  (shipping.value === shippingPrice
                                    ? ""
                                    : "not-checked")
                                }
                              >
                                <div className="radio-wrap">
                                  <div className="radio-input">
                                    <input
                                      type="radio"
                                      className="input-radio"
                                      value={shipping.value}
                                      onChange={() => {}}
                                      checked={shipping.value === shippingPrice}
                                    />
                                  </div>
                                </div>
                                <label className="radio-label">
                                  <span className="radio-label__title">
                                    {shipping.label.name}
                                  </span>
                                  <span className="radio-label__accessory">
                                    {shipping.label.price}
                                  </span>
                                </label>
                              </div>
                            );
                          })}
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col
                lg={10}
                md={20}
                sm={24}
                xs={24}
                className="checkout-cart-container"
              >
                <div className="checkout-cart-wrap">
                  <h3>Đơn hàng</h3>
                  <div className="cart__availabel">
                    <div className="cart__inner">
                      {cart.products?.map((item, index) => {
                        return (
                          <div className="cart__item" key={v4()}>
                            <img
                              src={`${item["image_url"]}`}
                              alt=""
                              width={55}
                            />{" "}
                            <div className="cart__item-body">
                              <div className="description-item-wrap">
                                <div className="cart-item">
                                  <div className="cart-item__name-options">
                                    <div className="cart-item__name">
                                      {item.name}
                                    </div>
                                    <div className="cart-item__options">
                                      {item.color
                                        ? `${item.color} / ${item.size}`
                                        : `${item.size}`}
                                    </div>
                                  </div>
                                  <div className="cart-item__price">
                                    {common.formatPrice(item.price)}đ
                                  </div>
                                </div>
                              </div>
                              <div className="cart__item-bottom">
                                <div className="cart-item__quantity">
                                  SL: {item.quantity}
                                </div>
                                <div className="cart-item__total-price">
                                  Tổng cộng:{" "}
                                  <span>
                                    {common.formatPrice(
                                      item.price * item.quantity
                                    )}
                                    đ
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="cart__bottom">
                      <p className="cart__total-price">
                        <span>Tạm tính:</span>
                        <strong>
                          {common.formatPrice(totalOrderNotShipping)}đ
                        </strong>
                      </p>
                      <p className="cart__shipping">
                        <span>Phí vận chuyển:</span>
                        <strong>
                          {shippingPrice
                            ? common.formatPrice(shippingPrice) + "đ"
                            : "Miễn phí"}
                        </strong>
                      </p>
                      <p className="checkout-total-price">
                        <span>Tổng đơn hàng:</span>
                        <strong>
                          {common.formatPrice(
                            totalOrderNotShipping + shippingPrice
                          )}
                          đ
                        </strong>
                      </p>
                      <button className="order-btn" onClick={handleOrder}>
                        Đặt hàng
                      </button>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </FullLayout>
  );
}

export default Checkout;
