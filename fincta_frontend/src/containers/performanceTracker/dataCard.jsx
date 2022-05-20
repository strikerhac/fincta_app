import React from "react";
import { Col, Row } from "antd";
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
} from "recharts";
import styled from "styled-components";

function dataCard(props) {
  return (
    <StyledDashboardColumn
      height={30}
      xs={{ span: 24 }}
      sm={{ span: 24 }}
      md={{ span: 12 }}
      lg={{ span: 10 }}
    >
      <StyledCard>
        <Row style={{ width: "100%" }}>
          <Col
            xs={{ span: 16 }}
            sm={{ span: 16 }}
            md={{ span: 14 }}
            lg={{ span: 10 }}
          >
            <div>
              <span
                style={{
                  fontSize: "clamp(12px,2.5vw, 15px",
                  fontWeight: "bolder",
                }}
              >
                {props.metaData.heading}
              </span>
              <br />
              <span style={{ fontSize: "clamp(12px, 2.5vw, 15px" }}>
                {props.metaData.subHeading}
              </span>
              <br />
              <span style={{ fontSize: "clamp(14px,2.5vw,  18px" }}>
                {props.metaData.value} {props.metaData.unit}
              </span>
              <br />
              <span
                style={{ fontSize: "clamp(12px,2.5vw, 15px", color: "red" }}
              >
                {props.metaData.change}
              </span>
            </div>
          </Col>
          <Col
            style={{ height: "25vh" }}
            xs={{ span: 8 }}
            sm={{ span: 8 }}
            md={{ span: 10 }}
            lg={{ span: 14 }}
          >
            <ResponsiveContainer>
              <AreaChart
                data={props.data}
                width={730}
                height={250}
                margin={{ top: 15, right: 0, left: 0, bottom: 20 }}
              >
                <CartesianGrid
                  strokeDasharray="0"
                  strokeOpacity={0}
                  vertical={false}
                />
                <defs>
                  <linearGradient id="linear2" gradientTransform="rotate(90)">
                    <stop offset="0%" stop-color="#EB8933" stopOpacity={0.2} />
                    <stop offset="90%" stop-color="#EB8933" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#EB8933"
                  strokeWidth={2}
                  fill="url(#linear2)"
                />
                <XAxis dataKey="name" hide={true} />
                <YAxis hide={true} />
                <Tooltip />
              </AreaChart>
            </ResponsiveContainer>
          </Col>
        </Row>
      </StyledCard>
    </StyledDashboardColumn>
  );
}

const StyledCard = styled.div`
  height: 100%;
  background-color: white;
  border-radius: 20px;
  padding: 20px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

const StyledDashboardContainer = styled(Row)`
  background-color: #f8f8ff;
`;

const StyledDashboardColumn = styled(Col)`
  height: ${(props) => (props.height ? props.height : "")}vh;
  padding: 10px;
`;
export default dataCard;
