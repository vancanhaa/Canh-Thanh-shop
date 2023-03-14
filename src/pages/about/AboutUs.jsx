import React from "react";
import "./about.scss"
import { Link } from "react-router-dom";
import MainLayout from "../../layouts/main-layout/MainLayout";

export default function AboutUs() {
  return (
    <>
      <MainLayout>
        <div className="about">
        <div className="breadcrumb-bar">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <Link to={"/"}> Home / </Link>
              </li>
              <li class="breadcrumb-item" aria-current="page">
                About Us
              </li>
            </ol>
          </div>
          <h2>Giới thiệu</h2>
          <h4>UY TÍN TẠO NÊN LÒNG TIN CHO KHÁCH HÀNG!</h4>
          <p className="p1">
            Giữa muôn vàn cửa hàng tại Đà Nẵng, những khách hàng ở địa phương và
            ngoại tỉnh xa xôi vẫn tin tưởng mua hàng tại CT-Shop để sử dụng hoặc
            kinh doanh nhờ vào giá cả hợp lý và dịch vụ chăm sóc khách hàng.
          </p>
          <p className="p2">
            Chúng tôi chuyên kinh doanh hàng chính hãng uy tín trên thị trường
            nên khi mua hàng tại cửa hàng chúng tôi, Quý khách sẽ được bảo hành
            chính hãng, nhân viên của hãng sẽ hỗ trợ tư vấn và xử lý mọi lúc khi
            khách cần. Chúng tôi rất biết ơn sự tín nhiệm của Quý khách và mong
            được Quý khách tiếp tục ủng hộ .
          </p>
          <p className="p3">
            Quý Khách ở khu vực Đà Nẵng / Miền Trung có nhu cầu demo sản phẩm
            laptop, điện thoại trước khi mua sản phẩm, vui lòng liên lạc chúng
            tôi theo thông tin dưới đây:
          </p>
          <h4>Địa chỉ cửa hàng:</h4>
          <p>
            <b>Addess:</b> Số 35 Hùng Vương - quận Hải Châu - TP.Đà Nẵng
          </p>
          <p>
            <b>Phone:</b> 18002086
          </p>
        </div>
      </MainLayout>
    </>
  );
}
