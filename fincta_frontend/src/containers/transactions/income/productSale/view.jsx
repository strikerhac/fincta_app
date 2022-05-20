import React from "react";
import {
  StyledButton,
  Background,
  StyledDivider,
  StyledHeadingCol,
  StyledCol,
  StyledCard,
} from "../../modal/styles/modal.styles";
import {
  CustomSlider,
  CustomInput,
  CustomDatePicker,
} from "../../modal/components";
import { Row, Col } from "antd";

const ModalView = ({
  accountClass,
  subAccount,
  dropDowns,
  createdAt,
  maxQuantity,
  setMaxQuantity,
  quantity,
  setQuantity,
  amount,
  setAmount,
  bCValue,
  rPValue,
  setIPValue,
  setBCValue,
  setRPValue,
  description,
  setDescription,
  onChange,
  onBackgroundClick,
  handleSubmit,
  ...rest
}) => {
  return (
    <>
      {rest.visible ? (
        <Background>
          <Row
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Col
              xs={{ span: 22 }}
              sm={{ span: 22 }}
              md={{ span: 20 }}
              lg={{ span: 16 }}
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                <StyledCard>
                  <Row style={{ height: "100%" }}>
                    <StyledHeadingCol
                      span={24}
                    >{`${accountClass} ( ${subAccount} )`}</StyledHeadingCol>
                    <br />
                    <br />
                    <StyledCol
                      style={{
                        paddingBottom: "10px",
                      }}
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      md={{ span: 10 }}
                      lg={{ span: 6 }}
                    >
                      {dropDowns}
                    </StyledCol>

                    <Col
                      xs={{ span: 0 }}
                      sm={{ span: 0 }}
                      md={{ span: 2 }}
                      lg={{ span: 2 }}
                    >
                      <StyledDivider></StyledDivider>
                    </Col>
                    <StyledCol
                      style={{ paddingBottom: "10px" }}
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      md={{ span: 12 }}
                      lg={{ span: 16 }}
                    >
                      <Row gutter={16}>
                        <Col
                          xs={{ span: 24 }}
                          sm={{ span: 24 }}
                          md={{ span: 24 }}
                          lg={{ span: 12 }}
                        >
                          <CustomInput
                            title={rest.counterTitle}
                            width={100}
                            maxQuantity={maxQuantity}
                            value={quantity}
                            setValue={setQuantity}
                            type="number"
                            min="0"
                            required={true}
                          />
                        </Col>
                        <Col
                          xs={{ span: 24 }}
                          sm={{ span: 24 }}
                          md={{ span: 24 }}
                          lg={{ span: 12 }}
                        >
                          <CustomInput
                            value={amount}
                            setValue={setAmount}
                            setRPValue={setRPValue}
                            setIPValue={setIPValue}
                            setBCValue={setBCValue}
                            title={rest.inputTitle}
                            width={100}
                            required={true}
                            type="number"
                            min="0"
                          />
                        </Col>
                        <Col span={24}>
                          <CustomSlider
                            titleLeft={rest.pay ? "Payable" : "Receivable"}
                            titleRight={rest.pay ? "Paid" : "Received"}
                            min={0}
                            max={amount}
                            value={rPValue}
                            setValue={setRPValue}
                            setBCValue={setBCValue}
                          />
                        </Col>
                        <Col span={24}>
                          <CustomSlider
                            titleLeft="Bank"
                            titleRight="Cash"
                            min={0}
                            max={rPValue}
                            value={bCValue}
                            setValue={setBCValue}
                          />
                        </Col>
                        <Col
                          xs={{ span: 24 }}
                          sm={{ span: 24 }}
                          md={{ span: 24 }}
                          lg={{ span: 12 }}
                        >
                          <CustomInput
                            title="Description"
                            width={100}
                            value={description}
                            setValue={setDescription}
                            required={true}
                          />
                        </Col>
                        <Col
                          xs={{ span: 24 }}
                          sm={{ span: 24 }}
                          md={{ span: 24 }}
                          lg={{ span: 12 }}
                        >
                          <CustomDatePicker
                            onChange={onChange}
                            defaultValue={createdAt}
                            disabled={true}
                          />
                        </Col>
                      </Row>
                    </StyledCol>
                  </Row>
                </StyledCard>
                <br />
                <Row
                  gutter={16}
                  style={{
                    display: "flex",
                    justifyContent: "right",
                  }}
                >
                  <Col md={{ span: 6 }} lg={{ span: 4 }}>
                    <StyledButton
                      style={{ width: "100%" }}
                      type="primary"
                      onClick={onBackgroundClick}
                    >
                      close
                    </StyledButton>
                  </Col>
                  <Col
                    xs={{ span: 11 }}
                    sm={{ span: 11 }}
                    md={{ span: 10 }}
                    lg={{ span: 8 }}
                  >
                    <StyledButton
                      style={{ width: "100%" }}
                      key="submit"
                      type="primary"
                      htmlType="submit"
                    >
                      Save
                    </StyledButton>
                  </Col>
                </Row>
              </form>
            </Col>
          </Row>
        </Background>
      ) : null}
    </>
  );
};

export default ModalView;
