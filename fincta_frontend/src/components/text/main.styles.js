import styled from "styled-components";
import { Form, Input, Button } from "antd";
import { Link } from "react-router-dom";

export const StyledFormHeading = styled.h2`
  font-family: ${(props) => props.theme.fontFamily.primary} !important;
  color: ${(props) => props.theme.colors.secondary}; ;
`;
export const StyledParagraph = styled.p`
  font-size: 12px;
  font-family: ${(props) => props.theme.fontFamily.primary} !important;
  color: ${(props) => props.theme.colors.defaultText};
`;

export const StyledAnchor = styled.a`
  font-family: ${(props) => props.theme.fontFamily.primary} !important;
  color: ${(props) => props.theme.colors.primary};
  &:hover {
    color: ${(props) => props.theme.colors.default};
  }
`;

export const StyledLink = styled(Link)`
  font-family: ${(props) => props.theme.fontFamily.primary} !important;
  color: ${(props) => props.theme.colors.secondary};
  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }
`;

export const StyledSpan = styled.span`
  font-size: 12px;
  font-family: ${(props) => props.theme.fontFamily.primary} !important;
`;
//----------------------home-----------------------------
export const StyledHeading = styled.h2`
  font-family: ${(props) => props.theme.fontFamily.primary} !important;
  font-size: 30px;
  color: ${(props) => props.theme.colors.primaryText};
  font-weight: bolder;
  /* margin: auto; */
  height: 100%;
  /* width: 70%; */
  @media (max-width: 425px) {
    font-size: 40px;
  }
`;

export const StyledSubHeading = styled.h3`
  font-size: 17px;
  padding: 4px;
  font-family: ${(props) => props.theme.fontFamily.primary} !important;
  color: ${(props) => props.theme.colors.secondaryText} !important;
  /* margin: auto; */
  width: 70%;
`;

//----------------------------------public nav---------------------

export const StyledNavHeading = styled.h2`
  font-family: ${(props) => props.theme.fontFamily.primary} !important;
  padding-top: 8px;
  color: ${(props) => props.theme.colors.primaryText};
  margin: auto;
  text-align: center;
  height: 100%;
`;
