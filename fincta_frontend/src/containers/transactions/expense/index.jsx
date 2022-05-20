import React, { useState, useContext, useEffect } from "react";
import UtilityLogo from "../../../resources/images/Utility.png";
import MarketingLogo from "../../../resources/images/Marketing.png";
import AdminExpenseLogo from "../../../resources/images/Admin expense.png";
import SalaryLogo from "../../../resources/images/Salary.png";
import InventoryDamageLogo from "../../../resources/images/Invnetory damage.png";
import InventoryPurchaseLogo from "../../../resources/images/Inventroy purchase.png";
import RefundLogo from "../../../resources/images/refund.png";
import { Link, useHistory } from "react-router-dom";
import Utility from "./utility";
import Marketing from "./marketing";
import Refund from "./refund";
import Salary from "./salary";
import InventoryPurchase from "./inventoryPurchase";
import AssetPurchase from "./assetPurchase";
import InventoryDamage from "./inventoryDamage";
import Admin from "./admin";
import Miscellaneous from "./miscellaneous";
import {
  UserOutlined,
  DownloadOutlined,
  BackwardOutlined,
} from "@ant-design/icons";
import { Avatar } from "antd";
import styled from "styled-components";
import { ModalContext } from "../../../App";
import Feedback from "../../feedback";
import Carousel from "react-elastic-carousel";
import SupplierModal from "../../adminPanel/modals/supplier";
import EmployeeModal from "../../adminPanel/modals/employee";
import InventoryModal from "../../adminPanel/modals/inventory";
import AssetModal from "../../adminPanel/modals/asset";
import { transaction } from "../../../utils/constants";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 650, itemsToShow: 3 },
  { width: 768, itemsToShow: 4, itemsToScroll: 4 },
  { width: 1200, itemsToShow: 4, itemsToScroll: 4 },
];

function Index(props) {
  const history = useHistory();
  const [visibleModal, setVisibleModal] = useState(false);
  const [modal, setModal] = useState(null);
  const [secondModal, setSecondModal] = useState(null);
  const [visibleSecondModal, setVisibleSecondModal] = useState(false);
  const {
    utility,
    marketing,
    admin,
    salary,
    inventoryDamage,
    inventoryPurchase,
    assetPurchase,
    refund,
    miscellaneous,
  } = transaction.expense.subAccount;
  const visible = useContext(ModalContext);
  const showModal = () => {
    setVisibleModal(true);
  };
  const closeModal = () => {
    setVisibleModal(false);
  };
  const setModalName = (subCategory) => {
    setModal(subCategory);
  };
  const card = (logo, title) => {
    return (
      <a
        onClick={() => {
          setModalName(title);
          showModal();
        }}
      >
        <div
          style={{
            display: "block",
            margin: "auto",
            textAlign: "center",
            padding: "30px",
          }}
        >
          <img
            src={logo}
            style={{
              height: "65%",
              width: "65%",
            }}
          ></img>

          <br />
          <div
            style={{
              paddingTop: "5px",
              fontSize: "14px",
              fontWeight: "bold",
              color: "grey",
            }}
          >
            {title}
          </div>
        </div>
      </a>
    );
  };

  return (
    <div style={{ backgroundColor: "#f8f8ff", height: "93vh" }}>
      {secondModal === "Add Asset" ? (
        visibleSecondModal ? (
          <AssetModal
            setVisible={setVisibleModal}
            visible={visibleModal}
            close={closeModal}
            visibleSecondModal={visibleSecondModal}
            setSecondModal={setSecondModal}
            setVisibleSecondModal={setVisibleSecondModal}
          />
        ) : null
      ) : null}
      {secondModal === "Add Supplier" ? (
        visibleSecondModal ? (
          <SupplierModal
            setVisible={setVisibleModal}
            visible={visibleModal}
            close={closeModal}
            visibleSecondModal={visibleSecondModal}
            setSecondModal={setSecondModal}
            setVisibleSecondModal={setVisibleSecondModal}
          />
        ) : null
      ) : null}
      {secondModal === "Add Employee" ? (
        visibleSecondModal ? (
          <EmployeeModal
            setVisible={setVisibleModal}
            visible={visibleModal}
            close={closeModal}
            visibleSecondModal={visibleSecondModal}
            setSecondModal={setSecondModal}
            setVisibleSecondModal={setVisibleSecondModal}
          />
        ) : null
      ) : null}
      {secondModal === "Add Inventory" ? (
        visibleSecondModal ? (
          <InventoryModal
            setVisible={setVisibleModal}
            visible={visibleModal}
            close={closeModal}
            visibleSecondModal={visibleSecondModal}
            setSecondModal={setSecondModal}
            setVisibleSecondModal={setVisibleSecondModal}
          />
        ) : null
      ) : null}
      {modal === utility ? (
        visibleModal ? (
          <Utility
            setVisible={setVisibleModal}
            visible={visibleModal}
            close={closeModal}
            visibleSecondModal={visibleSecondModal}
            setSecondModal={setSecondModal}
            setVisibleSecondModal={setVisibleSecondModal}
          />
        ) : null
      ) : null}
      {modal === marketing ? (
        visibleModal ? (
          <Marketing
            setVisible={setVisibleModal}
            visible={visibleModal}
            close={closeModal}
            visibleSecondModal={visibleSecondModal}
            setSecondModal={setSecondModal}
            setVisibleSecondModal={setVisibleSecondModal}
          />
        ) : null
      ) : null}
      {modal === admin ? (
        visibleModal ? (
          <Admin
            setVisible={setVisibleModal}
            visible={visibleModal}
            close={closeModal}
            visibleSecondModal={visibleSecondModal}
            setSecondModal={setSecondModal}
            setVisibleSecondModal={setVisibleSecondModal}
          />
        ) : null
      ) : null}
      {modal === salary ? (
        visibleModal ? (
          <Salary
            setVisible={setVisibleModal}
            visible={visibleModal}
            close={closeModal}
            visibleSecondModal={visibleSecondModal}
            setSecondModal={setSecondModal}
            setVisibleSecondModal={setVisibleSecondModal}
          />
        ) : null
      ) : null}
      {modal === inventoryDamage ? (
        visibleModal ? (
          <InventoryDamage
            setVisible={setVisibleModal}
            visible={visibleModal}
            close={closeModal}
            visibleSecondModal={visibleSecondModal}
            setSecondModal={setSecondModal}
            setVisibleSecondModal={setVisibleSecondModal}
          />
        ) : null
      ) : null}
      {modal === inventoryPurchase ? (
        visibleModal ? (
          <InventoryPurchase
            setVisible={setVisibleModal}
            visible={visibleModal}
            close={closeModal}
            visibleSecondModal={visibleSecondModal}
            setSecondModal={setSecondModal}
            setVisibleSecondModal={setVisibleSecondModal}
          />
        ) : null
      ) : null}
      {modal === assetPurchase ? (
        visibleModal ? (
          <AssetPurchase
            setVisible={setVisibleModal}
            visible={visibleModal}
            close={closeModal}
            visibleSecondModal={visibleSecondModal}
            setSecondModal={setSecondModal}
            setVisibleSecondModal={setVisibleSecondModal}
          />
        ) : null
      ) : null}
      {modal === refund ? (
        visibleModal ? (
          <Refund
            setVisible={setVisibleModal}
            visible={visibleModal}
            close={closeModal}
            visibleSecondModal={visibleSecondModal}
            setSecondModal={setSecondModal}
            setVisibleSecondModal={setVisibleSecondModal}
          />
        ) : null
      ) : null}
      {modal === miscellaneous ? (
        visibleModal ? (
          <Miscellaneous
            setVisible={setVisibleModal}
            visible={visibleModal}
            close={closeModal}
            visibleSecondModal={visibleSecondModal}
            setSecondModal={setSecondModal}
            setVisibleSecondModal={setVisibleSecondModal}
          />
        ) : null
      ) : null}
      {visible ? <Feedback /> : null}

      <div
        style={{
          height: "92%",
          margin: "0 1% 0 1%",
          padding: "1.5% 3% 3% 3%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontSize: "25px",
              fontWeight: "bold",
              color: "grey",
            }}
          >
            Expenses
          </span>
        </div>
        <Carousel
          style={{
            height: "400px",
            width: "100%",
            marginTop: "80px",
            display: "flex",
            justifyContent: "space-between",
          }}
          breakPoints={breakPoints}
        >
          {/* <StyledCircle></StyledCircle> */}
          <StyledCard>{card(UtilityLogo, utility)}</StyledCard>
          <StyledCard>{card(MarketingLogo, marketing)}</StyledCard>
          <StyledCard>{card(AdminExpenseLogo, admin)}</StyledCard>
          <StyledCard>{card(SalaryLogo, salary)}</StyledCard>
          {/* <StyledCard>{card(InventoryDamageLogo, inventoryDamage)}</StyledCard> */}
          <StyledCard>
            {card(InventoryPurchaseLogo, inventoryPurchase)}
          </StyledCard>
          <StyledCard>{card(RefundLogo, assetPurchase)}</StyledCard>
          {/* <StyledCard>{card(RefundLogo, refund)}</StyledCard> */}
          {/* <StyledCard>{card(RefundLogo, miscellaneous)}</StyledCard> */}
          {/* <StyledCircle></StyledCircle> */}
        </Carousel>
      </div>
    </div>
    // </div>
  );
}

const StyledCard = styled.div`
  margin: 30px;
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 20px;
  padding: 20px;
  transition: all 0.2s ease-in-out;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  &:hover {
    transform: scale(1.2);
  }
`;

export default Index;
