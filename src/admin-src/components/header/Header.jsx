import { Menu } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { GrUserAdmin } from "react-icons/gr";
import { GiClothes } from "react-icons/gi";
import { MdGroups } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BarChartOutlined, CheckSquareOutlined } from "@ant-design/icons";

import "./header.scss"
import { getItem } from "../../../utils/menu";
import { ROUTE } from "../../../constants";

function Header() {
    const location = useLocation()
    const navigate = useNavigate()
  const userInfo = useSelector((state) => state.user.userInfoState.data);
  const items = [
    getItem("Thống kê", ROUTE.ANALYSIS_ADMIN, <BarChartOutlined />),
    getItem("Sản phẩm", ROUTE.PRODUCTS_ADMIN, <GiClothes />),
    getItem("Người dùng", ROUTE.USERS_ADMIN, <MdGroups />),
    getItem("Đơn hàng", ROUTE.ORDERS_ADMIN, <CheckSquareOutlined /> )

  ];

  const handleSelect = (value) => {
    navigate(value.key)
  };
  return (
    <div className="header-admin-container">
      <div className="header-left">
        <div className="header-logo">
          <Link to={"/"}>CT-shop</Link>
        </div>
        <div className="header-menu">
          <Menu
            onSelect={handleSelect}
            defaultSelectedKeys={[ROUTE.ANALYSIS_ADMIN]}
            selectedKeys={[location.pathname === "/admin" ? ROUTE.ANALYSIS_ADMIN : location.pathname]}
            mode="horizontal"
            items={items}
          />
          
        </div>
      </div>
      <div className="header-right">
        <div className="header-account">
          <div className="header-account__icon">
            <GrUserAdmin />
          </div>
          <div className="header-account__email">{userInfo.email}</div>
        </div>
      </div>
    </div>
  );
}

export default Header;
