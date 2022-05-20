import React, { useState, useContext } from "react";
import { DropDownOptionsContext } from "../../../../context/optionsContext";
import { Spin } from "antd";
import { CustomDropdown } from "../../modal/components";
import axios, { baseUrl } from "../../../../utils/axios";
import moment from "moment";
import { transaction } from "../../../../utils/constants";
import { StyledButton2 } from "../../modal/styles/modal.styles";
import ModalView from "./view";

const Modal = ({
  accountClass,
  subAccount,
  dropDown,
  dropDownsLoading,
  setSecondModal,
  setVisibleSecondModal,
  close,
  dropDowns,
  ...rest
}) => {
  const { inventories, getInventories } = useContext(DropDownOptionsContext);
  const productSale = transaction.income.subAccount.productSale;
  const receivableFlagConstants = transaction.receivableFlag;
  const [maxQuantity, setMaxQuantity] = useState(null);
  const [visible, setVisible] = useState(rest.visible);
  const [createdAt, setCreatedAt] = useState(moment());
  const [description, setDescription] = useState(null);
  //debit/credit/receivable/payable
  const [rPValue, setRPValue] = useState(null);
  //bank/cash
  const [bCValue, setBCValue] = useState(0);
  const [iPValue, setIPValue] = useState(0);
  //purchase/sale
  const [quantity, setQuantity] = useState(null);
  const [amount, setAmount] = useState(null);
  const [inventoryId, setInventoryId] = useState(null);
  const [customerId, setCustomerId] = useState(null);

  const handleSubmit = async () => {
    let credit = rPValue;
    let receivable = amount - rPValue;
    let bank = rPValue - bCValue;
    let saleQuantity = Math.round(quantity);
    let receivableFlag =
      receivable > 0
        ? receivableFlagConstants.receivable
        : receivableFlagConstants.zeroReceivable;

    await axios
      .get(`${baseUrl}/users/fromtoken`)
      .then((response) => {
        console.log(response);
        let userId = response.data._id;
        let companyId = response.data.companyId;
        let transaction = {
          accountClass,
          subAccount,
          createdAt,
          description,
          debit: null,
          credit,
          receivable,
          payable: null,
          cash: bCValue,
          bank,
          principal: null,
          interest: null,
          purchaseQuantity: null,
          saleQuantity,
          depriciation: null,
          perUnit: null,
          withdrawl: null,
          profitLoss: null,
          receivableFlag,
          payableFlag: null,
          assetId: null,
          inventoryId,
          employeeId: null,
          supplierId: null,
          customerId,
          subscriptionId: null,
          loanId: null,
          loanFlag: null,
          lenderId: null,
          lookupId: null,
          userId,
          companyId,
        };

        let promises = [];
        if (validateForms()) {
          console.log(productSale);
          promises.push(
            axios
              .post(`${baseUrl}/transactions/inventorySale`, transaction)
              .then((response) => {
                console.log(response);
                alert("Transaction Successful");
                getInventories();
              })
              .catch((err) => {
                console.log(err);
              })
          );
        }
        return Promise.all(promises);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const validateForms = () => {
    let isValidated = true;
    if (inventoryId === null) {
      alert("no inventory is selected");
      isValidated = false;
    } else if (customerId === null) {
      alert("no customer is selected");
      isValidated = false;
    }
    return isValidated;
  };

  const getDropDowns = (dropDowns) => {
    let dropDownArray = [];
    dropDowns?.forEach((dropDown) => {
      dropDownArray.push(
        <>
          <Spin tip="Loading..." spinning={dropDownsLoading}>
            <CustomDropdown
              creatable={dropDown.creatable}
              title={dropDown.name}
              options={dropDown.options}
              onChange={onDropChange}
            />
          </Spin>
          <div style={{ height: "7px" }}></div>
          {dropDown.addable ? (
            <StyledButton2
              onClick={() => {
                setSecondModal(`Add ${dropDown.name}`);
                setVisibleSecondModal(true);
                rest.setVisible(false);
              }}
            >
              Add {dropDown.name}
            </StyledButton2>
          ) : null}
        </>
      );
    });
    return dropDownArray;
  };

  const onBackgroundClick = (event) => {
    event.preventDefault();
    setVisible(false);
    close();
  };

  const onDropChange = (value, title) => {
    const { dropDown } = transaction;
    console.log(value?.value);
    console.log(title);
    switch (title) {
      case dropDown.inventory:
        if (value?.value !== "undefined") {
          inventories.forEach((inventory) => {
            if (inventory._id === value?.value) {
              console.log(inventory.quantity);
              console.log(quantity);
              setMaxQuantity(inventory.quantity);
            }
          });
          setInventoryId(value?.value);
        }
        break;

      case dropDown.customer:
        if (value?.value !== "undefined") setCustomerId(value?.value);
        break;
      default:
        break;
    }
  };

  const onChange = (value) => {
    console.log(value._d);
    setCreatedAt(value._d);
  };

  return (
    <>
      <ModalView
        accountClass={accountClass}
        subAccount={subAccount}
        dropDowns={getDropDowns(dropDowns)}
        createdAt={createdAt}
        maxQuantity={maxQuantity}
        setMaxQuantity={setMaxQuantity}
        quantity={quantity}
        setQuantity={setQuantity}
        amount={amount}
        setAmount={setAmount}
        iPValue={iPValue}
        bCValue={bCValue}
        rPValue={rPValue}
        setIPValue={setIPValue}
        setBCValue={setBCValue}
        setRPValue={setRPValue}
        description={description}
        setDescription={setDescription}
        onChange={onChange}
        onBackgroundClick={onBackgroundClick}
        handleSubmit={handleSubmit}
        {...rest}
      />
    </>
  );
};

export default Modal;
