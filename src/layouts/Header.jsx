import "jquery/dist/jquery.slim.min.js";
import "popper.js/dist/umd/popper.min.js";
import "bootstrap/dist/js/bootstrap.min.js";

import { Link } from "react-router-dom";
import { ROUTE } from "../constants";
function Header() {
  return (
    <nav
      class="navbar navbar-expand-lg navbar-light bg-white w-100 navigation"
      id="navbar"
    >
      <div class="container">
        <Link class="navbar-brand font-weight-bold" to={{ pathname: "/" }}>
          CanhThanh
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#main-navbar"
          aria-controls="main-navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse " id="main-navbar">
          <ul class="navbar-nav mx-auto">
            <li class="nav-item active">
              <Link class="nav-link" to={{ pathname: ROUTE.HOME_PAGE }}>
                Trang chủ
              </Link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Về chúng tôi
              </a>
            </li>

            <li class="nav-item dropdown dropdown-slide">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown4"
                role="button"
                data-delay="350"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Pages.
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown4">
                <li>
                  <a href="#">Về chúng tôi</a>
                </li>
                <li>
                  <a href="#">Blog</a>
                </li>
                <li>
                  <a href="#">Blog Single</a>
                </li>
                <li>
                  <a href="#">Liên hệ</a>
                </li>
                <li>
                  <a href="#">404 Page</a>
                </li>
                <li>
                  <a href="#">FAQ</a>
                </li>
              </ul>
            </li>
            <li class="nav-item dropdown dropdown-slide">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown3"
                role="button"
                data-delay="350"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Shop.
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown3">
                <li>
                  <Link to={{ pathname: ROUTE.SHOP }}>Cửa hàng</Link>
                </li>
                <li>
                  <Link to={{ pathname: ROUTE.PRODUCT_DETAIL }}>
                    Chi tiết sản phẩm
                  </Link>
                </li>
                <li>
                  <Link to={{ pathname: ROUTE.CHECK_OUT }}>Thanh toán</Link>
                </li>
                <li>
                  <Link to={{ pathname: ROUTE.CART }}>Giỏ hàng</Link>
                </li>
              </ul>
            </li>

            <li class="nav-item dropdown dropdown-slide">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown5"
                role="button"
                data-delay="350"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Tài khoản.
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown5">
                <li>
                  <Link to={{ pathname: ROUTE.LOGIN }}>Đăng ký</Link>
                </li>
                <li>
                  <Link to={{ pathname: ROUTE.REGISTER }}>Đăng nhập</Link>
                </li>
                <li>
                  <Link to={{ pathname: ROUTE.FORGOT_PASSWORD }}>
                    Quên mật khẩu
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <ul class="top-menu list-inline mb-0 d-none d-lg-block" id="top-menu">
          <li class="list-inline-item">
            <a href="#" class="search_toggle" id="search-icon">
              <i class="tf-ion-android-search"></i>
            </a>
          </li>
          <li class="dropdown cart-nav dropdown-slide list-inline-item">
            <a
              href="#"
              class="dropdown-toggle cart-icon"
              data-toggle="dropdown"
              data-hover="dropdown"
            >
              <i class="tf-ion-android-cart"></i>
            </a>
            <div class="dropdown-menu cart-dropdown">
              <div class="media">
                <a href="/product-detail">
                  <img
                    class="media-object img- mr-3"
                    src="assets/images/cart-1.jpg"
                    alt="image"
                  />
                </a>
                <div class="media-body">
                  <h6>Ladies Bag</h6>
                  <div class="cart-price">
                    <span>1 x</span>
                    <span>1250.00</span>
                  </div>
                </div>
                <a href="#" class="remove">
                  <i class="tf-ion-close"></i>
                </a>
              </div>

              <div class="media">
                <a href="/product-detail">
                  <img
                    class="media-object img-fluid mr-3"
                    src="assets/images/cart-2.jpg"
                    alt="image"
                  />
                </a>
                <div class="media-body">
                  <h6>Skinny Jeans</h6>
                  <div class="cart-price">
                    <span>1 x</span>
                    <span>1250.00</span>
                  </div>
                </div>
                <a href="#" class="remove">
                  <i class="tf-ion-close"></i>
                </a>
              </div>
              <div class="cart-summary">
                <span class="h6">Total</span>
                <span class="total-price h6">$1799.00</span>
                <div class="text-center cart-buttons mt-3">
                  <a href="#" class="btn btn-small btn-transparent btn-block">
                    Xem giỏ hàng
                  </a>
                  <a href="#" class="btn btn-small btn-main btn-block">
                    Thanh toán
                  </a>
                </div>
              </div>
            </div>
          </li>
          <li class="dropdown account-nav dropdown-slide list-inline-item">
            <a
              href="#"
              class="dropdown-toggle acount-icon"
              data-toggle="dropdown"
              data-hover="dropdown"
            >
              <i class="tf-ion-ios-person mr-3"></i>
            </a>
            <ul class="dropdown-menu account-dropdown" aria-labelledby="navbarDropdown5">
              <li>
                <Link to={{ pathname: ROUTE.REGISTER }}>Đăng ký</Link>
              </li>
              <li>
                <Link to={{ pathname: ROUTE.LOGIN }}>Đăng nhập</Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
}
export default Header;
