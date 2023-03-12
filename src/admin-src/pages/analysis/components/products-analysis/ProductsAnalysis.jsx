import React from "react";
import { GiClothes } from "react-icons/gi";
import { useSelector } from "react-redux";
import { Loading } from "../loading/Loading";

function ProductsAnalysis() {
  const productsAdminState = useSelector((state) => state.productsAdmin);
  const { allProducts, fetchingProductsAdmin } = productsAdminState;
  const categories = []
  allProducts.forEach((product, index) => {
    categories.every((category, index) => category !== product.category) && categories.push(product.category)
  })

  return (
    <div className="analysis__products analysis__item">
      <div className="analysis__title">
        <p>Sản phẩm</p>
        <div className="icon">
          <GiClothes />
        </div>
      </div>
      {fetchingProductsAdmin ? (
        <Loading />
      ) : (
        <div className="analysis__content">
          <p>
            <span>Loại: </span>
            {categories.length}
          </p>
          <p>
            <span>Sản phẩm: </span>
            {allProducts.length}
          </p>
        </div>
      )}
    </div>
  );
}

export default ProductsAnalysis;
