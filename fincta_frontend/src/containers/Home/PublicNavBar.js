import React, { useState } from "react";
import { StyledNavCol } from "./styles/nav.styles";
import { StyledNavHeading } from "../../components/text/main.styles";
import { StyledMenu, StyledMenuItem } from "../../components/menu/main.styles";
import { Menu, Row, Col } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Logo from "../../resources/Logo.png";

const PublicNavBar = (props) => {
  const [current, setCurrent] = useState("mail");

  const handleClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  return (
    <Row style={{ padding: "5px" }}>
      <StyledNavCol xs={{ span: 12 }} md={{ span: 6 }}>
        <Link to="/">
          <img
            src={Logo}
            style={{ height: "30px", width: "90px", marginLeft: "5%" }}
          ></img>
        </Link>
      </StyledNavCol>
      <Col xs={{ span: 4 }} md={{ span: 12 }}>
        <StyledMenu
          onClick={handleClick}
          selectedKeys={[current]}
          mode="horizontal"
        >
          <StyledMenuItem>
            <Link to="/whyfincta">Why Fincta?</Link>
          </StyledMenuItem>
          <StyledMenuItem>
            <Link to="/products">Products</Link>
          </StyledMenuItem>
          <StyledMenuItem>
            <Link to="/pricing">Pricing</Link>
          </StyledMenuItem>
          <StyledMenuItem>
            <Link to="/resources">Resources</Link>
          </StyledMenuItem>
          <StyledMenuItem>
            <Link to="/contactus">Contact Us</Link>
          </StyledMenuItem>
        </StyledMenu>
      </Col>
      <Col
        xs={{ span: 8 }}
        md={{ span: 6 }}
        style={{
          paddingTop: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "right",
          }}
        >
          <Link
            to="/signin"
            style={{
              // color: "black",
              padding: "5px 15px",
              fontWeight: "900",
              fontSize: "12px",
              marginRight: "20px",
            }}
          >
            Log in
          </Link>
          <Link
            to="/signup"
            style={{
              padding: "5px 15px",
              borderRadius: "20px",
              backgroundColor: "#EB8933",
              color: "white",
              fontWeight: "900",
              fontSize: "12px",
              marginRight: "20px",
            }}
          >
            Sign Up
          </Link>
          {/* <SearchOutlined /> */}
        </div>
      </Col>
    </Row>
  );
};

export default PublicNavBar;
