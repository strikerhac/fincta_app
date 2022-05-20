import React, { useState, createContext, useEffect } from "react";
import PublicNavBar from "./PublicNavBar";
import {
  StyledLoginContainer,
  StyledContainer,
  StyledRowContainer,
  StyledRow,
  StyledColumn,
} from "./styles/main.styles";
import {
  StyledSubHeading,
  StyledHeading,
} from "../../components/text/main.styles";
import { StyledButton } from "../../components/button/main.styles";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Eclipses from "../../resources/eclipses.png";
// import Eclipses from "../../resources/home1.PNG";
import { useHistory, useLocation } from "react-router-dom";
import { Row, Col } from "antd";

const Index = (props) => {
  // let location = useLocation();
  // useEffect(() => {
  //   window.location.reload();
  // }, [location]);
  return (
    <StyledLoginContainer>
      <StyledRowContainer height={10}>
        <PublicNavBar />
      </StyledRowContainer>

      <StyledRowContainer height={90}>
        <StyledRow>
          <StyledColumn
            style={{
              padding: "0 5% 0 5%",
              // border: "1px solid black",
              // display: "flex",
              // justifyContent: "center",
            }}
            xs={{ span: 24 }}
            md={{ span: 14 }}
            lg={{ span: 12 }}
            xl={{ span: 12 }}
          >
            <StyledContainer
              marginBottom={0}
              // style={{ border: "1px solid black" }}
            >
              <StyledSubHeading>
                <b>MEET YOUR COMPANY'S</b>
              </StyledSubHeading>
              <StyledHeading>
                FINANCE
                <br />
                DEPARTMENT
              </StyledHeading>
              <StyledSubHeading>
                Organize your finances, maximize your performance, track your
                performance with ease
              </StyledSubHeading>
              <Row
                // justify="center"
                gutter={8}
                style={{
                  // border: "1px solid black",
                  // width: "70%",
                  // margin: "auto",
                  padding: "20px 0 0 0",
                }}
              >
                <Col
                  xs={{ span: 24 }}
                  sm={{ span: 16 }}
                  md={{ span: 8 }}
                  lg={{ span: 8 }}
                >
                  <StyledButton
                    style={{
                      // marginRight: "3%",
                      height: "35px",
                      fontSize: "12px",
                    }}
                    type="primary"
                    htmlType="submit"
                    inverse={true}
                  >
                    More Details
                  </StyledButton>
                </Col>
                <Col
                  xs={{ span: 24 }}
                  sm={{ span: 16 }}
                  md={{ span: 8 }}
                  lg={{ span: 8 }}
                >
                  <Link to="/signup">
                    <StyledButton
                      style={{ height: "35px", fontSize: "12px" }}
                      type="primary"
                      htmlType="submit"
                    >
                      Sign Up
                    </StyledButton>
                  </Link>
                </Col>
              </Row>
            </StyledContainer>
          </StyledColumn>
          <StyledColumn
            style={{
              backgroundImage: `url(${Eclipses})`,
              backgroundSize: "cover",
              height: "100%",
            }}
            xs={{ span: 0 }}
            md={{ span: 10 }}
            lg={{ span: 12 }}
            xl={{ span: 12 }}
          ></StyledColumn>
        </StyledRow>
      </StyledRowContainer>
    </StyledLoginContainer>
  );
};

export default Index;
