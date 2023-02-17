import { Menu } from "antd";
import "./menubar.scss"

function Menubar() {
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
          getItem("Áo Polo", "Áo Polo"),
          getItem("Áo thun", "Áo thun"),
          getItem("Áo khoác", "Áo khoác"),
          getItem("Quần jean", "Quần jean"),
        ]),
      ];
      const onClick = (e) => {
        console.log("click", e);
      };
    return (
        <div className="menu-bar">
                <Menu
                  onClick={onClick}
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