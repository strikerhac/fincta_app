import React, { useState, useContext, useEffect, useRef } from "react";
import { UserOutlined, DownloadOutlined } from "@ant-design/icons";
import { Col, Row, DatePicker, Avatar, Button, Divider, Select } from "antd";
import styled from "styled-components";
import Build from "./build";
import Acquisition from "./acquisition";
import Equity from "./equity";
import Impression from "./impression";
import Recovery from "./recoveryTime";
import { ModalContext } from "../../App";
import Feedback from "../feedback";
import {
  StyledSpan,
  StyledSubHeadingDiv,
  StyledHeadingDiv,
  StyledDashboardContainer,
  StyledFooter,
  StyledDashboardColumn,
} from "../financialStatements/styles/main.styles";
import {
  UpdateReport,
  Heading,
  Export,
  SummaryDetails,
  SectionHeading,
  SectionTotalRow,
  IncomeCalculator,
  AccountsPeriod,
  // Footer,
} from "../financialStatements/components/components";
import { DropDownOptionsContext } from "../../context/optionsContext";
import ScrollToTop from "../../containers/scrollToTop";

const Index = (props) => {
  const { scrollToTop, setScrollToTop } = useContext(DropDownOptionsContext);
  // In order to gain access to the child component instance,
  // you need to assign it to a `ref`, so we call `useRef()` to get one
  const childRef = useRef();
  const visible = useContext(ModalContext);
  const { Option } = Select;
  const [calType, setCalType] = useState("build");

  const handleChange = (value) => {
    setCalType(value);
    console.log(value);
  };

  const getCalculator = () => {
    if (calType === "build") {
      return <Build ref={childRef} />;
    } else if (calType === "acquisition") {
      return <Acquisition ref={childRef} />;
    } else if (calType === "recovery") {
      return <Recovery ref={childRef} />;
    } else if (calType === "impression") {
      return <Impression ref={childRef} />;
    } else if (calType === "equity") {
      return <Equity ref={childRef} />;
    }
  };

  return (
    <StyledDashboardContainer>
      <StyledDashboardColumn span={24}>
        <br />
        <Heading heading="Calculator" />
      </StyledDashboardColumn>
      <StyledDashboardColumn span={24} style={{ padding: "0 10% 0 5%" }}>
        {/* <UpdateReport /> */}
        <br />
        <StyledCard>
          <Row>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 10 }}
              md={{ span: 5 }}
              lg={{ span: 3 }}
              // style={{ border: "1px solid black" }}
            >
              <div
                style={{
                  textAlign: "left",
                  fontWeight: "bold",
                  fontSize: "14px",
                  fontFamily: "Montserrat",
                }}
              >
                Calculator Type
              </div>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 14 }} md={{ span: 6 }}>
              <Select
                size="small"
                defaultValue="Build or Buy"
                style={{
                  color: "#d3d3d3",
                  width: "100%",
                  borderRadius: "0px",
                  // marginLeft: "30px",
                }}
                onChange={handleChange}
              >
                <Option style={{ border: "white" }} value="build">
                  Build or Buy
                </Option>
                <Option style={{ border: "white" }} value="acquisition">
                  Customer Acquisition Cost
                </Option>
                <Option style={{ border: "white" }} value="recovery">
                  CAC Recovery Time
                </Option>
                <Option style={{ border: "white" }} value="impression">
                  Cost per Impression
                </Option>
                <Option style={{ border: "white" }} value="equity">
                  Equity Capital
                </Option>
              </Select>
            </Col>
          </Row>
        </StyledCard>
      </StyledDashboardColumn>

      <StyledDashboardColumn span={24} style={{ padding: "0 10% 5% 5%" }}>
        {/* <form
          onSubmit={(e) => {
            e.preventDefault();
            childRef.current.calculate();
          }}
        > */}
        {getCalculator()}
        <StyledFooter>
          <StyledButton
            htmlType="submit"
            style={{
              fontWeight: "bolder",
            }}
            inverse={true}
            onClick={() => {
              childRef.current.calculate();
              // window.scrollTo({
              //   top: 100,
              //   left: 100,
              //   behavior: "smooth",
              // });
              // setScrollToTop((prev) => !prev);
            }}
          >
            Calculate
          </StyledButton>
        </StyledFooter>
        <div style={{ marginBottom: "50px" }}></div>
        {/* </form> */}
        {/* <Footer /> */}
      </StyledDashboardColumn>
    </StyledDashboardContainer>
  );
};

// const Footer = () => {
//   return (
//     <StyledFooter>
//       <StyledButton
//         style={{
//           fontWeight: "bolder",
//         }}
//         inverse={true}
//       >
//         Calculate
//       </StyledButton>
//     </StyledFooter>
//   );
// };
const StyledDiv = styled.div`
  width: 20%;
  font-size: 30px;
  font-weight: bold;
  padding: 20px;
  text-align: center;
`;

const StyledButton2 = styled(Button)`
  border-radius: ${(props) =>
    props.pos === "left" ? "20px 0 0 20px" : "0 20px 20px 0"};
  width: 120px;
  background-color: ${(props) => (props.inverse ? "white" : "#151e3d")};
  border-color: ${(props) => (props.inverse ? "#151e3d" : "#151e3d")};
  color: ${(props) => (props.inverse ? "#151e3d" : "white")};
  &:hover {
    background-color: ${(props) => (props.inverse ? "#151e3d" : "white")};
    border-color: ${(props) => (props.inverse ? "#151e3d" : "#151e3d")};
    color: ${(props) => (props.inverse ? "white" : "#151e3d")};
  }
`;

const StyledButton = styled(Button)`
  float: right;
  border-radius: 20px;
  font-size: 15px;
  background-color: ${(props) => (props.inverse ? "white" : "#eed202")};
  border-color: ${(props) => (props.inverse ? "#eed202" : "#fffa5a")};
  color: ${(props) => (props.inverse ? "#eed202" : "white")};
  &:hover {
    background-color: ${(props) => (props.inverse ? "#eed202" : "white")};
    border-color: ${(props) => (props.inverse ? "#fffa5a" : "#eed202")};
    color: ${(props) => (props.inverse ? "white" : "#eed202")};
  }
  &:active {
    color: white;
    background-color: #eed202;
    border-color: #fffa5a;
  }
`;

const StyledCard = styled.div`
  font-size: 12px;
  background-color: #f8f8ff;
  border-radius: 10px;
  padding: 15px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

// const StyledDashboardContainer = styled(Row)`
//   background-color: white;
// `;

// const StyledDashboardColumn = styled(Col)`
//   /* height: ${(props) => (props.height ? props.height : "")}%; */
// `;

export default Index;
