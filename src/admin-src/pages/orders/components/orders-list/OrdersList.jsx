import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Col, Modal, Row } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import { STATUS_ORDER } from "../../../../../constants/order.const";
import common from "../../../../../utils/common";
import { fetchDeleteUserAdmin, fetchUsersListAdmin } from "../../../../stores/actions/usersAdmin.action";
import "./orders-list.scss";

function OrdersList() {
  const dispatch = useDispatch();
  const ordersAdminState = useSelector((state) => state.ordersAdmin);
  const { listOrders, pagination } = ordersAdminState;
  const { page, limit } = pagination;
  const [modal, contextHolder] = Modal.useModal();
  const confirm = (id, index) => {
    modal.confirm({
      className: "confirm-delete-item",
      title: "Quản trị viên có chắc chắn muốn xoá đơn hàng này khỏi danh sách đơn hàng?",
      icon: <ExclamationCircleOutlined />,
      content: `${listOrders[index].id}`,
      okText: "Đồng ý",
      cancelText: "Không",
      onOk: () => handleDeleteProduct(id),
    });
  };

  const handleDeleteProduct = (id) => {
    dispatch(fetchDeleteUserAdmin(id))
    dispatch(fetchUsersListAdmin({page: page, limit: limit}))
  };
  const indexOrder = (page - 1) * 10;
  return (
    <div className="orders-body__content">
      {listOrders.map((order, index) => {
        const { id, time_create, total_order, checkout_address, status_order,   } = order;
        const { full_name, address, phone_number } = checkout_address
        const statusOrderLabel = STATUS_ORDER.find((status, index) => status.status === status_order)?.label
          return (
            <div className="orders-item" key={v4()}>
                <Row justify="space-between"
              align="middle"
              gutter={[16, 16]}
              className="center-text">
              <Col span={2}>{indexOrder + index + 1}</Col>
              <Col span={3}>#{id.slice(0, 5)}</Col>
              <Col span={3}>{full_name}</Col>
              <Col span={2}>{phone_number}</Col>
              <Col span={5}>{address}</Col>
              <Col span={3}>{time_create}</Col>
              <Col span={2}>{common.formatPrice(total_order)}đ</Col>
              <Col span={2} className={status_order}>{statusOrderLabel}</Col>
              <Col span={2}>
                <div className="edit-action">Chi tiết</div>
              </Col>
            </Row>
            </div>
          )
      })}
      {contextHolder}
    </div>
  );
}

export default OrdersList;
