/* eslint-disable react-hooks/exhaustive-deps */
import { Menu } from "antd";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import "./menubar.scss";
import { fetchProductList } from "../../../../../stores/actions/product.action";
import { SHOP_BY_PRICE } from "../../../../../constants";

function Menubar() {
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.product);
  let { textSearch, filter } = productState;
  const category =
    filter?.category && filter?.category !== "" ? filter?.category : "";
  const priceRange =
    SHOP_BY_PRICE.find(
      (item) =>
        item.price_gte === filter?.price_gte &&
        item.price_lte === filter?.price_lte
    )?.priceRange || "0";

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const categories = [
    getItem("Loại sản phẩm", "category", null, [
      getItem("Tất cả", ""),
      getItem("Áo Polo", "polo"),
      getItem("Áo thun", "t-shirt"),
      getItem("Áo khoác", "jacket"),
      getItem("Quần jean", "jeans"),
    ]),
  ];
  const priceArr = [
    getItem(
      "Khoảng giá (VNĐ)",
      "price",
      null,
      SHOP_BY_PRICE.map((item) => getItem(item.title, String(item.priceRange)))
    ),
  ];
  const handleChangeCategory = (e) => {
    dispatch(
      fetchProductList({
        page: 1,
        limit: 12,
        filter: { ...filter, category: e.key },
        textSearch,
      })
    );
  };

  const handleChangePrice = (e) => {
    const priceRangeObj = SHOP_BY_PRICE.find(
      (item) => item.priceRange === Number(e.key)
    );
    const filterPriceRange = {
      price_gte: priceRangeObj.price_gte,
      price_lte: priceRangeObj.price_lte,
    };
    dispatch(
      fetchProductList({
        page: 1,
        limit: 12,
        textSearch,
        filter: { ...filter, ...filterPriceRange },
      })
    );
  };
  return (
    <div className="menu-bar">
      <Menu
        onClick={handleChangeCategory}
        style={{
          width: "100%",
        }}
        mode="inline"
        items={categories}
        defaultSelectedKeys={[""]}
        selectedKeys={[category]}
      />
      <Menu
        onClick={handleChangePrice}
        style={{
          width: "100%",
        }}
        mode="inline"
        items={priceArr}
        defaultSelectedKeys={["0"]}
        selectedKeys={[String(priceRange)]}
      />
    </div>
  );
}

export default Menubar;
