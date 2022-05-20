import React from "react";
import { NavIcons } from "../../globalComponents/globalComponents";
import {
  StyledFlexDiv,
  StyledButton,
  Background,
  StyledDivider,
  StyledHeadingCol,
  StyledCol,
  StyledCard,
} from "./styles/modal.styles";
import {
  CustomSlider,
  CustomInput,
  CustomDropdown,
  CustomDatePicker,
} from "./components";
import Feedback from "../../feedback";
import { Row, Col, Button, Spin, Form } from "antd";
import { StyledDiv } from "./styles/components.styles";
import styled from "styled-components";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";

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
  iPValue,
  bCValue,
  rPValue,
  setIPValue,
  setBCValue,
  setRPValue,
  installmentDates,
  setInstallmentDates,
  description,
  setDescription,
  onChange,
  onBackgroundClick,
  handleSubmit,
  loan,
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
                    {/* <br /> */}
                    <StyledCol
                      style={{
                        paddingBottom: "10px",
                      }}
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      md={{ span: 10 }}
                      lg={{ span: 6 }}
                    >
                      {rest.installment ? (
                        <div>
                          <div style={{ marginBottom: "5px", color: "grey" }}>
                            Lender
                          </div>
                          <div
                            style={{
                              border: "1px solid #d7d7c1",
                              borderRadius: "5px",
                              height: "27px",
                              textAlign: "center",
                            }}
                          >
                            {rest.lenderName}
                          </div>
                        </div>
                      ) : (
                        dropDowns
                      )}
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
                        {/* <StyledFlexDiv> */}
                        {rest.counterTitle ? (
                          maxQuantity !== null ? (
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
                          ) : (
                            <Col
                              xs={{ span: 24 }}
                              sm={{ span: 24 }}
                              md={{ span: 24 }}
                              lg={{ span: 12 }}
                            >
                              <CustomInput
                                title={rest.counterTitle}
                                width={100}
                                value={quantity}
                                setValue={setQuantity}
                                required={true}
                                type="number"
                                min="0"
                              />
                            </Col>
                          )
                        ) : null}
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
                          {/* </StyledFlexDiv> */}
                        </Col>
                        <Col span={24}>
                          {rest.installment ? (
                            <CustomSlider
                              titleLeft="Interest"
                              titleRight="Principal"
                              min={0}
                              max={amount}
                              value={iPValue}
                              setValue={setIPValue}
                            />
                          ) : null}
                        </Col>
                        <Col span={24}>
                          {subAccount !== loan ? (
                            <CustomSlider
                              titleLeft={rest.pay ? "Payable" : "Receivable"}
                              titleRight={rest.pay ? "Paid" : "Received"}
                              min={0}
                              max={amount}
                              value={rPValue}
                              setValue={setRPValue}
                              setBCValue={setBCValue}
                            />
                          ) : null}
                        </Col>
                        <Col span={24}>
                          <CustomSlider
                            titleLeft="Bank"
                            titleRight="Cash"
                            min={0}
                            max={subAccount !== loan ? rPValue : amount}
                            value={bCValue}
                            setValue={setBCValue}
                          />
                        </Col>
                        <Col span={24}>
                          {subAccount === loan ? (
                            !rest.installment ? (
                              <div>
                                <StyledDiv width={100} pB={5}>
                                  Pick Loan Installment Dates
                                </StyledDiv>
                                <DatePicker
                                  containerStyle={{ width: "100%" }}
                                  style={{
                                    width: "100%",
                                    height: "27px",
                                    border: "1px solid #d7d7c1",
                                  }}
                                  value={installmentDates}
                                  onChange={setInstallmentDates}
                                  format="MMMM DD YYYY"
                                  sort
                                  plugins={[<DatePanel />]}
                                />
                              </div>
                            ) : null
                          ) : null}
                        </Col>
                        <Col
                          xs={{ span: 24 }}
                          sm={{ span: 24 }}
                          md={{ span: 24 }}
                          lg={{ span: 12 }}
                        >
                          {/* <StyledFlexDiv> */}
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
                          {/* </StyledFlexDiv> */}
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
