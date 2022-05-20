import React, { useState } from "react";
import { Row, Col, Radio, Space } from "antd";
import { StyledButton, Background, StyledCard } from "./styles/modal.styles";

const RPModal = (props) => {
  const [visible, setVisible] = useState(props.visible);

  const handleCancel = () => {
    setVisible(false);
    props.close();
  };

  const onBackgroundClick = (event) => {
    event.preventDefault();
    if (event.target === event.currentTarget) {
      setVisible(false);
      props.close();
    }
  };

  const onChange = () => {};

  return (
    <>
      {visible ? (
        <Background
          onClick={onBackgroundClick}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div>
            <StyledCard style={{ height: "140px" }}>
              <Row style={{ height: "100%" }}>
                <Col
                  span={24}
                  style={{ textAlign: "center", paddingTop: "0px" }}
                >
                  <Radio.Group
                    onChange={(e) => {
                      props.setValue(e.target.value);
                    }}
                    value={props.value}
                  >
                    <Space direction="vertical">
                      <Radio style={{ fontSize: "20px" }} value={1}>
                        {props.title} through cash
                      </Radio>
                      <Radio style={{ fontSize: "20px" }} value={2}>
                        {props.title} through bank
                      </Radio>
                    </Space>
                  </Radio.Group>
                </Col>
              </Row>
            </StyledCard>
            <br />
            <StyledButton
              style={{ width: "120px" }}
              key="submit"
              type="primary"
              onClick={props.handleSubmit}
            >
              Confirm
            </StyledButton>
          </div>
        </Background>
      ) : null}
    </>
  );
};

export default RPModal;
