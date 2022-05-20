import styled from "styled-components";

export const StyledContainer = styled.div`
  display: flex;
  margin-left: auto;
  color: ${(props) => props.color};
  font-weight: 400;
  font-size: 12px;
  justify-content: right;
  margin-bottom: 10px;
`;

export const StyledCircle = styled.div`
  margin-top: 2px;
  border: 1px solid black;
  border-radius: 100px;
  height: 15px;
  width: 15px;
  background-color: ${(props) => props.color};
  border-color: ${(props) => props.color};
`;
