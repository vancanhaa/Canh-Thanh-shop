function Footer() {
  return (
    <div className="footer-container">
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-4 col-sm-6 mb-5 mb-lg-0 text-center text-sm-left mr-auto">
              <div className="footer-widget">
                <h4 className="mb-4">CanhThanh</h4>
                <p className="lead">
                  Iste dolores iure quis excepturi, deserunt praesentium.
                </p>

                <div className="">
                  <p className="mb-0">
                    <strong>Địa chỉ : </strong>Đà Nẵng, VN
                  </p>
                  <p>
                    <strong>Email : </strong> support@email.com
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-2 col-sm-6 mb-5 mb-lg-0 text-center text-sm-left">
              <div className="footer-widget">
                <h4 className="mb-4">Khám phá</h4>
                <ul className="pl-0 list-unstyled mb-0">
                  <li>
                    <a href="#!">Thời trang nam</a>
                  </li>
                  <li>
                    <a href="#!">Thời trang nữ</a>
                  </li>
                  <li>
                    <a href="#!">Đồ trẻ em</a>
                  </li>
                  <li>
                    <a href="#!">Phụ kiện</a>
                  </li>
                  <li>
                    <a href="#!">Giày, dép</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-md-6 col-lg-2 col-sm-6 mb-5 mb-lg-0 text-center text-sm-left">
              <div className="footer-widget">
                <h4 className="mb-4">Liên kết hữu ích</h4>
                <ul className="pl-0 list-unstyled mb-0">
                  <li>
                    <a href="#!">Tin tức &amp; Mẹo</a>
                  </li>
                  <li>
                    <a href="#!">Về chúng tôi</a>
                  </li>
                  <li>
                    <a href="#!">Hỗ trợ</a>
                  </li>
                  <li>
                    <a href="#!">Cửa hàng</a>
                  </li>
                  <li>
                    <a href="#!">Liên hệ</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-md-6 col-lg-3 col-sm-6 text-center text-sm-left">
              <div className="footer-widget">
                <h4 className="mb-4">Giờ mở cửa</h4>
                <ul className="pl-0 list-unstyled mb-5">
                  <li className="d-lg-flex justify-content-between">
                    Thứ 2-Thứ 6 <span>8.00-20.00</span>
                  </li>
                  <li className="d-lg-flex justify-content-between">
                    Thứ 7 <span>10.00-20.00</span>
                  </li>
                  <li className="d-lg-flex justify-content-between">
                    Chủ nhật <span>12-20.00</span>
                  </li>
                </ul>

                <h5>Hotline : +(000) 000-000</h5>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <div className="footer-btm py-4 ">
        <div className="container">
          <div className="row ">
            <div className="col-lg-4">
              <p className="copyright mb-0 ">@ Bản quyền thuộc về CanhThanh</p>
            </div>
            <div className="col-lg-8">
              <ul className="list-inline mb-0 footer-btm-links text-lg-right mt-2 mt-lg-0">
                <li className="list-inline-item">
                  <a href="#!">Chính sách bảo mật</a>
                </li>
                <li className="list-inline-item">
                  <a href="#!">Điều khoản &amp; Điều kiện</a>
                </li>
                <li className="list-inline-item">
                  <a href="#!">Chính sách</a>
                </li>
                <li className="list-inline-item">
                  <a href="#!">Điều khoản bán hàng</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
