import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Search from "./search";
import { Table, Button, Row, Col } from "antd";
import {
  UserOutlined,
  DownloadOutlined,
  BackwardOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import styled from "styled-components";
import RPModal from "../modal/rpModal";
import axios, { baseUrl } from "../../../utils/axios";
import { transaction } from "../../../utils/constants";
import { DropDownOptionsContext } from "../../../context/optionsContext";

const Payable = (props) => {
  const history = useHistory();
  const {
    payableTransactions,
    setPayableTransactions,
    getPayableTransactions,
    searchData,
    setSearchData,
  } = useContext(DropDownOptionsContext);
  const [visibleModal, setVisibleModal] = useState(false);
  const [modal, setModal] = useState(null);
  const [value, setValue] = useState(1);
  const [record, setRecord] = useState(null);
  let [sortedInfo, setSortedInfo] = useState(null);
  let [filteredInfo, setFilteredInfo] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  let [searchValue, setSearchValue] = useState(null);

  useEffect(() => {
    if (payableTransactions.length === 0) {
      getPayableTransactions();
    }
    setSearchData(payableTransactions);
  }, []);

  const handleSubmit = async () => {
    record.payableFlag = 0;
    await axios
      .put(`${baseUrl}/transactions`, record)
      .then((res) => {
        console.log(res);
        getPayableTransactions();
        // handleResponse();
      })
      .catch((err) => {
        // setLoading(false);
        console.log(err);
      });

    if (value === 1) {
      record.cash = record.payable;
      record.bank = 0;
    } else {
      record.bank = record.payable;
      record.cash = 0;
    }
    // record.setLoading(true);
    record.payableId = record._id;
    record.credit = record.payable;
    record.payable = null;
    record.createdAt = Date.now();
    record.accountClass = transaction.liability.accountClass;
    record.subAccount = transaction.liability.subAccount.payable;
    record.payableFlag = 2;
    delete record._id;

    await axios
      .post(`${baseUrl}/transactions`, record)
      .then((res) => {
        console.log(res);
        // handleResponse();
      })
      .catch((err) => {
        // setLoading(false);
        console.log(err);
      });
    closeModal();
  };

  const closeModal = () => {
    setVisibleModal(false);
  };

  const handleSeedInput = (e) => {
    let filteredSuggestions = payableTransactions.filter(
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
      title: "Payable",
      dataIndex: "payable",
      key: "payable",
      sorter: (a, b) => a.payable.length - b.payable.length,
      sortOrder: sortedInfo.columnKey === "payable" && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: "Supplier Id",
      dataIndex: "supplierId",
      key: "supplierId",
      sorter: (a, b) => a.supplierId.length - b.supplierId.length,
      sortOrder: sortedInfo.columnKey === "supplierId" && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: "",
      key: "edit",
      // width: "10%",
      render: (text, record) => (
        <div style={{ textAlign: "center" }}>
          <StyledButton
            style={{ borderRadius: "5px" }}
            onClick={() => {
              setModal("Paid");
              setVisibleModal(true);
              setRecord(record);
            }}
          >
            Paid
          </StyledButton>
        </div>
      ),
    },
  ];

  return (
    <div style={{ backgroundColor: "#f8f8ff", height: "93vh" }}>
      {modal === "Paid" ? (
        visibleModal ? (
          <RPModal
            title="Paid"
            setVisible={setVisibleModal}
            visible={visibleModal}
            close={closeModal}
            value={value}
            setValue={setValue}
            handleSubmit={handleSubmit}
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
            Payables
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
                  All Accounts{" "}
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
          scroll={{ x: 650 }}
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

export default Payable;

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
