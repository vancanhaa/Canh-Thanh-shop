import { useDispatch, useSelector } from "react-redux";
import "./products-list.scss";
import { Row, Col, Carousel } from "antd";
import { v4 } from "uuid";
import common from "../../../../../utils/common";
import "antd/dist/antd";

function ProductsList() {
  const productsAdminState = useSelector((state) => state.productsAdmin);
  const { listProducts } = productsAdminState;

  return (
    <div className="products-body__content">
      {listProducts.map((item, index) => {
        const {
          name,
          price,
          category,
          import_total,
          sold,
          stock,
          description,
          options,
          size,
        } = item;
        const colors = options.map((colorItem) => {
          return colorItem.color;
        });
        const imagesUrl = options.map((urlItem) => urlItem.image_url);
        console.log(imagesUrl);
        return (
          <div className="products-item" key={v4()}>
            <Row justify="space-between" align="middle" gutter={[16, 16]}>
              <Col span={1} className="center-text">
                {index}
              </Col>
              <Col span={2}>{name}</Col>
              <Col span={2} className="center-text">
                {common.formatPrice(price)}đ
              </Col>
              <Col span={1} className="center-text">
                {category}
              </Col>
              <Col span={1} className="center-text">
                {import_total}
              </Col>
              <Col span={1} className="center-text">
                {sold}
              </Col>
              <Col span={1} className="center-text">
                {stock}
              </Col>
              <Col span={5}>
                <ul>
                  {description.map((des, index) => (
                    <li key={v4()}>{des}</li>
                  ))}
                </ul>
              </Col>
              <Col span={2} className="center-text">
                {colors.join(", ")}
              </Col>
              <Col span={2} className="center-text">
                {size.join(", ")}
              </Col>
              <Col span={4} className="center-text">
                  <div className="slick-image">
                  <Carousel autoplay >
                    {imagesUrl.map((url) => (
                      <div key={v4()}>
                        <img src={url} alt="" width={"120px"}/>
                      </div>
                    ))}
                  </Carousel>
                  </div>
              </Col>
              <Col span={2} className="center-text">
                <div className="edit-action">Sửa</div>
                <div className="delete-action">Xóa</div>
              </Col>
            </Row>
          </div>
        );
      })}
    </div>
  );
}

export default ProductsList;
