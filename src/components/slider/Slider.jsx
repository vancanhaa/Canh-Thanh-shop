import { Col, Row } from "antd";
import React from "react";
import "./slider.scss";
import { Carousel } from "react-bootstrap";

function Slider() {
  return (
    <div className="slider">
      <div className="slider-container">
        <Row>
          <Col xs={24} sm={24} md={24} lg={24}>
          <Carousel prevLabel="" nextLabel="">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://bizweb.dktcdn.net/100/438/408/themes/894085/assets/slider_1.jpg?1676356320484"
          alt="First slide"
        />
        
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://bizweb.dktcdn.net/100/438/408/themes/894085/assets/slider_2.jpg?1676356320484"
          alt="Second slide"
        />

        
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://bizweb.dktcdn.net/100/438/408/themes/894085/assets/slider_5.jpg?1676356320484"
          alt="Third slide"
        />

        
      </Carousel.Item>
    </Carousel>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Slider;
