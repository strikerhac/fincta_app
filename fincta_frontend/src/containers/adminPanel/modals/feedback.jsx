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
import {
  StyledFlexDiv,
  StyledDiv,
} from "../../transactions/modal/styles/components.styles";
import { CustomDropdown } from "../../transactions/modal/components";
import styled from "styled-components";

const Feedback = (props) => {
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const handleSubmit = async () => {
    await axios
      .get(`${baseUrl}/users/fromtoken`)
      .then((response) => {
        console.log(response);
        setLoading(true);
        let userId = response.data._id;
        let companyId = response.data.companyId;
        let fb = {
          subject,
          feedback,
          userId,
          companyId,
        };

        let promises = [];
        promises.push(
          axios
            .post(`${baseUrl}/users/feedback`, fb)
            .then((res) => {
              console.log(res);
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
                      <StyledHeadingCol span={24}>Feedback</StyledHeadingCol>
                      <br />
                      <StyledCol span={24}>
                        <CustomInput
                          title="Subject"
                          value={subject}
                          setValue={setSubject}
                        />
                        {/* <CustomInput
                          title="Feedback"
                          value={feedback}
                          setValue={setFeedback}
                        /> */}
                        <br />
                        <StyledFlexDiv>
                          <StyledDiv width={100} pB={5}>
                            Feedback
                          </StyledDiv>
                        </StyledFlexDiv>
                        <Input.TextArea
                          rows={4}
                          value={feedback}
                          setValue={setFeedback}
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
                      Send
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

export default Feedback;
