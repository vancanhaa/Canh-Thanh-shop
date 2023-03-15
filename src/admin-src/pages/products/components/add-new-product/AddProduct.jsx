import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { v4 } from "uuid";
import { fetchAddProductAdmin } from "../../../../stores/actions/productsAdmin.action";
import ProductForm from "../product-form/ProductForm";
import "./add-product.scss";
function AddProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialProduct = {
    id: "",
    name: "",
    category: "",
    import_total: "",
    price: "",
    rating: 5,
    stock: 0,
    sold: 0,
    thumbnail: "",
    description: [],
    options: [],
    size: [],
  };

  const [modal, contextHolder] = Modal.useModal();

  const [productInfoChange, setProductInfoChange] = useState({
    ...initialProduct,
  });

  const [isSaved, setIsSaved] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newColor, setNewColor] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newSize, setNewSize] = useState("");
  const handleChange = (type, value) => {
    setIsSaved(false);
    switch (type) {
      case "name":
        setProductInfoChange({ ...productInfoChange, name: value });
        break;
      case "category":
        setProductInfoChange({ ...productInfoChange, category: value });
        break;
      case "price":
        setProductInfoChange({ ...productInfoChange, price: value });
        break;
      case "import_total":
        setProductInfoChange({ ...productInfoChange, import_total: value });
        break;
      case "options":
        setProductInfoChange({
          ...productInfoChange,
          options: [...productInfoChange.options, value],
        });
        break;
      case "description":
        setProductInfoChange({
          ...productInfoChange,
          description: [...productInfoChange.description, value],
        });
        break;
      case "size":
        setProductInfoChange({
          ...productInfoChange,
          size: [...productInfoChange.size, value],
        });
        break;
      default:
        throw new Error("Invalid type!");
    }
  };

  const handleAddOptions = () => {
    handleChange("options", { color: newColor, image_url: newImageUrl });
    setNewColor("");
    setNewImageUrl("");
  };
  const handleDeleteOptions = (index, setIsProductOptionValid) => {
    const newOptions = [...productInfoChange.options];
    newOptions.splice(index, 1);
    setProductInfoChange((state) => ({ ...state, options: newOptions }));
    setIsSaved(false);
    newOptions.length !== 0
      ? setIsProductOptionValid(true)
      : setIsProductOptionValid(false);
  };

  const handleAddDescription = () => {
    handleChange("description", newDescription);
    setNewDescription("");
  };
  const handleDeleteDescription = (index, setIsProductDescriptionValid) => {
    const newDescription = [...productInfoChange.description];
    newDescription.splice(index, 1);
    setProductInfoChange((state) => ({
      ...state,
      description: newDescription,
    }));
    setIsSaved(false);
    newDescription.length !== 0
      ? setIsProductDescriptionValid(true)
      : setIsProductDescriptionValid(false);
  };

  const handleAddSize = () => {
    handleChange("size", newSize);
    setNewSize("");
  };
  const handleDeleteSize = (index, setIsProductSizeValid) => {
    const newSize = [...productInfoChange.size];
    newSize.splice(index, 1);
    setProductInfoChange((state) => ({ ...state, size: newSize }));
    newSize.length !== 0
      ? setIsProductSizeValid(true)
      : setIsProductSizeValid(false);
    setIsSaved(false);
  };

  //Validate
  useEffect(() => {
    if (productInfoChange) {
      if (
        productInfoChange.name !== "" &&
        productInfoChange.price !== "" &&
        productInfoChange.category !== "" &&
        productInfoChange.import_total !== "" &&
        productInfoChange.description?.length !== 0 &&
        productInfoChange.options?.length !== 0 &&
        productInfoChange.size?.length !== 0
      ) {
        setIsValid(true);
        setIsSaved(false)
      } else {
        setIsValid(false);
        setIsSaved(true)
      }
    }
  }, [productInfoChange]);

  const handleSaveChange = () => {
    if (isValid) {
      if (window.confirm("Lưu sản phẩm vào danh sách sản phẩm")) {
        const payload = {
          ...productInfoChange,
          id: v4().slice(7).toLocaleUpperCase(),
          thumbnail: productInfoChange.options[0].image_url,
        };
        dispatch(fetchAddProductAdmin(payload));
        setIsSaved(true);
        navigate(-1);
      }
    } else {
      alert(
        "Không thể lưu sản phẩm, vui lòng kiểm tra lại và điền đầy đủ vào tất cả các trường!"
      );
    }
  };

  const handleReset = () => {
    setProductInfoChange({ ...initialProduct });
    setIsSaved(true);
  };



  window.onload = () => {
    setIsSaved(true);
  };

  const confirm = () => {
    modal.confirm({
      className: "confirm-delete-item",
      title:
        "Quản trị viên có chắc chắn muốn hủy biểu mẫu thêm sản phẩm này không?",
      icon: <ExclamationCircleOutlined />,
      content: `${productInfoChange.name}`,
      okText: "Đồng ý",
      cancelText: "Không",
      onOk: () => {navigate(-1)},
    });
  };

  return (
    <div className="add-product">
      <ProductForm
        productInfoChange={productInfoChange}
        handleChange={handleChange}
        setIsValid={setIsValid}
        newDescription={newDescription}
        setNewDescription={setNewDescription}
        handleAddDescription={handleAddDescription}
        handleDeleteDescription={handleDeleteDescription}
        newImageUrl={newImageUrl}
        setNewImageUrl={setNewImageUrl}
        newColor={newColor}
        setNewColor={setNewColor}
        handleAddOptions={handleAddOptions}
        handleDeleteOptions={handleDeleteOptions}
        newSize={newSize}
        setNewSize={setNewSize}
        handleAddSize={handleAddSize}
        handleDeleteSize={handleDeleteSize}
      />
      <div className="add-product__btn-wrap">
        <button
          className="add-product__btn btn--save"
          disabled={isSaved}
          onClick={handleSaveChange}
        >
          Lưu
        </button>
        <button
          className="add-product__btn btn--reset"
          disabled={isSaved}
          onClick={handleReset}
        >
          Đặt lại
        </button>
        <button className="add-product__btn btn--delete" onClick={confirm}>
          Xóa
        </button>
      </div>
      {contextHolder}
    </div>
  );
}

export default AddProduct;
