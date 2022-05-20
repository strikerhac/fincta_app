import styled from "styled-components";
import { Form, Input, Button } from "antd";
import { Link } from "react-router-dom";

export const StyledButton = styled(Button)`
  font-size: 12px;
  width: 100%;
  height: 2rem;
  font-family: ${(props) => props.theme.fontFamily.primary} !important;
  font-weight: bolder;
  background-color: ${(props) =>
    props.inverse ? props.theme.colors.default : props.theme.colors.secondary};
  border-color: ${(props) => props.theme.colors.secondary};
  color: ${(props) =>
    props.inverse ? props.theme.colors.secondary : props.theme.colors.default};
  border-radius: 10px;
  padding: 3px 2rem 0 2rem;
  &:focus,
  &:hover {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
      rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    background-color: ${(props) =>
      props.inverse
        ? props.theme.colors.default
        : props.theme.colors.secondary};
    border-color: ${(props) => props.theme.colors.secondary};
    color: ${(props) =>
      props.inverse
        ? props.theme.colors.secondary
        : props.theme.colors.default};
  }
`;
