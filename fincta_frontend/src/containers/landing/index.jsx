import React, { useContext, useState } from "react";
import { Menu, Button, Row, Col } from "antd";
import {
  Link,
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import {
  ApiOutlined,
  AppstoreOutlined,
  QuestionCircleOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
  BackwardOutlined,
} from "@ant-design/icons";
import {
  StyledDashboardContainer,
  StyledDashboardColumn,
} from "../dashboard/styles/main.styles";
import { NavIcons } from "../globalComponents/globalComponents";
import Dashboard from "../dashboard";
import PerformanceTracker from "../performanceTracker";
import FinancialStatements from "../financialStatements";
import IncomeStatement from "../financialStatements/IncomeStatement/index";
import BalanceSheet from "../financialStatements/balanceSheet";
import CashFlowStatement from "../financialStatements/cashFlowStatement";
import Transactions from "../transactions";
import Income from "../transactions/income";
import Expense from "../transactions/expense";
import Asset from "../transactions/asset";
import Liability from "../transactions/liability";
import Inventory from "../transactions/asset/inventory";
import FixedAssets from "../transactions/asset/fixed";
import Receivable from "../transactions/asset/receivable";
import InventoryTransaction from "../transactions/asset/inventoryTransaction";
import AssetTransaction from "../transactions/asset/assetTransaction";
import Payable from "../transactions/liability/payable";
import Loan from "../transactions/liability/loan";
import LoanInstallment from "../transactions/liability/loanInstallment";
import Calculators from "../calculators";
import { StyledImage } from "../../components/image/main.styles";
import Logo from "../../resources/Logo.png";
import { ModalContext } from "../../App";
import MemberModal from "../adminPanel/modals/member";
import FeedbackModal from "../adminPanel/modals/feedback";

const Index = (props) => {
  const history = useHistory();
  const location = useLocation();

  const [visibleMemberModal, SetVisibleMemberModal] = useState(false);
  const [visibleFeedbackModal, SetVisibleFeedbackModal] = useState(false);
  // const [menuKey, SetMenuKey] = useState("");
  let menuKey = "/dashboard";
  const asyncLocalStorage = {
    setItem: function (key, value) {
      return Promise.resolve().then(function () {
        localStorage.setItem(key, value);
      });
    },
    getItem: function (key) {
      return Promise.resolve().then(function () {
        return localStorage.getItem(key);
      });
    },
    removeItem: function (key) {
      return Promise.resolve().then(function () {
        return localStorage.removeItem(key);
      });
    },
  };

  // const { visible, setVisible } = useContext(ModalContext);
  const showModal = () => {
    SetVisibleFeedbackModal(!visibleFeedbackModal);
  };

  const closeModal = () => {
    SetVisibleMemberModal(false);
  };
  const closeFeedbackModal = () => {
    SetVisibleFeedbackModal(false);
  };
  const handleClick = (e) => {
    console.log("click ", e);
    menuKey = e.key;
    // history.push(e.key);
  };
  return (
    <Row style={{ height: "100vh" }}>
      <Col
        style={{
          position: "fixed",
          zIndex: "9999",
          height: "100%",
          overflow: "auto",
        }}
        xs={{ span: 4 }}
        md={{ span: 2 }}
        lg={{ span: 2 }}
        xl={{ span: 2 }}
      >
        <Row style={{ height: "100%" }}>
          <Col style={{ height: "20%", padding: "50px 30px 0 30px" }}>
            <Link to="/">
              <StyledImage
                style={{ width: "100%", height: "20px" }}
                src={Logo}
              ></StyledImage>
            </Link>
          </Col>
          <Col style={{ height: "60%", paddingTop: "30%" }}>
            <Menu
              style={{
                height: "100%",
                width: "100%",
                fontSize: "12px",
              }}
              // onClick={handleClick}
              defaultSelectedKeys={["/dashboard"]}
              selectedKeys={[`/${location.pathname.split("/")[1]}`]}
              // selectedKeys={[location.pathname]}
              mode="inline"
              inlineCollapsed={true}
            >
              <Menu.Item
                key="/dashboard"
                icon={<PieChartOutlined />}
                onClick={() => history.push("/dashboard")}
              >
                Dashboard
              </Menu.Item>
              <Menu.Item
                key="/performance"
                icon={<DesktopOutlined />}
                onClick={() => history.push("/performance")}
              >
                Performance Tracker
              </Menu.Item>

              <Menu.Item
                key="/financialStatements"
                icon={<ContainerOutlined />}
                onClick={() => history.push("/financialStatements")}
              >
                Financial Statements
              </Menu.Item>

              <Menu.Item
                key="/transactions"
                icon={<AppstoreOutlined />}
                onClick={() => history.push("/transactions")}
              >
                Transactions
              </Menu.Item>

              <Menu.Item
                key="/calculators"
                icon={<MenuFoldOutlined />}
                onClick={() => history.push("/calculators")}
              >
                Calculators
              </Menu.Item>

              <Menu.Item key="5" icon={<MailOutlined />} onClick={showModal}>
                Feedback
              </Menu.Item>
            </Menu>
          </Col>
          <Col style={{ height: "20%", paddingLeft: "45%", paddingTop: "90%" }}>
            {/* <QuestionCircleOutlined
              style={{ fontSize: "20px" }}
              onClick={() => {
                localStorage.removeItem("fincta_token");
                setTimeout(() => {
                  history.push("/");
                  window.location.reload();
                }, 0);
              }}
            /> */}
          </Col>
        </Row>
      </Col>
      <Col
        xs={{ span: 4 }}
        md={{ span: 2 }}
        lg={{ span: 2 }}
        xl={{ span: 2 }}
      ></Col>
      <Col
        style={{
          overflow: "auto",
          height: "100%",
          width: "100%",
        }}
        xs={{ span: 20 }}
        md={{ span: 22 }}
        lg={{ span: 22 }}
        xl={{ span: 22 }}
      >
        <StyledDashboardContainer
          style={{
            padding: "0px 0 0 0",
            marginBottom: "0px",
            // display: "flex",
            // flexDirection: "column",
            // justifyContent: "space-between",
          }}
        >
          <StyledDashboardColumn
            height={7}
            span={24}
            style={{
              paddingLeft: "1.5%",
            }}
          >
            <Link>
              <div
                onClick={() => {
                  history.goBack();
                }}
                style={{
                  fontSize: "11px",
                  color: "grey",
                  fontWeight: "bolder",
                  padding: "4px 17px 4px 17px",
                  float: "left",
                  backgroundColor: "white",
                  marginTop: "0px",
                  borderRadius: "5px",
                  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                }}
              >
                <BackwardOutlined />
                Back
              </div>
            </Link>
            <NavIcons setVisible={SetVisibleMemberModal} />
          </StyledDashboardColumn>
        </StyledDashboardContainer>
        {visibleMemberModal ? (
          <MemberModal
            setVisible={SetVisibleMemberModal}
            visible={visibleMemberModal}
            close={closeModal}
          />
        ) : null}
        {visibleFeedbackModal ? (
          <FeedbackModal
            setVisible={SetVisibleFeedbackModal}
            visible={visibleFeedbackModal}
            close={closeFeedbackModal}
          />
        ) : null}
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/performance" component={PerformanceTracker} />
        <Route
          exact
          path="/financialStatements"
          component={FinancialStatements}
        />
        <Route
          exact
          path="/financialStatements/incomeStatement"
          component={IncomeStatement}
        />
        <Route
          exact
          path="/financialStatements/balanceSheet"
          component={BalanceSheet}
        />
        <Route
          exact
          path="/financialStatements/cashFlowStatement"
          component={CashFlowStatement}
        />
        <Route exact path="/transactions" component={Transactions} />
        <Route exact path="/transactions/income" component={Income} />
        <Route exact path="/transactions/expense" component={Expense} />
        <Route exact path="/transactions/asset" component={Asset} />
        <Route exact path="/transactions/liability" component={Liability} />
        <Route
          exact
          path="/transactions/asset/inventory"
          component={Inventory}
        />
        <Route
          exact
          path="/transactions/asset/fixedAssets"
          component={FixedAssets}
        />
        <Route
          exact
          path="/transactions/asset/receivable"
          component={Receivable}
        />
        <Route
          exact
          path="/transactions/liability/payable"
          component={Payable}
        />
        <Route exact path="/transactions/liability/loan" component={Loan} />
        <Route
          exact
          path="/transactions/liability/loan/loanInstallments"
          component={LoanInstallment}
        />
        <Route exact path="/calculators" component={Calculators} />
        <Route
          exact
          path="/transactions/asset/inventory/inventoryTransaction"
          component={InventoryTransaction}
        />
        <Route
          exact
          path="/transactions/asset/fixedAssets/assetTransaction"
          component={AssetTransaction}
        />
        {/* <Route exact path="*" component={Dashboard} /> */}
      </Col>
    </Row>
  );
};

export default Index;
