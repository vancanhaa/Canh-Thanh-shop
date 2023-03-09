import { Col, notification, Row } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { settingsProductsLg, settingsProductsMd, settingsProductsSm } from "../../constants/home.const";
import MainLayout from "../../layouts/main-layout/MainLayout";
import { fetchAllProducts } from "../../stores/actions/product.action";
import "./home.scss";
import ProductItem from "../../components/product-item/ProductItem";
import { ROUTE } from "../../constants";
import ModalAddCart from "../../components/modal-add-cart/ModalAddCart";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.user.userInfoState.data);
  const allProducts = useSelector((state) => state.product.allProducts);
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  const listProductBestSeller = [...allProducts]
    .sort((a, b) => b.sold - a.sold)
    .splice(0, 12);
  const listProductNew = [...allProducts]
    .sort((a, b) => b.createdAt - a.createdAt)
    .splice(0, 12);

  const [openAddCartModal, setOpenAddCartModal] = useState(false);
  const [idProduct, setIdProduct] = useState(null);
  const handleOpenAddCartModal = (id) => {
    if (!userInfo) {
      notification.warning({
        message: "Bạn cần đăng nhập trước khi mua hàng!",
        style: { border: "3px solid #fcaf17" },
        duration: 2,
      });
      navigate(ROUTE.LOGIN);
      return;
    }
    setIdProduct(id);
    setOpenAddCartModal(true);
  };

  return (
    <MainLayout>
      <div className="home">
        <div className="home-container">
          <div className="slider">
            <img
              src="https://cdn.shopify.com/s/files/1/0685/2237/7522/files/Artwork_collection_Web_desktop.jpg?v=1672812634&width=2000"
              alt=""
            />
          </div>
          <div className="home-body">
            <div className="home-product">
              <div className="home-product__title">SẢN PHẨM BÁN CHẠY</div>
              <div className="home-product__list">
                <Row>
                  <Col lg={24} md={0} sm={0} xs={0}>
                    <Slider {...settingsProductsLg}>
                      {listProductBestSeller.map((item, index) => {
                        return (
                          <ProductItem
                            item={item}
                            handleOpenAddCartModal={handleOpenAddCartModal}
                          />
                        );
                      })}
                     
                    </Slider>
                  </Col>
                  <Col lg={0} md={24} sm={0} xs={0}>
                    <Slider {...settingsProductsMd}>
                      {listProductBestSeller.map((item, index) => {
                        return (
                          <ProductItem
                            item={item}
                            handleOpenAddCartModal={handleOpenAddCartModal}
                          />
                        );
                      })}
                     
                    </Slider>
                  </Col>
                  <Col lg={0} md={0} sm={24} xs={24}>
                    <Slider {...settingsProductsSm}>
                      {listProductBestSeller.map((item, index) => {
                        return (
                          <ProductItem
                            item={item}
                            handleOpenAddCartModal={handleOpenAddCartModal}
                          />
                        );
                      })}
                     
                    </Slider>
                  </Col>
                </Row>
              </div>

              <div className="home-product__title">HÀNG MỚI VỀ</div>
              <div className="home-product__list">
                <Row>
                  <Col lg={24} md={0} sm={0} xs={0}>
                    <Slider {...settingsProductsLg}>
                      {listProductNew.map((item, index) => {
                        return (
                          <ProductItem
                            item={item}
                            handleOpenAddCartModal={handleOpenAddCartModal}
                          />
                        );
                      })}
                     
                    </Slider>
                  </Col>
                  <Col lg={0} md={24} sm={0} xs={0}>
                    <Slider {...settingsProductsMd}>
                      {listProductNew.map((item, index) => {
                        return (
                          <ProductItem
                            item={item}
                            handleOpenAddCartModal={handleOpenAddCartModal}
                          />
                        );
                      })}
                     
                    </Slider>
                  </Col>
                  <Col lg={0} md={0} sm={24} xs={24}>
                    <Slider {...settingsProductsSm}>
                      {listProductNew.map((item, index) => {
                        return (
                          <ProductItem
                            item={item}
                            handleOpenAddCartModal={handleOpenAddCartModal}
                          />
                        );
                      })}
                     
                    </Slider>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
        {openAddCartModal && (
          <ModalAddCart
            openAddCartModal={openAddCartModal}
            setOpenAddCartModal={setOpenAddCartModal}
            itemAddCart={allProducts.find((item) => item.id === idProduct)}
          />
        )}
      </div>
    </MainLayout>
  );
}
export default Home;
