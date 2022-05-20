import styled from "styled-components";
import { Form, Input, Button } from "antd";
import { Link } from "react-router-dom";

export const StyledPassword = styled(Input.Password)`
  font-family: ${(props) => props.theme.fontFamily.primary} !important;
  height: 1.7rem;
  width: 100%;
  background-color: ${(props) => props.theme.colors.default};
  border-radius: 5px;
  box-shadow: 0 0 0 1.5px #ddd;
  margin-top: 5px;
  input {
    font-size: 11px;
    font-family: ${(props) => props.theme.fontFamily.primary} !important;
    background-color: ${(props) => props.theme.colors.default} !important;
  }
`;

export const StyledInput = styled(Input)`
  font-size: 11px;
  font-family: ${(props) => props.theme.fontFamily.primary} !important;
  height: 30px;
  width: 100%;
  background-color: ${(props) => props.theme.colors.default};
  border-radius: 5px;
  box-shadow: 0 0 0 1.5px #ddd;
  margin-top: 5px;
`;
