import React, { useState, useContext } from "react";
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
import { Row, Col } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import axios, { baseUrl } from "../../utils/axios";
import { Redirect, Route } from "react-router";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import styled from "styled-components";

const Index = (props) => {
  const verifyUser = "verifyUser";
  const registerUserAndCompany = "registerUserAndCompany";
  let history = useHistory();
  let data = history.location.state;
  const [nextForm, setNextForm] = useState(data?.googleLogin ? true : false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(data ? data.name : null);
  const [email, setEmail] = useState(data ? data.email : null);
  const [password, setPassword] = useState(null);
  const [designation, setDesignation] = useState(null);
  const [errors, setErrors] = useState([]);
  //---------------------------------------------
  const [companyName, setCompanyName] = useState(null);
  const [country, setCountry] = useState(null);
  const [currency, setCurrency] = useState(null);
  const [salesTax, setSalesTax] = useState(null);
  const [checked, setChecked] = useState(false);

  const getError = (error) => {
    return (
      <div
        style={{
          backgroundColor: "red",
          color: "white",
          padding: "3px 10px 3px 10px",
          borderRadius: "7px",
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

  const handleSubmit = async (action) => {
    let user = {
      name,
      email,
      password,
    };
    if (!nextForm) {
      setLoading(true);
      await axios
        .post(`${baseUrl}/login/register`, { action: verifyUser, user })
        .then((res) => {
          console.log(res);
          if (!res.data.valid) {
            setLoading(false);
            let e = getError(res.data.msg);
            setErrors([e]);
          } else {
            setLoading(false);
            setNextForm(true);
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    } else {
      user.loginType = data?.googleLogin ? "google" : "default";
      user.designation = designation;
      if (validateCompanyForm()) {
        let company = {
          companyName,
          country,
          currency,
          salesTax,
        };
        setLoading(true);

        await axios
          .post(`${baseUrl}/login/register`, {
            action: registerUserAndCompany,
            user,
            company,
          })
          .then((res) => {
            console.log(res);
            if (!res.data.valid) {
              setLoading(false);
              let e = getError(res.data.msg);
              setErrors([e]);
            } else {
              console.log(res);
              let promises = [];
              promises.push(
                axios
                  .post(`${baseUrl}/login`, res.data.user)
                  .then((res) => {
                    setLoading(false);
                    console.log(res);
                    localStorage.setItem("fincta_token", res.data.token);
                    localStorage.setItem(
                      "fincta_currency",
                      res.data.company.currency
                    );
                    history.replace("/dashboard");
                    window?.location.reload();
                  })
                  .catch((err) => {
                    setLoading(false);
                    console.log(err);
                  })
              );
              return Promise.all(promises);
            }
          })
          .catch((err) => {
            setLoading(false);
            console.log(err);
          });
      } else {
      }
    }
  };

  const validateCompanyForm = () => {
    if (!country) {
      alert("please select country.");
    } else if (!currency) {
      alert("please select currency.");
    } else if (!salesTax) {
      alert("please select sales tax registration status.");
    } else {
      return true;
    }
  };

  return (
    <StyledContainer>
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
              Sign Up
              <StyledParagraph style={{ fontSize: "12px", color: "#0092B3" }}>
                and enjoy life in the time you've saved!
              </StyledParagraph>
            </StyledFormHeading>
            {!nextForm ? (
              <StyledForm
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(verifyUser);
                }}
              >
                {errors.length > 0 ? errors : null}
                <StyledFormItem wrapperCol={{ span: 24 }} name="name" required>
                  <StyledSpan>
                    Name <StyledSpan style={{ color: "red" }}>*</StyledSpan>
                  </StyledSpan>
                  <StyledInput
                    placeholder="name"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </StyledFormItem>

                <StyledFormItem wrapperCol={{ span: 24 }} name="email" required>
                  <StyledSpan>
                    Email <StyledSpan style={{ color: "red" }}>*</StyledSpan>
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

                <StyledFormItem wrapperCol={{ span: 24 }} name="password">
                  <StyledSpan>
                    Password <StyledSpan style={{ color: "red" }}>*</StyledSpan>
                  </StyledSpan>
                  <StyledPassword
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </StyledFormItem>

                {/* <Checkbox style={{ textAlign: "left" }}>
                  <StyledSpan style={{ fontSize: "11px" }}>
                    I accept the <StyledLink>Terms and Conditions</StyledLink>{" "}
                    and the <StyledLink>Privacy Policy.</StyledLink>
                  </StyledSpan>
                </Checkbox> */}
                <br />
                <StyledFormButtonWrapper>
                  <StyledButton
                    type="primary"
                    htmlType="submit"
                    style={{ marginBottom: "10px" }}
                  >
                    Sign Up
                  </StyledButton>
                  <br />
                  <a href={`${baseUrl}/login/auth/google`}>
                    <StyledButton inverse={true} type="primary">
                      Sign In with G
                    </StyledButton>
                  </a>
                </StyledFormButtonWrapper>
                <StyledParagraph>
                  Already a member?
                  <StyledLink to="/signin"> Sign in here.</StyledLink>
                </StyledParagraph>
              </StyledForm>
            ) : (
              <StyledForm
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(registerUserAndCompany);
                }}
              >
                {errors.length > 0 ? errors : null}
                <StyledFormItem wrapperCol={{ span: 24 }} name="companyName">
                  <StyledSpan>
                    Company Name{" "}
                    <StyledSpan style={{ color: "red" }}>*</StyledSpan>
                  </StyledSpan>
                  <StyledInput
                    placeholder="company name"
                    required
                    value={companyName}
                    onChange={(e) => {
                      setCompanyName(e.target.value);
                    }}
                  />
                </StyledFormItem>

                <StyledFormItem wrapperCol={{ span: 24 }} name="designation">
                  <StyledSpan>
                    Designation{" "}
                    <StyledSpan style={{ color: "red" }}>*</StyledSpan>
                  </StyledSpan>
                  <StyledInput
                    placeholder="designation"
                    required
                    value={designation}
                    onChange={(e) => {
                      setDesignation(e.target.value);
                    }}
                  />
                </StyledFormItem>

                <StyledFormItem wrapperCol={{ span: 24 }} name="country">
                  <StyledSpan>
                    Country <StyledSpan style={{ color: "red" }}>*</StyledSpan>
                  </StyledSpan>

                  <StyledSelect
                    onChange={(e) => {
                      e ? setCountry(e.value) : setCountry(null);
                    }}
                    className="basic-single"
                    classNamePrefix="select"
                    styles={customStyles}
                    isClearable
                    options={[
                      { value: "Pakistan", label: "Pakistan" },
                      { value: "USA", label: "USA" },
                    ]}
                  ></StyledSelect>
                </StyledFormItem>
                <Row gutter={16}>
                  <Col span={12}>
                    <StyledFormItem wrapperCol={{ span: 24 }} name="currency">
                      <StyledSpan>
                        Currency{" "}
                        <StyledSpan style={{ color: "red" }}>*</StyledSpan>
                      </StyledSpan>
                      <StyledSelect
                        onChange={(e) => {
                          e ? setCurrency(e.value) : setCurrency(null);
                        }}
                        className="basic-single"
                        classNamePrefix="select"
                        styles={customStyles}
                        isClearable
                        options={[
                          { value: "PKR", label: "PKR" },
                          { value: "USD", label: "USD" },
                        ]}
                      />
                    </StyledFormItem>
                  </Col>
                  <Col span={12}>
                    <StyledFormItem wrapperCol={{ span: 24 }} name="salesTax">
                      <StyledSpan>
                        Sales Tax Registered
                        <StyledSpan style={{ color: "red" }}>*</StyledSpan>
                      </StyledSpan>
                      <StyledSelect
                        onChange={(e) => {
                          e ? setSalesTax(e.value) : setSalesTax(null);
                        }}
                        className="basic-single"
                        classNamePrefix="select"
                        styles={customStyles}
                        isClearable
                        options={[
                          { value: true, label: "Yes" },
                          { value: false, label: "No" },
                        ]}
                      />
                    </StyledFormItem>
                  </Col>
                </Row>
                <Checkbox
                  style={{ textAlign: "left" }}
                  required
                  checked={checked}
                  onChange={(e) => {
                    setChecked(e.target.checked);
                  }}
                >
                  <StyledSpan style={{ fontSize: "11px" }}>
                    I accept the <StyledLink>Terms and Conditions</StyledLink>{" "}
                    and the <StyledLink>Privacy Policy.</StyledLink>
                  </StyledSpan>
                </Checkbox>
                <br />
                <StyledFormButtonWrapper>
                  <StyledButton
                    type="primary"
                    htmlType="submit"
                    style={{ marginBottom: "10px" }}
                  >
                    Sign Up
                  </StyledButton>
                  {/* <br /> */}
                  {/* <a href={`${baseUrl}/login/auth/google`}>
                    <StyledButton inverse={true} type="primary">
                      Sign In with G
                    </StyledButton>
                  </a> */}
                </StyledFormButtonWrapper>
                <StyledParagraph>
                  Already a member?
                  <StyledLink to="/signin"> Sign in here.</StyledLink>
                </StyledParagraph>
              </StyledForm>
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
    </StyledContainer>
  );
};

export default Index;

const StyledDefaultSelect = styled.select`
  font-size: 12px;
  color: grey;
  display: block;
  /* width: 50%; */
  margin-top: 5px;
  padding: 0 10px 0 10px;
  /* border: 1px solid #ddd; */
  box-shadow: 0 0 0 3px #ddd;
  /* border-color: white; */
  height: 30px;
  border-radius: 5px;
  border: none;
  focused: none;
`;

const StyledSelect = styled(Select)`
  .select__control {
    box-shadow: 0 0 0 1.5px #ddd;
    height: 30px;
    margin-top: 5px;
  }
  .select__control--is-focused {
    box-shadow: 0 0 0 1.5px #ddd;
    padding: 0px;
    height: 30px;
    margin-top: 5px;
  }
  .css-104n56q-control {
    /* min-height: 30px; */
  }
  .css-ceryh6-control {
    min-height: 30px;
  }
  /* .css1gtu0rj-indicatorContainer {
    padding: 0 10px;
  } */
  .css-tlfecz-indicatorContainer {
    padding: 0 10px;
  }
  .select__value-container {
    padding: 0 10px;
  }
`;

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    padding: 5,
    paddingLeft: 10,
  }),
  control: (provided) => ({
    ...provided,
    // none of react-select's styles are passed to <Control />
    // width: 300,
    padding: 0,
    innerHeight: 10,
    height: 10,
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";

    return { ...provided, opacity, transition };
  },
};
