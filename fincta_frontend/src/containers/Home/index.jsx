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
import Landing from "./landing";
import ContactUs from "./contactus";
import Work from "../codersAtWork";

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
      <Route exact path="/" component={Landing} />
      <Route exact path="/contactus" component={ContactUs} />
      <Route exact path="/whyfincta" component={Work} />
      <Route exact path="/products" component={Work} />
      <Route exact path="/pricing" component={Work} />
      <Route exact path="/resources" component={Work} />
    </StyledLoginContainer>
  );
};

export default Index;
