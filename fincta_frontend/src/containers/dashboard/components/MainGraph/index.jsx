import { Row, Col } from "antd";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
} from "recharts";
import { SwitchToggle } from "../SwitchToggle";
import { StyledFlexContainer } from "../../styles/main.styles";
import { StyledCard } from "./main.styles";
import { GraphLegend } from "../GraphLegend";

export const MainGraph = ({ data, setPeriod }) => {
  return (
    <StyledCard>
      <StyledFlexContainer>
        <SwitchToggle setPeriod={setPeriod}></SwitchToggle>
      </StyledFlexContainer>
      <ResponsiveContainer width="100%" height="80%">
        <LineChart
          data={data}
          width={830}
          height={350}
          margin={{ top: 10, right: 0, left: 0, bottom: 20 }}
        >
          <CartesianGrid
            strokeDasharray="4 1 2 "
            opacity="0.4"
            vertical={false}
          />
          <XAxis dataKey="name" hide={true} />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickCount={10}
            interval="preserveEnd"
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="revenue"
            dot={false}
            stroke="#0092B3"
            strokeWidth={3}
          />
          <Line
            type="monotone"
            dataKey="profit"
            dot={false}
            stroke="#EB8933"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
      <Row>
        <Col
          xs={{ span: 12 }}
          sm={{ span: 12 }}
          md={{ span: 12 }}
          lg={{ span: 12 }}
          xl={{ span: 24 }}
        >
          <GraphLegend name="Revenue" color="#0092B3" />
        </Col>
        <Col
          xs={{ span: 12 }}
          sm={{ span: 12 }}
          md={{ span: 12 }}
          lg={{ span: 12 }}
          xl={{ span: 24 }}
        >
          <GraphLegend name="Profit" color="#EB8933" />
        </Col>
      </Row>
    </StyledCard>
  );
};
