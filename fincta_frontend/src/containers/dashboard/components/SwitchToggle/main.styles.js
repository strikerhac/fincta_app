import styled from "styled-components";
import { Button } from "antd";

export const StyledToggleContainer = styled.div`
  border-radius: 20px;
  background-color: #f8f8ff;
  margin-left: auto;
  margin-bottom: 20px;
`;

export const StyledToggleButton = styled(Button)`
  padding-top: 0;
  height: 25px;
  font-size: 12px;
  background-color: ${(props) => (props.selected ? "white" : "#f8f8ff")};
  box-shadow: ${(props) =>
    props.selected ? "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" : ""};
  width: ${100 / 3}%;
  border-radius: 20px;
  border-color: ${(props) => (props.selected ? "white" : "#f8f8ff")};
`;
