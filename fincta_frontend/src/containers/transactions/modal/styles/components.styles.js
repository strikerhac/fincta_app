import styled from "styled-components";
import { Input, Slider, InputNumber } from "antd";

export const StyledDiv = styled.div`
  width: ${(props) => `${props.width}%`};
  font-size: 14px;
  color: grey;
  padding-bottom: ${(props) => `${props.pB}px`};
`;

export const StyleAnchor = styled.a`
  font-size: 14px;
  font-weight: bolder;
`;

export const StyledFlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const StyledInputNumber = styled(Input)`
  font-size: smaller;
  height: 27px;
  width: ${(props) => `${props.width}%`};
  border-radius: 5px;
`;

export const StyledInput = styled(Input)`
  font-size: smaller;
  height: 27px;
  width: ${(props) => `${props.width}%`};
  border-radius: 5px;
`;
export const StyledSliderInput = styled.div`
  padding: 3px;
  text-align: center;
  border: 1px solid #d7d7c1;
  font-size: smaller;
  height: 27px;
  width: 15%;
  @media (max-width: 500px) {
    width: 20%;
  }
  border-radius: 5px;
`;
export const StyledSlider = styled(Slider)`
  width: 65%;
`;
