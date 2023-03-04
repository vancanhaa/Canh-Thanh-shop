import { Col, Row } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import "./profile.scss"

function Profile() {
  const userInfo = useSelector((state) => state.user.userInfoState.data);

  return (
    <div className="profile">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-header__title">Thông tin cá nhân</div>
        </div>
        <div className="profile-content">
          <Row gutter={[16, 16]}>
            <Col lg={12} md={10} sm={24} xs={24}><span>Họ và tên: </span>{`${userInfo.last_name} ${userInfo.first_name}`}</Col>
            <Col lg={12} md={14} sm={24} xs={24}><span>Địa chỉ email: </span>{userInfo.email}</Col>
            <Col lg={12} md={10} sm={24} xs={24}><span>Số điện thoại</span>{userInfo.phone}</Col>
            <Col lg={12} md={14} sm={24} xs={24}><span>Địa chỉ: </span></Col>
          </Row>
        </div>
      </div>
    </div>
  )
}

export default Profile