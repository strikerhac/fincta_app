import styled from "styled-components";

export const StyledCard = styled.div`
  height: 100%;
  background-color: white;
  border-radius: 12px;
  padding: 7%;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const StyledSpan = styled.span`
  font-size: 15px;
  height: 100%;
  font-weight: bolder;
  color: grey;
`;

export const StyledIcon = styled.span`
  font-size: 15px;
  height: 100%;
  color: ${(props) =>
    props.inverse
      ? props.fall
        ? "green"
        : "red"
      : props.fall
      ? "red"
      : "green"};
  margin-left: auto;
`;
// {props.inverse ? (props.fall ? "green" : "red") : (props.fall ? "red" : "green")};
