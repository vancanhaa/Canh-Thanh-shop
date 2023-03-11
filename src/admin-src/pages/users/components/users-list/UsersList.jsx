import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Col, Modal, Row } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import { fetchDeleteUserAdmin, fetchUsersListAdmin } from "../../../../stores/actions/usersAdmin.action";
import "./users-list.scss";

function UsersList() {
  const dispatch = useDispatch();
  const usersAdminState = useSelector((state) => state.usersAdmin);
  const { listUsers, pagination } = usersAdminState;
  const { page, limit } = pagination;
  const [modal, contextHolder] = Modal.useModal();

  const confirm = (id, index) => {
    modal.confirm({
      className: "confirm-delete-item",
      title: "Quản trị viên có chắc chắn muốn xoá người dùng này khỏi danh sách người dùng?",
      icon: <ExclamationCircleOutlined />,
      content: `${listUsers[index].email}`,
      okText: "Đồng ý",
      cancelText: "Không",
      onOk: () => handleDeleteProduct(id),
    });
  };

  const handleDeleteProduct = (id) => {
    dispatch(fetchDeleteUserAdmin(id))
    dispatch(fetchUsersListAdmin({page: page, limit: limit}))
  };
  const indexUser = (page - 1) * 10;
  return (
    <div className="users-body__content">
      {listUsers.map((user, index) => {
        const { email, password, id, role, first_name, last_name, phone } = user;
          return (
            <div className="users-item" key={v4()}>
                <Row justify="space-between"
              align="middle"
              gutter={[16, 16]}
              className="center-text">
              <Col span={3}>{indexUser + index + 1}</Col>
              <Col span={4}>{last_name}</Col>
              <Col span={3}>{first_name}</Col>
              <Col span={4}>{phone}</Col>
              <Col span={4}>{email}</Col>
              <Col span={3}>{role}</Col>
              <Col span={3}>
              <div className="edit-action">Sửa</div>
                <div className="delete-action" 
                onClick={() => confirm(id, index)}
                >Xóa</div>
              </Col>
            </Row>
            </div>
          )
      })}
      {contextHolder}
    </div>
  );
}

export default UsersList;
