import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { API, BASE_URL } from "../../../../api";
import {
  fetchDeleteProductAdmin,
  fetchEditProductAdmin,
  fetchProductDetailAdmin,
} from "../../../../stores/actions/productsAdmin.action";
import ProductForm from "../product-form/ProductForm";
import "./edit-product.scss";
function EditProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { idProduct } = useParams();
  const productDetail = useSelector(
    (state) => state.productsAdmin.productDetail
  );
  useEffect(() => {
    dispatch(fetchProductDetailAdmin(idProduct));
  }, []);
  const [modal, contextHolder] = Modal.useModal();
  const initialProduct = {
    id: "",
    name: "",
    category: "",
    import_total: "",
    price: "",
    raiting: 5,
    stock: 0,
    sold: 0,
    description: [],
    options: [],
    size: [],
  };
  const [productInfoChange, setProductInfoChange] = useState({...initialProduct});
  useEffect(() => {
    setProductInfoChange({ ...productDetail });
  }, [productDetail]);
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
    newOptions.length !== 0 ? setIsProductOptionValid(true) : setIsProductOptionValid(false)
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
    newDescription.length !== 0 ? setIsProductDescriptionValid(true) : setIsProductDescriptionValid(false)
  };

  const handleAddSize = () => {
    handleChange("size", newSize);
    setNewSize("");
  };
  const handleDeleteSize = (index, setIsProductSizeValid) => {
    const newSize = [...productInfoChange.size];
    newSize.splice(index, 1);
    setProductInfoChange((state) => ({ ...state, size: newSize }));
    newSize.length !== 0 ? setIsProductSizeValid(true) : setIsProductSizeValid(false)
    setIsSaved(false)
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
      } else {
        setIsValid(false);
      }
    }
  }, [productInfoChange]);

  const handleSaveChange = () => {
    if (isValid) {
      if (window.confirm("Lưu thay đổi")) {
        dispatch(
          fetchEditProductAdmin({ id: idProduct, data: productInfoChange })
        );
        setIsSaved(true);
        navigate(-1)
      } 
    }else {
      alert("Không thể lưu thay đổi, vui lòng kiểm tra lại và điền đầy đủ vào tất cả các trường!");
    }
  };

  const handleReset = () => {
    API.get(`${BASE_URL}/api/products/${idProduct}`).then((res) =>
      setProductInfoChange(res.data)
    );
    setIsSaved(true);
  };

  const handleDeleteProduct = () => {
    dispatch(fetchDeleteProductAdmin(idProduct));
    navigate(-1);
  };

  window.onload = () => {
    setIsSaved(true);
  };

  const confirm = () => {
    modal.confirm({
      className: "confirm-delete-item",
      title:
        "Quản trị viên có chắc chắn muốn xoá sản phẩm này khỏi danh sách sản phẩm?",
      icon: <ExclamationCircleOutlined />,
      content: `${productDetail?.name}`,
      okText: "Đồng ý",
      cancelText: "Không",
      onOk: () => handleDeleteProduct(),
    });
  };

  return (
    <div className="edit-product">
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
      <div className="edit-product__btn-wrap">
        <button className="edit-product__btn btn--save" disabled={isSaved} onClick={handleSaveChange}>
          Lưu
        </button>
        <button className="edit-product__btn btn--reset" disabled={isSaved} onClick={handleReset}>
          Đặt lại
        </button>
        <button className="edit-product__btn btn--delete" onClick={() => confirm()}>Xóa</button>
      </div>
      {contextHolder}
    </div>
  );
}

export default EditProduct;
