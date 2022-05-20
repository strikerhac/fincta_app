import React from "react";
import { DatePicker, Divider, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { RightOutlined } from "@ant-design/icons";
import {
  StyledStatementTop,
  StyledDiv,
  StyledCard,
  StyledRowDiv,
  StyledSpan,
  StyledSubHeadingDiv,
  StyledHeadingDiv,
  StyledButton,
  StyledButton2,
  StyledHeading,
  StyledFooter,
} from "../styles/main.styles";
import styled from "styled-components";
import moment from "moment";

let currency = localStorage.getItem("fincta_currency");

export const Heading = ({ heading }) => {
  return <StyledHeading>{heading}</StyledHeading>;
};

export const SectionHeading = ({
  name,
  bgColor = "#e3f1ff",
  bT = true,
  mL = "0px",
}) => {
  return (
    <StyledHeadingDiv bgColor={bgColor} bT={bT}>
      <StyledSpan weight="bold" mL={mL}>
        {name}
      </StyledSpan>
    </StyledHeadingDiv>
  );
};

export const StatementRow = ({
  name,
  value,
  color = "#f8f8ff",
  mL = "0px",
}) => {
  return (
    <StyledRowDiv>
      <StyledSpan color={color} weight="bold" mL={mL}>
        {name}
      </StyledSpan>
      <span style={{ fontSize: "13px" }}>
        {value}&nbsp;{currency}
      </span>
    </StyledRowDiv>
  );
};
export const SectionTotalRow = ({
  name,
  value,
  color = "#f8f8ff",
  mL = "0px",
}) => {
  return (
    <StyledSubHeadingDiv color={color}>
      <StyledSpan weight="bold" mL={mL}>
        {name}
      </StyledSpan>
      <StyledSpan>
        {value}&nbsp;{currency}
      </StyledSpan>
    </StyledSubHeadingDiv>
  );
};

export const SummaryDetails = ({ setSummary }) => {
  return (
    <Divider plain>
      <StyledButton2
        inverse={true}
        pos={"left"}
        onClick={() => {
          setSummary(true);
        }}
      >
        Summary
      </StyledButton2>
      <StyledButton2
        pos={"right"}
        onClick={() => {
          setSummary(false);
        }}
      >
        Details
      </StyledButton2>
    </Divider>
  );
};

export const Footer = ({ setSummary }) => {
  return (
    <StyledFooter>
      <StyledButton
        style={{
          fontWeight: "bolder",
        }}
        inverse={true}
        onClick={() => {
          setSummary(true);
        }}
      >
        Show Summary
      </StyledButton>
    </StyledFooter>
  );
};

const CalDiv = ({ name, value, width = "19%", color = "black" }) => {
  return (
    <StyledDiv width={width}>
      {name ? (
        <StyledSpan style={{ fontSize: "clamp(5px, 3vw, 12px" }}>
          {name}
        </StyledSpan>
      ) : null}
      <br />{" "}
      <StyledSpan
        style={{ fontSize: "clamp(10px, 3vw, 25px" }}
        weight="bold"
        color={color}
      >
        {value}
      </StyledSpan>
    </StyledDiv>
  );
};

export const IncomeCalculator = ({ data }) => {
  return (
    <StyledCalWrapper>
      <CalDiv name="Revenue" value={`${data.totalRevenue} ${currency}`} />
      <CalDiv value="+" width="8%" />
      <CalDiv name="COGS" value={`${data.cogs} ${currency}`} />
      <CalDiv value="+" width="8%" />
      <CalDiv
        name="Other Income"
        value={`${data.totalOtherIncome} ${currency}`}
      />
      <CalDiv value="+" width="8%" />
      <CalDiv
        name="Other Expense"
        value={`${data.totalOtherExpense} ${currency}`}
      />
      <CalDiv value="=" width="8%" />
      <CalDiv
        name="Net Profit"
        value={`${data.netProfit} ${currency}`}
        color={data.netProfit < 0 ? "red" : "green"}
      />
    </StyledCalWrapper>
  );
};

export const BalanceCalculator = ({ data }) => {
  return (
    <StyledCalWrapper>
      <CalDiv name="Assets" value={`${data.totals.totalAssets} ${currency}`} />
      <CalDiv value="=" width="20%" />
      <CalDiv
        name="Liabilities"
        value={`${data.totals.totalLiabilities} ${currency}`}
      />
      <CalDiv value="+" width="20%" />
      <CalDiv name="Equity" value={`${data.totals.totalEquity} ${currency}`} />
    </StyledCalWrapper>
  );
};

export const CashFlowCalculator = ({ data }) => {
  return (
    <StyledCalWrapper>
      <CalDiv
        name="Starting Balance"
        value={`${data.startingBalance} ${currency}`}
      />
      <CalDiv value="+" width="5%" />
      <CalDiv
        name="Operating Activities"
        value={`${data.totalOperatingActivity} ${currency}`}
      />
      <CalDiv value="+" width="5%" />
      <CalDiv
        name="Investing Activities"
        value={`${data.totalInvestingActivity} ${currency}`}
      />
      <CalDiv value="+" width="5%" />
      <CalDiv
        name="Financing Activities"
        value={`${data.totalFinancingActivity} ${currency}`}
      />
      <CalDiv value="=" width="5%" />
      <CalDiv
        name="Ending Balance"
        value={`${data.endingBalance} ${currency}`}
      />
    </StyledCalWrapper>
  );
};

export const AccountsPeriod = ({ startDate, endDate, singleDate = false }) => {
  startDate = new Date(startDate);
  endDate = new Date(endDate);

  return (
    <StyledStatementTop>
      <Row>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 16 }}
          lg={{ span: 19 }}
        >
          <StyledSpan weight="bold">ACCOUNTS</StyledSpan>
        </Col>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 8 }}
          lg={{ span: 5 }}
        >
          <StyledSpan weight="bold">
            {singleDate ? (
              <>
                Date &nbsp;&nbsp;
                <span style={{ float: "right" }}>
                  {startDate.toDateString()}
                </span>
              </>
            ) : (
              <>
                From
                <span style={{ float: "right" }}>
                  {" "}
                  {startDate.toDateString()}
                </span>
                <br />
                To
                <span style={{ float: "right" }}>
                  {endDate?.toDateString()}
                </span>
              </>
            )}
          </StyledSpan>
        </Col>
      </Row>
    </StyledStatementTop>
  );
};

export const Export = ({ onClickHandler }) => {
  return (
    <StyledExportWrapper>
      <StyledButton
        style={{
          fontWeight: "bolder",
          float: "right",
        }}
        onClick={onClickHandler}
        inverse={true}
      >
        Export
      </StyledButton>
    </StyledExportWrapper>
  );
};

export const UpdateReport = ({
  singleDate = false,
  setStartDate,
  setEndDate,
  handleSubmit,
}) => {
  return (
    <StyledCard>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Row>
          <Col xs={{ span: 24 }} sm={{ span: 4 }} md={{ span: 3 }}>
            <StyledUpdateDiv style={{ textAlign: "center" }}>
              Date Range
            </StyledUpdateDiv>{" "}
            &nbsp;
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 6 }} md={{ span: 4 }}>
            <StyledUpdateDiv>
              {/* <span>From: </span> */}
              <DatePicker
                required
                style={{ width: "100%" }}
                size="small"
                defaultValue={moment()}
                onChange={setStartDate}
              />
            </StyledUpdateDiv>
            &nbsp;
          </Col>
          {!singleDate ? (
            <Col xs={{ span: 24 }} sm={{ span: 6 }} md={{ span: 4 }}>
              <StyledUpdateDiv>
                <DatePicker
                  style={{ width: "100%" }}
                  size="small"
                  defaultValue={moment()}
                  onChange={setEndDate}
                />
              </StyledUpdateDiv>
              &nbsp;
            </Col>
          ) : (
            <Col xs={{ span: 0 }} sm={{ span: 6 }} md={{ span: 4 }}></Col>
          )}
          <Col
            xs={{ span: 24 }}
            sm={{ span: 6, offset: 2 }}
            md={{ span: 5, offset: 8 }}
          >
            <StyledUpdateDiv>
              <StyledButton htmlType="submit" style={{ width: "100%" }}>
                Update Report
              </StyledButton>
            </StyledUpdateDiv>
          </Col>
        </Row>
      </form>
    </StyledCard>
  );
};

export const StatementIndexCard = ({
  heading,
  subHeading,
  link,
  border = true,
}) => {
  return (
    <div
      style={{
        display: "flex",
        paddingTop: "30px",
        paddingBottom: "10px",
        borderBottom: "3px solid #D8D8D8",
      }}
    >
      <div
        style={{
          fontSize: "14px",
          fontFamily: "montserrat",
          width: "90%",
          color: "#707070",
        }}
      >
        <span
          style={{
            fontSize: "15px",
            fontWeight: "bolder",
            color: "#707070",
          }}
        >
          {heading}
        </span>{" "}
        <br /> {subHeading}
      </div>
      <Link to={link} style={{ paddingTop: "30px", width: "10%" }}>
        <RightOutlined
          style={{
            marginTop: "-20px",
            fontSize: "20px",
            color: "#0092B3",
            // color: "#707070",
            float: "right",
          }}
        />
      </Link>
    </div>
  );
};

const StyledUpdateDiv = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const StyledExportWrapper = styled.div`
  height: 5vh;
  margin: 0 0 10px 0;
`;

const StyledCalWrapper = styled.div`
  display: flex;
`;
