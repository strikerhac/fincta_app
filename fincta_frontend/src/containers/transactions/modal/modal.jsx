import React, { useState, useEffect, useContext } from "react";
import { DropDownOptionsContext } from "../../../context/optionsContext";
import { Button, Spin } from "antd";
import { useHistory } from "react-router-dom";
import { CustomDropdown } from "./components";
import styled from "styled-components";
import axios, { baseUrl } from "../../../utils/axios";
import moment from "moment";
import { transaction } from "../../../utils/constants";
import ModalView from "./modalView";

const Modal = ({
  accountClass,
  subAccount,
  dropDown,
  dropDownsLoading,
  setSecondModal,
  setVisibleSecondModal,
  // inventories,
  close,
  dropDowns,
  ...rest
}) => {
  const history = useHistory();
  const [installmentDates, setInstallmentDates] = useState([]);
  const {
    getLookups,
    getLoans,
    updateLoanInstallments,
    getInventories,
    inventories,
  } = useContext(DropDownOptionsContext);
  const incomeSubAccounts = transaction.income.subAccount;
  const expenseSubAccounts = transaction.expense.subAccount;
  const liabilitySubAccounts = transaction.liability.subAccount;
  const productSale = transaction.income.subAccount.productSale;
  const assetSale = transaction.income.subAccount.assetSale;
  const loan = transaction.liability.subAccount.loan;
  const payableFlagConstants = transaction.payableFlag;
  const receivableFlagConstants = transaction.receivableFlag;
  const loanFlagConstants = transaction.loanFlag;
  const inventoryPurchase = transaction.expense.subAccount.inventoryPurchase;
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
  const [depriciation, setDepriciation] = useState(null);

  const [withdrawl, setWithdrawl] = useState(null);
  const [profitLoss, setProfitLoss] = useState(null);

  const [assetId, setAssetId] = useState(null);
  const [inventoryId, setInventoryId] = useState(null);
  const [employeeId, setEmployeeId] = useState(null);
  const [supplierId, setSupplierId] = useState(null);
  const [customerId, setCustomerId] = useState(null);
  const [subscriptionId, setSubscriptionId] = useState(null);
  const [lenderId, setLenderId] = useState(null);
  const [loanId, setLoanId] = useState(null);
  const [lenderName, setLenderName] = useState(null);
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
    let debit = rest.pay ? rPValue : rest.installment ? iPValue : null;
    let credit = !rest.pay ? (rest.installment ? null : rPValue) : null;
    let payable = rest.pay ? amount - rPValue : null;
    let receivable = !rest.pay
      ? subAccount === loan
        ? null
        : amount - rPValue
      : null;
    let bank = rPValue - bCValue;
    let purchaseQuantity = rest.pay
      ? rest.counterTitle
        ? Math.round(quantity)
        : null
      : null;
    let payableFlag = rest.pay
      ? payable > 0
        ? payableFlagConstants.payable
        : payableFlagConstants.zeroPayable
      : null;
    let saleQuantity = !rest.pay
      ? rest.counterTitle
        ? Math.round(quantity)
        : null
      : null;
    let receivableFlag =
      !rest.pay && subAccount !== loan
        ? receivable > 0
          ? receivableFlagConstants.receivable
          : receivableFlagConstants.zeroReceivable
        : null;
    let perUnit = rest.pay
      ? rest.counterTitle
        ? amount / quantity
        : null
      : null;
    let principal = rest.installment ? iPValue : null;
    let interest = rest.installment ? amount - iPValue : null;
    let loanFlag = rest.installment
      ? loanFlagConstants.installmentPayment
      : null;
    let lenderI = null;
    let loanI = null;
    if (rest.hasOwnProperty("installment")) {
      console.log(rest.lenderId);
      lenderI = rest.lenderId;
      loanI = rest.loanId;
    }

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
          debit,
          credit,
          receivable,
          payable,
          cash: bCValue,
          bank,
          principal,
          interest,
          purchaseQuantity,
          saleQuantity,
          depriciation,
          perUnit,
          withdrawl,
          profitLoss,
          receivableFlag,
          payableFlag,
          assetId,
          inventoryId,
          employeeId,
          supplierId,
          customerId,
          subscriptionId,
          loanId: loanI,
          loanFlag,
          lenderId: lenderI,
          lookupId,
          userId,
          companyId,
        };

        let promises = [];
        //---------------------------------------------
        if (validateForms()) {
          console.log(productSale);
          if (subAccount === productSale) {
            console.log(productSale);
            promises.push(
              axios
                .post(`${baseUrl}/transactions/inventorySale`, transaction)
                .then((response) => {
                  console.log(response);
                  alert("Transaction Successful");
                })
                .catch((err) => {
                  console.log(err);
                })
            );
          } else if (subAccount === inventoryPurchase) {
            promises.push(
              axios
                .post(`${baseUrl}/transactions/inventoryPurchase`, transaction)
                .then((response) => {
                  console.log(response);
                  alert("Transaction Successful");
                })
                .catch((err) => {
                  console.log(err);
                })
            );
          } else if (subAccount === assetSale) {
            promises.push(
              axios
                .post(`${baseUrl}/transactions/assetSale`, transaction)
                .then((response) => {
                  console.log(response);
                  alert("Transaction Successful");
                })
                .catch((err) => {
                  console.log(err);
                })
            );
          } else if (subAccount === loan && !rest.installment) {
            let loan = {
              name: lenderName,
              installmentDates,
              lenderId,
              amount,
              description,
              userId,
              companyId,
            };
            promises.push(
              axios
                .post(`${baseUrl}/loans`, loan)
                .then((response) => {
                  console.log(response);
                  transaction.loanId = response.data._id;
                  transaction.loanFlag = loanFlagConstants.loanAcquisition;
                  console.log(transaction);
                  const promises = [];
                  promises.push(
                    axios
                      .post(`${baseUrl}/transactions`, transaction)
                      .then((response) => {
                        console.log(response);
                        alert("Transaction Successful");
                        getLoans();
                      })
                      .catch((err) => {
                        console.log(err);
                      })
                  );
                  return Promise.all(promises);
                })
                .catch((err) => {
                  console.log(err);
                })
            );
          } else {
            promises.push(
              axios
                .post(`${baseUrl}/transactions`, transaction)
                .then((response) => {
                  console.log(response);
                  alert("Transaction Successful");
                  if (subAccount === productSale) {
                    getInventories();
                  }
                  if (rest.hasOwnProperty("installment")) {
                    updateLoanInstallments(rest.loanId, rest.index, history);
                  }
                })
                .catch((err) => {
                  console.log(err);
                })
            );
          }
        }
        //--------------------------------------------
        return Promise.all(promises);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const validateForms = () => {
    let isValidated = true;
    if (subAccount === productSale) {
      if (inventoryId === null) {
        alert("no inventory is selected");
        isValidated = false;
      } else if (customerId === null) {
        alert("no customer is selected");
        isValidated = false;
      }
      // else if (quantity > maxQuantity) {
      //   alert(
      //     `quantity of the selected inventory is more than the available stock quantity that is ${maxQuantity} units`
      //   );
      // }
    } else if (subAccount === incomeSubAccounts.service) {
      if (lookupId === null) {
        alert("no service is selected");
        isValidated = false;
      } else if (customerId === null) {
        alert("no customer is selected");
        isValidated = false;
      }
    } else if (subAccount === incomeSubAccounts.assetSale) {
      if (assetId === null) {
        alert("no asset is selected");
        isValidated = false;
      } else if (customerId === null) {
        alert("no customer is selected");
        isValidated = false;
      }
    } else if (subAccount === incomeSubAccounts.subscription) {
      if (subscriptionId === null) {
        alert("no subscription is selected");
        isValidated = false;
      } else if (customerId === null) {
        alert("no customer is selected");
        isValidated = false;
      }
    } else if (subAccount === expenseSubAccounts.utility) {
      if (lookupId === null) {
        alert("no utility is selected");
        isValidated = false;
      } else if (supplierId === null) {
        alert("no supplier is selected");
        isValidated = false;
      }
    } else if (subAccount === expenseSubAccounts.marketing) {
      if (lookupId === null) {
        alert("no marketing type is selected");
        isValidated = false;
      } else if (supplierId === null) {
        alert("no supplier is selected");
        isValidated = false;
      }
    } else if (subAccount === expenseSubAccounts.admin) {
      if (lookupId === null) {
        alert("no admin expense is selected");
        isValidated = false;
      }
    } else if (subAccount === expenseSubAccounts.salary) {
      if (employeeId === null) {
        alert("no employee is selected");
        isValidated = false;
      }
    } else if (subAccount === expenseSubAccounts.inventoryDamage) {
      if (inventoryId === null) {
        alert("no inventory is selected");
        isValidated = false;
      } else if (supplierId === null) {
        alert("no supplier is selected");
        isValidated = false;
      }
    } else if (subAccount === expenseSubAccounts.inventoryPurchase) {
      if (inventoryId === null) {
        alert("no inventory is selected");
        isValidated = false;
      } else if (supplierId === null) {
        alert("no supplier is selected");
        isValidated = false;
      }
    } else if (subAccount === expenseSubAccounts.assetPurchase) {
      if (assetId === null) {
        alert("no asset is selected");
        isValidated = false;
      } else if (supplierId === null) {
        alert("no supplier is selected");
        isValidated = false;
      }
    } else if (subAccount === expenseSubAccounts.refund) {
      if (inventoryId === null) {
        alert("no inventory is selected");
        isValidated = false;
      } else if (supplierId === null) {
        alert("no supplier is selected");
        isValidated = false;
      }
    } else if (subAccount === expenseSubAccounts.miscellaneous) {
      if (inventoryId === null) {
        alert("no inventory is selected");
        isValidated = false;
      } else if (supplierId === null) {
        alert("no supplier is selected");
        isValidated = false;
      }
    } else if (subAccount === liabilitySubAccounts.loan) {
      if (lenderId === null && !rest.hasOwnProperty("installment")) {
        alert("no lender is selected");
        isValidated = false;
      } else if (
        installmentDates.length === 0 &&
        !rest.hasOwnProperty("installment")
      ) {
        alert("no installment dates are selected");
        isValidated = false;
      }
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
          if (subAccount === productSale) {
            inventories.forEach((inventory) => {
              if (inventory._id === value?.value) {
                console.log(inventory.quantity);
                console.log(quantity);
                setMaxQuantity(inventory.quantity);
              }
            });
          }
          setInventoryId(value?.value);
        }
        break;
      case dropDown.asset:
        if (value?.value !== "undefined") setAssetId(value?.value);
        break;
      case dropDown.supplier:
        if (value?.value !== "undefined") setSupplierId(value?.value);
        break;
      case dropDown.customer:
        if (value?.value !== "undefined") setCustomerId(value?.value);
        break;
      case dropDown.employee:
        if (value?.value !== "undefined") setEmployeeId(value?.value);
        break;
      case dropDown.subscription:
        if (value?.value !== "undefined") setSubscriptionId(value?.value);
        break;
      case dropDown.loanLender:
        if (value?.value !== "undefined") {
          setLenderId(value?.value);
          setLenderName(value?.label);
        }
        break;
      case dropDown.utility:
      case dropDown.marketing:
      case dropDown.admin:
      case dropDown.service:
      case dropDown.incomeType:
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
    // console.log(moment(value._d.toString()).format("YYYY-MM-DD HH:mm:ss"));
  };

  return (
    <>
      <ModalView
        accountClass={accountClass}
        subAccount={subAccount}
        dropDowns={getDropDowns(dropDowns)}
        loan={loan}
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
        installmentDates={installmentDates}
        setInstallmentDates={setInstallmentDates}
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

const StyledButton2 = styled(Button)`
  font-size: 11px;
  height: 1.85rem;
  font-family: ${(props) => props.theme.fontFamily.primary} !important;
  font-weight: bolder;
  color: white;
  background-color: #009dcf;
  border-color: #009dcf;
  border-radius: 6px;
  padding: 3px 20px 1px 20px;
  &:focus,
  &:hover {
    background-color: white;
    color: #009dcf;
  }
`;
