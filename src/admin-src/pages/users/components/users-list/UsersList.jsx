import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Col, Modal, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import {
  fetchChangeUserAdmin,
  fetchDeleteUserAdmin,
  fetchUsersListAdmin,
} from "../../../../stores/actions/usersAdmin.action";
import "./users-list.scss";
import { Loading } from "../../../analysis/components/loading/Loading";
import UserEditForm from "../user-edit-form/UserEditForm";

function UsersList() {
  const dispatch = useDispatch();
  const usersAdminState = useSelector((state) => state.usersAdmin);
  const { listUsers, pagination, isDeleteUserSuccess, fetchingUsersAdmin } =
    usersAdminState;
  const { page, limit } = pagination;
  const [modal, contextHolder] = Modal.useModal();

  useEffect(() => {
    if (isDeleteUserSuccess) {
      dispatch(fetchUsersListAdmin({ page: page, limit: limit }));
    }
  }, [isDeleteUserSuccess]);

  const confirm = (id) => {
    const userDetail = listUsers.find((user, index) => user.id === id);

    modal.confirm({
      className: "confirm-delete-item",
      title:
        "Quản trị viên có chắc chắn muốn xoá người dùng này khỏi danh sách người dùng?",
      icon: <ExclamationCircleOutlined />,
      content: userDetail.email,
      okText: "Đồng ý",
      cancelText: "Không",
      onOk: () => handleDeleteUser(id),
    });
  };

  const handleDeleteUser = (id) => {
    dispatch(fetchDeleteUserAdmin(id));
    setIsOpen(false);
  };
  const indexUser = (page - 1) * 10;

  const [isOpen, setIsOpen] = useState(false);
  const [currentUserSelection, setCurrentUserSelection] = useState();
  const [currentUserChange, setCurrentUserChange] = useState();
  const handleCurrentUserChange = (change) => {
    setCurrentUserChange(change);
  };
  const handleOk = () => {
    if (window.confirm("Lưu thay đổi?")) {
      dispatch(
        fetchChangeUserAdmin({
          id: currentUserChange.id,
          data: currentUserChange,
        })
      );
      setIsOpen(false);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    setCurrentUserSelection({ ...currentUserSelection });
  };

  const handleOpenModal = (id, index) => {
    setCurrentUserSelection(listUsers[index]);
    setIsOpen(true);
  };

  return (
    <div className="users-body__content">
      {fetchingUsersAdmin ? (
        <Loading />
      ) : (
        listUsers.map((user, index) => {
          const { email, password, id, role, first_name, last_name, phone } =
            user;
          return (
            <div className="users-item" key={v4()}>
              <Row
                justify="space-between"
                align="middle"
                gutter={[16, 16]}
                className="center-text"
              >
                <Col span={3}>{indexUser + index + 1}</Col>
                <Col span={4}>{last_name}</Col>
                <Col span={3}>{first_name}</Col>
                <Col span={4}>{phone}</Col>
                <Col span={4}>{email}</Col>
                <Col span={3}>{role}</Col>
                <Col span={3}>
                  <div
                    className="edit-action"
                    onClick={() => handleOpenModal(id, index)}
                  >
                    Sửa
                  </div>
                  <div className="delete-action" onClick={() => confirm(id)}>
                    Xóa
                  </div>
                </Col>
              </Row>
            </div>
          );
        })
      )}
      {contextHolder}
      {isOpen && (
        <Modal
          className="user-detail-container"
          title="Thông tin người dùng:"
          open={isOpen}
          onOk={() => handleOk()}
          onCancel={handleCancel}
          footer={[
            <Button
              className="modal-button"
              key="cancel"
              onClick={handleCancel}
            >
              Thoát
            </Button>,
            <Button
              className="modal-button delete-btn"
              key="delete"
              onClick={() => confirm(currentUserSelection.id)}
            >
              Xóa
            </Button>,
            <Button
              className="modal-button save-btn"
              key="ok"
              onClick={handleOk}
            >
              Lưu
            </Button>,
          ]}
        >
          <UserEditForm
            currentUserSelection={currentUserSelection}
            handleCurrentUserChange={handleCurrentUserChange}
          />
        </Modal>
      )}
    </div>
  );
}

export default UsersList;
