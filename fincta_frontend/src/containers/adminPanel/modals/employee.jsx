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

const Employee = (props) => {
  const { getEmployees } = useContext(DropDownOptionsContext);
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [contactNumber, setContactNumber] = useState(null);
  const [city, setCity] = useState(null);
  const [country, setCountry] = useState(null);
  const [department, setDepartment] = useState(null);
  const [address, setAddress] = useState(null);

  const handleResponse = async () => {
    await getEmployees();
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
        let employee = {
          firstName,
          lastName,
          email,
          contactNumber,
          department,
          city,
          country,
          address,
          userId,
          companyId,
        };

        let promises = [];
        promises.push(
          axios
            .post(`${baseUrl}/employees`, employee)
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
                      <StyledHeadingCol span={24}>
                        Add Employee
                      </StyledHeadingCol>
                      <br />
                      <br />
                      <StyledCol
                        xs={{ span: 24 }}
                        sm={{ span: 24 }}
                        md={{ span: 12 }}
                        lg={{ span: 12 }}
                      >
                        <CustomInput
                          title="First Name"
                          value={firstName}
                          setValue={setFirstName}
                        />
                        <CustomInput
                          title="Last Name"
                          value={lastName}
                          setValue={setLastName}
                        />
                        <CustomInput
                          required={false}
                          title="Email Address"
                          value={email}
                          setValue={setEmail}
                        />
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
                          required={false}
                          title="Department"
                          value={department}
                          setValue={setDepartment}
                        />
                        <CustomInput
                          title="City"
                          value={city}
                          setValue={setCity}
                        />
                        <CustomInput
                          title="Country"
                          value={country}
                          setValue={setCountry}
                        />
                        <CustomInput
                          required={false}
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

export default Employee;
