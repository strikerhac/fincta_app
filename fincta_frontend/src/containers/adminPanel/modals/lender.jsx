import React, { useState, useContext } from "react";
import { DropDownOptionsContext } from "../../../context/optionsContext";
import { Row, Col, Spin } from "antd";
import {
  StyledButton,
  Background,
  StyledHeadingCol,
  StyledCol,
  StyledCard,
} from "../../transactions/modal/styles/modal.styles";
import { CustomInput } from "../../transactions/modal/components";
import axios, { baseUrl } from "../../../utils/axios";
import styled from "styled-components";

const Lender = (props) => {
  const { getLenders } = useContext(DropDownOptionsContext);
  const [loading, setLoading] = useState(false);
  const [lenderName, setLenderName] = useState(null);
  const [email, setEmail] = useState(null);
  const [contactNumber, setContactNumber] = useState(null);
  const [city, setCity] = useState(null);
  const [country, setCountry] = useState(null);
  const [address, setAddress] = useState(null);

  const handleResponse = async () => {
    await getLenders();
    props.setVisibleSecondModal(false);
    props.setVisible(true);
  };

  const handleSubmit = async () => {
    await axios
      .get(`${baseUrl}/users/fromtoken`)
      .then((response) => {
        console.log(response);
        setLoading(true);
        let userId = response.data._id;
        let companyId = response.data.companyId;
        let lender = {
          name: lenderName,
          email,
          contactNumber,
          city,
          country,
          address,
          userId,
          companyId,
        };

        let promises = [];
        promises.push(
          axios
            .post(`${baseUrl}/lenders`, lender)
            .then((res) => {
              console.log(res);
              handleResponse();
            })
            .catch((err) => {
              setLoading(false);
              console.log(err);
            })
        );
        return Promise.all(promises);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleBack = (event) => {
    props.setVisibleSecondModal(false);
    props.setVisible(true);
  };

  return (
    <>
      {props.visibleSecondModal ? (
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
                <Spin tip="Loading..." spinning={loading}>
                  <StyledCard>
                    <Row style={{ height: "100%" }}>
                      <StyledHeadingCol span={24}>Add Lender</StyledHeadingCol>
                      <br />
                      <br />
                      <StyledCol
                        xs={{ span: 24 }}
                        sm={{ span: 24 }}
                        md={{ span: 12 }}
                        lg={{ span: 12 }}
                      >
                        <CustomInput
                          title="Lender Name"
                          value={lenderName}
                          setValue={setLenderName}
                        />
                      </StyledCol>
                      <StyledCol
                        xs={{ span: 24 }}
                        sm={{ span: 24 }}
                        md={{ span: 12 }}
                        lg={{ span: 12 }}
                      >
                        <CustomInput
                          title="Contact Number"
                          value={contactNumber}
                          setValue={setContactNumber}
                        />
                      </StyledCol>

                      <StyledCol
                        xs={{ span: 24 }}
                        sm={{ span: 24 }}
                        md={{ span: 12 }}
                        lg={{ span: 12 }}
                      >
                        <CustomInput
                          title="City"
                          value={city}
                          setValue={setCity}
                        />{" "}
                      </StyledCol>
                      <StyledCol
                        xs={{ span: 24 }}
                        sm={{ span: 24 }}
                        md={{ span: 12 }}
                        lg={{ span: 12 }}
                      >
                        <CustomInput
                          title="Country"
                          value={country}
                          setValue={setCountry}
                        />
                      </StyledCol>
                      <StyledCol span={24}>
                        <CustomInput
                          title="Email Address"
                          value={email}
                          setValue={setEmail}
                        />
                      </StyledCol>
                      <StyledCol span={24}>
                        <CustomInput
                          title="Address"
                          value={address}
                          setValue={setAddress}
                        />
                      </StyledCol>
                    </Row>
                  </StyledCard>
                </Spin>
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
                      type="primary"
                      style={{ width: "100%" }}
                      onClick={handleBack}
                    >
                      Back
                    </StyledButton>
                  </Col>
                  <Col
                    xs={{ span: 11 }}
                    sm={{ span: 11 }}
                    md={{ span: 10 }}
                    lg={{ span: 8 }}
                  >
                    <StyledButton
                      key="submit"
                      type="primary"
                      htmlType="submit"
                      style={{ width: "100%" }}
                    >
                      Add
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

export default Lender;
