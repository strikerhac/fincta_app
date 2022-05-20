import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Search from "./search";
import { Table, Avatar, Button, Row, Col } from "antd";
import {
  UserOutlined,
  DownloadOutlined,
  BackwardOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import styled from "styled-components";
import InstallmentModal from "./installmentModal";
import { DropDownOptionsContext } from "../../../context/optionsContext";

const LoanInstallment = (props) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [modal, setModal] = useState(null);
  const [lenderId, setLenderId] = useState(null);
  const [loanId, setLoanId] = useState(null);
  const [lenderName, setLenderName] = useState(null);
  const [secondModal, setSecondModal] = useState(null);
  const [visibleSecondModal, setVisibleSecondModal] = useState(false);
  const { getLoanInstallments, searchData, setSearchData, loanInstallments } =
    useContext(DropDownOptionsContext);
  let [sortedInfo, setSortedInfo] = useState(null);
  let [filteredInfo, setFilteredInfo] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  let [searchValue, setSearchValue] = useState(null);
  let [index, setIndex] = useState(null);

  useEffect(() => {
    let loan = localStorage.getItem("loan");
    if (loan) {
      getLoanInstallments(JSON.parse(loan));
    }
  }, []);

  const closeModal = () => {
    setVisibleModal(false);
  };

  const handleSeedInput = (e) => {
    let filteredSuggestions = loanInstallments.filter(
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
      title: "Lender Name",
      dataIndex: "lenderName",
      key: "lenderName",
      ellipsis: true,
    },
    {
      title: "Installment",
      dataIndex: "installment",
      key: "installment",
      ellipsis: true,
    },
    {
      title: "Due Date",
      dataIndex: "date",
      key: "date",
      ellipsis: true,
    },
    {
      title: "",
      key: "edit",
      // width: "8%",
      render: (text, record) => (
        <div style={{ textAlign: "center" }}>
          <StyledButton
            style={{ borderRadius: "5px" }}
            onClick={() => {
              setIndex(record.index);
              setLoanId(record.loanId);
              setLenderId(record.lenderId);
              setLenderName(record.lenderName);
              setModal("Pay Installment");
              setVisibleModal(true);
            }}
          >
            paid
          </StyledButton>
        </div>
      ),
    },
  ];

  return (
    <div style={{ backgroundColor: "#f8f8ff", height: "93vh" }}>
      {modal === "Pay Installment" ? (
        visibleModal ? (
          <InstallmentModal
            index={index}
            loanId={loanId}
            lenderId={lenderId}
            lenderName={lenderName}
            setVisible={setVisibleModal}
            visible={visibleModal}
            close={closeModal}
            visibleSecondModal={visibleSecondModal}
            setSecondModal={setSecondModal}
            setVisibleSecondModal={setVisibleSecondModal}
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
            Loan Installments
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
          scroll={{ x: 600 }}
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

export default LoanInstallment;

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
