import React, { useState, useEffect, useContext } from "react";
import { DropDownOptionsContext } from "../../../context/optionsContext";
import CustomModal from "../modal/modal";
import { transaction } from "../../../utils/constants";

const Refund = (props) => {
  const [dropDownsLoading, setDropDownsLoading] = useState(true);
  const { inventoryOptions, getInventories, supplierOptions, getSuppliers } =
    useContext(DropDownOptionsContext);

  const getDropDowns = async () => {
    if (inventoryOptions.length === 0) await getInventories();
    if (supplierOptions.length === 0) await getSuppliers();
    setDropDownsLoading(false);
  };
  useEffect(() => {
    getDropDowns();
  }, []);

  const dropDowns = [
    {
      name: transaction.dropDown.inventory,
      options: inventoryOptions,
      creatable: false,
      addable: true,
    },
    {
      name: transaction.dropDown.supplier,
      options: supplierOptions,
      creatable: false,
      addable: true,
    },
  ];

  return (
    <>
      <CustomModal
        dropDowns={dropDowns}
        dropDownsLoading={dropDownsLoading}
        counterTitle="Purchase Quantity"
        inputTitle="Purchase Amount"
        pay
        accountClass={transaction.expense.accountClass}
        subAccount={transaction.expense.subAccount.refund}
        close={props.close}
        visible={props.visible}
        setVisible={props.setVisible}
        setSecondModal={props.setSecondModal}
        visibleSecondModal={props.visibleSecondModal}
        setVisibleSecondModal={props.setVisibleSecondModal}
      />
    </>
  );
};
export default Refund;
