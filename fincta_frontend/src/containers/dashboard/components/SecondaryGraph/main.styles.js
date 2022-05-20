import styled from "styled-components";

export const StyledCard = styled.div`
  height: 100%;
  background-color: white;
  border-radius: 12px;
  padding: 7%;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  display: flex;
`;

export const StyledInfoContainer = styled.div`
  width: 35%;
`;

export const StyledGraphContainer = styled.div`
  width: 65%;
`;

export const StyledTitle = styled.span`
  font-size: 20px;
`;

export const StyledSubHeading = styled.span`
  font-size: 12px;
`;

export const StyledValue = styled.span`
  font-size: 35px;
`;

export const StyledPercentage = styled.span`
  font-size: 20px;
  color: ${(props) => props.color};
`;
