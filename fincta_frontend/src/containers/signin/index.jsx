import React, { useState, useRef, useEffect } from "react";
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
import { StyledContainer } from "./styles/main.styles";
import { Link } from "react-router-dom";
import Logo from "../../resources/Logo.png";

import { Divider, Row, Col, Spin, Button } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import axios, { baseUrl } from "../../utils/axios";
import { useHistory, useLocation } from "react-router-dom";

const Index = (props) => {
  const asyncLocalStorage = {
    setItem: function (key, value) {
      return Promise.resolve().then(function () {
        localStorage.setItem(key, value);
      });
    },
    getItem: function (key) {
      return Promise.resolve().then(function () {
        return localStorage.getItem(key);
      });
    },
  };

  let history = useHistory();
  // const passwordInputRef = useRef();
  const [passwordRequired, setPasswordRequired] = useState(true);
  const [fPButtonClick, setFPButtonClick] = useState(false);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [errors, setErrors] = useState([]);
  const [socialAuthCode, setSocialAuthCode] = useState("");
  const [socialAuthProvider, setSocialAuthProvider] = useState("");
  let query = new URLSearchParams(useLocation().search);

  useEffect(() => {
    setFPButtonClick(false);
    const socialAuth = async () => {
      setSocialAuthCode(query.get("code"));
      // setSocialAuthProvider(query.get("authProvider"));
      if (socialAuthCode) {
        try {
          setLoading(true);
          const res = await axios.get(
            `${baseUrl}/login/auth/google/callback/?code=${socialAuthCode}`
          );
          console.log(res);
          // if new user, sign up the user
          if (res.status === 201) {
            // setEmail(res.data.userInDb.email);
            console.log(res.data.userInDb.email);

            login(res.data.userInDb.email);
          }
          // if already existing user, log in the user
          if (res.status === 200) {
            console.log(res.data);
            history.push({
              pathname: "/signup",
              state: res.data.user,
            });
            setLoading(false);
          }
        } catch (err) {
          setLoading(false);
          console.log(err);
        }
      } else {
        setLoading(false);
      }
    };
    socialAuth();
  }, [socialAuthCode, socialAuthProvider]);

  const forgotPassword = async () => {
    setPasswordRequired(true);
    console.log("in forgotPassword");
    let user = {
      email,
    };

    await axios
      .post(`${baseUrl}/login/forgotpassword`, user)
      .then((res) => {
        setLoading(false);
        console.log(res);
        if (!res.data.valid) {
          let e = getError(res.data.msg);
          setErrors([e]);
        } else {
          alert(res.data.msg);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const getError = (error) => {
    return (
      <div
        style={{
          backgroundColor: "red",
          color: "white",
          padding: "3px 10px 3px 10px",
          borderRadius: "7px",
          marginBottom: "10px",
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

  const login = async (emailParam = null) => {
    console.log("in handleSubmit");
    let emailValue = emailParam ? emailParam : email;
    let user = {
      email: emailValue,
      password,
    };
    if (emailParam) setLoading(true);

    await axios
      .post(`${baseUrl}/login`, user)
      .then((res) => {
        console.log(res);
        if (!res.data.valid) {
          setLoading(false);
          console.log(res.data.valid);
          let e = getError(res.data.msg);
          setErrors([e]);
        } else {
          localStorage.setItem("fincta_token", res.data.token);
          localStorage.setItem("fincta_currency", res.data.company.currency);
          // localStorage.setItem(
          //   "fincta_user",
          //   JSON.stringify(res.data.userInDb)
          // );
          setTimeout(() => {
            history.replace("/dashboard");
            window.location.reload();
          }, 0);
        }
        // return <Redirect to="/landing" />;
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleSubmit = () => {
    if (fPButtonClick) forgotPassword();
    else login();
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
                  Sign In
                  <StyledParagraph
                    style={{ fontSize: "12px", color: "#0092B3" }}
                  >
                    and enjoy life in the time you've saved!
                  </StyledParagraph>
                </StyledFormHeading>
                <a href={`${baseUrl}/login/auth/google`}>
                  <StyledButton inverse={true} type="primary">
                    Sign In with G
                  </StyledButton>
                </a>

                <Divider>
                  <StyledSpan>Or</StyledSpan>
                </Divider>
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
                      Email<StyledSpan style={{ color: "red" }}> *</StyledSpan>
                    </StyledSpan>
                    <StyledInput
                      placeholder="email"
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
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
                      // ref={passwordInputRef}
                      placeholder="Password"
                      required={passwordRequired}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </StyledFormItem>

                  <Checkbox style={{ textAlign: "left", paddingTop: "5px" }}>
                    <StyledParagraph>Remember Me</StyledParagraph>
                  </Checkbox>
                  <Button
                    htmlType="submit"
                    onClick={() => {
                      // passwordInputRef.current.required = false;
                      setPasswordRequired(false);
                      setFPButtonClick(true);
                    }}
                    style={{
                      backgroundColor: "white",
                      borderColor: "white",
                      float: "right",
                      fontSize: "12px",
                      padding: "0",
                      color: "orange",
                      boxShadow: "none",
                      textAlign: "right",
                    }}
                  >
                    Forgot Password?
                  </Button>
                  {/* <br /> */}
                  <StyledFormButtonWrapper>
                    <StyledButton
                      style={{ width: "100%", height: "2rem" }}
                      onClick={() => {
                        setFPButtonClick(false);
                      }}
                      type="primary"
                      htmlType="submit"
                    >
                      Sign In
                    </StyledButton>
                  </StyledFormButtonWrapper>
                  <StyledParagraph>
                    Don't have an account?
                    <StyledLink to="/signup"> Register here.</StyledLink>
                  </StyledParagraph>
                </StyledForm>
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
