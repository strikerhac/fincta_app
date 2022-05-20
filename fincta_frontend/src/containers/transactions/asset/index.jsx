import React, { useState, useContext, useEffect } from "react";
import InventoryLogo from "../../../resources/images/Invnetory.png";
import SoftwareLogo from "../../../resources/images/software development.png";
import FixedAssetLogo from "../../../resources/images/fixed assets.png";
import ReceivableLogo from "../../../resources/images/Recieveable.png";
import { Link, useHistory } from "react-router-dom";
import Fixed from "./fixed";
import Software from "./software";
import Inventory from "./inventory";
import Receivable from "./receivable";
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
  { width: 768, itemsToShow: 4, itemsToScroll: 4 },
  { width: 1200, itemsToShow: 4, itemsToScroll: 4 },
];

function Index(props) {
  const history = useHistory();
  const [visibleModal, setVisibleModal] = useState(false);
  const [modal, setModal] = useState(null);
  const visible = useContext(ModalContext);
  const { inventory, software, fixed, receivable, miscellaneous } =
    transaction.asset.subAccount;

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
    );
  };

  const cardWrapper = (logo, title, action = "modal", url) => {
    const cardBody = card(logo, title);
    return (
      <>
        {action === "page" ? (
          <Link to={url}>{cardBody}</Link>
        ) : (
          <a
            onClick={() => {
              setModalName(title);
              showModal();
            }}
          >
            {cardBody}
          </a>
        )}{" "}
      </>
    );
  };

  return (
    <div style={{ backgroundColor: "#f8f8ff", height: "93vh" }}>
      {modal === "Software Development" ? (
        visibleModal ? (
          <Software visible={visibleModal} close={closeModal} />
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
            Assets
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
          <StyledCard>
            {cardWrapper(
              InventoryLogo,
              inventory,
              "page",
              "/transactions/asset/inventory"
            )}
          </StyledCard>
          {/* <StyledCard>{cardWrapper(SoftwareLogo, software)}</StyledCard> */}
          <StyledCard>
            {cardWrapper(
              FixedAssetLogo,
              fixed,
              "page",
              "/transactions/asset/fixedAssets"
            )}
          </StyledCard>
          <StyledCard>
            {cardWrapper(
              ReceivableLogo,
              receivable,
              "page",
              "/transactions/asset/receivable"
            )}
          </StyledCard>
          {/* <StyledCard>{cardWrapper(ReceivableLogo, miscellaneous)}</StyledCard> */}

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
