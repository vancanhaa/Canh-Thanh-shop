import { FileDoneOutlined, UserOutlined } from '@ant-design/icons'
import { Col, Menu, Row } from 'antd'
import React from 'react'
import { ImLocation } from 'react-icons/im'
import { Outlet, useNavigate } from 'react-router-dom'
import { ROUTE } from '../../constants'
import MainLayout from "../../layouts/main-layout/MainLayout"
import { getItem } from '../../utils/menu'
import "./account.scss"
function Account() {
    const navigate = useNavigate()
    const items = [
        getItem("Tài khoản của tôi", ROUTE.PROFILE, <UserOutlined />),
        getItem("Đơn hàng của tôi", ROUTE.ORDER, <FileDoneOutlined />),
        getItem("Sổ địa chỉ", ROUTE.ADDRESS, <ImLocation />)
    ]
    const handleSelect = (value) => {
        console.log("click", value)
        navigate(value.key)
    }
  return (
    <MainLayout>
        <div className="account">
            <div className="account-container">
                <div className="account-header">TAI KHOAN</div>
                <Row justify="space-between" align="top" gutter={[16, 16]}>
                    <Col lg={6} md={6}>
                        <div className="account-menu_bar">
                            <div className="menu_bar-header">
                                <div className="menu_bar-avatar">
                                    <UserOutlined />
                                </div>
                                <p className='menu_bar-user_name'>Pham Canh</p>
                                <button className='btn-logout'>Đăng xuất</button>
                            </div>
                            <div className="menu_bar-body">
                                <Menu defaultSelectedKeys={[ROUTE.PROFILE]}
                                    mode="inline"
                                    items={items}
                                    onSelect={handleSelect}
                                />
                                    
                            </div>
                        </div>
                    </Col>
                    <Col lg={18} md={18}>
                        <Outlet />
                    </Col>
                </Row>
            </div>
        </div>
    </MainLayout>
  )
}

export default Account