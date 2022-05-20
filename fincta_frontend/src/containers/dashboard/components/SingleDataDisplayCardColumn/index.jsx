import { StyledDashboardColumn } from "../../styles/main.styles";
import { SingleDataDisplayCard } from "../SingleDataDisplayCard";

export const SingleDataDisplayCardColumn = ({
  name,
  value,
  inverse = false,
}) => {
  return (
    <StyledDashboardColumn
      style={{ padding: "0.2% 0.5% 1% 0.5%" }}
      height={12}
      xs={{ span: 24 }}
      md={{ span: 8 }}
      lg={{ span: 8 }}
      xl={{ span: 8 }}
    >
      <SingleDataDisplayCard name={name} value={value} inverse={inverse} />
    </StyledDashboardColumn>
  );
};
