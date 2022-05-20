import React, { useState } from "react";
import { StyledToggleContainer, StyledToggleButton } from "./main.styles";

export const SwitchToggle = ({ setPeriod }) => {
  const [selected, setSelected] = useState(1);
  return (
    <StyledToggleContainer>
      <StyledToggleButton
        onClick={() => {
          setSelected(1);
          setPeriod("week");
        }}
        selected={1 === selected}
      >
        week
      </StyledToggleButton>
      <StyledToggleButton
        onClick={() => {
          setSelected(2);
          setPeriod("month");
        }}
        selected={2 === selected}
      >
        month
      </StyledToggleButton>
      <StyledToggleButton
        onClick={() => {
          setSelected(3);
          setPeriod("quarter");
        }}
        selected={3 === selected}
      >
        quarter
      </StyledToggleButton>
    </StyledToggleContainer>
  );
};
