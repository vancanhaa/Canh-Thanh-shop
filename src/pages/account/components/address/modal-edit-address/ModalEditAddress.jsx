import { Checkbox, Col, Form, Input, Modal, Row, Select } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAddress,
  fetchChangeAddress,
  fetchCreateAddress,
  fetchListDistricts,
  fetchListWards,
} from "../../../../../stores/actions/address.action";
import { localStorageUlti } from "../../../../../utils/localStorage";

function ModalEditAddress({
  openModalEditAddress,
  setOpenModalEditAddress,
  indexAddressEdit,
}) {
  const provinceEditUref = useRef();
  const districtEditUref = useRef();
  const wardEditUref = useRef();
  const dispatch = useDispatch();
  const userInfo = localStorageUlti("user_info", null).get();
  const addressState = useSelector((state) => state.address);
  const { address, provinces, districts, wards } = addressState;
  const [form] = Form.useForm();
  const [newAddress, setNewAddress] = useState({
    province: {},
    district: {},
    ward: {},
  });
  const currentAddressEdit = address.list_address[indexAddressEdit];
  useEffect(() => {
    if (currentAddressEdit) {
      form.setFieldsValue({
        full_name: currentAddressEdit.full_name,
        phone_number: currentAddressEdit.phone_number,
        provinces: currentAddressEdit.province.code,
        districts: currentAddressEdit.district.code,
        wards: currentAddressEdit.ward.code,
        specific_address: currentAddressEdit.specific_address,
      });
      setNewAddress({
        province: { ...currentAddressEdit.province },
        district: { ...currentAddressEdit.district },
        ward: { ...currentAddressEdit.ward },
      });
    }
  }, [currentAddressEdit]);

  useEffect(() => {
    if (userInfo) dispatch(fetchAddress({ id: userInfo.id }));
  }, []);

  const handleCancel = (e) => {
    form.resetFields();
    setOpenModalEditAddress(false);
  };

  const handleSelectProvice = (value) => {
    const provinceSelect = provinces.find((item) => item.code === value);
    setNewAddress({
      ...newAddress,
      province: { name: provinceSelect.name, code: provinceSelect.code },
    });
    dispatch(fetchListDistricts(value));
    provinceEditUref.current.blur();
  };

  const handleSelectDistrict = (value) => {
    const districtSelect = districts.find((item) => item.code === value);
    setNewAddress({
      ...newAddress,
      district: { name: districtSelect.name, code: districtSelect.code },
    });
    dispatch(fetchListWards(value));
    districtEditUref.current.blur();
  };

  const handleSelectWard = (value) => {
    const wardSelect = wards.find((item) => item.code === value);
    setNewAddress({
      ...newAddress,
      ward: { name: wardSelect.name, code: wardSelect.code },
    });
    wardEditUref.current.blur();
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };

  const handleSave = (value) => {
    const newAddressFromForm = {
      full_name: value.full_name,
      phone_number: value.phone_number,
      specific_address: value.specific_address,
      ...newAddress,
    };
    console.log(newAddressFromForm);
    const newListAddress = [...address.list_address];
    newListAddress.splice(indexAddressEdit, 1, newAddressFromForm);
    dispatch(
      fetchChangeAddress({
        id: address.id,
        data: { list_address: newListAddress },
      })
    );
    form.resetFields();
    setOpenModalEditAddress(false);
  };

  return (
    <Modal
      forceRender
      open={openModalEditAddress}
      title="Thêm địa chỉ mới"
      onCancel={handleCancel}
      wrapClassName="modal-add-address"
    >
      <Form form={form} onFinish={handleSave}>
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
                    ref={provinceEditUref}
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
                    ref={districtEditUref}
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
                    ref={wardEditUref}
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
  );
}

export default ModalEditAddress;
