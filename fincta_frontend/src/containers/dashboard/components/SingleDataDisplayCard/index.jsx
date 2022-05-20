import { RiseOutlined, FallOutlined } from "@ant-design/icons";
import { StyledFlexContainer } from "../../styles/main.styles";
import { StyledCard, StyledSpan, StyledIcon } from "./main.styles";

export const SingleDataDisplayCard = ({ name, value, inverse }) => {
  let fall = value <= 0 ? true : false;
  let currency = localStorage.getItem("fincta_currency");
  return (
    <StyledCard>
      <StyledFlexContainer>
        <StyledSpan>{name}</StyledSpan>
        <StyledIcon fall={fall} inverse={inverse}>
          {value <= 0 ? <FallOutlined /> : <RiseOutlined />} &nbsp; {value}
          &nbsp;<span style={{ fontSize: "12px" }}>{currency}</span>
        </StyledIcon>
      </StyledFlexContainer>
    </StyledCard>
  );
};
