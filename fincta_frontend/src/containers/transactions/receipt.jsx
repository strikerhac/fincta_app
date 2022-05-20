import React, { useState, useEffect } from "react";
import { Select, DatePicker, Input } from "antd";
import styled from "styled-components";
import { UploadOutlined } from "@ant-design/icons";

function receipt(props) {
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
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "40px 0 40px 0",
          height: "250px",
        }}
      >
        <div
          style={{
            border: "1px dashed #0084E8",
            width: "30%",
            textAlign: "center",
            padding: "15px",
          }}
        >
          <UploadOutlined style={{ fontSize: "25px" }} />
          <br />
          <br />
          <span style={{ fontWeight: "bold" }}>
            Drag your file here or <a>select a file</a> to upload
          </span>
          <br /> <br />
          <span>
            Files must be 6MB or smaller, and in one of these <br />
            formats: JPG,JPEG,GIF,TIFF,TIF,8MP,PNG, or PDF
          </span>
        </div>
      </div>
    </>
  );
}

export default receipt;
