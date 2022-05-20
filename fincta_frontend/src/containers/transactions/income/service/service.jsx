import React, { useState, useEffect, useContext } from "react";
import { DropDownOptionsContext } from "../../../../context/optionsContext";
import { Spin } from "antd";
import { useHistory } from "react-router-dom";
import { CustomDropdown } from "../../modal/components";
import axios, { baseUrl } from "../../../../utils/axios";
import moment from "moment";
import { transaction } from "../../../../utils/constants";
import { StyledButton2 } from "../../modal/styles/modal.styles";
import ModalView from "./view";

const Modal = ({
  accountClass,
  subAccount,
  dropDownsLoading,
  setSecondModal,
  setVisibleSecondModal,
  close,
  dropDowns,
  ...rest
}) => {
  const { getLookups } = useContext(DropDownOptionsContext);
  const receivableFlagConstants = transaction.receivableFlag;
  const [visible, setVisible] = useState(rest.visible);
  const [createdAt, setCreatedAt] = useState(moment());
  const [description, setDescription] = useState(null);
  const [rPValue, setRPValue] = useState(null);
  const [bCValue, setBCValue] = useState(0);
  const [iPValue, setIPValue] = useState(0);
  const [quantity, setQuantity] = useState(null);
  const [amount, setAmount] = useState(null);
  const [customerId, setCustomerId] = useState(null);
  const [lookupId, setLookupId] = useState(null);

  const handleResponse = async (response) => {
    if (rest.hasOwnProperty("setDropDownsLoading"))
      rest.setDropDownsLoading(true);
    await getLookups(subAccount);
    if (rest.hasOwnProperty("setDropDownsLoading"))
      rest.setDropDownsLoading(false);
    console.log(response);
    setLookupId(response.data._id);
  };

  const saveLookup = async (name) => {
    await axios
      .get(`${baseUrl}/users/fromtoken`)
      .then((response) => {
        console.log(response);
        let userId = response.data._id;
        let companyId = response.data.companyId;
        let lookup = {
          name,
          accountClass,
          subAccount,
          userId,
          companyId,
        };

        let promises = [];
        promises.push(
          axios
            .post(`${baseUrl}/lookups`, lookup)
            .then((res) => {
              console.log(res);
              handleResponse(res);
            })
            .catch((err) => {
              console.log(err);
            })
        );
        return Promise.all(promises);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = async () => {
    let credit = rPValue;
    let receivable = amount - rPValue;
    let bank = rPValue - bCValue;
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
          saleQuantity: null,
          depriciation: null,
          perUnit: null,
          withdrawl: null,
          profitLoss: null,
          receivableFlag,
          payableFlag: null,
          assetId: null,
          inventoryId: null,
          employeeId: null,
          supplierId: null,
          customerId: null,
          subscriptionId: null,
          loanId: null,
          loanFlag: null,
          lenderId: null,
          lookupId,
          userId,
          companyId,
        };

        let promises = [];
        if (validateForms()) {
          promises.push(
            axios
              .post(`${baseUrl}/transactions`, transaction)
              .then((response) => {
                console.log(response);
                alert("Transaction Successful");
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
    if (lookupId === null) {
      alert("no service is selected");
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
      case dropDown.customer:
        if (value?.value !== "undefined") setCustomerId(value?.value);
        break;
      case dropDown.service:
        if (value !== null) {
          console.log(value);
          if (value.__isNew__ === true) {
            console.log("in new");
            setLookupId(saveLookup(value?.value));
            console.log(lookupId);
          } else {
            setLookupId(value?.value);
            console.log(lookupId);
          }
        }
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
