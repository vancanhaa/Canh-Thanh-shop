import { Checkbox, Col, Form, Input, Modal, Row, Select } from "antd";
import React, { useEffect, useRef, useState } from "react";
import MainLayout from "../../layouts/main-layout/MainLayout";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./address.scss";
import { useDispatch, useSelector } from "react-redux";
import { localStorageUlti } from "../../utils/localStorage";
import {
  fetchAddress,
  fetchChangeAddress,
  fetchCreateAddress,
  fetchListDistricts,
  fetchListProvinces,
  fetchListWards,
} from "../../stores/actions/address.action";
import { AddressUlti } from "../../utils/address";
import { v4 } from "uuid";

function Address() {
  const provinceUref = useRef();
  const districtUref = useRef();
  const wardUref = useRef();
  const dispatch = useDispatch();
  const userInfo = localStorageUlti("user_info", null).get();
  const addressState = useSelector((state) => state.address);
  const { address, provinces, districts, wards } = addressState;
  const [form] = Form.useForm();

  console.log(address);

  const [newAddress, setNewAddress] = useState({
    province: {},
    district: {},
    ward: {},
  });

  useEffect(() => {
    if (userInfo) dispatch(fetchAddress({ id: userInfo.id }));
  }, []);

  const [openModal, setOpenModal] = useState(false);

  const handleCancel = (e) => {
    setOpenModal(false);
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

  const onSearch = (value) => {
    console.log("search:", value);
  };

  const handleClickAddAddress = () => {
    dispatch(fetchListProvinces());
    setOpenModal(true);
  };

  const handleAddNewAddress = (value) => {
    const newAddressFromForm = {
      full_name: value.full_name,
      phone_number: value.phone_number,
      specific_address: value.specific_address,
      ...newAddress,
    };
    if (address.id && address.id !=="") {
      dispatch(
        fetchChangeAddress({
          id: address.id,
          data: { list_address: [...address.list_address, newAddressFromForm] },
        })
      );
    } else {
      dispatch(
        fetchCreateAddress({
          id: userInfo.id,
          list_address: [newAddressFromForm]
        })
      )
    }
    form.resetFields();
    setOpenModal(false);
  };
  return (
    <MainLayout>
      <div className="address">
        <div className="address-container">
          <div className="address-title">SỔ ĐỊA CHỈ</div>
          <div className="address-body">
            <div className="address-body__header">
              <div className="address-body__title">Địa chỉ của bạn</div>
              <button
                className="address-body__btn"
                onClick={() => handleClickAddAddress()}
              >
                + Thêm địa chỉ mới
              </button>
            </div>
            <div className="address-body__content">
              {address.id && address.id !== "" && address.list_address.length > 0 ? address.list_address?.map((item, index) => {
                let {
                  full_name,
                  province,
                  district,
                  ward,
                  specific_address,
                  phone_number,
                } = item;
                return (
                  <Row key={v4()}>
                    <Col span={18} className="address-body__description">
                      <p>
                        <strong>Họ tên: </strong>
                        <span>{full_name}</span>
                      </p>
                      <p>
                        <strong>Địa chỉ: </strong>
                        <span>
                          {AddressUlti(
                            specific_address,
                            ward.name,
                            district.name,
                            province.name
                          ).get()}
                        </span>
                      </p>
                      <p>
                        <strong>Số điện thoại</strong>
                        <span>{phone_number}</span>
                      </p>
                    </Col>
                    <Col span={6} className="address-body__action">
                      <div className="address-body__btn-edit">
                        <EditOutlined />
                        Sửa
                      </div>
                      <div className="address-body__btn-delete">
                        <DeleteOutlined />
                        Xóa
                      </div>
                    </Col>
                  </Row>
                );
              }) : ""}
            </div>
          </div>
        </div>
        <Modal
          forceRender
          open={openModal}
          title="Thêm địa chỉ mới"
          onCancel={handleCancel}
          wrapClassName="modal-add-address"
        >
          <Form form={form} onFinish={handleAddNewAddress}>
            <Row align="top" justify="space-between" gutter={[16, 16]}>
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
                          /(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(value)
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
                <Row justify="space-between" align="top" gutter={[8, 16]}>
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
            </Row>
            <Row className="default-address">
              <Col span={24}>
                <Form.Item name="isDefaultAdress" valuePropName="checked">
                  <Checkbox>Đặt là địa chỉ mặc định?</Checkbox>
                </Form.Item>
              </Col>
            </Row>
            <Row justify="space-between" align="middle" gutter={[16, 16]}>
              <Col span={12}>
                <button
                  className="btn--cancel-address"
                  type="button"
                  onClick={handleCancel}
                >
                  HỦY
                </button>
              </Col>
              <Col span={12}>
                <button className="btn--save-address" type="submit">
                  LƯU
                </button>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    </MainLayout>
  );
}

export default Address;
