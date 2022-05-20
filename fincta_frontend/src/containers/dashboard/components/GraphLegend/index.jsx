import { StyledContainer, StyledCircle } from "./main.styles";

export const GraphLegend = ({ name, color }) => {
  return (
    <StyledContainer color={color}>
      <div>{name}</div>
      &nbsp; &nbsp;
      <StyledCircle color={color} />
    </StyledContainer>
  );
};
