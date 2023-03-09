import { Col, Row } from "antd";
import React from "react";
import "./slider.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
function SliderComponent() {
  const settings={
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }
  return (
    <div className="slider">
      <Row>
        <Col lg={24} md={0} sm={0} xs={0}>
          <Slider>

          </Slider>
        </Col>
      </Row>
    </div>
  );
}

export default SliderComponent;
