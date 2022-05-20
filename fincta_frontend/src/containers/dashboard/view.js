import { Row, Spin } from "antd";
import {
  MainGraph,
  SecondaryGraph,
  SingleDataDisplayCardColumn,
} from "./components/index";
import {
  StyledHeading,
  StyledDashboardContainer,
  StyledDashboardColumn,
} from "./styles/main.styles";

const View = ({ data, setPeriod, loading }) => {
  return (
    <StyledDashboardContainer gutter={0}>
      {data ? (
        <>
          <StyledDashboardColumn height={7} span={24}>
            <StyledHeading>Dashboard</StyledHeading>
          </StyledDashboardColumn>
          <StyledDashboardColumn
            style={{ padding: "0px" }}
            xs={{ span: 24 }}
            md={{ span: 24 }}
            lg={{ span: 16 }}
            xl={{ span: 16 }}
          >
            <Row>
              <SingleDataDisplayCardColumn name="Inflow" value={data.inflow} />
              <SingleDataDisplayCardColumn
                name="Outflow"
                value={data.outflow}
                inverse={true}
              />
              <SingleDataDisplayCardColumn
                name="Balance"
                value={data.balance}
              />
              <StyledDashboardColumn
                height={70}
                span={24}
                style={{ padding: "0 0.5% 0.5% 0.5%" }}
              >
                <MainGraph data={data.graphData} setPeriod={setPeriod} />
              </StyledDashboardColumn>
            </Row>
          </StyledDashboardColumn>
          <StyledDashboardColumn
            style={{ padding: "0px" }}
            xs={{ span: 24 }}
            md={{ span: 24 }}
            lg={{ span: 8 }}
            xl={{ span: 8 }}
          >
            <Row>
              <StyledDashboardColumn height={41} span={24}>
                <SecondaryGraph
                  data={data.graphData}
                  dataKey={"sales"}
                  title="Sales"
                  subHeading="Happened this month"
                  value={data.sales}
                  percentage={data.salesChange}
                  graphColor="#0092B3"
                />
              </StyledDashboardColumn>
              <StyledDashboardColumn height={41} span={24}>
                <SecondaryGraph
                  data={data.graphData}
                  dataKey={"expense"}
                  title="Expense"
                  subHeading="Incurred this month"
                  value={data.expense}
                  percentage={data.expenseChange}
                  graphColor="#EB8933"
                />
              </StyledDashboardColumn>
            </Row>
          </StyledDashboardColumn>
          <StyledDashboardColumn
            style={{ paddingBottom: "0" }}
            height={4}
            span={24}
          >
            {/* <Footer /> */}
          </StyledDashboardColumn>
        </>
      ) : (
        <Spin tip="Loading..." spinning={loading} />
      )}
    </StyledDashboardContainer>
  );
};

export default View;
