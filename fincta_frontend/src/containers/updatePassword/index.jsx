import React, { useState, useContext, useEffect } from "react";
import {
  StyledPassword,
  StyledInput,
} from "../../components/input/main.styles";
import { CloseOutlined } from "@ant-design/icons";
import { StyledButton } from "../../components/button/main.styles";
import {
  StyledParagraph,
  StyledFormHeading,
  StyledLink,
  StyledSpan,
} from "../../components/text/main.styles";
import {
  StyledFormButtonWrapper,
  StyledForm,
  StyledFormItem,
} from "../../components/form/main.styles";
import { StyledFormCard } from "../../components/card/main.styles";
import { StyledImage } from "../../components/image/main.styles";
import { StyledContainer } from "../signin/styles/main.styles";
import { Link } from "react-router-dom";
import Logo from "../../resources/Logo.png";

import { Divider, Row, Col, Spin } from "antd";
import axios, { baseUrl } from "../../utils/axios";
import { useHistory, useLocation } from "react-router-dom";

const Index = (props) => {
  let history = useHistory();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [errors, setErrors] = useState([]);
  const [upadated, setUpadated] = useState(false);
  const [isValidToken, setIsValidToken] = useState(true);

  let query = new URLSearchParams(useLocation().search);

  useEffect(() => {
    const token = query.get("token");
    const apis = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/login/checkemailvalidity/${token}`
        );

        console.log(response);
        if (response.data.valid) {
          setLoading(false);
          setEmail(response.data.email);
        } else {
          setLoading(false);
          setIsValidToken(false);
          let e = getError(response.data.msg);
          setErrors([e]);
        }
      } catch (error) {
        console.log(error.response.data);
        setLoading(false);
      }
    };
    apis();
  }, []);

  const getError = (error) => {
    return (
      <div
        style={{
          backgroundColor: "red",
          color: "white",
          padding: "3px 10px 3px 10px",
          borderRadius: "7px",
          margin: "10px 0 10px 0",
        }}
      >
        {error}{" "}
        <a
          style={{ color: "white", float: "right" }}
          onClick={() => setErrors([])}
        >
          <CloseOutlined style={{ color: "white" }} />
        </a>
      </div>
    );
  };

  const handleSubmit = async () => {
    console.log("in handleSubmit");
    const token = query.get("token");
    try {
      const response = await axios.put(
        `${baseUrl}/login/updatePasswordViaEmail`,
        {
          email,
          password,
          resetPasswordToken: token,
        }
      );
      console.log(response.data);
      if (response.data.valid) {
        setUpadated(true);
        setErrors([]);
      } else {
        setUpadated(false);
        let e = getError(response.data.msg);
        setErrors([e]);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <Spin tip="Loading..." spinning={loading}>
      <StyledContainer>
        {loading ? null : (
          <Row style={{ height: "100%" }}>
            <Col
              xs={{ span: 24 }}
              md={{ span: 24 }}
              lg={{ span: 16 }}
              xl={{ span: 10 }}
              style={{ margin: "auto" }}
            >
              <StyledFormCard>
                <Link to="/">
                  <StyledImage src={Logo}></StyledImage>
                </Link>

                <StyledFormHeading style={{ textAlign: "left" }}>
                  Reset My Password
                  <StyledParagraph
                    style={{ fontSize: "12px", color: "#0092B3" }}
                  >
                    {isValidToken
                      ? "Enter the new password and submit!"
                      : errors.length > 0
                      ? errors
                      : null}
                  </StyledParagraph>
                </StyledFormHeading>
                {isValidToken ? (
                  <StyledForm
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSubmit();
                    }}
                  >
                    {errors.length > 0 ? errors : null}

                    <StyledFormItem
                      wrapperCol={{ span: 24 }}
                      style={{ paddingTop: "0" }}
                      name="email"
                      required
                    >
                      <StyledSpan>
                        Email
                        <StyledSpan style={{ color: "red" }}> *</StyledSpan>
                      </StyledSpan>
                      <StyledInput
                        contentEditable={false}
                        placeholder="email"
                        value={email}
                        required
                      />
                    </StyledFormItem>

                    <StyledFormItem
                      wrapperCol={{ span: 24 }}
                      name="password"
                      required
                    >
                      <StyledSpan>
                        Password
                        <StyledSpan style={{ color: "red" }}> *</StyledSpan>
                      </StyledSpan>
                      <StyledPassword
                        placeholder="Password"
                        value={password}
                        required
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                    </StyledFormItem>
                    <br />
                    <StyledFormButtonWrapper>
                      <StyledButton
                        style={{ width: "100%", height: "2rem" }}
                        type="primary"
                        htmlType="submit"
                      >
                        Update Password
                      </StyledButton>
                    </StyledFormButtonWrapper>
                    {upadated ? (
                      <StyledParagraph style={{ color: "green" }}>
                        Password Updated Succefully :)
                        <StyledLink to="/signin"> SignIn here.</StyledLink>
                      </StyledParagraph>
                    ) : null}
                  </StyledForm>
                ) : null}
                {isValidToken ? null : (
                  <StyledLink to="/signin"> SignIn here.</StyledLink>
                )}
              </StyledFormCard>
            </Col>
            <Col
              xs={{ span: 0 }}
              md={{ span: 0 }}
              lg={{ span: 8 }}
              xl={{ span: 14 }}
            ></Col>
          </Row>
        )}
      </StyledContainer>
    </Spin>
  );
};

export default Index;
