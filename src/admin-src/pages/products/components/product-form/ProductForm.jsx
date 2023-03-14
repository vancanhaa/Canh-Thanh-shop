import { CloseCircleOutlined } from "@ant-design/icons";
import React from "react";
import "./product-form.scss";
function ProductForm() {



  return (
    <div className="admin-product-form">
      <form action="" className="edit-form">
        <div className="form-group">
          <div className="input-wrap product-name">
            <label htmlFor="name">Tên sản phẩm</label>
            <div>
              <input type="text" id="name" />
              <p className={`error-message`}>* Tên của sản phẩm là gì?</p>
            </div>
          </div>
        </div>

        <div className="form-group">
          <div className="input-wrap product-type">
            <label htmlFor="type">Loại sản phẩm</label>
            <div>
              <select id="type">
                <option value="">-----</option>
                <option value="polo">Áo Polo</option>
                <option value="t-shirt">Áo thun</option>
                <option value="jacket">Áo khoác</option>
                <option value="jeans">Quần jeans</option>
              </select>
              <p className={`error-message`}>* Loại sản phẩm?</p>
            </div>
          </div>
          <div className="input-wrap product-price">
            <label htmlFor="price">Giá (VNĐ)</label>
            <div>
              <input type="text" id="price" />
              <p className={`error-message`}>* Giá của sản phẩm?</p>
            </div>
          </div>
          <div className="input-wrap product-import_total">
            <label htmlFor="import_total">Nhập kho</label>
            <div>
              <input type="text" id="import_total" />
              <p className={`error-message`}>* Số lượng nhập kho?</p>
            </div>
          </div>
        </div>
      </form>

      <div className="description-form">
        <p className="description__title">Chi tiết sản phẩm</p>
        <div className="description__list">
          <ul>
            <li>Chất liệu pique modal bao gồm 24% Cotton, 22% Modal, 51% Polyester, 3% Spandex <span className="delete-icon"><CloseCircleOutlined /></span></li>
            <li>Chất liệu pique modal bao gồm 24% Cotton, 22% Modal, 51% Polyester, 3% Spandex</li>
            <li>Chất liệu pique modal bao gồm 24% Cotton, 22% Modal, 51% Polyester, 3% Spandex</li>


          </ul>
        </div>
        <div className="description__input">
          <div>
            <input type="text" id="description" />
            <p className={`error-message`}>* Bạn phải thêm ít nhất 1 mô tả cho sản phẩm!</p>
          </div>
          <button>Thêm</button>
        </div>
      </div>

      <div className="color_image-form">
        <p className="color_image__title">Màu sắc và hình ảnh</p>
        <div className="color_image__group">
          <div className="color_image__item">
            <p>Hồng</p>
            <img src="https://bizweb.dktcdn.net/100/438/408/products/apm5393-xng-5.jpg?v=1662358179350" alt="" />
            <div className="delete-icon">
                <CloseCircleOutlined />
            </div>
          </div>
          <div className="color_image__item">
            <p>Xanh duong ddf ddd</p>
            <img src="https://bizweb.dktcdn.net/100/438/408/products/apm5393-xng-5.jpg?v=1662358179350" alt="" />
          </div>
        </div>
        <div className="color_image__input">
          <div>
            <input type="text" placeholder="Nhập màu sắc cho sản phẩm" />
            <input type="text" placeholder="Nhập URL hình ảnh cho màu sắc" />
            <p className={`error-message`}>* Bạn phải thêm ít nhất 1 màu sắc và hình ảnh!</p>
          </div>
          <button>Thêm</button>
        </div>
      </div>

      <div className="size-form">
        <p className="size__title">Các lựa chọn về size</p>
        <div className="size__group">
          <div className="size__item"><p>S</p>
          <div className="delete-icon">
                <CloseCircleOutlined />
            </div>
          </div>
          <div className="size__item">S</div>
        </div>
        <div className="size__input">
          <div>
            <input type="text" placeholder="Nhập size cho sản phẩm" />
            <p className={`error-message`}>* Bạn phải thêm ít nhất 1 size cho sản phẩm</p>
          </div>
          <button>Thêm</button>
        </div>
      </div>
    </div>
  );
}

export default ProductForm;
