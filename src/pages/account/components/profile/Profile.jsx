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
            <Col span={24}><span>Họ: </span>{userInfo.last_name}</Col>
            <Col span={24}><span>Tên: </span>{userInfo.first_name}</Col>
            <Col span={24}><span>Địa chỉ email: </span>{userInfo.email}</Col>
            <Col span={24}><span>Số điện thoại</span>{userInfo.phone}</Col>
          </Row>
        </div>
      </div>
    </div>
  )
}

export default Profile