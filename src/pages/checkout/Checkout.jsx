import { Checkbox, Col, Form, Input, Row, Select } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
import { ROUTE } from "../../constants";
import FullLayout from "../../layouts/full-layout/FullLayout";
import {
  fetchListDistricts,
  fetchListWards,
} from "../../stores/actions/address.action";
import { fetchCart } from "../../stores/actions/cart.action";
import common from "../../utils/common";
import "./checkout.scss";
function Checkout() {
  const userInfo = useSelector((state) => state.user.userInfoState.data);
  const { TextArea } = Input;
  const dispatch = useDispatch();
  const provinceUref = useRef();
  const districtUref = useRef();
  const wardUref = useRef();
  const [form] = Form.useForm();
  const addressState = useSelector((state) => state.address);
  const cart = useSelector((state) => state.cart.cart);
  useEffect(() => {
    if (userInfo) dispatch(fetchCart({ idUser: userInfo.id }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { address, provinces, districts, wards } = addressState;

  const [newAddress, setNewAddress] = useState({
    province: {},
    district: {},
    ward: {},
  });

  const paymentMethods = [
    {
      value: 1,
      label: "Thanh toán qua thẻ thanh toán, ứng dụng ngân hàng VNPAY",
      url_icon:
        "https://bizweb.dktcdn.net/assets/themes_support/payment_icon_vnpay.png",
    },
    {
      value: 2,
      label: "Thanh toán qua mã QR - VNPAY",
      url_icon:
        "https://bizweb.dktcdn.net/assets/themes_support/vnpayqr-icon.png",
    },
    {
      value: 3,
      label: "Thanh toán khi nhận hàng (COD)",
      url_icon:
        "https://png.pngtree.com/png-clipart/20200224/original/pngtree-pack-cash-icon-cartoon-style-png-image_5208194.jpg",
    },
  ];

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
  const onSearch = (value) => {
    console.log("search:", value);
  };
  const handleSave = () => {};

  const handleCancel = (e) => {
    form.resetFields();
  };

  const handleOrder = () => {
    form.submit()
  }

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
                              placeholder="Sổ địa chỉ"
                              //   optionFilterProp="children"
                              //   filterOption={(input, option) =>
                              //     (option?.label ?? "")
                              //       .toLowerCase()
                              //       .includes(input.toLowerCase())
                              //   }
                              //   options={districts.map((item) => {
                              //     return {
                              //       value: item.code,
                              //       label: item.name,
                              //     };
                              //   })}
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
                                    message: "this is err",
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
                                    message: "this is err",
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
                                    message: "this is err",
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
                    <Row justify="space-between" align="top" gutter={[8, 16]} type="flex">
                      <Col lg={24} md={24} sm={24} xs={24}>
                        <div className="checkout-payments">
                          <h3>Thanh toán</h3>
                          <div className="payments-wrap">
                            {paymentMethods.map((payment, index) => {
                              return (
                                <div className="payments">
                                  <div className="radio-wrap">
                                    <div className="radio-input">
                                      <input
                                        type="radio"
                                        className="input-radio"
                                      />
                                    </div>
                                  </div>
                                  <label className="radio-label">
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
                          </div>
                        </div>
                      </Col>
                      <Col lg={24} md={24} sm={24} xs={24}>
                        <div className="checkout-transportation_cost">
                          <h3>Vận chuyển</h3>
                          <div className="transportation_cost">
                            <div className="radio-wrap">
                              <div className="radio-input">
                                <input
                                  type="radio"
                                  className="input-radio"
                                  checked
                                />
                              </div>
                            </div>
                            <label className="radio-label">
                              <span className="radio-label__title">
                                Phí vận chuyển
                              </span>
                              <span className="radio-label__accessory">
                                30.000đ
                              </span>
                            </label>
                          </div>
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
                          {common.formatPrice(
                            cart.products?.reduce(
                              (arg, cur) => arg + cur.price * cur.quantity,
                              0
                            )
                          )}
                          đ
                        </strong>
                      </p>
                      <p className="cart__shipping">
                        <span>Phí vận chuyển:</span>
                        <strong>30.000đ</strong>
                      </p>
                      <p className="checkout-total-price">
                        <span>Tổng đơn hàng:</span>
                        <strong>
                          {common.formatPrice(
                            cart.products?.reduce(
                              (arg, cur) => arg + cur.price * cur.quantity,
                              0
                            ) + 30000
                          )}đ
                        </strong>
                      </p>
                      <button className="order-btn" onClick={handleOrder}>Đặt hàng</button>
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
