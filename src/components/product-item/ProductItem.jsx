import common from "../../utils/common";
import "./product-item.scss"
import { Link } from "react-router-dom";

function ProductItem({ item, index, handleOpenAddCartModal }) {
  return (
    <div data-id={item.id} className="product-item">
      <div className="product-item__raiting-sold">
        <div className="product-item__raiting">
          <img
            width="10"
            height="10"
            src="https://bizweb.dktcdn.net/100/438/408/themes/894085/assets/icon_start.svg?1676625752773"
            alt=""
          />
          <span>{item.rating}</span>
        </div>
        <div className="product-item__sold">
          <div className="y-line"></div>
          Đã bán
          <span className="product-item__sold-number">{item.sold}</span>
        </div>
      </div>
      <div className="product-item__images">
        <Link to={`/product-detail/${item.id}`}>
          <img className="product-thumbnail" src={item.thumbnail} alt="" />
        </Link>
        <button
          className="btn-add-cart"
          onClick={() => handleOpenAddCartModal(index)}
        >
          Thêm vào giỏ hàng
        </button>
      </div>

      <div className="product-item__info">
        <h3 className="product-item__name">
          <Link to={`/product-detail/${item.id}`}>{item.name}</Link>
        </h3>

        <div className="product-item__prices">
          <ins>{common.formatPrice(item.price)}đ</ins>
          <del>{common.formatPrice(item.price)}đ</del>
          <span>-{item.discountPercentage}%</span>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
