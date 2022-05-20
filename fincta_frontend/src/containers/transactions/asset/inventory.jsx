import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Search from "./search";
import { Table, Avatar, Button, Row, Col } from "antd";
import ProductSale from "../income/productSale";
import InventoryPurchase from "../expense/inventoryPurchase";
import {
  UserOutlined,
  DownloadOutlined,
  BackwardOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import styled from "styled-components";
import SupplierModal from "../../adminPanel/modals/supplier";
import CustomerModal from "../../adminPanel/modals/customer";
import InventoryModal from "../../adminPanel/modals/inventory";
import { DropDownOptionsContext } from "../../../context/optionsContext";

const Inventory = (props) => {
  const history = useHistory();
  const [visibleModal, setVisibleModal] = useState(false);
  const [modal, setModal] = useState(null);
  const [secondModal, setSecondModal] = useState(null);
  const [visibleSecondModal, setVisibleSecondModal] = useState(false);
  const {
    inventories,
    getInventories,
    getInventoryTransactions,
    searchData,
    setSearchData,
  } = useContext(DropDownOptionsContext);
  let [sortedInfo, setSortedInfo] = useState(null);
  let [filteredInfo, setFilteredInfo] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  let [searchValue, setSearchValue] = useState(null);
  // let [dataSource, setDataSource] = useState(inventories);

  useEffect(() => {
    if (inventories.length === 0) {
      getInventories();
    }
    setSearchData(inventories);
  }, []);

  const handleShowTransactions = async () => {
    if (selectedRowKeys.length > 0) {
      localStorage.setItem("inventoryIds", JSON.stringify(selectedRowKeys));
      await getInventoryTransactions(selectedRowKeys);
      history.push({
        pathname: "/transactions/asset/inventory/inventoryTransaction",
      });
    } else {
      alert("No inventory is selected to show transactions.");
    }
  };

  const closeModal = () => {
    setVisibleModal(false);
  };

  const handleSeedInput = (e) => {
    let filteredSuggestions = inventories.filter(
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
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name > b.name,
      sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      sorter: (a, b) => a.type.length - b.type.length,
      sortOrder: sortedInfo.columnKey === "type" && sortedInfo.order,
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
      title: "Company",
      dataIndex: "company",
      key: "company",
      sorter: (a, b) => a.company.length - b.company.length,
      sortOrder: sortedInfo.columnKey === "company" && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: "ShelfLife",
      dataIndex: "shelfLife",
      key: "shelfLife",
      sorter: (a, b) => a.shelfLife.length - b.shelfLife.length,
      sortOrder: sortedInfo.columnKey === "shelfLife" && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
      sorter: (a, b) => a.sku.length - b.sku.length,
      sortOrder: sortedInfo.columnKey === "sku" && sortedInfo.order,
      ellipsis: true,
    },
  ];

  return (
    <div style={{ backgroundColor: "#f8f8ff", height: "93vh" }}>
      {secondModal === "Add Customer" ? (
        visibleSecondModal ? (
          <CustomerModal
            setVisible={setVisibleModal}
            visible={visibleModal}
            close={closeModal}
            visibleSecondModal={visibleSecondModal}
            setSecondModal={setSecondModal}
            setVisibleSecondModal={setVisibleSecondModal}
          />
        ) : null
      ) : null}
      {secondModal === "Add Supplier" ? (
        visibleSecondModal ? (
          <SupplierModal
            setVisible={setVisibleModal}
            visible={visibleModal}
            close={closeModal}
            visibleSecondModal={visibleSecondModal}
            setSecondModal={setSecondModal}
            setVisibleSecondModal={setVisibleSecondModal}
          />
        ) : null
      ) : null}
      {secondModal === "Add Inventory" ? (
        visibleSecondModal ? (
          <InventoryModal
            setVisible={setVisibleModal}
            visible={visibleModal}
            close={closeModal}
            visibleSecondModal={visibleSecondModal}
            setSecondModal={setSecondModal}
            setVisibleSecondModal={setVisibleSecondModal}
          />
        ) : null
      ) : null}
      {modal === "Inventory Purchase" ? (
        visibleModal ? (
          <InventoryPurchase
            setVisible={setVisibleModal}
            visible={visibleModal}
            close={closeModal}
            visibleSecondModal={visibleSecondModal}
            setSecondModal={setSecondModal}
            setVisibleSecondModal={setVisibleSecondModal}
          />
        ) : null
      ) : null}
      {modal === "Product Sale" ? (
        visibleModal ? (
          <ProductSale
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
          <Row
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              color: "grey",
              marginBottom: "10px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Col>
              <span>Inventory</span>
            </Col>

            <Col>
              <Row gutter={7}>
                <Col>
                  <StyledButton onClick={handleShowTransactions}>
                    Show Transactions
                  </StyledButton>
                </Col>
                <Col>
                  <StyledButton
                    onClick={() => {
                      setModal("Product Sale");
                      setVisibleModal(true);
                    }}
                  >
                    Sell Inventory
                  </StyledButton>
                </Col>
                <Col>
                  <StyledButton
                    onClick={() => {
                      setModal("Inventory Purchase");
                      setVisibleModal(true);
                    }}
                  >
                    Purchase Inventory
                  </StyledButton>
                </Col>
                <Col>
                  <StyledButton
                    onClick={() => {
                      setModal(null);
                      setSecondModal("Add Inventory");
                      setVisibleSecondModal(true);
                    }}
                  >
                    Add Inventory
                  </StyledButton>
                </Col>
              </Row>
            </Col>
          </Row>
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
                  Total Inventory Value{" "}
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
          rowSelection={rowSelection}
          columns={columns}
          dataSource={searchData}
          rowKey="_id"
        />
      </div>
    </div>
  );
};

export default Inventory;

const StyledButton = styled(Button)`
  width: 100%;
  font-size: 11px;
  height: 1.8rem;
  font-family: ${(props) => props.theme.fontFamily.primary} !important;
  font-weight: bolder;
  color: white;
  background-color: #009dcf;
  border-color: #009dcf;
  border-radius: 5px;
  padding: 3px 10px 0 10px;
  /* margin-right: 5px; */
  &:focus,
  &:hover {
    background-color: white;
    color: #009dcf;
  }
`;
