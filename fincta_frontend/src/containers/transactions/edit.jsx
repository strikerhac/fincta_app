import React, { useState, useEffect } from "react";
import { Select, DatePicker, Input } from "antd";
import styled from "styled-components";

function edit(props) {
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
    <div style={{ height: "250px" }}>
      <div
        style={{
          display: "flex",
          padding: "10px 40px 10px 10px",
          backgroundColor: "white",
        }}
      >
        <div
          style={{
            border: "1px solid #d3d3d3",
            height: "65px",
            borderRadius: "7px",
          }}
        >
          <div style={{ padding: "5px 0 6px 10px", width: "200px" }}>Date</div>
          <DatePicker
            onChange={onDateChange}
            style={{
              border: "white",
              width: "100%",
              borderRadius: "0 0 7px 7px",
            }}
          />
        </div>
        &nbsp;&nbsp;&nbsp;
        <div
          style={{
            border: "1px solid #d3d3d3",
            height: "65px",
            borderRadius: "7px",
          }}
        >
          <div style={{ padding: "5px 0 6px 10px", width: "500px" }}>
            Description
          </div>
          <Input
            style={{
              border: "white",
              width: "100%",
              borderRadius: "0 0 7px 7px",
            }}
            placeholder="Write Description"
          />
        </div>
        &nbsp;&nbsp;&nbsp;
        <div
          style={{
            border: "1px solid #d3d3d3",
            height: "65px",
            borderRadius: "7px",
          }}
        >
          <div style={{ padding: "5px 0 4px 13px", width: "400px" }}>
            Account
          </div>
          <Select
            defaultValue="-12.00"
            style={{ border: "white", width: "100%", color: "#d3d3d3" }}
            onChange={handleChange}
          >
            <Option style={{ border: "white" }} value="-12.00">
              Cash on Hand
            </Option>
          </Select>
        </div>
      </div>
      {/* ----------------------------------------------------------- */}
      <div
        style={{
          display: "flex",
          padding: "0px 40px 10px 10px",
          backgroundColor: "white",
        }}
      >
        <div
          style={{
            border: "1px solid #d3d3d3",
            height: "65px",
            borderRadius: "7px",
          }}
        >
          <div style={{ padding: "5px 0 6px 10px", width: "200px" }}>
            Amount
          </div>
          <Input
            style={{
              border: "white",
              width: "100%",
              borderRadius: "0 0 7px 7px",
            }}
            placeholder="USD"
          />
        </div>
        &nbsp;&nbsp;&nbsp;
        <div
          style={{
            border: "1px solid #d3d3d3",
            height: "65px",
            borderRadius: "7px",
          }}
        >
          <div style={{ padding: "5px 0 4px 13px", width: "250px" }}>
            Category
          </div>
          <Select
            defaultValue="-12.00"
            style={{ border: "white", width: "100%", color: "#d3d3d3" }}
            onChange={handleChange}
          >
            <Option style={{ border: "white" }} value="-12.00">
              Computer - Hosting
            </Option>
          </Select>
        </div>
        &nbsp;&nbsp;&nbsp;
        <div
          style={{
            border: "1px solid #d3d3d3",
            height: "65px",
            borderRadius: "7px",
          }}
        >
          <div style={{ padding: "5px 0 4px 13px", width: "250px" }}>
            Vendor
          </div>
          <Select
            defaultValue="-12.00"
            style={{ border: "white", width: "100%", color: "#d3d3d3" }}
            onChange={handleChange}
          >
            <Option style={{ border: "white" }} value="-12.00">
              Select a vendor
            </Option>
          </Select>
        </div>
        &nbsp;&nbsp;&nbsp;
        <div
          style={{
            border: "1px solid #d3d3d3",
            height: "65px",
            borderRadius: "7px",
          }}
        >
          <div style={{ padding: "5px 0 4px 13px", width: "250px" }}>
            Customer
          </div>
          <Select
            defaultValue="-12.00"
            style={{ border: "white", width: "100%", color: "#d3d3d3" }}
            onChange={handleChange}
          >
            <Option style={{ border: "white" }} value="-12.00">
              Select a customer
            </Option>
          </Select>
        </div>
      </div>
      <div
        style={{
          color: "#0084E8",
          padding: "0px 40px 10px 10px",
          fontWeight: "bolder",
          fontSize: "15px",
        }}
      >
        Remove customer . Remove vendor
      </div>
    </div>
  );
}

export default edit;
