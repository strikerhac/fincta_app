import { Col, Row, Button } from "antd";
import styled from "styled-components";

export const StyledStatementTop = styled.div`
  width: 100%;
  /* display: flex;
  justify-content: space-between; */
  padding: 0 20px 10px 20px;
`;
export const StyledFooter = styled.div`
  height: 0vh;
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;
export const StyledHeading = styled.div`
  font-size: 22px;
  font-weight: bold;
`;
export const StyledRowDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 20px 5px 20px;
  border-bottom: 1px solid #d3d3d3;
`;
export const StyledSpan = styled.span`
  font-size: ${(props) => (props.size ? props.size : "14px")};
  font-weight: ${(props) => (props.weight ? props.weight : "normal")};
  color: ${(props) => (props.color ? props.color : "black")};
  margin-left: ${(props) => (props.mL ? props.mL : "0")}; ;
`;
export const StyledDiv = styled.div`
  width: ${(props) => (props.width ? props.width : "19%")};
  padding-top: 20px;
  text-align: center;
`;
export const StyledHeadingDiv = styled.div`
  border-top: ${(props) => (props.bT ? "1px solid grey" : "")};
  background-color: ${(props) => (props.bgColor ? props.bgColor : "#e3f1ff")};
  padding: 7px 20px 7px 20px;
`;
export const StyledSubHeadingDiv = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => (props.color ? props.color : "#f8f8ff")};
  padding: 7px 20px 7px 20px;
  margin-bottom: ${(props) => (props.mB ? props.mB : "20px")};
`;

export const StyledButton2 = styled(Button)`
  font-size: 12px;
  border-radius: ${(props) =>
    props.pos === "left" ? "20px 0 0 20px" : "0 20px 20px 0"};
  width: 100px;
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
  padding: 5px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

export const StyledDashboardContainer = styled(Row)`
  background-color: white;
`;

export const StyledDashboardColumn = styled(Col)`
  padding: 0 0 0 5%;
`;
