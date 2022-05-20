import React, { useState, useContext } from "react";
import ProductSaleLogo from "../../../resources/images/Product sales.png";
import ServiceLogo from "../../../resources/images/service.png";
import AssetSalesLogo from "../../../resources/images/asset sales.png";
import SubscriptionLogo from "../../../resources/images/subscription.png";
import ProductSale from "./productSale/index";
import Service from "./service/index";
import AssetSale from "./assetSale";
import Subscription from "./subscription";
import Miscellaneous from "./miscellaneous";
import CustomerModal from "../../adminPanel/modals/customer";
import SubscriptionModal from "../../adminPanel/modals/subscription";
import { Link, useHistory } from "react-router-dom";
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
import { transaction } from "../../../utils/constants";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 650, itemsToShow: 3 },
  { width: 768, itemsToShow: 4 },
  { width: 1200, itemsToShow: 4 },
];

function Index(props) {
  const history = useHistory();
  const [visibleModal, setVisibleModal] = useState(false);
  const [modal, setModal] = useState(null);
  const [secondModal, setSecondModal] = useState(null);
  const [visibleSecondModal, setVisibleSecondModal] = useState(false);
  const visible = useContext(ModalContext);
  const { productSale, service, assetSale, subscription, miscellaneous } =
    transaction.income.subAccount;

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
      {secondModal === "Add Customer" ? (
        visibleSecondModal ? (
          <CustomerModal
            setVisible={setVisibleModal}
            visible={visibleModal}
            close={closeModal}
            visibleSecondModal={visibleSecondModal}
            setSecondModal={setSecondModal}
            setVisibleSecondModal={setVisibleSecondModal}
          />
        ) : null
      ) : null}
      {secondModal === "Add Subscription" ? (
        visibleSecondModal ? (
          <SubscriptionModal
            setVisible={setVisibleModal}
            visible={visibleModal}
            close={closeModal}
            visibleSecondModal={visibleSecondModal}
            setSecondModal={setSecondModal}
            setVisibleSecondModal={setVisibleSecondModal}
          />
        ) : null
      ) : null}
      {modal === productSale ? (
        visibleModal ? (
          <ProductSale
            setVisible={setVisibleModal}
            visible={visibleModal}
            close={closeModal}
            visibleSecondModal={visibleSecondModal}
            setSecondModal={setSecondModal}
            setVisibleSecondModal={setVisibleSecondModal}
          />
        ) : null
      ) : null}
      {modal === service ? (
        visibleModal ? (
          <Service
            setVisible={setVisibleModal}
            visible={visibleModal}
            close={closeModal}
            visibleSecondModal={visibleSecondModal}
            setSecondModal={setSecondModal}
            setVisibleSecondModal={setVisibleSecondModal}
          />
        ) : null
      ) : null}
      {modal === assetSale ? (
        visibleModal ? (
          <AssetSale
            setVisible={setVisibleModal}
            visible={visibleModal}
            close={closeModal}
            visibleSecondModal={visibleSecondModal}
            setSecondModal={setSecondModal}
            setVisibleSecondModal={setVisibleSecondModal}
          />
        ) : null
      ) : null}
      {modal === subscription ? (
        visibleModal ? (
          <Subscription
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
          // backgroundColor: "white",
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
            Income
          </span>
        </div>
        <Carousel
          style={{
            height: "400px",
            width: "100%",
            marginTop: "80px",
            display: "flex",
            justifyContent: "space-between",
            zIndex: 10,
          }}
          breakPoints={breakPoints}
        >
          <StyledCard>{card(ProductSaleLogo, productSale)}</StyledCard>
          <StyledCard>{card(ServiceLogo, service)}</StyledCard>
          <StyledCard>{card(AssetSalesLogo, assetSale)}</StyledCard>
          <StyledCard>{card(SubscriptionLogo, subscription)}</StyledCard>
          <StyledCard>{card(SubscriptionLogo, miscellaneous)}</StyledCard>
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
  z-index: 10;
`;

export default Index;
