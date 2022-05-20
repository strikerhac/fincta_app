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
import Contact from "../../resources/contact.png";

import { useHistory, useLocation } from "react-router-dom";
import { Row, Col, Input, Button } from "antd";

const Index = (props) => {
  // let location = useLocation();
  // useEffect(() => {
  //   window.location.reload();
  // }, [location]);
  return (
    <Row>
      <Col span={12}>
        <div style={{ border: "0px solid black", padding: "18% 0 0 15%" }}>
          <span style={{ fontSize: "28px", fontWeight: "bolder" }}>
            Contact Us
          </span>
          <p>
            Have a project we can help with? Give us a call or reach out to us
            on social media
          </p>
          <br />
          <br />

          <span style={{ fontSize: "18px", fontWeight: "600" }}>Address</span>
          <p>1401 NSTP, NUST, H-13, Islamabad, Pakistan</p>

          <span style={{ fontSize: "18px", fontWeight: "600" }}>
            Call for queries
          </span>
          <p>+92308008080</p>

          <span style={{ fontSize: "18px", fontWeight: "600" }}>Email Us</span>
          <p>hello@fincta.com</p>
        </div>
      </Col>
      <Col
        span={12}
        style={{
          border: "0px solid black",
          display: "flex",
          justifyContent: "center",
          height: "90vh",
          background: `url(${Contact})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "center",
        }}
      >
        {/* <img src={Contact} style={{ position: "fixed" }}></img> */}
        <div
          style={{
            border: "0px solid black",
            width: "55%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginLeft: "10%",
          }}
        >
          <div
            style={{
              border: "0px solid black",
            }}
          >
            <p
              style={{ color: "white", fontSize: "20px", fontWeight: "bolder" }}
            >
              Say Hi
            </p>
            <Input
              placeholder="Full Name"
              style={{ marginBottom: "10px", borderRadius: "7px" }}
            />
            <Input
              placeholder="Email Address"
              style={{ marginBottom: "10px", borderRadius: "7px" }}
            />
            <Input
              placeholder="Company Name"
              style={{ marginBottom: "10px", borderRadius: "7px" }}
            />
            <Input.TextArea
              rows={4}
              placeholder="Message"
              style={{ marginBottom: "10px", borderRadius: "7px" }}
            />
            <Button
              style={{
                backgroundColor: "#F7991B",
                color: "white",
                borderRadius: "15px",
                fontWeight: "bolder",
              }}
            >
              Submit
            </Button>
          </div>
        </div>
      </Col>
      <Col span={24}>
        <div
          style={{
            height: "40vh",
            backgroundColor: "#707070",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            border: "0px solid white",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              border: "0px solid white",
            }}
          >
            <div style={{ width: "30%" }}>
              <span
                style={{
                  color: "white",
                  fontWeight: "500",
                  fontSize: "15px",
                }}
              >
                Subscribe to our news letter
              </span>

              <div
                style={{
                  marginTop: "7px",
                  border: "2px solid #E5E4E2",
                  borderRadius: "17px",
                  padding: "0 0 0 15px",
                  backgroundColor: "white",
                  //   width: "30%",
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
                    fontSize: "13px",
                    fontWeight: "600",
                  }}
                >
                  JOIN
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Index;
