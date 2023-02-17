import React from "react";
import MainLayout from "../../../layouts/main-layout/MainLayout";
import "./product.scss";
import { Col, Pagination, Row } from "antd";
import Menubar from "./components/Menubar";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Áo Polo Nam Pique Mắt Chim Basic Co Giãn Thoáng Khí",
    description: "",
    price: 120000,
    discountPercentage: 12.96,
    rating: 4.69,
    sold: "112K",
    stock: 94,
    brand: "Yody",
    category: "12345",
    thumbnail:
      "https://bizweb.dktcdn.net/thumb/large/100/438/408/products/apm3299-xxm-7.jpg?v=1673602563000",
    images: [
      "https://bizweb.dktcdn.net/100/438/408/products/apm3299-xxm-9.jpg?v=1673602563443",
      "...",
      "...",
    ],
  },
  {
    id: 2,
    name: "Áo Polo Nam Airymax Thêu Panda",
    description: "",
    price: 120000,
    discountPercentage: 12.96,
    rating: 4.69,
    sold: "112K",
    stock: 94,
    brand: "Yody",
    category: "12345",
    thumbnail:
      "https://bizweb.dktcdn.net/thumb/large/100/438/408/products/apm3299-xxm-7.jpg?v=1673602563000",
    images: [
      "https://bizweb.dktcdn.net/100/438/408/products/apm3299-xxm-9.jpg?v=1673602563443",
      "...",
      "...",
    ],
  },
  {
    id: 3,
    name: "Áo Polo Nam Airymax Thêu Panda",
    description: "",
    price: 120000,
    discountPercentage: 12.96,
    rating: 4.69,
    sold: "112K",
    stock: 94,
    brand: "Yody",
    category: "12345",
    thumbnail:
      "https://bizweb.dktcdn.net/thumb/large/100/438/408/products/apm3299-xxm-7.jpg?v=1673602563000",
    images: [
      "https://bizweb.dktcdn.net/100/438/408/products/apm3299-xxm-9.jpg?v=1673602563443",
      "...",
      "...",
    ],
  },
  {
    id: 4,
    name: "Áo Polo Nam Airymax Thêu Panda",
    description: "",
    price: 120000,
    discountPercentage: 12.96,
    rating: 4.69,
    sold: "112K",
    stock: 94,
    brand: "Yody",
    category: "12345",
    thumbnail:
      "https://bizweb.dktcdn.net/thumb/large/100/438/408/products/apm3299-xxm-7.jpg?v=1673602563000",
    images: [
      "https://bizweb.dktcdn.net/100/438/408/products/apm3299-xxm-9.jpg?v=1673602563443",
      "...",
      "...",
    ],
  },
  {
    id: 5,
    name: "Áo Polo Nam Airymax Thêu Panda",
    description: "",
    price: 120000,
    discountPercentage: 12.96,
    rating: 4.69,
    sold: "112K",
    stock: 94,
    brand: "Yody",
    category: "12345",
    thumbnail:
      "https://bizweb.dktcdn.net/thumb/large/100/438/408/products/apm3299-xxm-7.jpg?v=1673602563000",
    images: [
      "https://bizweb.dktcdn.net/100/438/408/products/apm3299-xxm-9.jpg?v=1673602563443",
      "...",
      "...",
    ],
  },
  {
    id: 6,
    name: "Áo Polo Nam Airymax Thêu Panda",
    description: "",
    price: 120000,
    discountPercentage: 12.96,
    rating: 4.69,
    sold: "112K",
    stock: 94,
    brand: "Yody",
    category: "12345",
    thumbnail:
      "https://bizweb.dktcdn.net/thumb/large/100/438/408/products/apm3299-xxm-7.jpg?v=1673602563000",
    images: [
      "https://bizweb.dktcdn.net/100/438/408/products/apm3299-xxm-9.jpg?v=1673602563443",
      "...",
      "...",
    ],
  },
  {
    id: 7,
    name: "Áo Polo Nam Airymax Thêu Panda",
    description: "",
    price: 120000,
    discountPercentage: 12.96,
    rating: 4.69,
    sold: "112K",
    stock: 94,
    brand: "Yody",
    category: "12345",
    thumbnail:
      "https://bizweb.dktcdn.net/thumb/large/100/438/408/products/apm3299-xxm-7.jpg?v=1673602563000",
    images: [
      "https://bizweb.dktcdn.net/100/438/408/products/apm3299-xxm-9.jpg?v=1673602563443",
      "...",
      "...",
    ],
  },
  {
    id: 8,
    name: "Áo Polo Nam Airymax Thêu Panda",
    description: "",
    price: 120000,
    discountPercentage: 12.96,
    rating: 4.69,
    sold: "112K",
    stock: 94,
    brand: "Yody",
    category: "12345",
    thumbnail:
      "https://bizweb.dktcdn.net/thumb/large/100/438/408/products/apm3299-xxm-7.jpg?v=1673602563000",
    images: [
      "https://bizweb.dktcdn.net/100/438/408/products/apm3299-xxm-9.jpg?v=1673602563443",
      "...",
      "...",
    ],
  },
  {
    id: 9,
    name: "Áo Polo Nam Airymax Thêu Panda",
    description: "",
    price: 120000,
    discountPercentage: 12.96,
    rating: 4.69,
    sold: "112K",
    stock: 94,
    brand: "Yody",
    category: "12345",
    thumbnail:
      "https://bizweb.dktcdn.net/thumb/large/100/438/408/products/apm3299-xxm-7.jpg?v=1673602563000",
    images: [
      "https://bizweb.dktcdn.net/100/438/408/products/apm3299-xxm-9.jpg?v=1673602563443",
      "...",
      "...",
    ],
  },
  {
    id: 10,
    name: "Áo Polo Nam Airymax Thêu Panda",
    description: "",
    price: 120000,
    discountPercentage: 12.96,
    rating: 4.69,
    sold: "112K",
    stock: 94,
    brand: "Yody",
    category: "12345",
    thumbnail:
      "https://bizweb.dktcdn.net/thumb/large/100/438/408/products/apm3299-xxm-7.jpg?v=1673602563000",
    images: [
      "https://bizweb.dktcdn.net/100/438/408/products/apm3299-xxm-9.jpg?v=1673602563443",
      "...",
      "...",
    ],
  },
  {
    id: 11,
    name: "Áo Polo Nam Airymax Thêu Panda",
    description: "",
    price: 120000,
    discountPercentage: 12.96,
    rating: 4.69,
    sold: "112K",
    stock: 94,
    brand: "Yody",
    category: "12345",
    thumbnail:
      "https://bizweb.dktcdn.net/thumb/large/100/438/408/products/apm3299-xxm-7.jpg?v=1673602563000",
    images: [
      "https://bizweb.dktcdn.net/100/438/408/products/apm3299-xxm-9.jpg?v=1673602563443",
      "...",
      "...",
    ],
  },
  {
    id: 12,
    name: "Áo Polo Nam Airymax Thêu Panda",
    description: "",
    price: 120000,
    discountPercentage: 12.96,
    rating: 4.69,
    sold: "112K",
    stock: 94,
    brand: "Yody",
    category: "12345",
    thumbnail:
      "https://bizweb.dktcdn.net/thumb/large/100/438/408/products/apm3299-xxm-7.jpg?v=1673602563000",
    images: [
      "https://bizweb.dktcdn.net/100/438/408/products/apm3299-xxm-9.jpg?v=1673602563443",
      "...",
      "...",
    ],
  },
  {
    id: 13,
    name: "Áo Polo Nam Airymax Thêu Panda",
    description: "",
    price: 120000,
    discountPercentage: 12.96,
    rating: 4.69,
    sold: "112K",
    stock: 94,
    brand: "Yody",
    category: "12345",
    thumbnail:
      "https://bizweb.dktcdn.net/thumb/large/100/438/408/products/apm3299-xxm-7.jpg?v=1673602563000",
    images: [
      "https://bizweb.dktcdn.net/100/438/408/products/apm3299-xxm-9.jpg?v=1673602563443",
      "...",
      "...",
    ],
  },
  {
    id: 14,
    name: "Áo Polo Nam Airymax Thêu Panda",
    description: "",
    price: 120000,
    discountPercentage: 12.96,
    rating: 4.69,
    sold: "112K",
    stock: 94,
    brand: "Yody",
    category: "12345",
    thumbnail:
      "https://bizweb.dktcdn.net/thumb/large/100/438/408/products/apm3299-xxm-7.jpg?v=1673602563000",
    images: [
      "https://bizweb.dktcdn.net/100/438/408/products/apm3299-xxm-9.jpg?v=1673602563443",
      "...",
      "...",
    ],
  },
  {
    id: 15,
    name: "Áo Polo Nam Airymax Thêu Panda",
    description: "",
    price: 120000,
    discountPercentage: 12.96,
    rating: 4.69,
    sold: "112K",
    stock: 94,
    brand: "Yody",
    category: "12345",
    thumbnail:
      "https://bizweb.dktcdn.net/thumb/large/100/438/408/products/apm3299-xxm-7.jpg?v=1673602563000",
    images: [
      "https://bizweb.dktcdn.net/100/438/408/products/apm3299-xxm-9.jpg?v=1673602563443",
      "...",
      "...",
    ],
  },
  {
    id: 16,
    name: "Áo Polo Nam Airymax Thêu Panda",
    description: "",
    price: 120000,
    discountPercentage: 12.96,
    rating: 4.69,
    sold: "112K",
    stock: 94,
    brand: "Yody",
    category: "12345",
    thumbnail:
      "https://bizweb.dktcdn.net/thumb/large/100/438/408/products/apm3299-xxm-7.jpg?v=1673602563000",
    images: [
      "https://bizweb.dktcdn.net/100/438/408/products/apm3299-xxm-9.jpg?v=1673602563443",
      "...",
      "...",
    ],
  },
  // {
  //   "id": 17,
  //   "name": "Áo Polo Nam Airymax Thêu Panda",
  //   "description": "",
  //   "price": 120000,
  //   "discountPercentage": 12.96,
  //   "rating": 4.69,
  //   "stock": 94,
  //   "brand": "Yody",
  //   "category": "12345",
  //   "thumbnail": "https://bizweb.dktcdn.net/thumb/large/100/438/408/products/apm3299-xxm-7.jpg?v=1673602563000",
  //   "images": [
  //     "...",
  //     "...",
  //     "..."
  //   ]
  // },{
  //   "id": 18,
  //   "name": "Áo Polo Nam Airymax Thêu Panda",
  //   "description": "",
  //   "price": 120000,
  //   "discountPercentage": 12.96,
  //   "rating": 4.69,
  //   "stock": 94,
  //   "brand": "Yody",
  //   "category": "12345",
  //   "thumbnail": "https://bizweb.dktcdn.net/thumb/large/100/438/408/products/apm3299-xxm-7.jpg?v=1673602563000",
  //   "images": [
  //     "...",
  //     "...",
  //     "..."
  //   ]
  // },
];

function Product() {
  return (
    <MainLayout>
      <div className="product">
        <div className="product-container">
          <Row justify="space-between" gutter={[16, 0]}>
            <Col lg={4} md={6}>
              <Menubar />
            </Col>
            <Col lg={20} md={18}>
              <div className="product-filter"></div>
              <div className="product-list">
                <Row justify="space-between" gutter={[16, 16]}>
                  {products.map((item, index) => (
                    <Col key={item.id} lg={6} md={8} sm={12} xs={12}>
                      <div data-id={item.id} className="product-item">
                        <Link to={`/product-detail/${item.id}`}>
                          <div className="product-item__raiting-sold">
                            <div className="product-item__raiting">
                              <img
                                width="10"
                                height="10"
                                src="https://bizweb.dktcdn.net/100/438/408/themes/894085/assets/icon_start.svg?1676625752773"
                                alt=""
                              />
                              <span>{item.rating}</span>
                            </div>
                            <div className="product-item__sold">
                              <div className="y-line"></div>
                              Đã bán
                              <span className="product-item__sold-number">
                                {item.sold}
                              </span>
                            </div>
                          </div>
                          <div className="product-item__images">
                            <img
                              className="product-thumbnail"
                              src={item.thumbnail}
                              alt=""
                            />
                            <img
                              className="product-thumbnail--hover"
                              src={item.images[0]}
                              alt=""
                            />
                          </div>

                          <div className="product-item__info">
                            <h3 className="product-item__name">{item.name}</h3>
                            <div className="product-item__prices">
                              <ins>{item.price}đ</ins>
                              <del>{item.price}đ</del>
                              <span>-{item.discountPercentage}%</span>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </Col>
                  ))}
                </Row>
                <Row justify="center" className="product-list__pagination">
                  <Pagination defaultCurrent={1} total={50} />
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </MainLayout>
  );
}

export default Product;
