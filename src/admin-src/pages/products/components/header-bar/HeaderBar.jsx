import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./header-bar.scss";
import { Input, Menu } from "antd";
import { fetchProductsListAdmin } from "../../../../stores/actions/productsAdmin.action";
import { changeTextSearch } from "../../../../stores/slice/productsAdmin.slice";
import { SHOP_BY_CATEGORY, SHOP_BY_PRICE } from "../../../../../constants";
import { getItem } from "../../../../../utils/menu";

function HeaderBar() {
    const productsAdminState = useSelector((state) => state.productsAdmin);
    const { listProducts, filter, textSearch } = productsAdminState;
    const { Search } = Input;
    const searchRef = useRef();
    const [valueSearch, setValueSearch] = useState("");
    const dispatch = useDispatch();
    const handleSearch = (value) => {
      let textSearch = value.trim();
      if (textSearch) {
        dispatch(fetchProductsListAdmin({ page: 1, limit: 9, textSearch }));
        dispatch(changeTextSearch(textSearch));
      }
      setValueSearch("");
      searchRef.current.blur();
    };
    const category =
      filter?.category && filter?.category !== "" ? filter?.category : "";
    const priceRange =
      SHOP_BY_PRICE.find(
        (item) =>
          item.price_gte === filter?.price_gte &&
          item.price_lte === filter?.price_lte
      )?.priceRange || "0";
    console.log(listProducts);
    const categories = [
      getItem(
        "Loại sản phẩm",
        "category",
        null,
        SHOP_BY_CATEGORY.map((item) => getItem(item.title, item.value))
      ),
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
        fetchProductsListAdmin({
          page: 1,
          limit: 9,
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
        fetchProductsListAdmin({
          page: 1,
          limit: 9,
          textSearch,
          filter: { ...filter, ...filterPriceRange },
        })
      );
    };
  return (
    <div className="header-bar">
            <div className="header-bar__left">
              <div className="header-bar__category">
                <Menu
                  onClick={handleChangeCategory}
                  style={{
                    width: "100%",
                  }}
                  mode="horizontal"
                  items={categories}
                  defaultSelectedKeys={[""]}
                  selectedKeys={[category]}
                />
              </div>
              <div className="header-bar__price">
                <Menu
                  onClick={handleChangePrice}
                  style={{
                    width: "100%",
                  }}
                  mode="horizontal"
                  items={priceArr}
                  defaultSelectedKeys={["0"]}
                  selectedKeys={[String(priceRange)]}
                />
              </div>
            </div>
            <div className="header-bar__right">
              <div className="header-bar__search">
                <Search
                  ref={searchRef}
                  placeholder="Tìm kiếm"
                  onSearch={handleSearch}
                  enterButton
                  value={valueSearch}
                  onChange={(e) => setValueSearch(e.target.value)}
                />
              </div>
              <div className="header-bar__add-product">
                <button>Thêm sản phẩm</button>
              </div>
            </div>
          </div>
  )
}

export default HeaderBar