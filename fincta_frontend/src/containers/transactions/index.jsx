import React, { useState, useContext, useEffect } from "react";
import IncomeLogo from "../../resources/images/Income.png";
import ExpenseLogo from "../../resources/images/expenses.png";
import AssetLogo from "../../resources/images/assets.png";
import LiabilityLogo from "../../resources/images/debt.png";
import Carousel from "react-elastic-carousel";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ModalContext } from "../../App";
import Feedback from "../feedback";
import { transaction } from "../../utils/constants";

const card = (logo, title, url) => {
  return (
    <Link to={url}>
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
    </Link>
  );
};

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 650, itemsToShow: 3 },
  { width: 768, itemsToShow: 4 },
  { width: 1200, itemsToShow: 4, itemsToScroll: 4 },
];

function Index(props) {
  const visible = useContext(ModalContext);

  return (
    <div style={{ backgroundColor: "#f8f8ff", height: "93vh" }}>
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
            Select Category
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
          <StyledCard>
            {card(
              IncomeLogo,
              transaction.income.accountClass,
              "/transactions/income"
            )}
          </StyledCard>
          <StyledCard>
            {card(
              ExpenseLogo,
              transaction.expense.accountClass,
              "/transactions/expense"
            )}
          </StyledCard>
          <StyledCard>
            {card(
              AssetLogo,
              transaction.asset.accountClass,
              "/transactions/asset"
            )}
          </StyledCard>
          <StyledCard>
            {card(
              LiabilityLogo,
              transaction.liability.accountClass,
              "/transactions/liability"
            )}
          </StyledCard>
        </Carousel>
      </div>
    </div>
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

// const StyledCircle = styled.div`
//   margin-top: 7%;
//   height: 40px;
//   width: 40px;
//   border-radius: 20px;
//   background-color: white;
//   box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
// `;

export default Index;
