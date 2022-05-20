import { Col, Row, Button } from "antd";
import styled from "styled-components";

export const StyledDiv = styled.div`
  width: 20%;
  font-size: 30px;
  font-weight: bold;
  padding: 20px;
  text-align: center;
`;

export const StyledButton2 = styled(Button)`
  border-radius: ${(props) =>
    props.pos === "left" ? "20px 0 0 20px" : "0 20px 20px 0"};
  width: 120px;
  background-color: ${(props) => (props.inverse ? "white" : "#151e3d")};
  border-color: ${(props) => (props.inverse ? "#151e3d" : "#151e3d")};
  color: ${(props) => (props.inverse ? "#151e3d" : "white")};
  &:hover {
    background-color: ${(props) => (props.inverse ? "#151e3d" : "white")};
    border-color: ${(props) => (props.inverse ? "#151e3d" : "#151e3d")};
    color: ${(props) => (props.inverse ? "white" : "#151e3d")};
  }
`;

export const StyledButton = styled(Button)`
  float: right;
  border-radius: 20px;
  font-size: 12px;
  background-color: ${(props) => (props.inverse ? "white" : "#eed202")};
  border-color: ${(props) => (props.inverse ? "#eed202" : "#fffa5a")};
  color: ${(props) => (props.inverse ? "#eed202" : "white")};
  &:hover {
    background-color: ${(props) => (props.inverse ? "#eed202" : "white")};
    border-color: ${(props) => (props.inverse ? "#fffa5a" : "#eed202")};
    color: ${(props) => (props.inverse ? "white" : "#eed202")};
  }
  &:active {
    color: white;
    background-color: #eed202;
    border-color: #fffa5a;
  }
`;

export const StyledCard = styled.div`
  font-size: 12px;
  background-color: #f8f8ff;
  border-radius: 10px;
  padding: 15px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

export const StyledDashboardContainer = styled(Row)`
  background-color: white;
`;

export const StyledDashboardColumn = styled(Col)``;
