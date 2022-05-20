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
import LenderModal from "../../adminPanel/modals/lender";
import LoanAcquireModal from "./loanModal";
import { DropDownOptionsContext } from "../../../context/optionsContext";

const Loan = (props) => {
  const history = useHistory();
  const [visibleModal, setVisibleModal] = useState(false);
  const [modal, setModal] = useState(null);
  const [lenderName, setLenderName] = useState(null);
  const [secondModal, setSecondModal] = useState(null);
  const [visibleSecondModal, setVisibleSecondModal] = useState(false);
  const { loans, getLoans, getLoanInstallments, searchData, setSearchData } =
    useContext(DropDownOptionsContext);
  let [sortedInfo, setSortedInfo] = useState(null);
  let [filteredInfo, setFilteredInfo] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  let [searchValue, setSearchValue] = useState(null);
  // let [dataSource, setDataSource] = useState(inventories);

  useEffect(() => {
    if (loans.length === 0) {
      getLoans();
    }
    setSearchData(loans);
  }, []);

  const handleShowInstallments = async (record) => {
    localStorage.setItem("loan", JSON.stringify(record));
    await getLoanInstallments(record);
    history.push({
      pathname: "/transactions/liability/loan/loanInstallments",
    });
  };

  const closeModal = () => {
    setVisibleModal(false);
  };

  const handleSeedInput = (e) => {
    let filteredSuggestions = loans.filter(
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
    // if (selectedRowKeys.length > 1) {
    //   const lastSelectedRowIndex = [...selectedRowKeys].pop();
    //   setSelectedRowKeys(lastSelectedRowIndex);
    // }
    // setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    type: "radio",
    // selectedRowKeys,
    onChange: onSelectChange,
    // selection: Table.SELECTION_ALL,
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
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name > b.name,
      sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      sorter: (a, b) => a.amount - b.amount,
      sortOrder: sortedInfo.columnKey === "amount" && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      sorter: (a, b) => a.description.length - b.description.length,
      sortOrder: sortedInfo.columnKey === "description" && sortedInfo.order,
      ellipsis: true,
      // responsive: ["xs"],
    },
    {
      title: "",
      // key: "edit",
      // width: "45%",
      // responsive: ["xs"],
      render: (text, record) => (
        <div style={{ textAlign: "center" }}>
          <StyledButton2
            style={{ borderRadius: "5px" }}
            onClick={() => {
              handleShowInstallments(record);
            }}
          >
            Show Installments
          </StyledButton2>
        </div>
      ),
    },
  ];

  return (
    <div style={{ backgroundColor: "#f8f8ff", height: "93vh" }}>
      {secondModal === "Add Lender" ? (
        visibleSecondModal ? (
          <LenderModal
            setVisible={setVisibleModal}
            visible={visibleModal}
            close={closeModal}
            visibleSecondModal={visibleSecondModal}
            setSecondModal={setSecondModal}
            setVisibleSecondModal={setVisibleSecondModal}
          />
        ) : null
      ) : null}
      {modal === "Add New Loan" ? (
        visibleModal ? (
          <LoanAcquireModal
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
          padding: "1.5% 3% 0 3%",
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
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>Loan</span>
            <div>
              <StyledButton
                onClick={() => {
                  setModal("Add New Loan");
                  setVisibleModal(true);
                }}
              >
                Add New Loan
              </StyledButton>
            </div>
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
                  Total Loan Value{" "}
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
                  Total Loan Value{" "}
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

export default Loan;

const StyledButton = styled(Button)`
  font-size: 11px;
  height: 1.8rem;
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

const StyledButton2 = styled(Button)`
  font-size: 10px;
  height: 1.4rem;
  font-family: ${(props) => props.theme.fontFamily.primary} !important;
  font-weight: bolder;
  color: white;
  background-color: #009dcf;
  border-color: #009dcf;
  border-radius: 10px;
  padding: 3px 10px 0 10px;
  &:focus,
  &:hover {
    background-color: white;
    color: #009dcf;
  }
`;
