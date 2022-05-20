import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Search from "./search";
import { Table, Avatar, Button, Row, Col } from "antd";
import {
  UserOutlined,
  DownloadOutlined,
  BackwardOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import styled from "styled-components";
import RPModal from "../modal/rpModal";
import { DropDownOptionsContext } from "../../../context/optionsContext";

const AssetTransaction = (props) => {
  const history = useHistory();
  const [visibleModal, setVisibleModal] = useState(false);
  const [modal, setModal] = useState(null);
  const { assetTransactions, searchData, setSearchData, getAssetTransactions } =
    useContext(DropDownOptionsContext);
  let [sortedInfo, setSortedInfo] = useState(null);
  let [filteredInfo, setFilteredInfo] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  let [searchValue, setSearchValue] = useState(null);

  useEffect(() => {
    let assetIds = localStorage.getItem("assetIds");
    if (assetIds) {
      getAssetTransactions(JSON.parse(assetIds));
    }
  }, []);

  const closeModal = () => {
    setVisibleModal(false);
  };

  const handleSeedInput = (e) => {
    let filteredSuggestions = assetTransactions.filter(
      (d) =>
        JSON.stringify(d)
          .replace(" ", "")
          .toLowerCase()
          .indexOf(e.target.value.toLowerCase()) > -1
    );
    setSearchData(filteredSuggestions);
  };

  const onSelectChange = (selectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selection: Table.SELECTION_ALL,
  };
  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  sortedInfo = sortedInfo || {};
  filteredInfo = filteredInfo || {};
  const columns = [
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) => a.createdAt.length - b.createdAt.length,
      sortOrder: sortedInfo.columnKey === "createdAt" && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      sorter: (a, b) => a.description.length - b.description.length,
      sortOrder: sortedInfo.columnKey === "description" && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: "Paid through bank",
      dataIndex: "bank",
      key: "bank",
      sorter: (a, b) => a.bank.length - b.bank.length,
      sortOrder: sortedInfo.columnKey === "bank" && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: "Paid in cash",
      dataIndex: "cash",
      key: "cash",
      sorter: (a, b) => a.cash.length - b.cash.length,
      sortOrder: sortedInfo.columnKey === "cash" && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: "Payable",
      dataIndex: "payable",
      key: "payable",
      sorter: (a, b) => a.payable.length - b.payable.length,
      sortOrder: sortedInfo.columnKey === "payable" && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: "Purchase Quantity",
      dataIndex: "purchaseQuantity",
      key: "purchaseQuantity",
      sorter: (a, b) => a.purchaseQuantity.length - b.purchaseQuantity.length,
      sortOrder:
        sortedInfo.columnKey === "purchaseQuantity" && sortedInfo.order,
      ellipsis: true,
    },
  ];

  return (
    <div style={{ backgroundColor: "#f8f8ff", height: "93vh" }}>
      {modal === "Received" ? (
        visibleModal ? (
          <RPModal
            title="Received"
            setVisible={setVisibleModal}
            visible={visibleModal}
            close={closeModal}
          />
        ) : null
      ) : null}

      <div
        style={{
          height: "100%",
          margin: "0 1.5% 0 1.5%",
          padding: "1.5% 3% 3% 3%",
          backgroundColor: "white",
          borderRadius: "5px 5px 0px 0px",
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <div
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              color: "grey",
              marginBottom: "10px",
            }}
          >
            Asset Transactions
          </div>
          <Row>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 0 }}
              lg={{ span: 0 }}
              style={{ padding: "0px 0 10px 0" }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                  border: "1px solid grey",
                  borderRadius: "5px",
                  padding: "0 5px 0 5px",
                  height: "100%",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    fontWeight: "bolder",
                    color: "grey",
                    fontSize: "12px",
                  }}
                >
                  All Accounts
                  <span style={{ paddingLeft: "30px", textAlign: "center" }}>
                    $12360.00
                  </span>{" "}
                </div>
              </div>
            </Col>

            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 13 }}
              lg={{ span: 14 }}
            >
              <Search
                searchValue={searchValue}
                handleSeedInput={handleSeedInput}
              />
            </Col>
            <Col
              xs={{ span: 0 }}
              sm={{ span: 0 }}
              md={{ span: 3 }}
              lg={{ span: 4 }}
            ></Col>
            <Col
              xs={{ span: 0 }}
              sm={{ span: 0 }}
              md={{ span: 8 }}
              lg={{ span: 6 }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                  border: "1px solid grey",
                  borderRadius: "5px",
                  padding: "0 5px 0 5px",
                  height: "100%",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    fontWeight: "bolder",
                    color: "grey",
                    fontSize: "12px",
                  }}
                >
                  All Accounts{" "}
                  <span style={{ paddingLeft: "30px", textAlign: "center" }}>
                    $12360.00
                  </span>{" "}
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <Table
          scroll={{ x: 900 }}
          size="small"
          onChange={handleChange}
          // rowSelection={rowSelection}
          columns={columns}
          dataSource={searchData}
          rowKey="_id"
        />
      </div>
    </div>
  );
};

export default AssetTransaction;

const StyledButton = styled(Button)`
  font-size: 10px;
  height: 1.4rem;
  font-family: ${(props) => props.theme.fontFamily.primary} !important;
  font-weight: bolder;
  color: white;
  background-color: #009dcf;
  border-color: #009dcf;
  border-radius: 10px;
  padding: 3px 20px 0 20px;
  &:focus,
  &:hover {
    background-color: white;
    color: #009dcf;
  }
`;
