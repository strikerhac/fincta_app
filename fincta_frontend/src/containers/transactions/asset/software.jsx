import React, { useState, useContext, useEffect } from "react";
import { Row, Col, Select, Button, DatePicker, Input, Slider } from "antd";
import "antd/dist/antd.css";
import styled from "styled-components";

const Software = (props) => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(props.visible);
  const { Option } = Select;

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  const showModal = () => {
    setLoading(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVisible(false);
      props.close();
    }, 3000);
  };

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
        <Background onClick={onBackgroundClick}>
          <div style={{ width: "60%", marginLeft: "-140px" }}>
            <StyledCard>
              <Row style={{ height: "100%" }}>
                <Col
                  span={24}
                  style={{
                    height: "12%",
                    textAlign: "center",
                    fontSize: "25px",
                    fontWeight: "bolder",
                    color: "grey",
                  }}
                >
                  Income ( Asset Sale )
                </Col>
                <Col
                  span={6}
                  style={{
                    height: "88%",
                    padding: "10px",
                  }}
                >
                  <StyledDiv width={100} pB={10}>
                    Select Asset
                  </StyledDiv>
                  <Select
                    defaultValue="Build or Buy"
                    style={{
                      color: "#d3d3d3",
                      width: "100%",
                    }}
                    onChange={handleChange}
                    getPopupContainer={(triggerNode) => {
                      return triggerNode.parentNode;
                    }}
                  >
                    <Option style={{ border: "white" }} value="build">
                      Build or Buy
                    </Option>
                    <Option style={{ border: "white" }} value="acquisition">
                      Customer Acquisition Cost
                    </Option>
                    <Option style={{ border: "white" }} value="recovery">
                      CAC Recovery Time
                    </Option>
                    <Option style={{ border: "white" }} value="impression">
                      Cost per Impression
                    </Option>
                    <Option style={{ border: "white" }} value="equity">
                      Equity Capital
                    </Option>
                  </Select>

                  <StyledDiv
                    width={100}
                    pB={10}
                    style={{
                      marginTop: "180px",
                    }}
                  >
                    Date
                  </StyledDiv>
                  <DatePicker
                    onChange={onChange}
                    style={{ width: "100%" }}
                    getPopupContainer={(triggerNode) => {
                      return triggerNode.parentNode;
                    }}
                  />
                </Col>
                <Col
                  span={1}
                  style={{
                    borderRight: "3px solid grey",
                    margin: "20px 0 20px 0",
                  }}
                ></Col>
                <Col span={17} style={{ padding: "10px 20px 10px 50px" }}>
                  <Row>
                    <StyledCol pB={10} span={10}>
                      <StyledDiv width={100} pB={6}>
                        Useful Life
                      </StyledDiv>
                      <StyleAnchor style={{ paddingRight: "20px" }}>
                        +
                      </StyleAnchor>
                      <Input
                        placeholder="useful life"
                        style={{ width: "60%", borderRadius: "10px" }}
                      />
                      <StyleAnchor style={{ paddingLeft: "20px" }}>
                        -
                      </StyleAnchor>
                    </StyledCol>
                    <StyledCol pB={20} span={14}>
                      <StyledDiv width={100} pB={10}>
                        Sale Amount
                      </StyledDiv>
                      <Input
                        placeholder="sale amount"
                        style={{ width: "100%", borderRadius: "10px" }}
                      />
                    </StyledCol>{" "}
                    <StyledCol pB={20} span={24}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <StyledDiv width={15} pB={10}>
                          Receivable
                        </StyledDiv>

                        <StyledDiv width={15} pB={10}>
                          Received
                        </StyledDiv>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Input
                          placeholder="receivable"
                          style={{ width: "15%", borderRadius: "10px" }}
                        />
                        <Slider
                          style={{ width: "65%" }}
                          min={0}
                          max={100}
                          defaultValue={100}
                          onChangeValue={(value) => {
                            console.log(value);
                          }}
                          getTooltipPopupContainer={(triggerNode) => {
                            return triggerNode.parentNode;
                          }}
                        />
                        <Input
                          placeholder="received"
                          style={{ width: "15%", borderRadius: "10px" }}
                        />
                      </div>
                    </StyledCol>{" "}
                    <StyledCol pB={20} span={24}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <StyledDiv width={15} pB={10}>
                          Bank
                        </StyledDiv>
                        <StyledDiv width={15} pB={10}>
                          Cash
                        </StyledDiv>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Input
                          placeholder="bank"
                          style={{ width: "15%", borderRadius: "10px" }}
                        />
                        <Slider
                          style={{ width: "65%" }}
                          min={0}
                          max={100}
                          defaultValue={100}
                          onChangeValue={(value) => {
                            console.log(value);
                          }}
                          getTooltipPopupContainer={(triggerNode) => {
                            return triggerNode.parentNode;
                          }}
                        />

                        <Input
                          placeholder="cash"
                          style={{ width: "15%", borderRadius: "10px" }}
                        />
                      </div>
                    </StyledCol>{" "}
                    <StyledCol pB={20} span={14}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <StyledDiv width={50} pB={10}>
                          Description
                        </StyledDiv>
                        <StyledDiv width={50} pB={10}>
                          <a style={{ float: "right" }}>+ Add Receipts</a>
                        </StyledDiv>
                      </div>
                      <Input
                        placeholder="description"
                        style={{ width: "100%", borderRadius: "10px" }}
                      />
                    </StyledCol>
                    <StyledCol pB={20} span={10} style={{ paddingLeft: "5%" }}>
                      <StyledDiv width={100} pB={10}>
                        Supplier
                      </StyledDiv>
                      <Select
                        defaultValue="Build or Buy"
                        style={{
                          color: "#d3d3d3",
                          width: "100%",
                        }}
                        onChange={handleChange}
                        getPopupContainer={(triggerNode) => {
                          return triggerNode.parentNode;
                        }}
                      >
                        <Option style={{ border: "white" }} value="build">
                          Build or Buy
                        </Option>
                        <Option style={{ border: "white" }} value="acquisition">
                          Customer Acquisition Cost
                        </Option>
                        <Option style={{ border: "white" }} value="recovery">
                          CAC Recovery Time
                        </Option>
                        <Option style={{ border: "white" }} value="impression">
                          Cost per Impression
                        </Option>
                        <Option style={{ border: "white" }} value="equity">
                          Equity Capital
                        </Option>
                      </Select>
                    </StyledCol>
                  </Row>
                </Col>
              </Row>
            </StyledCard>
            <br />
            <StyledButton key="submit" type="primary" onClick={handleCancel}>
              Save
            </StyledButton>
          </div>
        </Background>
      ) : null}
    </>
  );
};

const StyledButton = styled(Button)`
  font-size: 20px;
  font-weight: bolder;
  float: right;
  border-radius: 15px;
  color: white;
  background-color: orange;
  width: 200px;
  border-color: orange;
  height: 45px;
  padding-bottom: 10px;
`;

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const StyledDiv = styled.div`
  width: ${(props) => `${props.width}%`};
  font-size: 17px;
  color: grey;
  padding-bottom: ${(props) => `${props.pB}px`};
`;

const StyleAnchor = styled.a`
  font-size: 20px;
  font-weight: bolder;
`;

const StyledCol = styled(Col)`
  padding-bottom: ${(props) => `${props.pB}px`};
`;

const StyledCard = styled.div`
  padding: 20px;
  width: 100%;
  height: 480px;
  background-color: white;
  border-radius: 20px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 10px 10px 0px;
`;
export default Software;
