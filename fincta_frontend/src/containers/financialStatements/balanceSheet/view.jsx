import React from "react";
import {
  StyledDashboardContainer,
  StyledDashboardColumn,
} from "./styles/main.styles";
import {
  UpdateReport,
  Heading,
  Export,
  BalanceCalculator,
  SummaryDetails,
  AccountsPeriod,
  SectionHeading,
  SectionTotalRow,
  Footer,
} from "../components/components";

const View = ({
  data,
  getBlock,
  equity,
  totalEquity,
  date,
  setDate,
  handleSubmit,
  summary,
  setSummary,
}) => {
  return (
    <StyledDashboardContainer>
      <StyledDashboardColumn span={24} style={{ padding: "10px 0 10px 5%" }}>
        <Heading heading="Balance Sheet" />
      </StyledDashboardColumn>

      <StyledDashboardColumn span={24} style={{ padding: "0 10% 0 5%" }}>
        {/* <Export /> */}
        <UpdateReport
          setStartDate={setDate}
          handleSubmit={handleSubmit}
          singleDate={true}
        />
        <BalanceCalculator data={data} />
        <SummaryDetails setSummary={setSummary} />
      </StyledDashboardColumn>

      <StyledDashboardColumn span={24} style={{ padding: "0 10% 10% 5%" }}>
        <AccountsPeriod startDate={date} singleDate={true} />
        {getBlock("Assets", data.assets, summary)}
        {getBlock("Liabilities", data.liabilities, summary)}
        <SectionHeading name="Equity" />
        {summary ? null : equity}
        <SectionTotalRow name="Total Equity" value={totalEquity} />
        <Footer setSummary={setSummary} />
        <div style={{ marginBottom: "50px" }}></div>
      </StyledDashboardColumn>
    </StyledDashboardContainer>
  );
};

export default View;
