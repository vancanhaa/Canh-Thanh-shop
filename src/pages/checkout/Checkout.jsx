import { Checkbox, Col, Form, Input, Row, Select } from "antd";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ROUTE } from "../../constants";
import FullLayout from "../../layouts/full-layout/FullLayout";
import {
  fetchListDistricts,
  fetchListWards,
} from "../../stores/actions/address.action";
import "./checkout.scss";
function Checkout() {
  const { TextArea } = Input;
  const dispatch = useDispatch();
  const provinceUref = useRef();
  const districtUref = useRef();
  const wardUref = useRef();
  const [form] = Form.useForm();
  const addressState = useSelector((state) => state.address);

  const { address, provinces, districts, wards } = addressState;

  const [newAddress, setNewAddress] = useState({
    province: {},
    district: {},
    ward: {},
  });

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
            <Row justify="space-between" gutter={[16, 16]}>
              <Col lg={15} md={15} sm={24} xs={24}>
                <Row>
                  <Col span={24}>
                    <h3>Thông tin giao hàng</h3>
                    <Form form={form} onFinish={handleSave}>
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
                                  placeholder="Quận, huyện, thị xã"
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
                  <Col lg={12} md={12} sm={24} xs={24}>
                    <h3>Thanh toán</h3>
                  </Col>
                  <Col lg={12} md={12} sm={24} xs={24}>
                    <h3>Vận chuyển</h3>
                  </Col>
                </Row>
              </Col>
              <Col lg={9} md={9} sm={24} xs={24}>
                <h3>Đơn hàng</h3>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </FullLayout>
  );
}

export default Checkout;
