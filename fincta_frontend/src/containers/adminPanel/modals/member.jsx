import React, { useState, useContext } from "react";
import { DropDownOptionsContext } from "../../../context/optionsContext";
import { Row, Col, Spin, Input } from "antd";
import {
  StyledButton,
  Background,
  StyledHeadingCol,
  StyledCol,
  StyledCard,
} from "../../transactions/modal/styles/modal.styles";
import { CustomInput } from "../../transactions/modal/components";
import axios, { baseUrl } from "../../../utils/axios";
import { StyledDiv } from "../../transactions/modal/styles/components.styles";
import { CustomDropdown } from "../../transactions/modal/components";
import styled from "styled-components";

const Member = (props) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(null);
  const [designation, setDesignation] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  //   const [companyId, setCompanyId] = useState(null);
  const [permissions, setPermissions] = useState(null);

  const onDropChange = (value, title) => {
    if (value !== null) {
      console.log(value?.value);
      console.log(title);
      if (value?.value !== "undefined") {
        setPermissions(value.value);
      }
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    await axios
      .get(`${baseUrl}/users/fromtoken`)
      .then((response) => {
        console.log(response);
        let member = {
          name,
          email,
          designation,
          password,
          companyId: response.data.companyId,
          permissions,
        };

        let promises = [];
        promises.push(
          axios
            .post(`${baseUrl}/users/member`, member)
            .then((response) => {
              if (response.data.valid) {
                // handleResponse();
              } else {
                alert(response.data.msg);
              }
              console.log(response);
              setLoading(false);
              props.setVisible(false);
            })
            .catch((err) => {
              setLoading(false);
              props.setVisible(false);
              console.log(err);
            })
        );
        return Promise.all(promises);
      })
      .catch((err) => {
        setLoading(false);
        props.setVisible(false);
        console.log(err);
      });
  };

  const handleBack = (event) => {
    props.setVisible(false);
  };

  return (
    <>
      {props.visible ? (
        <Background>
          <Row
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Col
              xs={{ span: 22 }}
              sm={{ span: 18 }}
              md={{ span: 14 }}
              lg={{ span: 12 }}
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
                      <StyledHeadingCol span={24}>Add Member</StyledHeadingCol>
                      <br />
                      <StyledCol span={24}>
                        <CustomInput
                          title="Name"
                          value={name}
                          setValue={setName}
                        />
                        <CustomInput
                          title="Email"
                          value={email}
                          setValue={setEmail}
                        />
                        {/* <StyledDiv width={100} pB={0}>
                        Password
                      </StyledDiv>
                      <Input.Password
                        style={{
                          height: "27px",
                          borderRadius: "5px",
                          margin: "5px 0 3px 0",
                        }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      /> */}
                        <CustomInput
                          title="Designation"
                          value={designation}
                          setValue={setDesignation}
                        />
                        <CustomDropdown
                          creatable={false}
                          title={"Permissions"}
                          options={[
                            { label: "Admin", value: "admin" },
                            { label: "Read and Write", value: "rw" },
                            { label: "Read Only", value: "r" },
                          ]}
                          onChange={onDropChange}
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

export default Member;

// const Background = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 100%;
//   height: 100%;
//   background: rgba(0, 0, 0, 0.6);
//   position: fixed;
//   padding-top: 30px;
//   overflow: scroll;
//   @media (max-width: 990px) {
//     padding-bottom: 70px;
//   }
//   z-index: 9999;
// `;
