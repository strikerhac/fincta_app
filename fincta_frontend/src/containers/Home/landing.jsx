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
// import Eclipses from "../../resources/eclipses.png";
import Eclipses from "../../resources/home1.png";
import BigLogo from "../../resources/bigLogo.png";
import { useHistory, useLocation } from "react-router-dom";
import { Row, Col, Input, Button } from "antd";

const Index = (props) => {
  // let location = useLocation();
  // useEffect(() => {
  //   window.location.reload();
  // }, [location]);
  return (
    <Row>
      <Col span={24}>
        <img style={{ width: "100%", height: "auto" }} src={Eclipses}></img>
        <div
          style={{
            backgroundColor: "#FFFDE7",
            height: "70vh",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <p style={{ fontSize: "calc(28px + 2vmin)", fontWeight: "bolder" }}>
            Find Out What Fincta Can Do For You
          </p>
          <p style={{ fontSize: "15px" }}>Join us to reach your goals!</p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                border: "2px solid #E5E4E2",
                borderRadius: "17px",
                padding: "0 0 0 15px",
                backgroundColor: "white",
                width: "30%",
              }}
            >
              <input
                placeholder="Email"
                style={{
                  border: "none",
                  width: "80%",
                  outline: "none",
                  // fontFamily: "montserrat",
                }}
              ></input>
              <Button
                style={{
                  borderRadius: "15px",
                  width: "20%",
                  color: "white",
                  backgroundColor: "#49A7E5",
                  border: "none",
                  height: "30px",
                  fontSize: "13px",
                  fontWeight: "600",
                }}
              >
                JOIN
              </Button>
            </div>
          </div>
        </div>
        <div
          style={
            {
              // backgroundColor: "#FFFDE7",
              // height: "90vh",
            }
          }
        >
          <Row>
            <Col span={9}>
              <img src={BigLogo}></img>
            </Col>
            <Col
              span={5}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div>
                <p style={{ fontWeight: "bold", fontSize: "16px" }}>Product</p>
                <p style={{ fontWeight: "600", fontSize: "16px" }}>Overview</p>
                <p style={{ fontWeight: "600", fontSize: "16px" }}>Pricing</p>
                <p style={{ fontWeight: "600", fontSize: "16px" }}>
                  Contact us
                </p>
              </div>
            </Col>
            <Col
              span={5}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div>
                <p style={{ fontWeight: "bold", fontSize: "16px" }}>
                  Resources
                </p>
                <p style={{ fontWeight: "600", fontSize: "16px" }}>Blog</p>
                <p style={{ fontWeight: "600", fontSize: "16px" }}>
                  Help Center
                </p>
                <p style={{ fontWeight: "600", fontSize: "16px" }}>
                  Guides & Tutorials
                </p>
              </div>
            </Col>
            <Col
              span={5}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div>
                <p style={{ fontWeight: "bold", fontSize: "16px" }}>Company</p>
                <p style={{ fontWeight: "600", fontSize: "16px" }}>About us</p>
                <p style={{ fontWeight: "600", fontSize: "16px" }}>Press Kit</p>
                <p style={{ fontWeight: "600", fontSize: "16px" }}>Careers</p>
              </div>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  );
};

export default Index;
