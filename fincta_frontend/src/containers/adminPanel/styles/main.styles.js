import styled from "styled-components";
import { Col, Button } from "antd";

const StyledButton2 = styled(Button)`
  font-size: 11px;
  height: 1.8rem;
  font-family: ${(props) => props.theme.fontFamily.primary} !important;
  font-weight: bolder;
  color: white;
  background-color: #009dcf;
  border-color: #009dcf;
  border-radius: 10px;
  padding: 3px 20px 0 20px;
  &:focus,
  &:hover {
    background-color: white;
    color: #009dcf;
  }
`;

export const StyledHeadingCol = styled(Col)`
  /* height: 12%; */
  padding: 0;
  text-align: center;
  font-size: 20px;
  font-weight: bolder;
  color: grey;
`;

export const StyledCol = styled(Col)`
  /* height: 82%; */
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
