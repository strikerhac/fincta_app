import React, { useContext } from "react";
import { Col, Row } from "antd";
import styled from "styled-components";
import { ModalContext } from "../../App";
import Feedback from "../feedback";
import { StatementIndexCard } from "./components/components";

const Index = (props) => {
  const visible = useContext(ModalContext);
  return (
    <StyledDashboardContainer>
      {visible ? <Feedback /> : null}
      <StyledDashboardColumn
        xs={{ span: 24 }}
        sm={{ span: 24 }}
        md={{ span: 16 }}
      >
        <div
          style={{
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          Financial Statements
        </div>
        <StyledCard>
          <StatementIndexCard
            heading="Profit & Loss Statement (Income Statement)"
            subHeading="The Profit and Loss for the last fiscal period calculated
              using Revenue and Expenses."
            link="/financialStatements/incomeStatement"
          />

          <StatementIndexCard
            heading="Balance Sheet"
            subHeading="The snapshot of your business as of today,
              detailing Assets, Liabilities and Equity."
            link="/financialStatements/balanceSheet"
          />

          <StatementIndexCard
            heading="Cashflow Statement"
            subHeading="All cash Inflows and Outflows not
              reflected in the Income Statement."
            link="/financialStatements/cashFlowStatement"
            border={false}
          />
        </StyledCard>
      </StyledDashboardColumn>
    </StyledDashboardContainer>
  );
};

const StyledCard = styled.div`
  margin-top: 30px;
  padding: 2% 8% 5% 8%;
  background-color: white;
  border-radius: 20px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

const StyledDashboardContainer = styled(Row)``;

const StyledDashboardColumn = styled(Col)`
  /* height: ${(props) => (props.height ? props.height : "")}vh; */
  padding: 20px;
`;

export default Index;
