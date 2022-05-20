import styled from "styled-components";
import { Col, Row } from "antd";

export const StyledDashboardContainer = styled(Row)`
  background-color: #f8f8ff;
  padding: 0 1% 0 1%;
`;

export const StyledDashboardColumn = styled(Col)`
  height: ${(props) => (props.height ? props.height : "")}vh;
  padding: 0.5%;
  padding-bottom: 1%;
`;

export const StyledFlexContainer = styled.div`
  display: flex;
`;

export const StyledHeading = styled.span`
  font-size: 20px;
  font-weight: bold;
`;

export const StyledCard = styled.div`
  height: 100%;
  background-color: white;
  border-radius: 12px;
  padding: 7%;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;
