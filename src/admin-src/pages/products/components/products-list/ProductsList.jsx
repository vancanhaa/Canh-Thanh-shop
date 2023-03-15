import { useDispatch, useSelector } from "react-redux";
import "./products-list.scss";
import { Row, Col, Carousel, Modal } from "antd";
import { v4 } from "uuid";
import common from "../../../../../utils/common";
import "antd/dist/antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import {
  fetchDeleteProductAdmin,
  fetchProductsListAdmin,
} from "../../../../stores/actions/productsAdmin.action";
import { useEffect } from "react";
import { ROUTE } from "../../../../../constants";
import { Link } from "react-router-dom";

function ProductsList() {
  const dispatch = useDispatch();
  const productsAdminState = useSelector((state) => state.productsAdmin);
  const { listProducts, pagination, textSearch, filter, isDeleteProductSuccess } = productsAdminState;
  const { page, limit } = pagination;
  const indexItem = (page - 1) * 10;
  const [modal, contextHolder] = Modal.useModal();
  useEffect(() => {
    if(isDeleteProductSuccess) {
      dispatch(
        fetchProductsListAdmin({
          page: page,
          limit: limit,
          textSearch: textSearch,
          filter: { ...filter },
        })
      );
    }
  }, [isDeleteProductSuccess])

  const confirm = (id, index) => {
    modal.confirm({
      className: "confirm-delete-item",
      title:
        "Quản trị viên có chắc chắn muốn xoá sản phẩm này khỏi danh sách sản phẩm?",
      icon: <ExclamationCircleOutlined />,
      content: `${listProducts[index].name}`,
      okText: "Đồng ý",
      cancelText: "Không",
      onOk: () => handleDeleteProduct(id),
    });
  };

  const handleDeleteProduct = (id) => {
    dispatch(fetchDeleteProductAdmin(id));
  };
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
          id,
        } = item;
        const colors = options.map((colorItem) => {
          return colorItem.color;
        });
        const imagesUrl = options.map((urlItem) => urlItem.image_url);

        return (
          <div className="products-item" key={v4()}>
            <Row justify="space-between" align="middle" gutter={[16, 16]}>
              <Col span={1} className="center-text">
                {indexItem + index + 1}
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
                  <Carousel autoplay>
                    {imagesUrl.map((url) => (
                      <div key={v4()}>
                        <img src={url} alt="" width={"120px"} />
                      </div>
                    ))}
                  </Carousel>
                </div>
              </Col>
              <Col span={2} className="center-text">
                <div className="edit-action">
                  <Link to={`/admin/products/edit/${id}`} >Sửa</Link>
                </div>
                <div
                  className="delete-action"
                  onClick={() => confirm(id, index)}
                >
                  Xóa
                </div>
              </Col>
            </Row>
          </div>
        );
      })}
      {contextHolder}
    </div>
  );
}

export default ProductsList;
