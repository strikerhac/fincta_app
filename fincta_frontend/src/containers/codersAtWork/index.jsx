import React from "react";
import Work from "../../resources/work.png";
import { Row, Col } from "antd";

const Index = (props) => {
  return (
    <Row>
      <Col span={24}>
        <div
          style={{ height: "90vh", display: "flex", justifyContent: "center" }}
        >
          <div
            style={{
              height: "90vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <img src={Work} style={{ width: "100%", height: "70vh" }}></img>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Index;
