import React, { useState, useContext, useEffect } from "react";
import {
  UserOutlined,
  DownloadOutlined,
  FilterOutlined,
  SortAscendingOutlined,
  SearchOutlined,
  DeleteOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import {
  Col,
  Row,
  Button,
  Avatar,
  Checkbox,
  Select,
  DatePicker,
  Input,
} from "antd";
import styled from "styled-components";
import Edit from "./edit";
import Receipt from "./receipt";
import { ModalContext } from "../../App";
import Feedback from "../feedback";

function Index(props) {
  const visible = useContext(ModalContext);
  const [edit, setEdit] = useState(true);
  const { Option } = Select;

  function onDateChange(date, dateString) {
    console.log(date, dateString);
  }
  function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
  }
  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  return (
    <div style={{ backgroundColor: "#f8f8ff", height: "100%" }}>
      {visible ? <Feedback /> : null}
      <div style={{ height: "8%" }}>
        <div
          style={{
            paddingTop: "20px",
            width: "6%",
            float: "right",
          }}
        >
          <Avatar size={32} icon={<DownloadOutlined />} />
          &nbsp; &nbsp;
          <Avatar
            style={{
              backgroundColor: "white",
              color: "black",
            }}
            size={32}
            icon={<UserOutlined />}
          />
        </div>
      </div>

      <div
        style={{
          height: "92%",
          margin: "0 1% 0 1%",
          backgroundColor: "white",
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
              fontSize: "30px",
              fontWeight: "bold",
            }}
          >
            Transactions
          </span>
          <div style={{ padding: "5px 0 5px 0" }}>
            <StyledButton
              style={{
                height: "100%",
                width: "150px",
                fontSize: "16px",
                fontWeight: "bolder",
              }}
              inverse={true}
            >
              Add income
            </StyledButton>
            &nbsp;&nbsp;&nbsp;
            <StyledButton
              style={{
                height: "100%",
                width: "150px",
                fontSize: "16px",
                fontWeight: "bolder",
              }}
              inverse={true}
            >
              Add expense
            </StyledButton>
          </div>
        </div>
        <div style={{ paddingTop: "10px" }}>
          <div
            style={{
              width: "18%",
              border: "1px solid #d3d3d3",
            }}
          >
            <Select
              defaultValue="-12.00"
              style={{ color: "#d3d3d3", width: "100%", borderRadius: "0px" }}
              onChange={handleChange}
            >
              <Option style={{ border: "white" }} value="-12.00">
                All accounts &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; -$12.00
              </Option>
            </Select>
          </div>
        </div>
        <div style={{ border: "1px solid #d3d3d3", marginTop: "10px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 20px 10px 20px",
              borderBottom: "1px solid #d3d3d3",
              backgroundColor: "#f8f8ff",
              fontSize: "15px",
              fontWeight: "bold",
              color: "grey",
            }}
          >
            <div>
              <Checkbox onChange={onChange} style={{ color: "grey" }}>
                Select all
              </Checkbox>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "220px",
              }}
            >
              <span
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "60px",
                }}
              >
                <FilterOutlined style={{ paddingTop: "5px" }} />
                <span>Filter</span>
              </span>
              <span
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "50px",
                }}
              >
                <SortAscendingOutlined style={{ paddingTop: "5px" }} />
                <span>Sort</span>
              </span>
              <span
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "65px",
                }}
              >
                <SearchOutlined style={{ paddingTop: "5px" }} />
                <span>Search</span>
              </span>
            </div>
          </div>
          {/* ----------------------------------------------------------------- */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 40px 10px 40px",
              borderBottom: "1px solid #d3d3d3",
              backgroundColor: "#FFFDF3",
              fontSize: "15px",
              fontWeight: "bold",
            }}
          >
            <span>&nbsp; &nbsp;&nbsp; &nbsp;Date</span>
            <span>Description</span>
            <span>Category</span>
            <span>Account</span>
            <span>Amount</span>
            <span>Actions</span>
          </div>
          {/* ------------------------------------------------------------------------ */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 40px 10px 10px",
              borderBottom: "1px solid #d3d3d3",
              backgroundColor: "#f8f8ff",
              fontSize: "15px",
            }}
          >
            <span>
              <Checkbox onChange={onChange} />
              &nbsp; &nbsp; Jul 30, 2021
            </span>
            <span style={{ marginLeft: "-40px" }}>PC EXPESE ACTUAL</span>
            <span style={{ marginLeft: "-50px" }}>Computer Hosting</span>
            <span style={{ marginLeft: "-50px" }}>Cash on Hand</span>
            <span style={{ marginLeft: "-50px" }}>$3.00</span>
            <span>Actions</span>
          </div>
          {/* ------------------------------------------------------------------------ */}
          <div
            style={{
              padding: "10px 0 10px 10px",
              borderBottom: "1px solid #d3d3d3",
              backgroundColor: "white",
              fontSize: "15px",
              fontWeight: "bold",
            }}
          >
            <Button onClick={() => setEdit(true)}>Edit</Button>
            <Button
              onClick={() => setEdit(false)}
              style={{ marginLeft: "10px" }}
            >
              Receipt
            </Button>
          </div>
          {/* ------------------------------------------------------------------------ */}
          {edit ? <Edit /> : <Receipt />}
          {/* ------------------------------------------------------------------------ */}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 30px 10px 10px",
            }}
          >
            <span
              style={{
                color: "grey",
                fontWeight: "bolder",
              }}
            >
              Transaction last modified july 30th, 2021
            </span>
            <div>
              <span
                style={{
                  border: "1px solid #eed202",
                  borderRadius: "30px",
                  padding: "5px",
                }}
              >
                <DeleteOutlined
                  style={{ color: "#eed202", fontSize: "16px" }}
                />
              </span>
              &nbsp;&nbsp;&nbsp;
              <span
                style={{
                  border: "1px solid #eed202",
                  borderRadius: "30px",
                  padding: "5px",
                }}
              >
                <CopyOutlined style={{ color: "#eed202", fontSize: "16px" }} />
              </span>
              &nbsp;&nbsp;&nbsp;
              <StyledButton
                style={{
                  height: "100%",
                  width: "120px",
                  fontSize: "16px",
                  fontWeight: "bolder",
                }}
                inverse={false}
              >
                Save
              </StyledButton>
            </div>
          </div>
          {/* ------------------------------------------------------------------------ */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 40px 10px 10px",
              borderTop: "1px solid #d3d3d3",
              backgroundColor: "white",
              fontSize: "15px",
            }}
          >
            <span>
              <Checkbox onChange={onChange} />
              &nbsp; &nbsp; Jul 30, 2021
            </span>
            <span style={{ marginLeft: "-40px" }}>PC EXPESE ACTUAL</span>
            <span style={{ marginLeft: "-50px" }}>Computer Hosting</span>
            <span style={{ marginLeft: "-50px" }}>Cash on Hand</span>
            <span style={{ marginLeft: "-50px" }}>$3.00</span>
            <span>Actions</span>
          </div>
          {/* ------------------------------------------------------------------------ */}
        </div>
      </div>
    </div>
  );
}

const StyledDashboardContainer = styled(Row)`
  background-color: #f8f8ff;
  height: 100%;
`;
const StyledDashboardColumn = styled(Col)``;
const StyledButton = styled(Button)`
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

export default Index;
