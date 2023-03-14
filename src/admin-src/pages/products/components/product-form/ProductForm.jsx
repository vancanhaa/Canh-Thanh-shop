import { CloseCircleOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import "./product-form.scss";
function ProductForm({
  productInfoChange,
  handleChange,
  setIsValid,

  newDescription,
  setNewDescription,
  handleAddDescription,
  handleDeleteDescription,

  newImageUrl,
  setNewImageUrl,
  newColor,
  setNewColor,
  handleAddOptions,
  handleDeleteOptions,

  newSize,
  setNewSize,
  handleAddSize,
  handleDeleteSize,
}) {
  const [isProductNameValid, setIsProductNameValid] = useState(true);
  const [isProductPriceValid, setIsProductPriceValid] = useState(true);
  const [isProductCategoryValid, setIsProductCategoryValid] = useState(true);
  const [isProductImportTotalValid, setIsProductImportTotalValid] =
    useState(true);
  const [isProductDescriptionValid, setIsProductDescriptionValid] =
    useState(true);
  const [isProductOptionValid, setIsProductOptionValid] = useState(true);
  const [isProductSizeValid, setIsProductSizeValid] = useState(true);

  useEffect(() => {
    if (
      isProductNameValid &&
      isProductPriceValid &&
      isProductCategoryValid &&
      isProductImportTotalValid &&
      isProductDescriptionValid &&
      isProductOptionValid &&
      isProductSizeValid
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isProductNameValid,
    isProductPriceValid,
    isProductCategoryValid,
    isProductImportTotalValid,
    isProductDescriptionValid,
    isProductOptionValid,
    isProductSizeValid,
  ]);

  const handleOnInputChange = (value, type) => {
    handleChange(type, value);

    //Form Validate
    const inputValue = value;
    switch (type) {
      case "name":
        inputValue !== "" && inputValue !== " "
          ? setIsProductNameValid(true)
          : setIsProductNameValid(false);
        break;
      case "category":
        inputValue !== "" && inputValue !== " "
          ? setIsProductCategoryValid(true)
          : setIsProductCategoryValid(false);
        break;
      case "price":
        inputValue !== "" &&
        !isNaN(inputValue) &&
        /^\+?(0|[1-9]\d*)$/gm.test(inputValue)
          ? setIsProductPriceValid(true)
          : setIsProductPriceValid(false);
        break;
      case "import_total":
        inputValue !== "" &&
        !isNaN(inputValue) &&
        /^\+?(0|[1-9]\d*)$/gm.test(inputValue)
          ? setIsProductImportTotalValid(true)
          : setIsProductImportTotalValid(false);
        break;

      default:
        throw new Error("Invalid type");
    }
  };

  return (
    <div className="admin-product-form">
      <form action="" className="edit-form">
        <div className="form-group">
          <div className="input-wrap product-name">
            <label htmlFor="name">Tên sản phẩm</label>
            <div>
              <input
                type="text"
                id="name"
                className={isProductNameValid ? "" : "empty-input"}
                value={productInfoChange?.name}
                onChange={(e) => handleOnInputChange(e.target.value, "name")}
              />
              <p
                className={`error-message ${
                  isProductNameValid ? "" : "active"
                }`}
              >
                * Tên của sản phẩm là gì?
              </p>
            </div>
          </div>
        </div>

        <div className="form-group">
          <div className="input-wrap product-category">
            <label htmlFor="category">Loại sản phẩm</label>
            <div>
              <select
                id="category"
                defaultValue={""}
                value={productInfoChange?.category}
                className={isProductCategoryValid ? "" : "empty-input"}
                onChange={(e) => handleOnInputChange(e.target.value, "category")}
              >
                <option value="">-----</option>
                <option value="polo">Áo Polo</option>
                <option value="t-shirt">Áo thun</option>
                <option value="jacket">Áo khoác</option>
                <option value="jeans">Quần jeans</option>
              </select>
              <p
                className={`error-message ${
                  isProductCategoryValid ? "" : "active"
                }`}
              >
                * Loại sản phẩm?
              </p>
            </div>
          </div>
          <div className="input-wrap product-price">
            <label htmlFor="price">Giá (VNĐ)</label>
            <div>
              <input
                type="text"
                id="price"
                className={isProductPriceValid ? "" : "empty-input"}
                value={productInfoChange?.price}
                onChange={(e) => handleOnInputChange(e.target.value, "price")}
              />
              <p
                className={`error-message ${
                  isProductPriceValid ? "" : "active"
                }`}
              >
                * Giá của sản phẩm?
              </p>
            </div>
          </div>
          <div className="input-wrap product-import_total">
            <label htmlFor="import_total">Nhập kho</label>
            <div>
              <input
                type="text"
                id="import_total"
                className={isProductImportTotalValid ? "" : "empty-input"}
                value={productInfoChange?.import_total}
                onChange={(e) => handleOnInputChange(e.target.value, "import_total")}
              />
              <p
                className={`error-message ${
                  isProductImportTotalValid ? "" : "active"
                }`}
              >
                * Số lượng nhập kho?
              </p>
            </div>
          </div>
        </div>
      </form>

      <div className="description-form">
        <p className="description__title">Chi tiết sản phẩm</p>
        <div className="description__list">
          <ul>
            {productInfoChange?.description?.map((des, index) => (
              <li key={v4()}>
                {des}
                <span
                  className="delete-icon"
                  onClick={() => {
                    handleDeleteDescription(index);
                  }}
                >
                  <CloseCircleOutlined />
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="description__input">
          <div>
            <input
              type="text"
              id="description"
              className={isProductDescriptionValid ? "" : "empty-input"}
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
            <p
              className={`error-message  ${
                isProductDescriptionValid ? "" : "active"
              } `}
            >
              * Bạn phải thêm ít nhất 1 mô tả cho sản phẩm!
            </p>
          </div>
          <button
            onClick={handleAddDescription}
            disabled={newDescription === "" ? true : false}
          >
            Thêm
          </button>
        </div>
      </div>

      <div className="color_image-form">
        <p className="color_image__title">Màu sắc và hình ảnh</p>
        <div className="color_image__group">
          {productInfoChange?.options?.map((option, index) => (
            <div className="color_image__item" key={v4()}>
              <p>{option.color}</p>
              <img src={option.image_url} alt="" />
              <div className="delete-icon" 
              onClick={() => {handleDeleteOptions(index)}}
              >
                <CloseCircleOutlined />
              </div>
            </div>
          ))}
        </div>
        <div className="color_image__input">
          <div>
            <input
              type="text"
              placeholder="Nhập màu sắc cho sản phẩm"
              className={isProductOptionValid ? "" : "empty-input"}
              value={newColor}
              onChange={(e) => setNewColor(e.target.value)}
            />
            <input
              type="text"
              placeholder="Nhập URL hình ảnh cho màu sắc"
              className={isProductOptionValid ? "" : "empty-input"}
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
            />
            <p
              className={`error-message ${
                isProductOptionValid ? "" : "active"
              } `}
            >
              * Bạn phải thêm ít nhất 1 màu sắc và hình ảnh!
            </p>
          </div>
          <button
            onClick={handleAddOptions}
            disabled={newColor === "" || newImageUrl === "" ? true : false}
          >
            Thêm
          </button>
        </div>
      </div>

      <div className="size-form">
        <p className="size__title">Các lựa chọn về size</p>
        <div className="size__group">
          {productInfoChange?.size?.map((sz, index) => (
            <div className="size__item" key={v4()}>
              <p>{sz}</p>
              <div className="delete-icon" 
              onClick={() => {handleDeleteSize(index)}}
              >
                <CloseCircleOutlined />
              </div>
            </div>
          ))}
        </div>
        <div className="size__input">
          <div>
            <input
              type="text"
              className={isProductSizeValid ? "" : "empty-input"}
              placeholder="Nhập size cho sản phẩm"
              value={newSize}
              onChange={(e) => setNewSize(e.target.value)}
            />
            <p
              className={`error-message ${isProductSizeValid ? "" : "active"} `}
            >
              * Bạn phải thêm ít nhất 1 size cho sản phẩm
            </p>
          </div>
          <button
            onClick={handleAddSize}
            disabled={newSize === "" ? true : false}
          >
            Thêm
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductForm;
