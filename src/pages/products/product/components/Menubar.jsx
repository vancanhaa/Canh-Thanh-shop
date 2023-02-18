import { Menu } from "antd";
import { useDispatch } from "react-redux";
import { fetchAllProductList, fetchCategoryProductList } from "../../../../stores/actions/product.action";
import "./menubar.scss"

function Menubar() {
  const dispatch = useDispatch()
    function getItem(label, key, icon, children, type) {
        return {
          key,
          icon,
          children,
          label,
          type,
        };
      }
      const items = [
        getItem("Loại sản phẩm", "category", null, [
          getItem("Tất cả", "all"),
          getItem("Áo Polo", "polo"),
          getItem("Áo thun", "t-shirt"),
          getItem("Áo khoác", "jacket"),
          getItem("Quần jean", "jeans"),
        ]),
      ];
      const handleChangeCategory = (e) => {
        if(e.key === "all") {
          dispatch(fetchAllProductList({ page: 1, limit: 12 }))
        } else {
          dispatch(fetchCategoryProductList({page: 1, limit: 12, category: e.key}))
        }
      };
    return (
        <div className="menu-bar">
                <Menu
                  onClick={handleChangeCategory}
                  style={{
                    width: "100%",
                  }}
                  mode="inline"
                  items={items}
                  defaultSelectedKeys={['all']}
                />
              </div>
    )
}

export default Menubar