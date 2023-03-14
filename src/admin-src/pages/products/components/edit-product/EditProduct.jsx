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
  const [productInfoChange, setProductInfoChange] = useState();
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
  const handleDeleteOptions = (index) => {
    const newOptions = [...productInfoChange.options];
    newOptions.splice(index, 1);
    setProductInfoChange((state) => ({ ...state, options: newOptions }));
    setIsSaved(false);
  };

  const handleAddDescription = () => {
    handleChange("description", newDescription);
    setNewDescription("");
  };
  const handleDeleteDescription = (index) => {
    const newDescription = [...productInfoChange.description];
    newDescription.splice(index, 1);
    setProductInfoChange((state) => ({
      ...state,
      description: newDescription,
    }));
    setIsSaved(false);
  };

  const handleAddSize = () => {
    handleChange("size", newSize);
    setNewSize("");
  };
  const handleDeleteSize = (index) => {
    const newSize = [...productInfoChange.size];
    newSize.splice(index, 1);
    setProductInfoChange((state) => ({ ...state, size: newSize }));
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
      } else {
        alert("Không thể lưu thay đổi");
      }
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
        <button className="edit-product__btn btn--delete" onClick={handleDeleteProduct}>Xóa</button>
      </div>
    </div>
  );
}

export default EditProduct;
