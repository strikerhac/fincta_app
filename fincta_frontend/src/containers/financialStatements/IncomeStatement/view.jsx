import React from "react";
import {
  StyledDashboardContainer,
  StyledDashboardColumn,
} from "../styles/main.styles";
import {
  UpdateReport,
  Heading,
  Export,
  SummaryDetails,
  SectionHeading,
  SectionTotalRow,
  IncomeCalculator,
  AccountsPeriod,
  Footer,
} from "../components/components";
import { Spin } from "antd";

const View = ({
  loading,
  handleSubmit,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  revenue,
  otherIncome,
  otherExpense,
  data,
  summary,
  setSummary,
  getPdf,
}) => {
  return (
    <StyledDashboardContainer>
      <StyledDashboardColumn span={24} style={{ padding: "10px 0 10px 5%" }}>
        <Heading heading="Profit & Loss" />
      </StyledDashboardColumn>
      {data ? (
        <>
          <StyledDashboardColumn span={24} style={{ padding: "0 10% 0 5%" }}>
            {/* <Export onClickHandler={getPdf} /> */}
            <UpdateReport
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              handleSubmit={handleSubmit}
            />
            <IncomeCalculator data={data} />
            <SummaryDetails setSummary={setSummary} />
          </StyledDashboardColumn>

          <StyledDashboardColumn span={24} style={{ padding: "0 10% 10% 5%" }}>
            <AccountsPeriod startDate={startDate} endDate={endDate} />
            <SectionHeading name="Revenue" />
            {summary ? null : revenue}
            <SectionTotalRow name="Total Revenue" value={data.totalRevenue} />
            <SectionTotalRow
              name="Total Cost of Goods Sold"
              value={data.cogs}
            />
            <SectionTotalRow
              name="Total Gross Profit"
              value={data.grossProfit}
            />
            <SectionHeading name="Other Income" />
            {summary ? null : otherIncome}
            <SectionTotalRow
              name="Total Other Income"
              value={data.totalOtherIncome}
            />
            <SectionHeading name="Other Expense" />
            {summary ? null : otherExpense}
            <SectionTotalRow
              name="Total Other Expense"
              value={data.totalOtherExpense}
            />
            <SectionTotalRow name="Net Profit" value={data.netProfit} />
            <Footer setSummary={setSummary} />
            <div style={{ marginBottom: "50px" }}></div>
          </StyledDashboardColumn>
        </>
      ) : (
        <Spin tip="Loading..." spinning={loading} />
      )}
    </StyledDashboardContainer>
  );
};

export default View;
