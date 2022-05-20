import { Row, Col, Progress } from "antd";
import { StyledCard } from "./main.styles";

export const Footer = () => {
  return (
    <StyledCard>
      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <Row style={{ height: "100%", width: "75%" }}>
          <Col
            xs={{ span: 0 }}
            sm={{ span: 12 }}
            md={{ span: 10 }}
            lg={{ span: 8 }}
            xl={{ span: 8 }}
          >
            <div style={{ fontSize: "12px", paddingTop: "5px" }}>
              <span
                style={{
                  color: "#EB8933",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                54%
              </span>{" "}
              <br />
              Performance Score
            </div>
          </Col>
          <Col
            xs={{ span: 0 }}
            sm={{ span: 12 }}
            md={{ span: 14 }}
            lg={{ span: 16 }}
            xl={{ span: 16 }}
          >
            <div style={{ paddingTop: "20px" }}>
              <Progress
                percent={54}
                showInfo={false}
                size="default"
                strokeColor="#93C572"
                strokeWidth="15px"
              />
            </div>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 0 }}
            // md={{ span: 14 }}
            // lg={{ span: 16 }}
            // xl={{ span: 16 }}
          >
            <div
              style={{
                fontSize: "12px",
                paddingTop: "3px",
                textAlign: "center",
                fontWeight: "bolder",
                color: "#EB8933",
              }}
            >
              {" "}
              Performance
              <br />
              <Progress
                percent={54}
                // showInfo={false}
                size="default"
                strokeColor="#93C572"
                strokeWidth="10px"
              />
            </div>
          </Col>
        </Row>
      </div>
    </StyledCard>
  );
};
