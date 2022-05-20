import React, { useState, useEffect, useContext } from "react";
import { Col, Row, Spin } from "antd";
import styled from "styled-components";
import DataCard from "./dataCard";
import { ModalContext } from "../../App";
import Feedback from "../feedback";
import axios, { baseUrl } from "../../utils/axios";
import { DropDownOptionsContext } from "../../context/optionsContext";

const Index = (props) => {
  const [data, setData] = useState(null);
  const visible = useContext(ModalContext);
  const [loading, setLoading] = useState(false);
  const { performanceTrackerData, getPerformanceTrackerData } = useContext(
    DropDownOptionsContext
  );

  useEffect(() => {
    const apis = async () => {
      if (!performanceTrackerData) {
        setLoading(true);
        await getPerformanceTrackerData();
        setLoading(false);
      }
      // await axios
      //   .get(`${baseUrl}/getters/performance`)
      //   .then((res) => {
      //     console.log(res);
      //     setData(res.data);
      //     setLoading(false);
      //   })
      //   .catch((err) => {
      //     setLoading(false);
      //     console.log(err);
      //   });
    };
    apis();
  }, []);

  return (
    <StyledDashboardContainer>
      <StyledDashboardColumn height={7} span={24} style={{ paddingTop: "0px" }}>
        <span
          style={{
            fontSize: "clamp(16px,5vw, 25px)",
            fontWeight: "bold",
            padding: "10px",
          }}
        >
          Performance Tracker
        </span>
      </StyledDashboardColumn>
      {performanceTrackerData ? (
        <>
          <Col span={24}>
            <Row justify="center">
              <DataCard
                data={performanceTrackerData.quickRatio}
                metaData={{
                  heading: "Quick Ratio",
                  subHeading: "Assets to Liability",
                  value: `${
                    performanceTrackerData.quickRatio.length
                      ? performanceTrackerData.quickRatio[0].value
                      : "undefined"
                  }`,
                  unit: "Times",
                  change: `${
                    performanceTrackerData.quickRatio[1]
                      ? ((performanceTrackerData.quickRatio[0].value -
                          performanceTrackerData.quickRatio[1].value) /
                          performanceTrackerData.quickRatio[1].value) *
                        100
                      : "undefined"
                  }%`,
                }}
              />
              <DataCard
                data={performanceTrackerData.cashRatio}
                metaData={{
                  heading: "Cash Ratio",
                  subHeading: "Cash to Liability",
                  value: `${
                    performanceTrackerData.cashRatio.length
                      ? performanceTrackerData.cashRatio[0].value
                      : "undefined"
                  }`,
                  unit: "Times",
                  change: `${
                    performanceTrackerData.cashRatio[1]
                      ? ((performanceTrackerData.cashRatio[0].value -
                          performanceTrackerData.cashRatio[1].value) /
                          performanceTrackerData.cashRatio[1].value) *
                        100
                      : "undefined"
                  }%`,
                }}
              />
              <DataCard
                data={performanceTrackerData.grossProfitMargin}
                metaData={{
                  heading: "Gross Profit Margin",
                  subHeading: "Gross Profit on every scale",
                  value: `${
                    performanceTrackerData.grossProfitMargin.length
                      ? performanceTrackerData.grossProfitMargin[0].value
                      : "undefined"
                  }`,
                  unit: "%",
                  change: `${
                    performanceTrackerData.grossProfitMargin[1]
                      ? ((performanceTrackerData.grossProfitMargin[0].value -
                          performanceTrackerData.grossProfitMargin[1].value) /
                          performanceTrackerData.grossProfitMargin[1].value) *
                        100
                      : "undefined"
                  }%`,
                }}
              />
              <DataCard
                data={performanceTrackerData.netProfitMargin}
                metaData={{
                  heading: "Net Profit Margin",
                  subHeading: "Net Profit on every scale",
                  value: `${
                    performanceTrackerData.netProfitMargin.length
                      ? performanceTrackerData.netProfitMargin[0].value
                      : "undefined"
                  }`,
                  unit: "%",
                  change: `${
                    performanceTrackerData.netProfitMargin[1]
                      ? ((performanceTrackerData.netProfitMargin[0].value -
                          performanceTrackerData.netProfitMargin[1].value) /
                          performanceTrackerData.netProfitMargin[1].value) *
                        100
                      : "undefined"
                  }%`,
                }}
              />
              <DataCard
                data={performanceTrackerData.inventoryTurnover}
                metaData={{
                  heading: "Inventory Turnover",
                  subHeading: "how quick the Inventory unit is sold",
                  value: `${
                    performanceTrackerData.inventoryTurnover.length
                      ? performanceTrackerData.inventoryTurnover[0].value
                      : "undefined"
                  }`,
                  unit: "Times",
                  change: `${
                    performanceTrackerData.inventoryTurnover[1]
                      ? ((performanceTrackerData.inventoryTurnover[0].value -
                          performanceTrackerData.inventoryTurnover[1].value) /
                          performanceTrackerData.inventoryTurnover[1].value) *
                        100
                      : "undefined"
                  }%`,
                }}
              />
              <DataCard
                data={performanceTrackerData.currentRatio}
                metaData={{
                  heading: "Current Ratio",
                  subHeading: "Current Assets to Current Liabilities",
                  value: `${
                    performanceTrackerData.currentRatio.length
                      ? performanceTrackerData.currentRatio[0].value
                      : "undefined"
                  }`,
                  unit: "Times",
                  change: `${
                    performanceTrackerData.currentRatio[1]
                      ? ((performanceTrackerData.currentRatio[0].value -
                          performanceTrackerData.currentRatio[1].value) /
                          performanceTrackerData.currentRatio[1].value) *
                        100
                      : "undefined"
                  }%`,
                }}
              />
              <DataCard
                data={performanceTrackerData.marketingExpenseRatio}
                metaData={{
                  heading: "Marketing Expense",
                  subHeading: "Ratio of Marketing Expense",
                  value: `${
                    performanceTrackerData.marketingExpenseRatio.length
                      ? performanceTrackerData.marketingExpenseRatio[0].value
                      : "undefined"
                  }`,
                  unit: "%",
                  change: `${
                    performanceTrackerData.marketingExpenseRatio[1]
                      ? ((performanceTrackerData.marketingExpenseRatio[0]
                          .value -
                          performanceTrackerData.marketingExpenseRatio[1]
                            .value) /
                          performanceTrackerData.marketingExpenseRatio[1]
                            .value) *
                        100
                      : "undefined"
                  }%`,
                }}
              />
              <DataCard
                data={performanceTrackerData.runway}
                metaData={{
                  heading: "Runway",
                  subHeading: "funds to last for",
                  value: `${
                    performanceTrackerData.runway.length
                      ? performanceTrackerData.runway[0].value
                      : "undefined"
                  }`,
                  unit: "Days",
                  change: `${
                    performanceTrackerData.runway[1]
                      ? ((performanceTrackerData.runway[0].value -
                          performanceTrackerData.runway[1].value) /
                          performanceTrackerData.runway[1].value) *
                        100
                      : "undefined"
                  }%`,
                }}
              />
              <DataCard
                data={performanceTrackerData.customerAcquisitionCost}
                metaData={{
                  heading: "Customer Acquisition",
                  subHeading: "single customer acquiring cost",
                  value: `${
                    performanceTrackerData.customerAcquisitionCost.length
                      ? performanceTrackerData.customerAcquisitionCost[0].value
                      : "undefined"
                  }`,
                  unit: "Per Customer",
                  change: `${
                    performanceTrackerData.customerAcquisitionCost[1]
                      ? ((performanceTrackerData.customerAcquisitionCost[0]
                          .value -
                          performanceTrackerData.customerAcquisitionCost[1]
                            .value) /
                          performanceTrackerData.customerAcquisitionCost[1]
                            .value) *
                        100
                      : "undefined"
                  }%`,
                }}
              />
              <DataCard
                data={performanceTrackerData.growthRate}
                metaData={{
                  heading: "Growth Rate",
                  subHeading: "overall growth rate of the business",
                  value: `${
                    performanceTrackerData.growthRate.length
                      ? performanceTrackerData.growthRate[0].value
                      : "undefined"
                  }`,
                  unit: "%",
                  change: `${
                    performanceTrackerData.growthRate[1]
                      ? ((performanceTrackerData.growthRate[0].value -
                          performanceTrackerData.growthRate[1].value) /
                          performanceTrackerData.growthRate[1].value) *
                        100
                      : "undefined"
                  }%`,
                }}
              />
            </Row>
          </Col>
        </>
      ) : (
        <div
          style={{
            paddingTop: "30vh",
            height: "76vh",
            display: "flex",
            justifyContent: "center",
            // border: "1px solid black",
            width: "100%",
          }}
        >
          <Spin tip="Loading..." spinning={loading} />
        </div>
      )}
    </StyledDashboardContainer>
  );
};

const StyledCard = styled.div`
  height: 100%;
  background-color: white;
  border-radius: 20px;
  padding: 20px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

const StyledDashboardContainer = styled(Row)`
  padding: 10px;
  padding-bottom: 50px;
  background-color: #f8f8ff;
`;

const StyledDashboardColumn = styled(Col)`
  height: ${(props) => (props.height ? props.height : "")}vh;
  /* padding: 10px; */
`;

export default Index;
