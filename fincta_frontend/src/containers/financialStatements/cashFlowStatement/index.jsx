import React, { useState, useEffect } from "react";
import {
  UpdateReport,
  Heading,
  Export,
  SectionHeading,
  StatementRow,
  SectionTotalRow,
  CashFlowCalculator,
  SummaryDetails,
  AccountsPeriod,
  Footer,
} from "../components/components";
import {
  StyledDashboardContainer,
  StyledDashboardColumn,
} from "./styles/main.styles";
import axios, { baseUrl } from "../../../utils/axios";
import { Spin } from "antd";

const Index = (props) => {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(false);

  const [data, setData] = useState({
    operating: {},
    totalOperatingActivity: 0,

    investing: {},
    totalInvestingActivity: 0,

    financing: {},
    totalFinancingActivity: 0,
    startingBalance: 0,
    endingBalance: 0,
  });

  const [operating, setOperating] = useState([]);
  const [investing, setInvesting] = useState([]);
  const [financing, setFinancing] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    fillRenderArrays(data);
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    await axios
      .get(`${baseUrl}/getters/cashFlowStatement/${startDate}/${endDate}`)
      .then((res) => {
        console.log(res);
        setData(res.data);
        fillRenderArrays(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const fillRenderArrays = (data) => {
    let tempOperating = [];
    let tempInvesting = [];
    let tempFinancing = [];
    for (const [key, value] of Object.entries(data["operating"])) {
      tempOperating.push(
        <StatementRow
          name={key}
          value={value < 0 ? value * -1 : value}
          color="#009dcf"
        />
      );
    }

    for (const [key, value] of Object.entries(data["investing"])) {
      tempInvesting.push(
        <StatementRow
          name={key}
          value={value < 0 ? value * -1 : value}
          color="#009dcf"
        />
      );
    }

    for (const [key, value] of Object.entries(data["financing"])) {
      tempFinancing.push(
        <StatementRow
          name={key}
          value={value < 0 ? value * -1 : value}
          color="#009dcf"
        />
      );
    }

    setOperating(tempOperating);
    setFinancing(tempFinancing);
    setInvesting(tempInvesting);
  };

  return (
    <StyledDashboardContainer>
      <StyledDashboardColumn span={24} style={{ padding: "10px 0 10px 5%" }}>
        <Heading heading="Cash Flow Statement" />
      </StyledDashboardColumn>

      {data ? (
        <>
          <StyledDashboardColumn span={24} style={{ padding: "0 10% 0 5%" }}>
            {/* <Export /> */}
            <UpdateReport
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              handleSubmit={handleSubmit}
            />
            <CashFlowCalculator data={data} />
            <SummaryDetails setSummary={setSummary} />
          </StyledDashboardColumn>

          <StyledDashboardColumn span={24} style={{ padding: "0 10% 10% 5%" }}>
            <AccountsPeriod startDate={startDate} endDate={endDate} />

            <SectionHeading name="Operating Activities" />

            {summary ? null : operating}

            <SectionTotalRow
              name="Total Operating Activities"
              value={data.totalOperatingActivity}
            />

            <SectionHeading name="Investing Activities" />

            {summary ? null : investing}

            <SectionTotalRow
              name="Total Investing Activities"
              value={data.totalInvestingActivity}
            />

            <SectionHeading name="Financing Activities" />

            {summary ? null : financing}

            <SectionTotalRow
              name="Total Financing Activities"
              value={data.totalFinancingActivity}
            />

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

export default Index;
