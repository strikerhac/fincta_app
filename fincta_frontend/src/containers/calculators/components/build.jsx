import React, { useState, useEffect, useContext } from "react";
import { Row, Col, Button, Input } from "antd";
import styled from "styled-components";
import {
  StyledRowDiv,
  StyledSpan,
  StyledSubHeadingDiv,
} from "../../financialStatements/styles/main.styles";
import { DropDownOptionsContext } from "../../../context/optionsContext";
import { StyledButton } from "../../../components/button/main.styles";

export const AddRowForm = ({
  description,
  setDescription,
  value,
  setValue,
  add,
  setAddRow,
}) => {
  return (
    <StyledRowDiv>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("in form");
          add(value);
        }}
        style={{
          width: "100%",
        }}
      >
        <Row
          style={{
            width: "100%",
          }}
        >
          <Col
            xs={{ span: 24 }}
            sm={{ span: 8 }}
            style={{ padding: "1px 0 5px 0", textAlign: "center" }}
          >
            <Input
              key="Add Description"
              required
              placeholder={"Add Description"}
              style={{ fontSize: "13px", width: "95%" }}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 8 }}
            style={{ padding: "1px 0 5px 0", textAlign: "center" }}
          >
            <Input
              key="Add amount"
              type="number"
              min="0"
              required
              placeholder={"Add amount"}
              style={{ fontSize: "13px", width: "95%" }}
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
          </Col>
          <Col
            xs={{ span: 12 }}
            sm={{ span: 4 }}
            style={{ textAlign: "center" }}
          >
            <Button
              htmlType="submit"
              style={{
                borderRadius: "5px",
                width: "95%",
                backgroundColor: "green",
                color: "white",
              }}
            >
              Add
            </Button>
          </Col>
          <Col
            xs={{ span: 12 }}
            sm={{ span: 4 }}
            style={{ textAlign: "center" }}
          >
            <Button
              style={{
                backgroundColor: "red",
                color: "white",
                borderRadius: "5px",
                width: "95%",
              }}
              onClick={() => {
                setAddRow(false);
              }}
            >
              Cancel
            </Button>
          </Col>
        </Row>
      </form>
    </StyledRowDiv>
  );
};

export const StatementRow = ({
  name,
  value,
  color = "#f8f8ff",
  mL = "0px",
  setValue,
  required = true,
}) => {
  let currency = localStorage.getItem("fincta_currency");
  return (
    <StyledRowDiv>
      <Row
        style={{
          width: "100%",
        }}
      >
        <Col xs={{ span: 24 }} sm={{ span: 18 }}>
          <StyledSpan color={color} weight="bold" mL={mL}>
            {name}
          </StyledSpan>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 6 }} style={{ display: "flex" }}>
          <Input
            type="number"
            min="0"
            required={required}
            // key={name}
            placeholder={name}
            style={{ fontSize: "13px", width: "80%" }}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              textAlign: "right",
              // border: "1px solid black",
              width: "20%",
            }}
          >
            {currency}
          </div>
        </Col>
      </Row>
    </StyledRowDiv>
  );
};

export const AddedRow = ({
  name,
  value,
  color = "#f8f8ff",
  mL = "0px",
  //   rowKey,
  // overheadRows,
  //   remove,
}) => {
  //   const { overheadValues, setOverheadValues, overheadRows, setOverheadRows } =
  //     useContext(DropDownOptionsContext);
  //   console.log("in added row");
  //   console.log(rowKey);
  return (
    <StyledRowDiv>
      <StyledSpan color={color} weight="bold" mL={mL}>
        {name}
      </StyledSpan>
      <span style={{ fontSize: "13px" }}>{value}</span>
      {/* <button
        id={rowKey}
        onClick={(e) => {
          console.log("in added row remove button");
          console.log(e.target.key);
          remove(e.target.id, overheadRows, setOverheadRows);
        }}
      >
        Remove
      </button> */}
    </StyledRowDiv>
  );
};

export const SectionTotalRow = ({
  name,
  value,
  color = "#f8f8ff",
  mL = "0px",
  setValue,
  unEditable = false,
  type = "number",
}) => {
  let currency = localStorage.getItem("fincta_currency");

  return (
    <StyledSubHeadingDiv color={color}>
      <Row
        style={{
          width: "100%",
        }}
      >
        <Col xs={{ span: 24 }} sm={{ span: 18 }}>
          <StyledSpan weight="bold" mL={mL}>
            {name}
          </StyledSpan>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 6 }} style={{ display: "flex" }}>
          {unEditable ? (
            <Input
              type={type}
              unEditable={unEditable}
              placeholder={name}
              style={{ fontSize: "13px", width: "80%" }}
              value={value}
            />
          ) : (
            <Input
              required
              type={type}
              placeholder={name}
              style={{ fontSize: "13px", width: "80%" }}
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              textAlign: "right",
              // border: "1px solid black",
              width: "20%",
            }}
          >
            {currency}
          </div>
        </Col>
      </Row>
    </StyledSubHeadingDiv>
  );
};
