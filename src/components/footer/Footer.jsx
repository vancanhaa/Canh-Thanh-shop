import { Col, Row } from "antd";
import "./footer.scss"
function Footer() {
  return (
    <div className="footer">
      <div className="footer-container">
        <Row gutter={[16, 16]}>
          <Col lg={6} md={6} sm={12} xs={24}>
            <h4>KHÁM PHÁ CT-SHOP</h4>
            <ul>
              <li>
                <a href="#!">Áo Polo</a>
              </li>
              <li>
                <a href="#!">Áo thun</a>
              </li>
              <li>
                <a href="#!">Quần Jeans</a>
              </li>
              <li>
                <a href="#!">Áo Jacket</a>
              </li>
            </ul>
          </Col>
          <Col lg={6} md={6} sm={12} xs={24}>
            <h4>HỖ TRỢ KHÁCH HÀNG</h4>
            <ul>
              <li>
                <a href="#!">Hướng dẫn chọn size</a>
              </li>
              <li>
                <a href="#!">Chính sách đổi/trả</a>
              </li>
              <li>
                <a href="#!">Thanh toán, giao nhận</a>
              </li>
              <li>
                <a href="#!">Chính sách bảo mật thông tin khách hàng</a>
              </li>
            </ul>
          </Col>
          <Col lg={6} md={6} sm={12} xs={24}>
            <h4>VỀ CHÚNG TÔI</h4>
            <ul>
              <li>Công ty cổ phần thời trang CT-shop</li>
              <li>Mã số thuế: 08012066986</li>
              <li>Địa chỉ: Số 35 Hùng Vương - quận Hải Châu - TP.Đà Nẵng</li>
            </ul>
          </Col>

          <Col lg={6} md={6} sm={12} xs={24}>
            <h4>CT-SHOP LẮNG NGHE BẠN</h4>
            <ul>
              <li>
                <a href="#!">Hotline: 18002086</a>
              </li>
              <li>
                <a href="#!">Email: chamsockhachhang@gmail.com</a>
              </li>
            </ul>
          </Col>
        </Row>
        <div className="footer-copyright">
          @ Bản quyền thuộc về <a href="#!">CTshop.vn</a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
